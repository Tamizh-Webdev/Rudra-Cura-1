const express = require('express')
require('dotenv').config()
const path = require('path')

const app = express()
app.use(express.json())

let handlerModule = null
// Try to dynamically import the ESM serverless handler if proper env vars are present
const { pathToFileURL } = require('url')

async function tryLoadHandler() {
  try {
    // Only attempt if production credentials present
    const hasCreds = process.env.GOOGLE_SERVICE_ACCOUNT_KEY && process.env.SHEET_ID
    if (!hasCreds) return

    const modPath = path.resolve(__dirname, 'api', 'submit.js')
    const fileUrl = pathToFileURL(modPath).href
    handlerModule = await import(fileUrl)
    console.log('Loaded API handler from', fileUrl)
    return
  } catch (err) {
    console.warn('Could not import ESM handler:', err.message)
  }

  // Fallback: attempt to load CommonJS wrapper (api/submit.cjs) for local compatibility
  try {
    const wrapperPath = path.resolve(__dirname, 'api', 'submit.cjs')
    const wrapper = require(wrapperPath)
    handlerModule = { default: wrapper }
    console.log('Loaded CJS wrapper handler from', wrapperPath)
  } catch (err2) {
    console.warn('Could not load CJS handler wrapper; running in mock mode:', err2.message)
    handlerModule = null
  }
}

tryLoadHandler()

// Health check for local testing
app.get('/api/health', (req, res) => {
  return res.json({ ok: true, mode: handlerModule ? (handlerModule.default ? 'handler-loaded' : 'handler-present') : 'mock' })
})

app.post('/api/submit', async (req, res) => {
  // If handler module loaded, delegate
  if (handlerModule && handlerModule.default) {
    try {
      // handler is an async function (req, res)
      return await handlerModule.default(req, res)
    } catch (err) {
      console.error('Handler error:', err)
      return res.status(500).json({ error: 'Internal server error' })
    }
  }

  // Mock behaviour for local testing if handler not available
  const { name, phone, service } = req.body || {}
  if (!name || !phone || !service) return res.status(400).json({ error: 'Missing required fields' })

  console.log('Mock submit received:', req.body)
  // Optionally, append to a local file for debugging
  try {
    const fs = require('fs')
    const logLine = JSON.stringify({ at: new Date().toISOString(), body: req.body }) + '\n'
    fs.appendFileSync(path.resolve(__dirname, 'mock-enquiries.log'), logLine)
  } catch (e) {
    // ignore write errors
  }

  return res.json({ ok: true, mocked: true })
})

const port = process.env.PORT || 3000
app.listen(port, () => {
  console.log(`API shim listening on http://localhost:${port}`)
  if (!handlerModule) console.log('Running in MOCK mode — set GOOGLE_SERVICE_ACCOUNT_KEY and SHEET_ID to enable real handler')
})
