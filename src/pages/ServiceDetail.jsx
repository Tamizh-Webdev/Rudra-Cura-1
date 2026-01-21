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

