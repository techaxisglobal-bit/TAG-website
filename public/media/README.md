# Media Assets & Fallbacks

This project uses an Apple-inspired media layer built on a progressive-enhancement strategy. It is designed to never break the build if a file is missing. If a video or image file is not found, the `<BackgroundMedia>` and `<MediaFrame>` components will gracefully render a CSS-based fallback (e.g. `GradientMesh` or `DataNetwork`) or a clean tile without errors.

## Directory Structure
Place your actual media files in the `public/` directory following this structure:
```
/public/media/
  /video/
    home-hero.mp4
    home-hero.webm
    brand-film.mp4
    ...
  /posters/
    home-hero.jpg
    brand-film.jpg
    ...
  /images/
    home-statement.webp
    ...
```

## Media Specifications

### Videos
- **Dimensions:** 1920x1080 (Desktop), 1280x720 (Mobile variant)
- **Duration:** 8–15 seconds (seamless loop)
- **Framerate:** 24–30fps
- **Size:** Target < 2.5 MB per clip
- **Audio:** None. All background videos must have audio tracks removed.
- **Formats:** Provide WebM (VP9) as primary, MP4 (H.264) as fallback.

### Images
- **Dimensions:** 2400px wide (full-bleed backgrounds), 1200px wide (tiles/frames)
- **Format:** WebP or AVIF
- **Size:** Target < 250 KB each

## FFmpeg Compression Commands

Use these commands to prepare your media before placing them in the directory:

**1. Create MP4 (H.264):**
```bash
ffmpeg -i input.mp4 -an -vf "scale=1920:-2,fps=24" -c:v libx264 -crf 28 -preset slow -pix_fmt yuv420p -movflags +faststart output.mp4
```

**2. Create WebM (VP9):**
```bash
ffmpeg -i input.mp4 -an -vf "scale=1920:-2,fps=24" -c:v libvpx-vp9 -crf 34 -b:v 0 output.webm
```

**3. Generate Poster Image:**
```bash
ffmpeg -i input.mp4 -frames:v 1 -q:v 3 poster.jpg
```

## Swapping Media

To add or update a file:
1. Process it using the FFmpeg commands above.
2. Place it in the appropriate `/public/media/` folder.
3. Update `src/data/media.ts` to map the slot key to the new file path.
4. Record the license in `/MEDIA_CREDITS.md`.

## Accessibility (A11y)
- Videos are paused automatically when `prefers-reduced-motion` or slow network conditions are detected.
- Looping videos have a Pause/Play button (bottom right) meeting WCAG 2.2.2 requirements.
- Overlays (e.g. `white-full`, `frost`) are used to guarantee text contrast (4.5:1 minimum) over media.
