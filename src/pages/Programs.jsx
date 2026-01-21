import React from 'react'
import ProgramCard from '../components/ProgramCard'
import EnquiryForm from '../components/EnquiryForm'
import { Helmet } from "react-helmet-async"

const PROGRAMS = [
  { title: 'Superwoman', summary: 'A 6-week program focused on chronic pain reduction using varma and Dorn therapy blends.' },
  { title: 'Superman', summary: 'A 4-week program combining reflexology and aromatherapy to restore restful sleep.' },
  { title: 'Self Awareness/Life Mastery', summary: 'An 8-week guided plan with Dorn therapy and supportive modalities for joint health.' },
  { title: 'Pro Parent', summary: 'A weekend immersive designed to reset body and mind with personalized therapies.' },
  { title: 'Relationship Regulatory', summary: 'A weekend immersive designed to reset body and mind with personalized therapies.' }
]

export default function Programs(){
  return (
   <>
       <Helmet>
           <title>Wellness & Healing Programs in Chennai | Rudra Cura</title>
          <meta
     name="description"
     content="Rudra Cura offers holistic healing services in Chennai including Varma Thokkanam, Dorn Therapy, Reflexology and Aromatherapy for pain relief and wellness. Book a session today."
   />
   <meta property="og:title" content="Wellness & Healing Programs | Rudra Cura Chennai" />
<meta
  property="og:description"
  content="Discover guided wellness programs at Rudra Cura that support pain relief, emotional balance and holistic transformation."
/>
<meta property="og:url" content="https://rudracura.com/programs" />
<meta property="og:type" content="website" />
<meta property="og:site_name" content="Rudra Cura" />
<meta property="og:image" content="https://rudracura.com/og/programs.jpg" />
   </Helmet>
    <div className="space-y-6">
      <h2 className="text-3xl font-bold text-primary">Programs</h2>
      <div className="grid md:grid-cols-2 gap-6">
        {PROGRAMS.map(p => <ProgramCard key={p.title} {...p} cta />)}
      </div>

      <div className="mt-6">
        <EnquiryForm services={[...PROGRAMS.map(p=>p.title),'Varma Thokkanam','Dorn Therapy','Reflexology','Aromatherapy']} />
      </div>
    </div>
    </>
  )
}
