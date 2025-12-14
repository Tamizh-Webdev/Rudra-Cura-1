# Rudra Cura — Website (Vite + React + Tailwind)

This repository contains the Rudra Cura website scaffold with front-end (React + Tailwind) and a serverless API endpoint to receive enquiries, store them in Supabase, and send WhatsApp messages via Twilio.

## Features
- Home, Services, Programs, About, Careers pages
- Reusable Enquiry form included on Home, Services and Programs
- Supabase table to store submissions
- WhatsApp notifications using Twilio (admin + client confirmation)
- Embedded calendar reservation (placeholder iframe)
- Tailwind + framer-motion animations

## Required accounts & setup
1. Supabase
   - Create a project at https://app.supabase.com
   - In the SQL editor, run `supabase-migrations/create-enquiries-table.sql` to create the `enquiries` table.
   - Copy SUPABASE_URL and SUPABASE_KEY (service role or anon key depending on your setup)

2. Twilio (WhatsApp)
   - Create a Twilio account and enable the WhatsApp sandbox or register a WhatsApp Business number.
   - Note Twilio requires phone opt-ins for client messages in the sandbox. For production, you need an approved business profile.
   - Get TWILIO_ACCOUNT_SID and TWILIO_AUTH_TOKEN
   - Set TWILIO_WHATSAPP_FROM to the Twilio WhatsApp sender (e.g., "whatsapp:+1415xxxxxxx")
   - Set ADMIN_WHATSAPP_NUMBER to your admin WhatsApp number in format "whatsapp:+{country}{number}"

3. Environment variables (Vercel / local):
   - SUPABASE_URL
   - SUPABASE_KEY
   - TWILIO_ACCOUNT_SID
   - TWILIO_AUTH_TOKEN
   - TWILIO_WHATSAPP_FROM
   - ADMIN_WHATSAPP_NUMBER

## Local development
1. Install dependencies
   npm install

2. Create a `.env` file with the required variables above (for local dev, use a tool like `vercel env pull` or `dotenv` for your chosen platform).

3. Run
   npm run dev

4. Test the enquiry form in the browser. Submissions go to `/api/submit` which stores to Supabase and sends WhatsApp messages via Twilio.

## Deployment
- Recommended: Vercel — serverless API at /api/submit works out-of-the-box.
- Add the environment variables in your Vercel project settings.
- Deploy and test with Twilio sandbox initially.

## Notes on WhatsApp sending
- Twilio sandbox requires the receiving number to join the sandbox. For production sending to arbitrary clients, use a Twilio WhatsApp Business Account (and follow WhatsApp business policy).
- If Twilio refuses sending to a client (no sandbox opt-in or not allowed), admin will still receive the admin message.

## Content
- The site contains professional placeholder content inspired by Haaroma About page. Replace About/Service copy in `src/pages/About.jsx` and other pages to match your exact brand text if required.

If you want, I can:
- Push all files to your repo (I will need a GitHub push step or permission to push using the repo).
- Provide a ready-to-deploy Vercel configuration and GitHub Actions workflow.
