// /**
//  * Serverless API endpoint (Vercel-style). Save at /src/api/submit.js
//  * Responsibilities:
//  * - Validate incoming enquiry POST body
//  * - Insert into Supabase table "enquiries"
//  * - Send WhatsApp messages through Twilio to ADMIN and to CLIENT
//  *
//  * Environment variables required:
//  * - SUPABASE_URL
//  * - SUPABASE_KEY
//  * - TWILIO_ACCOUNT_SID
//  * - TWILIO_AUTH_TOKEN
//  * - TWILIO_WHATSAPP_FROM   (e.g. "whatsapp:+1415xxxxxxx")
//  * - ADMIN_WHATSAPP_NUMBER  (e.g. "whatsapp:+9198xxxxxxx")
//  *
//  * Note: For deployment to other platforms, adapt export format accordingly.
//  */

// import { createClient } from '@supabase/supabase-js'
// import Twilio from 'twilio'

// const SUPABASE_URL = process.env.SUPABASE_URL
// const SUPABASE_KEY = process.env.SUPABASE_KEY
// const TWILIO_ACCOUNT_SID = process.env.TWILIO_ACCOUNT_SID
// const TWILIO_AUTH_TOKEN = process.env.TWILIO_AUTH_TOKEN
// const TWILIO_WHATSAPP_FROM = process.env.TWILIO_WHATSAPP_FROM // "whatsapp:+1415..."
// const ADMIN_WHATSAPP_NUMBER = process.env.ADMIN_WHATSAPP_NUMBER  // "whatsapp:+91..."

// const supabase = createClient(SUPABASE_URL, SUPABASE_KEY)
// const twilio = Twilio(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN)

// export default async function handler(req, res) {
//   if (req.method !== 'POST') {
//     return res.status(405).json({ error: 'Method not allowed' })
//   }

//   const { name, age, phone, email, service, message } = req.body || {}

//   if (!name || !phone || !service) {
//     return res.status(400).json({ error: 'Missing required fields' })
//   }

//   try {
//     // Save to Supabase
//     const { error: insertErr } = await supabase
//       .from('enquiries')
//       .insert([{ name, age: age ? Number(age) : null, phone, email, service, message }])

//     if (insertErr) {
//       console.error('Supabase insert error', insertErr)
//       return res.status(500).json({ error: 'Database error' })
//     }

//     // Compose messages
//     const adminBody = `New enquiry at Rudra Cura\nName: ${name}\nAge: ${age || '-'}\nPhone: ${phone}\nEmail: ${email || '-'}\nService: ${service}\nMessage: ${message || '-'}`
//     const clientBody = `Thank you ${name} for contacting Rudra Cura. We received your enquiry for "${service}". Our team will contact you shortly. - Rudra Cura`

//     // Send to admin
//     await twilio.messages.create({
//       from: TWILIO_WHATSAPP_FROM,
//       to: ADMIN_WHATSAPP_NUMBER,
//       body: adminBody
//     })

//     // Attempt to send confirmation to client (must be whatsapp:+{number})
//     const normalizedClient = phone.startsWith('whatsapp:') ? phone : `whatsapp:${phone}`
//     try {
//       await twilio.messages.create({
//         from: TWILIO_WHATSAPP_FROM,
//         to: normalizedClient,
//         body: clientBody
//       })
//     } catch (clientErr) {
//       // If client hasn't opted in or Twilio policy blocks sending, log and continue
//       console.warn('Could not send client confirmation via WhatsApp:', clientErr.message)
//     }

//     return res.status(200).json({ ok: true })
//   } catch (err) {
//     console.error('submit handler error', err)
//     return res.status(500).json({ error: 'Internal server error' })
//   }
// }
// api/submit.js
import { google } from 'googleapis'
import Twilio from 'twilio'

const {
  GOOGLE_SERVICE_ACCOUNT_KEY, // either JSON string or base64(JSON)
  SHEET_ID,
  TWILIO_ACCOUNT_SID,
  TWILIO_AUTH_TOKEN,
  TWILIO_WHATSAPP_FROM,
  ADMIN_WHATSAPP_NUMBER
} = process.env

function getServiceAccountCredentials() {
  if (!GOOGLE_SERVICE_ACCOUNT_KEY) return null
  try {
    // detect if base64
    let raw = GOOGLE_SERVICE_ACCOUNT_KEY.trim()
    if (raw.startsWith('{')) return JSON.parse(raw)
    // else assume base64 encoding
    const json = Buffer.from(raw, 'base64').toString('utf8')
    return JSON.parse(json)
  } catch (err) {
    console.error('Failed to parse Google service account key', err)
    return null
  }
}

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' })

  const { name, age, phone, email, service, message } = req.body || {}
  if (!name || !phone || !service) return res.status(400).json({ error: 'Missing required fields' })

  const creds = getServiceAccountCredentials()
  if (!creds) {
    console.error('Missing Google service account credentials')
    return res.status(500).json({ error: 'Server misconfigured' })
  }
  if (!SHEET_ID) {
    console.error('Missing SHEET_ID')
    return res.status(500).json({ error: 'Server misconfigured' })
  }

  try {
    // Create JWT auth client
    const jwt = new google.auth.JWT({
      email: creds.client_email,
      key: creds.private_key,
      scopes: ['https://www.googleapis.com/auth/spreadsheets']
    })
    await jwt.authorize()
    const sheets = google.sheets({ version: 'v4', auth: jwt })

    // Row values — put created_at first, then fields
    const row = [
      new Date().toISOString(),
      name,
      age || '',
      phone,
      email || '',
      service,
      message || ''
    ]

    // Append the row
    await sheets.spreadsheets.values.append({
      spreadsheetId: SHEET_ID,
      range: 'Sheet1',            // adjust if your sheet name is different
      valueInputOption: 'USER_ENTERED',
      insertDataOption: 'INSERT_ROWS',
      requestBody: {
        values: [row]
      }
    })

    // Optionally send Twilio WhatsApp messages (if configured)
    if (TWILIO_ACCOUNT_SID && TWILIO_AUTH_TOKEN && TWILIO_WHATSAPP_FROM && ADMIN_WHATSAPP_NUMBER) {
      const twilio = Twilio(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN)
      const adminBody = `New enquiry at Rudra Cura\nName: ${name}\nAge: ${age || '-'}\nPhone: ${phone}\nEmail: ${email || '-'}\nService: ${service}\nMessage: ${message || '-'}`
      await twilio.messages.create({
        from: TWILIO_WHATSAPP_FROM,
        to: ADMIN_WHATSAPP_NUMBER,
        body: adminBody
      })

      // try to notify client too (may fail in sandbox)
      const normalizedClient = phone.startsWith('whatsapp:') ? phone : `whatsapp:${phone}`
      try {
        await twilio.messages.create({
          from: TWILIO_WHATSAPP_FROM,
          to: normalizedClient,
          body: `Thank you ${name} for contacting Rudra Cura. We received your enquiry for "${service}".`
        })
      } catch (err) {
        console.warn('Client WhatsApp not sent:', err?.message || err)
      }
    }

    return res.status(200).json({ ok: true })
  } catch (err) {
    console.error('Error writing to Google Sheet or Twilio', err)
    return res.status(500).json({ error: 'Internal server error' })
  }
}