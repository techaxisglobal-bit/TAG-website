"use client";

import { useState, useEffect, useRef } from "react";
import { 
  X, 
  Upload, 
  CheckCircle2, 
  AlertCircle, 
  Loader2, 
  FileText, 
  ArrowRight, 
  Briefcase, 
  MapPin, 
  Clock, 
  ShieldCheck, 
  Check, 
  ChevronLeft,
  Mail,
  Building2,
  Sparkles
} from "lucide-react";
import { JobPosition } from "@/data/careers";

interface JobApplicationModalProps {
  position: JobPosition | null;
  isOpen: boolean;
  onClose: () => void;
  initialTab?: "details" | "apply";
}

export default function JobApplicationModal({
  position,
  isOpen,
  onClose,
  initialTab = "details"
}: JobApplicationModalProps) {
  // Tab state: "details" (default, displays job description) or "apply" (application form)
  const [activeTab, setActiveTab] = useState<"details" | "apply">(initialTab);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [honeypot, setHoneypot] = useState("");
  const [resumeFile, setResumeFile] = useState<File | null>(null);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const fileInputRef = useRef<HTMLInputElement>(null);
  const nameInputRef = useRef<HTMLInputElement>(null);
  const modalBodyRef = useRef<HTMLDivElement>(null);

  // Reset form and default to "details" when opened for a position
  useEffect(() => {
    if (isOpen) {
      setActiveTab(initialTab);
      setName("");
      setEmail("");
      setPhone("");
      setMessage("");
      setHoneypot("");
      setResumeFile(null);
      setIsSuccess(false);
      setErrorMessage("");
    }
  }, [isOpen, position, initialTab]);

  // Lock body scroll when modal is active
  useEffect(() => {
    if (isOpen) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = originalOverflow;
      };
    }
  }, [isOpen]);

  // Handle ESC key to close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen || !position) return null;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const validExtensions = [".pdf", ".doc", ".docx"];
      const fileExt = file.name.slice(file.name.lastIndexOf(".")).toLowerCase();

      if (!validExtensions.includes(fileExt)) {
        setErrorMessage("Invalid file format. Please upload a PDF, DOC, or DOCX document.");
        setResumeFile(null);
        return;
      }

      // Limit file size to 5MB strictly as required
      if (file.size > 5 * 1024 * 1024) {
        setErrorMessage("File size exceeds 5MB limit. Please upload a smaller file.");
        setResumeFile(null);
        return;
      }

      setResumeFile(file);
      setErrorMessage("");
    }
  };

  const handleTabSwitch = (tab: "details" | "apply") => {
    setActiveTab(tab);
    setErrorMessage("");
    if (modalBodyRef.current) {
      modalBodyRef.current.scrollTop = 0;
    }
    if (tab === "apply") {
      setTimeout(() => {
        nameInputRef.current?.focus();
      }, 150);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");

    // Frontend Validations
    const trimmedName = name.trim();
    const trimmedEmail = email.trim();
    const trimmedPhone = phone.trim();

    if (!trimmedName || trimmedName.length < 2) {
      setErrorMessage("Please enter your full name (at least 2 characters).");
      return;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!trimmedEmail || !emailPattern.test(trimmedEmail)) {
      setErrorMessage("Please enter a valid email address.");
      return;
    }

    if (!trimmedPhone || trimmedPhone.length < 7) {
      setErrorMessage("Please enter a valid phone number.");
      return;
    }

    if (!resumeFile) {
      setErrorMessage("Resume upload is required. Please attach a PDF, DOC, or DOCX file (up to 5MB).");
      return;
    }

    setIsSubmitting(true);

    try {
      const formData = new FormData();
      formData.append("name", trimmedName);
      formData.append("email", trimmedEmail);
      formData.append("phone", trimmedPhone);
      formData.append("role", position.title);
      formData.append("message", message.trim());
      formData.append("website_hp", honeypot); // Honeypot spam check
      formData.append("resume", resumeFile);

      const res = await fetch("/api/apply", {
        method: "POST",
        body: formData
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Something went wrong. Please try again.");
      }

      // Reset form state on successful submission
      setName("");
      setEmail("");
      setPhone("");
      setMessage("");
      setHoneypot("");
      setResumeFile(null);
      setIsSuccess(true);
    } catch (err: any) {
      setErrorMessage(err.message || "Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-6 overflow-hidden"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-md transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal Dialog Card */}
      <div
        className="relative w-full max-w-3xl max-h-[calc(100dvh-2rem)] sm:max-h-[calc(100dvh-3.5rem)] flex flex-col bg-white rounded-[24px] sm:rounded-[28px] shadow-[0_24px_64px_rgba(0,0,0,0.25)] border border-black/[0.08] overflow-hidden z-10 animate-in fade-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Top Header Bar */}
        <div className="flex-shrink-0 bg-gradient-to-b from-[#FAFAFA] to-white border-b border-black/[0.06] px-6 py-4.5 sm:px-8 sm:py-5 relative">
          <div className="flex items-start justify-between gap-4">
            <div className="pr-2 flex-1">
              {/* Meta Tags Row */}
              <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-[#B42318]/10 text-[#B42318]">
                  <Briefcase className="w-3 h-3" />
                  {position.department}
                </span>
                <span className="inline-flex items-center gap-1 text-[11.5px] text-zinc-500 font-medium">
                  <MapPin className="w-3 h-3 text-zinc-400" />
                  {position.location}
                </span>
                <span className="text-[11.5px] text-zinc-400 font-medium">
                  • {position.type}
                </span>
                {position.experienceLevel && (
                  <span className="inline-flex items-center gap-1 text-[11.5px] text-zinc-500 font-medium bg-zinc-100 px-2 py-0.5 rounded-full">
                    <Clock className="w-3 h-3 text-zinc-400" />
                    {position.experienceLevel}
                  </span>
                )}
              </div>

              {/* Position Title */}
              <h2 id="modal-title" className="text-xl sm:text-2xl font-bold text-zinc-950 tracking-tight leading-snug">
                {position.title}
              </h2>
            </div>

            {/* Close Button */}
            <button
              type="button"
              onClick={onClose}
              className="w-9 h-9 rounded-full bg-black/[0.05] hover:bg-black/[0.1] active:scale-95 text-zinc-600 hover:text-zinc-950 flex items-center justify-center transition-all cursor-pointer flex-shrink-0 mt-0.5"
              aria-label="Close dialog"
              title="Close (Esc)"
            >
              <X className="w-4.5 h-4.5" />
            </button>
          </div>

          {/* Segmented Control Tabs: Job Details vs Apply Online */}
          {!isSuccess && (
            <div className="flex items-center gap-2 mt-4 p-1 bg-zinc-100 rounded-xl w-fit">
              <button
                type="button"
                onClick={() => handleTabSwitch("details")}
                className={`px-4 py-1.5 rounded-lg text-[13px] font-semibold transition-all duration-150 cursor-pointer ${
                  activeTab === "details"
                    ? "bg-white text-zinc-950 shadow-2xs"
                    : "text-zinc-600 hover:text-zinc-950"
                }`}
              >
                <span>Job Description</span>
              </button>
              <button
                type="button"
                onClick={() => handleTabSwitch("apply")}
                className={`px-4 py-1.5 rounded-lg text-[13px] font-semibold transition-all duration-150 cursor-pointer flex items-center gap-1.5 ${
                  activeTab === "apply"
                    ? "bg-white text-[#B42318] shadow-2xs"
                    : "text-zinc-600 hover:text-zinc-950"
                }`}
              >
                <span>Apply for this Role</span>
                <span className="w-1.5 h-1.5 rounded-full bg-[#B42318]"></span>
              </button>
            </div>
          )}
        </div>

        {/* Modal Body with internal scroll */}
        <div ref={modalBodyRef} className="p-6 sm:p-8 overflow-y-auto flex-1 overscroll-contain">
          
          {/* =========================================================
              VIEW 1: JOB DETAILS & DESCRIPTION (Default View)
              ========================================================= */}
          {activeTab === "details" && !isSuccess && (
            <div className="space-y-7 animate-in fade-in duration-150">
              
              {/* About the Role */}
              <div>
                <h3 className="text-[13px] font-bold text-zinc-400 uppercase tracking-wider mb-2">
                  About the Role
                </h3>
                <p className="text-[15px] sm:text-[15.5px] text-zinc-800 leading-relaxed">
                  {position.overview}
                </p>
              </div>

              {/* Key Responsibilities */}
              {position.responsibilities && position.responsibilities.length > 0 && (
                <div>
                  <h3 className="text-[13px] font-bold text-zinc-400 uppercase tracking-wider mb-3">
                    Key Responsibilities
                  </h3>
                  <ul className="space-y-2.5">
                    {position.responsibilities.map((resp, idx) => (
                      <li key={idx} className="flex items-start gap-3 text-[14px] sm:text-[14.5px] text-zinc-700 leading-relaxed">
                        <span className="w-5 h-5 rounded-full bg-[#B42318]/10 text-[#B42318] flex items-center justify-center flex-shrink-0 mt-0.5">
                          <Check className="w-3 h-3 stroke-[2.5]" />
                        </span>
                        <span>{resp}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Qualifications & Requirements */}
              {position.requirements && position.requirements.length > 0 && (
                <div>
                  <h3 className="text-[13px] font-bold text-zinc-400 uppercase tracking-wider mb-3">
                    Qualifications & Requirements
                  </h3>
                  <ul className="space-y-2.5">
                    {position.requirements.map((req, idx) => (
                      <li key={idx} className="flex items-start gap-3 text-[14px] sm:text-[14.5px] text-zinc-700 leading-relaxed">
                        <span className="w-5 h-5 rounded-full bg-zinc-100 text-zinc-700 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <Check className="w-3 h-3 stroke-[2.5]" />
                        </span>
                        <span>{req}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Core Skill Tags */}
              {position.skills && position.skills.length > 0 && (
                <div>
                  <h3 className="text-[13px] font-bold text-zinc-400 uppercase tracking-wider mb-2.5">
                    Core Technical Competencies
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {position.skills.map((skill) => (
                      <span
                        key={skill}
                        className="px-3 py-1 rounded-full bg-zinc-100 text-zinc-800 text-[12px] font-medium border border-zinc-200/70"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Work Authorization Notice */}
              <div className="p-4 rounded-2xl bg-zinc-50 border border-zinc-200/80 flex items-start gap-3 text-[13px] text-zinc-600">
                <ShieldCheck className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-zinc-900 mb-0.5">
                    E-Verify Verified Firm & Work Authorization
                  </p>
                  <p className="leading-relaxed">
                    TechAxis Global LLC is an official E-Verify employer. We support STEM OPT extension eligibility and evaluate candidates based on qualifications without regard to protected characteristics.
                  </p>
                </div>
              </div>

              {/* =========================================================
                  AT THE BOTTOM: THE APPLY OPTION
                  ========================================================= */}
              <div className="pt-4 border-t border-zinc-200">
                <div className="bg-gradient-to-br from-zinc-900 to-zinc-950 text-white rounded-2xl p-6 sm:p-7 relative overflow-hidden shadow-lg">
                  <div className="absolute top-0 right-0 w-48 h-48 bg-[#B42318]/20 rounded-full blur-2xl pointer-events-none" />
                  
                  <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5">
                    <div>
                      <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white/10 text-emerald-400 text-[11px] font-semibold mb-2">
                        <Sparkles className="w-3 h-3" />
                        <span>Ready to take the next step?</span>
                      </div>
                      <h4 className="text-lg sm:text-xl font-bold text-white tracking-tight">
                        Apply for {position.title}
                      </h4>
                      <p className="text-[13.5px] text-zinc-300 mt-1 max-w-md">
                        Submit your resume directly to our recruitment specialists. We review all applications promptly.
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={() => handleTabSwitch("apply")}
                      className="w-full sm:w-auto bg-[#B42318] hover:bg-[#8E1010] active:scale-95 text-white font-semibold text-[14.5px] px-7 py-3.5 rounded-full transition-all duration-200 shadow-md flex items-center justify-center gap-2 cursor-pointer flex-shrink-0"
                    >
                      <span>Apply for this Role</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <p className="text-center text-[12.5px] text-zinc-500 pt-4">
                  Prefer direct email? Send your resume to{" "}
                  <a
                    href={`mailto:careers@techaxisglobal.com?subject=Application%20for%20${encodeURIComponent(position.title)}`}
                    className="text-[#B42318] hover:underline font-medium"
                  >
                    careers@techaxisglobal.com
                  </a>
                </p>
              </div>

            </div>
          )}

          {/* =========================================================
              VIEW 2: APPLICATION FORM
              ========================================================= */}
          {activeTab === "apply" && !isSuccess && (
            <div className="animate-in fade-in duration-150">
              
              {/* Back to Job Description Link */}
              <button
                type="button"
                onClick={() => handleTabSwitch("details")}
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-zinc-500 hover:text-zinc-950 transition-colors mb-4 cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Back to Job Description & Requirements</span>
              </button>

              <form onSubmit={handleSubmit} className="space-y-4.5" noValidate>
                {/* Spam Protection Honeypot Field */}
                <div className="hidden" aria-hidden="true" style={{ display: "none" }}>
                  <input
                    type="text"
                    name="website_hp"
                    value={honeypot}
                    onChange={(e) => setHoneypot(e.target.value)}
                    tabIndex={-1}
                    autoComplete="off"
                  />
                </div>

                {errorMessage && (
                  <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm flex items-start gap-2.5">
                    <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                    <span>{errorMessage}</span>
                  </div>
                )}

                {/* Position Read-only Badge/Input */}
                <div>
                  <label className="block text-[13px] font-semibold text-zinc-700 mb-1.5">
                    Applied Role
                  </label>
                  <div className="w-full bg-zinc-100/80 border border-zinc-200 rounded-xl px-4 py-2.5 text-[14.5px] font-semibold text-zinc-900 select-none flex items-center justify-between">
                    <span>{position.title}</span>
                    <span className="text-xs text-zinc-500 font-normal">{position.department}</span>
                  </div>
                </div>

                {/* Full Name */}
                <div>
                  <label htmlFor="applicant-name" className="block text-[13px] font-semibold text-zinc-700 mb-1.5">
                    Full Name <span className="text-[#B42318]">*</span>
                  </label>
                  <input
                    ref={nameInputRef}
                    id="applicant-name"
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. John Doe"
                    className="w-full bg-white border border-zinc-200 rounded-xl px-4 py-3 text-[14.5px] text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:border-[#B42318] focus:ring-2 focus:ring-[#B42318]/15 transition-all"
                  />
                </div>

                {/* Email & Phone grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="applicant-email" className="block text-[13px] font-semibold text-zinc-700 mb-1.5">
                      Email Address <span className="text-[#B42318]">*</span>
                    </label>
                    <input
                      id="applicant-email"
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="john@example.com"
                      className="w-full bg-white border border-zinc-200 rounded-xl px-4 py-3 text-[14.5px] text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:border-[#B42318] focus:ring-2 focus:ring-[#B42318]/15 transition-all"
                    />
                  </div>
                  <div>
                    <label htmlFor="applicant-phone" className="block text-[13px] font-semibold text-zinc-700 mb-1.5">
                      Phone Number <span className="text-[#B42318]">*</span>
                    </label>
                    <input
                      id="applicant-phone"
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+1 (555) 000-0000"
                      className="w-full bg-white border border-zinc-200 rounded-xl px-4 py-3 text-[14.5px] text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:border-[#B42318] focus:ring-2 focus:ring-[#B42318]/15 transition-all"
                    />
                  </div>
                </div>

                {/* Resume File Upload */}
                <div>
                  <label className="block text-[13px] font-semibold text-zinc-700 mb-1.5">
                    Resume Upload (PDF, DOC, DOCX up to 5MB) <span className="text-[#B42318]">*</span>
                  </label>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept=".pdf,.doc,.docx"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                  
                  {resumeFile ? (
                    <div className="p-3.5 rounded-xl border border-emerald-200 bg-emerald-50/60 flex items-center justify-between">
                      <div className="flex items-center gap-3 overflow-hidden">
                        <FileText className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                        <div className="truncate">
                          <p className="text-[14px] font-semibold text-zinc-900 truncate">
                            {resumeFile.name}
                          </p>
                          <p className="text-[12px] text-zinc-500">
                            {(resumeFile.size / (1024 * 1024)).toFixed(2)} MB
                          </p>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => setResumeFile(null)}
                        className="text-zinc-400 hover:text-red-600 transition-colors p-1 cursor-pointer"
                        title="Remove file"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ) : (
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="w-full border-2 border-dashed border-zinc-200 hover:border-[#B42318] bg-zinc-50/50 hover:bg-[#B42318]/5 rounded-xl p-5 text-center transition-all cursor-pointer group"
                    >
                      <Upload className="w-6 h-6 text-zinc-400 group-hover:text-[#B42318] mx-auto mb-1.5 transition-colors" />
                      <p className="text-[14px] font-semibold text-zinc-800 group-hover:text-[#B42318] transition-colors">
                        Click to choose file or drag here
                      </p>
                      <p className="text-[12px] text-zinc-500 mt-0.5">
                        PDF, DOCX, or DOC formats supported (max 5 MB)
                      </p>
                    </button>
                  )}
                </div>

                {/* Message / Cover Note */}
                <div>
                  <label htmlFor="applicant-message" className="block text-[13px] font-semibold text-zinc-700 mb-1.5">
                    Cover Note / Message (Optional)
                  </label>
                  <textarea
                    id="applicant-message"
                    rows={3}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Share a brief introduction, key certifications, or current location..."
                    className="w-full bg-white border border-zinc-200 rounded-xl px-4 py-3 text-[14px] text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:border-[#B42318] focus:ring-2 focus:ring-[#B42318]/15 transition-all resize-none"
                  />
                </div>

                {/* Action Buttons: Back + Submit */}
                <div className="pt-2 flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => handleTabSwitch("details")}
                    className="px-6 py-3.5 rounded-full border border-zinc-200 hover:border-zinc-300 hover:bg-zinc-100 text-zinc-700 font-semibold text-[14px] transition-all cursor-pointer"
                  >
                    View Details
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex-1 bg-[#B42318] hover:bg-[#8E1010] disabled:bg-zinc-300 text-white font-semibold py-3.5 rounded-full transition-all duration-200 shadow-sm flex items-center justify-center gap-2 cursor-pointer active:scale-98"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Submitting Application...</span>
                      </>
                    ) : (
                      <>
                        <span>Submit Application</span>
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </div>

                {/* Fallback Direct Email Link */}
                <p className="text-center text-[12.5px] text-zinc-500 pt-1">
                  Prefer email? Send resume to{" "}
                  <a
                    href={`mailto:careers@techaxisglobal.com?subject=Application%20for%20${encodeURIComponent(position.title)}`}
                    className="text-[#B42318] hover:underline font-medium"
                  >
                    careers@techaxisglobal.com
                  </a>
                </p>
              </form>
            </div>
          )}

          {/* =========================================================
              SUCCESS STATE
              ========================================================= */}
          {isSuccess && (
            <div className="text-center py-8 space-y-4 animate-in fade-in duration-200">
              <div className="w-16 h-16 bg-emerald-50 rounded-full flex items-center justify-center mx-auto text-emerald-600 border border-emerald-200 shadow-xs">
                <CheckCircle2 className="w-9 h-9" />
              </div>
              <h3 className="text-2xl font-bold text-zinc-950">
                Your application has been submitted successfully.
              </h3>
              <p className="text-zinc-600 max-w-md mx-auto text-[15px] leading-relaxed">
                Thank you for applying for <strong className="text-zinc-900">{position.title}</strong>. Our talent acquisition team has received your details and will contact you directly.
              </p>
              <div className="pt-4 flex items-center justify-center gap-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="bg-[#B42318] hover:bg-[#8E1010] text-white font-semibold px-8 py-3 rounded-full transition-all duration-200 shadow-sm cursor-pointer active:scale-98"
                >
                  Done
                </button>
              </div>
            </div>
          )}

        </div>

      </div>
    </div>
  );
}
