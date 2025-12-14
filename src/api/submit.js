/**
 * Serverless API endpoint (Vercel-style). Save at /src/api/submit.js
 * Responsibilities:
 * - Validate incoming enquiry POST body
 * - Insert into Supabase table "enquiries"
 * - Send WhatsApp messages through Twilio to ADMIN and to CLIENT
 *
 * Environment variables required:
 * - SUPABASE_URL
 * - SUPABASE_KEY
 * - TWILIO_ACCOUNT_SID
 * - TWILIO_AUTH_TOKEN
 * - TWILIO_WHATSAPP_FROM   (e.g. "whatsapp:+1415xxxxxxx")
 * - ADMIN_WHATSAPP_NUMBER  (e.g. "whatsapp:+9198xxxxxxx")
 *
 * Note: For deployment to other platforms, adapt export format accordingly.
 */

import { createClient } from '@supabase/supabase-js'
import Twilio from 'twilio'

const SUPABASE_URL = process.env.SUPABASE_URL
const SUPABASE_KEY = process.env.SUPABASE_KEY
const TWILIO_ACCOUNT_SID = process.env.TWILIO_ACCOUNT_SID
const TWILIO_AUTH_TOKEN = process.env.TWILIO_AUTH_TOKEN
const TWILIO_WHATSAPP_FROM = process.env.TWILIO_WHATSAPP_FROM // "whatsapp:+1415..."
const ADMIN_WHATSAPP_NUMBER = process.env.ADMIN_WHATSAPP_NUMBER  // "whatsapp:+91..."

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY)
const twilio = Twilio(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN)

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { name, age, phone, email, service, message } = req.body || {}

  if (!name || !phone || !service) {
    return res.status(400).json({ error: 'Missing required fields' })
  }

  try {
    // Save to Supabase
    const { error: insertErr } = await supabase
      .from('enquiries')
      .insert([{ name, age: age ? Number(age) : null, phone, email, service, message }])

    if (insertErr) {
      console.error('Supabase insert error', insertErr)
      return res.status(500).json({ error: 'Database error' })
    }

    // Compose messages
    const adminBody = `New enquiry at Rudra Cura\nName: ${name}\nAge: ${age || '-'}\nPhone: ${phone}\nEmail: ${email || '-'}\nService: ${service}\nMessage: ${message || '-'}`
    const clientBody = `Thank you ${name} for contacting Rudra Cura. We received your enquiry for "${service}". Our team will contact you shortly. - Rudra Cura`

    // Send to admin
    await twilio.messages.create({
      from: TWILIO_WHATSAPP_FROM,
      to: ADMIN_WHATSAPP_NUMBER,
      body: adminBody
    })

    // Attempt to send confirmation to client (must be whatsapp:+{number})
    const normalizedClient = phone.startsWith('whatsapp:') ? phone : `whatsapp:${phone}`
    try {
      await twilio.messages.create({
        from: TWILIO_WHATSAPP_FROM,
        to: normalizedClient,
        body: clientBody
      })
    } catch (clientErr) {
      // If client hasn't opted in or Twilio policy blocks sending, log and continue
      console.warn('Could not send client confirmation via WhatsApp:', clientErr.message)
    }

    return res.status(200).json({ ok: true })
  } catch (err) {
    console.error('submit handler error', err)
    return res.status(500).json({ error: 'Internal server error' })
  }
}
