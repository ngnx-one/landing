"use client"

import { useEffect, useRef } from "react"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { ArrowRightLeft, TrendingUp, Shield, Zap, Globe, Lock } from "lucide-react"

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

const solutions = [
  {
    icon: ArrowRightLeft,
    title: "Bypass Bank Fees & Regulations",
    description: "Direct P2P transactions eliminate intermediary fees and bureaucratic hurdles, making financial services accessible to unbanked and underbanked populations."
  },
  {
    icon: Shield,
    title: "Preserve Wealth",
    description: "Stablecoins shield users from naira devaluation and inflation, maintaining the real value of savings and transactions in a volatile economic environment."
  },
  {
    icon: TrendingUp,
    title: "Generate Yield",
    description: "Interest-bearing stablecoin accounts offer returns that offset inflation and tax burdens, encouraging savings and providing a financial buffer."
  },
  {
    icon: Zap,
    title: "Enable Low-Cost Transactions",
    description: "Direct P2P transfers reduce remittance and trading costs, benefiting small-scale traders and diaspora communities sending funds to Nigeria."
  },
  {
    icon: Lock,
    title: "Protect Privacy",
    description: "Decentralized platforms minimize reliance on bank-linked systems, preserving user anonymity amid increased government surveillance."
  },
  {
    icon: Globe,
    title: "Financial Inclusion",
    description: "Accessible platform design ensures that even those without traditional banking relationships can participate in the digital economy."
  }
]

export function SolutionSection() {
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
    <section ref={sectionRef} className="py-24 bg-secondary/5">
      <div className="container mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 
            ref={headingRef}
            className="text-4xl md:text-5xl font-bold text-foreground mb-6"
          >
            Our{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary/60">
              Solution
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            A yield-bearing P2P stablecoin exchange tailored for Nigeria, providing a decentralized, low-cost, and accessible platform for financial management.
          </p>
        </div>

        <div 
          ref={cardsRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {solutions.map((solution, index) => {
            const Icon = solution.icon
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
                    {solution.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-muted-foreground leading-relaxed">
                    {solution.description}
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
