import React, { useState } from 'react'
import axios from 'axios'

const COUNTRY_CODES = [
  { code: "+91", label: "India (+91)" },
  { code: "+1", label: "USA (+1)" },
  { code: "+44", label: "UK (+44)" },
  { code: "+61", label: "Australia (+61)" },
];

export default function EnquiryForm({ defaultService, services = [] }) {
  const [form, setForm] = useState({
    name: "",
    age: "",
    email: "",
    service: defaultService || services[0] || "",
    message: "",
  });

  const [countryCode, setCountryCode] = useState("+91");
  const [phone, setPhone] = useState("");
const [whatsappOptIn, setWhatsappOptIn] = useState(false);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(null);

  const onChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();

    // ✅ Phone validation (ONLY here)
    if (!/^\d{10}$/.test(phone)) {
      setStatus({ type: "error", message: "Phone number must be exactly 10 digits" });
      return;
    }

    const fullPhone = `${countryCode}${phone}`;

    setLoading(true);
    setStatus(null);

    try {
      const res = await axios.post("/api/submit", {
        ...form,
        phone: fullPhone,
         whatsappOptIn, // ✅ correct phone sent
      });

      if (res.data?.ok) {
        setStatus({
          type: "success",
          message: "Thank you! We will contact you shortly.",
        });

        setForm({
          name: "",
          age: "",
          email: "",
          service: defaultService || services[0] || "",
          message: "",
        });

        setPhone("");
        setCountryCode("+91");
      } else {
        setStatus({
          type: "error",
          message: res.data?.error || "Submission failed",
        });
      }
    } catch (err) {
      setStatus({
        type: "error",
        message: err?.response?.data?.error || "Network error",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    
    <form id="enquiry" onSubmit={submit} className="bg-accent p-6 rounded-xl shadow-sm  max-w-xl">
      <h3 className="text-lg font-semibold mb-4 text-primary">Enquiry / Book a Session</h3>
      <div className="grid grid-cols-1 gap-3">
        <input required name="name" value={form.name} onChange={onChange} placeholder="Full name" className="input"/>
        <input required name="age" value={form.age} onChange={onChange} placeholder="Age" type="number" className="input"/>
<div className="grid grid-cols-3 gap-2">
  <select
    value={countryCode}
    onChange={(e) => setCountryCode(e.target.value)}
    className="border rounded px-3 py-2"
    required
  >
    {COUNTRY_CODES.map(c => (
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
    onChange={(e) =>
      setPhone(e.target.value.replace(/\D/g, ""))
    }
    className="border rounded px-3 py-2 col-span-2"
    required
  />
</div>             
<input name="email" value={form.email} onChange={onChange} placeholder="Email" type="email" className="input"/>
        <select name="service" value={form.service} onChange={onChange} className="input">
          {services.map(s => <option key={s} value={s}>{s}</option>)}
        </select>
        <textarea name="message" value={form.message} onChange={onChange} placeholder="Any details or preferred timing" rows="3" className="input"></textarea>
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
        <div className="flex items-center justify-between">
          <button type="submit" disabled={loading} className="bg-primary text-white px-4 py-2 rounded">
            {loading ? 'Sending…' : 'Submit Enquiry'}
          </button>
          <div className="text-sm text-gray-600">{status ? status.message : ''}</div>
        </div>
      </div>
      <style jsx>{`
        .input {
          border: 1px solid #e6e6e6;
          padding: 0.6rem;
          border-radius: 0.5rem;
          font-size: 0.95rem;
        }
      `}</style>
    </form>
    
  )
}
