import Image from "next/image";
import Link from "next/link";
import { FaGooglePay, FaCcPaypal, FaCcVisa, FaCcMastercard } from "react-icons/fa";
import { IoLogoFacebook } from "react-icons/io5";
import { FaInstagram } from "react-icons/fa6";
import { IoLogoWhatsapp } from "react-icons/io";


export default function Footer() {
  return (
    <footer className="text-gray-600 body-font bg-white shadow-[0_-4px_10px_rgba(0,0,0,0.1)]">
      <div className="container px-5 py-20 mx-auto flex flex-wrap md:flex-nowrap">
        {/* Logo & Description */}
        <div className="w-64 flex-shrink-0 mx-auto text-center md:text-left md:mx-0 mb-10 md:mb-0">
          <Link href={"/"} className="flex justify-center md:justify-start">
            <Image src="/logo.png" alt="Logo" width={150} height={50} />
          </Link>
          <p className="mt-6 text-sm text-gray-500">
            Maas Technical provides reliable cleaning, maintenance, and renovation services in Dubai with expert technicians, fast response, and affordable rates.
          </p>
        </div>

        {/* Links Sections */}
        <div className="flex-grow flex flex-wrap md:pl-20 -mb-10 text-center md:text-left">
          {/* Our Services */}
          <div className="w-full sm:w-1/2 md:w-1/4 px-4 mb-8 md:mb-0">
            <h2 className="title-font font-medium text-black tracking-widest text-sm mb-3">OUR SERVICES</h2>
            <nav className="list-none space-y-2 ">
              {[ "AC Installation","Swiming Pool Cleaning", "Office Clening", "House Cleaning", "Deep Cleaning", "Window Cleaning", "Handyman"].map((item) => (
                <li key={item}>
                  <Link href={"/"} className="text-gray-600 hover:font-semibold hover:text-blue-800">{item}</Link>
                </li>
              ))}
            </nav>
          </div>

          {/* About Us */}
          <div className="w-full sm:w-1/2 md:w-1/4 px-4 mb-8 md:mb-0">
            <h2 className="title-font font-medium text-black tracking-widest text-sm mb-3">ABOUT US</h2>
            <p className="text-gray-600 text-sm leading-relaxed">
              Maas Technical provides expert cleaning, maintenance, and renovation services in Dubai. With skilled technicians, fast response, and affordable prices, we ensure reliable solutions to keep your home and office safe, clean, and fully functional. Your satisfaction is our priority.
            </p>
          </div>

          {/* Quick Links */}
          <div className="w-full sm:w-1/2 md:w-1/4 px-4 mb-8 md:mb-0">
            <h2 className="title-font font-medium text-black tracking-widest text-sm mb-3">QUICK LINKS</h2>
            <nav className="list-none space-y-2">
              {[
                { label: "HOME", href: "/" },
                { label: "ABOUT US", href: "/about" },
                { label: "Plumbing", href: "/plumbing" },
                { label: "Painting", href: "/painting" },
                { label: "AC Maintenance", href: "/acmaintenance" },
                { label: "AC Installation", href: "/acinstallation" },
                { label: "Electrical", href: "/electrical" },
              ].map((item) => (
                <li key={item.label}>
                  <Link href={item.href} className="text-gray-600 hover:font-semibold hover:text-blue-800">
                    {item.label}
                  </Link>
                </li>
              ))}
            </nav>
          </div>


          {/* PAYMENT METHODS + SOCIAL MEDIA CONTACTS in one column */}
          <div className="w-full sm:w-1/2 md:w-1/4 px-4">
            {/* PAYMENT METHODS */}
            <h2 className="title-font font-medium text-black tracking-widest text-sm mb-3 text-center md:text-left">
              PAYMENT METHODS
            </h2>
            <div className="flex justify-center md:justify-start space-x-6 mt-4 mb-6">
              <span href={"/"} aria-label="Google Pay" className="text-4xl ">
                <FaGooglePay />
              </span>
              <span href={"/"} aria-label="Paypal" className="text-4xl ">
                <FaCcPaypal />
              </span>
              <span href={"/"} aria-label="Visa" className="text-4xl ">
                <FaCcVisa />
              </span>
              <span href={"/"} aria-label="Mastercard" className="text-4xl ">
                <FaCcMastercard />
              </span>
            </div>

            {/* SOCIAL MEDIA CONTACTS */}
            <h2 className="title-font font-medium text-black tracking-widest text-sm mb-3 text-center md:text-left">
              SOCIAL MEDIA CONTACTS
            </h2>
            <div className="flex justify-center md:justify-start space-x-6 mt-4">
              <Link href="https://www.facebook.com/"
                target="_blank" aria-label="Facebook" className="text-4xl hover:text-blue-700">
                <IoLogoFacebook />
              </Link>
              <Link href="https://www.instagram.com/maastechnicalcleaningservices/"
                target="_blank" aria-label="LinkedIn" className="text-4xl hover:text-blue-700">
                <FaInstagram />
              </Link>
              <Link href="https://wa.me/+971547615720" // Add your full WhatsApp number without +
                target="_blank" aria-label="WhatsApp" className="text-4xl hover:text-blue-700">
                <IoLogoWhatsapp />
              </Link>
            </div>
          </div>

        </div>
      </div>

      {/* Bottom Bar */}
      <div className="bg-blue-800">
        <div className="container mx-auto py-4 px-5 flex flex-col sm:flex-row items-center justify-center sm:justify-between text-sm text-white">
          <p className="text-center sm:text-left">
            © 2022–2025 Maas Technical Cleaning Services. Website developed in 2025.
            <span className="ml-2 text-xs block sm:inline text-gray-300">
              Developed by Ali Raza
            </span>
          </p>
        </div>
      </div>
    </footer>
  );
}
