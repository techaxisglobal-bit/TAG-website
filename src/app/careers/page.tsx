"use client";

import { useState, useMemo, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { 
  ChevronRight, 
  Search, 
  ShieldCheck, 
  Briefcase, 
  MapPin, 
  ArrowRight, 
  X, 
  Sparkles,
  Send
} from "lucide-react";
import LocalNav from "@/components/LocalNav";
import BackgroundMedia from "@/components/BackgroundMedia";
import DotGrid from "@/components/DotGrid";
import { OPEN_POSITIONS, JobPosition } from "@/data/careers";
import JobApplicationModal from "@/components/JobApplicationModal";

export default function Careers() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("All");
  const [selectedPosition, setSelectedPosition] = useState<JobPosition | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const searchInputRef = useRef<HTMLInputElement>(null);

  // Derive unique departments for quick filtering
  const departments = useMemo(() => {
    const depts = Array.from(new Set(OPEN_POSITIONS.map(p => p.department)));
    return ["All", ...depts.sort()];
  }, []);

  // Filter positions in real-time (case-insensitive partial match on title, department, or location)
  const filteredPositions = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return OPEN_POSITIONS.filter((pos) => {
      const matchesSearch = !q || 
        pos.title.toLowerCase().includes(q) ||
        pos.department.toLowerCase().includes(q) ||
        pos.location.toLowerCase().includes(q);
      
      const matchesDept = selectedDepartment === "All" || pos.department === selectedDepartment;
      return matchesSearch && matchesDept;
    });
  }, [searchQuery, selectedDepartment]);

  const handleOpenPositionsClick = () => {
    const target = document.getElementById("open-roles");
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
      setTimeout(() => {
        searchInputRef.current?.focus();
      }, 500);
    }
  };

  const handleApplyClick = (pos: JobPosition) => {
    setSelectedPosition(pos);
    setIsModalOpen(true);
  };

  return (
    <>
      <LocalNav 
        title="Careers" 
        links={[
          { label: 'Overview', id: 'overview' },
          { label: 'Why TAG', id: 'why-tag' },
          { label: 'Open Roles', id: 'open-roles' },
        ]} 
      />

      <div id="overview" className="pb-0 scroll-mt-[100px]">
        
        {/* =========================================================
            HERO SECTION
            ========================================================= */}
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
            
            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
              <button 
                type="button"
                onClick={handleOpenPositionsClick} 
                className="bg-[#B42318] hover:bg-[#8E1010] text-white text-[15px] font-semibold px-8 py-3.5 rounded-full transition-all duration-200 shadow-sm hover:shadow-md cursor-pointer flex items-center gap-2 active:scale-95"
              >
                <span>View Open Positions</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <Link href="/contact-us" className="btn-link text-lg drop-shadow-sm flex items-center">
                Contact HR <ChevronRight className="w-5 h-5 ml-1" />
              </Link>
            </div>
          </div>
        </section>

        {/* =========================================================
            WHY WORK AT TAG
            ========================================================= */}
        <section id="why-tag" className="relative bg-apple-surface py-[120px] lg:py-[140px] px-6 text-center scroll-mt-[100px] border-b border-black/[0.06]">
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

        {/* =========================================================
            OPEN POSITIONS SECTION (Real-Time Search & Apply)
            ========================================================= */}
        <section id="open-roles" className="bg-[#F8F9FA] py-[100px] lg:py-[140px] px-4 sm:px-6 lg:px-8 scroll-mt-[90px]">
          <div className="max-w-[1180px] mx-auto">
            
            {/* Header */}
            <div className="text-center mb-12 max-w-[800px] mx-auto">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#B42318]/10 text-[#B42318] text-xs font-semibold uppercase tracking-wider mb-4">
                <Sparkles className="w-3.5 h-3.5" />
                Opportunities at TAG
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-zinc-950 tracking-tight mb-4">
                Search for what you love to do.
              </h2>
              <p className="text-lg sm:text-[20px] text-zinc-600 leading-relaxed">
                TAG is actively hiring enterprise architects, cloud engineers, IAM specialists, and data consultants across our global client engagements.
              </p>
            </div>

            {/* Real-time Search Bar */}
            <div className="max-w-[720px] mx-auto mb-8">
              <div className="relative">
                <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-400 pointer-events-none" />
                <input 
                  ref={searchInputRef}
                  type="text" 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search by role, skill (e.g. IAM, Oracle, AI, DevOps)..." 
                  className="w-full bg-white text-[16px] sm:text-[18px] text-zinc-900 rounded-full py-4.5 pl-14 pr-12 focus:outline-none focus:ring-4 focus:ring-[#B42318]/15 focus:border-[#B42318] transition-all border border-black/[0.1] shadow-xs"
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery("")}
                    className="absolute right-5 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-zinc-100 hover:bg-zinc-200 flex items-center justify-center text-zinc-600 transition-colors cursor-pointer"
                    aria-label="Clear search"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>

              {/* Live Count and Quick Filters */}
              <div className="flex flex-wrap items-center justify-between gap-3 mt-4 px-2">
                <div className="text-xs sm:text-sm font-semibold text-zinc-500">
                  Showing <span className="text-[#B42318] font-bold">{filteredPositions.length}</span> {filteredPositions.length === 1 ? 'position' : 'positions'}
                  {searchQuery && <span> matching &ldquo;{searchQuery}&rdquo;</span>}
                </div>

                {/* Popular Search Shortcuts */}
                <div className="flex flex-wrap items-center gap-1.5 text-xs">
                  <span className="text-zinc-400 font-medium mr-1">Popular:</span>
                  {["IAM", "Oracle", "AI", "Cloud", "SAP", "DevOps"].map((tag) => (
                    <button
                      key={tag}
                      type="button"
                      onClick={() => setSearchQuery(tag)}
                      className={`px-2.5 py-1 rounded-full border transition-colors cursor-pointer ${
                        searchQuery.toLowerCase() === tag.toLowerCase()
                          ? "bg-[#B42318] text-white border-[#B42318]"
                          : "bg-white text-zinc-600 border-black/[0.08] hover:border-[#B42318]/40 hover:text-[#B42318]"
                      }`}
                    >
                      {tag}
                    </button>
                  ))}
                  {searchQuery && (
                    <button
                      type="button"
                      onClick={() => setSearchQuery("")}
                      className="px-2.5 py-1 rounded-full bg-zinc-200 hover:bg-zinc-300 text-zinc-700 transition-colors cursor-pointer"
                    >
                      Reset
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* Department Category Pills */}
            <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 no-scrollbar scroll-smooth">
              {departments.map((dept) => (
                <button
                  key={dept}
                  type="button"
                  onClick={() => setSelectedDepartment(dept)}
                  className={`px-4 py-2 rounded-full text-[13px] font-semibold whitespace-nowrap transition-all duration-200 cursor-pointer ${
                    selectedDepartment === dept
                      ? "bg-zinc-900 text-white shadow-xs"
                      : "bg-white text-zinc-600 hover:text-zinc-950 border border-black/[0.06] hover:border-black/[0.12]"
                  }`}
                >
                  {dept}
                </button>
              ))}
            </div>

            {/* Open Positions List / Grid */}
            {filteredPositions.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredPositions.map((pos) => (
                  <div
                    key={pos.id}
                    className="bg-white rounded-2xl p-6 border border-black/[0.07] shadow-[0_2px_8px_rgba(0,0,0,0.02)] hover:shadow-[0_12px_24px_rgba(0,0,0,0.06)] hover:border-[#B42318]/30 hover:-translate-y-0.5 transition-all duration-200 flex flex-col justify-between group"
                  >
                    <div>
                      {/* Department Tag & Type */}
                      <div className="flex items-center justify-between gap-2 mb-3">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-[#B42318]/8 text-[#B42318]">
                          {pos.department}
                        </span>
                        <span className="text-[12px] font-medium text-zinc-400">
                          {pos.type}
                        </span>
                      </div>

                      {/* Position Title */}
                      <h3 className="text-[19px] sm:text-[20px] font-bold text-zinc-950 group-hover:text-[#B42318] transition-colors tracking-tight leading-snug mb-3">
                        {pos.title}
                      </h3>

                      {/* Meta location */}
                      <div className="flex items-center gap-4 text-[13px] text-zinc-500 mb-5">
                        <div className="flex items-center gap-1.5">
                          <MapPin className="w-3.5 h-3.5 text-zinc-400" />
                          <span>{pos.location}</span>
                        </div>
                      </div>
                    </div>

                    {/* Card Action Row */}
                    <div className="pt-4 border-t border-black/[0.04] flex items-center justify-between">
                      <span className="text-[12px] font-medium text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-md">
                        Actively Hiring
                      </span>

                      <button
                        type="button"
                        onClick={() => handleApplyClick(pos)}
                        className="bg-[#B42318] hover:bg-[#8E1010] text-white text-[13px] font-semibold px-5 py-2.5 rounded-full transition-all duration-200 shadow-2xs hover:shadow-xs flex items-center gap-1.5 group/btn cursor-pointer active:scale-95"
                      >
                        <span>Apply</span>
                        <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover/btn:translate-x-1" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              /* Empty State (Condition 4: If no role matches the search, show message) */
              <div className="bg-white rounded-3xl border border-black/[0.08] p-12 text-center max-w-[640px] mx-auto shadow-xs">
                <div className="w-16 h-16 rounded-full bg-zinc-100 flex items-center justify-center mx-auto mb-4 text-zinc-400">
                  <Search className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold text-zinc-950 mb-2">
                  No matching positions found.
                </h3>
                <p className="text-zinc-600 text-[15px] mb-6 leading-relaxed">
                  We couldn&apos;t find any roles matching &ldquo;<span className="text-zinc-900 font-semibold">{searchQuery}</span>&rdquo;. Try searching with a broader term or reset your filters.
                </p>
                <div className="flex flex-wrap items-center justify-center gap-3">
                  <button
                    type="button"
                    onClick={() => {
                      setSearchQuery("");
                      setSelectedDepartment("All");
                    }}
                    className="bg-zinc-900 hover:bg-zinc-800 text-white font-semibold text-sm px-6 py-2.5 rounded-full transition-colors cursor-pointer"
                  >
                    Clear Search & Show All Roles
                  </button>
                  <Link
                    href="mailto:careers@techaxisglobal.com?subject=General%20Resume%20Submission"
                    className="border border-zinc-200 hover:bg-zinc-50 text-zinc-800 font-semibold text-sm px-6 py-2.5 rounded-full transition-colors"
                  >
                    Send General Resume
                  </Link>
                </div>
              </div>
            )}

            {/* Bottom Direct Resume Box */}
            <div className="mt-16 bg-white rounded-2xl border border-black/[0.08] p-8 text-center max-w-[700px] mx-auto shadow-xs">
              <h3 className="text-[20px] font-bold text-zinc-950 mb-1.5">
                Don&apos;t see your exact role listed?
              </h3>
              <p className="text-[14.5px] text-zinc-600 mb-5">
                We are continually expanding our practice teams across enterprise clouds, AI, and cybersecurity. Submit your resume directly to our talent pool.
              </p>
              <Link 
                href="mailto:careers@techaxisglobal.com?subject=General%20Career%20Application%20-%20TechAxis%20Global"
                className="inline-flex items-center gap-2 bg-[#B42318] hover:bg-[#8E1010] text-white text-[14px] font-semibold px-6 py-3 rounded-full transition-all duration-200 shadow-2xs hover:shadow-sm"
              >
                <Send className="w-4 h-4" />
                <span>Email Resume to HR Team</span>
              </Link>
            </div>

          </div>
        </section>

        {/* =========================================================
            CTA SECTION
            ========================================================= */}
        <section className="relative py-[120px] lg:py-[140px] px-6 text-center border-b border-apple-hairline">
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
        
        {/* =========================================================
            FEDERAL E-VERIFY AUTHORIZATION
            ========================================================= */}
        <section className="py-16 px-6 max-w-[1040px] mx-auto">
          <div className="rounded-[28px] bg-[#161617] text-white p-8 sm:p-12 border border-white/10 shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#B42318]/15 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-600/15 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10 flex flex-col md:flex-row items-center md:items-start gap-8">
              <div className="flex-shrink-0 w-48 sm:w-56 p-3 rounded-2xl bg-[#1A1A1A] border border-white/10 shadow-inner flex flex-col items-center justify-center text-center">
                <Image
                  src="/e-verify.png"
                  alt="Official E-Verify Federal Employment Verification Program"
                  width={220}
                  height={90}
                  className="object-contain w-full h-auto"
                />
                <div className="mt-3 flex items-center gap-1.5 text-[11px] font-semibold text-emerald-400">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                  Active Participant
                </div>
              </div>

              <div className="flex-1 text-center md:text-left">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-emerald-400 text-[11px] font-semibold uppercase tracking-wider mb-3">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  U.S. Federal Compliance Authorization
                </div>
                <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-white mb-2">
                  An E-Verified US Firm
                </h3>
                <p className="text-[15px] sm:text-[16px] text-white/80 leading-relaxed mb-4">
                  TechAxis Global LLC is an official participant in the U.S. Department of Homeland Security (DHS) and Social Security Administration (SSA) E-Verify program. We electronically confirm the employment eligibility of all newly hired employees across our United States operations.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-[13px] text-white/70 mb-5">
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#B42318]"></span>
                    <span>STEM OPT Extensions Eligible</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-400"></span>
                    <span>Federal Work Authorization Verified</span>
                  </div>
                </div>
                <p className="text-[12px] text-white/50 leading-relaxed border-t border-white/10 pt-4">
                  TechAxis Global LLC is an Equal Opportunity Employer. We evaluate qualified applicants without regard to race, color, religion, sex, sexual orientation, gender identity, national origin, disability, veteran status, or other legally protected characteristics under federal, state, and local laws.
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Application Form Modal (Pre-filled role, resume upload, direct submission) */}
      <JobApplicationModal
        position={selectedPosition}
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedPosition(null);
        }}
      />
    </>
  );
}
