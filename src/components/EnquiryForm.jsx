import React, { useState, useEffect } from "react"
import axios from "axios"
import { motion, AnimatePresence } from "framer-motion"

const COUNTRY_CODES = [
  { code: "+91", label: "India (+91)" },
  { code: "+1", label: "USA (+1)" },
  { code: "+44", label: "UK (+44)" },
  { code: "+61", label: "Australia (+61)" },
]

export default function EnquiryForm({
  services = [],
  defaultService = "",
  selectedService = "",
}) {
  const [form, setForm] = useState({
    name: "",
    age: "",
    email: "",
    service: defaultService || services[0] || "",
    message: "",
  })

  const [countryCode, setCountryCode] = useState("+91")
  const [phone, setPhone] = useState("")
  const [whatsappOptIn, setWhatsappOptIn] = useState(false)
  const [loading, setLoading] = useState(false)
  const [status, setStatus] = useState(null)
  const [showSuccess, setShowSuccess] = useState(false)

  /* 🔄 AUTO-SELECT SERVICE (FROM SERVICES PAGE) */
  useEffect(() => {
    if (selectedService) {
      setForm((prev) => ({
        ...prev,
        service: selectedService,
      }))
    }
  }, [selectedService])

  const onChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value })

  const submit = async (e) => {
    e.preventDefault()

    // ✅ Phone validation (10 digits only)
    if (!/^\d{10}$/.test(phone)) {
      setStatus({
        type: "error",
        message: "Phone number must be exactly 10 digits",
      })
      return
    }

    const fullPhone = `${countryCode}${phone}`

    setLoading(true)
    setStatus(null)

    try {
      const res = await axios.post(
  import.meta.env.DEV
    ? "http://localhost:3000/api/submit"
    : "/api/submit",
  {
    ...form,
    phone: fullPhone,
    whatsappOptIn,
  }
)

     if (res.data?.ok) {
  setShowSuccess(true)

  setTimeout(() => {
    setShowSuccess(false)
    setStatus(null)
  }, 4000)

        setForm({
          name: "",
          age: "",
          email: "",
          service: defaultService || services[0] || "",
          message: "",
        })

        setPhone("")
        setCountryCode("+91")
        setWhatsappOptIn(false)
      } else {
        setStatus({
          type: "error",
          message: res.data?.error || "Submission failed",
        })
      }
    } catch (err) {
      setStatus({
        type: "error",
        message: err?.response?.data?.error || "Network error",
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <AnimatePresence mode="wait">
  {!showSuccess ? (
    <motion.form
      key="form"
      id="enquiry"
      onSubmit={submit}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      className="bg-accent p-6 rounded-xl shadow-sm max-w-xl"
    >
      <h3 className="text-lg font-semibold mb-4 text-primary">
        Enquiry / Book a Session
      </h3>

      <div className="grid grid-cols-1 gap-3">
        <input
          required
          name="name"
          value={form.name}
          onChange={onChange}
          placeholder="Full name"
          className="input"
        />

        <input
          required
          name="age"
          value={form.age}
          onChange={onChange}
          placeholder="Age"
          type="number"
          className="input"
        />

        {/* PHONE */}
        <div className="grid grid-cols-3 gap-2">
          <select
            value={countryCode}
            onChange={(e) => setCountryCode(e.target.value)}
            className="border rounded px-3 py-2"
            required
          >
            {COUNTRY_CODES.map((c) => (
              <option key={c.code} value={c.code}>
                {c.label}
              </option>
            ))}
          </select>

          <input
            type="text"
            inputMode="numeric"
            maxLength={10}
            placeholder="10-digit phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value.replace(/\D/g, ""))}
            className="border rounded px-3 py-2 col-span-2"
            required
          />
        </div>

        <input
          name="email"
          value={form.email}
          onChange={onChange}
          placeholder="Email"
          type="email"
          className="input"
        />

        <select
          name="service"
          value={form.service}
          onChange={onChange}
          className="input"
        >
          {services.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>

        <textarea
          name="message"
          value={form.message}
          onChange={onChange}
          placeholder="Any details or preferred timing"
          rows="3"
          className="input"
        />

        {/* WHATSAPP CONSENT */}
        <label className="flex items-start gap-2 text-sm text-gray-700">
          <input
            type="checkbox"
            checked={whatsappOptIn}
            onChange={(e) => setWhatsappOptIn(e.target.checked)}
            className="mt-1"
            required
          />
          I agree to receive WhatsApp messages.
        </label>

        {/* SUBMIT */}
        <div className="flex items-center justify-between">
          <button
            type="submit"
            disabled={loading}
            className="bg-primary text-white px-4 py-2 rounded"
          >
            {loading ? "Sending…" : "Submit Enquiry"}
          </button>

          <div className="text-sm text-gray-600">
            {status ? status.message : ""}
          </div>
        </div>
      </div>

      <style jsx>{`
        .input {
          border: 1px solid #e6e6e6;
          padding: 0.6rem;
          border-radius: 0.5rem;
          font-size: 0.95rem;
          width: 100%;
        }
      `}</style>
    </motion.form>
  ) : (
    <motion.div
      key="success"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="bg-accent p-8 rounded-xl shadow-sm max-w-xl text-center"
    >
      {/* SUCCESS ICON */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 260, damping: 18 }}
        className="mx-auto mb-4 w-14 h-14 rounded-full bg-green-100 flex items-center justify-center"
      >
        <svg
          className="w-7 h-7 text-green-600"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M5 13l4 4L19 7"
          />
        </svg>
      </motion.div>

      <h4 className="text-xl font-semibold text-primary">
        Enquiry Sent Successfully!
      </h4>
      <p className="mt-2 text-gray-700">
        Thank you for reaching out. Our team will contact you shortly.
      </p>
    </motion.div>
  )}
</AnimatePresence>

  )
}
