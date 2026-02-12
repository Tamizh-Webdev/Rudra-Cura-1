import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './src/components/Navbar'
import Footer from './src/components/Footer'
import { lazy, Suspense } from "react";
import ServiceDetail from "./src/pages/ServiceDetail"
import NotFound from "./src/pages/NotFound"

// Lazy-loaded components
const Home = lazy(() => import("./src/pages/Home"));
const Services = lazy(() => import("./src/pages/Services"));
const Careers = lazy(() => import("./src/pages/Careers"));
const Blog = lazy(() => import("./src/pages/Blog"));
const About = lazy(() => import("./src/pages/About"));
export default function App() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />

      <main className="flex-1 max-w-7xl mx-auto px-4 py-10 w-full">
        <div className=" backdrop-blur-xl p-6">
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
              <Route path="/services/:slug" element={<ServiceDetail />} />
              <Route path="/about" element={<About />} />
              <Route path="/careers" element={<Careers />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </div>
      </main>

      <Footer />
    </div>
  )
}