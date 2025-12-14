import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'

export default function Navbar() {
  const nav = [
    { to: '/', label: 'Home' },
    { to: '/services', label: 'Services' },
    { to: '/programs', label: 'Programs' },
    { to: '/about', label: 'About Us' },
    { to: '/careers', label: 'Careers' },
  ]
  const loc = useLocation()
  return (
    <motion.header className="bg-white/60 backdrop-blur-sm sticky top-0 z-50 shadow-sm">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link to="/" className="text-2xl font-semibold text-primary">RUDRA CURA</Link>
        <nav className="space-x-6 hidden md:block">
          {nav.map((n) => (
            <Link key={n.to} to={n.to} className={`text-sm font-medium ${loc.pathname === n.to ? 'text-primary' : 'text-gray-600'}`}>
              {n.label}
            </Link>
          ))}
        </nav>
      </div>
    </motion.header>
  )
}
