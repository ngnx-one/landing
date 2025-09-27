"use client"

import { useEffect, useRef } from "react"
import { ThreeCoin } from "./three-coin"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

export function ContactHeroSection() {
  const headlineRef = useRef<HTMLHeadingElement>(null)
  const subheadlineRef = useRef<HTMLParagraphElement>(null)
  const coinRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const headline = headlineRef.current
    const subheadline = subheadlineRef.current
    const coin = coinRef.current

    if (!headline || !subheadline || !coin) return

    // Initial state - hidden
    gsap.set([headline, subheadline], { opacity: 0, y: 50 })
    gsap.set(coin, { opacity: 0, scale: 0.8 })

    // Entrance animations
    const tl = gsap.timeline({ delay: 0.5 })
    
    tl.to(coin, {
      opacity: 1,
      scale: 1,
      duration: 1.5,
      ease: "back.out(1.7)",
    })
    .to(headline, {
      opacity: 1,
      y: 0,
      duration: 1,
      ease: "power2.out",
    }, "-=0.8")
    .to(subheadline, {
      opacity: 1,
      y: 0,
      duration: 1,
      ease: "power2.out",
    }, "-=0.6")

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
    }
  }, [])

  return (
    <section className="relative min-h-[60vh] flex items-center justify-start overflow-hidden bg-gradient-to-br from-background via-background to-secondary/20 pt-16">
      {/* Background gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/50 to-background/80 dark:from-background/90 dark:via-transparent dark:to-background/50 z-10" />
      
      {/* 3D Coin Animation */}
      <div 
        ref={coinRef}
        className="absolute right-1/4 top-1/2 transform -translate-y-1/2 z-20"
      >
        <ThreeCoin className="w-64 h-64" />
      </div>

      {/* Content Container */}
      <div className="relative z-30 container mx-auto px-6 lg:px-8">
        <div className="max-w-3xl">
          {/* Main Headline */}
          <h1 
            ref={headlineRef}
            className="text-4xl md:text-6xl lg:text-7xl font-bold text-foreground leading-tight mb-6"
          >
            Get in{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary/60">
              Touch
            </span>
          </h1>

          {/* Subheadline */}
          <p 
            ref={subheadlineRef}
            className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-2xl"
          >
            Have questions about NGNX? Want to join our community? We'd love to hear from you. 
            Send us a message and we'll get back to you as soon as possible.
          </p>
        </div>
      </div>
    </section>
  )
}
