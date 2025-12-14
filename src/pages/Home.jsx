import React from "react";
import EnquiryForm from "../components/EnquiryForm";
import { motion } from "framer-motion";
import { FiStar, FiHeart, FiShield, FiThumbsUp } from "react-icons/fi";
import heroImg from "../images/hero-image-1.jpeg";

const SERVICES = [
  { title: "Varma Thokkanam", desc: "Traditional pressure-based therapy for pain relief." },
  { title: "Dorn Therapy", desc: "Gentle spine & joint correction therapy." },
  { title: "Reflexology", desc: "Stimulates healing through foot & hand points." },
  { title: "Aromatherapy", desc: "Healing using therapeutic essential oils." },
];

export default function Home() {
  return (
    <div> <section className="relative w-full">
  <motion.img
    src={heroImg}
    alt="Holistic Therapy"
    className="w-full h-[500px] md:h-[650px] object-cover rounded-xl shadow-lg"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
  />

  {/* Text Overlay */}
  <div className="absolute inset-0 flex flex-col justify-center px-6 md:px-16 bg-black/40 text-white">
    <h1 className="text-4xl md:text-6xl font-bold leading-tight">
      Restore Balance & Wellness
    </h1>
    <p className="mt-4 text-lg max-w-xl">
      Experience holistic healing through ancient therapies and modern practice.
    </p>
    <a
      href="/services"
      className="mt-6 bg-primary text-white px-6 py-3 rounded-lg shadow-lg w-fit"
    >
      Explore Services
    </a>
  </div>
</section>

    <div className="space-y-20">

      {/* HERO SECTION */}
      <section className="grid md:grid-cols-2 gap-10 items-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl md:text-5xl font-bold leading-tight text-primary">
            Restore Balance & Wellness Through Holistic Healing
          </h1>
          <p className="mt-4 text-gray-700 text-lg">
            At <b>Rudra Cura</b>, we blend ancient natural therapies with modern understanding to help you 
            relieve pain, reduce stress, and achieve long-term wellbeing.
          </p>

          <a
            href="/services"
            className="inline-block mt-6 bg-primary text-white px-6 py-3 rounded-lg shadow hover:bg-primary/90 transition"
          >
            Explore Our Services
          </a>
        </motion.div>
      </section>

      {/* SERVICES GRID */}
      <section>
        <h2 className="text-3xl font-bold text-primary mb-6">Our Therapies</h2>
        <div className="grid md:grid-cols-4 gap-6">
          {SERVICES.map((s) => (
            <motion.div
              key={s.title}
              whileHover={{ scale: 1.03 }}
              className="bg-white p-6 rounded-xl shadow-sm border"
            >
              <h4 className="text-xl font-semibold text-primary">{s.title}</h4>
              <p className="text-gray-700 text-sm mt-2">{s.desc}</p>
              <a
                href="/services"
                className="text-primary text-sm mt-3 inline-block hover:underline"
              >
                Learn More →
              </a>
            </motion.div>
          ))}
        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section>
        <h2 className="text-3xl font-bold text-primary mb-6">Why Choose Rudra Cura?</h2>
        <div className="grid md:grid-cols-4 gap-6">
          <div className="bg-white p-6 rounded-xl shadow border text-center">
            <FiStar className="text-primary text-4xl mx-auto" />
            <h4 className="mt-4 font-semibold">Experienced Therapists</h4>
            <p className="text-sm text-gray-600 mt-2">
              Skilled practitioners trained in multiple healing modalities.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow border text-center">
            <FiHeart className="text-primary text-4xl mx-auto" />
            <h4 className="mt-4 font-semibold">Personalised Care</h4>
            <p className="text-sm text-gray-600 mt-2">
              Every session is tailored to your unique body and needs.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow border text-center">
            <FiShield className="text-primary text-4xl mx-auto" />
            <h4 className="mt-4 font-semibold">Safe & Natural</h4>
            <p className="text-sm text-gray-600 mt-2">
              100% drug-free healing following traditional practices.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow border text-center">
            <FiThumbsUp className="text-primary text-4xl mx-auto" />
            <h4 className="mt-4 font-semibold">Trusted by Many</h4>
            <p className="text-sm text-gray-600 mt-2">
              Transformational results in pain relief and wellbeing.
            </p>
          </div>
        </div>
      </section>

      {/* CALL TO ACTION */}
      <section className="bg-primary text-white p-10 rounded-xl text-center shadow-lg">
        <h2 className="text-3xl font-bold">Start Your Healing Journey</h2>
        <p className="mt-2 text-lg">
          Book a session today and experience natural, holistic therapy.
        </p>
        <a
          href="/services"
          className="inline-block mt-5 bg-white text-primary px-6 py-3 rounded-lg shadow font-semibold"
        >
          Book Now
        </a>
      </section>
{/* GOOGLE REVIEWS SECTION */}
<section className="space-y-6">
  <h2 className="text-3xl font-bold text-primary text-center">
    ⭐ What Clients Say About Us
  </h2>
  <p className="text-center text-gray-600">
    Based on real reviews from Google.
  </p>

  <div className="grid md:grid-cols-3 gap-6">
    {/* Placeholder reviews — we’ll replace dynamically later */}
    <div className="bg-white p-6 rounded-xl shadow-md border">
      <p className="text-sm text-gray-700">
        “Amazing experience! I felt relief after my first session.”
      </p>
      <div className="mt-4 flex items-center space-x-2">
        <span className="font-semibold text-primary">John D.</span>
        <span className="text-yellow-400">★★★★★</span>
      </div>
    </div>

    <div className="bg-white p-6 rounded-xl shadow-md border">
      <p className="text-sm text-gray-700">
        “Professional and caring therapists — highly recommend!”
      </p>
      <div className="mt-4 flex items-center space-x-2">
        <span className="font-semibold text-primary">Priya S.</span>
        <span className="text-yellow-400">★★★★★</span>
      </div>
    </div>

    <div className="bg-white p-6 rounded-xl shadow-md border">
      <p className="text-sm text-gray-700">
        “Helped reduce my chronic pain — excellent service.”
      </p>
      <div className="mt-4 flex items-center space-x-2">
        <span className="font-semibold text-primary">Arun K.</span>
        <span className="text-yellow-400">★★★★★</span>
      </div>
    </div>
  </div>

  <div className="text-center">
    <a
      href="https://maps.google.com"
      target="_blank"
      rel="noopener noreferrer"
      className="text-primary font-semibold hover:underline"
    >
      Read All Reviews on Google →
    </a>
  </div>
</section>

      {/* ENQUIRY FORM */}
      <section>
        <h2 className="text-3xl font-bold text-primary mb-6">Enquiry / Book a Session</h2>
        <EnquiryForm services={SERVICES.map((s) => s.title)} defaultService="Varma Thokkanam" />
      </section>
    </div>
    </div>
  );
}
