# NGNX (NairaX) Stablecoin Website

A modern, responsive website for NGNX, a NGN-pegged stablecoin for Nigerians, featuring a P2P exchange and yield generation. Built with Next.js 15, TypeScript, Tailwind CSS, GSAP, and Three.js.

## Tech Stack
- Next.js 15 (App Router)
- TypeScript
- Tailwind CSS
- GSAP (ScrollTrigger)
- Three.js (@react-three/fiber, @react-three/drei)
- Chart.js
- React Hook Form

## Setup
1. Clone the repository: `git clone <repo-url>`
2. Install dependencies: `npm install`
3. Run locally: `npm run dev`
4. Open `http://localhost:3000`

## Deployment
- Deploy to Vercel: `vercel --prod`
- Ensure environment variables are set in Vercel dashboard.

## Notes
- Mock API is used for exchange data.
- Animations are reduced for users with `prefers-reduced-motion`.