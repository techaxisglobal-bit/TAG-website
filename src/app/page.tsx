"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  CheckCircle2,
  Phone,
  Sparkles,
  Database,
  ShieldCheck,
  Lock,
  Zap,
  BarChart3,
  TrendingDown,
  Cpu,
  Award,
  Maximize,
  ChevronRight,
  Server,
  Check,
  Send
} from "lucide-react";

import {
  siteConfig,
  heroStats,
  valueProps,
  solutions,
  vendorEcosystem,
  clientPartners,
  consultationBenefits,
  consultationSteps
} from "@/data/content";

const iconMap: Record<string, any> = {
  Sparkles,
  Database,
  ShieldCheck,
  Lock,
  Zap,
  BarChart3,
  TrendingDown,
  Cpu,
  Award,
  Maximize
};

export default function Home() {
  const [activeVendorTab, setActiveVendorTab] = useState(0);

  // Form State
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    company: "",
    email: "",
    phone: "",
    service: "Digital Transformation",
    message: ""
  });
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setFormSubmitted(true);
    }, 800);
  };

  return (
    <div className="pt-[84px] bg-white text-[#1E293B]">
      
      {/* =========================================================
          SECTION 1: HERO SECTION
          ========================================================= */}
      <section className="relative overflow-hidden bg-gradient-to-b from-red-50/30 via-slate-50/50 to-white pt-12 pb-16 lg:pt-20 lg:pb-24">
        {/* Subtle decorative grid and brand color glow in background */}
        <div className="absolute inset-0 bg-[radial-gradient(#B42318_1px,transparent_1px)] [background-size:24px_24px] opacity-10 pointer-events-none" />
        <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-[#B42318]/10 rounded-full blur-3xl pointer-events-none -z-10" />
        <div className="absolute bottom-10 left-10 w-[400px] h-[400px] bg-[#D97706]/10 rounded-full blur-3xl pointer-events-none -z-10" />

        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            
            {/* Left Column: Headlines & Call to Actions */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="lg:col-span-7 space-y-6"
            >
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#B42318]/10 border border-[#B42318]/20 text-[#B42318] text-[12px] font-bold tracking-wider uppercase">
                <span className="w-2 h-2 rounded-full bg-[#D97706] animate-pulse"></span>
                Complexity Simplified
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-[62px] font-extrabold text-[#0F172A] leading-[1.08] tracking-tight">
                We manage your IT,<br />
                <span className="text-[#B42318]">so you can manage</span><br />
                your business.
              </h1>

              <p className="text-lg sm:text-xl text-[#64748B] max-w-xl font-normal leading-relaxed">
                Take charge of your business continuity with innovative IT solutions. We optimize workflows, safeguard digital assets, and drive intelligent digital transformation.
              </p>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
                <Link
                  href="/contact-us"
                  className="bg-[#B42318] hover:bg-[#8E1010] text-white text-base font-semibold px-7 py-3.5 rounded-md transition-all duration-300 shadow-md hover:shadow-lg flex items-center justify-center gap-2 group cursor-pointer"
                >
                  <span>Schedule a Free Consultation</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </Link>

                <Link
                  href="/services"
                  className="border-2 border-[#0F172A] text-[#0F172A] hover:bg-[#0F172A] hover:text-white text-base font-semibold px-7 py-3.5 rounded-md transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Explore Solutions</span>
                  <ChevronRight className="w-4 h-4" />
                </Link>
              </div>

              {/* Trust Badge line */}
              <div className="flex items-center gap-6 pt-4 text-xs font-medium text-slate-500">
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#B42318]" />
                  <span>Certified Enterprise Architects</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#D97706]" />
                  <span>24/7 SLA Guarantee</span>
                </div>
              </div>
            </motion.div>

            {/* Right Column: Visual Showcase & Floating Feature Cards */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="lg:col-span-5 relative"
            >
              <div className="relative mx-auto max-w-[480px] lg:max-w-none">
                {/* Main Hero Card */}
                <div className="relative rounded-2xl overflow-hidden border border-slate-200/90 shadow-2xl bg-white">
                  <div className="relative h-[360px] sm:h-[420px] w-full">
                    <Image
                      src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80"
                      alt="TechAxis Global Enterprise Team Collaborating"
                      fill
                      priority
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A]/85 via-[#0F172A]/25 to-transparent" />
                  </div>

                  {/* Overlay Banner on Image */}
                  <div className="absolute bottom-6 left-6 right-6 text-white">
                    <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-[#B42318]/80 text-white text-[10px] font-bold uppercase tracking-wider mb-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-300"></span>
                      Enterprise SLA Operations
                    </div>
                    <h3 className="text-xl font-bold text-white">Unified IT Management</h3>
                    <p className="text-xs text-slate-200 mt-1 line-clamp-2">
                      Seamless management across SAP, Oracle, Microsoft Dynamics, and cloud infrastructures.
                    </p>
                  </div>
                </div>

                {/* Floating Micro-Card 1: Top Left */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5, duration: 0.5 }}
                  className="hidden sm:flex absolute -top-5 -left-5 bg-white border border-slate-200 shadow-xl rounded-xl p-3.5 items-center gap-3 z-20 backdrop-blur-md"
                >
                  <div className="w-10 h-10 rounded-lg bg-[#D97706]/10 text-[#D97706] flex items-center justify-center flex-shrink-0">
                    <Server className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-[11px] uppercase font-bold text-slate-400">System Availability</p>
                    <p className="text-sm font-extrabold text-[#0F172A] flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                      99.98% High SLA
                    </p>
                  </div>
                </motion.div>

                {/* Floating Micro-Card 2: Bottom Right */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7, duration: 0.5 }}
                  className="hidden sm:flex absolute -bottom-6 -right-6 bg-white border border-slate-200 shadow-xl rounded-xl p-3.5 items-center gap-3 z-20 backdrop-blur-md"
                >
                  <div className="w-10 h-10 rounded-lg bg-[#B42318]/10 text-[#B42318] flex items-center justify-center flex-shrink-0">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-[11px] uppercase font-bold text-slate-400">Security Posture</p>
                    <p className="text-sm font-extrabold text-[#0F172A]">Zero-Trust Compliant</p>
                  </div>
                </motion.div>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* =========================================================
          SECTION 2: FLOATING METRIC STATS STRIP
          ========================================================= */}
      <section className="border-y border-slate-200 bg-white py-10 relative z-20">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-0 divide-y md:divide-y-0 md:divide-x divide-slate-200">
            {heroStats.map((stat, idx) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1, duration: 0.5 }}
                className="text-center px-4 pt-4 md:pt-0"
              >
                <div className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#B42318] tracking-tight">
                  {stat.value}
                </div>
                <div className="text-sm sm:text-base font-bold text-[#0F172A] mt-1.5">
                  {stat.label}
                </div>
                <div className="text-xs text-[#64748B] mt-0.5">
                  {stat.desc}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================
          SECTION 3: VALUE PROPOSITIONS ("Simplifying IT for a complex world")
          ========================================================= */}
      <section className="py-20 lg:py-28 bg-[#F8FAFC]">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="max-w-2xl mb-14">
            <span className="badge-tag mb-3">WHAT WE DO</span>
            <h2 className="text-3xl sm:text-4xl lg:text-[44px] font-bold text-[#0F172A] tracking-tight leading-tight">
              Simplifying IT for a complex world.
            </h2>
            <p className="text-[#64748B] text-base sm:text-lg mt-3 leading-relaxed">
              We bridge complex enterprise technologies with agile execution to deliver measurable business outcomes, predictable costs, and robust governance.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {valueProps.map((item, index) => {
              const IconComp = iconMap[item.icon] || Cpu;

              return (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  className="bg-white rounded-xl p-7 border border-slate-200/80 shadow-[0_4px_16px_rgba(0,0,0,0.02)] hover:shadow-[0_12px_32px_rgba(180,35,24,0.12)] hover:border-[#B42318]/40 transition-all duration-300 group flex flex-col justify-between"
                >
                  <div>
                    <div className="w-12 h-12 rounded-lg bg-[#B42318]/10 text-[#B42318] flex items-center justify-center mb-6 group-hover:bg-[#B42318] group-hover:text-white transition-colors duration-300">
                      <IconComp className="w-6 h-6" />
                    </div>
                    <h3 className="text-lg font-bold text-[#0F172A] mb-2.5 group-hover:text-[#B42318] transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-sm text-[#64748B] leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                  <div className="mt-6 pt-4 border-t border-slate-100 flex items-center gap-1.5 text-xs font-bold text-[#B42318] group-hover:text-[#0F172A] transition-colors">
                    <span>Learn standard</span>
                    <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                  </div>
                </motion.div>
              );
            })}
          </div>

          <div className="mt-12 text-center">
            <Link
              href="/about-us"
              className="inline-flex items-center gap-2 border border-slate-300 hover:border-[#B42318] text-[#0F172A] hover:text-[#B42318] bg-white px-6 py-3 rounded-md font-semibold text-sm transition-all shadow-sm"
            >
              <span>About TechAxis Global</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

        </div>
      </section>

      {/* =========================================================
          SECTION 4: SOLUTIONS SHOWCASE ("HOW WE DO - Solutions")
          ========================================================= */}
      <section id="solutions" className="py-20 lg:py-28 bg-white scroll-mt-20">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6">
            <div className="max-w-2xl">
              <span className="badge-tag mb-3">HOW WE DO</span>
              <h2 className="text-3xl sm:text-4xl lg:text-[44px] font-bold text-[#0F172A] tracking-tight leading-tight">
                Solutions
              </h2>
              <p className="text-[#64748B] text-base sm:text-lg mt-3 leading-relaxed">
                Comprehensive technology services crafted to modernize your core applications, scale automated operations, and protect mission-critical data.
              </p>
            </div>

            <Link
              href="/services"
              className="inline-flex items-center gap-2 bg-[#B42318] hover:bg-[#8E1010] text-white text-sm font-semibold px-6 py-3 rounded-md transition-all shadow-sm flex-shrink-0"
            >
              <span>View All Solutions</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {solutions.map((item, index) => {
              const IconComp = iconMap[item.icon] || Sparkles;

              return (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.08, duration: 0.5 }}
                  className="bg-white rounded-xl p-8 border border-slate-200/90 shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_16px_36px_rgba(180,35,24,0.12)] hover:border-[#B42318]/50 transition-all duration-300 flex flex-col justify-between group"
                >
                  <div>
                    <div className="flex items-center justify-between mb-6">
                      <div className="w-12 h-12 rounded-lg bg-[#B42318]/10 text-[#B42318] flex items-center justify-center group-hover:bg-[#B42318] group-hover:text-white transition-colors duration-300">
                        <IconComp className="w-6 h-6" />
                      </div>
                      <span className="text-[11px] uppercase tracking-wider font-bold text-slate-500 bg-slate-100 px-2.5 py-1 rounded">
                        {item.category}
                      </span>
                    </div>

                    <h3 className="text-xl font-bold text-[#0F172A] mb-3 group-hover:text-[#B42318] transition-colors">
                      {item.title}
                    </h3>

                    <p className="text-sm text-[#64748B] leading-relaxed mb-6">
                      {item.description}
                    </p>

                    {/* Feature tags */}
                    <div className="flex flex-wrap gap-1.5 mb-6">
                      {item.features.map((feat) => (
                        <span
                          key={feat}
                          className="text-[11px] font-semibold text-slate-700 bg-slate-50 border border-slate-200/70 px-2.5 py-1 rounded-md"
                        >
                          {feat}
                        </span>
                      ))}
                    </div>
                  </div>

                  <Link
                    href={`/services#${item.id}`}
                    className="inline-flex items-center gap-1.5 text-sm font-bold text-[#B42318] group-hover:text-[#8E1010] transition-colors pt-4 border-t border-slate-100"
                  >
                    <span>Learn more</span>
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </motion.div>
              );
            })}
          </div>

        </div>
      </section>

      {/* =========================================================
          SECTION 6: TECHNOLOGY PARTNERS & VENDORS ("Bringing the best IT vendors to you")
          ========================================================= */}
      <section className="py-20 lg:py-28 bg-[#F8FAFC]">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="max-w-2xl mb-12">
            <span className="badge-tag mb-3">WHAT WE USE</span>
            <h2 className="text-3xl sm:text-4xl lg:text-[44px] font-bold text-[#0F172A] tracking-tight leading-tight">
              Bringing the best IT vendors to you.
            </h2>
            <p className="text-[#64748B] text-base sm:text-lg mt-3 leading-relaxed">
              Working only with the best, to ensure the quality of our services, and to bring state-of-the-art technology to those who need it.
            </p>
          </div>

          {/* Interactive Vendor Tabs */}
          <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm overflow-hidden">
            {/* Tab Headers */}
            <div className="flex border-b border-slate-200 overflow-x-auto scrollbar-none bg-slate-50/70">
              {vendorEcosystem.map((vendor, idx) => (
                <button
                  key={vendor.category}
                  onClick={() => setActiveVendorTab(idx)}
                  className={`px-6 py-4 text-sm font-bold whitespace-nowrap transition-colors flex items-center gap-2 cursor-pointer border-b-2 ${
                    activeVendorTab === idx
                      ? "border-[#B42318] text-[#B42318] bg-white"
                      : "border-transparent text-slate-500 hover:text-[#0F172A]"
                  }`}
                >
                  <span>{vendor.category}</span>
                  <span className="text-[10px] uppercase px-2 py-0.5 rounded bg-slate-200 text-slate-700">
                    {vendor.badge}
                  </span>
                </button>
              ))}
            </div>

            {/* Tab Body */}
            <div className="p-8 sm:p-12">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                
                <div className="lg:col-span-7 space-y-4">
                  <span className="badge-tag text-[11px]">
                    {vendorEcosystem[activeVendorTab].badge}
                  </span>
                  
                  <h3 className="text-2xl font-bold text-[#0F172A]">
                    {vendorEcosystem[activeVendorTab].lead}
                  </h3>

                  <p className="text-base text-[#64748B] leading-relaxed">
                    {vendorEcosystem[activeVendorTab].description}
                  </p>

                  <div className="pt-2">
                    <Link
                      href="/services"
                      className="inline-flex items-center gap-2 text-sm font-bold text-[#B42318] hover:text-[#0F172A] transition-colors"
                    >
                      <span>Explore technical architecture</span>
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>

                {/* Technologies List */}
                <div className="lg:col-span-5 bg-slate-50 rounded-xl p-6 border border-slate-200/70 space-y-3">
                  <p className="text-xs uppercase font-extrabold tracking-wider text-slate-400 mb-2">
                    Ecosystem Components:
                  </p>
                  {vendorEcosystem[activeVendorTab].technologies.map((tech) => (
                    <div
                      key={tech.name}
                      className="bg-white p-3 rounded-lg border border-slate-200 flex items-center justify-between shadow-xs"
                    >
                      <span className="text-sm font-bold text-[#0F172A]">{tech.name}</span>
                      <span className="text-xs text-[#B42318] font-medium bg-[#B42318]/10 px-2 py-0.5 rounded">
                        {tech.role}
                      </span>
                    </div>
                  ))}
                </div>

              </div>
            </div>
          </div>

        </div>
      </section>

      {/* =========================================================
          SECTION 7: VALUED CUSTOMERS & RECOGNITION ("Recognized by the best")
          ========================================================= */}
      <section className="py-20 bg-white border-b border-slate-200">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="badge-tag mb-3">WHERE WE DO</span>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#0F172A] tracking-tight">
              Recognized by the best
            </h2>
            <p className="text-[#64748B] text-base mt-2">
              We take pride in our strategic partnerships with global technology leaders, empowering clients to achieve transformative results.
            </p>
          </div>

          {/* Partner Badges Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
            {clientPartners.map((partner) => (
              <div
                key={partner.name}
                className="bg-slate-50 hover:bg-white rounded-xl p-6 border border-slate-200 hover:border-[#B42318]/40 hover:shadow-md transition-all text-center flex flex-col items-center justify-center min-h-[100px] group"
              >
                <p className="font-extrabold text-[#0F172A] group-hover:text-[#B42318] transition-colors text-base tracking-tight">
                  {partner.name}
                </p>
                <p className="text-[11px] text-slate-400 font-medium uppercase tracking-wider mt-1">
                  {partner.category}
                </p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* =========================================================
          SECTION 8: CONTACT & CONSULTATION BOOKING ("Partner with Us for Comprehensive IT")
          ========================================================= */}
      <section id="consultation" className="py-20 lg:py-28 bg-[#F8FAFC]">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            
            {/* Left Column: Benefits & 3-Step Process */}
            <div className="lg:col-span-6 space-y-8">
              <div>
                <span className="badge-tag mb-3">CONTACT US</span>
                <h2 className="text-3xl sm:text-4xl lg:text-[44px] font-bold text-[#0F172A] tracking-tight leading-tight">
                  Partner with Us for Comprehensive IT
                </h2>
                <p className="text-[#64748B] text-base sm:text-lg mt-3 leading-relaxed">
                  We’re happy to answer any questions you may have and help you determine which of our services best fit your enterprise needs.
                </p>
              </div>

              {/* Direct Phone Callout */}
              <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs flex items-center gap-4">
                <div className="w-12 h-12 rounded-lg bg-[#B42318] text-white flex items-center justify-center flex-shrink-0 shadow-sm">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs uppercase tracking-wider font-extrabold text-slate-400">Call us directly:</p>
                  <p className="text-lg sm:text-xl font-bold text-[#0F172A]">
                    <a href={`tel:${siteConfig.contact.phone.replace(/[^0-9+]/g, '')}`} className="hover:text-[#B42318] transition-colors">
                      {siteConfig.contact.phone}
                    </a>
                  </p>
                </div>
              </div>

              {/* Your Benefits Checklist */}
              <div>
                <h4 className="text-base font-bold text-[#0F172A] uppercase tracking-wider mb-4 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#B42318]"></span>
                  Your Benefits:
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {consultationBenefits.map((benefit) => (
                    <div key={benefit} className="flex items-center gap-2.5 text-sm font-medium text-slate-700">
                      <CheckCircle2 className="w-4 h-4 text-[#B42318] flex-shrink-0" />
                      <span>{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* What Happens Next - 3 Step Roadmap */}
              <div>
                <h4 className="text-base font-bold text-[#0F172A] uppercase tracking-wider mb-5 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#D97706]"></span>
                  What happens next?
                </h4>
                <div className="space-y-4">
                  {consultationSteps.map((step) => (
                    <div key={step.number} className="flex items-start gap-4 bg-white p-4 rounded-xl border border-slate-200/80">
                      <div className="w-9 h-9 rounded-md bg-[#0F172A] text-[#D97706] font-extrabold text-sm flex items-center justify-center flex-shrink-0">
                        {step.number}
                      </div>
                      <div>
                        <h5 className="text-sm font-bold text-[#0F172A]">{step.title}</h5>
                        <p className="text-xs text-[#64748B] mt-0.5 leading-relaxed">{step.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>

            {/* Right Column: Schedule a Free Consultation Form Card */}
            <div className="lg:col-span-6">
              <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xl p-8 sm:p-10 relative">
                
                <div className="mb-6">
                  <span className="text-[11px] font-extrabold tracking-widest uppercase text-[#B42318]">
                    START YOUR CONVERSATION
                  </span>
                  <h3 className="text-2xl font-bold text-[#0F172A] mt-1">
                    Schedule a Free Consultation
                  </h3>
                  <p className="text-xs sm:text-sm text-[#64748B] mt-1">
                    Fill out the form below and our lead solutions architect will connect within 24 business hours.
                  </p>
                </div>

                {formSubmitted ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-emerald-50 border border-emerald-200 rounded-xl p-8 text-center space-y-4"
                  >
                    <div className="w-16 h-16 bg-emerald-500 text-white rounded-full flex items-center justify-center mx-auto shadow-md">
                      <Check className="w-8 h-8" />
                    </div>
                    <h4 className="text-xl font-bold text-emerald-900">Consultation Request Received!</h4>
                    <p className="text-sm text-emerald-700 leading-relaxed">
                      Thank you, <span className="font-semibold">{formData.firstName || "valued client"}</span>. Our enterprise advisory team has received your inquiry and will contact you at <span className="font-semibold">{formData.email}</span> shortly.
                    </p>
                    <button
                      onClick={() => setFormSubmitted(false)}
                      className="text-xs text-emerald-800 underline font-semibold cursor-pointer pt-2"
                    >
                      Send another inquiry
                    </button>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-[#0F172A] uppercase tracking-wider mb-1.5">
                          First name *
                        </label>
                        <input
                          type="text"
                          required
                          name="firstName"
                          value={formData.firstName}
                          onChange={handleInputChange}
                          placeholder="e.g. John"
                          className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-md focus:bg-white focus:border-[#B42318] focus:outline-none transition-colors"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-[#0F172A] uppercase tracking-wider mb-1.5">
                          Last name *
                        </label>
                        <input
                          type="text"
                          required
                          name="lastName"
                          value={formData.lastName}
                          onChange={handleInputChange}
                          placeholder="e.g. Doe"
                          className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-md focus:bg-white focus:border-[#B42318] focus:outline-none transition-colors"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-[#0F172A] uppercase tracking-wider mb-1.5">
                          Company / Organization *
                        </label>
                        <input
                          type="text"
                          required
                          name="company"
                          value={formData.company}
                          onChange={handleInputChange}
                          placeholder="e.g. Acme Corp"
                          className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-md focus:bg-white focus:border-[#B42318] focus:outline-none transition-colors"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-[#0F172A] uppercase tracking-wider mb-1.5">
                          Company email *
                        </label>
                        <input
                          type="email"
                          required
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          placeholder="john@company.com"
                          className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-md focus:bg-white focus:border-[#B42318] focus:outline-none transition-colors"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-[#0F172A] uppercase tracking-wider mb-1.5">
                          Phone Number *
                        </label>
                        <input
                          type="tel"
                          required
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          placeholder="+1 (555) 000-0000"
                          className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-md focus:bg-white focus:border-[#B42318] focus:outline-none transition-colors"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-[#0F172A] uppercase tracking-wider mb-1.5">
                          How Can We Help You?
                        </label>
                        <select
                          name="service"
                          value={formData.service}
                          onChange={handleInputChange}
                          className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-md focus:bg-white focus:border-[#B42318] focus:outline-none transition-colors"
                        >
                          <option value="Digital Transformation">Digital Transformation</option>
                          <option value="ERP Solutions">ERP Solutions (SAP / Oracle / MS)</option>
                          <option value="Managed Services">24/7 Managed IT Services</option>
                          <option value="Cyber Security">Cyber Security & Compliance</option>
                          <option value="Intelligent Automation">Intelligent Automation & AI</option>
                          <option value="Data Engineering & BI">Data Analytics & Power BI</option>
                          <option value="Automotive / Manufacturing IT">Automotive / Manufacturing IT</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-[#0F172A] uppercase tracking-wider mb-1.5">
                        Project Details / Message
                      </label>
                      <textarea
                        rows={3}
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        placeholder="Tell us about your project requirements, goals, or existing technology landscape..."
                        className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-md focus:bg-white focus:border-[#B42318] focus:outline-none transition-colors resize-none"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-[#B42318] hover:bg-[#8E1010] text-white py-3.5 rounded-md font-semibold text-sm transition-all duration-300 shadow-md flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70 mt-2"
                    >
                      {isSubmitting ? (
                        <span>Submitting Request...</span>
                      ) : (
                        <>
                          <span>Schedule Consultation</span>
                          <Send className="w-4 h-4" />
                        </>
                      )}
                    </button>

                    <p className="text-[11px] text-center text-slate-400 mt-2">
                      🔒 Your corporate information is protected by enterprise confidentiality agreements.
                    </p>
                  </form>
                )}

              </div>
            </div>

          </div>

        </div>
      </section>

    </div>
  );
}
