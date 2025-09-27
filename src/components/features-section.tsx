"use client"

import { useEffect, useRef } from "react"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { ArrowRightLeft, TrendingUp, Shield, Zap, Globe, Users } from "lucide-react"

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

const features = [
  {
    icon: ArrowRightLeft,
    title: "Safe P2P Exchange",
    description: "Trade directly with other users with complete safety and security. All P2P transactions are protected and transparent."
  },
  {
    icon: TrendingUp,
    title: "Guaranteed Liquidity",
    description: "We always provide liquidity for yield generation. Earn competitive returns with our guaranteed liquidity pools."
  },
  {
    icon: Shield,
    title: "Inflation Hedge",
    description: "Protect your wealth from inflation with our stable, yield-bearing cryptocurrency designed for Nigerians."
  },
  {
    icon: Zap,
    title: "Low Transaction Fees",
    description: "Experience lightning-fast transaction processing with low fees and maximum security for all your trades."
  },
  {
    icon: Globe,
    title: "Mobile Wallet Soon",
    description: "Mobile wallet app coming soon! Access your funds anywhere, anytime with our upcoming mobile application."
  },
  {
    icon: Users,
    title: "Community Driven",
    description: "Built by Nigerians, for Nigerians. Join a growing community of forward-thinking financial innovators."
  }
]

export function FeaturesSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const headingRef = useRef<HTMLHeadingElement>(null)
  const cardsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    const heading = headingRef.current
    const cards = cardsRef.current

    if (!section || !heading || !cards) return

    // Initial state
    gsap.set(heading, { opacity: 0, y: 30 })
    gsap.set(cards.children, { opacity: 0, y: 50, scale: 0.9 })

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
      }
    })

    // Add hover animations to cards
    Array.from(cards.children).forEach((card) => {
      const cardElement = card as HTMLElement
      
      cardElement.addEventListener('mouseenter', () => {
        gsap.to(cardElement, {
          scale: 1.05,
          y: -10,
          duration: 0.3,
          ease: "power2.out"
        })
      })

      cardElement.addEventListener('mouseleave', () => {
        gsap.to(cardElement, {
          scale: 1,
          y: 0,
          duration: 0.3,
          ease: "power2.out"
        })
      })
    })

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
    }
  }, [])

  return (
    <section ref={sectionRef} className="py-24 bg-secondary/5">
      <div className="container mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 
            ref={headingRef}
            className="text-4xl md:text-5xl font-bold text-foreground mb-6"
          >
            Why Choose{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary/60">
              NGNX
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Experience safe P2P trading with guaranteed liquidity and low fees. Built for the modern Nigerian economy.
          </p>
        </div>

        <div 
          ref={cardsRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {features.map((feature, index) => {
            const Icon = feature.icon
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
                    {feature.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-muted-foreground leading-relaxed">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}
