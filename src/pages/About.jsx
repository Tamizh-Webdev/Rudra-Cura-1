import React from "react";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import founderImage from "/images/founder.webp";

export default function About() {
  return (
    <>
      {/* ================= SEO META ================= */}
      <Helmet>
        <title>About Rudra Cura | Holistic Wellness Center in Chennai</title>
        {/* Short meta description */}
        <meta
          name="description"
          content="Discover Rudra Cura, a leading wellness centre in Saidapet, Chennai offering  
          varma Thokkanam, meipadam, TCM, aromatherapy, yoga, and meditation. Reduce stress, improve vitality, and achieve 
          holistic health."
        />

        {/* Long meta description */}
        <meta
          name="keywords"
          content="Rudra Cura, holistic healing center, Holistic healing Chennai, Wellness centre in Saidapet Chennai, Varma Thokkanam, Dorn Therapy, reflexology, alternative therapy near me, natural pain relief, Stress management Chennai, Aromatherapy Chennai wellness, Yoga and meditation Saidapet "
        />
<meta property="og:title" content="About Rudra Cura | Holistic Wellness Center in Chennai" />
<meta
  property="og:description"
  content="Rudra Cura is a Chennai-based holistic wellness center offering natural healing therapies rooted in traditional wisdom and compassionate care."
/>
<meta property="og:url" content="https://rudracura.com/about" />
<meta property="og:type" content="website" />
<meta property="og:site_name" content="Rudra Cura" />
<meta property="og:image" content="https://rudracura.com/og/about.jpg" />
        {/* LocalBusiness + About schema */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            "name": "Rudra Cura",
            "description":
              "Rudra Cura is a holistic healing and alternative therapy center offering Varma Thokkanam, Dorn Therapy, Reflexology, and energy healing.",
            "url": "https://rudracura.com",
            "areaServed": {
              "@type": "Country",
              "name": "India"
            },
            "address": {
              "@type": "PostalAddress",
              "addressCountry": "IN"
            }
          })}
        </script>
      </Helmet>

      {/* ================= HERO SECTION ================= */}
      <section className="relative overflow-hidden rounded-3xl bg-[#5B2D00] text-white">
        <div className="absolute inset-0 bg-black/20" />

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative max-w-5xl mx-auto px-6 py-20 text-center"
        >
          <h1 className="text-4xl md:text-5xl font-bold leading-tight">
            Healing That Restores Balance,<br /> Strength & Inner Harmony
          </h1>

          <p className="mt-6 text-lg text-white/90 max-w-3xl mx-auto">
            At Rudra Cura, we guide individuals toward holistic wellness through
            ancient wisdom and conscious care.
          </p>

          <a
            href="#founder"
            className="inline-block mt-8 bg-[#E7B323] text-[#5B2D00] px-8 py-3 rounded-full font-semibold hover:scale-105 transition"
          >
            Meet Our Founder
          </a>
        </motion.div>
      </section>

      {/* ================= ABOUT CONTENT ================= */}
      <section className="max-w-6xl mx-auto px-6 py-16 space-y-14">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl font-bold text-[#5B2D00]">
            About Rudra Cura
          </h2>
          <p className="mt-4 text-gray-700 leading-relaxed max-w-4xl">
            Rudra Cura is a dedicated space designed to support and enhance an individual's overall well-being, 
            moving beyond mere illness treatment to proactive holistic health.
          </p>
          <h2 className="text-3xl font-bold text-[#5B2D00] mt-4">
            Our Philosophy
          </h2>
          <p className="mt-4 text-gray-700">At Rudra Cura, prevention is the foundation of health. We empower our clients with knowledge, 
            practices, and treatments that encourage long-term well-being. Whether you’re seeking stress 
            management and holistic healing in in Chennai, or a space to rejuvenate, 
            Rudra Cura is your trusted partner in wellness.
</p>
        </motion.div>

        {/* ================= WHY US ================= */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h3 className="text-2xl font-semibold text-[#5B2D00]">
            Why Choose Rudra Cura?
          </h3>

          <ul className="mt-4 grid sm:grid-cols-2 gap-4 text-gray-700">
            <li>✔ Certified & experienced practitioners</li>
            <li>✔ Personalized therapy plans</li>
            <li>✔ Gentle, non-invasive healing methods</li>
            <li>✔ Ethical, client-centered approach</li>
          </ul>
        </motion.div>

        {/* ================= CORE THERAPIES ================= */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h3 className="text-2xl font-semibold text-[#5B2D00]">
            Our Integrative Approach
          </h3>
<p className="mt-4 text-gray-700">Unlike conventional clinics, Rudra Cura focuses on preventive health and lifestyle enhancement. 
  We combine time-tested therapies with contemporary wellness techniques to support the mind, body, and spirit. 
  Our offerings include:
</p>
          <div className="mt-6 space-y-6 text-gray-700 max-w-4xl">
            <p><strong>Varma Thokkanam:</strong>South Indian healing traditions, activates vital energy points to relieve pain and restore circulation.</p>
            <p><strong>Dorn Therapy:</strong> Gentle spinal and joint realignment using guided movements for long-term relief.</p>
            <p><strong>Reflexology:</strong> Pressure-based therapy stimulating reflex zones for systemic balance.</p>
            <p><strong>Traditional Chinese Medicine (TCM):</strong>  for holistic healing.</p>
            <p><strong>Aromatherapy:</strong> Therapeutic essential oils supporting emotional calm and deep relaxation.</p>
<p><strong>Yoga & Meditation:</strong> for stress relief and inner clarity.</p>          
</div>
        </motion.div>
      </section>

      {/* ================= FOUNDER SECTION ================= */}
      <section
        id="founder"
        className="bg-accent py-20"
      >
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
          {/* Founder image */}
          <motion.img
            src={founderImage}
            alt="Founder of Rudra Cura"
            className="rounded-2xl shadow-lg w-full object-cover"
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          />

          {/* Founder content */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="text-3xl font-bold text-[#5B2D00]">
              Meet Our Founder
            </h3>

            <p className="mt-4 md:text-xl text-gray-700 leading-relaxed">
              Rudra Cura is the brainchild of Mr. Shankar G.K., a Cosmic Guru, whose life’s work has been 
              centered around the ancient arts of Adimurai, Kung Fu, Meipadam, Varmam, Energy Healing, and Guasa.
               Over the years, he has healed countless individuals, balancing their body, mind, and spirit.
            </p>

            <p className="mt-4 text-gray-700 md:text-xl">
              Driven by a desire to further empower others, he envisioned Rudra Cura as a way to offer holistic 
              healing to all. Mr. Shankar continues to expand his expertise, delving into the “64 Arts of Life” 
              (“Aaya Kalaigal 64”), including violin, arts, astrology, and more. His vision and dedication 
              inspire the essence of Rudra Cura.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ================= CTA ================= */}
      <section className="text-center py-20">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h3 className="text-3xl font-bold text-[#5B2D00]">
            Begin Your Healing Journey
          </h3>

          <p className="mt-4 text-gray-700">
            Experience personalized holistic care designed to restore balance and vitality.
          </p>

          <a
            href="/services"
            className="inline-block mt-6 bg-[#5B2D00] text-white px-8 py-3 rounded-full font-semibold hover:bg-[#4a2400] transition"
          >
            Explore Our Services
          </a>
        </motion.div>
      </section>
    </>
  );
}
