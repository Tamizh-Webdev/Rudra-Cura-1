import { Link } from "react-router-dom"
import { Helmet } from "react-helmet-async"

export default function NotFound() {
  return (
    <>
      <Helmet>
        <title>404 Not Found | Rudra Cura</title>
        <meta name="robots" content="noindex" />
      </Helmet>

      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center">
        <h1 className="text-5xl font-bold text-primary">404</h1>
        <p className="mt-4 text-gray-600">
          The page you are looking for does not exist.
        </p>

        <Link
          to="/"
          className="mt-6 inline-block bg-primary text-white px-6 py-3 rounded-lg"
        >
          Go back home
        </Link>
      </div>
    </>
  )
}
