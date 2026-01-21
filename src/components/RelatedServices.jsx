import { Link } from "react-router-dom"
import { motion } from "framer-motion"

export default function RelatedServices({ services, currentSlug }) {
  const related = services.filter((s) => s.slug !== currentSlug).slice(0, 4)

  if (!related.length) return null

  return (
    <section className="mt-16">
      <h2 className="text-2xl font-semibold text-primary mb-6">
        Related Services
      </h2>

      <div className="flex gap-6 overflow-x-auto pb-4 snap-x snap-mandatory">
        {related.map((service) => (
          <motion.div
            key={service.slug}
            whileHover={{ y: -4 }}
            className="min-w-[260px] bg-accent rounded-xl shadow-sm snap-start"
          >
            <img
              src={service.image}
              alt={service.title}
              loading="lazy"
              decoding="async"
              width="400"
              height="220"
              className="w-full h-40 object-cover rounded-t-xl"
            />

            <div className="p-4">
              <h3 className="font-semibold text-primary">
                {service.title}
              </h3>

              <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                {service.description}
              </p>

              <Link
                to={`/services/${service.slug}`}
                className="inline-block mt-3 text-sm font-medium text-primary underline"
              >
                View Details →
              </Link>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
