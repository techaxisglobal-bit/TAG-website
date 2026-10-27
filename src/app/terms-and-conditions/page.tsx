import type { Metadata } from "next";
import Link from "next/link";
import { 
  Scale, 
  FileCheck, 
  ShieldAlert, 
  Copyright, 
  Briefcase, 
  ExternalLink, 
  Clock, 
  Gavel, 
  Mail, 
  Phone, 
  MapPin, 
  ArrowRight, 
  CheckCircle2,
  Sparkles
} from "lucide-react";
import { siteConfig } from "@/data/content";

export const metadata: Metadata = {
  title: "Terms and Conditions | TechAxis Global LLC (TAG)",
  description: "These Terms and Conditions govern the use of the TechAxis Global LLC website, services information, intellectual property, and related business communications.",
  alternates: {
    canonical: "https://techaxisglobal.com/terms-and-conditions",
  },
  openGraph: {
    title: "Terms and Conditions | TechAxis Global LLC (TAG)",
    description: "These Terms and Conditions govern the use of the TechAxis Global LLC website, services information, intellectual property, and related business communications.",
    url: "https://techaxisglobal.com/terms-and-conditions",
    siteName: "TechAxis Global LLC (TAG)",
    locale: "en_US",
    type: "website",
  },
};

const keyPoints = [
  "Use of this website is subject to applicable law.",
  "Website content is for general business information.",
  "Client work is governed by separate agreements.",
  "Unauthorized use of content is prohibited.",
  "Terms may be updated from time to time.",
];

const termSections = [
  {
    id: "acceptance-of-terms",
    number: "01",
    title: "Acceptance of Terms",
    icon: FileCheck,
    verbatim: "By accessing or using this website, you agree to be bound by these Terms and Conditions and all applicable laws. If you do not agree with any part of these terms, please do not use this website.",
    details: [
      {
        subtitle: "Binding Agreement",
        content: "By visiting, browsing, accessing, or interacting with any portion of the TechAxis Global LLC (TAG) website, you acknowledge that you have read, understood, and agreed to be legally bound by these Terms and Conditions, alongside our Privacy Policy."
      },
      {
        subtitle: "Authority & Legal Capacity",
        content: "If you access this website on behalf of an enterprise, company, partnership, or other corporate entity, you represent and warrant that you possess full legal authority to bind such entity to these terms."
      }
    ]
  },
  {
    id: "use-of-website",
    number: "02",
    title: "Use of Website",
    icon: Scale,
    verbatim: "This website is provided for general informational purposes regarding TechAxis Global LLC services, capabilities, and business operations. You agree to use the website only for lawful purposes and in a manner that does not interfere with its security, availability, or proper functioning.",
    details: [
      {
        subtitle: "Permitted Lawful Purpose",
        content: "You are granted a limited, revocable, non-exclusive license to view and navigate website content solely to evaluate TAG's enterprise IT consulting services, review industry solutions, and submit recruitment inquiries or business communications."
      },
      {
        subtitle: "Prohibited Actions",
        content: "You agree not to: (a) probe, scan, or test the vulnerability of our systems or networks; (b) introduce viruses, malware, bots, or automated scrapers; (c) attempt unauthorized access to server infrastructure or databases; or (d) interfere with or disrupt normal website functionality for other users."
      }
    ]
  },
  {
    id: "intellectual-property",
    number: "03",
    title: "Intellectual Property",
    icon: Copyright,
    verbatim: "All content on this website, including text, graphics, branding, layout, and other materials, is owned by or licensed to TechAxis Global LLC unless otherwise stated. Unauthorized reproduction, distribution, modification, or commercial use of website content is prohibited without prior written permission.",
    details: [
      {
        subtitle: "Ownership of Proprietary Assets",
        content: "All trademarks, service marks, logos, brand names, visual interface designs, graphic elements, architectural diagrams, articles, and written content appearing on this website are protected under United States and international copyright, trademark, and unfair competition laws."
      },
      {
        subtitle: "Restrictions on Use",
        content: "No material from this website may be copied, reproduced, republished, uploaded, posted, transmitted, framed, or distributed in any way without explicit, prior written authorization from TechAxis Global LLC."
      }
    ]
  },
  {
    id: "service-information",
    number: "04",
    title: "Service Information",
    icon: Briefcase,
    verbatim: "Information about consulting, analytics, staffing, migration, and modernization services is provided for general guidance only. Service scope, delivery terms, pricing, timelines, and project obligations are subject to separate written agreements between TechAxis Global LLC and its clients or partners.",
    details: [
      {
        subtitle: "General Guidance & Estimates",
        content: "Descriptions of capabilities—such as Business Intelligence, Power BI migrations, cloud data engineering, and enterprise staffing—are provided for general informational guidance. They do not constitute formal binding contractual warranties or definitive offers of work."
      },
      {
        subtitle: "Governing Master Services Agreements",
        content: "Any engagement between TechAxis Global LLC and a client is governed exclusively by fully executed formal contracts, including Master Services Agreements (MSAs), Statements of Work (SOWs), Non-Disclosure Agreements (NDAs), and Service Level Agreements (SLAs)."
      }
    ]
  },
  {
    id: "third-party-links",
    number: "05",
    title: "Third-Party Links",
    icon: ExternalLink,
    verbatim: "This website may include links to third-party websites for convenience or reference. TechAxis Global LLC does not control and is not responsible for the content, security, or practices of third-party sites.",
    details: [
      {
        subtitle: "External Sites & Disclaimers",
        content: "Links directing users to external platforms (such as partner portals, certification bodies, or social networks like LinkedIn) are provided for reference only. Inclusion of any link does not imply endorsement or assumption of liability by TAG."
      },
      {
        subtitle: "User Responsibility",
        content: "When accessing third-party websites, you are subject to the distinct terms and privacy policies of those third-party providers. We encourage reviewing their policies before disclosing personal or confidential data."
      }
    ]
  },
  {
    id: "limitation-of-liability",
    number: "06",
    title: "Limitation of Liability",
    icon: ShieldAlert,
    verbatim: "To the fullest extent permitted by law, TechAxis Global LLC shall not be liable for any direct, indirect, incidental, consequential, or special damages arising from or related to the use of this website, reliance on its content, or inability to access the website.",
    details: [
      {
        subtitle: "\"As Is\" and \"As Available\"",
        content: "This website and its contents are provided on an \"as is\" and \"as available\" basis without representations or warranties of any kind, whether express, statutory, or implied, including fitness for a particular purpose or non-infringement."
      },
      {
        subtitle: "Exclusion of Consequential Damages",
        content: "In no event shall TechAxis Global LLC, its officers, directors, employees, or affiliates be liable for loss of profits, loss of data, business interruption, or consequential damages resulting from website access or technical downtime."
      }
    ]
  },
  {
    id: "changes-to-terms",
    number: "07",
    title: "Changes to Terms",
    icon: Clock,
    verbatim: "We may update these Terms and Conditions at any time without prior notice. Continued use of the website after changes are posted constitutes acceptance of the revised terms.",
    details: [
      {
        subtitle: "Right to Modify",
        content: "TAG reserves the right to review, update, modify, or replace any portion of these Terms and Conditions to reflect operational, legal, or regulatory developments. Any revisions become effective immediately upon posting to this page."
      },
      {
        subtitle: "Continued Acceptance",
        content: "Your periodic review of this page is encouraged. Your ongoing use of the website after any revisions indicates your acknowledgment and acceptance of the updated terms."
      }
    ]
  },
  {
    id: "governing-law",
    number: "08",
    title: "Governing Law",
    icon: Gavel,
    verbatim: "These Terms and Conditions shall be governed by and interpreted in accordance with applicable laws governing the operations of TechAxis Global LLC, without regard to conflict of law principles.",
    details: [
      {
        subtitle: "Jurisdiction & Venue",
        content: "These Terms are governed by and construed under the laws of the Commonwealth of Virginia and the United States of America. Any legal dispute or proceeding arising out of or related to these terms shall be submitted to the competent courts of Richmond, Virginia."
      },
      {
        subtitle: "Severability",
        content: "If any provision of these Terms is determined by a court of competent jurisdiction to be invalid or unenforceable, that provision shall be enforced to the maximum extent permissible, and the remaining provisions shall continue in full force and effect."
      }
    ]
  }
];

export default function TermsAndConditions() {
  return (
    <div className="bg-[#FAF9F6] text-zinc-900 min-h-screen">
      {/* Hero Section */}
      <section className="relative pt-[120px] pb-[70px] px-4 sm:px-6 lg:px-8 border-b border-zinc-200/80 bg-white overflow-hidden">
        {/* Subtle backdrop glow */}
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
              <Scale className="w-3.5 h-3.5" />
              Legal Agreement
            </span>
            <span className="text-zinc-400 text-xs">•</span>
            <span className="text-zinc-500 text-xs font-medium">Last Updated: September 2026</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-zinc-900 font-display mb-5">
            Terms and Conditions
          </h1>

          <p className="text-base sm:text-lg text-zinc-600 max-w-3xl leading-relaxed mb-8">
            These Terms and Conditions govern the use of the TechAxis Global LLC website and related communications.
          </p>

          {/* Quick Meta Pills */}
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-zinc-100 border border-zinc-200 text-xs font-medium text-zinc-700">
              <span className="w-1.5 h-1.5 rounded-full bg-[#B42318]"></span>
              Entity: {siteConfig.name}
            </div>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-zinc-100 border border-zinc-200 text-xs font-medium text-zinc-700">
              <Gavel className="w-3 h-3 text-[#B42318]" />
              Governing Law: Virginia, USA
            </div>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-zinc-100 border border-zinc-200 text-xs font-medium text-zinc-700">
              <MapPin className="w-3 h-3 text-[#D97706]" />
              Richmond, VA Headquarters
            </div>
          </div>
        </div>
      </section>

      {/* Main Body */}
      <section className="py-14 sm:py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-[1140px] mx-auto">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            
            {/* Main Content Column (Left/Primary - 65% width) */}
            <div className="lg:col-span-8 space-y-10 order-1">
              
              {termSections.map((sec) => {
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
                            CLAUSE {sec.number}
                          </div>
                          <h2 className="text-xl sm:text-2xl font-bold text-zinc-900 font-display">
                            {sec.title}
                          </h2>
                        </div>
                      </div>
                    </div>

                    {/* Official Text Callout (From live website) */}
                    <div className="p-4 rounded-xl bg-zinc-50 border-l-4 border-[#B42318] mb-6">
                      <p className="text-[14.5px] font-medium text-zinc-800 leading-relaxed italic">
                        "{sec.verbatim}"
                      </p>
                    </div>

                    {/* Detailed Legal Breakdowns */}
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

              {/* Call to Action Section (Exact from techaxisglobal.com) */}
              <div className="p-8 sm:p-10 rounded-2xl bg-gradient-to-br from-[#0F172A] via-[#1E293B] to-[#0F172A] text-white shadow-lg text-center relative overflow-hidden">
                <div 
                  className="absolute -right-20 -bottom-20 w-64 h-64 bg-[#B42318]/20 rounded-full blur-2xl pointer-events-none"
                  aria-hidden="true" 
                />

                <span className="inline-block text-[11px] font-bold uppercase tracking-widest text-[#D97706] mb-2">
                  Call to Action
                </span>
                <h3 className="text-2xl sm:text-3xl font-bold font-display text-white mb-3">
                  Have Questions on Our Terms?
                </h3>
                <p className="text-slate-300 text-sm max-w-xl mx-auto leading-relaxed mb-8">
                  For questions about our website terms, consulting engagements, or business communications, connect with TechAxis Global LLC.
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
                    <span>Email Legal Department</span>
                  </a>
                </div>
              </div>

            </div>

            {/* Right Column / Sticky Sidebar (35% width matching techaxisglobal.com layout) */}
            <aside className="lg:col-span-4 order-2 space-y-6">
              <div className="sticky top-[100px] space-y-6">
                
                {/* At a Glance Box (Exact wording & structure from live website) */}
                <div className="p-6 rounded-2xl bg-amber-50/70 border border-amber-200/70 shadow-2xs">
                  <div className="flex items-center gap-2 text-[#D97706] mb-4">
                    <Sparkles className="w-4 h-4" />
                    <h3 className="text-[13px] font-bold uppercase tracking-wider text-amber-900">
                      At a Glance
                    </h3>
                  </div>
                  
                  <ul className="space-y-3">
                    {keyPoints.map((point, pIdx) => (
                      <li key={pIdx} className="flex items-start gap-2.5 text-[13.5px] text-amber-950">
                        <CheckCircle2 className="w-4 h-4 text-[#D97706] flex-shrink-0 mt-0.5" />
                        <span className="leading-snug">{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Contact for Questions Box (Exact wording & structure from live website) */}
                <div className="p-6 rounded-2xl bg-white border border-zinc-200/90 shadow-2xs">
                  <div className="flex items-center gap-2 text-[#B42318] mb-3">
                    <Mail className="w-4 h-4" />
                    <h3 className="text-[13px] font-bold uppercase tracking-wider text-zinc-900">
                      Contact for Questions
                    </h3>
                  </div>

                  <p className="text-[13.5px] text-zinc-600 leading-relaxed mb-5">
                    If you have questions about these Terms and Conditions or would like to discuss service engagement terms, please contact our team.
                  </p>

                  <div className="space-y-3 text-xs text-zinc-600 border-t border-zinc-100 pt-4 mb-5">
                    <div className="flex items-start gap-2.5">
                      <MapPin className="w-4 h-4 text-[#B42318] flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="font-semibold text-zinc-900">Headquarters</p>
                        <p className="text-zinc-500 leading-tight">{siteConfig.contact.address}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2.5">
                      <Phone className="w-4 h-4 text-[#D97706] flex-shrink-0" />
                      <a href="tel:+14342854949" className="hover:text-[#B42318] transition-colors">
                        +1 434-285-4949
                      </a>
                    </div>
                    <div className="flex items-center gap-2.5">
                      <Mail className="w-4 h-4 text-[#D97706] flex-shrink-0" />
                      <a href={`mailto:${siteConfig.contact.email}`} className="hover:text-[#B42318] transition-colors">
                        {siteConfig.contact.email}
                      </a>
                    </div>
                  </div>

                  <Link
                    href="/contact-us"
                    className="w-full inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-[#B42318] hover:bg-[#991B1B] text-white text-xs font-semibold transition-all shadow-xs active:scale-98"
                  >
                    <span>Contact Us</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>

                {/* Quick Navigation Links */}
                <div className="p-6 rounded-2xl bg-white border border-zinc-200/90 shadow-2xs">
                  <h4 className="text-[13px] font-bold uppercase tracking-wider text-zinc-500 mb-3 flex items-center gap-2">
                    <Scale className="w-4 h-4 text-[#B42318]" />
                    Jump to Section
                  </h4>
                  <nav className="space-y-1.5">
                    {termSections.map((sec) => (
                      <a
                        key={sec.id}
                        href={`#${sec.id}`}
                        className="group flex items-center justify-between p-2 rounded-lg hover:bg-zinc-50 text-[13px] text-zinc-600 hover:text-[#B42318] transition-colors"
                      >
                        <span className="font-medium group-hover:underline">{sec.title}</span>
                        <span className="font-mono text-[11px] text-zinc-400">§ {sec.number}</span>
                      </a>
                    ))}
                  </nav>
                </div>

              </div>
            </aside>

          </div>

        </div>
      </section>
    </div>
  );
}
