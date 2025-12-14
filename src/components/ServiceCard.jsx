import React from 'react'
import { motion } from 'framer-motion'

export default function ServiceCard({ title, description }) {
  return (
    <motion.div whileHover={{ y: -6 }} className="bg-white p-6 rounded-xl shadow-sm border">
      <h3 className="text-xl font-semibold mb-2 text-primary">{title}</h3>
      <p className="text-gray-700">{description}</p>
    </motion.div>
  )
}
