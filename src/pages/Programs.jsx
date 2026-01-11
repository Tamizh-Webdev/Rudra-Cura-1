import React from 'react'
import ProgramCard from '../components/ProgramCard'
import EnquiryForm from '../components/EnquiryForm'

const PROGRAMS = [
  { title: 'Superwoman', summary: 'A 6-week program focused on chronic pain reduction using varma and Dorn therapy blends.' },
  { title: 'Superman', summary: 'A 4-week program combining reflexology and aromatherapy to restore restful sleep.' },
  { title: 'Self Awareness/Life Mastery', summary: 'An 8-week guided plan with Dorn therapy and supportive modalities for joint health.' },
  { title: 'Pro Parent', summary: 'A weekend immersive designed to reset body and mind with personalized therapies.' },
  { title: 'Relationship Regulatory', summary: 'A weekend immersive designed to reset body and mind with personalized therapies.' }
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
