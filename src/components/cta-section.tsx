"use client"

import { useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { ArrowRight, Sparkles } from "lucide-react"

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

export function CTASection() {
  const sectionRef = useRef<HTMLElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const button1Ref = useRef<HTMLButtonElement>(null)
  const button2Ref = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    const content = contentRef.current
    const button1 = button1Ref.current
    const button2 = button2Ref.current

    if (!section || !content || !button1 || !button2) return

    // Initial state
    gsap.set(content, { opacity: 0, y: 50 })
    gsap.set([button1, button2], { opacity: 0, y: 30, scale: 0.9 })

    // Scroll-triggered animations
    ScrollTrigger.create({
      trigger: section,
      start: "top 80%",
      onEnter: () => {
        const tl = gsap.timeline()

        tl.to(content, {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power2.out"
        })
        .to([button1, button2], {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.6,
          ease: "back.out(1.7)",
          stagger: 0.1
        }, "-=0.4")
      }
    })

    // Button hover animations
    const addButtonHover = (button: HTMLElement) => {
      button.addEventListener('mouseenter', () => {
        gsap.to(button, {
          scale: 1.05,
          duration: 0.3,
          ease: "power2.out"
        })
        
        // Glow effect
        gsap.to(button, {
          boxShadow: "0 0 30px rgba(var(--primary), 0.5)",
          duration: 0.3,
          ease: "power2.out"
        })
      })

      button.addEventListener('mouseleave', () => {
        gsap.to(button, {
          scale: 1,
          boxShadow: "0 0 0px rgba(var(--primary), 0)",
          duration: 0.3,
          ease: "power2.out"
        })
      })
    }

    addButtonHover(button1)
    addButtonHover(button2)

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
    }
  }, [])

  return (
    <section 
      ref={sectionRef}
      className="py-24 bg-gradient-to-br from-primary/5 via-background to-secondary/10 relative overflow-hidden"
    >
      {/* Background decorative elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-20 w-32 h-32 bg-primary rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-20 w-40 h-40 bg-secondary rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-60 h-60 bg-primary/20 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-6 lg:px-8 relative z-10">
        <div 
          ref={contentRef}
          className="text-center max-w-4xl mx-auto"
        >
          {/* Icon */}
          <div className="flex justify-center mb-8">
            <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center border border-primary/20">
              <Sparkles className="w-10 h-10 text-primary" />
            </div>
          </div>

          {/* Heading */}
          <h2 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
            Ready to{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary/60">
              Transform
            </span>{" "}
            Your Finances?
          </h2>

          {/* Description */}
          <p className="text-xl md:text-2xl text-muted-foreground mb-12 leading-relaxed max-w-3xl mx-auto">
            Join thousands of Nigerians who are already protecting and growing their wealth with NGNX. 
            Safe P2P trading, guaranteed liquidity, low fees. Start your journey to financial freedom today.
          </p>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-primary mb-2">₦2.5B+</div>
              <div className="text-muted-foreground">Total Volume Traded</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-primary mb-2">50K+</div>
              <div className="text-muted-foreground">Active Users</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-primary mb-2">12%</div>
              <div className="text-muted-foreground">Average APY</div>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <Button 
              ref={button1Ref}
              size="lg"
              className="bg-primary hover:bg-primary/90 text-primary-foreground px-10 py-4 text-lg font-semibold shadow-2xl group relative overflow-hidden"
            >
              <span className="relative z-10 flex items-center">
                Join the Waitlist
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-primary to-primary/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </Button>

            <Button 
              ref={button2Ref}
              variant="outline"
              size="lg"
              className="px-10 py-4 text-lg font-semibold border-2 border-primary/20 hover:border-primary/40 hover:bg-primary/5 group"
            >
              <span className="flex items-center">
                Learn More
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
              </span>
            </Button>
          </div>

          {/* Trust indicators */}
          <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-6 text-sm text-muted-foreground">
            <div className="flex items-center">
              <div className="w-3 h-3 bg-green-500 rounded-full mr-2" />
              Safe P2P transactions
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 bg-green-500 rounded-full mr-2" />
              Guaranteed liquidity
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 bg-green-500 rounded-full mr-2" />
              Low transaction fees
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 bg-green-500 rounded-full mr-2" />
              Mobile app coming soon
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
