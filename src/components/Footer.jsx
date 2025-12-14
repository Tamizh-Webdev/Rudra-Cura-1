import React from 'react'

export default function Footer() {
  return (
    <footer className="bg-white/60 backdrop-blur-sm border-t">
      <div className="max-w-7xl mx-auto px-4 py-6 flex justify-between items-center">
        <div className="text-sm text-gray-600">
          © {new Date().getFullYear()} Rudra Cura • All rights reserved
        </div>
        <div className="text-sm text-gray-600">
          Contact:{' '}
          <a href="mailto:info@rudracura.com" className="text-primary hover:underline">
            info@rudracura.com
          </a>
        </div>
      </div>
    </footer>
  )
}
