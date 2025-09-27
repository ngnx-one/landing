"use client"

import { useEffect, useRef } from "react"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Shield, Zap, DollarSign, Users, Lock, TrendingUp } from "lucide-react"

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

const exchangeFeatures = [
  {
    icon: Shield,
    title: "Secure P2P Trading",
    description: "Trade directly with other users with complete safety and security. All transactions are protected by our advanced escrow system.",
    status: "Coming Soon"
  },
  {
    icon: Zap,
    title: "Lightning Fast",
    description: "Experience instant settlements and lightning-fast transaction processing with our optimized blockchain infrastructure.",
    status: "Coming Soon"
  },
  {
    icon: DollarSign,
    title: "Low Fees",
    description: "Enjoy the lowest trading fees in Nigeria. Keep more of your money with our competitive fee structure.",
    status: "Coming Soon"
  },
  {
    icon: Users,
    title: "Guaranteed Liquidity",
    description: "Never worry about finding a trading partner. Our platform ensures there's always liquidity available for your trades.",
    status: "Coming Soon"
  },
  {
    icon: Lock,
    title: "Privacy First",
    description: "Your trading data is protected with enterprise-grade encryption. Trade with confidence knowing your privacy is secure.",
    status: "Coming Soon"
  },
  {
    icon: TrendingUp,
    title: "Yield Generation",
    description: "Earn passive income on your stablecoin holdings while waiting for trading opportunities. Maximize your returns.",
    status: "Coming Soon"
  }
]

export function ExchangeFeatures() {
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
            What to{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary/60">
              Expect
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Our P2P exchange will feature cutting-edge technology and user-friendly design, 
            making it the perfect platform for Nigerian crypto traders.
          </p>
        </div>

        <div 
          ref={cardsRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {exchangeFeatures.map((feature, index) => {
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
                  <div className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-amber-500/10 text-amber-600 border border-amber-500/20">
                    {feature.status}
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}
