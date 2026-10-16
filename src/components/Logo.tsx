import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface LogoProps {
  variant?: 'full' | 'monogram' | 'dark-bg';
  className?: string;
  showText?: boolean;
}

export default function Logo({ variant = 'full', className = '', showText = true }: LogoProps) {
  const isDarkBg = variant === 'dark-bg';

  return (
    <Link
      href="/"
      className={`inline-flex items-center gap-3 sm:gap-3.5 group select-none ${className}`}
      aria-label="TechAxis Global Home"
    >
      {/* Prominent High-Definition TAG Logo Emblem */}
      <div className={`relative flex items-center justify-center flex-shrink-0 ${
        isDarkBg 
          ? "bg-white p-2 sm:p-2.5 rounded-xl shadow-sm border border-slate-200" 
          : "p-0.5"
      }`}>
        <Image
          src="/tag-logo-emblem.png"
          alt="TAG - TechAxis Global Logo"
          width={220}
          height={100}
          className="h-[44px] sm:h-[50px] md:h-[54px] w-auto object-contain transition-transform duration-300 group-hover:scale-105"
          priority
        />
      </div>

      {/* Bold Typography Lockup beside Logo */}
      {showText && (
        <div className="flex items-center gap-1.5 sm:gap-2">
          <span className={`text-[20px] sm:text-[23px] md:text-[25px] font-black tracking-tight leading-none transition-colors ${
            isDarkBg ? "text-white" : "text-[#0F172A] group-hover:text-[#B42318]"
          }`}>
            TechAxis
          </span>
          <span className="text-[20px] sm:text-[23px] md:text-[25px] font-black tracking-tight leading-none text-[#B42318]">
            Global
          </span>
        </div>
      )}
    </Link>
  );
}
