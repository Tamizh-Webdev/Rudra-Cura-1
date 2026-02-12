import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FiMenu, FiX } from 'react-icons/fi'   // 👈 burger icons
import { memo } from "react";
import logo from '/images/logo.jpeg';

export default memo(function Navbar() {
  const [open, setOpen] = useState(false)
  const loc = useLocation()

  const nav = [
    { to: '/', label: 'Home' },
    { to: '/services', label: 'Services' },
    { to: '/about', label: 'About Us' },
    { to: '/careers', label: 'Careers' },
    { to: '/blog', label: 'Blog' },
  ]

  return (
    <motion.header className="bg-accent/70 backdrop-blur-sm sticky top-0 z-50 shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">

        {/* Logo */}
        <Link
  to="/"
  className="flex items-center gap-2 text-2xl font-bold text-primary"
  aria-label="Rudra Cura Home"
>
  <img
    src={logo}
    alt="Rudra Cura Logo"
    width="40"
    height="40"
    loading="eager"
    decoding="async"
    className="h-10 w-10 object-contain"
  />

  <span>
    RUDRA <span className="font-light">CURA</span>
  </span>
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
          className="sandwich-button md:hidden text-3xl bg-/70"
          onClick={() => setOpen(!open)}
        >
          {open ? <FiX /> : <FiMenu />}
        </button>
      </div>

      {/* Mobile Dropdown */}
      {open && (
        <div className="md:hidden bg-accent border-t shadow-sm">
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
