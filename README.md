# TechAxis Global LLC (TAG) - Enterprise IT Consulting Website

This is a modern, static-export friendly Next.js application built with React, Tailwind CSS v4, Framer Motion, and TypeScript. 
It follows an enterprise-grade aesthetic (clean, spacious, confident).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Tech Stack
- Next.js 15 (App Router)
- React 19
- Tailwind CSS v4
- Framer Motion (Animations)
- Lucide React (Icons)
- TypeScript

## Project Structure
- `src/app/`: Next.js App router pages (Home, About, Services, etc.)
- `src/components/`: Reusable React components (Header, Footer, Logo)
- `src/data/`: Content files to easily update text data without touching UI code.
- `src/app/globals.css`: Tailwind configuration and global design tokens (colors, typography).

## Editing Content
To change the phone number, email address, navigation links, or the text inside the services cards, edit `src/data/content.ts`.

## Deployment
This project is configured for standard Next.js deployment. You can deploy it easily on [Vercel](https://vercel.com/new) or export it as static HTML by adding `output: 'export'` to `next.config.mjs`.
