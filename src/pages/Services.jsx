import React, { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import EnquiryForm from "../components/EnquiryForm"
import { Helmet } from "react-helmet-async"
import { Link } from "react-router-dom"
import { slugify } from "../utils/slug"
import varmaImg from "/images/varma.jpg"
import dorn from "/images/dorn.jpg"
import reflexology from "/images/Reflexology.jpg"
import footguasha from "/images/footguasha.jpg"
import meditation from "/images/kriya.webp"
import kriya from "/images/kriya.jpg"
import meipadam from "/images/meipadam.jpg"


/* ================= SERVICES DATA ================= */

const SERVICES = [
  {
    title: "Varma Thokkanam",
    image: {varmaImg},
    description:
      "An ancient Tamil Siddha therapy that stimulates vital energy points to relieve pain and restore balance.",
  },
  {
    title: "Dorn Therapy",
    image: {dorn},
    description:
      "A gentle manual therapy correcting spinal and joint misalignments through guided movements.",
  },
  {
    title: "Reflexology",
    image: {reflexology},
    description:
      "Targeted pressure therapy on reflex points to support internal organs and deep relaxation.",
  },
  {
    title: "Foot Gua Sha",
    image: {footguasha},
    description:
      "Traditional scraping therapy applied to the feet to improve circulation and energy flow.",
  },
  {
    title: "Meipadam",
    image: {meipadam},
    description:
      "Classical Siddha body therapy focused on muscle relaxation and nervous system balance.",
  },
  {
    title: "Meditation",
    image: {meditation},
    description:
      "Guided meditation sessions to calm the mind and enhance emotional wellbeing.",
  },
  {
    title: "Kriya",
    image: {kriya},
    description:
      "A powerful yogic practice combining breath, awareness, and energy alignment.",
  },
].map((s) => ({
  ...s,
  slug: slugify(s.title),
}))

/* ================= COMPONENT ================= */

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
      {/* ================= SEO ================= */}
      <Helmet>
        <title>Holistic Healing Services in Chennai | Rudra Cura</title>
        <meta
          name="description"
          content="Rudra Cura offers holistic healing services in Chennai including Varma Thokkanam, Dorn Therapy, Reflexology and Meditation for pain relief and wellbeing."
        />
        <meta property="og:title" content="Holistic Healing Services in Chennai | Rudra Cura" />
        <meta property="og:url" content="https://rudracura.com/services" />
        <meta property="og:type" content="website" />
      </Helmet>

      {/* ================= PAGE CONTENT ================= */}
      <div className="space-y-16">
        {/* HEADER */}
        <section className="text-center max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold text-primary">
            Holistic Healing Services in Chennai
          </h1>
          <p className="mt-4 text-gray-700">
            Personalized holistic therapies designed to relieve pain and restore balance.
          </p>
        </section>

        {/* SERVICES GRID */}
        <section className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((service, index) => (
            <motion.div
              key={service.slug}
              ref={(el) => (cardRefs.current[index] = el)}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              className="group relative bg-accent/70 backdrop-blur-xl rounded-2xl border border-white/40 shadow-sm overflow-hidden"
              onClick={() =>
                setActiveIndex(activeIndex === index ? null : index)
              }
            >
              {/* IMAGE */}
              <img
                src={service.image}
                alt={`${service.title} holistic therapy at Rudra Cura`}
                loading="lazy"
                decoding="async"
                sizes="(max-width: 640px) 100vw,
                       (max-width: 1024px) 50vw,
                       33vw"
                width="400"
                height="192"
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

              {/* DESKTOP HOVER */}
              <div className="hidden md:flex absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition items-center justify-center p-6">
                <div className="bg-white rounded-xl p-5 text-center shadow-xl max-w-xs">
                  <h4 className="text-lg font-semibold text-primary">
                    {service.title}
                  </h4>
                  <p className="mt-2 text-sm text-gray-700">
                    {service.description}
                  </p>

                  <Link
                    to={`/services/${service.slug}`}
                    className="mt-4 inline-block bg-primary text-white px-5 py-2 rounded-lg"
                  >
                    View Details
                  </Link>
                </div>
              </div>

              {/* MOBILE EXPAND */}
              <AnimatePresence>
                {activeIndex === index && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
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

                    <Link
                      to={`/services/${service.slug}`}
                      className="mt-6 bg-primary text-white py-3 rounded-lg text-center"
                    >
                      View Details
                    </Link>
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
