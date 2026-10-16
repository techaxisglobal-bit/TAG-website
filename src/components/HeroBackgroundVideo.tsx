"use client";

import { useEffect, useRef, useState } from "react";
import { Play, Pause } from "lucide-react";

/**
 * =======================================================================
 * HOME HERO BACKGROUND VIDEO COMPONENT
 * =======================================================================
 * Connects background video assets:
 *   - Desktop MP4:   public/assets/videos/hero.mp4
 *   - Mobile MP4:    public/assets/videos/hero-mobile.mp4
 *   - Poster Frame:  public/assets/images/hero-poster.jpg
 * 
 * If video files are missing or encounter an error, the component
 * gracefully falls back to the current hero background without breaking.
 * =======================================================================
 */

export default function HeroBackgroundVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [userPaused, setUserPaused] = useState(false);

  // 1. Detect screen width for responsive video loading (<768px loads hero-mobile.mp4)
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // 2. Accessibility: Check for prefers-reduced-motion
  useEffect(() => {
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(motionQuery.matches);

    const handleMotionChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };

    motionQuery.addEventListener("change", handleMotionChange);
    return () => motionQuery.removeEventListener("change", handleMotionChange);
  }, []);

  // 3. Pause video when hero scrolls out of view, resume when visible (IntersectionObserver)
  useEffect(() => {
    const video = videoRef.current;
    const container = containerRef.current;
    if (!video || !container) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) {
          if (!video.paused) {
            video.pause();
          }
        } else {
          // Resume only if the user didn't explicitly pause and reduced motion is off
          if (!userPaused && !prefersReducedMotion && !hasError) {
            video.play().catch(() => {
              // Browser autoplay policy catch
            });
            setIsPlaying(true);
          }
        }
      },
      {
        threshold: 0.15,
      }
    );

    observer.observe(container);

    return () => {
      observer.disconnect();
    };
  }, [userPaused, prefersReducedMotion, hasError]);

  // 4. Handle Play / Pause manual toggle button
  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;

    if (isPlaying) {
      video.pause();
      setIsPlaying(false);
      setUserPaused(true);
    } else {
      video.play().catch(() => {});
      setIsPlaying(true);
      setUserPaused(false);
    }
  };

  // If there's an unrecoverable error loading the video, fall back silently to current hero background
  if (hasError) {
    return null;
  }

  return (
    <div
      ref={containerRef}
      className="hero-video-container"
      id="heroVideoContainer"
      aria-hidden="true"
    >
      {/* If prefers-reduced-motion is active, hide video and show static poster frame */}
      {prefersReducedMotion ? (
        <img
          src="/assets/images/hero-poster.jpg"
          alt="TechAxis Global Enterprise Technology"
          className="hero-video-poster"
        />
      ) : (
        <video
          ref={videoRef}
          className="hero-video-element"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster="/assets/images/hero-poster.jpg"
          onError={() => setHasError(true)}
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
        >
          {/* On screens under 768px, loads lighter hero-mobile.mp4 */}
          {isMobile ? (
            <source src="/assets/videos/hero-mobile.mp4" type="video/mp4" />
          ) : (
            <source src="/assets/videos/hero.mp4" type="video/mp4" />
          )}
          {/* Fallback poster for browsers without video tag support */}
          <img src="/assets/images/hero-poster.jpg" alt="Hero background poster" />
        </video>
      )}

      {/* Light dark overlay (rgba(0,0,0,0.35)) ensuring text readability while letting video shine */}
      <div className="hero-video-overlay" />

      {/* Small Pause/Play button in hero corner styled to match the site's existing colors */}
      {!prefersReducedMotion && (
        <button
          type="button"
          onClick={togglePlay}
          className="hero-video-toggle"
          title={isPlaying ? "Pause background video" : "Play background video"}
          aria-label={isPlaying ? "Pause background video" : "Play background video"}
        >
          {isPlaying ? (
            <Pause className="w-3.5 h-3.5" />
          ) : (
            <Play className="w-3.5 h-3.5 translate-x-[0.5px]" />
          )}
        </button>
      )}
    </div>
  );
}
