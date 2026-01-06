import React from "react";
import { Link } from "react-router-dom";
import {
  FaInstagram,
  FaFacebook,
  FaWhatsapp,
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
      "email": "info@rudracura.com",
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
      className="bg-primary text-white px-4 py-2 rounded text-sm"
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
            Chennai, Tamil Nadu, India
          </p>

          <p className="text-sm">
            Email:{" "}
            <a
              href="mailto:info@rudracura.com"
              className="text-primary hover:underline"
            >
              info@rudracura.com
            </a>
          </p>

          <a
            href="https://www.google.com/maps"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block mt-2 text-sm text-primary hover:underline"
          >
            View on Google Maps
          </a>
          <div className="mt-3 rounded-lg overflow-hidden border">
  <iframe
    title="Rudra Cura Location"
    src="https://www.google.com/maps?q=Chennai&t=&z=13&ie=UTF8&iwloc=&output=embed"
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
            <a href="https://instagram.com" target="_blank" rel="noreferrer" className="hover:text-primary">
              <FaInstagram />
            </a>
            <a href="https://facebook.com" target="_blank" rel="noreferrer" className="hover:text-primary">
              <FaFacebook />
            </a>
            <a href="https://wa.me/91XXXXXXXXXX" target="_blank" rel="noreferrer" className="hover:text-primary">
              <FaWhatsapp />
            </a>
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
