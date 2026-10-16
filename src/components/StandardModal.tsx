"use client";

import { useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  TrendingDown,
  Cpu,
  Award,
  Maximize,
  ShieldCheck,
  CheckCircle2,
  Sparkles
} from "lucide-react";

export interface StandardItem {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  icon: string;
  benchmark: string;
  metric: { value: string; label: string };
  pillars: Array<{ label: string; desc: string }>;
  ctaText: string;
  ctaHref: string;
}

interface StandardModalProps {
  isOpen: boolean;
  onClose: () => void;
  standards: StandardItem[];
  activeId: string | null;
  onSelectStandard: (id: string) => void;
}

const iconMap: Record<string, any> = {
  TrendingDown,
  Cpu,
  Award,
  Maximize
};

export default function StandardModal({
  isOpen,
  onClose,
  standards,
  activeId,
  onSelectStandard
}: StandardModalProps) {
  const currentIndex = standards.findIndex((item) => item.id === activeId);
  const activeStandard = standards[currentIndex] || standards[0];

  // Handle ESC and Arrow Key navigation
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      } else if (e.key === "ArrowRight") {
        const nextIndex = (currentIndex + 1) % standards.length;
        onSelectStandard(standards[nextIndex].id);
      } else if (e.key === "ArrowLeft") {
        const prevIndex = (currentIndex - 1 + standards.length) % standards.length;
        onSelectStandard(standards[prevIndex].id);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [isOpen, currentIndex, standards, onClose, onSelectStandard]);

  if (!isOpen || !activeStandard) return null;

  const IconComp = iconMap[activeStandard.icon] || Cpu;
  const prevStandard = standards[(currentIndex - 1 + standards.length) % standards.length];
  const nextStandard = standards[(currentIndex + 1) % standards.length];

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/60 backdrop-blur-md"
          aria-hidden="true"
        />

        {/* Modal Sheet Container */}
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-title"
          initial={{ opacity: 0, scale: 0.95, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 16 }}
          transition={{ type: "spring", damping: 28, stiffness: 320 }}
          className="relative bg-white text-[#1D1D1F] rounded-[28px] border border-black/[0.08] shadow-[0_24px_64px_rgba(0,0,0,0.22)] w-full max-w-3xl overflow-hidden my-auto z-10"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Top Header Bar */}
          <div className="relative px-6 sm:px-8 pt-7 pb-5 border-b border-black/[0.06] bg-gradient-to-b from-[#F9F9FB] to-white">
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-center gap-3.5">
                <div className="w-12 h-12 rounded-2xl bg-[#B42318]/10 text-[#B42318] flex items-center justify-center flex-shrink-0 shadow-2xs">
                  <IconComp className="w-6 h-6" />
                </div>
                <div>
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-black/[0.04] text-[11px] font-semibold text-[#86868B] uppercase tracking-wider mb-1">
                    <Sparkles className="w-3 h-3 text-[#B42318]" />
                    TAG Operational Standard
                  </div>
                  <h2 id="modal-title" className="text-2xl sm:text-3xl font-bold tracking-tight text-[#1D1D1F]">
                    {activeStandard.title}
                  </h2>
                </div>
              </div>

              {/* Close Button */}
              <button
                onClick={onClose}
                className="w-9 h-9 rounded-full bg-black/[0.05] hover:bg-black/[0.1] text-[#86868B] hover:text-[#1D1D1F] flex items-center justify-center transition-colors cursor-pointer flex-shrink-0"
                aria-label="Close dialog"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-[14px] sm:text-[15px] text-[#86868B] mt-2.5 font-normal leading-relaxed">
              {activeStandard.subtitle}
            </p>

            {/* Standard Quick-Switch Pills */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1 mt-5 scrollbar-none">
              {standards.map((item) => {
                const isActive = item.id === activeStandard.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => onSelectStandard(item.id)}
                    className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all duration-200 cursor-pointer ${
                      isActive
                        ? "bg-[#B42318] text-white shadow-xs"
                        : "bg-black/[0.04] hover:bg-black/[0.08] text-[#1D1D1F]"
                    }`}
                  >
                    {item.title}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Modal Body */}
          <div className="px-6 sm:px-8 py-6 max-h-[60vh] overflow-y-auto space-y-6">
            {/* Benchmark Callout with Key Metric */}
            <div className="bg-gradient-to-r from-[#F5F5F7] via-[#FAFAFC] to-[#F5F5F7] rounded-2xl p-5 border border-black/[0.06] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="space-y-1 max-w-lg">
                <div className="flex items-center gap-1.5 text-xs font-bold text-[#B42318] uppercase tracking-wide">
                  <CheckCircle2 className="w-4 h-4 text-[#B42318]" />
                  Verified SLA Benchmark
                </div>
                <p className="text-[13.5px] sm:text-[14px] text-[#1D1D1F] font-medium leading-relaxed">
                  {activeStandard.benchmark}
                </p>
              </div>

              <div className="bg-white rounded-xl px-4 py-3 border border-black/[0.08] text-center flex-shrink-0 shadow-2xs w-full sm:w-auto">
                <div className="text-2xl sm:text-3xl font-extrabold text-[#B42318] leading-none">
                  {activeStandard.metric.value}
                </div>
                <div className="text-[11px] font-semibold text-[#86868B] uppercase tracking-wider mt-1">
                  {activeStandard.metric.label}
                </div>
              </div>
            </div>

            {/* Core Pillars Grid */}
            <div>
              <h3 className="text-xs uppercase tracking-wider font-bold text-[#86868B] mb-3">
                Core Engineering & Delivery Protocols
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {activeStandard.pillars.map((pillar, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-xl border border-black/[0.06] bg-white hover:border-black/[0.12] transition-colors"
                  >
                    <div className="flex items-center gap-2 mb-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#B42318]"></span>
                      <h4 className="text-[13.5px] font-bold text-[#1D1D1F] tracking-tight">
                        {pillar.label}
                      </h4>
                    </div>
                    <p className="text-[12.5px] text-[#86868B] leading-relaxed">
                      {pillar.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Compliance & Architecture Guarantee Note */}
            <div className="flex items-center gap-2.5 text-xs text-[#86868B] pt-1 border-t border-black/[0.04]">
              <ShieldCheck className="w-4 h-4 text-emerald-600 flex-shrink-0" />
              <span>
                Backed by dual-continent architecture governance, SOC2/ISO aligned frameworks, and official U.S. E-Verify compliance.
              </span>
            </div>
          </div>

          {/* Modal Footer Bar */}
          <div className="px-6 sm:px-8 py-4 bg-[#F5F5F7] border-t border-black/[0.06] flex flex-col sm:flex-row items-center justify-between gap-3">
            {/* Quick Prev / Next navigation */}
            <div className="flex items-center gap-2 text-xs font-medium text-[#86868B] order-2 sm:order-1">
              <button
                onClick={() => onSelectStandard(prevStandard.id)}
                className="inline-flex items-center gap-1 hover:text-[#1D1D1F] transition-colors cursor-pointer px-2 py-1 rounded-md hover:bg-black/[0.04]"
              >
                <ChevronLeft className="w-3.5 h-3.5" />
                <span>Prev: {prevStandard.title}</span>
              </button>
              <span>•</span>
              <button
                onClick={() => onSelectStandard(nextStandard.id)}
                className="inline-flex items-center gap-1 hover:text-[#1D1D1F] transition-colors cursor-pointer px-2 py-1 rounded-md hover:bg-black/[0.04]"
              >
                <span>Next: {nextStandard.title}</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Primary Action Button */}
            <div className="flex items-center gap-2.5 w-full sm:w-auto order-1 sm:order-2">
              <Link
                href={activeStandard.ctaHref}
                onClick={onClose}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#B42318] hover:bg-[#8E1010] text-white text-xs font-semibold px-5 py-2.5 rounded-full transition-all duration-200 shadow-xs cursor-pointer active:scale-95"
              >
                <span>{activeStandard.ctaText}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
