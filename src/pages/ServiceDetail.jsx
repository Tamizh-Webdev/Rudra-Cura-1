import { useParams, Link } from "react-router-dom"
import { Helmet } from "react-helmet-async"
import SERVICES from "../data/services"
import RelatedServices from "../components/RelatedServices"
import EnquiryForm from "../components/EnquiryForm"

export default function ServiceDetail() {
  const { slug } = useParams()

  const service = SERVICES.find((s) => s.slug === slug)

  if (!service) {
    return (
      <div className="py-24 text-center">
        <h1 className="text-2xl font-semibold">Service not found</h1>
        <Link to="/services" className="text-primary underline mt-4 block">
          Back to Services
        </Link>
      </div>
    )
  }

  return (
    <>
      <Helmet>
        <title>{service.title} in Chennai | Rudra Cura</title>
        <meta
          name="description"
          content={`${service.title} therapy in Chennai for pain relief, balance and holistic wellbeing.`}
        />
      </Helmet>

      <section className="max-w-5xl mx-auto space-y-10">
        <img
          src={service.image}
          alt={service.title}
          loading="eager"
          width="1200"
          height="630"
          className="w-full rounded-2xl object-cover"
        />

        <h1 className="text-3xl font-bold text-primary">
          {service.title}
        </h1>

        <p className="text-lg text-gray-700 leading-relaxed">
          {service.description}
        </p>

      {/* About */}
      {service.about && (
        <>
          <h2 className="text-2xl font-semibold mb-1">About</h2>
          <p className="mb-6 whitespace-pre-line">
            {service.about}
          </p>
        </>
      )}

      {/* Benefits */}
      {service.benefits && (
        <>
          <h2 className="text-2xl font-semibold mb-1">Best For</h2>
          <ul className="list-disc pl-6  mt-1 mb-6">
            {service.benefits.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        </>
      )}

      {/* Process */}
      {service.process && (
        <>
          <h2 className="text-2xl font-semibold mb-3">Process</h2>
          <ul className="list-disc pl-6 mb-6">
            {service.process.map((step, i) => (
              <li key={i}>{step}</li>
            ))}
          </ul>
        </>
      )}

      {/* Guidelines */}
      {service.guidelines && (
        <>
          <h2 className="text-2xl font-semibold mb-3">Guidelines</h2>
          <ul className="list-disc pl-6 mb-6">
            {service.guidelines.map((rule, i) => (
              <li key={i}>{rule}</li>
            ))}
          </ul>
        </>
      )}

      {/* Types */}
      {service.types && (
        <>
          <h2 className="text-2xl font-semibold mb-3">Types of Varma Thokkanam</h2>
          <ul className="list-disc pl-6">
            {service.types.map((type, i) => (
              <li key={i}>{type}</li>
            ))}
          </ul>
        </>
      )}

        {/* CTA */}
        <a
          className="inline-block bg-primary text-white px-6 py-3 rounded-lg" href="#enquiry"
        >
          Enquire Now
        </a>

        {/* Related Services */}
        <RelatedServices
          services={SERVICES}
          currentSlug={service.slug}
        />

        {/* Enquiry */}
        <div id="enquiry">
        <EnquiryForm
          services={SERVICES.map((s) => s.title)}
          selectedService={service.title}
        /></div>
      </section>
    </>
  )
}

