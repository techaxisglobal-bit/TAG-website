"use client";

import Link from "next/link";
import { 
  ChevronRight, 
  ArrowRight, 
  Users, 
  BarChart3, 
  Cloud, 
  Star, 
  Quote, 
  Check, 
  Sparkles, 
  CheckCircle2, 
  Building2 
} from "lucide-react";
import LocalNav from "@/components/LocalNav";
import BackgroundMedia from "@/components/BackgroundMedia";
import MediaFrame from "@/components/MediaFrame";
import { services } from "@/data/content";

export default function Services() {
  const consultingStaffingItems = [
    {
      title: "IT Consulting & Staffing",
      category: "Talent & Advisory",
      desc: "Specialized IT advisory, project delivery, and contract-to-hire staffing across cloud, cybersecurity, and enterprise architecture.",
      icon: Users,
      iconColor: "bg-[#B42318]/10 text-[#B42318]",
      highlights: [
        "Certified enterprise solution architects & lead engineers",
        "Flexible staff augmentation & dedicated project delivery pods",
        "Official U.S. E-Verify & STEM OPT compliant talent"
      ],
      href: "/contact-us?service=IT%20Consulting%20%26%20Staffing",
      cta: "Request Staffing Consultation"
    },
    {
      title: "Enterprise Analytics",
      category: "BI & Modernization",
      desc: "Modern analytics platforms, automated data pipelines, and executive dashboards delivering real-time operational transparency.",
      icon: BarChart3,
      iconColor: "bg-blue-50 text-blue-600",
      highlights: [
        "Power BI, Anaplan & executive dashboard modernization",
        "Automated cloud data warehouses & KPI reporting models",
        "Predictive analytics, data modeling & automated ETL"
      ],
      href: "/contact-us?service=Enterprise%20Analytics",
      cta: "Explore Analytics Services"
    },
    {
      title: "Cloud Data Solutions",
      category: "Cloud Platforms",
      desc: "Resilient multi-cloud data engineering, real-time streaming architectures, and secure migration services built for enterprise scale.",
      icon: Cloud,
      iconColor: "bg-emerald-50 text-emerald-600",
      highlights: [
        "Snowflake, Databricks, AWS & Azure lakehouses",
        "Streaming ingestion & automated dbt pipelines",
        "Zero-downtime migration with 15-min critical SLAs"
      ],
      href: "/contact-us?service=Cloud%20Data%20Solutions",
      cta: "Modernize Cloud Platforms"
    }
  ];

  const clientTestimonials = [
    {
      quote: "TAG's team modernized our enterprise analytics platform, delivering actionable insights for our global operations and eliminating reporting bottlenecks across 14 divisions.",
      author: "Director of Enterprise IT",
      organization: "Global Industrial Manufacturer",
      engagement: "Enterprise Analytics Modernization",
      avatar: "IT",
      avatarColor: "bg-blue-600/10 text-blue-700"
    },
    {
      quote: "Their expertise in Qlik-to-Power BI migration ensured a seamless transition with zero disruption, improving our leadership reporting efficiency by over 40%.",
      author: "VP of Data & Analytics",
      organization: "Fortune 500 Financial Services",
      engagement: "Platform Migration & Governance",
      avatar: "DA",
      avatarColor: "bg-[#B42318]/10 text-[#B42318]"
    },
    {
      quote: "We rely on TAG for specialized IT staffing and ongoing consulting support. Their architects embedded seamlessly within days and delivered mission-critical outcomes.",
      author: "Senior IT Program Manager",
      organization: "Tier-1 Enterprise Retailer",
      engagement: "Specialized Staffing & Cloud Ops",
      avatar: "PM",
      avatarColor: "bg-emerald-600/10 text-emerald-700"
    }
  ];

  return (
    <>
      <LocalNav 
        title="Services" 
        links={[
          { label: 'Overview', id: 'overview' },
          { label: 'What We Offer', id: 'offer' },
          { label: 'Consulting & Staffing', id: 'consulting' },
          { label: 'Clients', id: 'clients' },
        ]} 
      />

      <div id="overview" className="pb-0 scroll-mt-[100px]">
        {/* =========================================================
            HERO SECTION
            ========================================================= */}
        <section className="relative pt-[120px] pb-[80px] px-6 text-center">
          <BackgroundMedia slotKey="services-hero" type="video" overlay="white-full" overlayOpacity={0.92} priority parallax />
          <div className="max-w-[980px] mx-auto relative z-10">
            <p className="text-[14px] font-semibold text-apple-text-sec uppercase tracking-widest mb-4">
              Our Services
            </p>
            <h1 className="text-h1 mb-6 text-apple-text">
              Enterprise IT Consulting & Data Solutions
            </h1>
            <p className="text-h3 text-apple-text-sec font-normal max-w-[800px] mx-auto mb-10">
              TechAxis Global LLC (TAG) delivers world-class IT consulting, analytics, and staffing services to help enterprises modernize reporting, data, and business intelligence platforms.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <Link href="/contact-us" className="btn-primary shadow-sm">
                Talk to Our Experts
              </Link>
              <Link href="/industries" className="btn-link text-lg drop-shadow-sm flex items-center">
                Explore Our Solutions <ChevronRight className="w-5 h-5 ml-1" />
              </Link>
            </div>
          </div>
        </section>

        {/* =========================================================
            WHAT WE OFFER
            ========================================================= */}
        <section id="offer" className="bg-apple-surface py-20 lg:py-28 px-6 scroll-mt-[100px] border-y border-black/[0.06]">
          <div className="max-w-[1200px] mx-auto">
            <div className="text-center mb-14 max-w-[800px] mx-auto">
              <span className="badge-tag mb-3">CORE PORTFOLIO</span>
              <h2 className="text-h2 text-apple-text mb-4">Comprehensive Enterprise IT Services</h2>
              <p className="text-[19px] text-apple-text-sec">
                End-to-end consulting and technical execution across modern cloud platforms, business intelligence, and mission-critical systems.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[...services, { title: "Reporting Modernization", description: "Modernize legacy reporting platforms, improve data accuracy, and enhance reporting efficiency.", href: "/contact-us" }].map((service, i) => (
                <MediaFrame key={service.title} slotKey={`services-tile-${i}`} overlay="white-full" overlayOpacity={0.85} className="bg-white">
                  <div className="relative z-10 flex flex-col justify-between h-full">
                    <div>
                      <h3 className="text-[28px] sm:text-[32px] font-semibold text-apple-text mb-4 leading-tight">{service.title}</h3>
                      <p className="text-[16px] sm:text-[17px] text-apple-text-sec leading-relaxed mb-8">{service.description}</p>
                    </div>
                    <div>
                      <Link href="/contact-us" className="btn-link flex items-center">
                        Learn More <ChevronRight className="w-4 h-4 ml-1" />
                      </Link>
                    </div>
                  </div>
                </MediaFrame>
              ))}
            </div>
          </div>
        </section>

        {/* =========================================================
            SPECIALIZED CONSULTING & STAFFING (Arranged & Elevated)
            ========================================================= */}
        <section id="consulting" className="relative py-20 lg:py-28 px-4 sm:px-6 lg:px-8 scroll-mt-[100px] bg-white">
          <BackgroundMedia slotKey="services-staffing" overlay="white-full" overlayOpacity={0.92} />
          <div className="max-w-[1240px] mx-auto relative z-10">
            
            {/* Header */}
            <div className="text-center max-w-[840px] mx-auto mb-16">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#B42318]/10 text-[#B42318] text-xs font-semibold uppercase tracking-wider mb-4">
                <Sparkles className="w-3.5 h-3.5" />
                Specialized Practice Areas
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-zinc-950 tracking-tight mb-5">
                Specialized Consulting & Staffing
              </h2>
              <p className="text-lg sm:text-[20px] text-zinc-600 leading-relaxed">
                TAG delivers tailored advisory, certified engineering pods, and flexible IT staffing models engineered for high-impact enterprise initiatives.
              </p>
            </div>

            {/* 3 Elevated Practice Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-stretch">
              {consultingStaffingItems.map((item) => {
                const IconComponent = item.icon;
                return (
                  <div
                    key={item.title}
                    className="bg-white rounded-2xl p-7 sm:p-8 border border-black/[0.08] shadow-[0_2px_8px_rgba(0,0,0,0.02)] hover:shadow-[0_16px_36px_rgba(0,0,0,0.08)] hover:border-[#B42318]/30 hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between group"
                  >
                    <div>
                      {/* Top Row: Icon + Category Badge */}
                      <div className="flex items-center justify-between gap-3 mb-6">
                        <div className={`w-12 h-12 rounded-2xl ${item.iconColor} flex items-center justify-center transition-transform duration-300 group-hover:scale-110 shadow-xs`}>
                          <IconComponent className="w-6 h-6 stroke-[2]" />
                        </div>
                        <span className="text-[11.5px] font-semibold uppercase tracking-wider text-zinc-500 bg-zinc-100 px-3 py-1 rounded-full">
                          {item.category}
                        </span>
                      </div>

                      {/* Title & Description */}
                      <h3 className="text-[22px] sm:text-[24px] font-bold text-zinc-950 tracking-tight leading-snug mb-3 group-hover:text-[#B42318] transition-colors">
                        {item.title}
                      </h3>
                      <p className="text-[14.5px] sm:text-[15px] text-zinc-600 leading-relaxed mb-6">
                        {item.desc}
                      </p>

                      {/* Capabilities Checklist */}
                      <div className="space-y-2.5 mb-8">
                        {item.highlights.map((point, idx) => (
                          <div key={idx} className="flex items-start gap-2.5 text-[13px] sm:text-[13.5px] text-zinc-700">
                            <span className="w-4.5 h-4.5 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center flex-shrink-0 mt-0.5 border border-emerald-200/60">
                              <Check className="w-3 h-3 stroke-[2.5]" />
                            </span>
                            <span className="leading-snug">{point}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Bottom Action Row */}
                    <div className="pt-5 border-t border-black/[0.06] flex items-center justify-between">
                      <Link 
                        href={item.href} 
                        className="text-[13.5px] font-semibold text-[#B42318] hover:text-[#8E1010] flex items-center gap-1.5 transition-colors group/link"
                      >
                        <span>{item.cta}</span>
                        <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover/link:translate-x-1" />
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>

          </div>
        </section>

        {/* =========================================================
            WHAT OUR CLIENTS SAY (Arranged & Elevated Testimonials)
            ========================================================= */}
        <section id="clients" className="relative bg-[#F8F9FA] py-20 lg:py-28 px-4 sm:px-6 lg:px-8 scroll-mt-[100px] border-y border-black/[0.06]">
          <BackgroundMedia slotKey="services-clients" overlay="frost" />
          <div className="max-w-[1240px] mx-auto relative z-10">
            
            {/* Header */}
            <div className="text-center max-w-[840px] mx-auto mb-16">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 text-emerald-700 text-xs font-semibold uppercase tracking-wider mb-4 border border-emerald-200/60">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                Proven Enterprise Outcomes
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-zinc-950 tracking-tight mb-5">
                What Our Clients Say
              </h2>
              <p className="text-lg sm:text-[20px] text-zinc-600 leading-relaxed">
                Trusted by enterprise technology leaders and Fortune 500 organizations for delivery excellence, architectural rigor, and SLA precision.
              </p>
            </div>

            {/* 3 Elevated Testimonial Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-stretch">
              {clientTestimonials.map((test, i) => (
                <div 
                  key={i} 
                  className="bg-white rounded-2xl p-7 sm:p-8 border border-black/[0.08] shadow-[0_2px_8px_rgba(0,0,0,0.02)] hover:shadow-[0_16px_36px_rgba(0,0,0,0.06)] hover:border-black/[0.14] hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
                >
                  <div>
                    {/* Rating Stars & Badge */}
                    <div className="flex items-center justify-between gap-2 mb-6">
                      <div className="flex items-center gap-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star key={star} className="w-4 h-4 fill-amber-400 text-amber-400" />
                        ))}
                      </div>
                      <span className="text-[11px] font-semibold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200/50">
                        Verified Client
                      </span>
                    </div>

                    {/* Decorative Quote Icon & Content */}
                    <Quote className="w-8 h-8 text-[#B42318]/20 mb-3" />
                    <blockquote className="text-[17px] sm:text-[18px] font-medium text-zinc-900 leading-relaxed tracking-tight mb-6">
                      &ldquo;{test.quote}&rdquo;
                    </blockquote>
                  </div>

                  {/* Author Attribution with Monogram Avatar */}
                  <div className="pt-5 border-t border-black/[0.06] flex items-center gap-3.5">
                    <div className={`w-10 h-10 rounded-full ${test.avatarColor} font-bold text-xs flex items-center justify-center flex-shrink-0 shadow-xs border border-black/[0.05]`}>
                      {test.avatar}
                    </div>
                    <div className="overflow-hidden">
                      <p className="text-[14px] font-bold text-zinc-950 truncate">
                        {test.author}
                      </p>
                      <p className="text-[12px] text-zinc-500 truncate">
                        {test.organization}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </section>

        {/* =========================================================
            CTA SECTION
            ========================================================= */}
        <section className="py-20 lg:py-28 px-6 text-center">
          <div className="max-w-[800px] mx-auto">
            <h2 className="text-h2 mb-4 text-apple-text">
              Ready to Accelerate Your IT Transformation?
            </h2>
            <p className="text-[20px] text-apple-text-sec mb-10 leading-relaxed">
              Partner with TechAxis Global LLC for enterprise-grade consulting, analytics, and IT solutions. Let&apos;s discuss your project needs.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/contact-us" className="btn-primary shadow-sm">
                Schedule a Consultation
              </Link>
              <Link href="/careers" className="btn-link text-lg flex items-center">
                Explore Open Positions <ChevronRight className="w-5 h-5 ml-1" />
              </Link>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
