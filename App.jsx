import React, { lazy, Suspense } from "react"
import { BrowserRouter, Routes, Route } from "react-router-dom"

import Navbar from "./src/components/Navbar"
import Footer from "./src/components/Footer"

import Programs from "./src/pages/Programs"
import About from "./src/pages/About"

const Home = lazy(() => import("./src/pages/Home"))
const Services = lazy(() => import("./src/pages/Services"))
const Careers = lazy(() => import("./src/pages/Careers"))
const Blog = lazy(() => import("./src/pages/Blog"))

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-background flex flex-col">
        <Navbar />

        {/* Page container */}
        <main className="flex-1 max-w-7xl mx-auto px-4 py-10 w-full">
          <div className="bg-white/70 backdrop-blur-xl p-6 rounded-xl">
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
    </BrowserRouter>
  )
}
