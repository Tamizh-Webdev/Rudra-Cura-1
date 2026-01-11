import { google } from "googleapis"
import Twilio from "twilio"
import admin from "firebase-admin"
import { Ratelimit } from "@upstash/ratelimit"
import { Redis } from "@upstash/redis"

/* ---------------- ENV ---------------- */

const {
  GOOGLE_SERVICE_ACCOUNT_KEY,
  SHEET_ID,

  // Firebase
  FIREBASE_PROJECT_ID,
  FIREBASE_CLIENT_EMAIL,
  FIREBASE_PRIVATE_KEY,

  // Upstash (optional)
  UPSTASH_REDIS_REST_URL,
  UPSTASH_REDIS_REST_TOKEN,

  // Twilio (optional)
  TWILIO_ACCOUNT_SID,
  TWILIO_AUTH_TOKEN,
  TWILIO_WHATSAPP_FROM,
  ADMIN_WHATSAPP_NUMBER,
} = process.env

/* ---------------- RATE LIMIT (SAFE) ---------------- */

let ratelimit = null

if (UPSTASH_REDIS_REST_URL && UPSTASH_REDIS_REST_TOKEN) {
  const redis = new Redis({
    url: UPSTASH_REDIS_REST_URL,
    token: UPSTASH_REDIS_REST_TOKEN,
  })

  ratelimit = new Ratelimit({
    redis,
    limiter: Ratelimit.slidingWindow(5, "10 m"),
  })
}

/* ---------------- FIREBASE (SAFE) ---------------- */

let db = null

if (
  FIREBASE_PROJECT_ID &&
  FIREBASE_CLIENT_EMAIL &&
  FIREBASE_PRIVATE_KEY
) {
  if (!admin.apps.length) {
    admin.initializeApp({
      credential: admin.credential.cert({
        projectId: FIREBASE_PROJECT_ID,
        clientEmail: FIREBASE_CLIENT_EMAIL,
        privateKey: FIREBASE_PRIVATE_KEY.replace(/\\n/g, "\n"),
      }),
    })
  }
  db = admin.firestore()
}

/* ---------------- HELPERS ---------------- */

function getServiceAccountCredentials() {
  if (!GOOGLE_SERVICE_ACCOUNT_KEY) return null
  const raw = GOOGLE_SERVICE_ACCOUNT_KEY.trim()
  return raw.startsWith("{")
    ? JSON.parse(raw)
    : JSON.parse(Buffer.from(raw, "base64").toString("utf8"))
}

/* ---------------- HANDLER ---------------- */

export default async function handler(req, res) {
  /* CORS */
  res.setHeader("Access-Control-Allow-Origin", "*")
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS")
  res.setHeader("Access-Control-Allow-Headers", "Content-Type")

  if (req.method === "OPTIONS") return res.status(200).end()
  if (req.method !== "POST")
    return res.status(405).json({ error: "Method not allowed" })

  try {
    /* -------- Rate limit (if enabled) -------- */
    if (ratelimit) {
      const ip =
        req.headers["x-forwarded-for"]?.split(",")[0] ||
        req.socket.remoteAddress

      const { success } = await ratelimit.limit(ip)
      if (!success) {
        return res
          .status(429)
          .json({ error: "Too many requests. Try again later." })
      }
    }

    const {
      name,
      age,
      phone,
      email,
      service,
      message,
      whatsappOptIn,
      company, // honeypot
    } = req.body || {}

    /* -------- Honeypot -------- */
    if (company) return res.status(200).json({ ok: true })

    /* -------- Validation -------- */
    if (!name || !phone || !email || !service || !whatsappOptIn) {
      return res.status(400).json({ error: "Missing required fields" })
    }

    if (!/^\+\d{1,3}\d{10}$/.test(phone)) {
      return res.status(400).json({ error: "Invalid phone format" })
    }

    /* -------- Firestore logging (if enabled) -------- */
    if (db) {
      await db.collection("enquiries").add({
        name,
        age: age || "",
        phone,
        email,
        service,
        message: message || "",
        whatsappOptIn,
        createdAt: new Date(),
      })
    }

    /* -------- Google Sheets -------- */
    const creds = getServiceAccountCredentials()
    if (!creds || !SHEET_ID) {
      return res.status(500).json({ error: "Server misconfigured" })
    }

    const jwt = new google.auth.JWT({
      email: creds.client_email,
      key: creds.private_key,
      scopes: ["https://www.googleapis.com/auth/spreadsheets"],
    })

    await jwt.authorize()
    const sheets = google.sheets({ version: "v4", auth: jwt })

    await sheets.spreadsheets.values.append({
      spreadsheetId: SHEET_ID,
      range: "Sheet1!A:H",
      valueInputOption: "USER_ENTERED",
      insertDataOption: "INSERT_ROWS",
      requestBody: {
        values: [[
          new Date().toISOString(),
          name,
          age || "",
          phone,
          email,
          service,
          message || "",
          whatsappOptIn ? "YES" : "NO",
        ]],
      },
    })

    /* -------- WhatsApp (optional) -------- */
    if (
      TWILIO_ACCOUNT_SID &&
      TWILIO_AUTH_TOKEN &&
      TWILIO_WHATSAPP_FROM &&
      ADMIN_WHATSAPP_NUMBER
    ) {
      const twilio = Twilio(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN)
      await twilio.messages.create({
        from: TWILIO_WHATSAPP_FROM,
        to: ADMIN_WHATSAPP_NUMBER,
        body: `New enquiry at Rudra Cura
Name: ${name}
Phone: ${phone}
Service: ${service}`,
      })
    }

    return res.status(200).json({ ok: true })
  } catch (err) {
    console.error("API ERROR:", err)
    return res.status(500).json({ error: "Internal server error" })
  }
}
