import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Navbar from './src/components/Navbar'
import Footer from './src/components/Footer'
import Programs from './src/pages/Programs'
import About from './src/pages/About'
import { lazy, Suspense } from "react";
const Home = lazy(() => import("./src/pages/Home"));
const Services = lazy(() => import("./src/pages/Services"));
const Careers = lazy(() => import("./src/pages/Careers"));
const Blog = lazy(() => import("./src/pages/Blog"));
<Suspense fallback={<div className="text-center">Loading...</div>}>
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/services" element={<Services />} />
  </Routes>
</Suspense>
 export default function App() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />

      {/* Page container */}
   <main className="flex-1 max-w-7xl mx-auto px-4 py-10 w-full">
    <div className="bg-white/70 backdrop-blur-xl rounded-2xl shadow-sm border border-white/40 p-6">
        <Suspense
          fallback={
            <div className="flex justify-center items-center py-20 text-gray-600">
              Loading...
            </div>
          }
        >
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/services" element={<Services />} />
            <Route path="/programs" element={<Programs />} />
            <Route path="/about" element={<About />} />
            <Route path="/careers" element={<Careers />} />
            <Route path="/blog" element={<Blog />} />
          </Routes>
        </Suspense>
        </div>
      </main>

      <Footer />
    </div>
  )
 }

