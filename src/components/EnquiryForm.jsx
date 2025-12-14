import React, { useState } from 'react'
import axios from 'axios'

export default function EnquiryForm({ defaultService, services = [] }) {
  const [form, setForm] = useState({
    name: '',
    age: '',
    phone: '',
    email: '',
    service: defaultService || (services[0] || ''),
    message: ''
  })
  const [loading, setLoading] = useState(false)
  const [status, setStatus] = useState(null)

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const submit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setStatus(null)
    try {
      const res = await axios.post('/api/submit', form)
      if (res.data?.ok) {
        setStatus({ type: 'success', message: 'Thank you! We will contact you shortly.' })
        setForm({
          name: '',
          age: '',
          phone: '',
          email: '',
          service: defaultService || (services[0] || ''),
          message: ''
        })
      } else {
        setStatus({ type: 'error', message: res.data?.error || 'Submission failed.' })
      }
    } catch (err) {
      setStatus({ type: 'error', message: err?.response?.data?.error || 'Network error' })
    } finally {
      setLoading(false)
    }
  }

  return (
    <form id="enquiry" onSubmit={submit} className="bg-white p-6 rounded-xl shadow-sm border max-w-xl">
      <h3 className="text-lg font-semibold mb-4 text-primary">Enquiry / Book a Session</h3>
      <div className="grid grid-cols-1 gap-3">
        <input required name="name" value={form.name} onChange={onChange} placeholder="Full name" className="input"/>
        <input required name="age" value={form.age} onChange={onChange} placeholder="Age" type="number" className="input"/>
        <input required name="phone" value={form.phone} onChange={onChange} placeholder="Phone (include country code, e.g. +9198...)" className="input"/>
        <input name="email" value={form.email} onChange={onChange} placeholder="Email (optional)" type="email" className="input"/>
        <select name="service" value={form.service} onChange={onChange} className="input">
          {services.map(s => <option key={s} value={s}>{s}</option>)}
        </select>
        <textarea name="message" value={form.message} onChange={onChange} placeholder="Any details or preferred timing" rows="3" className="input"></textarea>
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
