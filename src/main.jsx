import React from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from "../App"
import './index.css'
import { HelmetProvider } from "react-helmet-async";
import ScrollToTop from "./components/ScrollToTop";

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <HelmetProvider>
        <ScrollToTop />
        <App />
      </HelmetProvider>
    </BrowserRouter>
  </React.StrictMode>
)
    