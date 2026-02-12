import { slugify } from "../utils/slug"
/* ================= SERVICES DATA ================= */
const SERVICES = [
  {
    title: "Varma Thokkanam",
    slug: "varma-thokkanam",
    image: "/images/varma.webp",
    description:
      "Varma thokanam is an ancient South Indian system of traditional medicine and martial arts, originating in the Tamil Sage Tradition. It’s a blend of acupressure, neurology, orthopedics, and energy medicine.",
      
    benefits: [
      "Posture imbalance",
      "Spine-related problems",
      "Spondylitis",
      "Scoliosis",
      "Nervous system-related issues",
      "Pain management",
    ],

    process: [
      "Diagnosis is done by traditional varmam analysis method.",
      "Acute cases → once a week sessions.",
      "Chronic cases → twice a week sessions.",
      "Strengthening exercises (Meipadam) are given based on condition.",
    ],

    guidelines: [
      "Food (solid or liquid) must be taken at least 30 minutes before session.",
      "Wear flexible attire during session.",
      "Inform about medical conditions like low BP, nausea, high BP beforehand.",
    ],

    types: [
      "Herbal Varma Thokkanam",
      "Aroma Varma Thokkanam",
      "Nettiyeduthal",
      "Dasha Vayu Thattu",
      "Varma Pulli Thattudhal",
    ],
  },
  {
    title: "Dorn Therapy",
    slug: "dorn-therapy",
    image: "/images/dorn.webp",
    description:
      "Gentle manual therapy correcting spinal and joint misalignments.",
  },
  {
    title: "Reflexology",
    slug: "reflexology",
    image: "/images/Reflexology.webp",
    description:
      "Targeted pressure therapy supporting internal organs and relaxation.",
  },
  {
    title: "Foot Gua Sha",
    slug: "foot-gua-sha",
    image: "/images/footguasha.webp",
    description:
      "Traditional scraping therapy for detoxification and energy flow.",
  },
  {
    title: "Meipadam",
    slug: "meipadam",
    image: "/images/meipadam.webp",
    description:
      "Classical Siddha body therapy for muscles and nervous system.",
  },
  {
    title: "Meditation",
    slug: "meditation",
    image: "/images/meditation.webp",
    description:
      "Guided meditation for mental calm and emotional balance.",
  },
  {
    title: "Kriya",
    slug: "kriya",
    image: "/images/kriya.webp",
    description:
      "Advanced yogic practice for energy alignment and transformation.",
  },
]

export default SERVICES
