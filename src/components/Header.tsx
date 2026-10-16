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
      setIsScrolled(window.scrollY > 15);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMobileSubmenu = (name: string) => {
    setMobileExpanded(prev => ({ ...prev, [name]: !prev[name] }));
  };

  const solutionIcons: Record<string, any> = {
    "Business Intelligence & Analytics": BarChart3,
    "Data Engineering & Cloud": Database,
    "Qlik to Power BI Migration": Zap,
    "Reporting Modernization": Sparkles,
    "IT Consulting & Staffing": ShieldCheck,
    "Enterprise Analytics & Cloud": Lock
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-[60] frosted-header transition-all duration-300 ${
        isScrolled ? "h-[68px] shadow-[0_2px_12px_rgba(0,0,0,0.04)]" : "h-[76px]"
      }`}
    >
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center justify-between">
        {/* Brand Logo */}
        <div className="flex-shrink-0">
          <Logo variant="full" />
        </div>

        {/* Desktop Navigation Links with Dropdowns (1024px+) */}
        <nav className="hidden lg:flex items-center space-x-1" aria-label="Main Navigation">
          {navLinks.map((link) => {
            const hasSubmenu = link.submenu && link.submenu.length > 0;
            const isSolutions = link.name === "Solutions";
            const isActive = pathname === link.href;

            return (
              <div
                key={link.name}
                className="relative"
                onMouseEnter={() => hasSubmenu && setOpenDropdown(link.name)}
                onMouseLeave={() => hasSubmenu && setOpenDropdown(null)}
              >
                <Link
                  href={link.href}
                  className={`inline-flex items-center gap-1 px-3.5 py-1.5 text-[13px] font-medium tracking-tight transition-all duration-200 rounded-full whitespace-nowrap ${
                    isActive
                      ? "text-[#B42318] bg-black/[0.04]"
                      : "text-[#1D1D1F] hover:text-[#B42318] hover:bg-black/[0.03]"
                  }`}
                >
                  <span>{link.name}</span>
                  {hasSubmenu && (
                    <ChevronDown
                      className={`w-3.5 h-3.5 transition-transform duration-200 ${
                        openDropdown === link.name ? "rotate-180 text-[#B42318]" : "text-[#86868B]"
                      }`}
                    />
                  )}
                </Link>

                {/* Desktop Dropdown Menus */}
                {hasSubmenu && (
                  <AnimatePresence>
                    {openDropdown === link.name && (
                      <motion.div
                        initial={{ opacity: 0, y: 8, scale: 0.98 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 6, scale: 0.98 }}
                        transition={{ type: "spring", damping: 25, stiffness: 350 }}
                        className={`absolute top-full left-0 mt-1.5 bg-white border border-slate-200 shadow-[0_20px_50px_rgba(0,0,0,0.12)] rounded-2xl p-2.5 z-50 ${
                          isSolutions ? "w-[560px] grid grid-cols-2 gap-2" : "w-[260px] flex flex-col gap-1"
                        }`}
                      >
                        {link.submenu?.map((item: any) => {
                          const IconComp = solutionIcons[item.name];

                          if (isSolutions) {
                            return (
                              <Link
                                key={item.name}
                                href={item.href}
                                onClick={() => setOpenDropdown(null)}
                                className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-black/[0.04] transition-all group select-none active:scale-[0.98]"
                              >
                                {IconComp ? (
                                  <div className="w-8 h-8 rounded-lg bg-[#B42318]/10 text-[#B42318] flex items-center justify-center flex-shrink-0 group-hover:bg-[#B42318] group-hover:text-white transition-colors duration-200">
                                    <IconComp className="w-4 h-4" />
                                  </div>
                                ) : (
                                  <div className="w-2 h-2 rounded-full bg-[#B42318] mt-2 flex-shrink-0" />
                                )}
                                <div>
                                  <p className="text-[13px] font-semibold text-[#1D1D1F] group-hover:text-[#B42318] transition-colors leading-tight">
                                    {item.name}
                                  </p>
                                  {item.desc && (
                                    <p className="text-[11px] text-[#86868B] mt-0.5 line-clamp-1 leading-snug">
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
                              className="flex items-center justify-between px-3 py-2 text-[13px] font-medium text-[#1D1D1F] hover:text-[#B42318] hover:bg-black/[0.04] rounded-xl transition-all select-none active:scale-[0.98]"
                            >
                              <span>{item.name}</span>
                              <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-[#B42318] transition-colors" />
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
            className="hidden sm:inline-flex bg-[#B42318] hover:bg-[#8E1010] text-white text-[13px] font-semibold px-4.5 py-2 rounded-full transition-all duration-200 shadow-xs items-center gap-1.5 group whitespace-nowrap active:scale-95"
          >
            <span>Schedule a Consultation</span>
            <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5" />
          </Link>

          {/* Hamburger Button (shown below 1024px) */}
          <button
            className="lg:hidden p-2 text-zinc-900 hover:text-[#B42318] transition-colors rounded-full border border-black/[0.08] active:scale-95 cursor-pointer"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Full Height Mobile Slide Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "calc(100vh - 68px)" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="lg:hidden fixed inset-x-0 top-[68px] bg-white/95 backdrop-blur-xl border-t border-zinc-200 z-50 overflow-y-auto px-6 py-6 flex flex-col justify-between"
          >
            <div className="space-y-2">
              {navLinks.map((link) => {
                const hasSubmenu = link.submenu && link.submenu.length > 0;
                const isExpanded = mobileExpanded[link.name];

                return (
                  <div key={link.name} className="border-b border-black/[0.04] pb-2">
                    <div className="flex items-center justify-between py-2.5">
                      <Link
                        href={link.href}
                        onClick={() => !hasSubmenu && setMobileMenuOpen(false)}
                        className="text-[17px] font-semibold text-[#1D1D1F] hover:text-[#B42318] tracking-tight"
                      >
                        {link.name}
                      </Link>
                      {hasSubmenu && (
                        <button
                          onClick={() => toggleMobileSubmenu(link.name)}
                          className="p-1.5 text-slate-500 rounded-full hover:bg-black/[0.05]"
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
                      <div className="pl-3 py-2 space-y-1 bg-black/[0.02] rounded-xl my-1">
                        {link.submenu?.map((sub) => (
                          <Link
                            key={sub.name}
                            href={sub.href}
                            onClick={() => setMobileMenuOpen(false)}
                            className="block text-[14px] text-[#86868B] hover:text-[#B42318] py-1.5 font-medium"
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

            <div className="pt-6 mt-6 border-t border-black/[0.08]">
              <Link
                href="/contact-us"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full bg-[#B42318] hover:bg-[#8E1010] text-white text-center py-3.5 rounded-full font-semibold flex items-center justify-center gap-2 shadow-xs text-[15px] active:scale-98 transition-all"
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
