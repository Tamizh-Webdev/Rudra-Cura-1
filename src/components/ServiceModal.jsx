import { motion } from "framer-motion"

export default function ServiceModal({ service, onClose }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="relative w-full max-w-lg bg-white rounded-2xl shadow-xl p-6"
      >
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-black"
        >
          ✕
        </button>

        <img
          src={service.image}
          alt={service.title}
          className="w-full h-56 object-cover rounded-xl"
        />

        <h3 className="mt-4 text-2xl font-semibold text-primary">
          {service.title}
        </h3>

        <p className="mt-3 text-gray-700 leading-relaxed">
          {service.description}
        </p>
      </motion.div>
    </div>
  )
}
