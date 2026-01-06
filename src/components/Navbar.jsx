import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FiMenu, FiX } from 'react-icons/fi'   // 👈 burger icons
import { memo } from "react";

export default memo(function Navbar() {
  const [open, setOpen] = useState(false)
  const loc = useLocation()

  const nav = [
    { to: '/', label: 'Home' },
    { to: '/services', label: 'Services' },
    { to: '/programs', label: 'Programs' },
    { to: '/about', label: 'About Us' },
    { to: '/careers', label: 'Careers' },
    { to: '/blog', label: 'Blog' },
  ]

  return (
    <motion.header className="bg-accent/70 backdrop-blur-sm sticky top-0 z-50 shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">

        {/* Logo */}
        <Link to="/" className="text-2xl font-bold text-primary">
          RUDRA <span className="font-light">CURA</span>
        </Link>

        {/* Desktop Menu */}
        <nav className="hidden md:flex space-x-8">
          {nav.map((n) => (
            <Link
              key={n.to}
              to={n.to}
              className={`text-sm font-medium ${
                loc.pathname === n.to ? 'text-primary' : 'text-gray-600 hover:text-primary'
              }`}
            >
              {n.label}
            </Link>
          ))}
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-3xl bg-primary"
          onClick={() => setOpen(!open)}
        >
          {open ? <FiX /> : <FiMenu />}
        </button>
      </div>

      {/* Mobile Dropdown */}
      {open && (
        <div className="md:hidden bg-white border-t shadow-sm">
          <nav className="flex flex-col p-4 space-y-4">
            {nav.map((n) => (
              <Link
                key={n.to}
                to={n.to}
                onClick={() => setOpen(false)}
                className={`text-base font-medium ${
                  loc.pathname === n.to ? 'text-primary' : 'text-gray-700 hover:text-primary'
                }`}
              >
                {n.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </motion.header>
  )
});
