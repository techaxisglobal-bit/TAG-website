# Apple Design & Motion Standards for TechAxis Global

This repository adheres to Apple's Human Interface Guidelines (HIG) and fluid, physical motion design principles (WWDC Designing Fluid Interfaces).

## 1. Visual Aesthetics & Look Standards (HIG)
- **Typography**:
  - Font stack: `-apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", Inter, sans-serif`.
  - Optical sizing & negative tracking:
    - Display titles: negative tracking (`letter-spacing: -0.03em`), line-height `1.05 - 1.1`.
    - Section headers: negative tracking (`letter-spacing: -0.025em`), line-height `1.15`.
    - Body text: `16px - 17px`, line-height `1.5 - 1.6`, neutral tracking.
    - Uppercase tags/badges: positive tracking (`letter-spacing: 0.05em` / `tracking-widest`).
- **Color Palette & Contrast**:
  - Primary text: `--color-apple-text` (`#1D1D1F`).
  - Secondary text: `--color-apple-text-sec` (`#86868B`).
  - Primary surface: `--color-apple-surface` (`#F5F5F7`).
  - Cards: `--color-apple-card` (`#FFFFFF`).
  - Hairlines: `--color-apple-hairline` (`rgba(0, 0, 0, 0.06)`).
  - Brand accents: Crimson `#B42318`, Gold `#D97706`.
- **Materials & Liquid Glass**:
  - Translucent chrome: `backdrop-filter: blur(20px) saturate(180%)`.
  - Crisp 1px translucent borders (`border: 1px solid rgba(0, 0, 0, 0.08)` or `rgba(255, 255, 255, 0.15)`).
  - Apple Squircle corners: `rounded-2xl` (16px) or `rounded-3xl` (24px - 28px).
  - Subtle specular highlights on cards rather than heavy muddy dropshadows.

## 2. Motion & Interaction Standards (WWDC Fluid Motion)
- **Instant Response**:
  - Provide immediate feedback on pointer-down.
  - Buttons have instant active press scale: `active:scale-[0.97]` with `transition: transform 100ms ease-out`.
- **Spring Physics**:
  - UI settling & reveals use critically damped springs (`damping: 1.0`, `bounce: 0`, response `0.35s - 0.4s`).
  - Momentum flick interactions use slight bounce (`bounce: 0.15 - 0.2`, `damping: ~0.8`).
- **Interruptible Transitions**:
  - Never lock UI during animation; animate from presentation/current state.
  - Symmetric spatial paths: Modals, drawers, and menus enter and dismiss along identical paths.
- **Accessibility**:
  - Honor `@media (prefers-reduced-motion: reduce)` with instant or subtle opacity cross-fades.
  - Honor `@media (prefers-reduced-transparency: reduce)` with opaque backdrops.
