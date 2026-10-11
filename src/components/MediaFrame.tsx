"use client";
import { ReactNode } from "react";
import BackgroundMedia, { OverlayType } from "./BackgroundMedia";

interface Props {
  slotKey?: string;
  children: ReactNode;
  className?: string;
  overlay?: OverlayType;
  overlayOpacity?: number;
}

export default function MediaFrame({ 
  slotKey, 
  children, 
  className = "",
  overlay = "white-full",
  overlayOpacity = 0.8
}: Props) {
  return (
    <div className={`relative overflow-hidden rounded-[28px] group transition-all duration-300 hover:shadow-[0_8px_30px_rgba(0,0,0,0.06)] ${className}`}>
      {slotKey && (
        <div className="absolute inset-0 transition-transform duration-[1.2s] ease-out group-hover:scale-[1.06]">
          <BackgroundMedia 
            slotKey={slotKey} 
            overlay={overlay} 
            overlayOpacity={overlayOpacity}
            fallbackType="none" // Frames just stay clean if missing
          />
        </div>
      )}
      <div className="relative z-10 p-8 md:p-12 h-full flex flex-col">
        {children}
      </div>
    </div>
  );
}
