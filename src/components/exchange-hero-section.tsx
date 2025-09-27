"use client"

import { useEffect, useRef } from "react"
import { ThreeCoin } from "./three-coin"
import { Button } from "@/components/ui/button"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

export function ExchangeHeroSection() {
  const headlineRef = useRef<HTMLHeadingElement>(null)
  const subheadlineRef = useRef<HTMLParagraphElement>(null)
  const ctaRef = useRef<HTMLDivElement>(null)
  const coinRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const headline = headlineRef.current
    const subheadline = subheadlineRef.current
    const cta = ctaRef.current
    const coin = coinRef.current

    if (!headline || !subheadline || !cta || !coin) return

    // Initial state - hidden
    gsap.set([headline, subheadline, cta], { opacity: 0, y: 50 })
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
    .to(cta, {
      opacity: 1,
      y: 0,
      duration: 1,
      ease: "power2.out",
    }, "-=0.4")

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
    }
  }, [])

  return (
    <section className="relative min-h-screen flex items-end justify-start overflow-hidden bg-gradient-to-br from-background via-background to-secondary/20 pt-16">
      {/* Background gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/50 to-background/80 dark:from-background/90 dark:via-transparent dark:to-background/50 z-10" />
      
      {/* 3D Coin Animation */}
      <div 
        ref={coinRef}
        className="absolute right-1/4 top-1/2 transform -translate-y-1/2 z-20"
      >
        <ThreeCoin className="w-96 h-96" />
      </div>

      {/* Content Container */}
      <div className="relative z-30 container mx-auto px-6 lg:px-8 pb-20">
        <div className="max-w-3xl">
          {/* Main Headline */}
          <h1 
            ref={headlineRef}
            className="text-5xl md:text-7xl lg:text-8xl font-bold text-foreground leading-tight mb-6"
          >
            P2P{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary/60">
              Exchange
            </span>
          </h1>

          {/* Subheadline */}
          <p 
            ref={subheadlineRef}
            className="text-xl md:text-2xl text-muted-foreground mb-8 leading-relaxed max-w-2xl"
          >
            Trade directly with other users in a safe, secure, and decentralized environment. 
            Coming soon with guaranteed liquidity and low fees.
          </p>

          {/* CTA Buttons */}
          <div 
            ref={ctaRef}
            className="flex flex-col sm:flex-row gap-4"
          >
            <Button 
              size="lg" 
              className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-4 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
            >
              Join the Waitlist
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              className="px-8 py-4 text-lg font-semibold border-2 hover:bg-accent/50 transition-all duration-300 hover:scale-105"
              asChild
            >
              <a href="/about">Learn More</a>
            </Button>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-30">
        <div className="animate-bounce">
          <div className="w-6 h-10 border-2 border-muted-foreground rounded-full flex justify-center">
            <div className="w-1 h-3 bg-muted-foreground rounded-full mt-2 animate-pulse" />
          </div>
        </div>
      </div>
    </section>
  )
}
