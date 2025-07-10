import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import "../styles/globals.css";
import Head from "next/head";


import { Geist } from 'next/font/google';

const geist = Geist({
  subsets: ['latin'],
  preload: true,
});

function MyApp({ Component, pageProps }) {
  return (
    <>
     <Head>
  <title>MAAS Technical Services</title>
  <link rel="icon" href="/favicon.ico" />

  {/* Basic SEO */}
  <meta name="description" content="Best cleaning and technical services in Dubai." />
  <meta name="keywords" content="cleaning, wallpaper fixing, sofa cleaning, water tank cleaning, AC services, Dubai" />
  <meta name="author" content="MAAS Technical Services" />
  <meta name="robots" content="index, follow" />

  {/* Mobile / responsive */}
  <meta name="viewport" content="width=device-width, initial-scale=1" />

  {/* Theme color for browser toolbar on mobile */}
  <meta name="theme-color" content="#317EFB" />

  {/* Open Graph (for social sharing) */}
  <meta property="og:title" content="MAAS Technical Services" />
  <meta property="og:description" content="Best cleaning and technical services in Dubai." />
  <meta property="og:type" content="website" />
  <meta property="og:url" content="https://yourwebsite.com" />
  <meta property="og:image" content="https://yourwebsite.com/og-image.png" />

  {/* Twitter Card */}
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="MAAS Technical Services" />
  <meta name="twitter:description" content="Best cleaning and technical services in Dubai." />
  <meta name="twitter:image" content="https://yourwebsite.com/twitter-image.png" />
</Head>
      <Navbar />
      <Component {...pageProps} />
      <Footer />
    </>
  );
}

export default MyApp;
