"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ChevronDown, ArrowRight, ShieldCheck, Database, Sparkles, Lock, Zap, BarChart3 } from "lucide-react";
import Logo from "./Logo";
import { navLinks } from "@/data/content";
import { motion, AnimatePresence } from "framer-motion";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [mobileExpanded, setMobileExpanded] = useState<Record<string, boolean>>({});
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMobileSubmenu = (name: string) => {
    setMobileExpanded(prev => ({ ...prev, [name]: !prev[name] }));
  };

  const solutionIcons: Record<string, any> = {
    "Digital Transformation": Sparkles,
    "ERP Solutions": Database,
    "Managed Services": ShieldCheck,
    "Cyber Security": Lock,
    "Intelligent Automation": Zap,
    "Data Engineering & BI": BarChart3
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-[60] bg-white transition-all duration-300 ${
        isScrolled ? "h-[76px] shadow-sm border-b border-slate-200" : "h-[84px] border-b border-slate-100"
      }`}
    >
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center justify-between">
        {/* Brand Logo */}
        <div className="flex-shrink-0">
          <Logo variant="full" />
        </div>

        {/* Desktop Navigation Links with Dropdowns (1280px+) */}
        <nav className="hidden xl:flex items-center space-x-1">
          {navLinks.map((link) => {
            const hasSubmenu = link.submenu && link.submenu.length > 0;
            const isSolutions = link.name === "Solutions";

            return (
              <div
                key={link.name}
                className="relative"
                onMouseEnter={() => hasSubmenu && setOpenDropdown(link.name)}
                onMouseLeave={() => hasSubmenu && setOpenDropdown(null)}
              >
                <Link
                  href={link.href}
                  className={`inline-flex items-center gap-1.5 px-3.5 py-2 text-[14px] font-semibold transition-colors rounded-md whitespace-nowrap ${
                    pathname === link.href
                      ? "text-[#B42318]"
                      : "text-[#1E293B] hover:text-[#B42318]"
                  }`}
                >
                  {link.name}
                  {hasSubmenu && (
                    <ChevronDown
                      className={`w-4 h-4 transition-transform duration-200 ${
                        openDropdown === link.name ? "rotate-180 text-[#B42318]" : "text-slate-400"
                      }`}
                    />
                  )}
                </Link>

                {/* Desktop Dropdown Menus */}
                {hasSubmenu && (
                  <AnimatePresence>
                    {openDropdown === link.name && (
                      <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.98 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.98 }}
                        transition={{ duration: 0.2 }}
                        className={`absolute top-full left-0 mt-1 bg-white border border-slate-200 shadow-xl rounded-xl p-3 z-50 ${
                          isSolutions ? "w-[560px] grid grid-cols-2 gap-2" : "w-[260px] flex flex-col gap-1"
                        }`}
                      >
                        {link.submenu?.map((item) => {
                          const IconComp = solutionIcons[item.name];

                          if (isSolutions) {
                            return (
                              <Link
                                key={item.name}
                                href={item.href}
                                onClick={() => setOpenDropdown(null)}
                                className="flex items-start gap-3 p-3 rounded-lg hover:bg-red-50/50 transition-colors group"
                              >
                                {IconComp ? (
                                  <div className="w-8 h-8 rounded-md bg-[#B42318]/10 text-[#B42318] flex items-center justify-center flex-shrink-0 group-hover:bg-[#B42318] group-hover:text-white transition-colors">
                                    <IconComp className="w-4 h-4" />
                                  </div>
                                ) : (
                                  <div className="w-2 h-2 rounded-full bg-[#B42318] mt-2 flex-shrink-0" />
                                )}
                                <div>
                                  <p className="text-[13px] font-bold text-[#0F172A] group-hover:text-[#B42318] transition-colors leading-tight">
                                    {item.name}
                                  </p>
                                  {item.desc && (
                                    <p className="text-[11px] text-[#64748B] mt-0.5 line-clamp-1 leading-snug">
                                      {item.desc}
                                    </p>
                                  )}
                                </div>
                              </Link>
                            );
                          }

                          return (
                            <Link
                              key={item.name}
                              href={item.href}
                              onClick={() => setOpenDropdown(null)}
                              className="flex items-center justify-between px-3 py-2 text-[13px] font-medium text-[#1E293B] hover:text-[#B42318] hover:bg-red-50/40 rounded-md transition-colors"
                            >
                              <span>{item.name}</span>
                              <ArrowRight className="w-3.5 h-3.5 text-slate-300 group-hover:text-[#B42318]" />
                            </Link>
                          );
                        })}
                      </motion.div>
                    )}
                  </AnimatePresence>
                )}
              </div>
            );
          })}
        </nav>

        {/* Right Action Area */}
        <div className="flex items-center gap-3 sm:gap-4 flex-shrink-0">
          <Link
            href="/contact-us"
            className="hidden sm:inline-flex bg-[#B42318] hover:bg-[#8E1010] text-white text-[13px] sm:text-[14px] font-semibold px-4 sm:px-5 py-2 sm:py-2.5 rounded-md transition-all duration-300 shadow-sm items-center gap-2 group whitespace-nowrap"
          >
            <span>Schedule a Consultation</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>

          {/* Hamburger Button (shown below 1280px) */}
          <button
            className="xl:hidden p-2 text-[#1E293B] hover:text-[#B42318] transition-colors rounded-md border border-slate-200"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Full Height Mobile Slide Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="xl:hidden fixed inset-x-0 top-[76px] bottom-0 bg-white border-t border-slate-200 z-50 overflow-y-auto px-6 py-6 flex flex-col justify-between"
          >
            <div className="space-y-3">
              {navLinks.map((link) => {
                const hasSubmenu = link.submenu && link.submenu.length > 0;
                const isExpanded = mobileExpanded[link.name];

                return (
                  <div key={link.name} className="border-b border-slate-100 pb-2">
                    <div className="flex items-center justify-between py-2">
                      <Link
                        href={link.href}
                        onClick={() => !hasSubmenu && setMobileMenuOpen(false)}
                        className="text-[17px] font-semibold text-[#0F172A] hover:text-[#B42318]"
                      >
                        {link.name}
                      </Link>
                      {hasSubmenu && (
                        <button
                          onClick={() => toggleMobileSubmenu(link.name)}
                          className="p-1 text-slate-500"
                          aria-label={`Toggle ${link.name} submenu`}
                        >
                          <ChevronDown
                            className={`w-5 h-5 transition-transform duration-200 ${
                              isExpanded ? "rotate-180 text-[#B42318]" : ""
                            }`}
                          />
                        </button>
                      )}
                    </div>

                    {/* Mobile Submenu Items */}
                    {hasSubmenu && isExpanded && (
                      <div className="pl-4 py-2 space-y-2 bg-slate-50 rounded-lg my-1">
                        {link.submenu?.map((sub) => (
                          <Link
                            key={sub.name}
                            href={sub.href}
                            onClick={() => setMobileMenuOpen(false)}
                            className="block text-[14px] text-[#64748B] hover:text-[#B42318] py-1"
                          >
                            {sub.name}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            <div className="pt-6 mt-6 border-t border-slate-200">
              <Link
                href="/contact-us"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full bg-[#B42318] hover:bg-[#8E1010] text-white text-center py-3.5 rounded-md font-semibold flex items-center justify-center gap-2 shadow-sm text-[15px]"
              >
                <span>Schedule a Consultation</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
