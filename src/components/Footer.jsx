import React from "react";
import { Link } from "react-router-dom";
import {
  FaInstagram,
  FaFacebook,
  FaWhatsapp, FaYoutube,
  FaMapMarkerAlt,
} from "react-icons/fa";
import { Helmet } from "react-helmet-async";

export default function Footer() {
  return (
    <footer className="bg-white/60 backdrop-blur-sm border-t">
      <Helmet>
  <script type="application/ld+json">
    {JSON.stringify({
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      "name": "Rudra Cura",
      "url": "https://rudracura.com",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Chennai",
        "addressCountry": "IN"
      },
      "email": "rudracura@gmail.com",
      "sameAs": [
        "https://www.instagram.com/rudracura",
        "https://www.facebook.com/rudracura"
      ]
    })}
  </script>
</Helmet>
      <div className="max-w-7xl mx-auto px-4 py-10 grid grid-cols-1 md:grid-cols-4 gap-8">

        {/* 1️⃣ Brand / Logo */}
        <div>
        <div>
          <h3 className="text-xl font-semibold text-primary">
            Rudra Cura
          </h3>
          <p className="text-sm text-gray-600 mt-2">
            Holistic Healing & Natural Therapies for pain relief and wellness.
          </p>
        </div>
             <div>
  <h4 className="font-semibold mb-3">Newsletter</h4>
  <p className="text-sm text-gray-600 mb-2">
    Get wellness tips and updates.
  </p>

  <form className="flex gap-2">
    <input
      type="email"
      required
      placeholder="Your email"
      className="border rounded px-3 py-2 text-sm w-full"
    />
    <button
      type="submit"
      className="subscribe-button bg-primary text-white px-4 py-2 rounded text-sm"
    >
      Subscribe
    </button>
  </form>
</div></div>

        {/* 2️⃣ Quick Links */}
        <div>
          <h4 className="font-semibold mb-3">Quick Links</h4>
          <ul className="space-y-2 text-sm">
            <li><Link to="/" className="hover:text-primary">Home</Link></li>
            <li><Link to="/services" className="hover:text-primary">Services</Link></li>
            <li><Link to="/programs" className="hover:text-primary">Programs</Link></li>
            <li><Link to="/about" className="hover:text-primary">About Us</Link></li>
            <li><Link to="/blog" className="hover:text-primary">Blog</Link></li>
            <li><Link to="/privacy-policy" className="hover:text-primary">Privacy Policy</Link></li>
            <li><Link to="/terms" className="hover:text-primary">Terms & Conditions</Link></li>
          </ul>
        </div>

        {/* 3️⃣ Contact & Address */}
        <div>
          <h4 className="font-semibold mb-3">Contact</h4>

          <p className="text-sm text-gray-600 mb-2">
            <FaMapMarkerAlt className="inline mr-2 text-primary" />
            29/1 Karaneeswarar temple road, Saidapet, Chennai- 15
          </p>

          <p className="text-sm">
            Email:{" "}
            <a
              href="mailto:rudracura@gmail.com"
              className="text-primary hover:underline"
            >
              rudracura@gmail.com
            </a>
          </p>

          <a
            href="https://maps.app.goo.gl/xuWstpNSaMqWP3jj7"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block mt-2 text-sm text-primary hover:underline"
          >
            View on Google Maps
          </a>
          <div className="mt-3 rounded-lg overflow-hidden border">
  <iframe
    title="Rudra Cura Location"
    src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d971.7991641972324!2d80.22241826962924!3d13.023145305816614!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMTPCsDAxJzIzLjMiTiA4MMKwMTMnMjMuMCJF!5e0!3m2!1sen!2sin!4v1768967142698!5m2!1sen!2sin"
    width="100%"
    height="180"
    loading="lazy"
    referrerPolicy="no-referrer-when-downgrade"
  />
</div>
        </div>


        {/* 4️⃣ Social Media */}
        <div>
          <h4 className="font-semibold mb-3">Follow Us</h4>
          <div className="flex gap-4 text-xl text-gray-600">
            <a href="https://www.instagram.com/rudra_cura/" target="_blank" rel="noreferrer" aria-label="Visit Rudra Cura Instagram page" className="hover:text-primary">
              <FaInstagram />
            </a>
            <a href="https://www.facebook.com/profile.php?id=61574053940608" target="_blank" rel="noreferrer" aria-label="Visit Rudra Cura Facebook page" className="hover:text-primary">
              <FaFacebook />
            </a>
            <a href="https://wa.me/917299636075" target="_blank" rel="noreferrer" aria-label="Chat with Rudra Cura on WhatsApp" className="hover:text-primary">
              <FaWhatsapp />
            </a>
            <a href="https://www.youtube.com/@RudraCura" target="_blank" rel="noreferrer" aria-label="Visit Rudra Cura YouTube channel" className="hover:text-primary"> <FaYoutube /> </a>
          </div>
        </div>
         </div>

      {/* Bottom copyright */}
      <div className="border-t">
        <div className="max-w-7xl mx-auto px-4 py-4 text-center text-sm text-gray-600">
          © {new Date().getFullYear()} Rudra Cura • All rights reserved
        </div>
      </div>
    </footer>
  );
}
