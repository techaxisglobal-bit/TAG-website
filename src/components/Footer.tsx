import Link from "next/link";
import Image from "next/image";
import { siteConfig, solutions, industries } from "@/data/content";
import Logo from "./Logo";
import { Mail, Phone, MapPin, ArrowRight } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#0F172A] text-slate-300 border-t border-slate-800 text-[14px]">
      {/* Pre-footer Call to Action Bar */}
      <div className="border-b border-white/10 py-10 bg-gradient-to-r from-[#0F172A] via-[#1E293B] to-[#B42318]/30">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#B42318]/20 border border-[#B42318]/30 text-white text-[11px] font-bold tracking-wider uppercase mb-2">
              <span className="w-2 h-2 rounded-full bg-[#D97706]"></span>
              Ready to transform?
            </div>
            <h3 className="text-2xl md:text-3xl font-bold text-white tracking-tight">
              Simplifying IT for a complex world.
            </h3>
            <p className="text-slate-300 mt-1 max-w-xl text-[14px]">
              Talk with our enterprise solutions architects and discover how we can optimize your technology investments.
            </p>
          </div>
          <Link
            href="/contact-us"
            className="bg-[#B42318] hover:bg-white hover:text-[#B42318] text-white px-7 py-3.5 rounded-full font-semibold transition-all duration-200 shadow-md flex items-center gap-2 flex-shrink-0 group active:scale-95"
          >
            <span>Schedule a Free Consultation</span>
            <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
          </Link>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          
          {/* Column 1: Brand & Contact Info */}
          <div className="lg:col-span-2 space-y-6">
            <div>
              <Logo variant="dark-bg" />
            </div>
            
            <p className="text-slate-400 text-[14px] leading-relaxed max-w-sm">
              We manage your IT, so you can manage your business. Enterprise IT consulting delivering digital transformation, ERP platforms, and data engineering excellence.
            </p>

            <div className="space-y-3 text-slate-300 text-[13px]">
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-[#B42318] mt-1 flex-shrink-0" />
                <div>
                  <p className="font-semibold text-white">Headquarters (USA):</p>
                  <p className="text-slate-400">{siteConfig.contact.address}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-[#D97706] flex-shrink-0" />
                <a href={`tel:${siteConfig.contact.phone.replace(/[^0-9+]/g, '')}`} className="hover:text-white transition-colors">
                  {siteConfig.contact.phone}
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-[#D97706] flex-shrink-0" />
                <a href={`mailto:${siteConfig.contact.email}`} className="hover:text-white transition-colors">
                  {siteConfig.contact.email}
                </a>
              </div>
            </div>

            {/* Official E-Verify Federal Authorization Badge */}
            <div className="pt-2">
              <div className="inline-flex items-center gap-3.5 p-3 rounded-xl bg-slate-900/90 border border-white/10 hover:border-white/20 transition-all max-w-sm">
                <div className="relative w-24 h-12 flex-shrink-0 rounded-lg overflow-hidden bg-[#1A1A1A] p-1 flex items-center justify-center">
                  <Image
                    src="/e-verify.png"
                    alt="E-Verify Official Federal Employment Eligibility Verification Program"
                    width={100}
                    height={45}
                    className="object-contain max-h-10 w-auto"
                  />
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                    <span className="text-[12px] font-bold text-white tracking-wide">An E-Verified US Firm</span>
                  </div>
                  <p className="text-[11px] text-slate-400 leading-tight mt-0.5">
                    U.S. Department of Homeland Security authorized employer.
                  </p>
                </div>
              </div>
            </div>

            {/* Social Icons with Clean SVG */}
            <div className="flex items-center gap-3 pt-2">
              <a
                href={siteConfig.links.linkedin}
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-md bg-white/5 hover:bg-[#B42318] text-white flex items-center justify-center transition-colors"
                aria-label="LinkedIn"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                </svg>
              </a>
              <a
                href={siteConfig.links.twitter}
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-md bg-white/5 hover:bg-[#B42318] text-white flex items-center justify-center transition-colors"
                aria-label="X (Twitter)"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </a>
              <a
                href={siteConfig.links.facebook}
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-md bg-white/5 hover:bg-[#B42318] text-white flex items-center justify-center transition-colors"
                aria-label="Facebook"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.325-1.325z"/>
                </svg>
              </a>
              <a
                href={siteConfig.links.instagram}
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-md bg-white/5 hover:bg-[#B42318] text-white flex items-center justify-center transition-colors"
                aria-label="Instagram"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
              <a
                href={siteConfig.links.youtube}
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-md bg-white/5 hover:bg-[#B42318] text-white flex items-center justify-center transition-colors"
                aria-label="YouTube"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Column 2: Solutions */}
          <div>
            <h4 className="text-white font-bold text-[15px] uppercase tracking-wider mb-5 flex items-center gap-2">
              <span className="w-2 h-2 bg-[#B42318] rounded-full"></span>
              Solutions
            </h4>
            <ul className="space-y-3">
              {solutions.map((item) => (
                <li key={item.id}>
                  <Link
                    href={`/services#${item.id}`}
                    className="text-slate-400 hover:text-white hover:translate-x-1 inline-block transition-all text-[13.5px]"
                  >
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Industry Focus */}
          <div>
            <h4 className="text-white font-bold text-[15px] uppercase tracking-wider mb-5 flex items-center gap-2">
              <span className="w-2 h-2 bg-[#D97706] rounded-full"></span>
              Industry Focus
            </h4>
            <ul className="space-y-3">
              {industries.map((ind) => (
                <li key={ind.id}>
                  <Link
                    href={`/industries#${ind.id}`}
                    className="text-slate-400 hover:text-white hover:translate-x-1 inline-block transition-all text-[13.5px]"
                  >
                    {ind.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Company */}
          <div>
            <h4 className="text-white font-bold text-[15px] uppercase tracking-wider mb-5 flex items-center gap-2">
              <span className="w-2 h-2 bg-white rounded-full"></span>
              Company
            </h4>
            <ul className="space-y-3">
              <li>
                <Link href="/about-us" className="text-slate-400 hover:text-white hover:translate-x-1 inline-block transition-all text-[13.5px]">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/about-us#why-us" className="text-slate-400 hover:text-white hover:translate-x-1 inline-block transition-all text-[13.5px]">
                  Why TAG
                </Link>
              </li>
              <li>
                <Link href="/#partnerships" className="text-slate-400 hover:text-white hover:translate-x-1 inline-block transition-all text-[13.5px]">
                  Partners & Certifications
                </Link>
              </li>
              <li>
                <Link href="/careers" className="text-slate-400 hover:text-white hover:translate-x-1 inline-block transition-all text-[13.5px]">
                  Careers
                </Link>
              </li>
              <li>
                <Link href="/contact-us" className="text-slate-400 hover:text-white hover:translate-x-1 inline-block transition-all text-[13.5px]">
                  Schedule Consultation
                </Link>
              </li>
              <li>
                <Link href="/privacy-policy" className="text-slate-400 hover:text-white hover:translate-x-1 inline-block transition-all text-[13.5px]">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms-and-conditions" className="text-slate-400 hover:text-white hover:translate-x-1 inline-block transition-all text-[13.5px]">
                  Terms & Conditions
                </Link>
              </li>
            </ul>
          </div>

        </div>
      </div>

      {/* Bottom Legal Bar */}
      <div className="border-t border-white/10 py-6 bg-[#0B1120]">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[12.5px] text-slate-400">
          <p>© {currentYear} {siteConfig.name}. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <Link href="/terms-and-conditions" className="hover:text-white transition-colors">
              Terms & Conditions
            </Link>
            <span>•</span>
            <Link href="/privacy-policy" className="hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <span>•</span>
            <span className="text-[#B42318] font-semibold">Complexity Simplified</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
