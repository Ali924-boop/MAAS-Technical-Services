import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { RiArrowDropDownLine } from 'react-icons/ri';
import { HiMenu, HiX } from 'react-icons/hi';
import { motion } from 'framer-motion';

const Navbar = () => {
  const router = useRouter();
  const [openDropdown, setOpenDropdown] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [hoverIndex, setHoverIndex] = useState(null);
  const [underlineProps, setUnderlineProps] = useState({ left: 0, width: 0 });
  const itemRefs = useRef([]);
  const [isAdmin, setIsAdmin] = useState(false);

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
        '/handyman',
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
    const el = itemRefs.current[hoverIndex];
    if (el) {
      setUnderlineProps({
        left: el.offsetLeft,
        width: el.offsetWidth,
      });
    }
  }, [hoverIndex]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const adminFlag = localStorage.getItem('isAdmin');
      setIsAdmin(adminFlag === 'true');
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('isAdmin');
    setIsAdmin(false);
    router.push('/');
  };

  return (
    <div className="w-full bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto flex h-22 justify-between items-center px-4 py-3">
        {/* Logo */}
        <Link href="/">
          <Image src="/logo.png" alt="Logo" width={150} height={50} />
        </Link>

        {/* Center Navigation */}
        <div className="hidden lg:flex flex-1 justify-center">
          <ul
            className="flex items-center gap-6 font-bold md:text-md relative"
            onMouseLeave={() => {
              const index = getActiveIndex(router.pathname);
              setHoverIndex(index);
            }}
          >
            {/* HOME */}
            <li
              ref={(el) => (itemRefs.current[0] = el)}
              className="cursor-pointer hover:text-blue-700"
              onMouseEnter={() => setHoverIndex(0)}
            >
              <Link href="/">HOME</Link>
            </li>

            {/* ABOUT */}
            <li
              ref={(el) => (itemRefs.current[1] = el)}
              className="cursor-pointer hover:text-blue-700"
              onMouseEnter={() => setHoverIndex(1)}
            >
              <Link href="/about">ABOUT US</Link>
            </li>

            {/* OUR SERVICES */}
            <li
              ref={(el) => (itemRefs.current[2] = el)}
              className="relative cursor-pointer hover:text-blue-700"
              onMouseEnter={() => setHoverIndex(2)}
              onClick={() => toggleDropdown('ourServices')}
            >
              <div className="flex items-center gap-1 select-none">
                OUR SERVICES <RiArrowDropDownLine className="text-xl" />
              </div>
              {openDropdown === 'ourServices' && (
                <ul className="absolute z-10 mt-2 bg-white border rounded shadow-lg py-2 w-44">
                  <li className="px-4 py-2 hover:bg-gray-100">
                    <Link href="/sofaclean">Sofa Cleaning</Link>
                  </li>
                  <li className="px-4 py-2 hover:bg-gray-100">
                    <Link href="/carpetclean">Carpet Cleaning</Link>
                  </li>
                  <li className="px-4 py-2 hover:bg-gray-100">
                    <Link href="/electrical">Electrical</Link>
                  </li>
                  <li className="px-4 py-2 hover:bg-gray-100">
                    <Link href="/plumbing">Plumbing</Link>
                  </li>
                  <li className="px-4 py-2 hover:bg-gray-100">
                    <Link href="/painting">Painting</Link>
                  </li>
                  <li className="px-4 py-2 hover:bg-gray-100">
                    <Link href="/walpaperfixing">Walpaper Fixing</Link>
                  </li>
                  <li className="px-4 py-2 hover:bg-gray-100">
                    <Link href="/tankclean">Water Tank Cleaning</Link>
                  </li>
                  <li className="px-4 py-2 hover:bg-gray-100">
                    <Link href="/handyman">Handyman</Link>
                  </li>
                </ul>
              )}
            </li>

            {/* AC SERVICES */}
            <li
              ref={(el) => (itemRefs.current[3] = el)}
              className="relative cursor-pointer hover:text-blue-700"
              onMouseEnter={() => setHoverIndex(3)}
              onClick={() => toggleDropdown('acServices')}
            >
              <div className="flex items-center gap-1 select-none">
                AC SERVICES <RiArrowDropDownLine className="text-xl" />
              </div>
              {openDropdown === 'acServices' && (
                <ul className="absolute z-10 mt-2 bg-white border rounded shadow-lg py-2 w-44">
                  <li className="px-4 py-2 hover:bg-gray-100">
                    <Link href="/acinstallation">AC Installation</Link>
                  </li>
                  <li className="px-4 py-2 hover:bg-gray-100">
                    <Link href="/acrepair">AC Repair</Link>
                  </li>
                  <li className="px-4 py-2 hover:bg-gray-100">
                    <Link href="/acmaintenance">AC Maintenance</Link>
                  </li>
                </ul>
              )}
            </li>
          </ul>

        </div>

        {/* Right Side Buttons */}
        <div className="hidden lg:flex items-center gap-6">
          {isAdmin ? (
            <>
              <Link href="/admin/chats" className="font-bold hover:text-blue-500">
                Admin
              </Link>
              <button
                onClick={handleLogout}
                className="text-white font-semibold cursor-pointer bg-blue-600 hover:bg-blue-800 py-1 px-2 rounded"
              >
                Log out
              </button>
            </>
          ) : (
            <Link href="/admin/login" className="text-white font-semibold cursor-pointer bg-blue-600 hover:bg-blue-800 py-1 px-2 rounded">
              Login
            </Link>
          )}
        </div>

        {/* Mobile Hamburger Icon */}
        <div
          className="lg:hidden text-3xl cursor-pointer"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <HiX /> : <HiMenu />}
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="lg:hidden px-6 pb-4 bg-white shadow-md">
          <ul className="flex flex-col gap-3 font-semibold">
            <li>
              <Link href="/">HOME</Link>
            </li>
            <li>
              <Link href="/about">ABOUT US</Link>
            </li>
            <li>
              <div
                onClick={() => toggleDropdown('ourServices')}
                className="flex justify-between items-center cursor-pointer"
              >
                <span>OUR SERVICES</span>
                <RiArrowDropDownLine className="text-xl" />
              </div>
              {openDropdown === 'ourServices' && (
                <ul className="pl-4 mt-1 space-y-1 text-sm text-gray-700">
                  <li><Link href="/sofaclean">Sofa Cleaning</Link></li>
                  <li><Link href="/carpetclean">Carpet Cleaning</Link></li>
                  <li><Link href="/electrical">Electrical</Link></li>
                  <li><Link href="/plumbing">Plumbing</Link></li>
                  <li><Link href="/painting">Painting</Link></li>
                  <li><Link href="/walpaperfixing">Walpaper Fixing</Link></li>
                  <li><Link href="/tankclean">Water Tank Cleaning</Link></li>
                  <li><Link href="/handyman">Handyman</Link></li>
                </ul>
              )}
            </li>
            <li>
              <div
                onClick={() => toggleDropdown('acServices')}
                className="flex justify-between items-center cursor-pointer"
              >
                <span>AC SERVICES</span>
                <RiArrowDropDownLine className="text-xl" />
              </div>
              {openDropdown === 'acServices' && (
                <ul className="pl-4 mt-1 space-y-1 text-sm text-gray-700">
                  <li><Link href="/acinstallation">AC Installation</Link></li>
                  <li><Link href="/acrepair">AC Repair</Link></li>
                  <li><Link href="/acmaintenance">AC Maintenance</Link></li>
                </ul>
              )}
            </li>

            {/* Admin Buttons Mobile */}
            {isAdmin ? (
              <>
                <li>
                  <Link href="/admin/chats" className=" font-bold">
                    Admin
                  </Link>
                </li>
                <li>
                  <button
                    onClick={handleLogout}
                    className="text-white font-semibold cursor-pointer bg-blue-600 hover:bg-blue-800 py-1 px-2 rounded"
                  >
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <li>
                <Link href="/admin/login" className="text-white font-semibold cursor-pointer bg-blue-600 hover:bg-blue-800 py-1 px-2 rounded">
                  LOGIN
                </Link>
              </li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Navbar;
