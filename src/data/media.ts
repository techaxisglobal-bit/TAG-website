export type MediaSlot = {
  mp4?: string;
  webm?: string;
  poster?: string;
  image?: string;
  alt: string;
  credit?: string;
  license?: string;
};

export const mediaManifest: Record<string, MediaSlot> = {
  "home-hero": {
    mp4: "/media/video/home-hero.mp4",
    webm: "/media/video/home-hero.webm",
    poster: "/media/posters/home-hero.jpg",
    alt: "Abstract data network in white and soft blues",
  },
  "home-film": {
    mp4: "/media/video/brand-film.mp4",
    poster: "/media/posters/brand-film.jpg",
    alt: "TAG Brand Film",
  },
  "home-statement": {
    image: "/media/images/home-statement.webp",
    alt: "Bright modern office skyline",
  },
  "services-bi": {
    image: "/media/images/services-bi.webp",
    alt: "BI and Analytics Dashboard",
  },
  "services-data": {
    image: "/media/images/services-data.webp",
    alt: "Data Engineering Cloud",
  },
  "services-qlik": {
    image: "/media/images/services-qlik.webp",
    alt: "Qlik to Power BI Migration Flow",
  },
  "services-staffing": {
    image: "/media/images/services-staffing.webp",
    alt: "IT Consulting and Staffing Collaboration",
  },
  "home-cta": {
    mp4: "/media/video/home-cta.mp4",
    poster: "/media/posters/home-cta.jpg",
    alt: "Business team collaboration in bright office",
  },
  "about-hero": {
    mp4: "/media/video/about-hero.mp4",
    poster: "/media/posters/about-hero.jpg",
    alt: "Professional team meeting in a bright modern office",
  },
  "about-values": {
    image: "/media/images/about-values.webp",
    alt: "Subtle textured office background",
  },
  "services-hero": {
    mp4: "/media/video/services-hero.mp4",
    poster: "/media/posters/services-hero.jpg",
    alt: "Data visualization charts in light mode",
  },
  "services-tile-0": {
    image: "/media/images/services-tile-bi.webp",
    alt: "BI Dashboard",
  },
  "services-tile-1": {
    image: "/media/images/services-tile-data.webp",
    alt: "Data Engineering Graphic",
  },
  "services-tile-2": {
    image: "/media/images/services-tile-migration.webp",
    alt: "Data Migration Graphic",
  },
  "services-tile-3": {
    image: "/media/images/services-tile-staffing.webp",
    alt: "Consulting Graphic",
  },
  "services-clients": {
    image: "/media/images/services-clients.webp",
    alt: "Blurred bright boardroom",
  },
  "industries-hero": {
    mp4: "/media/video/industries-hero.mp4",
    poster: "/media/posters/industries-hero.jpg",
    alt: "City skyline aerial daylight",
  },
  "ind-finance": { image: "/media/images/ind-finance.webp", alt: "Finance towers" },
  "ind-health": { image: "/media/images/ind-health.webp", alt: "Modern lab" },
  "ind-retail": { image: "/media/images/ind-retail.webp", alt: "Bright store logistics" },
  "ind-mfg": { image: "/media/images/ind-mfg.webp", alt: "Factory floor" },
  "ind-tech": { image: "/media/images/ind-tech.webp", alt: "Data center" },
  "ind-staff": { image: "/media/images/ind-staff.webp", alt: "Meeting room" },
  "careers-hero": {
    mp4: "/media/video/careers-hero.mp4",
    poster: "/media/posters/careers-hero.jpg",
    alt: "Diverse team collaborating in a bright modern office",
  },
  "careers-dev": { image: "/media/images/careers-dev.webp", alt: "Professional workshop" },
  "careers-culture": { image: "/media/images/careers-culture.webp", alt: "Group smiling" },
  "careers-projects": { image: "/media/images/careers-projects.webp", alt: "Coding on screens" },
  "careers-cta": {
    image: "/media/images/careers-cta.webp",
    alt: "Office windows and daylight",
  },
  "contact-hero": {
    image: "/media/images/contact-hero.webp",
    alt: "Bright modern office lobby blurred",
  }
};
