"use client";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import LocalNav from "@/components/LocalNav";
import BackgroundMedia from "@/components/BackgroundMedia";
import MediaFrame from "@/components/MediaFrame";

const industries = [
  { title: "Finance & Banking", desc: "Secure, compliant analytics and reporting for financial institutions and banks.", slotKey: "ind-finance" },
  { title: "Healthcare & Life Sciences", desc: "Data-driven solutions for patient care, compliance, and operational efficiency.", slotKey: "ind-health" },
  { title: "Retail & E-commerce", desc: "Omnichannel analytics and inventory intelligence for retailers and online businesses.", slotKey: "ind-retail" },
  { title: "Manufacturing", desc: "Production analytics, IoT integration, and supply chain visibility.", slotKey: "ind-mfg" },
  { title: "Technology & SaaS", desc: "Cloud-native BI, product analytics, and scalable data engineering for tech innovators.", slotKey: "ind-tech" },
  { title: "Staffing & Professional Services", desc: "Workforce analytics and IT staffing for enterprise-scale projects.", slotKey: "ind-staff" },
];

export default function Industries() {
  return (
    <>
      <LocalNav 
        title="Industries" 
        links={[
          { label: 'Overview', id: 'overview' },
          { label: 'Industries', id: 'industries' },
          { label: 'Gallery', id: 'gallery' },
        ]} 
      />
      <div id="overview" className="pb-0 scroll-mt-[100px]">
        {/* Hero */}
        <section className="relative pt-[120px] pb-[80px] px-6 text-center">
          <BackgroundMedia slotKey="industries-hero" type="video" overlay="white-full" overlayOpacity={0.92} priority parallax />
          <div className="max-w-[980px] mx-auto relative z-10">
            <p className="text-[14px] font-semibold text-apple-text-sec uppercase tracking-widest mb-4">
              Industries Served
            </p>
            <h1 className="text-h1 mb-6 text-apple-text">
              Empowering Enterprises Across Sectors
            </h1>
            <p className="text-h3 text-apple-text-sec font-normal max-w-[800px] mx-auto mb-10">
              TechAxis Global LLC (TAG) delivers advanced analytics, IT consulting, and staffing solutions for a diverse range of industries. Our expertise drives digital transformation and business intelligence for leading organizations.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <Link href="/contact-us" className="btn-primary shadow-sm">
                Talk to Our Experts
              </Link>
              <Link href="/services" className="btn-link text-lg drop-shadow-sm">
                Explore Services <ChevronRight className="w-5 h-5 ml-1" />
              </Link>
            </div>
          </div>
        </section>

        {/* Statement */}
        <section className="bg-apple-surface py-[160px] px-6 text-center">
          <div className="max-w-[800px] mx-auto mb-20">
            <p className="text-[32px] md:text-[40px] font-semibold leading-tight text-apple-text tracking-tight">
              With 12+ years of experience, TAG delivers tailored IT consulting and analytics for industries including Finance, Healthcare, Retail, Manufacturing, and Technology. Our cross-sector expertise ensures scalable, secure, and innovative solutions.
            </p>
          </div>
          <div className="flex flex-wrap justify-center gap-12 max-w-[800px] mx-auto">
             <div>
                <div className="text-[48px] font-semibold tracking-tighter text-apple-text">12+</div>
                <div className="text-[14px] font-medium text-apple-text-sec uppercase tracking-widest">Years in Business</div>
             </div>
             <div>
                <div className="text-[48px] font-semibold tracking-tighter text-apple-text">2</div>
                <div className="text-[14px] font-medium text-apple-text-sec uppercase tracking-widest">Continents Served</div>
             </div>
             <div>
                <div className="text-[48px] font-semibold tracking-tighter text-apple-text">5+</div>
                <div className="text-[14px] font-medium text-apple-text-sec uppercase tracking-widest">Industries Supported</div>
             </div>
          </div>
        </section>

        {/* Industries Carousel */}
        <section id="industries" className="py-[160px] px-6 max-w-[1200px] mx-auto scroll-mt-[100px]">
          <div className="text-center max-w-[800px] mx-auto mb-16">
            <h2 className="text-h2 text-apple-text mb-6">Industries We Serve</h2>
            <p className="text-[21px] text-apple-text-sec leading-relaxed">
              Our specialized teams deliver measurable results for enterprise clients in key sectors. Discover how TAG's expertise accelerates digital transformation in your industry.
            </p>
          </div>
          
          <div className="flex overflow-x-auto md:grid md:grid-cols-3 gap-6 pb-8 snap-x">
            {industries.map((ind) => (
              <MediaFrame key={ind.title} slotKey={ind.slotKey} overlay="white-full" overlayOpacity={0.85} className="min-w-[300px] md:min-w-0 snap-start bg-apple-surface min-h-[300px]">
                <div className="relative z-10 flex flex-col justify-end h-full mt-24">
                  <h3 className="text-[24px] font-semibold text-apple-text mb-4 leading-tight">{ind.title}</h3>
                  <p className="text-[17px] text-apple-text-sec leading-relaxed">{ind.desc}</p>
                </div>
              </MediaFrame>
            ))}
          </div>
        </section>

        {/* Gallery */}
        <section id="gallery" className="bg-apple-surface py-[160px] px-6 text-center scroll-mt-[100px]">
          <div className="max-w-[800px] mx-auto">
            <h2 className="text-h2 text-apple-text mb-6">Industry Impact Gallery</h2>
            <p className="text-[21px] text-apple-text-sec leading-relaxed mb-16">
              A visual showcase of how TAG's solutions empower organizations across sectors.
            </p>
            {/* Gallery Placeholder */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {[1,2,3,4,5,6].map(i => (
                <div key={i} className="aspect-square rounded-[28px] bg-white border border-apple-hairline overflow-hidden group cursor-pointer relative">
                  <div className="absolute inset-0 bg-apple-text opacity-0 group-hover:opacity-5 transition-opacity"></div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-[160px] px-6 text-center">
          <div className="max-w-[800px] mx-auto">
            <h2 className="text-h2 mb-4 text-apple-text">
              Ready to Transform Your Industry?
            </h2>
            <p className="text-[21px] text-apple-text-sec mb-10">
              Connect with TAG's specialists to discuss your enterprise IT, analytics, or staffing needs.
            </p>
            <Link href="/contact-us" className="btn-primary">
              Connect with TAG
            </Link>
          </div>
        </section>
      </div>
    </>
  );
}
