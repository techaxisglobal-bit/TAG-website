"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { mediaManifest } from "@/data/media";
import GradientMesh from "./GradientMesh";
import { Play, Pause } from "lucide-react";

export type OverlayType = "white-top" | "white-bottom" | "white-full" | "frost" | "none";

interface Props {
  slotKey: string;
  type?: "video" | "image";
  overlay?: OverlayType;
  overlayOpacity?: number;
  objectPosition?: string;
  priority?: boolean;
  parallax?: boolean;
  className?: string;
  fallbackType?: "mesh" | "none";
}

export default function BackgroundMedia({ 
  slotKey, 
  type = "image", 
  overlay = "none", 
  overlayOpacity = 1,
  objectPosition = "center",
  priority = false,
  parallax = false,
  className = "",
  fallbackType = "mesh"
}: Props) {
  const media = mediaManifest[slotKey];
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  
  const [canPlay, setCanPlay] = useState(false);
  const [useFallback, setUseFallback] = useState(!media);
  const [isPaused, setIsPaused] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    // Check reduced motion & connection
    const checkMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isMobile = window.innerWidth < 768;
    const connection = (navigator as any).connection;
    const slowConnection = connection && (connection.saveData || connection.effectiveType?.includes('2g') || connection.effectiveType?.includes('3g'));
    
    if (checkMotion || slowConnection) {
      setReducedMotion(true);
    }

    // Intersection Observer for pausing off-screen
    const observer = new IntersectionObserver((entries) => {
      if (!videoRef.current) return;
      if (entries[0].isIntersecting && !isPaused) {
        videoRef.current.play().catch(() => setUseFallback(true));
      } else {
        videoRef.current.pause();
      }
    }, { rootMargin: "300px" });

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }
    return () => observer.disconnect();
  }, [isPaused]);

  // Parallax effect
  useEffect(() => {
    if (!parallax || reducedMotion) return;
    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      if (rect.top < window.innerHeight && rect.bottom > 0) {
        const scrolled = window.scrollY;
        containerRef.current.style.transform = `translateY(${scrolled * 0.15}px) scale(${1 + scrolled * 0.0001})`;
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [parallax, reducedMotion]);

  if (useFallback) {
    return fallbackType === "mesh" ? <GradientMesh className={className} /> : null;
  }

  const isVideo = type === "video" && !reducedMotion && (media.mp4 || media.webm);
  const hasError = () => setUseFallback(true);

  return (
    <div className={`absolute inset-0 overflow-hidden -z-10 ${className}`}>
      <div ref={containerRef} className="absolute inset-0 w-full h-full will-change-transform origin-top">
        {isVideo ? (
          <>
            {/* Poster shown until video can play */}
            <Image
              src={media.poster || ""}
              alt={media.alt}
              fill
              priority={priority}
              className={`object-cover transition-opacity duration-1000 ${canPlay ? 'opacity-0' : 'opacity-100'}`}
              style={{ objectPosition }}
              onError={hasError}
            />
            <video
              ref={videoRef}
              autoPlay
              muted
              loop
              playsInline
              preload={priority ? "auto" : "metadata"}
              className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${canPlay ? 'opacity-100' : 'opacity-0'}`}
              style={{ objectPosition }}
              onCanPlay={() => setCanPlay(true)}
              onError={hasError}
              aria-hidden="true"
            >
              {media.webm && <source src={media.webm} type="video/webm" />}
              {media.mp4 && <source src={media.mp4} type="video/mp4" />}
            </video>

            {/* Accessibility: Play/Pause for looping video */}
            <button
              onClick={() => {
                if (videoRef.current) {
                  isPaused ? videoRef.current.play() : videoRef.current.pause();
                  setIsPaused(!isPaused);
                }
              }}
              className="absolute bottom-4 right-4 z-20 p-2 rounded-full bg-white/50 backdrop-blur-md text-apple-text hover:bg-white/80 transition-colors"
              aria-label={isPaused ? "Play background video" : "Pause background video"}
            >
              {isPaused ? <Play size={16} fill="currentColor" /> : <Pause size={16} fill="currentColor" />}
            </button>
          </>
        ) : (
          <Image
            src={media.image || media.poster || ""}
            alt={media.alt}
            fill
            priority={priority}
            className="object-cover"
            style={{ objectPosition }}
            onError={hasError}
          />
        )}
      </div>

      {/* Overlays */}
      {overlay === "white-bottom" && (
        <div className="absolute inset-0 bg-gradient-to-t from-white via-white/40 to-transparent" style={{ opacity: overlayOpacity }} />
      )}
      {overlay === "white-top" && (
        <div className="absolute inset-0 bg-gradient-to-b from-white via-white/40 to-transparent" style={{ opacity: overlayOpacity }} />
      )}
      {overlay === "white-full" && (
        <div className="absolute inset-0 bg-white" style={{ opacity: overlayOpacity }} />
      )}
      {overlay === "frost" && (
        <div className="absolute inset-0 bg-white/50 backdrop-blur-xl saturate-150" style={{ opacity: overlayOpacity }} />
      )}
    </div>
  );
}
