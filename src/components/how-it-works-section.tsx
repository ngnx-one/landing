"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { CheckCircle, UserPlus, CreditCard, TrendingUp, Repeat } from "lucide-react"

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

const steps = [
  {
    icon: UserPlus,
    title: "Sign Up",
    description: "Create your account in minutes with just your email and phone number. Quick verification for enhanced security."
  },
  {
    icon: CreditCard,
    title: "Fund Your Wallet",
    description: "Add funds to your wallet using bank transfer, card payment, or direct deposit. Low fees on all transactions."
  },
  {
    icon: Repeat,
    title: "Safe P2P Trading",
    description: "Convert your Naira to NGNX tokens or trade safely with other users on our secure P2P marketplace."
  },
  {
    icon: TrendingUp,
    title: "Earn with Guaranteed Liquidity",
    description: "Watch your balance grow with guaranteed liquidity provision. Earn up to 12% APY on your holdings."
  }
]

export function HowItWorksSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const headingRef = useRef<HTMLHeadingElement>(null)
  const timelineRef = useRef<HTMLDivElement>(null)
  const stepsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    const heading = headingRef.current
    const timeline = timelineRef.current
    const stepsContainer = stepsRef.current

    if (!section || !heading || !timeline || !stepsContainer) return

    // Initial state
    gsap.set(heading, { opacity: 0, y: 30 })
    gsap.set(stepsContainer.children, { opacity: 0, x: -50 })
    gsap.set(timeline, { scaleY: 0, transformOrigin: "top" })

    // Scroll-triggered animations
    ScrollTrigger.create({
      trigger: section,
      start: "top 70%",
      onEnter: () => {
        const tl = gsap.timeline()

        // Animate heading
        tl.to(heading, {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power2.out"
        })

        // Animate timeline line
        tl.to(timeline, {
          scaleY: 1,
          duration: 1.5,
          ease: "power2.out"
        }, "-=0.3")

        // Stagger animate steps
        tl.to(stepsContainer.children, {
          opacity: 1,
          x: 0,
          duration: 0.6,
          ease: "power2.out",
          stagger: 0.2
        }, "-=1")
      }
    })

    // Individual step animations on scroll
    Array.from(stepsContainer.children).forEach((step, index) => {
      const stepElement = step as HTMLElement
      
      ScrollTrigger.create({
        trigger: stepElement,
        start: "top 85%",
        onEnter: () => {
          gsap.to(stepElement.querySelector('.step-icon'), {
            scale: 1.2,
            duration: 0.3,
            ease: "back.out(1.7)",
            yoyo: true,
            repeat: 1
          })
        }
      })
    })

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
    }
  }, [])

  return (
    <section ref={sectionRef} className="py-24 bg-background">
      <div className="container mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 
            ref={headingRef}
            className="text-4xl md:text-5xl font-bold text-foreground mb-6"
          >
            How It{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary/60">
              Works
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Get started with NGNX in four simple steps. Safe P2P trading with guaranteed liquidity and low fees.
          </p>
        </div>

        <div className="max-w-4xl mx-auto relative">
          {/* Timeline line */}
          <div 
            ref={timelineRef}
            className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary to-primary/30 hidden md:block"
          />

          {/* Steps */}
          <div ref={stepsRef} className="space-y-12">
            {steps.map((step, index) => {
              const Icon = step.icon
              return (
                <div key={index} className="flex items-start space-x-6 relative">
                  {/* Step number and icon */}
                  <div className="flex-shrink-0 relative">
                    <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center step-icon relative z-10">
                      <Icon className="w-8 h-8 text-primary-foreground" />
                    </div>
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-20 h-20 bg-primary/20 rounded-full -z-10" />
                    <div className="absolute -top-2 -right-2 w-6 h-6 bg-secondary rounded-full flex items-center justify-center border-2 border-background">
                      <span className="text-xs font-bold text-foreground">{index + 1}</span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1 pb-8">
                    <h3 className="text-2xl font-semibold text-foreground mb-3">
                      {step.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed text-lg">
                      {step.description}
                    </p>
                  </div>
                </div>
              )
            })}
          </div>

          {/* Completion badge */}
          <div className="flex justify-center mt-12">
            <div className="flex items-center space-x-3 bg-primary/10 px-6 py-3 rounded-full border border-primary/20">
              <CheckCircle className="w-6 h-6 text-primary" />
              <span className="text-primary font-semibold">Start earning today!</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
