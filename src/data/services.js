import { slugify } from "../utils/slug"
import varmaImg from "/images/varma.jpg"
import dorn from "/images/dorn.jpg"
import reflexology from "/images/Reflexology.jpg"
import footguasha from "/images/footguasha.jpg"
import meditation from "/images/kriya.webp"
import kriya from "/images/kriya.jpg"
import meipadam from "/images/meipadam.jpg"
const SERVICES = [
  {
    title: "Varma Thokkanam",
    slug: "varma-thokkanam",
    image: {varmaImg},
    description:
      "An ancient Tamil Siddha therapy that stimulates vital energy points to relieve pain and restore balance.",
  },
  {
    title: "Dorn Therapy",
    slug: "dorn-therapy",
    image: {dorn},
    description:
      "Gentle manual therapy correcting spinal and joint misalignments.",
  },
  {
    title: "Reflexology",
    slug: "reflexology",
    image: {reflexology},
    description:
      "Targeted pressure therapy supporting internal organs and relaxation.",
  },
  {
    title: "Foot Gua Sha",
    slug: "foot-gua-sha",
    image: {footguasha},
    description:
      "Traditional scraping therapy for detoxification and energy flow.",
  },
  {
    title: "Meipadam",
    slug: "meipadam",
    image: {meipadam},
    description:
      "Classical Siddha body therapy for muscles and nervous system.",
  },
  {
    title: "Meditation",
    slug: "meditation",
    image: {meditation},
    description:
      "Guided meditation for mental calm and emotional balance.",
  },
  {
    title: "Kriya",
    slug: "kriya",
    image: {kriya},
    description:
      "Advanced yogic practice for energy alignment and transformation.",
  },
]

export default SERVICES
