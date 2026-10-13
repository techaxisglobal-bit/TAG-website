"use client";
import Link from "next/link";
import { ChevronRight, Search } from "lucide-react";
import LocalNav from "@/components/LocalNav";
import BackgroundMedia from "@/components/BackgroundMedia";
import MediaFrame from "@/components/MediaFrame";
import DotGrid from "@/components/DotGrid";

export default function Careers() {
  return (
    <>
      <LocalNav 
        title="Careers" 
        links={[
          { label: 'Overview', id: 'overview' },
          { label: 'Why TAG', id: 'why-tag' },
          { label: 'Benefits', id: 'benefits' },
          { label: 'Open Roles', id: 'open-roles' },
        ]} 
      />
      <div id="overview" className="pb-0 scroll-mt-[100px]">
        {/* Hero */}
        <section className="relative pt-[120px] pb-[80px] px-6 text-center">
          <BackgroundMedia slotKey="careers-hero" type="video" overlay="white-full" overlayOpacity={0.92} priority parallax />
          <div className="max-w-[980px] mx-auto relative z-10">
            <p className="text-[14px] font-semibold text-apple-text-sec uppercase tracking-widest mb-4">
              Join Our Team
            </p>
            <h1 className="text-h1 mb-6 text-apple-text">
              Careers at TechAxis Global LLC (TAG)
            </h1>
            <p className="text-h3 text-apple-text-sec font-normal max-w-[800px] mx-auto mb-10">
              Empowering IT professionals to drive innovation in enterprise analytics, business intelligence, and data engineering. Explore opportunities to grow your career with a global leader in consulting and technology solutions.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <button onClick={() => document.getElementById('open-roles')?.scrollIntoView({ behavior: 'smooth' })} className="btn-primary shadow-sm">
                View Open Positions
              </button>
              <Link href="/contact-us" className="btn-link text-lg drop-shadow-sm">
                Contact HR <ChevronRight className="w-5 h-5 ml-1" />
              </Link>
            </div>
          </div>
        </section>

        {/* Why Work at TAG */}
        <section id="why-tag" className="relative bg-apple-surface py-[160px] px-6 text-center scroll-mt-[100px]">
          <DotGrid />
          <div className="max-w-[800px] mx-auto relative z-10">
            <h2 className="text-h2 mb-6">
              <span className="text-apple-text block">Join a team and</span>
              <span className="text-apple-text-sec block">inspire the work.</span>
            </h2>
            <p className="text-[21px] text-apple-text-sec leading-relaxed">
              At TechAxis Global, you'll collaborate with some of the brightest minds in IT consulting, analytics, and cloud data solutions. We foster a culture of innovation, continuous learning, and global teamwork, enabling you to make a real impact for enterprise clients across the USA and India.
            </p>
          </div>
        </section>

        {/* Benefits */}
        <section id="benefits" className="py-[160px] px-6 max-w-[1200px] mx-auto scroll-mt-[100px]">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { t: "Professional Development", d: "Access to certifications, workshops, and mentoring to accelerate your IT career.", slot: "careers-dev" },
              { t: "Diverse, Inclusive Culture", d: "Work with a global team that values diversity, equity, and collaboration.", slot: "careers-culture" },
              { t: "Cutting-Edge Projects", d: "Contribute to enterprise data, analytics, and cloud transformation for top clients.", slot: "careers-projects" },
            ].map(b => (
              <MediaFrame key={b.t} slotKey={b.slot} overlay="white-full" overlayOpacity={0.85} className="bg-apple-surface text-center">
                <h3 className="text-[24px] font-semibold text-apple-text mb-4 leading-tight mt-auto pt-24">{b.t}</h3>
                <p className="text-[17px] text-apple-text-sec leading-relaxed">{b.d}</p>
              </MediaFrame>
            ))}
          </div>
        </section>

        {/* Open Roles */}
        <section id="open-roles" className="bg-apple-surface py-[160px] px-6 scroll-mt-[100px]">
          <div className="max-w-[980px] mx-auto">
            <div className="text-center mb-16 max-w-[800px] mx-auto">
              <h2 className="text-h2 text-apple-text mb-6">Search for what you love to do.</h2>
              <p className="text-[21px] text-apple-text-sec leading-relaxed">
                TAG is always seeking talented IT consultants, data engineers, business analysts, and project leaders ready to shape the future of enterprise technology.
              </p>
            </div>
            
            <div className="max-w-[600px] mx-auto mb-16 relative">
              <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-6 h-6 text-apple-text-sec" />
              <input 
                type="text" 
                placeholder="Search jobs" 
                className="w-full bg-white text-[21px] rounded-full py-5 pl-16 pr-6 focus:outline-none focus:ring-4 focus:ring-[#B42318]/20 focus:border-[#B42318] transition-all border border-apple-hairline shadow-sm"
              />
            </div>
            
            <div className="text-center py-20 border-t border-apple-hairline">
              <h3 className="text-[24px] font-semibold text-apple-text mb-2">No openings listed right now.</h3>
              <p className="text-[17px] text-apple-text-sec mb-6">Send us your resume and we'll be in touch.</p>
              <Link href="mailto:contact@techaxisglobal.com" className="btn-primary shadow-sm">
                Submit Resume
              </Link>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="relative py-[160px] px-6 text-center border-b border-apple-hairline">
          <BackgroundMedia slotKey="careers-cta" overlay="frost" />
          <div className="max-w-[800px] mx-auto relative z-10">
            <h2 className="text-h2 mb-4">
              <span className="text-apple-text block">Ready to Advance Your IT Career?</span>
              <span className="text-apple-text-sec block">Join TechAxis Global LLC</span>
            </h2>
            <p className="text-[21px] text-apple-text-sec mb-10">
              Explore open roles or contact our HR team to discover how you can grow with TAG.
            </p>
            <Link href="/contact-us" className="btn-primary shadow-sm">
              Connect with TAG
            </Link>
          </div>
        </section>
        
        {/* Equal Opportunity */}
        <section className="py-12 px-6 max-w-[980px] mx-auto">
           <p className="text-[12px] text-apple-text-sec text-center max-w-4xl mx-auto">
              // TODO: HR/legal to review. TechAxis Global LLC is an equal opportunity employer. We evaluate qualified applicants without regard to race, color, religion, sex, sexual orientation, gender identity, national origin, disability, veteran status, and other legally protected characteristics.
           </p>
        </section>
      </div>
    </>
  );
}
