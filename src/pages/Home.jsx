import React from 'react'
import EnquiryForm from '../components/EnquiryForm'
import { motion } from 'framer-motion'

const SERVICES = ['Varma Thokkanam','Dorn Therapy','Reflexology','Aromatherapy']

export default function Home(){
  return (
    <div className="space-y-10">
      <section className="grid md:grid-cols-2 gap-6 items-center">
        <div>
          <motion.h1 initial={{ y: 10, opacity: 0 }} animate={{ y:0, opacity:1 }} className="text-4xl font-bold text-primary">Rudra Cura — Holistic Healing & Alternative Therapies</motion.h1>
          <p className="mt-4 text-gray-700">We blend ancient wisdom and modern practice to provide personalized therapy plans that restore balance, relieve pain, and improve wellbeing.</p>
          <div className="mt-6">
            <a href="/services" className="bg-primary text-white px-4 py-2 rounded">Explore Services</a>
          </div>
        </div>
        <div>
          <EnquiryForm services={SERVICES} defaultService="Varma Thokkanam" />
        </div>
      </section>

      <section className="grid md:grid-cols-4 gap-4">
        {SERVICES.map(s => (
          <div key={s} className="bg-white p-6 rounded-xl shadow-sm border">
            <h4 className="font-semibold text-primary">{s}</h4>
            <p className="text-sm text-gray-700 mt-2">Click Services page for full details and to book a session.</p>
          </div>
        ))}
      </section>
    </div>
  )
}
