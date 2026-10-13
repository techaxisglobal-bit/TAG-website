"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";

interface LocalNavProps {
  title: string;
  links: { label: string; id: string }[];
}

export default function LocalNav({ title, links }: LocalNavProps) {
  const [activeId, setActiveId] = useState("");
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
      
      const scrollPosition = window.scrollY + 140;
      let currentId = links[0]?.id || "";
      
      for (const link of links) {
        const element = document.getElementById(link.id);
        if (element && element.offsetTop <= scrollPosition) {
          currentId = link.id;
        }
      }
      if (currentId) setActiveId(currentId);
    };
    
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [links]);

  return (
    <div
      className={`sticky top-[70px] z-[40] h-[52px] bg-[#F5F5F7] transition-all duration-300 border-b border-slate-200 shadow-[0_2px_8px_rgba(0,0,0,0.03)] flex items-center`}
    >
      <div className="max-w-[1280px] w-full mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        <h2 className="text-[19px] sm:text-[21px] font-semibold text-[#1D1D1F] tracking-tight whitespace-nowrap">
          {title}
        </h2>
        
        {/* Navigation items with smooth scroll & horizontal scroll on mobile */}
        <nav className="flex items-center gap-1 sm:gap-2 overflow-x-auto scrollbar-none py-1" aria-label="Local section navigation">
          {links.map((link) => {
            const isActive = activeId === link.id;
            return (
              <button
                key={link.id}
                onClick={() => {
                  const el = document.getElementById(link.id);
                  if (el) {
                    const y = el.getBoundingClientRect().top + window.pageYOffset - 110;
                    window.scrollTo({ top: y, behavior: "smooth" });
                  }
                }}
                className={`relative px-3 py-1.5 text-[12px] sm:text-[13px] font-medium tracking-tight rounded-full transition-all duration-200 whitespace-nowrap cursor-pointer select-none active:scale-95 ${
                  isActive
                    ? "text-[#B42318] font-semibold"
                    : "text-[#86868B] hover:text-[#1D1D1F] hover:bg-black/[0.03]"
                }`}
              >
                <span>{link.label}</span>
                {isActive && (
                  <motion.div
                    layoutId="activeLocalNavPill"
                    className="absolute inset-0 bg-[#B42318]/10 rounded-full -z-10"
                    transition={{ type: "spring", damping: 25, stiffness: 350 }}
                  />
                )}
              </button>
            );
          })}
        </nav>
      </div>
    </div>
  );
}
