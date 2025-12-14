import React from 'react'
import ServiceCard from '../components/ServiceCard'
import EnquiryForm from '../components/EnquiryForm'

const SERVICES = [
  {
    title: 'Varma Thokkanam',
    description: 'An ancient Tamil Siddha technique focusing on stimulating varma (vital energy) points to restore balance, relieve pain and enhance circulation.'
  },
  {
    title: 'Dorn Therapy',
    description: 'A gentle manual therapy that corrects spinal and joint misalignments using guided movements and real-time client participation.'
  },
  {
    title: 'Reflexology',
    description: 'Targeted pressure to zones on the feet, hands, and ears that correspond with body systems to promote deep relaxation and healing.'
  },
  {
    title: 'Aromatherapy',
    description: 'Therapeutic use of natural essential oils blended to reduce stress, improve sleep and enhance overall wellbeing.'
  }
]

export default function Services(){
  return (
    <div className="space-y-8">
      <h2 className="text-3xl font-bold text-primary">Our Services</h2>
      <div className="grid md:grid-cols-2 gap-6">
        {SERVICES.map(s => <ServiceCard key={s.title} title={s.title} description={s.description} />)}
      </div>

      <section className="mt-6">
        <h3 className="text-2xl font-semibold text-primary">Book an Appointment</h3>
        <p className="text-gray-700 mt-2">Use our calendar booking below or send an enquiry — we'll confirm availability.</p>

        <div className="mt-4">
          {/* Replace href below with your Calendly or Google booking embed link */}
          <iframe title="Booking" src="https://calendly.com/" className="w-full h-96 border rounded"></iframe>
        </div>
      </section>

      <div className="mt-6">
        <EnquiryForm services={SERVICES.map(s=>s.title)} />
      </div>
    </div>
  )
}
