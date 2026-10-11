"use client";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import LocalNav from "@/components/LocalNav";
import BackgroundMedia from "@/components/BackgroundMedia";
import MediaFrame from "@/components/MediaFrame";
import { services } from "@/data/content";

export default function Services() {
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
        {/* Hero */}
        <section className="relative pt-[120px] pb-[80px] px-6 text-center">
          <BackgroundMedia slotKey="services-hero" type="video" overlay="white-bottom" priority parallax />
          <div className="max-w-[980px] mx-auto relative z-10">
            <p className="text-[14px] font-semibold text-apple-text-sec uppercase tracking-widest mb-4">
              Our Services
            </p>
            <h1 className="text-h1 mb-6 text-apple-text">
              Enterprise IT Consulting & Data Solutions
            </h1>
            <p className="text-h3 text-apple-text-sec font-normal max-w-[800px] mx-auto mb-10 bg-white/40 p-2 rounded-2xl backdrop-blur-[2px]">
              TechAxis Global LLC (TAG) delivers world-class IT consulting, analytics, and staffing services to help enterprises modernize reporting, data, and business intelligence platforms.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <Link href="/contact-us" className="btn-primary shadow-sm">
                Talk to Our Experts
              </Link>
              <Link href="/industries" className="btn-link text-lg drop-shadow-sm">
                Explore Our Solutions <ChevronRight className="w-5 h-5 ml-1" />
              </Link>
            </div>
          </div>
        </section>

        {/* What We Offer */}
        <section id="offer" className="bg-apple-surface py-[160px] px-6 scroll-mt-[100px]">
          <div className="max-w-[1200px] mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-h2 text-apple-text">Comprehensive Enterprise IT Services</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[...services, { title: "Reporting Modernization", description: "Modernize legacy reporting platforms, improve data accuracy, and enhance reporting efficiency.", href: "/contact-us" }].map((service, i) => (
                <MediaFrame key={service.title} slotKey={`services-tile-${i}`} overlay="white-full" overlayOpacity={0.85} className="bg-white">
                  <div className="relative z-10 flex flex-col justify-between h-full">
                    <div>
                      <h3 className="text-[32px] font-semibold text-apple-text mb-4 leading-tight">{service.title}</h3>
                      <p className="text-[17px] text-apple-text-sec leading-relaxed mb-8">{service.description}</p>
                    </div>
                    <div>
                      <Link href="/contact-us" className="btn-link">
                        Learn More <ChevronRight className="w-4 h-4 ml-1" />
                      </Link>
                    </div>
                  </div>
                </MediaFrame>
              ))}
            </div>
          </div>
        </section>

        {/* Consulting */}
        <section id="consulting" className="relative py-[160px] px-6 scroll-mt-[100px]">
          <BackgroundMedia slotKey="services-staffing" overlay="white-full" overlayOpacity={0.9} />
          <div className="max-w-[1200px] mx-auto relative z-10">
            <div className="text-center max-w-[800px] mx-auto mb-16">
              <h2 className="text-h2 text-apple-text mb-6">Specialized Consulting & Staffing</h2>
              <p className="text-[21px] text-apple-text-sec leading-relaxed">
                TAG offers tailored consulting and IT staffing solutions for enterprise projects, ensuring the right expertise and ongoing support.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { title: "IT Consulting & Staffing", desc: "Specialized IT consulting and staffing services for enterprise projects and ongoing support." },
                { title: "Enterprise Analytics", desc: "Modern analytics and reporting for business growth and operational efficiency." },
                { title: "Cloud Data Solutions", desc: "Cloud-based data platforms and engineering for scalable, future-ready enterprises." },
              ].map(item => (
                <div key={item.title} className="card bg-apple-surface/80 backdrop-blur-md">
                  <h3 className="text-[24px] font-semibold text-apple-text mb-3">{item.title}</h3>
                  <p className="text-[17px] text-apple-text-sec leading-relaxed mb-6">{item.desc}</p>
                  <Link href="/contact-us" className="btn-link">
                    Contact Us <ChevronRight className="w-4 h-4 ml-1" />
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Clients */}
        <section id="clients" className="relative bg-apple-surface py-[160px] px-6 scroll-mt-[100px]">
          <BackgroundMedia slotKey="services-clients" overlay="frost" />
          <div className="max-w-[1200px] mx-auto relative z-10">
            <div className="text-center max-w-[800px] mx-auto mb-16">
              <h2 className="text-h2 text-apple-text mb-6">What Our Clients Say</h2>
              <p className="text-[21px] text-apple-text-sec leading-relaxed">
                Trusted by enterprises for delivery excellence and deep technical expertise.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { q: "TAG's team modernized our analytics platform, delivering actionable insights for our global operations.", a: "Director of IT, Global Manufacturer" },
                { q: "Their expertise in Power BI migration ensured a seamless transition and improved reporting efficiency.", a: "VP, Data & Analytics, Fortune 500 Client" },
                { q: "We rely on TAG for specialized IT staffing and ongoing consulting support.", a: "IT Program Manager, Enterprise Retailer" },
              ].map((test, i) => (
                <div key={i} className="card bg-white/90 backdrop-blur-sm flex flex-col justify-between shadow-sm">
                  <div>
                    <div className="flex gap-1 mb-6">
                      {[1,2,3,4,5].map(j => <span key={j} className="text-[18px] text-apple-text">★</span>)}
                    </div>
                    <blockquote className="text-[21px] font-medium text-apple-text leading-tight mb-8">
                      "{test.q}"
                    </blockquote>
                  </div>
                  <div className="text-[14px] text-apple-text-sec font-medium">
                    {test.a}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-[160px] px-6 text-center">
          <div className="max-w-[800px] mx-auto">
            <h2 className="text-h2 mb-4 text-apple-text">
              Ready to Accelerate Your IT Transformation?
            </h2>
            <p className="text-[21px] text-apple-text-sec mb-10">
              Partner with TechAxis Global LLC for enterprise-grade consulting, analytics, and IT solutions. Let's discuss your project needs.
            </p>
            <Link href="/contact-us" className="btn-primary">
              Contact TAG for a Consultation
            </Link>
          </div>
        </section>
      </div>
    </>
  );
}
