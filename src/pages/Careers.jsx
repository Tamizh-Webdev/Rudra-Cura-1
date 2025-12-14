import React from 'react'

export default function Careers(){
  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold text-primary">Careers</h2>
      <p className="text-gray-700">Join our team of compassionate practitioners. We look for certified therapists with dedication to client care and continuous learning.</p>

      <div className="bg-white p-6 rounded-xl shadow-sm border">
        <h4 className="font-semibold">Open Positions</h4>
        <ul className="mt-3 list-disc list-inside text-gray-700">
          <li>Varma Thokkanam Therapist (Full-time/Part-time)</li>
          <li>Dorn Therapy Practitioner</li>
          <li>Reflexologist</li>
          <li>Reception & Frontdesk Coordinator</li>
        </ul>
        <p className="mt-4 text-sm text-gray-600">To apply, email your CV and cover letter to <a href="mailto:careers@rudracura.com" className="text-primary">careers@rudracura.com</a></p>
      </div>
    </div>
  )
}
