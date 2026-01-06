import { google } from "googleapis";

const { GOOGLE_SERVICE_ACCOUNT_KEY, NEWSLETTER_SHEET_ID } = process.env;

function getCreds() {
  const raw = GOOGLE_SERVICE_ACCOUNT_KEY;
  if (!raw) return null;
  return raw.startsWith("{")
    ? JSON.parse(raw)
    : JSON.parse(Buffer.from(raw, "base64").toString("utf8"));
}

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();

  const { email, consent } = req.body || {};
  if (!email || consent !== true) {
    return res.status(400).json({ error: "Consent required" });
  }

  const creds = getCreds();
  if (!creds) return res.status(500).json({ error: "Server misconfigured" });

  const jwt = new google.auth.JWT({
    email: creds.client_email,
    key: creds.private_key,
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  });

  await jwt.authorize();
  const sheets = google.sheets({ version: "v4", auth: jwt });

  await sheets.spreadsheets.values.append({
    spreadsheetId: NEWSLETTER_SHEET_ID,
    range: "Sheet1",
    valueInputOption: "USER_ENTERED",
    requestBody: {
      values: [[
        new Date().toISOString(),
        email,
        true,
        "footer-newsletter",
        req.headers["x-forwarded-for"] || "unknown"
      ]],
    },
  });

  return res.json({ ok: true });
}
