import React, { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import EnquiryForm from "../components/EnquiryForm"
import { Helmet } from "react-helmet-async";

const SERVICES = [
  {
    title: "Varma Thokkanam",
    image: "/src/images/dorn.jpeg",
    description:
      "An ancient Tamil Siddha technique that stimulates vital energy (varma) points to relieve pain, restore balance, and improve circulation.",
  },
  {
    title: "Dorn Therapy",
    image: "/src/images/dorn.jpeg",
    description:
      "A gentle manual therapy correcting spinal and joint misalignments through guided movements and active client participation.",
  },
  {
    title: "Reflexology",
    image: "/src/images/dorn.jpeg",
    description:
      "Targeted pressure therapy on reflex points of the feet and hands to support internal organs and promote deep relaxation.",
  },
  {
    title: "Foot Gua Sha",
    image: "/src/images/dorn.jpeg",
    description:
      "A traditional scraping technique applied to the feet to improve circulation, detoxification, and energy flow.",
  },
  {
    title: "Meipadam",
    image: "/src/images/dorn.jpeg",
    description:
      "A classical Siddha body therapy focused on muscle relaxation, joint mobility, and nervous system balance.",
  },
  {
    title: "Meditation",
    image: "/src/images/dorn.jpeg",
    description:
      "Guided meditation sessions designed to calm the mind, reduce stress, and improve emotional wellbeing.",
  },
  {
    title: "Kriya",
    image: "/src/images/dorn.jpeg",
    description:
      "A powerful yogic practice combining breath, awareness, and energy alignment for holistic transformation.",
  },
]

export default function Services() {
  const [activeIndex, setActiveIndex] = useState(null)
  const [selectedService, setSelectedService] = useState("")
  const cardRefs = useRef([])

  /* CLOSE ON TAP OUTSIDE (MOBILE) */
  useEffect(() => {
    function handleClickOutside(e) {
      if (
        activeIndex !== null &&
        cardRefs.current[activeIndex] &&
        !cardRefs.current[activeIndex].contains(e.target)
      ) {
        setActiveIndex(null)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    document.addEventListener("touchstart", handleClickOutside)

    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
      document.removeEventListener("touchstart", handleClickOutside)
    }
  }, [activeIndex])

  return (
    <>
      <Helmet>
  <script type="application/ld+json">
    {JSON.stringify([
      {
        "@context": "https://schema.org",
        "@type": "Service",
        "name": "Varma Thokkanam Therapy",
        "description": "Traditional Siddha Varma Thokkanam therapy for pain relief, energy balance and holistic healing.",
        "provider": {
          "@type": "LocalBusiness",
          "name": "Rudra Cura",
          "url": "https://rudracura.com"
        },
        "areaServed": {
          "@type": "Place",
          "name": "India"
        }
      },
      {
        "@type": "Service",
        "name": "Dorn Therapy",
        "description": "Gentle manual therapy for spinal alignment and joint correction.",
        "provider": {
          "@type": "LocalBusiness",
          "name": "Rudra Cura"
        }
      },
      {
        "@type": "Service",
        "name": "Reflexology Therapy",
        "description": "Reflexology therapy for stress relief and internal balance.",
        "provider": {
          "@type": "LocalBusiness",
          "name": "Rudra Cura"
        }
      },
      {
        "@type": "Service",
        "name": "Meditation and Kriya",
        "description": "Guided meditation and kriya practices for mental clarity and emotional wellbeing.",
        "provider": {
          "@type": "LocalBusiness",
          "name": "Rudra Cura"
        }
      }
    ])}
  </script>
  <script type="application/ld+json">
    {JSON.stringify({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "What is Varma Thokkanam therapy?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Varma Thokkanam is a traditional Siddha therapy that stimulates vital energy points to relieve pain and restore balance."
          }
        },
        {
          "@type": "Question",
          "name": "Is Dorn Therapy safe?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes, Dorn Therapy is a gentle and safe manual therapy suitable for all age groups."
          }
        },
        {
          "@type": "Question",
          "name": "How do I book a session at Rudra Cura?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "You can book a session through our website enquiry form or contact us directly via WhatsApp."
          }
        }
      ]
    })}
  </script>
</Helmet>

    <div className="space-y-16">
      {/* HEADER */}
      <section className="text-center max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold text-primary">
          Holistic Healing Services
        </h1>
        <p className="mt-4 text-gray-700">
          Each therapy at Rudra Cura is designed to restore balance, relieve pain,
          and support your body’s natural healing intelligence.
        </p>
      </section>

      {/* SERVICES GRID */}
      <section className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {SERVICES.map((service, index) => (
          <motion.div
            ref={(el) => (cardRefs.current[index] = el)}
            key={service.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: "easeOut", delay: index * 0.05 }}
            className="group relative bg-accent/70 backdrop-blur-xl rounded-2xl border border-white/40 shadow-sm overflow-hidden"
            onClick={() =>
              setActiveIndex(activeIndex === index ? null : index)
            }
          >
            {/* IMAGE */}
            <img
              src={service.image}
              alt={service.title}
              loading="lazy"
              className="h-48 w-full object-cover"
            />

            {/* CONTENT */}
            <div className="p-6">
              <h3 className="text-xl font-semibold text-primary">
                {service.title}
              </h3>
              <p className="mt-2 text-sm text-gray-600 line-clamp-3">
                {service.description}
              </p>
            </div>

            {/* DESKTOP HOVER OVERLAY */}
            <div className="hidden md:flex absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition duration-300 items-center justify-center p-6">
              <div className="bg-white rounded-xl p-5 text-center shadow-xl max-w-xs">
                <h4 className="text-lg font-semibold text-primary">
                  {service.title}
                </h4>
                <p className="mt-2 text-sm text-gray-700">
                  {service.description}
                </p>
                <a
                  href="#enquiry"
                  onClick={() => setSelectedService(service.title)}
                  className="mt-4 inline-block bg-primary text-white px-5 py-2 rounded-lg text-sm font-medium"
                >
                  Enquire Now
                </a>
              </div>
            </div>

            {/* MOBILE EXPAND (ANIMATED) */}
            <AnimatePresence>
              {activeIndex === index && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.25, ease: "easeOut" }}
                  className="md:hidden absolute inset-0 bg-accent z-20 p-6 flex flex-col justify-between"
                >
                  <div>
                    <h4 className="text-xl font-semibold text-primary">
                      {service.title}
                    </h4>
                    <p className="mt-3 text-gray-700">
                      {service.description}
                    </p>
                  </div>

                  <a
                    href="#enquiry"
                    onClick={() => {
                      setSelectedService(service.title)
                      setActiveIndex(null)
                    }}
                    className="mt-6 text-center bg-primary text-white py-3 rounded-lg font-medium"
                  >
                    Enquire Now
                  </a>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </section>

      {/* ENQUIRY FORM */}
      <div id="enquiry">
        <EnquiryForm
          services={SERVICES.map((s) => s.title)}
          selectedService={selectedService}
        />
      </div>
    </div>
    </>
  )
}
