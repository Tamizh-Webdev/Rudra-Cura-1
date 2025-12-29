const path = require('path')
const { pathToFileURL } = require('url')

let cachedHandler = null

module.exports = async function handler(req, res) {
  if (!cachedHandler) {
    const modPath = path.resolve(__dirname, 'submit.js')
    const fileUrl = pathToFileURL(modPath).href
    // Import the ESM module dynamically and cache the default export
    const mod = await import(fileUrl)
    cachedHandler = mod && (mod.default || mod.handler || mod)
  }

  if (!cachedHandler) {
    return res.status(500).json({ error: 'Handler not available' })
  }

  return cachedHandler(req, res)
}
