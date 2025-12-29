import { google } from "googleapis";
import Twilio from "twilio";

/**
 * Required ENV vars:
 * GOOGLE_SERVICE_ACCOUNT_KEY (JSON or base64 JSON)
 * SHEET_ID
 * TWILIO_ACCOUNT_SID (optional)
 * TWILIO_AUTH_TOKEN (optional)
 * TWILIO_WHATSAPP_FROM (optional)
 * ADMIN_WHATSAPP_NUMBER (optional)
 */

const {
  GOOGLE_SERVICE_ACCOUNT_KEY,
  SHEET_ID,
  TWILIO_ACCOUNT_SID,
  TWILIO_AUTH_TOKEN,
  TWILIO_WHATSAPP_FROM,
  ADMIN_WHATSAPP_NUMBER,
} = process.env;

/* ---------- helpers ---------- */

async function ensureHeaders(sheets, spreadsheetId, sheetName = "Sheet1") {
  const headerRange = `${sheetName}!A1:H1`;

  const res = await sheets.spreadsheets.values.get({
    spreadsheetId,
    range: headerRange,
  });

  const headers = res.data.values?.[0];

  if (!headers || headers.length === 0) {
    await sheets.spreadsheets.values.update({
      spreadsheetId,
      range: headerRange,
      valueInputOption: "RAW",
      requestBody: {
        values: [[
          "created_at",
          "name",
          "age",
          "phone",
          "email",
          "service",
          "message",
          "whatsapp_opt_in",
        ]],
      },
    });
  }
}

function getServiceAccountCredentials() {
  if (!GOOGLE_SERVICE_ACCOUNT_KEY) return null;
  try {
    const raw = GOOGLE_SERVICE_ACCOUNT_KEY.trim();
    if (raw.startsWith("{")) return JSON.parse(raw);
    return JSON.parse(Buffer.from(raw, "base64").toString("utf8"));
  } catch (err) {
    console.error("Invalid Google service account key", err);
    return null;
  }
}

/* ---------- handler ---------- */

export default async function handler(req, res) {
  try {
    console.log("METHOD:", req.method);
    console.log("BODY:", req.body);

    if (req.method !== "POST") {
      return res.status(405).json({ error: "Method not allowed" });
    }

    const { name, age, phone, email, service, message,whatsappOptIn } = req.body || {};

    // ✅ Email is now mandatory
    if (!name || !phone || !email || !service) {
      return res.status(400).json({
        error: "Missing required fields (name, phone, email, service)",
      });
    }
if (!/^\+\d{1,3}\d{10}$/.test(phone)) {
  return res.status(400).json({
    error: "Phone must include country code and exactly 10 digits",
  });
}
    // Basic email format check
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      return res.status(400).json({ error: "Invalid email address" });
    }
  if (!req.body.whatsappOptIn) {
  return res.status(400).json({
    error: "WhatsApp consent is required",
  });
}

    const creds = getServiceAccountCredentials();
    if (!creds || !SHEET_ID) {
      console.error("Missing Google Sheets config");
      return res.status(500).json({ error: "Server misconfigured" });
    }

    /* ---------- Google Sheets ---------- */

    // 1️⃣ Authorize
    const jwt = new google.auth.JWT({
      email: creds.client_email,
      key: creds.private_key,
      scopes: ["https://www.googleapis.com/auth/spreadsheets"],
    });

    await jwt.authorize();

    // 2️⃣ Create sheets client
    const sheets = google.sheets({ version: "v4", auth: jwt });

    // 3️⃣ Ensure headers exist
    await ensureHeaders(sheets, SHEET_ID);

    // 4️⃣ Append data strictly to A–G
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
    });

    /* ---------- WhatsApp (optional) ---------- */

    if ( whatsappOptIn === true &&
      TWILIO_ACCOUNT_SID &&
      TWILIO_AUTH_TOKEN &&
      TWILIO_WHATSAPP_FROM &&
      ADMIN_WHATSAPP_NUMBER
    ) {
      const twilio = Twilio(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN);

      await twilio.messages.create({
        from: TWILIO_WHATSAPP_FROM,
        to: ADMIN_WHATSAPP_NUMBER,
        body: `New enquiry at Rudra Cura
Name: ${name}
Phone: ${phone}
Email: ${email}
Service: ${service}`,
      });
    }

    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error("API ERROR:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
}
