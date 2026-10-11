"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

interface LocalNavProps {
  title: string;
  links: { label: string; id: string }[];
}

export default function LocalNav({ title, links }: LocalNavProps) {
  const [activeId, setActiveId] = useState("");
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 48);
      
      const scrollPosition = window.scrollY + 120;
      let currentId = "";
      
      for (const link of links) {
        const element = document.getElementById(link.id);
        if (element && element.offsetTop <= scrollPosition) {
          currentId = link.id;
        }
      }
      if(currentId) setActiveId(currentId);
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [links]);

  return (
    <div className={`sticky top-[48px] z-[40] h-[52px] nav-blur transition-all duration-300 border-b border-apple-hairline flex items-center`}>
      <div className="max-w-[1200px] w-full mx-auto px-4 sm:px-6 flex items-center justify-between">
        <h2 className="text-[21px] font-semibold text-apple-text tracking-tight">{title}</h2>
        <nav className="hidden md:flex gap-6">
          {links.map((link) => (
            <button
              key={link.id}
              onClick={() => {
                const el = document.getElementById(link.id);
                if (el) {
                  window.scrollTo({ top: el.offsetTop - 100, behavior: 'smooth' });
                }
              }}
              className={`text-[12px] font-medium transition-colors hover:text-[#B42318] ${
                activeId === link.id ? "text-[#B42318]" : "text-[#1E293B]"
              }`}
            >
              {link.label}
            </button>
          ))}
        </nav>
        {/* Mobile dropdown for local nav could go here */}
      </div>
    </div>
  );
}
