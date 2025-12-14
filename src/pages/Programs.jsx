import React from 'react'
import ProgramCard from '../components/ProgramCard'
import EnquiryForm from '../components/EnquiryForm'

const PROGRAMS = [
  { title: 'Pain Relief Program', summary: 'A 6-week program focused on chronic pain reduction using varma and Dorn therapy blends.' },
  { title: 'Stress & Sleep Renew', summary: 'A 4-week program combining reflexology and aromatherapy to restore restful sleep.' },
  { title: 'Joint Mobility Restore', summary: 'An 8-week guided plan with Dorn therapy and supportive modalities for joint health.' },
  { title: 'Holistic Wellness Retreat', summary: 'A weekend immersive designed to reset body and mind with personalized therapies.' }
]

export default function Programs(){
  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold text-primary">Programs</h2>
      <div className="grid md:grid-cols-2 gap-6">
        {PROGRAMS.map(p => <ProgramCard key={p.title} {...p} cta />)}
      </div>

      <div className="mt-6">
        <EnquiryForm services={[...PROGRAMS.map(p=>p.title),'Varma Thokkanam','Dorn Therapy','Reflexology','Aromatherapy']} />
      </div>
    </div>
  )
}
