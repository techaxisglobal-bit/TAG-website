"use client";
import Link from "next/link";
import Image from "next/image";
import { ChevronRight, ArrowUpRight } from "lucide-react";
import LocalNav from "@/components/LocalNav";
import BackgroundMedia from "@/components/BackgroundMedia";
import MediaFrame from "@/components/MediaFrame";
import DataNetwork from "@/components/DataNetwork";
import { clientPartners } from "@/data/content";

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
          { label: 'Experts', id: 'experts' },
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
        <section id="journey" className="relative py-[160px] px-6 scroll-mt-[100px] overflow-hidden">
          <DataNetwork className="opacity-30" />
          <div className="max-w-[1200px] mx-auto relative z-10">
            <div className="text-center max-w-[800px] mx-auto mb-16">
              <h2 className="text-h2 text-apple-text">Our Journey</h2>
            </div>
            <div className="flex overflow-x-auto md:grid md:grid-cols-5 gap-6 pb-8 snap-x">
              {[
                { year: "2012", title: "TAG Founded", desc: "Launched with a vision to deliver data-driven IT solutions for enterprises." },
                { year: "2015", title: "Expansion to India", desc: "Established a global delivery center in India to support international clients." },
                { year: "2018", title: "Enterprise Analytics Milestone", desc: "Delivered analytics modernization for Fortune 500 organizations." },
                { year: "2021", title: "Cloud Data Solutions", desc: "Expanded offerings to include cloud data engineering and BI migration." },
                { year: "2024", title: "Continued Growth", desc: "Trusted by enterprise clients for IT consulting, analytics, and staffing expertise." }
              ].map((item, i) => (
                <div key={item.year} className="min-w-[280px] md:min-w-0 snap-start card bg-white/80 backdrop-blur-md">
                  <div className="text-[48px] font-semibold tracking-tighter text-apple-text-sec mb-4">{item.year}</div>
                  <h3 className="text-[21px] font-semibold text-apple-text mb-3">{item.title}</h3>
                  <p className="text-[17px] text-apple-text-sec leading-relaxed">{item.desc}</p>
                </div>
              ))}
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
                        <div className="flex items-center justify-between gap-2 mb-3">
                          <span className="text-[11px] font-semibold uppercase tracking-wider text-emerald-400 bg-emerald-400/10 px-2.5 py-0.5 rounded-full border border-emerald-400/20">
                            {partner.badge}
                          </span>
                          <span className="text-[10px] text-white/50 font-medium">U.S. DHS</span>
                        </div>

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

        {/* Experts */}
        <section id="experts" className="relative py-[160px] px-6 scroll-mt-[100px]">
          <div className="absolute inset-0 bg-[radial-gradient(#D2D2D7_1px,transparent_1px)] [background-size:16px_16px] opacity-20 mask-image:radial-gradient(circle_at_center,black,transparent_80%)"></div>
          <div className="max-w-[1200px] mx-auto relative z-10">
            <div className="text-center max-w-[800px] mx-auto mb-16">
              <h2 className="text-h2 text-apple-text mb-6">Meet Our Experts</h2>
              <p className="text-[21px] text-apple-text-sec leading-relaxed">
                TAG's leadership and consultants bring decades of enterprise IT, analytics, and staffing experience. Our team's diverse expertise drives client success across industries.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { name: "Priya Sharma", role: "Principal Consultant" },
                { name: "Arjun Patel", role: "Lead Data Architect" },
                { name: "Samantha Lee", role: "BI Solutions Manager" },
                { name: "Rahul Singh", role: "IT Staffing Director" },
              ].map(expert => (
                <div key={expert.name} className="card bg-apple-surface text-center px-4 py-12">
                  <div className="w-32 h-32 mx-auto rounded-full bg-apple-hairline flex items-center justify-center mb-6 overflow-hidden">
                    <span className="text-[32px] font-semibold text-apple-text-sec">
                      {expert.name.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <h3 className="text-[21px] font-semibold text-apple-text mb-1">{expert.name}</h3>
                  <p className="text-[17px] text-apple-text-sec">{expert.role}</p>
                </div>
              ))}
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
