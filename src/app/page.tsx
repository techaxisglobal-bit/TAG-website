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
  Send,
  ExternalLink,
  ArrowUpRight
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
    }, 600);
  };

  return (
    <div className="pt-[78px] bg-white text-[#1D1D1F] selection:bg-[#B42318] selection:text-white">
      
      {/* =========================================================
          SECTION 1: HERO SECTION (Apple Standard Typography & Depth)
          ========================================================= */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#F5F5F7]/80 via-white to-white pt-12 pb-16 lg:pt-20 lg:pb-28">
        {/* Subtle ambient light glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[400px] bg-radial from-[#B42318]/8 via-[#D97706]/4 to-transparent blur-3xl pointer-events-none -z-10" />
        
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            
            {/* Left Column: Headlines & Call to Actions */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 250 }}
              className="lg:col-span-7 space-y-7"
            >
              {/* Apple-style Capsule Badge */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/[0.04] border border-black/[0.08] text-[#1D1D1F] text-[12px] font-medium tracking-wide">
                <span className="w-2 h-2 rounded-full bg-[#B42318] animate-pulse"></span>
                <span className="font-semibold text-[#B42318]">Complexity Simplified</span>
                <span className="text-black/20">•</span>
                <span className="text-[#86868B]">Enterprise IT Architecture</span>
              </div>

              {/* Master Display Headline */}
              <h1 className="text-4xl sm:text-5xl lg:text-[62px] font-bold text-[#1D1D1F] leading-[1.06] tracking-[-0.03em]">
                We manage your IT,<br />
                <span className="text-[#B42318]">so you can manage</span><br />
                your business.
              </h1>

              {/* Refined Subhead */}
              <p className="text-lg sm:text-xl text-[#86868B] max-w-xl font-normal leading-relaxed tracking-tight">
                Take charge of your business continuity with innovative IT solutions. We optimize enterprise workflows, safeguard mission-critical data, and engineer scalable digital transformations.
              </p>

              {/* Apple Action Pills */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 pt-2">
                <Link
                  href="/contact-us"
                  className="bg-[#B42318] hover:bg-[#8E1010] text-white text-[15px] font-semibold px-7 py-3.5 rounded-full transition-all duration-200 shadow-xs hover:shadow-md flex items-center justify-center gap-2 group cursor-pointer active:scale-95"
                >
                  <span>Schedule a Free Consultation</span>
                  <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
                </Link>

                <Link
                  href="/services"
                  className="border border-black/[0.12] bg-white/70 hover:bg-black/[0.04] text-[#1D1D1F] text-[15px] font-medium px-6 py-3.5 rounded-full transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer active:scale-95 backdrop-blur-sm"
                >
                  <span>Explore Solutions</span>
                  <ChevronRight className="w-4 h-4 text-[#86868B]" />
                </Link>
              </div>

              {/* Trust Badge line */}
              <div className="flex flex-wrap items-center gap-6 pt-3 text-[13px] font-medium text-[#86868B]">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#B42318]" />
                  <span>Certified Enterprise Architects</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#D97706]" />
                  <span>24/7 SLA Guarantee</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span className="font-semibold text-[#1D1D1F]">An E-Verified US Firm</span>
                </div>
              </div>
            </motion.div>

            {/* Right Column: Apple-grade Hardware & Operations Bento Tile */}
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ type: "spring", damping: 25, stiffness: 200, delay: 0.15 }}
              className="lg:col-span-5 relative"
            >
              <div className="relative mx-auto max-w-[480px] lg:max-w-none">
                {/* Main Showcase Bento Card */}
                <div className="relative rounded-[28px] overflow-hidden border border-black/[0.08] shadow-[0_20px_50px_rgba(0,0,0,0.08)] bg-white group">
                  <div className="relative h-[380px] sm:h-[440px] w-full">
                    <Image
                      src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80"
                      alt="TechAxis Global Enterprise Team Collaborating"
                      fill
                      priority
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#161617]/95 via-[#161617]/30 to-transparent" />
                  </div>

                  {/* Overlay Banner on Image */}
                  <div className="absolute bottom-6 left-6 right-6 text-white">
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-white text-[11px] font-semibold uppercase tracking-wider mb-2.5 border border-white/20">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                      Enterprise Operations
                    </div>
                    <h3 className="text-2xl font-bold text-white tracking-tight">Unified IT Management</h3>
                    <p className="text-[13px] text-white/80 mt-1 line-clamp-2 leading-relaxed">
                      Continuous monitoring, cloud governance, and multi-tier SLAs across SAP, Oracle, and Microsoft platforms.
                    </p>
                  </div>
                </div>

                {/* Floating Micro-Card 1: Top Left Liquid Glass Badge */}
                <motion.div
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ type: "spring", damping: 25, stiffness: 250, delay: 0.3 }}
                  className="hidden sm:flex absolute -top-4 -left-4 bg-white border border-slate-200/90 shadow-[0_12px_32px_rgba(0,0,0,0.08)] rounded-2xl p-3.5 items-center gap-3 z-20"
                >
                  <div className="w-10 h-10 rounded-xl bg-[#D97706]/10 text-[#D97706] flex items-center justify-center flex-shrink-0">
                    <Server className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-[10px] uppercase font-bold tracking-wider text-[#86868B]">System Availability</p>
                    <p className="text-[14px] font-bold text-[#1D1D1F] flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                      99.98% High SLA
                    </p>
                  </div>
                </motion.div>

                {/* Floating Micro-Card 2: Bottom Right Liquid Glass Badge */}
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ type: "spring", damping: 25, stiffness: 250, delay: 0.4 }}
                  className="hidden sm:flex absolute -bottom-5 -right-5 bg-white border border-slate-200/90 shadow-[0_12px_32px_rgba(0,0,0,0.08)] rounded-2xl p-3.5 items-center gap-3 z-20"
                >
                  <div className="w-10 h-10 rounded-xl bg-[#B42318]/10 text-[#B42318] flex items-center justify-center flex-shrink-0">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-[10px] uppercase font-bold tracking-wider text-[#86868B]">Security Posture</p>
                    <p className="text-[14px] font-bold text-[#1D1D1F]">Zero-Trust Compliant</p>
                  </div>
                </motion.div>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* =========================================================
          SECTION 2: APPLE METRIC STATS STRIP
          ========================================================= */}
      <section className="border-y border-black/[0.06] bg-[#F5F5F7]/50 py-12 relative z-20">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-0 divide-y md:divide-y-0 md:divide-x divide-black/[0.06]">
            {heroStats.map((stat, idx) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ type: "spring", damping: 25, stiffness: 250, delay: idx * 0.08 }}
                className="text-center px-6 pt-4 md:pt-0"
              >
                <div className="text-3xl sm:text-4xl lg:text-[46px] font-bold text-[#1D1D1F] tracking-[-0.03em] leading-tight">
                  <span className="text-[#B42318]">{stat.value}</span>
                </div>
                <div className="text-[15px] font-semibold text-[#1D1D1F] mt-1 tracking-tight">
                  {stat.label}
                </div>
                <div className="text-[12px] text-[#86868B] mt-0.5">
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
      <section className="py-24 lg:py-32 bg-white">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="max-w-2xl mb-16">
            <span className="badge-tag mb-3.5">WHAT WE DO</span>
            <h2 className="text-3xl sm:text-4xl lg:text-[44px] font-bold text-[#1D1D1F] tracking-[-0.025em] leading-tight">
              Simplifying IT for a complex world.
            </h2>
            <p className="text-[#86868B] text-base sm:text-lg mt-3 leading-relaxed tracking-tight">
              We bridge complex enterprise technologies with agile execution to deliver measurable business outcomes, predictable costs, and robust governance.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {valueProps.map((item, index) => {
              const IconComp = iconMap[item.icon] || Cpu;

              return (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ type: "spring", damping: 25, stiffness: 250, delay: index * 0.08 }}
                  className="apple-card p-8 group flex flex-col justify-between"
                >
                  <div>
                    <div className="w-12 h-12 rounded-2xl bg-black/[0.04] text-[#B42318] flex items-center justify-center mb-6 group-hover:bg-[#B42318] group-hover:text-white transition-colors duration-200">
                      <IconComp className="w-6 h-6" />
                    </div>
                    <h3 className="text-lg font-bold text-[#1D1D1F] mb-2.5 group-hover:text-[#B42318] transition-colors tracking-tight">
                      {item.title}
                    </h3>
                    <p className="text-[14px] text-[#86868B] leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                  <div className="mt-6 pt-4 border-t border-black/[0.04] flex items-center gap-1.5 text-xs font-semibold text-[#0066CC] group-hover:text-[#B42318] transition-colors">
                    <span>Learn standard</span>
                    <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-1" />
                  </div>
                </motion.div>
              );
            })}
          </div>

          <div className="mt-14 text-center">
            <Link
              href="/about-us"
              className="inline-flex items-center gap-2 border border-black/[0.12] hover:border-[#B42318] text-[#1D1D1F] hover:text-[#B42318] bg-white px-7 py-3 rounded-full font-medium text-sm transition-all shadow-2xs active:scale-95"
            >
              <span>About TechAxis Global</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

        </div>
      </section>

      {/* =========================================================
          SECTION 4: SOLUTIONS SHOWCASE (Apple Bento Architecture)
          ========================================================= */}
      <section id="solutions" className="py-24 lg:py-32 bg-[#F5F5F7] scroll-mt-20">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div className="max-w-2xl">
              <span className="badge-tag mb-3.5">HOW WE DO</span>
              <h2 className="text-3xl sm:text-4xl lg:text-[44px] font-bold text-[#1D1D1F] tracking-[-0.025em] leading-tight">
                Enterprise Solutions
              </h2>
              <p className="text-[#86868B] text-base sm:text-lg mt-3 leading-relaxed tracking-tight">
                Comprehensive technology services crafted to modernize core platforms, scale automated operations, and safeguard high-value data.
              </p>
            </div>

            <Link
              href="/services"
              className="inline-flex items-center gap-2 bg-[#B42318] hover:bg-[#8E1010] text-white text-sm font-semibold px-6 py-3 rounded-full transition-all shadow-xs flex-shrink-0 active:scale-95"
            >
              <span>View All Solutions</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
            {solutions.map((item, index) => {
              const IconComp = iconMap[item.icon] || Sparkles;

              return (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ type: "spring", damping: 25, stiffness: 250, delay: index * 0.06 }}
                  className="bg-white rounded-[24px] p-8 sm:p-9 border border-black/[0.06] shadow-[0_4px_20px_rgba(0,0,0,0.02)] hover:shadow-[0_16px_36px_rgba(0,0,0,0.07)] hover:border-black/[0.12] transition-all duration-300 flex flex-col justify-between group"
                >
                  <div>
                    <div className="flex items-center justify-between mb-6">
                      <div className="w-12 h-12 rounded-2xl bg-[#B42318]/10 text-[#B42318] flex items-center justify-center group-hover:bg-[#B42318] group-hover:text-white transition-colors duration-200">
                        <IconComp className="w-6 h-6" />
                      </div>
                      <span className="text-[11px] uppercase tracking-wider font-bold text-[#86868B] bg-[#F5F5F7] px-3 py-1 rounded-full">
                        {item.category}
                      </span>
                    </div>

                    <h3 className="text-xl font-bold text-[#1D1D1F] mb-3 group-hover:text-[#B42318] transition-colors tracking-tight">
                      {item.title}
                    </h3>

                    <p className="text-[14px] text-[#86868B] leading-relaxed mb-6">
                      {item.description}
                    </p>

                    {/* Feature tags */}
                    <div className="flex flex-wrap gap-1.5 mb-6">
                      {item.features.map((feat) => (
                        <span
                          key={feat}
                          className="text-[11px] font-medium text-[#1D1D1F] bg-[#F5F5F7] border border-black/[0.04] px-2.5 py-1 rounded-full"
                        >
                          {feat}
                        </span>
                      ))}
                    </div>
                  </div>

                  <Link
                    href={`/services#${item.id}`}
                    className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#0066CC] hover:text-[#B42318] transition-colors pt-4 border-t border-black/[0.04]"
                  >
                    <span>Explore details</span>
                    <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-1" />
                  </Link>
                </motion.div>
              );
            })}
          </div>

        </div>
      </section>

      {/* =========================================================
          SECTION 5: TECHNOLOGY ECOSYSTEM (Apple Segmented Control Tabs)
          ========================================================= */}
      <section className="py-24 lg:py-32 bg-white">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="max-w-2xl mb-14">
            <span className="badge-tag mb-3.5">WHAT WE USE</span>
            <h2 className="text-3xl sm:text-4xl lg:text-[44px] font-bold text-[#1D1D1F] tracking-[-0.025em] leading-tight">
              Bringing the best IT vendors to you.
            </h2>
            <p className="text-[#86868B] text-base sm:text-lg mt-3 leading-relaxed tracking-tight">
              Working only with industry benchmarks to guarantee enterprise performance, platform resilience, and modern cloud scalability.
            </p>
          </div>

          {/* Apple Segmented Tab Frame */}
          <div className="bg-[#F5F5F7] rounded-[28px] border border-black/[0.06] p-2.5 sm:p-4 shadow-sm">
            {/* Sliding Pill Header */}
            <div className="flex gap-1 overflow-x-auto scrollbar-none p-1.5 bg-black/[0.04] rounded-2xl mb-6">
              {vendorEcosystem.map((vendor, idx) => {
                const isActive = activeVendorTab === idx;
                return (
                  <button
                    key={vendor.category}
                    onClick={() => setActiveVendorTab(idx)}
                    className={`relative px-5 py-3 text-[13px] font-semibold whitespace-nowrap transition-colors flex items-center gap-2 cursor-pointer rounded-xl select-none active:scale-95 ${
                      isActive ? "text-[#1D1D1F]" : "text-[#86868B] hover:text-[#1D1D1F]"
                    }`}
                  >
                    <span>{vendor.category}</span>
                    <span className="text-[10px] uppercase px-2 py-0.5 rounded-full bg-black/[0.06] text-[#86868B]">
                      {vendor.badge}
                    </span>
                    {isActive && (
                      <motion.div
                        layoutId="activeVendorPill"
                        className="absolute inset-0 bg-white rounded-xl shadow-xs -z-10"
                        transition={{ type: "spring", damping: 25, stiffness: 350 }}
                      />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Tab Body */}
            <div className="bg-white rounded-[22px] p-8 sm:p-12 border border-black/[0.04]">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                
                <div className="lg:col-span-7 space-y-4">
                  <span className="badge-tag text-[11px]">
                    {vendorEcosystem[activeVendorTab].badge}
                  </span>
                  
                  <h3 className="text-2xl font-bold text-[#1D1D1F] tracking-tight">
                    {vendorEcosystem[activeVendorTab].lead}
                  </h3>

                  <p className="text-[15px] text-[#86868B] leading-relaxed">
                    {vendorEcosystem[activeVendorTab].description}
                  </p>

                  <div className="pt-2">
                    <Link
                      href="/services"
                      className="inline-flex items-center gap-2 text-sm font-semibold text-[#0066CC] hover:text-[#B42318] transition-colors"
                    >
                      <span>Explore technical architecture</span>
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>

                {/* Technologies List */}
                <div className="lg:col-span-5 bg-[#F5F5F7] rounded-2xl p-6 border border-black/[0.04] space-y-3">
                  <p className="text-[11px] uppercase font-bold tracking-wider text-[#86868B] mb-2">
                    Ecosystem Components:
                  </p>
                  {vendorEcosystem[activeVendorTab].technologies.map((tech) => (
                    <div
                      key={tech.name}
                      className="bg-white p-3.5 rounded-xl border border-black/[0.04] flex items-center justify-between shadow-2xs"
                    >
                      <span className="text-[14px] font-semibold text-[#1D1D1F]">{tech.name}</span>
                      <span className="text-[11px] text-[#B42318] font-medium bg-[#B42318]/10 px-2.5 py-0.5 rounded-full">
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
          SECTION 6: CLIENT RECOGNITION & COLLABORATIONS (Apple HIG Grid)
          ========================================================= */}
      <section id="partnerships" className="py-24 bg-[#F5F5F7] border-y border-black/[0.06] scroll-mt-20">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="badge-tag mb-3">COLLABORATIONS & CREDENTIALS</span>
            <h2 className="text-3xl sm:text-4xl lg:text-[40px] font-bold text-[#1D1D1F] tracking-tight">
              Collaborations & Federal Verification
            </h2>
            <p className="text-[#86868B] text-base sm:text-lg mt-3 leading-relaxed">
              Strategic enterprise collaborations with premier global technology leaders alongside official U.S. federal compliance certifications powering mission-critical operations.
            </p>
          </div>

          {/* 8 Collaboration Cards in a Symmetrical 4x2 Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 items-stretch">
            {clientPartners.map((partner) => {
              if (partner.isEVerify) {
                return (
                  <div
                    key={partner.name}
                    className="h-full relative rounded-2xl p-6 bg-[#161617] text-white border border-white/10 hover:border-white/25 shadow-lg hover:shadow-2xl transition-all duration-300 flex flex-col justify-between group overflow-hidden"
                  >
                    {/* Subtle federal red & blue ambient glow */}
                    <div className="absolute top-0 right-0 w-36 h-36 bg-[#B42318]/20 rounded-full blur-2xl pointer-events-none" />
                    <div className="absolute bottom-0 left-0 w-32 h-32 bg-blue-600/15 rounded-full blur-2xl pointer-events-none" />
                    
                    <div className="relative z-10 flex-1 flex flex-col">
                      <div className="flex items-center justify-between gap-2 mb-3">
                        <span className="text-[11px] font-semibold uppercase tracking-wider text-emerald-400 bg-emerald-400/10 px-2.5 py-0.5 rounded-full border border-emerald-400/20">
                          {partner.badge}
                        </span>
                        <span className="text-[10px] text-white/50 font-medium tracking-wide">U.S. DHS</span>
                      </div>

                      {/* Official E-Verify Emblem Container */}
                      <div className="relative w-full h-12 bg-black/40 rounded-xl border border-white/10 p-1.5 my-2 flex items-center justify-center shadow-inner">
                        <Image
                          src="/e-verify.png"
                          alt="Official E-Verify Federal Employment Verification Program"
                          width={140}
                          height={45}
                          className="object-contain max-h-9 w-auto"
                        />
                      </div>

                      <h3 className="font-bold text-white text-[18px] tracking-tight mt-1 group-hover:text-emerald-300 transition-colors">
                        {partner.name}
                      </h3>
                      <p className="text-[11px] text-white/50 font-semibold uppercase tracking-wider mt-0.5">
                        {partner.category}
                      </p>
                      <p className="text-[12.5px] text-white/70 font-normal mt-2 leading-relaxed">
                        {partner.role}
                      </p>
                    </div>

                    <div className="relative z-10 mt-auto pt-4 border-t border-white/10 flex items-center justify-between text-[11px] text-white/60">
                      <span>Federal Compliance</span>
                      <span className="text-emerald-400 font-semibold flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                        Verified US Firm
                      </span>
                    </div>
                  </div>
                );
              }

              return (
                <div
                  key={partner.name}
                  className="h-full bg-white hover:bg-white rounded-2xl p-6 border border-black/[0.08] hover:border-black/[0.16] hover:shadow-lg transition-all duration-300 flex flex-col justify-between group cursor-default"
                >
                  <div className="flex-1 flex flex-col">
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <span className="text-[11px] font-semibold uppercase tracking-wider text-[#B42318] bg-[#B42318]/8 px-2.5 py-0.5 rounded-full">
                        {partner.badge || partner.category}
                      </span>
                      <span className="text-[11px] text-[#86868B] font-medium">Enterprise</span>
                    </div>

                    <h3 className="font-bold text-[#1D1D1F] group-hover:text-[#B42318] transition-colors text-[20px] tracking-tight">
                      {partner.name}
                    </h3>

                    <p className="text-[11px] text-[#86868B] font-semibold uppercase tracking-wider mt-1">
                      {partner.category}
                    </p>

                    <p className="text-[13px] text-[#515154] mt-2 leading-relaxed">
                      {partner.role}
                    </p>
                  </div>

                  <div className="mt-auto pt-4 border-t border-black/[0.06] flex items-center justify-between text-[12px] text-[#86868B]">
                    <span>Collaboration</span>
                    <span className="text-[#1D1D1F] font-medium flex items-center gap-1 group-hover:text-[#B42318] transition-colors">
                      Active Alliance
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* =========================================================
          SECTION 7: CONSULTATION & CONTACT (Apple Form Aesthetics)
          ========================================================= */}
      <section id="consultation" className="py-24 lg:py-32 bg-white scroll-mt-20">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            
            {/* Left Column: Benefits & 3-Step Process */}
            <div className="lg:col-span-6 space-y-8">
              <div>
                <span className="badge-tag mb-3.5">CONTACT US</span>
                <h2 className="text-3xl sm:text-4xl lg:text-[44px] font-bold text-[#1D1D1F] tracking-[-0.025em] leading-tight">
                  Partner with Us for Comprehensive IT
                </h2>
                <p className="text-[#86868B] text-base sm:text-lg mt-3 leading-relaxed tracking-tight">
                  Connect with our principal architects to review your technical infrastructure, streamline operational complexity, and design high-impact solutions.
                </p>
              </div>

              {/* Direct Phone Callout */}
              <div className="apple-card p-6 flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-[#B42318] text-white flex items-center justify-center flex-shrink-0 shadow-xs">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-[11px] uppercase tracking-wider font-bold text-[#86868B]">Call us directly:</p>
                  <p className="text-lg sm:text-xl font-bold text-[#1D1D1F]">
                    <a href={`tel:${siteConfig.contact.phone.replace(/[^0-9+]/g, '')}`} className="hover:text-[#B42318] transition-colors">
                      {siteConfig.contact.phone}
                    </a>
                  </p>
                </div>
              </div>

              {/* Your Benefits Checklist */}
              <div>
                <h4 className="text-[13px] font-bold text-[#1D1D1F] uppercase tracking-wider mb-4 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#B42318]"></span>
                  Your Benefits:
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {consultationBenefits.map((benefit) => (
                    <div key={benefit} className="flex items-center gap-2.5 text-[14px] font-medium text-[#1D1D1F]">
                      <CheckCircle2 className="w-4 h-4 text-[#B42318] flex-shrink-0" />
                      <span>{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* What Happens Next - 3 Step Roadmap */}
              <div>
                <h4 className="text-[13px] font-bold text-[#1D1D1F] uppercase tracking-wider mb-5 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#D97706]"></span>
                  What happens next?
                </h4>
                <div className="space-y-3.5">
                  {consultationSteps.map((step) => (
                    <div key={step.number} className="flex items-start gap-4 bg-[#F5F5F7] p-4.5 rounded-2xl border border-black/[0.04]">
                      <div className="w-8 h-8 rounded-full bg-[#1D1D1F] text-[#D97706] font-bold text-xs flex items-center justify-center flex-shrink-0">
                        {step.number}
                      </div>
                      <div>
                        <h5 className="text-[14px] font-bold text-[#1D1D1F]">{step.title}</h5>
                        <p className="text-[12px] text-[#86868B] mt-0.5 leading-relaxed">{step.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>

            {/* Right Column: Apple-style Consultation Form */}
            <div className="lg:col-span-6">
              <div className="bg-[#F5F5F7] rounded-[32px] border border-black/[0.06] p-8 sm:p-10 shadow-sm relative">
                
                <div className="mb-6">
                  <span className="text-[11px] font-bold tracking-wider uppercase text-[#B42318]">
                    START YOUR CONVERSATION
                  </span>
                  <h3 className="text-2xl font-bold text-[#1D1D1F] mt-1 tracking-tight">
                    Schedule a Free Consultation
                  </h3>
                  <p className="text-[13px] text-[#86868B] mt-1">
                    Fill out the form below and our lead solutions architect will connect within 24 business hours.
                  </p>
                </div>

                {formSubmitted ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-emerald-50 border border-emerald-200 rounded-2xl p-8 text-center space-y-4"
                  >
                    <div className="w-14 h-14 bg-emerald-500 text-white rounded-full flex items-center justify-center mx-auto shadow-xs">
                      <Check className="w-7 h-7" />
                    </div>
                    <h4 className="text-xl font-bold text-emerald-950">Consultation Request Received!</h4>
                    <p className="text-sm text-emerald-800 leading-relaxed">
                      Thank you, <span className="font-semibold">{formData.firstName || "valued client"}</span>. Our enterprise advisory team has received your inquiry and will contact you at <span className="font-semibold">{formData.email}</span> shortly.
                    </p>
                    <button
                      onClick={() => setFormSubmitted(false)}
                      className="text-xs text-emerald-900 underline font-semibold cursor-pointer pt-2"
                    >
                      Send another inquiry
                    </button>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-[#1D1D1F] mb-1.5">
                          First name *
                        </label>
                        <input
                          type="text"
                          required
                          name="firstName"
                          value={formData.firstName}
                          onChange={handleInputChange}
                          placeholder="e.g. John"
                          className="w-full px-4 py-3 text-[14px] bg-white border border-black/[0.08] rounded-xl focus:border-[#B42318] focus:ring-2 focus:ring-[#B42318]/10 focus:outline-none transition-all"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-[#1D1D1F] mb-1.5">
                          Last name *
                        </label>
                        <input
                          type="text"
                          required
                          name="lastName"
                          value={formData.lastName}
                          onChange={handleInputChange}
                          placeholder="e.g. Doe"
                          className="w-full px-4 py-3 text-[14px] bg-white border border-black/[0.08] rounded-xl focus:border-[#B42318] focus:ring-2 focus:ring-[#B42318]/10 focus:outline-none transition-all"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-[#1D1D1F] mb-1.5">
                          Company / Organization *
                        </label>
                        <input
                          type="text"
                          required
                          name="company"
                          value={formData.company}
                          onChange={handleInputChange}
                          placeholder="e.g. Acme Corp"
                          className="w-full px-4 py-3 text-[14px] bg-white border border-black/[0.08] rounded-xl focus:border-[#B42318] focus:ring-2 focus:ring-[#B42318]/10 focus:outline-none transition-all"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-[#1D1D1F] mb-1.5">
                          Company email *
                        </label>
                        <input
                          type="email"
                          required
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          placeholder="john@company.com"
                          className="w-full px-4 py-3 text-[14px] bg-white border border-black/[0.08] rounded-xl focus:border-[#B42318] focus:ring-2 focus:ring-[#B42318]/10 focus:outline-none transition-all"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-[#1D1D1F] mb-1.5">
                          Phone Number *
                        </label>
                        <input
                          type="tel"
                          required
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          placeholder="+1 (555) 000-0000"
                          className="w-full px-4 py-3 text-[14px] bg-white border border-black/[0.08] rounded-xl focus:border-[#B42318] focus:ring-2 focus:ring-[#B42318]/10 focus:outline-none transition-all"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-[#1D1D1F] mb-1.5">
                          Area of Interest
                        </label>
                        <select
                          name="service"
                          value={formData.service}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 text-[14px] bg-white border border-black/[0.08] rounded-xl focus:border-[#B42318] focus:ring-2 focus:ring-[#B42318]/10 focus:outline-none transition-all text-[#1D1D1F]"
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
                      <label className="block text-xs font-semibold text-[#1D1D1F] mb-1.5">
                        Project Details / Message
                      </label>
                      <textarea
                        rows={3}
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        placeholder="Tell us about your project requirements, goals, or existing technology landscape..."
                        className="w-full px-4 py-3 text-[14px] bg-white border border-black/[0.08] rounded-xl focus:border-[#B42318] focus:ring-2 focus:ring-[#B42318]/10 focus:outline-none transition-all resize-none"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-[#B42318] hover:bg-[#8E1010] text-white py-3.5 rounded-full font-semibold text-[14px] transition-all duration-200 shadow-xs flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70 mt-2 active:scale-98"
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

                    <p className="text-[11px] text-center text-[#86868B] mt-2">
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
