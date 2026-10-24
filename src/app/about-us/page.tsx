"use client";
import Link from "next/link";
import Image from "next/image";
import { ChevronRight, ArrowUpRight, Rocket, Globe2, BarChart3, Cloud, Award } from "lucide-react";
import LocalNav from "@/components/LocalNav";
import BackgroundMedia from "@/components/BackgroundMedia";
import MediaFrame from "@/components/MediaFrame";
import DataNetwork from "@/components/DataNetwork";
import { clientPartners } from "@/data/content";

const journeyMilestones = [
  {
    year: "2012",
    phase: "Phase 01",
    badge: "Inception",
    title: "TAG Founded",
    desc: "Launched in Virginia with a mission to deliver specialized, agile, data-driven IT solutions and architecture for enterprises.",
    highlight: "Richmond, VA HQ",
    icon: Rocket,
  },
  {
    year: "2015",
    phase: "Phase 02",
    badge: "Global Reach",
    title: "Expansion to India",
    desc: "Established a dedicated global delivery center in India, enabling 24/7 delivery governance and international scale.",
    highlight: "Dual-Continent Model",
    icon: Globe2,
  },
  {
    year: "2018",
    phase: "Phase 03",
    badge: "Enterprise Scale",
    title: "Analytics Modernization",
    desc: "Delivered large-scale analytics modernization and mission-critical BI migrations for Fortune 500 enterprises.",
    highlight: "Fortune 500 Reach",
    icon: BarChart3,
  },
  {
    year: "2021",
    phase: "Phase 04",
    badge: "Cloud Era",
    title: "Cloud Data Solutions",
    desc: "Expanded enterprise offerings to cloud data engineering, modern lakehouses, and Qlik to Power BI migrations.",
    highlight: "Cloud & AI Ecosystems",
    icon: Cloud,
  },
  {
    year: "2024",
    phase: "Phase 05",
    badge: "Today & Beyond",
    title: "Continued Growth",
    desc: "Accelerating AI-ready analytics, hybrid cloud IT services, and E-Verified enterprise staffing partnerships worldwide.",
    highlight: "Enterprise Leadership",
    icon: Award,
    isCurrent: true,
  },
];

export default function AboutUs() {
  return (
    <>
      <LocalNav 
        title="About Us" 
        links={[
          { label: 'Overview', id: 'overview' },
          { label: 'Journey', id: 'journey' },
          { label: 'Values', id: 'values' },
          { label: 'Collaborations', id: 'partnerships' },
        ]} 
      />
      <div id="overview" className="pb-0 scroll-mt-[100px]">
        {/* Hero */}
        <section className="relative pt-[120px] pb-[80px] px-6 text-center">
          <BackgroundMedia slotKey="about-hero" type="video" overlay="white-full" overlayOpacity={0.92} priority parallax />
          <div className="max-w-[980px] mx-auto relative z-10">
            <p className="text-[14px] font-semibold text-apple-text-sec uppercase tracking-widest mb-4">
              About TechAxis Global LLC (TAG)
            </p>
            <h1 className="text-h1 mb-6 text-apple-text">
              Delivering Data, Analytics & IT Consulting Excellence
            </h1>
            <p className="text-h3 text-apple-text-sec font-normal max-w-[800px] mx-auto mb-10">
              For over 12 years, TAG has empowered enterprises with modern analytics, business intelligence, and IT consulting solutions. Our dual presence in the USA & India enables us to deliver global expertise with boutique focus.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <Link href="/contact-us" className="btn-primary shadow-sm">
                Talk to Our Experts
              </Link>
              <Link href="/services" className="btn-link text-lg">
                Explore Our Services <ChevronRight className="w-5 h-5 ml-1" />
              </Link>
            </div>
          </div>
        </section>

        {/* Statement */}
        <section className="bg-apple-surface py-[160px] px-6 text-center">
          <div className="max-w-[800px] mx-auto">
            <p className="text-[32px] md:text-[48px] font-semibold leading-tight text-apple-text tracking-tight">
              TechAxis Global LLC (TAG) is an enterprise IT consulting firm specializing in data analytics, business intelligence, and IT staffing. Our proven delivery governance and agile methodologies ensure successful project outcomes for large organizations.
            </p>
          </div>
        </section>

        {/* Journey */}
        <section id="journey" className="relative py-20 md:py-28 px-4 sm:px-6 lg:px-8 scroll-mt-[100px] overflow-hidden bg-gradient-to-b from-white via-slate-50/60 to-white">
          <DataNetwork className="opacity-25" />
          <div className="max-w-[1280px] mx-auto relative z-10">
            {/* Section Header */}
            <div className="text-center max-w-[800px] mx-auto mb-14 md:mb-16">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#B42318]/8 border border-[#B42318]/20 text-[#B42318] text-[12px] font-bold tracking-wider uppercase mb-4">
                <span className="w-2 h-2 rounded-full bg-[#B42318] animate-pulse"></span>
                12+ Years of Growth & Innovation
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-[#0F172A] tracking-tight">
                Our Journey
              </h2>
              <p className="text-slate-600 text-[16px] sm:text-[18px] mt-4 leading-relaxed">
                From our inception in 2012 to a premier global enterprise technology partner delivering mission-critical analytics and IT solutions.
              </p>
            </div>

            {/* Desktop Milestone Visual Progress Track */}
            <div className="hidden lg:block relative mb-8 px-6">
              <div className="absolute top-4 left-14 right-14 h-[2px] bg-gradient-to-r from-[#B42318]/30 via-slate-300 to-[#B42318] -z-0" />
              <div className="grid grid-cols-5 gap-6">
                {journeyMilestones.map((item, idx) => (
                  <div key={item.year} className="flex flex-col items-center">
                    <div className={`relative z-10 w-8 h-8 rounded-full flex items-center justify-center font-bold text-[12px] transition-transform duration-300 shadow-sm ${
                      item.isCurrent
                        ? "bg-[#B42318] text-white ring-4 ring-[#B42318]/20 scale-110"
                        : "bg-white text-[#B42318] border-2 border-[#B42318]/50"
                    }`}>
                      {item.isCurrent ? (
                        <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
                      ) : (
                        <span>0{idx + 1}</span>
                      )}
                    </div>
                    <span className="mt-2 text-[11px] font-bold tracking-wider uppercase text-slate-400">
                      {item.phase}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Milestone Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-5 items-stretch">
              {journeyMilestones.map((item) => {
                const IconComponent = item.icon;
                return (
                  <div
                    key={item.year}
                    className={`rounded-2xl p-6 sm:p-6.5 bg-white/95 backdrop-blur-md border transition-all duration-300 flex flex-col justify-between group relative overflow-hidden ${
                      item.isCurrent
                        ? "border-[#B42318]/35 shadow-[0_4px_24px_rgba(180,35,24,0.08)] ring-1 ring-[#B42318]/20 hover:shadow-[0_16px_36px_rgba(180,35,24,0.12)] hover:-translate-y-1"
                        : "border-slate-200/90 shadow-[0_2px_12px_rgba(0,0,0,0.03)] hover:border-[#B42318]/30 hover:shadow-[0_12px_30px_rgba(0,0,0,0.06)] hover:-translate-y-1"
                    }`}
                  >
                    {/* Top Accent Gradient Bar */}
                    <div className={`absolute top-0 left-0 right-0 h-1 transition-opacity duration-300 ${
                      item.isCurrent
                        ? "bg-gradient-to-r from-[#B42318] via-[#D97706] to-[#B42318] opacity-100"
                        : "bg-gradient-to-r from-[#B42318] to-[#D97706] opacity-0 group-hover:opacity-100"
                    }`} />

                    <div>
                      {/* Card Header: Year & Icon */}
                      <div className="flex items-center justify-between gap-3 mb-3">
                        <div className="text-3xl sm:text-[34px] font-black tracking-tight text-[#0F172A] group-hover:text-[#B42318] transition-colors">
                          {item.year}
                        </div>
                        <div className={`w-9 h-9 rounded-xl flex items-center justify-center transition-colors ${
                          item.isCurrent 
                            ? "bg-[#B42318]/10 text-[#B42318]" 
                            : "bg-slate-100 text-slate-600 group-hover:bg-[#B42318]/10 group-hover:text-[#B42318]"
                        }`}>
                          <IconComponent className="w-4 h-4" />
                        </div>
                      </div>

                      {/* Phase / Milestone Badge */}
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wider mb-2.5 transition-colors ${
                        item.isCurrent
                          ? "bg-[#B42318]/10 text-[#B42318]"
                          : "bg-slate-100 text-slate-600 group-hover:bg-[#B42318]/8 group-hover:text-[#B42318]"
                      }`}>
                        {item.badge}
                      </span>

                      {/* Title with consistent height */}
                      <h3 className="text-[17px] sm:text-[18px] font-bold text-[#0F172A] tracking-tight leading-snug min-h-[46px] flex items-center group-hover:text-[#B42318] transition-colors">
                        {item.title}
                      </h3>

                      {/* Description */}
                      <p className="text-[13px] sm:text-[13.5px] text-slate-600 leading-relaxed mt-2 font-normal">
                        {item.desc}
                      </p>
                    </div>

                    {/* Card Footer: Metadata Highlight */}
                    <div className="mt-6 pt-3.5 border-t border-slate-100 flex items-center justify-between text-[11px] font-semibold text-slate-500">
                      <span>{item.highlight}</span>
                      {item.isCurrent ? (
                        <span className="text-emerald-600 flex items-center gap-1 font-bold">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                          Active
                        </span>
                      ) : (
                        <span className="text-slate-400 font-medium">Milestone</span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Values */}
        <section id="values" className="relative bg-apple-surface py-[160px] px-6 scroll-mt-[100px]">
          <BackgroundMedia slotKey="about-values" overlay="white-full" overlayOpacity={0.9} />
          <div className="max-w-[1200px] mx-auto relative z-10">
            <div className="text-center max-w-[800px] mx-auto mb-16">
              <h2 className="text-h2 mb-6">
                <span className="text-apple-text block">Boutique Focus.</span>
                <span className="text-apple-text-sec block">Enterprise Results.</span>
              </h2>
              <p className="text-[21px] text-apple-text-sec leading-relaxed">
                We combine the agility of a boutique firm with the delivery rigor of global consultancies. TAG's commitment: integrity, innovation, and measurable business impact.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {['Integrity', 'Innovation', 'Measurable Impact'].map(val => (
                <div key={val} className="card bg-white/60 backdrop-blur-md text-center border border-white/50">
                  <h3 className="text-[24px] font-semibold text-apple-text">{val}</h3>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Collaborations & Federal Credentials */}
        <section id="partnerships" className="relative py-[140px] px-6 bg-[#F5F5F7] border-y border-black/[0.06] scroll-mt-[100px]">
          <div className="max-w-[1200px] mx-auto relative z-10">
            <div className="text-center max-w-[800px] mx-auto mb-16">
              <span className="badge-tag mb-3">COLLABORATIONS & CREDENTIALS</span>
              <h2 className="text-h2 text-apple-text mb-4">
                Global Collaborations & Federal Verification
              </h2>
              <p className="text-[20px] text-apple-text-sec leading-relaxed">
                We team with industry-defining technology innovators and hold official U.S. federal compliance status to deliver mission-critical enterprise solutions.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 items-stretch">
              {clientPartners.map((partner) => {
                if (partner.isEVerify) {
                  return (
                    <div
                      key={partner.name}
                      className="h-full relative rounded-2xl p-6 bg-[#161617] text-white border border-white/10 hover:border-white/25 shadow-lg hover:shadow-2xl transition-all duration-300 flex flex-col justify-between group overflow-hidden"
                    >
                      <div className="absolute top-0 right-0 w-36 h-36 bg-[#B42318]/20 rounded-full blur-2xl pointer-events-none" />
                      <div className="absolute bottom-0 left-0 w-32 h-32 bg-blue-600/15 rounded-full blur-2xl pointer-events-none" />

                      <div className="relative z-10 flex-1 flex flex-col">
                        <div className="flex items-center justify-between gap-2 mb-2">
                          <span className="text-[11px] font-semibold uppercase tracking-wider text-emerald-400 bg-emerald-400/10 px-2.5 py-0.5 rounded-full border border-emerald-400/20">
                            {partner.badge}
                          </span>
                          <span className="text-[10px] text-white/50 font-medium">U.S. DHS</span>
                        </div>

                        <div className="relative w-full h-14 bg-black/40 rounded-xl border border-white/10 p-2 my-2 flex items-center justify-center shadow-inner group-hover:border-white/20 transition-all">
                          <Image
                            src={partner.logo}
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
                      <div className="flex items-center justify-between gap-2 mb-2">
                        <span className="text-[11px] font-semibold uppercase tracking-wider text-[#B42318] bg-[#B42318]/8 px-2.5 py-0.5 rounded-full">
                          {partner.badge || partner.category}
                        </span>
                        <span className="text-[11px] text-[#86868B] font-medium">Enterprise</span>
                      </div>

                      {/* Official Partner Brand Logo Container */}
                      <div className="relative w-full h-14 bg-[#FAFAFA] rounded-xl border border-black/[0.04] p-2 my-2 flex items-center justify-center group-hover:border-black/[0.09] group-hover:bg-[#F5F5F7] transition-all">
                        <Image
                          src={partner.logo}
                          alt={`${partner.name} logo`}
                          width={140}
                          height={40}
                          className="object-contain max-h-7.5 sm:max-h-8 max-w-[130px] w-auto transition-transform duration-300 group-hover:scale-105"
                        />
                      </div>

                      <h3 className="font-bold text-[#1D1D1F] group-hover:text-[#B42318] transition-colors text-[18px] sm:text-[19px] tracking-tight mt-1">
                        {partner.name}
                      </h3>

                      <p className="text-[11px] text-[#86868B] font-semibold uppercase tracking-wider mt-0.5">
                        {partner.category}
                      </p>

                      <p className="text-[12.5px] sm:text-[13px] text-[#515154] mt-2 leading-relaxed">
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

        {/* Quote & CTA */}
        <section className="bg-apple-surface py-[160px] px-6 text-center">
          <div className="max-w-[980px] mx-auto mb-32">
            <div className="flex justify-center gap-1 mb-8">
              {[1,2,3,4,5].map(i => <span key={i} className="text-[24px] text-apple-text">★</span>)}
            </div>
            <blockquote className="text-[32px] md:text-[40px] font-semibold text-apple-text leading-tight tracking-tight mb-8">
              "TAG's expertise in analytics and reporting modernization helped us transform our enterprise BI landscape. Their team delivered with precision and agility."
            </blockquote>
            <div className="text-[17px] font-medium text-apple-text-sec">
              Global IT Director <span className="mx-2">•</span> Fortune 500 Client <span className="mx-2">•</span> Multinational Retailer
            </div>
          </div>

          <div className="max-w-[800px] mx-auto">
            <h2 className="text-h2 mb-4">
              <span className="text-apple-text block">Ready to Modernize Your Analytics or IT Platform?</span>
            </h2>
            <p className="text-[21px] text-apple-text-sec mb-10">
              Connect with TAG for a strategic consultation and discover how we deliver measurable results for enterprise clients.
            </p>
            <Link href="/contact-us" className="btn-primary">
              Talk to Our Experts
            </Link>
          </div>
        </section>
      </div>
    </>
  );
}
