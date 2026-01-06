export default function CookieBanner() {
  const [show, setShow] = useState(
    !localStorage.getItem("cookie-consent")
  );

  if (!show) return null;

  return (
    <div className="fixed bottom-0 inset-x-0 bg-black text-white p-4 z-50">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3">
        <p className="text-sm">
          We use cookies to improve experience and analyze traffic.
        </p>
        <button
          onClick={() => {
            localStorage.setItem("cookie-consent", "true");
            setShow(false);
          }}
          className="bg-primary px-4 py-2 rounded text-sm"
        >
          Accept
        </button>
      </div>
    </div>
  );
}