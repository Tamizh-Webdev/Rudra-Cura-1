import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Navbar from './src/components/Navbar'
import Footer from './src/components/Footer'
import Home from './src/pages/Home'
import Services from './src/pages/Services'
import Programs from './src/pages/Programs'
import About from './src/pages/About'
import Careers from './src/pages/Careers'

 export default function App() {
  return (
    <div className="min-h-screen bg-[#f7f5ef]">
      <Navbar />

      {/* Page container */}
      <div className="max-w-7xl mx-auto px-4">
        <main className="py-10">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/services" element={<Services />} />
            <Route path="/programs" element={<Programs />} />
            <Route path="/about" element={<About />} />
            <Route path="/careers" element={<Careers />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </div>
  )
 }

