import React from "react";
import EnquiryForm from "../components/EnquiryForm";
import { motion } from "framer-motion";
import { FiStar, FiHeart, FiShield, FiThumbsUp } from "react-icons/fi";
import { Helmet } from "react-helmet-async";
import ProgramCard from '../components/ProgramCard';

const BLOGS = [
  { title: 'Pain Relief Program', summary: 'A 6-week program focused on chronic pain reduction using varma and Dorn therapy blends.' },
  { title: 'Stress & Sleep Renew', summary: 'A 4-week program combining reflexology and aromatherapy to restore restful sleep.' },
  { title: 'Joint Mobility Restore', summary: 'An 8-week guided plan with Dorn therapy and supportive modalities for joint health.' },
  { title: 'Holistic Wellness Retreat', summary: 'A weekend immersive designed to reset body and mind with personalized therapies.' }
]

export default function Home() {
  return (
     <>
     <Helmet>
        <title>Rudra Cura | Holistic Healing & Natural Therapies</title>
        <meta
          name="description"
          content="Rudra Cura offers holistic healing therapies like Varma Thokkanam, Dorn Therapy, Reflexology & Aromatherapy for pain relief and wellness."
        />
        <meta name="keywords" content="Varma Therapy, Dorn Therapy, Holistic Healing, Natural Therapy Chennai" />
        <link rel="canonical" href="https://rudracura.com/" />
        </Helmet>
         <div className="space-y-6">
              <h2 className="text-3xl font-bold text-primary">Blogs</h2>
              <div className="grid md:grid-cols-2 gap-6">
                {BLOGS.map(p => <ProgramCard key={p.title} {...p} cta />)}
              </div>
        
              
            </div>
        </>
  )
}