import type { Metadata } from "next";
import Link from "next/link";
import { 
  ShieldCheck, 
  FileText, 
  Lock, 
  Share2, 
  Database, 
  Mail, 
  Phone, 
  MapPin, 
  ArrowRight, 
  CheckCircle2, 
  Scale, 
  Eye,
  HelpCircle
} from "lucide-react";
import { siteConfig } from "@/data/content";

export const metadata: Metadata = {
  title: "Privacy Policy | TechAxis Global LLC (TAG)",
  description: "Learn how TechAxis Global LLC (TAG) collects, uses, stores, and protects information shared through our website, consulting engagements, and business communications.",
  alternates: {
    canonical: "https://techaxisglobal.com/privacy-policy",
  },
  openGraph: {
    title: "Privacy Policy | TechAxis Global LLC (TAG)",
    description: "Learn how TechAxis Global LLC (TAG) collects, uses, stores, and protects information shared through our website, consulting engagements, and business communications.",
    url: "https://techaxisglobal.com/privacy-policy",
    siteName: "TechAxis Global LLC (TAG)",
    locale: "en_US",
    type: "website",
  },
};

const keyPrinciples = [
  {
    icon: ShieldCheck,
    title: "No Data Selling",
    desc: "We never sell, rent, or monetize your personal information to third parties.",
  },
  {
    icon: Lock,
    title: "Enterprise Safeguards",
    desc: "Industry-standard administrative, physical, and technical data security.",
  },
  {
    icon: Scale,
    title: "Your Rights Respected",
    desc: "Transparent access, correction, and deletion mechanisms upon request.",
  },
  {
    icon: Eye,
    title: "Purpose-Driven Use",
    desc: "Data is utilized strictly to provide consulting, staffing, and support services.",
  },
];

const policySections = [
  {
    id: "information-we-collect",
    number: "01",
    title: "Information We Collect",
    icon: Database,
    verbatim: "We may collect contact details, company information, job application materials, inquiry content, and technical usage data submitted through forms, email, phone, or website interactions.",
    details: [
      {
        subtitle: "Direct Inquiries & Business Communications",
        content: "When you submit an inquiry through our contact forms, schedule a consultation, or contact us via email or phone, we collect personal details including your name, corporate email address, telephone number, job title, company name, and the specific nature of your project or technical request."
      },
      {
        subtitle: "Candidate & Job Application Materials",
        content: "For applicants seeking career opportunities or contract consulting roles through our careers portal, we collect resumes, CVs, employment histories, educational credentials, work authorization documentation, portfolio links, and related candidate screening data. As an authorized E-Verify employer in the United States, employment eligibility verification data is processed in compliance with applicable federal guidelines."
      },
      {
        subtitle: "Automated Technical & Usage Data",
        content: "When you browse our website, our servers automatically record standard technical usage information, including your IP address, browser type and version, operating system, referring URL, pages viewed, time spent per page, and general diagnostic information used to secure our systems and improve site performance."
      }
    ]
  },
  {
    id: "how-we-use-information",
    number: "02",
    title: "How We Use Information",
    icon: FileText,
    verbatim: "Information is used to respond to inquiries, deliver consulting and staffing services, evaluate candidates, improve website performance, maintain security, and support legitimate business operations.",
    details: [
      {
        subtitle: "Fulfilling Client Services & Consultations",
        content: "We use your information to provide enterprise IT consulting, data analytics and BI modernization, ERP consulting, cloud engineering, and managed technical services under agreed project scopes."
      },
      {
        subtitle: "Evaluating Candidates & Staffing Operations",
        content: "Applicant materials are processed to evaluate qualifications for open positions, conduct technical screenings, assess placement compatibility, and coordinate interviews."
      },
      {
        subtitle: "Website Security & Operational Integrity",
        content: "Technical data is analyzed to monitor network infrastructure, protect against cyber attacks, prevent fraud, troubleshoot technical glitches, and ensure optimal website availability."
      },
      {
        subtitle: "Compliance & Legal Responsibilities",
        content: "We process information as required to satisfy statutory, tax, federal employment, and corporate governance obligations, or to protect the legal rights and safety of TechAxis Global LLC and our clients."
      }
    ]
  },
  {
    id: "sharing-and-disclosure",
    number: "03",
    title: "Sharing and Disclosure",
    icon: Share2,
    verbatim: "We do not sell personal information. We may share data with trusted service providers, affiliates, or legal authorities when necessary to operate our business, fulfill requests, or comply with applicable law.",
    details: [
      {
        subtitle: "Strict Non-Sale Commitment",
        content: "TechAxis Global LLC does not sell, rent, lease, trade, or commercialize personal information or candidate records to third-party data brokers or marketing vendors."
      },
      {
        subtitle: "Trusted Service Providers & Infrastructure",
        content: "We may share data with vetted third-party vendors who provide essential infrastructure services on our behalf (such as cloud hosting, email delivery, applicant tracking, and analytics). All service providers are bound by strict confidentiality and data protection covenants."
      },
      {
        subtitle: "Legal & Regulatory Compliance",
        content: "We may disclose information if required by subpoena, court order, regulatory mandate, or applicable law, or when we reasonably believe disclosure is necessary to investigate potential illegal activity or protect life and safety."
      },
      {
        subtitle: "Corporate Transactions",
        content: "In the event of a merger, acquisition, corporate restructuring, or sale of assets, client and business records may be transferred as part of standard business assets, governed by appropriate confidentiality protections."
      }
    ]
  },
  {
    id: "data-security-and-rights",
    number: "04",
    title: "Data Security and Rights",
    icon: Lock,
    verbatim: "We use reasonable administrative and technical safeguards to protect information. Depending on applicable law, individuals may request access, correction, or deletion of personal data by contacting our team.",
    details: [
      {
        subtitle: "Enterprise Security Safeguards",
        content: "We implement physical, technical, and organizational measures engineered to prevent unauthorized access, accidental destruction, modification, or disclosure of your information. These include transport layer encryption (SSL/TLS), restricted access controls, and periodic security evaluations."
      },
      {
        subtitle: "Individual Privacy Rights",
        content: "Depending on your jurisdiction and applicable data protection laws (such as GDPR, CCPA, or applicable U.S. state regulations), you may hold rights to: (1) request access to the personal data we hold about you; (2) request correction of inaccurate records; (3) request erasure or deletion of personal data; and (4) object to or restrict certain processing activities."
      },
      {
        subtitle: "Submitting a Privacy Request",
        content: "To exercise any of your privacy rights or inquire about your data records, please submit a written request to contact@techaxisglobal.com. We respond to all verified requests promptly and within statutory deadlines."
      }
    ]
  }
];

export default function PrivacyPolicy() {
  return (
    <div className="bg-[#FAF9F6] text-zinc-900 min-h-screen">
      {/* Hero Section */}
      <section className="relative pt-[120px] pb-[70px] px-4 sm:px-6 lg:px-8 border-b border-zinc-200/80 bg-white overflow-hidden">
        {/* Ambient subtle backdrop glow */}
        <div 
          className="absolute -top-40 right-1/4 w-96 h-96 bg-red-100/50 rounded-full blur-3xl pointer-events-none"
          aria-hidden="true" 
        />
        <div 
          className="absolute -bottom-20 left-10 w-80 h-80 bg-amber-100/40 rounded-full blur-3xl pointer-events-none" 
          aria-hidden="true" 
        />

        <div className="max-w-[1140px] mx-auto relative z-10">
          {/* Eyebrow badge */}
          <div className="flex items-center gap-2 mb-4">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[12px] font-semibold text-[#B42318] bg-[#B42318]/10 border border-[#B42318]/20 tracking-wide uppercase">
              <ShieldCheck className="w-3.5 h-3.5" />
              Legal & Compliance
            </span>
            <span className="text-zinc-400 text-xs">•</span>
            <span className="text-zinc-500 text-xs font-medium">Last Updated: September 2026</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-zinc-900 font-display mb-5">
            Privacy Policy
          </h1>

          <p className="text-base sm:text-lg text-zinc-600 max-w-3xl leading-relaxed mb-8">
            Learn how TechAxis Global LLC (TAG) collects, uses, stores, and protects information shared through our website and business communications.
          </p>

          {/* Quick Meta Pills */}
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-zinc-100 border border-zinc-200 text-xs font-medium text-zinc-700">
              <span className="w-1.5 h-1.5 rounded-full bg-[#B42318]"></span>
              Entity: {siteConfig.name}
            </div>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-zinc-100 border border-zinc-200 text-xs font-medium text-zinc-700">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
              E-Verified Federal Employer
            </div>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-zinc-100 border border-zinc-200 text-xs font-medium text-zinc-700">
              <MapPin className="w-3 h-3 text-[#D97706]" />
              Richmond, Virginia (USA)
            </div>
          </div>
        </div>
      </section>

      {/* Main Body */}
      <section className="py-14 sm:py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-[1140px] mx-auto">
          
          {/* Key Principles Grid */}
          <div className="mb-16">
            <div className="text-center sm:text-left mb-8">
              <h2 className="text-xs font-bold uppercase tracking-widest text-[#B42318] mb-2">
                Overview
              </h2>
              <h3 className="text-2xl sm:text-3xl font-bold text-zinc-900 font-display tracking-tight">
                How We Handle Data
              </h3>
              <p className="text-zinc-600 text-[15px] max-w-2xl mt-2 leading-relaxed">
                We are committed to responsible information practices that support transparency, security, and trust for enterprise clients, partners, candidates, and website visitors.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {keyPrinciples.map((item, idx) => {
                const Icon = item.icon;
                return (
                  <div 
                    key={idx}
                    className="p-5 rounded-2xl bg-white border border-zinc-200/80 shadow-2xs hover:shadow-xs transition-shadow"
                  >
                    <div className="w-10 h-10 rounded-xl bg-[#B42318]/10 text-[#B42318] flex items-center justify-center mb-4">
                      <Icon className="w-5 h-5" />
                    </div>
                    <h4 className="font-semibold text-zinc-900 text-[15px] mb-1">
                      {item.title}
                    </h4>
                    <p className="text-xs text-zinc-500 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Policy Sections Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            
            {/* Table of Contents Sticky Sidebar */}
            <aside className="lg:col-span-4 order-2 lg:order-1">
              <div className="sticky top-[100px] space-y-6">
                
                {/* TOC Card */}
                <div className="p-6 rounded-2xl bg-white border border-zinc-200/90 shadow-2xs">
                  <h4 className="text-[13px] font-bold uppercase tracking-wider text-zinc-500 mb-4 flex items-center gap-2">
                    <FileText className="w-4 h-4 text-[#B42318]" />
                    Policy Sections
                  </h4>
                  <nav className="space-y-2">
                    {policySections.map((sec) => (
                      <a
                        key={sec.id}
                        href={`#${sec.id}`}
                        className="group flex items-start gap-3 p-2.5 rounded-xl hover:bg-zinc-50 transition-colors text-[13.5px] text-zinc-700 hover:text-[#B42318]"
                      >
                        <span className="font-mono text-xs text-zinc-400 group-hover:text-[#B42318] mt-0.5 font-bold">
                          {sec.number}
                        </span>
                        <span className="font-medium group-hover:underline">
                          {sec.title}
                        </span>
                      </a>
                    ))}
                  </nav>
                </div>

                {/* Direct Contact Card */}
                <div className="p-6 rounded-2xl bg-gradient-to-br from-zinc-900 to-[#0F172A] text-white shadow-md">
                  <div className="flex items-center gap-2 text-[#D97706] mb-3">
                    <HelpCircle className="w-4 h-4" />
                    <span className="text-xs font-bold uppercase tracking-wider">
                      Privacy Inquiries
                    </span>
                  </div>
                  <h4 className="text-lg font-bold font-display mb-2">
                    Questions on Privacy?
                  </h4>
                  <p className="text-xs text-slate-300 leading-relaxed mb-4">
                    Our compliance and governance team is available to assist with any data subject requests or inquiries.
                  </p>
                  
                  <div className="space-y-2.5 text-xs text-slate-300 border-t border-white/10 pt-4 mb-5">
                    <div className="flex items-center gap-2">
                      <Mail className="w-3.5 h-3.5 text-[#D97706]" />
                      <a href={`mailto:${siteConfig.contact.email}`} className="hover:text-white transition-colors">
                        {siteConfig.contact.email}
                      </a>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="w-3.5 h-3.5 text-[#D97706]" />
                      <a href="tel:+14342854949" className="hover:text-white transition-colors">
                        +1 434-285-4949
                      </a>
                    </div>
                  </div>

                  <Link
                    href="/contact-us"
                    className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-full bg-[#B42318] hover:bg-[#991B1B] text-white text-xs font-semibold transition-all shadow-xs"
                  >
                    <span>Contact Privacy Officer</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>

              </div>
            </aside>

            {/* Main Policy Content Column */}
            <div className="lg:col-span-8 order-1 lg:order-2 space-y-10">
              {policySections.map((sec) => {
                const SecIcon = sec.icon;
                return (
                  <article
                    key={sec.id}
                    id={sec.id}
                    className="p-7 sm:p-9 rounded-2xl bg-white border border-zinc-200/90 shadow-2xs scroll-mt-28"
                  >
                    {/* Header */}
                    <div className="flex items-start justify-between gap-4 border-b border-zinc-100 pb-5 mb-6">
                      <div className="flex items-center gap-3.5">
                        <div className="w-11 h-11 rounded-xl bg-[#B42318]/10 text-[#B42318] flex items-center justify-center flex-shrink-0">
                          <SecIcon className="w-5 h-5" />
                        </div>
                        <div>
                          <div className="text-xs font-mono font-bold text-[#B42318]">
                            SECTION {sec.number}
                          </div>
                          <h2 className="text-xl sm:text-2xl font-bold text-zinc-900 font-display">
                            {sec.title}
                          </h2>
                        </div>
                      </div>
                    </div>

                    {/* Official Statement Callout (Taken directly from techaxisglobal.com) */}
                    <div className="p-4 rounded-xl bg-zinc-50 border-l-4 border-[#B42318] mb-6">
                      <p className="text-[14.5px] font-medium text-zinc-800 leading-relaxed italic">
                        "{sec.verbatim}"
                      </p>
                    </div>

                    {/* Expanded Policy Points */}
                    <div className="space-y-5">
                      {sec.details.map((detail, dIdx) => (
                        <div key={dIdx} className="space-y-1.5">
                          <h3 className="text-[15px] font-semibold text-zinc-900 flex items-center gap-2">
                            <CheckCircle2 className="w-4 h-4 text-[#B42318] flex-shrink-0" />
                            {detail.subtitle}
                          </h3>
                          <p className="text-[14px] text-zinc-600 leading-relaxed pl-6">
                            {detail.content}
                          </p>
                        </div>
                      ))}
                    </div>
                  </article>
                );
              })}

              {/* Bottom Questions Card (Exact structure from techaxisglobal.com) */}
              <div className="p-8 sm:p-10 rounded-2xl bg-gradient-to-br from-[#0F172A] via-[#1E293B] to-[#0F172A] text-white shadow-lg text-center relative overflow-hidden">
                <div 
                  className="absolute -right-20 -bottom-20 w-64 h-64 bg-[#B42318]/20 rounded-full blur-2xl pointer-events-none"
                  aria-hidden="true" 
                />

                <span className="inline-block text-[11px] font-bold uppercase tracking-widest text-[#D97706] mb-2">
                  Questions
                </span>
                <h3 className="text-2xl sm:text-3xl font-bold font-display text-white mb-3">
                  Need More Information?
                </h3>
                <p className="text-slate-300 text-sm max-w-xl mx-auto leading-relaxed mb-8">
                  If you have questions about this Privacy Policy or how your information is handled, please reach out to TechAxis Global LLC (TAG).
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <Link
                    href="/contact-us"
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#B42318] hover:bg-[#991B1B] text-white px-7 py-3 rounded-full font-semibold text-sm transition-all duration-200 shadow-sm active:scale-98"
                  >
                    <span>Talk to Our Experts</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                  <a
                    href={`mailto:${siteConfig.contact.email}`}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/15 text-white border border-white/15 px-7 py-3 rounded-full font-medium text-sm transition-all duration-200"
                  >
                    <span>Email Compliance</span>
                  </a>
                </div>
              </div>

            </div>

          </div>

        </div>
      </section>
    </div>
  );
}
