"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLayoutEffect, useState } from "react";
import { ButtonGradient } from "./ButtonGradient";

export default function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);

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
          <Link href="/" className="text-2xl font-semibold">
            Logo
          </Link>
        </div>

        <div className="hidden md:flex items-center gap-8">
          <Link href="/" className={getLinkClass("/")}>
            Home
          </Link>
          <Link href="/about-us" className={getLinkClass("/#about-us")}>
            About Us
          </Link>
          <Link href="/services" className={getLinkClass("/#services")}>
            Services & Pricing
          </Link>
          <Link href="/contact-us" className={getLinkClass("/#contact")}>
            Contact Us
          </Link>
        </div>
        <div className="flex">
          <ButtonGradient>Start Submission</ButtonGradient>
        </div>
      </div>
    </nav>
  );
}
