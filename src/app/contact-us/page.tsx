"use client";
import { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import LocalNav from "@/components/LocalNav";
import BackgroundMedia from "@/components/BackgroundMedia";
import { siteConfig } from "@/data/content";

function ContactForm() {
  const searchParams = useSearchParams();
  const serviceParam = searchParams.get("service") || "";
  const [selectedService, setSelectedService] = useState(serviceParam);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (serviceParam) {
      setSelectedService(serviceParam);
    }
  }, [serviceParam]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
    }, 1200);
  };

  if (success) {
    return (
      <div className="py-20 text-center">
        <div className="text-[64px] mb-4 text-[#B42318]">✓</div>
        <h3 className="text-[32px] font-semibold text-apple-text mb-4">Message Sent</h3>
        <p className="text-[17px] text-apple-text-sec mb-8">
          Thank you for reaching out. A TAG consultant will be in touch shortly.
        </p>
        <button onClick={() => setSuccess(false)} className="btn-link cursor-pointer">
          Send another message ›
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <h2 className="text-[32px] font-semibold text-apple-text mb-8">Send a Message</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="relative">
          <input
            required
            type="text"
            id="name"
            placeholder="Name"
            className="w-full bg-white/80 border border-apple-hairline rounded-[12px] px-4 py-4 text-[17px] focus:outline-none focus:border-[#B42318] focus:ring-1 focus:ring-[#B42318] transition-colors backdrop-blur-md"
          />
        </div>
        <div className="relative">
          <input
            required
            type="email"
            id="email"
            placeholder="Work Email"
            className="w-full bg-white/80 border border-apple-hairline rounded-[12px] px-4 py-4 text-[17px] focus:outline-none focus:border-[#B42318] focus:ring-1 focus:ring-[#B42318] transition-colors backdrop-blur-md"
          />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="relative">
          <input
            required
            type="text"
            id="company"
            placeholder="Company"
            className="w-full bg-white/80 border border-apple-hairline rounded-[12px] px-4 py-4 text-[17px] focus:outline-none focus:border-[#B42318] focus:ring-1 focus:ring-[#B42318] transition-colors backdrop-blur-md"
          />
        </div>
        <div className="relative">
          <input
            type="tel"
            id="phone"
            placeholder="Phone (optional)"
            className="w-full bg-white/80 border border-apple-hairline rounded-[12px] px-4 py-4 text-[17px] focus:outline-none focus:border-[#B42318] focus:ring-1 focus:ring-[#B42318] transition-colors backdrop-blur-md"
          />
        </div>
      </div>
      <div>
        <select
          id="service"
          value={selectedService}
          onChange={(e) => setSelectedService(e.target.value)}
          className="w-full bg-white/80 border border-apple-hairline rounded-[12px] px-4 py-4 text-[17px] focus:outline-none focus:border-[#B42318] focus:ring-1 focus:ring-[#B42318] transition-colors text-apple-text backdrop-blur-md cursor-pointer"
        >
          <option value="" disabled>Service of Interest</option>
          <option value="Business Intelligence & Analytics">Business Intelligence & Analytics</option>
          <option value="Data Engineering & Cloud Solutions">Data Engineering & Cloud Solutions</option>
          <option value="Qlik to Power BI Migration">Qlik to Power BI Migration</option>
          <option value="Reporting Modernization">Reporting Modernization</option>
          <option value="IT Consulting & Staffing">IT Consulting & Staffing</option>
          <option value="Enterprise Analytics">Enterprise Analytics</option>
          <option value="Cloud Data Solutions">Cloud Data Solutions</option>
          <option value="Cost Optimization">Cost Optimization Standard Audit</option>
          <option value="Other">Other / Custom Inquiry</option>
        </select>
      </div>
      <div className="hidden">
        <input type="text" name="honeypot" tabIndex={-1} />
      </div>
      <div>
        <textarea
          required
          id="message"
          rows={4}
          placeholder="Message"
          className="w-full bg-white/80 border border-apple-hairline rounded-[12px] px-4 py-4 text-[17px] focus:outline-none focus:border-[#B42318] focus:ring-1 focus:ring-[#B42318] transition-colors resize-none backdrop-blur-md"
        ></textarea>
      </div>
      <div className="flex items-start gap-3 pt-2">
        <input
          required
          type="checkbox"
          id="consent"
          className="mt-1.5 w-4 h-4 rounded border-apple-hairline text-[#B42318] focus:ring-[#B42318] cursor-pointer"
        />
        <label htmlFor="consent" className="text-[14px] text-apple-text-sec leading-relaxed select-none">
          I agree to the <Link href="/privacy-policy" className="text-apple-link hover:underline">Privacy Policy</Link> and consent to being contacted regarding my inquiry.
        </label>
      </div>
      <div className="pt-4 text-center">
        <button
          disabled={loading}
          type="submit"
          className="btn-primary shadow-sm w-full md:w-auto px-12 cursor-pointer active:scale-95 transition-transform"
        >
          {loading ? "Sending..." : "Submit Inquiry"}
        </button>
        <p className="text-[12px] text-zinc-500 mt-4 flex items-center justify-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
          Enterprise confidential. Protected by SSL encryption.
        </p>
      </div>
    </form>
  );
}

export default function ContactUs() {
  return (
    <>
      <LocalNav 
        title="Contact Us" 
        links={[
          { label: 'Contact', id: 'contact' },
          { label: 'Send a Message', id: 'send' },
        ]} 
      />
      <div id="contact" className="pb-0 scroll-mt-[100px]">
        {/* Hero */}
        <section className="relative pt-[120px] pb-[80px] px-6 text-center">
          <BackgroundMedia slotKey="contact-hero" type="image" overlay="none" overlayOpacity={0.15} className="opacity-25" />
          <div className="max-w-[980px] mx-auto relative z-10">
            <h1 className="text-h1 mb-6 text-apple-text">
              Get in Touch with TechAxis Global LLC (TAG)
            </h1>
            <p className="text-h3 text-apple-text-sec font-normal max-w-[800px] mx-auto">
              Connect with our team for IT consulting, enterprise analytics, and staffing solutions. We help modernize your data and reporting platforms for business success.
            </p>
          </div>
        </section>

        {/* Contact Info Tiles */}
        <section className="bg-apple-surface py-[120px] px-6">
          <div className="max-w-[1200px] mx-auto">
             <div className="text-center mb-16 max-w-[800px] mx-auto">
                <p className="text-[21px] font-medium text-apple-text">
                  Our consultants are ready to discuss your enterprise IT needs and project requirements.
                </p>
             </div>
             <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {[
                  { title: "Address", desc: siteConfig.contact.address },
                  { title: "Email", desc: siteConfig.contact.email, link: `mailto:${siteConfig.contact.email}` },
                  { title: "Phone", desc: siteConfig.contact.phone, link: `tel:${siteConfig.contact.phone.replace(/[^0-9+]/g, '')}` },
                  { title: "Hours", desc: siteConfig.contact.hours },
                ].map(item => (
                  <div key={item.title} className="card bg-white text-center p-8 shadow-sm">
                     <h3 className="text-[21px] font-semibold text-apple-text mb-2">{item.title}</h3>
                     {item.link ? (
                        <a href={item.link} className="text-[17px] text-apple-link hover:underline block break-all">
                           {item.desc}
                        </a>
                     ) : (
                        <p className="text-[17px] text-apple-text-sec">{item.desc}</p>
                     )}
                  </div>
                ))}
             </div>
          </div>
        </section>

        {/* Form */}
        <section id="send" className="relative py-[160px] px-6 scroll-mt-[100px]">
          <BackgroundMedia slotKey="contact-hero" type="image" overlay="none" className="opacity-10" />
          <div className="max-w-[800px] mx-auto relative z-10">
            <div className="card bg-white/75 backdrop-blur-[24px] saturate-150 border border-white/50 shadow-[0_8px_40px_rgba(0,0,0,0.06)]">
              <Suspense fallback={<div className="py-20 text-center text-[#86868B]">Loading form...</div>}>
                <ContactForm />
              </Suspense>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
