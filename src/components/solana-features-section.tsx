"use client"

import { useEffect, useRef } from "react"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Rocket, Shield, Zap, DollarSign, Clock, Users } from "lucide-react"

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

const solanaFeatures = [
  {
    icon: Rocket,
    title: "Blazing Fast Speed",
    description: "Solana's unique architecture delivers 65,000+ transactions per second with sub-second finality. Your trades execute instantly.",
    benefit: "65,000+ TPS"
  },
  {
    icon: Shield,
    title: "Maximum Security",
    description: "Battle-tested blockchain with ₦15T+ in total value locked. Your funds are protected by one of the most secure networks in crypto.",
    benefit: "₦15T+ TVL"
  },
  {
    icon: Zap,
    title: "Supercharged Performance",
    description: "Solana's Proof of History consensus mechanism ensures lightning-fast block times and minimal energy consumption.",
    benefit: "400ms Block Time"
  },
  {
    icon: DollarSign,
    title: "Ultra-Low Fees",
    description: "Transaction fees as low as ₦0.50. Keep more of your money with Solana's efficient fee structure.",
    benefit: "₦0.50 Fees"
  },
  {
    icon: Clock,
    title: "Instant Settlement",
    description: "No waiting for confirmations. Your P2P trades settle immediately with finality in under 1 second.",
    benefit: "< 1 Second"
  },
  {
    icon: Users,
    title: "Massive Scale",
    description: "Built to handle millions of users simultaneously. NGNX can scale with Nigeria's growing crypto adoption.",
    benefit: "Unlimited Scale"
  }
]

export function SolanaFeaturesSection() {
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
    <section ref={sectionRef} className="py-24 bg-gradient-to-br from-primary/5 via-background to-secondary/5">
      <div className="container mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 
            ref={headingRef}
            className="text-4xl md:text-5xl font-bold text-foreground mb-6"
          >
            Powered by{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary/60">
              Solana
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            NGNX stablecoin runs on Solana blockchain, leveraging its unmatched speed, 
            security, and efficiency to deliver the best DeFi experience for Nigerians.
          </p>
        </div>

        <div 
          ref={cardsRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {solanaFeatures.map((feature, index) => {
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
                  <CardDescription className="text-muted-foreground leading-relaxed mb-4">
                    {feature.description}
                  </CardDescription>
                  <div className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary border border-primary/20">
                    {feature.benefit}
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Solana Benefits Summary */}
        <div className="mt-16 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-2xl p-8 border border-primary/20">
          <div className="text-center">
            <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
              Why Solana for NGNX?
            </h3>
            <p className="text-lg text-muted-foreground mb-8 max-w-3xl mx-auto">
              Solana's unique combination of speed, security, and low costs makes it the perfect 
              blockchain for NGNX. Experience the future of Nigerian DeFi with technology that 
              actually works at scale.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-primary mb-2">65,000+</div>
                <div className="text-sm text-muted-foreground">Transactions per Second</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary mb-2">₦0.50</div>
                <div className="text-sm text-muted-foreground">Average Transaction Fee</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary mb-2">&lt; 1s</div>
                <div className="text-sm text-muted-foreground">Transaction Finality</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
