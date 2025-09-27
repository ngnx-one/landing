"use client"

import { useEffect, useRef } from "react"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Target, Heart, Users, TrendingUp, Shield, Globe } from "lucide-react"

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

const impacts = [
  {
    icon: Target,
    title: "Financial Resilience",
    description: "Empower Nigerians to navigate the 2025 economic landscape with a resilient alternative to traditional banking systems."
  },
  {
    icon: Heart,
    title: "Wealth Preservation",
    description: "Protect against naira volatility with dollar-pegged stablecoins, ensuring reliable savings and payments."
  },
  {
    icon: TrendingUp,
    title: "Passive Income",
    description: "Generate yield to counter financial strain from taxes and inflation, providing a sustainable income stream."
  },
  {
    icon: Users,
    title: "Economic Inclusion",
    description: "Enhance financial access for informal workers and rural populations through low-cost P2P transactions."
  },
  {
    icon: Shield,
    title: "Financial Autonomy",
    description: "Safeguard financial privacy and autonomy under stringent regulations with decentralized solutions."
  },
  {
    icon: Globe,
    title: "Democratized Access",
    description: "Foster financial resilience and democratize access to stable assets for all Nigerians."
  }
]

export function ImpactSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const headingRef = useRef<HTMLHeadingElement>(null)
  const cardsRef = useRef<HTMLDivElement>(null)
  const ctaRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    const heading = headingRef.current
    const cards = cardsRef.current
    const cta = ctaRef.current

    if (!section || !heading || !cards || !cta) return

    // Initial state
    gsap.set(heading, { opacity: 0, y: 30 })
    gsap.set(cards.children, { opacity: 0, y: 50, scale: 0.9 })
    gsap.set(cta, { opacity: 0, y: 30 })

    // Scroll-triggered animations
    ScrollTrigger.create({
      trigger: section,
      start: "top 80%",
      onEnter: () => {
        // Animate heading
        gsap.to(heading, {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power2.out"
        })

        // Stagger animate cards
        gsap.to(cards.children, {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.6,
          ease: "back.out(1.7)",
          stagger: 0.1
        })

        // Animate CTA
        gsap.to(cta, {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power2.out",
          delay: 0.6
        })
      }
    })

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
    }
  }, [])

  return (
    <section ref={sectionRef} className="py-24 bg-gradient-to-br from-primary/5 via-background to-secondary/5">
      <div className="container mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 
            ref={headingRef}
            className="text-4xl md:text-5xl font-bold text-foreground mb-6"
          >
            Our{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary/60">
              Impact
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            This platform empowers Nigerians to navigate the 2025 economic landscape by offering a resilient alternative to traditional banking.
          </p>
        </div>

        <div 
          ref={cardsRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16"
        >
          {impacts.map((impact, index) => {
            const Icon = impact.icon
            return (
              <Card 
                key={index}
                className="group cursor-pointer border-border/50 hover:border-primary/20 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10"
              >
                <CardHeader>
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors duration-300">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                  <CardTitle className="text-xl font-semibold text-foreground">
                    {impact.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-muted-foreground leading-relaxed">
                    {impact.description}
                  </CardDescription>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Call to Action */}
        <div 
          ref={ctaRef}
          className="text-center"
        >
          <div className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-2xl p-8 border border-primary/20">
            <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
              Ready to Secure Your Financial Future?
            </h3>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Join thousands of Nigerians who are already protecting their wealth and generating yield with NGNX. 
              Be part of the financial revolution that's reshaping Nigeria's economic landscape.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
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
              >
                Learn More
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
