"use client"

import { useEffect, useRef } from "react"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { TrendingDown, Banknote, Users, AlertTriangle, DollarSign, Shield } from "lucide-react"

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

const problems = [
  {
    icon: TrendingDown,
    title: "High Inflation & Naira Devaluation",
    description: "Nigeria faces inflation rates above 20% annually with persistent naira devaluation, eroding purchasing power and making savings lose value rapidly."
  },
  {
    icon: Banknote,
    title: "Inadequate Tax Thresholds",
    description: "The ₦800,000 tax exemption threshold is insufficient for basic living expenses, disproportionately burdening low and middle-income groups with complex compliance requirements."
  },
  {
    icon: Users,
    title: "High Banking Fees",
    description: "Traditional banks impose excessive fees on transactions, withdrawals, and balance inquiries, particularly penalizing frequent small-scale traders and remittance users."
  },
  {
    icon: AlertTriangle,
    title: "Financial Exclusion",
    description: "Over 60 million Nigerians remain unbanked or underbanked, deterred by costs, bureaucratic barriers, and growing regulatory oversight."
  },
  {
    icon: DollarSign,
    title: "Limited Stablecoin Access",
    description: "While 26 million Nigerians use stablecoins, the absence of efficient P2P exchange platforms forces reliance on costly offshore exchanges."
  },
  {
    icon: Shield,
    title: "Privacy Concerns",
    description: "Increased government surveillance and mandatory bank-linked tax identification numbers compromise financial privacy and autonomy."
  }
]

export function ProblemSection() {
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

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
    }
  }, [])

  return (
    <section ref={sectionRef} className="py-24 bg-destructive/5">
      <div className="container mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 
            ref={headingRef}
            className="text-4xl md:text-5xl font-bold text-foreground mb-6"
          >
            The{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-destructive to-destructive/60">
              Challenge
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Nigeria's 2025 economic landscape presents unprecedented challenges that threaten financial stability and economic inclusion for millions of citizens.
          </p>
        </div>

        <div 
          ref={cardsRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {problems.map((problem, index) => {
            const Icon = problem.icon
            return (
              <Card 
                key={index}
                className="group cursor-pointer border-border/50 hover:border-destructive/20 transition-all duration-300 hover:shadow-lg hover:shadow-destructive/10"
              >
                <CardHeader>
                  <div className="w-12 h-12 bg-destructive/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-destructive/20 transition-colors duration-300">
                    <Icon className="w-6 h-6 text-destructive" />
                  </div>
                  <CardTitle className="text-xl font-semibold text-foreground">
                    {problem.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-muted-foreground leading-relaxed">
                    {problem.description}
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
