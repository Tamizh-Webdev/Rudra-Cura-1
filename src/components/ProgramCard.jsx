import React from 'react'
import { motion } from 'framer-motion'

export default function ProgramCard({ title, summary, cta }) {
  return (
    <motion.div whileHover={{ scale: 1.02 }} className="bg-white p-6 rounded-xl shadow-sm border">
      <h4 className="text-lg font-semibold mb-2 text-primary">{title}</h4>
      <p className="text-gray-700">{summary}</p>
      {cta && <div className="mt-4"><a className="text-sm text-white bg-primary px-3 py-2 rounded" href="#enquiry">Enquire</a></div>}
    </motion.div>
  )
}
