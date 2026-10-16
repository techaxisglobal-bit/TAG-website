/**
 * =======================================================================
 * HOME PAGE HERO BACKGROUND VIDEO CONTROLLER (js/hero-video.js)
 * =======================================================================
 * Full-screen looping hero background video controller:
 * 1. Pause video when hero scrolls out of view, resume when visible (IntersectionObserver)
 * 2. If prefers-reduced-motion is enabled, hide video and show static poster
 * 3. On screens under 768px, load lighter hero-mobile.mp4
 * 4. Pause / play toggle button in hero corner matching site colors
 * 5. Drop-in custom file paths with graceful fallback if files are missing:
 *    - Desktop MP4:   assets/videos/hero.mp4
 *    - Mobile MP4:    assets/videos/hero-mobile.mp4
 *    - Poster Image:  assets/images/hero-poster.jpg
 * =======================================================================
 */

(function () {
  'use strict';

  document.addEventListener('DOMContentLoaded', function () {
    const heroSection = document.querySelector('section');
    if (!heroSection) return;

    const videoContainer = document.getElementById('heroVideoContainer');
    const video = heroSection.querySelector('.hero-video-element');
    const toggleBtn = heroSection.querySelector('.hero-video-toggle');

    if (!video) return;

    // 1. Check prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    function checkReducedMotion(mediaQuery) {
      if (mediaQuery.matches) {
        video.pause();
        video.style.display = 'none';
      } else {
        video.style.display = 'block';
        video.play().catch(function () {});
      }
    }
    checkReducedMotion(prefersReducedMotion);
    if (prefersReducedMotion.addEventListener) {
      prefersReducedMotion.addEventListener('change', checkReducedMotion);
    }

    // 2. Responsive mobile video swap (< 768px)
    function checkScreenSize() {
      const isMobile = window.innerWidth < 768;
      const currentSrc = video.currentSrc || '';
      if (isMobile && !currentSrc.includes('hero-mobile.mp4')) {
        const mobileSource = video.querySelector('source[src*="hero-mobile"]');
        if (mobileSource) {
          video.src = mobileSource.src;
          video.load();
          video.play().catch(function () {});
        }
      }
    }
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);

    // 3. Pause when scrolled out of view, resume when visible
    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (entry) {
            if (!entry.isIntersecting) {
              if (!video.paused) video.pause();
            } else {
              if (!prefersReducedMotion.matches) {
                video.play().catch(function () {});
              }
            }
          });
        },
        { threshold: 0.15 }
      );
      observer.observe(heroSection);
    }

    // 4. Fallback if video files are missing or broken
    video.addEventListener('error', function () {
      if (videoContainer) {
        videoContainer.style.display = 'none';
      }
    });

    // 5. Pause/Play button handler
    if (toggleBtn) {
      toggleBtn.addEventListener('click', function () {
        if (video.paused) {
          video.play().catch(function () {});
        } else {
          video.pause();
        }
      });
    }
  });
})();
