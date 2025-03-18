"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useLayoutEffect, useState } from "react";
import { ButtonGradient } from "./ButtonGradient";
import { FaBars, FaTimes } from "react-icons/fa";

export default function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const router = useRouter()

  // Detect scroll position to change background color
  useLayoutEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    // Cleanup the event listener
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const getLinkClass = (path: string) => {
    const isActive = pathname === path;
    return `text-lg font-medium ${isActive ? "text-primary underline" : "hover:text-primary"}`;
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 ${scrolled ? "bg-white py-8 mt-0" : "mt-10 h-10"}`}>
      <div className="flex w-full px-4 md:px-10 items-center justify-between">
        <div className="flex items-center">
          {/* Mobile Menu Button */}
           <button className="lg:hidden text-2xl mr-8" onClick={() => setMenuOpen(true)}>
            <FaBars />
          </button>
          <Link href="/" className="text-2xl font-semibold">
            Logo
          </Link>
        </div>

        <div className="hidden lg:flex items-center gap-8">
          <Link href="/" className={getLinkClass("/")}>
            Home
          </Link>
          <Link href="/about-us" className={getLinkClass("/about-us")}>
            About Us
          </Link>
          <Link href="/grading" className={getLinkClass("/grading")}>
            Grading Process
          </Link>
          <Link href="/services-and-pricing" className={getLinkClass("/services")}>
            Services & Pricing
          </Link>
          <Link href="/portfolio" className={getLinkClass("/portfolio")}>
            Portfolio
          </Link>
          <Link href="/contact-us" className={getLinkClass("/contact")}>
            Contact Us
          </Link>
        </div>
        <div className="flex">
          <ButtonGradient onClick={() => router.push('/login')}>Start Submission</ButtonGradient>
        </div>
      </div>

        {/* Mobile Sidebar */}
        <div className={`fixed inset-y-0 left-0 w-64 bg-white shadow-lg transform ${menuOpen ? "translate-x-0" : "-translate-x-full"} transition-transform duration-300 ease-in-out z-50`}>
          <div className="flex justify-between items-center p-4 border-b">
            <span className="text-lg font-semibold">Menu</span>
            <button onClick={() => setMenuOpen(false)} className="text-2xl">
              <FaTimes />
            </button>
          </div>

          <ul className="p-4 space-y-4">
            <li><Link href="/" className="block p-2 hover:bg-gray-200" onClick={() => setMenuOpen(false)}>Home</Link></li>
            <li><Link href="/about-us" className="block p-2 hover:bg-gray-200" onClick={() => setMenuOpen(false)}>About Us</Link></li>
            <li><Link href="/grading" className="block p-2 hover:bg-gray-200" onClick={() => setMenuOpen(false)}>Grading Process</Link></li>
            <li><Link href="/services-and-pricing" className="block p-2 hover:bg-gray-200" onClick={() => setMenuOpen(false)}>Services & Pricing</Link></li>
            <li><Link href="/portfolio" className="block p-2 hover:bg-gray-200" onClick={() => setMenuOpen(false)}>Portfolio</Link></li>
            <li><Link href="/contact-us" className="block p-2 hover:bg-gray-200" onClick={() => setMenuOpen(false)}>Contact Us</Link></li>
          </ul>
        </div>

      {/* Overlay when menu is open */}
      {menuOpen && <div className="fixed inset-0 bg-black bg-opacity-50" onClick={() => setMenuOpen(false)}></div>}
    </nav>
  );
}
