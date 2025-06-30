import React, { useState } from "react";
import Image from "next/image";
import { Geist, Geist_Mono } from "next/font/google";
import "../styles/globals.css";
import Head from "next/head";
import Link from "next/link";
import { FaPhone } from "react-icons/fa6";
import { IoLocationSharp, IoLogoFacebook } from "react-icons/io5";
import { TiSocialLinkedinCircular } from "react-icons/ti";
import { IoLogoWhatsapp } from "react-icons/io";
import { LuMails } from "react-icons/lu";
import { motion } from "framer-motion";



const geistSans = Geist({
  variable: "--font-geist-sans",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
});

const services = [
  { title: "Ac Maintenance", slug: "acmaintenance", img: "/services/acduct.jpg" },
  { title: "Ac Installation", slug: "acinstallation", img: "/services/acinstall.jpg" },
  { title: "Ac Repair", slug: "acrepair", img: "/services/acrepair.jpg" },
  { title: "Electrical", slug: "electrical", img: "/services/electrical.jpg" },
  { title: "Plumbing", slug: "plumbing", img: "/services/plumbing.jpg" },
  { title: "Sofa Cleaning", slug: "sofaclean", img: "/services/sofaclean.jpg" },
  { title: "Painting", slug: "painting", img: "/services/paintwork.jpg" },
  { title: "Wallpaper Fixing", slug: "wallpaperfixing", img: "/services/Walpaperfixing.jpg" },
  { title: "Water Tank Cleaning", slug: "watertankcleaning", img: "/services/tankclean.jpg" },
  { title: "Carpet Cleaning", slug: "carpetcleaning", img: "/services/carpetclean.jpg" },
  { title: "Handyman", slug: "handyman", img: "/services/handyman.jpg" }, // <-- fixed slug & img
];



export default function Home() {
  // State for the controlled <select>
  const [service, setService] = useState("");
  const [showAll, setShowAll] = useState(false);
  const visibleServices = showAll ? services : services.slice(0, 4);

  const [submitStatus, setSubmitStatus] = useState(""); // success | error | ""
  // Optional: you can add state for showing submission status or errors

  return (
    <div>
      <Head>
        <title>Maas Technical Cleaning Services</title>
        <meta name="description" content="Maas_Technical_Cleaning Services.com" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* Top Info Bar */}
      <div className="bg-blue-800 w-full min-h-[60px] py-4 px-4">
        <div className="max-w-screen-xl mx-auto flex flex-col sm:flex-row items-center justify-center text-white text-xs sm:text-sm gap-3 sm:gap-14">
          <Link href={"tel:+923014707953"} className="flex items-center gap-2">
            <FaPhone />
            <p>+923014707953</p>
          </Link>
          <div className="hidden md:block h-6 w-[1px] bg-white"></div>
          <Link
            href="https://mail.google.com/mail/?view=cm&fs=1&to=maasservices@gmail.com"
            target="_blank"
            className="flex items-center gap-2"
          >
            <LuMails />
            <p>maasservices@gmail.com</p>
          </Link>
          <div className="hidden md:block h-6 w-[1px] bg-white"></div>
          <Link
            href="https://www.google.com/maps/place/Dubai,+UAE"
            target="_blank"
            className="flex items-center gap-2"
          >
            <IoLocationSharp />
            <p>Dubai, UAE</p>
          </Link>
          <div className="hidden md:block h-6 w-[1px] bg-white"></div>
          <div className="flex items-center gap-4">
            <Link href="https://www.facebook.com/YourFacebookUsername" target="_blank" rel="noopener noreferrer">
              <IoLogoFacebook className="text-xl cursor-pointer" />
            </Link>
            <Link href="https://www.linkedin.com/in/YourLinkedInUsername" target="_blank" rel="noopener noreferrer">
              <TiSocialLinkedinCircular className="text-2xl cursor-pointer" />
            </Link>
            <Link href="https://wa.me/923014707953" target="_blank" rel="noopener noreferrer">
              <IoLogoWhatsapp className="text-2xl cursor-pointer text-green-500" />
            </Link>
          </div>
        </div>
      </div>

      {/* Motion Hero Section */}
      <motion.section
        initial={{ opacity: 0, x: -100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="text-gray-600 body-font"
      >
        <div className="container mx-auto flex flex-col md:flex-row px-5 py-16 md:py-24 items-center">
          <div className="lg:flex-grow md:w-1/2 lg:pr-24 md:pr-16 flex flex-col md:items-start md:text-left mb-12 md:mb-0 items-center text-center px-4 sm:px-0">
            <div className="flex-row mb-20 p-5 ">
              <Link href={"/"}>
                <img src="/logo.png" alt="Logo" className="w-36 h-36 sm:w-50 sm:h-50 mx-auto" />
              </Link>
              <h2 className="title-font text-2xl sm:text-4xl mb-4 px-2 font-bold text-blue-900">
                <span className="text-red-700">MUHAMMAD AHSAN</span> AND{" "}
                <span className="text-blue-900">SANAULLAH </span>
                <span className="text-black">TECHNICAL & CLEANING SERVICES</span>
              </h2>
            </div>
            <h1 className="title-font text-3xl sm:text-4xl mb-4 font-bold text-blue-900">Great Technology</h1>
            <h2 className="text-xl sm:text-2xl mb-4 font-bold text-blue-900">BEST TECHNICAL SERVICES</h2>
            <p className="mb-8 leading-relaxed ">
              Maas Technical Cleaning Services As a proficient company operating in Dubai, Dedicated Technical Services always strives to meet the demands of its clients with skill and capability.
            </p>
            <div className="flex justify-center">
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
            </div>
          </div>

          <div className="lg:max-w-lg lg:w-full md:w-1/2 w-full px-4 sm:px-0">
            <img className="object-cover object-center rounded" alt="hero" src="hero.jpg" />
          </div>
        </div>
      </motion.section>

      {/* Discount Section */}
      <motion.section
        initial={{ opacity: 0, y: 100 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
        viewport={{ once: true, amount: 0.2 }}
        className="text-gray-600 bg-gray-100 body-font"
      >
        <div className="container px-5 py-24 mx-auto">
          <div className="flex justify-center">
            <div className="flex flex-wrap sm:flex-row flex-col py-6 mb-12">
              <h1 className="text-blue-800 font-bold title-font text-3xl sm:text-5xl mb-2 sm:mb-0 text-center">
                SPECIAL OFFERS
              </h1>
            </div>
          </div>

          <div className="flex flex-wrap sm:-m-4 -mx-4 -mb-10 -mt-4 justify-center">
            {/* First Offer */}
            <div className="p-2 md:w-1/3 sm:mb-0 mb-6">
              <div className="rounded-lg h-64 overflow-hidden">
                <img alt="content" className="object-cover object-center h-full w-full" src="/services/acduct.jpg" />
              </div>
              <h2 className="text-xl font-medium title-font text-gray-900 mt-5">
                AC Duct Cleaning <span className="text-blue-600 mx-8">30% off</span>
              </h2>
              <p className="text-base leading-relaxed mt-2">
                Get 30% off on AC Duct Cleaning! Breathe cleaner air and save money. Limited-time offer—book your professional service now!
              </p>
            </div>

            {/* Second Offer */}
            <div className="p-2 md:w-1/3 sm:mb-0 mb-6">
              <div className="rounded-lg h-64 overflow-hidden">
                <img alt="content" className="object-cover object-center h-full w-full" src="/services/carpetclean.jpg" />
              </div>
              <h2 className="text-xl font-medium title-font text-gray-900 mt-5">
                Carpet Cleaning <span className="text-blue-600 mx-8">30% off</span>
              </h2>
              <p className="text-base leading-relaxed mt-2">
                Enjoy 30% off on Carpet Cleaning! Remove dust, stains, and allergens. Freshen up your home—book your service today!
              </p>
            </div>

            {/* Third Offer */}
            <div className="p-2 md:w-1/3 sm:mb-0 mb-6">
              <div className="rounded-lg h-64 overflow-hidden">
                <img alt="content" className="object-cover object-center h-full w-full" src="/services/paintwork.jpg" />
              </div>
              <h2 className="text-xl font-medium title-font text-gray-900 mt-5">
                Paint Work <span className="text-blue-600 mx-8">30% off</span>
              </h2>
              <p className="text-base leading-relaxed mt-2">
                Get 30% off on Professional Paint Work! Refresh your walls with vibrant colors. Limited-time offer—book your painting service now!
              </p>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Our Services Section */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        transition={{ duration: 0.8, ease: "easeInOut" }}
        viewport={{ once: false, amount: 0.15 }}
        className="text-gray-600 body-font"
      >
        <div className="container py-12 mx-auto">
          <div className="flex justify-center">
            <div className="flex flex-wrap sm:flex-row flex-col py-6 mb-12">
              <h1 className="text-blue-800 font-bold title-font text-4xl sm:text-5xl text-center">
                OUR TECHNICAL SERVICES
              </h1>
            </div>
          </div>

          <div className="px-5 py-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 px-4">
              {visibleServices.map((service, i) => (
                <motion.div
                  key={i}
                  custom={i}
                  initial="hidden"
                  whileInView="visible"
                  variants={{
                    hidden: { opacity: 0, y: 50 },
                    visible: {
                      opacity: 1,
                      y: 0,
                      transition: {
                        delay: i * 0.1,
                        duration: 0.5,
                        ease: "easeOut",
                      },
                    },
                  }}
                  viewport={{ once: false, amount: 0.15 }}
                  className="border rounded-xl bg-gray-100 overflow-hidden shadow-md flex flex-col h-full"
                >
                  <Link href={`/${service.slug}`} className="block relative h-48 overflow-hidden">
                    <img
                      alt={service.title}
                      className="object-cover object-center w-full h-full"
                      src={service.img}
                    />
                  </Link>
                  <div className="mt-4 px-2 pb-4 text-center flex-grow flex items-center justify-center">
                    <h2 className="text-gray-900 title-font text-lg font-medium">
                      {service.title}
                    </h2>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {!showAll && (
            <div className="flex justify-center mt-6">
              <button
                onClick={() => setShowAll(true)}
                className="bg-blue-800 text-white text-sm px-6 py-2 rounded-[20px] hover:bg-blue-600 transition cursor-pointer"
              >
                Show All
              </button>
            </div>
          )}
        </div>
      </motion.section>


      {/* Contact Page */}
      <section className="text-gray-600 body-font overflow-visible">
        <div className="container px-5 py-24 mx-auto flex flex-col lg:flex-row gap-10">
          {/* LEFT SIDE */}
          <motion.div
            className="w-full lg:w-1/3"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            viewport={{ once: true, amount: 0.3 }}
          >
            <div className="text-center max-w-2xl mx-auto px-4 py-4">
              <h1 className="text-2xl font-bold text-gray-800 mb-2">Get in Touch</h1>
              <p className="text-gray-600 text-sm">
                Have questions or need assistance with our services? Reach out to us today. Browse our offerings below and click “Request Call Back” to speak with our team directly. We're here to help with all your technical and cleaning needs.
              </p>
            </div>
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
                  const result = await res.json();
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
                className="w-11/12 max-w-md mx-auto block rounded-full border border-black bg-white focus:border-blue-600 focus:ring-2 focus:ring-blue-200 text-base text-gray-700 py-2 px-4 transition duration-200 "
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
                <option value="Carpet Cleaning">Carpet Cleaning</option>
                <option value="Water Tank Cleaning">Water Tank Cleaning</option>
                <option value="AC Maintenance">AC Maintenance</option>
                <option value="AC Duct Cleaning">AC Duct Cleaning</option>
                <option value="AC Installation">AC Installation</option>
                <option value="Electrical">Electrical</option>
                <option value="Plumbing">Plumbing</option>
                <option value="Sofa Cleaning">Sofa Cleaning</option>
                <option value="Painting">Painting</option>
                <option value="Wallpaper Fixing">Wallpaper Fixing</option>
                <option value="Handyman">Handyman</option>  {/* Added Handyman option */}
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
                className="text-white bg-blue-800 border-0 py-3 px-12 focus:outline-none hover:bg-blue-600 rounded-full text-lg mx-auto block cursor-pointer"
              >
                Send Message
              </button>

              {submitStatus && (
                <p
                  className={`text-center font-semibold mt-2 ${submitStatus.success ? "text-green-600" : "text-red-600"
                    }`}
                >
                  {submitStatus.message}
                </p>
              )}
            </form>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
