import React, { useState, useEffect } from "react";
import { motion } from 'framer-motion';
import { FaPhone } from "react-icons/fa6";
import Link from "next/link";
import { useRouter } from "next/router"; // Importing useRouter for page routing

const Handyman = () => {

  const [service, setService] = useState("");
  const [submitStatus, setSubmitStatus] = useState(""); // success | error | ""
  const [loading, setLoading] = useState(false);
  const router = useRouter(); // Initialize router hook

  // Set service automatically based on the current page path
  useEffect(() => {
    if (router.pathname === "/handyman") {
      setService("Handyman Services"); // Set default service for Handyman page
    }

    if (submitStatus) {
      const timer = setTimeout(() => {
        setSubmitStatus(null);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [submitStatus, router.pathname]);

  const services = [
    "AC Installation",
    "Carpet Cleaning",
    "Water Tank Cleaning",
    "AC Maintenance",
    "AC Duct Cleaning",
    "Electrical",
    "Plumbing",
    "Sofa Cleaning",
    "Painting",
    "Wallpaper Fixing",
    "Handyman", // Handyman Services is pre-selected for this page
  ];

  return (
    <section className="text-gray-600 body-font overflow-visible">
      <div className="container px-5 py-24 mx-auto flex flex-col lg:flex-row gap-10">
        {/* LEFT SIDE */}
        <motion.div
          className="w-full lg:w-1/3"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          viewport={{ once: true, amount: 0.3 }}
        >
          <h2 className="text-sm title-font text-gray-500 tracking-widest">MAAS</h2>
          <h1 className="text-gray-900 text-3xl title-font font-medium mb-4">
            Get The Best Handyman Services In Dubai
          </h1>
          <p className="leading-relaxed mb-6">
            Safety and reliability define our electrical services. From routine inspections to complex installations, Maas Technical’s certified electricians handle all aspects of residential and commercial wiring with precision. We upgrade outdated panels, install energy-efficient lighting systems, and troubleshoot circuit faults to prevent hazards and downtime. Our team adheres to local codes and best practices, using high-quality materials to ensure long-term performance. We also offer surge protection, outdoor lighting, and smart home integrations to enhance convenience and energy savings. Whether you need emergency repairs or a full electrical overhaul, trust our professionals to deliver prompt, clean, and code-compliant solutions that keep your property illuminated and safe.
          </p>
          <div className="relative max-w-md mx-auto lg:mx-0">
            <input
              type="text"
              inputMode="numeric"
              pattern="[0-9]*"
              placeholder="Input Your Number"
              onInput={(e) => (e.target.value = e.target.value.replace(/[^0-9]/g, ""))}
              className="w-full pr-36 bg-gray-100 bg-opacity-50 rounded-full border border-gray-300 focus:border-blue-900 focus:bg-white focus:ring-2 focus:ring-blue-200 text-base text-gray-700 py-3 px-4 transition duration-200"
            />
            <button className="absolute top-1/2 right-2 -translate-y-1/2 bg-blue-800 text-white text-sm px-4 py-2 rounded-full hover:bg-blue-600">
              <Link href={"tel:+9723121234"} className="flex items-center gap-2">
                <FaPhone />
                Call to Help!
              </Link>
            </button>
          </div>
        </motion.div>

        {/* RIGHT SIDE */}
        <motion.div
          className="w-full lg:w-2/3 bg-gradient-to-tr from-blue-100 to-blue-400 p-6 rounded-lg shadow-md"
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          viewport={{ once: true, amount: 0.3 }}
        >
          <h2 className="text-white text-4xl mb-8 font-bold text-center">Contact Us</h2>
          <form
            onSubmit={async (e) => {
              e.preventDefault();
              if (loading) return;
              setLoading(true);
              setSubmitStatus(null);
              const formData = new FormData(e.target);
              const data = {
                name: formData.get("name"),
                phone: formData.get("phone"),
                service: formData.get("service"),
                message: formData.get("message"),
              };
              try {
                const res = await fetch("/api/contact", {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify(data),
                });
                if (res.ok) {
                  setSubmitStatus({ success: true, message: "Detail Submit Successfully! Your message has been sent!" });
                  e.target.reset();
                  setService("");
                } else {
                  setSubmitStatus({ success: false, message: "Detail Not Submit!" });
                }
              } catch {
                setSubmitStatus({ success: false, message: "Detail Not Submit!" });
              }
              setLoading(false);
            }}
            className="space-y-6"
          >
            <input
              type="text"
              name="name"
              placeholder="Enter your name"
              required
              className="w-11/12 max-w-md mx-auto block rounded-full border border-black bg-white focus:border-blue-600 focus:ring-2 focus:ring-blue-200 text-base text-gray-700 py-2 px-4 transition duration-200"
            />

            <input
              type="text"
              name="phone"
              inputMode="numeric"
              pattern="[0-9]*"
              placeholder="Enter your mobile no"
              required
              onInput={(e) => (e.target.value = e.target.value.replace(/[^0-9]/g, ""))}
              className="w-11/12 max-w-md mx-auto block rounded-full border border-black bg-white focus:border-blue-600 focus:ring-2 focus:ring-blue-200 text-base text-gray-700 py-2 px-4 transition duration-200"
            />

            <select
              name="service"
              required
              value={service}
              onChange={(e) => setService(e.target.value)}
              className="w-11/12 max-w-md mx-auto block rounded-full border border-black bg-white focus:border-blue-600 focus:ring-2 focus:ring-blue-200 text-base text-gray-700 py-2 px-4 transition duration-200"
            >
              <option value="" disabled>
                Select Service
              </option>
              {services.map((s, index) => (
                <option key={index} value={s} disabled={s !== service}>
                  {s}
                </option>
              ))}
            </select>

            <textarea
              name="message"
              placeholder="Enter your message"
              required
              rows={6}
              className="w-11/12 max-w-md mx-auto block rounded-xl border border-black bg-white focus:border-blue-600 focus:ring-2 focus:ring-blue-200 text-base text-gray-700 py-4 px-4 transition duration-200 resize-none"
            />

            <button
              type="submit"
              disabled={loading}
              className={`text-white bg-blue-800 border-0 py-3 px-12 focus:outline-none rounded-full text-lg mx-auto block cursor-pointer
                ${loading ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-600"}`}
            >
              {loading ? "Sending..." : "Send Message"}
            </button>

            {submitStatus && (
              <p
                className={`text-center font-semibold mt-2 ${submitStatus.success ? "text-green-600" : "text-red-600"}`}
              >
                {submitStatus.message}
              </p>
            )}
          </form>
        </motion.div>
      </div>
    </section>
  );
};

export default Handyman;
