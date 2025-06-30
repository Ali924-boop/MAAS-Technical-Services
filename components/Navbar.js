import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { MdAccountCircle } from 'react-icons/md';
import { RiArrowDropDownLine } from 'react-icons/ri';
import { HiMenu, HiX } from 'react-icons/hi';
import { motion } from 'framer-motion';

const Navbar = () => {
  const router = useRouter();
  const [openDropdown, setOpenDropdown] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [hoverIndex, setHoverIndex] = useState(null);
  const [underlineProps, setUnderlineProps] = useState({ left: 0, width: 0 });
  const navRef = useRef(null);

  const toggleDropdown = (menu) => {
    setOpenDropdown(openDropdown === menu ? null : menu);
  };

  const getActiveIndex = (pathname) => {
    if (pathname === '/') return 0;
    if (pathname === '/about') return 1;
    if (
      [
        '/sofaclean',
        '/carpetclean',
        '/electrical',
        '/painting',
        '/plumbing',
        '/walpaperfixing',
        '/tankclean',
        
      ].includes(pathname)
    )
      return 2;
    if (['/acinstallation', '/acrepair', '/acmaintenance'].includes(pathname))
      return 3;
    return null;
  };

  useEffect(() => {
    const index = getActiveIndex(router.pathname);
    setHoverIndex(index);
  }, [router.pathname]);

  useEffect(() => {
    const nav = navRef.current;
    if (!nav) return;

    const item = nav.children[hoverIndex ?? 0];
    if (item) {
      setUnderlineProps({
        left: item.offsetLeft,
        width: item.offsetWidth,
      });
    }
  }, [hoverIndex]);

  return (
    <div className="w-full bg-white shadow-md sticky top-0 z-50">
      <div className="flex h-22 justify-between items-center px-6 py-3">
        {/* Logo */}
        <Link href="/">
          <Image src="/logo.png" alt="Logo" width={150} height={50} />
        </Link>

        {/* Hamburger */}
        <div
          className="lg:hidden text-3xl cursor-pointer"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <HiX /> : <HiMenu />}
        </div>

        {/* Desktop Navigation */}
        <ul
          ref={navRef}
          className="hidden lg:flex items-center gap-6 font-bold md:text-md relative"
          onMouseLeave={() => {
            const index = getActiveIndex(router.pathname);
            setHoverIndex(index);
          }}
        >
          <li className="cursor-pointer hover:text-blue-700" onMouseEnter={() => setHoverIndex(0)}>
            <Link href="/">HOME</Link>
          </li>

          <li className="cursor-pointer hover:text-blue-700" onMouseEnter={() => setHoverIndex(1)}>
            <Link href="/about">ABOUT US</Link>
          </li>

          {/* Our Services Dropdown */}
          <li
            className={`relative cursor-pointer ${
              openDropdown === 'ourServices' ? '' : 'hover:text-blue-700'
            }`}
            onClick={() => toggleDropdown('ourServices')}
            onMouseEnter={() => setHoverIndex(2)}
          >
            <div className="flex items-center gap-1 select-none">
              OUR SERVICES <RiArrowDropDownLine className="text-xl" />
            </div>
            {openDropdown === 'ourServices' && (
              <ul className="absolute z-10 mt-2 bg-white border rounded shadow-lg py-2 w-44">
                <li className="px-4 py-2 hover:bg-gray-100"><Link href="/sofaclean">Sofa Cleaning</Link></li>
                <li className="px-4 py-2 hover:bg-gray-100"><Link href="/carpetclean">Carpet Cleaning</Link></li>
                <li className="px-4 py-2 hover:bg-gray-100"><Link href="/electrical">Electrical</Link></li>
                <li className="px-4 py-2 hover:bg-gray-100"><Link href="/plumbing">Plumbing</Link></li>
                <li className="px-4 py-2 hover:bg-gray-100"><Link href="/painting">Painting</Link></li>
                <li className="px-4 py-2 hover:bg-gray-100"><Link href="/walpaperfixing">Walpaper Fixing</Link></li>
                <li className="px-4 py-2 hover:bg-gray-100"><Link href="/tankclean">Water Tank Cleaning</Link></li>
                <li className="px-4 py-2 hover:bg-gray-100"><Link href="/handyman">Handyman</Link></li>
              </ul>
            )}
          </li>

          {/* AC Services Dropdown */}
          <li
            className={`relative cursor-pointer ${
              openDropdown === 'acServices' ? '' : 'hover:text-blue-700'
            }`}
            onClick={() => toggleDropdown('acServices')}
            onMouseEnter={() => setHoverIndex(3)}
          >
            <div className="flex items-center gap-1 select-none">
              AC SERVICES <RiArrowDropDownLine className="text-xl" />
            </div>
            {openDropdown === 'acServices' && (
              <ul className="absolute z-10 mt-2 bg-white border rounded shadow-lg py-2 w-44">
                <li className="px-4 py-2 hover:bg-gray-100"><Link href="/acinstallation">AC Installation</Link></li>
                <li className="px-4 py-2 hover:bg-gray-100"><Link href="/acrepair">AC Repair</Link></li>
                <li className="px-4 py-2 hover:bg-gray-100"><Link href="/acmaintenance">AC Maintenance</Link></li>
              </ul>
            )}
          </li>

          {/* Underline Animation */}
          <motion.div
            layout
            transition={{ type: 'spring', stiffness: 500, damping: 30 }}
            className="absolute bottom-0 h-[3px] bg-gradient-to-r from-blue-600 via-blue-400 to-blue-600 rounded pointer-events-none"
            style={{ left: underlineProps.left, width: underlineProps.width }}
          />
        </ul>

        {/* User Icon */}
        <div className="hidden lg:block">
          <Link href="/account">
            <MdAccountCircle className="text-3xl text-gray-700 hover:text-blue-700" />
          </Link>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="lg:hidden px-6 pb-4 bg-white shadow-md">
          <ul className="flex flex-col gap-3 font-semibold">
            <li><Link href="/">HOME</Link></li>
            <li><Link href="/about">ABOUT US</Link></li>

            <li>
              <div onClick={() => toggleDropdown('ourServices')} className="flex justify-between items-center cursor-pointer">
                <span>OUR SERVICES</span> <RiArrowDropDownLine className="text-xl" />
              </div>
              {openDropdown === 'ourServices' && (
                <ul className="pl-4 mt-1 space-y-1 text-sm text-gray-700">
                  <li><Link href="/sofaclean">Sofa Cleaning</Link></li>
                  <li><Link href="/carpetclean">Carpet Cleaning</Link></li>
                  <li><Link href="/electrical">Electrical</Link></li>
                  <li><Link href="/painting">Painting</Link></li>
                  <li><Link href="/walpaperfixing">Walpaper Fixing</Link></li>
                  <li><Link href="/tankclean">Water Tank Cleaning</Link></li>
                  <li><Link href="/handyman">Handyman</Link></li>
                </ul>
              )}
            </li>

            <li>
              <div onClick={() => toggleDropdown('acServices')} className="flex justify-between items-center cursor-pointer">
                <span>AC SERVICES</span> <RiArrowDropDownLine className="text-xl" />
              </div>
              {openDropdown === 'acServices' && (
                <ul className="pl-4 mt-1 space-y-1 text-sm text-gray-700">
                  <li><Link href="/acinstallation">AC Installation</Link></li>
                  <li><Link href="/acrepair">AC Repair</Link></li>
                  <li><Link href="/acmaintenance">AC Maintenance</Link></li>
                </ul>
              )}
            </li>

            <li>
              <Link href="/account" className="flex items-center gap-1 pt-3">
                <MdAccountCircle className="text-xl" /> My Account
              </Link>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default Navbar;
