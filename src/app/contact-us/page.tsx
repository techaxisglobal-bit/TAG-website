"use client";

import { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { 
  User, 
  Mail, 
  Building2, 
  Phone, 
  Briefcase, 
  MessageSquare, 
  ArrowRight, 
  CheckCircle2, 
  ShieldCheck, 
  Clock, 
  MapPin, 
  Sparkles, 
  Globe2, 
  Lock, 
  Check, 
  Loader2,
  AlertCircle
} from "lucide-react";
import LocalNav from "@/components/LocalNav";
import { siteConfig } from "@/data/content";

function ContactForm() {
  const searchParams = useSearchParams();
  const serviceParam = searchParams.get("service") || "";

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    phone: "",
    service: serviceParam || "Business Intelligence & Analytics",
    message: "",
    consent: true,
    website_hp: "" // Honeypot spam trap
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [submittedData, setSubmittedData] = useState<{ name: string; email: string; company: string; service: string } | null>(null);

  useEffect(() => {
    if (serviceParam) {
      setFormData(prev => ({ ...prev, service: serviceParam }));
    }
  }, [serviceParam]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    if (type === "checkbox") {
      const { checked } = e.target as HTMLInputElement;
      setFormData(prev => ({ ...prev, [name]: checked }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
    if (errorMessage) setErrorMessage(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setLoading(true);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Failed to submit consultation request. Please try again.");
      }

      setSubmittedData({
        name: formData.name,
        email: formData.email,
        company: formData.company,
        service: formData.service,
      });

      setSuccess(true);
      setFormData({
        name: "",
        email: "",
        company: "",
        phone: "",
        service: "Business Intelligence & Analytics",
        message: "",
        consent: true,
        website_hp: ""
      });

    } catch (err: any) {
      console.error("[Contact Page] Form submission error:", err);
      setErrorMessage(err.message || "An unexpected error occurred. Please try again or reach out at contact@techaxisglobal.com.");
    } finally {
      setLoading(false);
    }
  };

  if (success && submittedData) {
    return (
      <div className="py-8 px-4 text-center">
        {/* Animated Check Emblem */}
        <div className="w-16 h-16 rounded-full bg-emerald-500/10 text-emerald-600 flex items-center justify-center mx-auto mb-6 ring-8 ring-emerald-500/5">
          <Check className="w-8 h-8 stroke-[2.5]" />
        </div>

        <span className="inline-block text-[11px] font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 border border-emerald-200/80 px-3 py-1 rounded-full mb-3">
          Consultation Request Confirmed
        </span>

        <h3 className="text-2xl sm:text-3xl font-bold text-zinc-900 font-display mb-3">
          Thank You, {submittedData.name}!
        </h3>

        <p className="text-[15px] text-zinc-600 max-w-md mx-auto leading-relaxed mb-6">
          Your message has been received. A confirmation receipt has been sent to <strong className="text-zinc-900">{submittedData.email}</strong>. Our enterprise solutions architect is reviewing your requirements and will reach out within 24 hours.
        </p>

        {/* Submission Summary Card */}
        <div className="p-5 rounded-2xl bg-zinc-50 border border-zinc-200 text-left max-w-md mx-auto mb-8 space-y-2.5 text-xs sm:text-sm">
          <div className="flex justify-between items-center border-b border-zinc-200/80 pb-2">
            <span className="text-zinc-500 font-medium">Service Focus</span>
            <span className="font-semibold text-zinc-900">{submittedData.service}</span>
          </div>
          <div className="flex justify-between items-center border-b border-zinc-200/80 pb-2">
            <span className="text-zinc-500 font-medium">Organization</span>
            <span className="font-semibold text-zinc-900">{submittedData.company}</span>
          </div>
          <div className="flex justify-between items-center border-b border-zinc-200/80 pb-2">
            <span className="text-zinc-500 font-medium">Response SLA</span>
            <span className="font-semibold text-emerald-700">Within 24 Hours</span>
          </div>
          <div className="flex justify-between items-center pt-1">
            <span className="text-zinc-500 font-medium">US Headquarters</span>
            <span className="font-semibold text-zinc-900">+1 434-285-4949</span>
          </div>
        </div>

        <button 
          onClick={() => setSuccess(false)} 
          className="inline-flex items-center gap-2 text-sm font-semibold text-[#B42318] hover:text-[#991B1B] hover:underline cursor-pointer"
        >
          <span>Send another consultation inquiry</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {/* Error Alert */}
      {errorMessage && (
        <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-800 text-sm flex items-start gap-3">
          <AlertCircle className="w-5 h-5 flex-shrink-0 text-[#B42318] mt-0.5" />
          <div>
            <p className="font-semibold">Submission Notice</p>
            <p className="text-xs text-red-700 mt-0.5">{errorMessage}</p>
          </div>
        </div>
      )}

      {/* Row 1: Name and Work Email */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="name" className="block text-xs font-semibold text-zinc-700 uppercase tracking-wider mb-1.5">
            Full Name <span className="text-[#B42318]">*</span>
          </label>
          <div className="relative">
            <User className="w-4 h-4 text-zinc-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              required
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="e.g. Sarah Jenkins"
              className="w-full bg-white border border-zinc-200 rounded-xl pl-10 pr-4 py-3 text-[14px] text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:border-[#B42318] focus:ring-2 focus:ring-[#B42318]/15 transition-all"
            />
          </div>
        </div>

        <div>
          <label htmlFor="email" className="block text-xs font-semibold text-zinc-700 uppercase tracking-wider mb-1.5">
            Work Email <span className="text-[#B42318]">*</span>
          </label>
          <div className="relative">
            <Mail className="w-4 h-4 text-zinc-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              required
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="sarah@enterprise.com"
              className="w-full bg-white border border-zinc-200 rounded-xl pl-10 pr-4 py-3 text-[14px] text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:border-[#B42318] focus:ring-2 focus:ring-[#B42318]/15 transition-all"
            />
          </div>
        </div>
      </div>

      {/* Row 2: Company and Phone */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="company" className="block text-xs font-semibold text-zinc-700 uppercase tracking-wider mb-1.5">
            Company Name <span className="text-[#B42318]">*</span>
          </label>
          <div className="relative">
            <Building2 className="w-4 h-4 text-zinc-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              required
              type="text"
              id="company"
              name="company"
              value={formData.company}
              onChange={handleChange}
              placeholder="e.g. Acme Corp / Global Logistics"
              className="w-full bg-white border border-zinc-200 rounded-xl pl-10 pr-4 py-3 text-[14px] text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:border-[#B42318] focus:ring-2 focus:ring-[#B42318]/15 transition-all"
            />
          </div>
        </div>

        <div>
          <label htmlFor="phone" className="block text-xs font-semibold text-zinc-700 uppercase tracking-wider mb-1.5">
            Phone Number <span className="text-zinc-400 font-normal lowercase">(optional)</span>
          </label>
          <div className="relative">
            <Phone className="w-4 h-4 text-zinc-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="+1 (555) 000-0000"
              className="w-full bg-white border border-zinc-200 rounded-xl pl-10 pr-4 py-3 text-[14px] text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:border-[#B42318] focus:ring-2 focus:ring-[#B42318]/15 transition-all"
            />
          </div>
        </div>
      </div>

      {/* Row 3: Service of Interest */}
      <div>
        <label htmlFor="service" className="block text-xs font-semibold text-zinc-700 uppercase tracking-wider mb-1.5">
          Service Area of Interest <span className="text-[#B42318]">*</span>
        </label>
        <div className="relative">
          <Briefcase className="w-4 h-4 text-zinc-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <select
            id="service"
            name="service"
            value={formData.service}
            onChange={handleChange}
            className="w-full bg-white border border-zinc-200 rounded-xl pl-10 pr-8 py-3 text-[14px] text-zinc-900 focus:outline-none focus:border-[#B42318] focus:ring-2 focus:ring-[#B42318]/15 transition-all cursor-pointer appearance-none"
          >
            <option value="Business Intelligence & Analytics">Business Intelligence & Analytics (Power BI, DAX, Fabric)</option>
            <option value="Data Engineering & Cloud Solutions">Data Engineering & Cloud Solutions (Azure, AWS, Snowflake)</option>
            <option value="Qlik to Power BI Migration">Qlik to Power BI Enterprise Migration</option>
            <option value="Reporting Modernization">Reporting Modernization & Legacy BI Overhaul</option>
            <option value="IT Consulting & Staffing">IT Consulting & Dedicated Staff Augmentation</option>
            <option value="Enterprise Analytics">Enterprise Analytics, Predictive AI & Automation</option>
            <option value="ERP Consulting & Managed Services">ERP Modernization & Managed Infrastructure</option>
            <option value="Other">Other / Custom Enterprise Requirement</option>
          </select>
          <div className="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none text-zinc-400 text-xs">
            ▼
          </div>
        </div>
      </div>

      {/* Row 4: Message */}
      <div>
        <label htmlFor="message" className="block text-xs font-semibold text-zinc-700 uppercase tracking-wider mb-1.5">
          Project Details / Message <span className="text-[#B42318]">*</span>
        </label>
        <div className="relative">
          <MessageSquare className="w-4 h-4 text-zinc-400 absolute left-3.5 top-3.5 pointer-events-none" />
          <textarea
            required
            id="message"
            name="message"
            rows={4}
            value={formData.message}
            onChange={handleChange}
            placeholder="Tell us about your technical goals, timeline, existing BI/data stack, or team staffing needs..."
            className="w-full bg-white border border-zinc-200 rounded-xl pl-10 pr-4 py-3 text-[14px] text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:border-[#B42318] focus:ring-2 focus:ring-[#B42318]/15 transition-all resize-none"
          />
        </div>
      </div>

      {/* Honeypot Spam Protection (Hidden from real users) */}
      <div className="hidden" aria-hidden="true">
        <input 
          type="text" 
          name="website_hp" 
          tabIndex={-1} 
          autoComplete="off" 
          value={formData.website_hp} 
          onChange={handleChange} 
        />
      </div>

      {/* Consent Checkbox */}
      <div className="flex items-start gap-3 pt-1">
        <input
          required
          type="checkbox"
          id="consent"
          name="consent"
          checked={formData.consent}
          onChange={handleChange}
          className="mt-1 w-4 h-4 rounded border-zinc-300 text-[#B42318] focus:ring-[#B42318] cursor-pointer"
        />
        <label htmlFor="consent" className="text-xs text-zinc-600 leading-relaxed select-none">
          I agree to the <Link href="/privacy-policy" className="text-[#B42318] font-medium hover:underline">Privacy Policy</Link> and <Link href="/terms-and-conditions" className="text-[#B42318] font-medium hover:underline">Terms & Conditions</Link>, and consent to receiving a consultation response regarding this inquiry.
        </label>
      </div>

      {/* Submit Button */}
      <div className="pt-2">
        <button
          disabled={loading}
          type="submit"
          className="w-full inline-flex items-center justify-center gap-2 bg-[#B42318] hover:bg-[#991B1B] text-white py-3.5 px-6 rounded-full font-semibold text-sm transition-all duration-200 shadow-md hover:shadow-lg disabled:opacity-70 disabled:cursor-not-allowed cursor-pointer active:scale-[0.99]"
        >
          {loading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Connecting with Solutions Team...</span>
            </>
          ) : (
            <>
              <span>Schedule Free Consultation</span>
              <ArrowRight className="w-4 h-4" />
            </>
          )}
        </button>

        <div className="flex items-center justify-center gap-2 mt-3 text-[11.5px] text-zinc-500">
          <Lock className="w-3.5 h-3.5 text-emerald-600" />
          <span>Enterprise Confidential. Protected by 256-bit SSL encryption.</span>
        </div>
      </div>
    </form>
  );
}

export default function ContactUs() {
  return (
    <div className="bg-[#FAF9F6] text-zinc-900 min-h-screen">
      <LocalNav 
        title="Contact Us" 
        links={[
          { label: 'Overview', id: 'overview' },
          { label: 'Schedule Consultation', id: 'consultation' },
          { label: 'Global Offices', id: 'offices' },
        ]} 
      />

      {/* Hero Section */}
      <section id="overview" className="relative pt-[120px] pb-[70px] px-4 sm:px-6 lg:px-8 border-b border-zinc-200/80 bg-white overflow-hidden scroll-mt-[100px]">
        {/* Ambient subtle glow */}
        <div 
          className="absolute -top-32 right-1/4 w-96 h-96 bg-red-100/50 rounded-full blur-3xl pointer-events-none"
          aria-hidden="true" 
        />
        <div 
          className="absolute -bottom-20 left-10 w-80 h-80 bg-amber-100/40 rounded-full blur-3xl pointer-events-none" 
          aria-hidden="true" 
        />

        <div className="max-w-[1240px] mx-auto relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#B42318]/10 border border-[#B42318]/20 text-[#B42318] text-xs font-semibold uppercase tracking-wider mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            Enterprise Solutions & Architecture Discovery
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[52px] font-bold tracking-tight text-zinc-900 font-display mb-5 max-w-3xl mx-auto leading-[1.12]">
            Let's Architect Your Next Digital Breakthrough
          </h1>

          <p className="text-base sm:text-lg text-zinc-600 max-w-2xl mx-auto leading-relaxed mb-8">
            Connect directly with TechAxis Global enterprise solutions architects to discuss modern analytics, BI migrations, cloud data lakehouses, and IT talent solutions.
          </p>

          {/* SLA Pill Indicators */}
          <div className="flex flex-wrap items-center justify-center gap-3 pt-1">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-zinc-100 border border-zinc-200 text-xs font-medium text-zinc-700">
              <Clock className="w-3.5 h-3.5 text-[#B42318]" />
              24-Hour Guaranteed SLA Response
            </div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-zinc-100 border border-zinc-200 text-xs font-medium text-zinc-700">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              E-Verified Federal Employer
            </div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-zinc-100 border border-zinc-200 text-xs font-medium text-zinc-700">
              <MapPin className="w-3.5 h-3.5 text-[#D97706]" />
              Richmond, Virginia Global Headquarters
            </div>
          </div>
        </div>
      </section>

      {/* Main Consultation Section: Split 2-Column Hub */}
      <section id="consultation" className="py-14 sm:py-20 px-4 sm:px-6 lg:px-8 scroll-mt-[100px]">
        <div className="max-w-[1240px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            
            {/* Left Column: Direct Consultation Hub & Value (5 Cols) */}
            <div className="lg:col-span-5 space-y-6">
              
              {/* Status Box */}
              <div className="p-6 rounded-2xl bg-white border border-zinc-200/90 shadow-2xs">
                <div className="flex items-center gap-2.5 mb-3">
                  <span className="relative flex h-2.5 w-2.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
                  </span>
                  <span className="text-xs font-bold uppercase tracking-wider text-emerald-800">
                    Solutions Desk Active
                  </span>
                </div>
                <h3 className="text-xl font-bold text-zinc-900 font-display mb-2">
                  Direct Partner Access
                </h3>
                <p className="text-xs sm:text-[13.5px] text-zinc-600 leading-relaxed mb-5">
                  Skip the generic sales tier. Every consultation inquiry is routed directly to a certified enterprise architect with specialized domain knowledge.
                </p>

                <div className="space-y-3.5 border-t border-zinc-100 pt-4 text-xs sm:text-[13px] text-zinc-700">
                  <div className="flex items-start gap-3">
                    <MapPin className="w-4 h-4 text-[#B42318] flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold text-zinc-900">Headquarters (USA)</p>
                      <p className="text-zinc-500">{siteConfig.contact.address}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <Phone className="w-4 h-4 text-[#D97706] flex-shrink-0" />
                    <a href={`tel:${siteConfig.contact.phone.replace(/[^0-9+]/g, '')}`} className="hover:text-[#B42318] font-medium transition-colors">
                      {siteConfig.contact.phone}
                    </a>
                  </div>

                  <div className="flex items-center gap-3">
                    <Mail className="w-4 h-4 text-[#D97706] flex-shrink-0" />
                    <a href={`mailto:${siteConfig.contact.email}`} className="hover:text-[#B42318] font-medium transition-colors">
                      {siteConfig.contact.email}
                    </a>
                  </div>

                  <div className="flex items-center gap-3">
                    <Clock className="w-4 h-4 text-zinc-400 flex-shrink-0" />
                    <span className="text-zinc-500">{siteConfig.contact.hours}</span>
                  </div>
                </div>
              </div>

              {/* Consultation Deliverables */}
              <div className="p-6 rounded-2xl bg-gradient-to-br from-[#0F172A] to-[#1E293B] text-white shadow-md">
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#D97706]">
                  What You'll Receive
                </span>
                <h4 className="text-lg font-bold font-display text-white mt-1 mb-4">
                  Complimentary Architecture Review
                </h4>

                <ul className="space-y-3 text-xs sm:text-[13px] text-slate-300">
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                    <span>Technical feasibility assessment for legacy BI & cloud migrations.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                    <span>Cost optimization audit for Azure, AWS, and modern data platforms.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                    <span>Custom talent staffing framework with pre-vetted engineers.</span>
                  </li>
                </ul>
              </div>

            </div>

            {/* Right Column: Premium Modern Form (7 Cols) */}
            <div className="lg:col-span-7">
              <div className="bg-white rounded-3xl border border-zinc-200/90 shadow-xl p-6 sm:p-10 relative overflow-hidden">
                <div className="mb-6">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold text-[#B42318] bg-[#B42318]/8 border border-[#B42318]/15 tracking-wider uppercase mb-2">
                    <MessageSquare className="w-3 h-3" />
                    Direct Message
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-bold text-zinc-900 font-display">
                    Send a Message
                  </h2>
                  <p className="text-xs sm:text-sm text-zinc-500 mt-1">
                    Fill out the consultation form below. Both our team and your inbox will receive immediate confirmation.
                  </p>
                </div>

                <Suspense fallback={<div className="py-20 text-center text-zinc-400">Loading form...</div>}>
                  <ContactForm />
                </Suspense>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Global Delivery Presence Section */}
      <section id="offices" className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 border-t border-zinc-200/80 bg-white scroll-mt-[100px]">
        <div className="max-w-[1240px] mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase tracking-widest text-[#B42318] mb-2 block">
              Global Scale • Boutique Focus
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold font-display text-zinc-900 tracking-tight">
              Our Strategic Operating Centers
            </h2>
            <p className="text-zinc-600 text-sm mt-2 leading-relaxed">
              Dual-continent delivery model combining North American enterprise governance with 24/7 global technology operations.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Center 1: Richmond USA */}
            <div className="p-6 rounded-2xl bg-zinc-50 border border-zinc-200/80 hover:border-zinc-300 transition-all shadow-2xs">
              <div className="w-10 h-10 rounded-xl bg-[#B42318]/10 text-[#B42318] flex items-center justify-center mb-4">
                <MapPin className="w-5 h-5" />
              </div>
              <span className="text-[11px] font-bold text-[#B42318] uppercase tracking-wider block mb-1">
                Global Headquarters
              </span>
              <h3 className="text-lg font-bold text-zinc-900 font-display mb-2">
                Richmond, Virginia (USA)
              </h3>
              <p className="text-xs text-zinc-600 leading-relaxed mb-4">
                8401 Mayland Dr, Ste S<br />
                Richmond, VA 23294, United States
              </p>
              <div className="pt-3 border-t border-zinc-200/60 text-xs text-zinc-500 space-y-1">
                <p><strong>Primary Phone:</strong> +1 434-285-4949</p>
                <p><strong>Hours:</strong> Mon–Fri, 9am–6pm EST</p>
              </div>
            </div>

            {/* Center 2: India Delivery Hub */}
            <div className="p-6 rounded-2xl bg-zinc-50 border border-zinc-200/80 hover:border-zinc-300 transition-all shadow-2xs">
              <div className="w-10 h-10 rounded-xl bg-[#D97706]/10 text-[#D97706] flex items-center justify-center mb-4">
                <Globe2 className="w-5 h-5" />
              </div>
              <span className="text-[11px] font-bold text-[#D97706] uppercase tracking-wider block mb-1">
                Global Delivery Center
              </span>
              <h3 className="text-lg font-bold text-zinc-900 font-display mb-2">
                India Operations Hub
              </h3>
              <p className="text-xs text-zinc-600 leading-relaxed mb-4">
                Dedicated engineering & analytics centers supporting round-the-clock enterprise SLA delivery.
              </p>
              <div className="pt-3 border-t border-zinc-200/60 text-xs text-zinc-500 space-y-1">
                <p><strong>Coverage:</strong> 24/7 Follow-the-Sun Support</p>
                <p><strong>Specialty:</strong> Cloud ETL & BI Migrations</p>
              </div>
            </div>

            {/* Center 3: E-Verify & Security Trust */}
            <div className="p-6 rounded-2xl bg-zinc-50 border border-zinc-200/80 hover:border-zinc-300 transition-all shadow-2xs">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-600 flex items-center justify-center mb-4">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <span className="text-[11px] font-bold text-emerald-700 uppercase tracking-wider block mb-1">
                Compliance & Trust
              </span>
              <h3 className="text-lg font-bold text-zinc-900 font-display mb-2">
                E-Verified & Compliant
              </h3>
              <p className="text-xs text-zinc-600 leading-relaxed mb-4">
                Authorized federal employer operating under strict US regulatory standards, enterprise security protocols, and client NDAs.
              </p>
              <div className="pt-3 border-t border-zinc-200/60 text-xs text-zinc-500 space-y-1">
                <p><strong>Security:</strong> Enterprise SSL & DPA</p>
                <p><strong>Governance:</strong> Virginia Corporate Standing</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
