import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7 } },
};

const About = () => {
  return (
    <div>
      {/* Hero with fade-in */}
      <motion.div
        className="relative w-full h-60 md:h-96"
        initial="hidden"
        animate="visible"
        variants={fadeInUp}
      >
        <Image
          src="/abouthome.jpg"
          alt="About Us"
          fill
          className="object-cover"
        />

        <div className="absolute inset-0 flex items-center justify-center bg-opacity-40">
          <motion.h1
            className="text-white md:text-7xl font-bold"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.3 }}
          >
            ABOUT US
          </motion.h1>
        </div>
      </motion.div>

      {/* Content Section */}
      <motion.section
        className="text-gray-600 body-font"
        initial="hidden"
        animate="visible"
        variants={fadeInUp}
        transition={{ delay: 0.5 }}
      >
        <div className="container mx-auto flex flex-col md:flex-row items-center px-5 py-24">
          {/* Text content */}
          <div className="md:w-1/2 lg:pr-24 md:pr-16 flex flex-col md:items-start md:text-left mb-16 md:mb-0 items-center text-center">
            <h1 className="title-font sm:text-4xl text-3xl mb-4 font-medium text-gray-900">About Us</h1>
            <p className="mb-8 leading-relaxed">
              Welcome to Maas Technical Services, your trusted partner for home and office maintenance in Dubai.
              We understand that keeping your space clean, safe, and well-maintained is important for your comfort and peace of mind. That’s why we’re here to make it easy for you. Whether it’s a small repair or a full service job, we believe “One call can solve all your house problems.”
            </p>

            <h3 className="title-font sm:text-2xl text-3xl mb-4 font-medium text-gray-900">What We Do</h3>
            <p className="mb-5 leading-relaxed">Maas Technical provides a wide range of reliable and affordable services, including :</p>

            <ul className="list-disc list-inside space-y-1 mb-5 text-left md:text-left">
              <li>AC Maintenance and Installation</li>
              <li>AC Duct and Coil Cleaning</li>
              <li>Electrical Work</li>
              <li>Plumbing Services</li>
              <li>Painting and Renovation</li>
            </ul>

            <p className="leading-relaxed">
              We use professional tools, modern techniques, and high-quality materials to deliver long-lasting results. Whether it's a minor fault or a major project, we handle everything with care.
            </p>

            <h3 className="title-font sm:text-2xl text-3xl mt-8 mb-2 font-medium text-gray-900">Our Goal</h3>
            <p className="leading-relaxed">
              Our goal is to become the most trusted maintenance and cleaning service in Dubai by providing honest, timely, and quality work. We aim to build long-term relationships with our customers through trust, value, and excellent service.
            </p>
          </div>

          {/* Image */}
          <motion.div
            className="md:w-1/2 w-5/6 lg:max-w-lg"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.7 }}
          >
            <img
              className="object-cover object-center rounded shadow-lg"
              alt="About Maas Technical Services"
              src="/abouthero.jpg"
            />
          </motion.div>
        </div>
      </motion.section>
    </div>
  );
};

export default About;
