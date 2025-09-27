"use client"

import { useEffect, useRef } from "react"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Smartphone, Wallet, Users, Shield, Zap, Globe } from "lucide-react"

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

const appFeatures = [
  {
    icon: Smartphone,
    title: "Mobile-First Design",
    description: "Beautiful, intuitive mobile app designed specifically for Nigerian users. Access your funds anywhere, anytime.",
    status: "Coming Soon"
  },
  {
    icon: Wallet,
    title: "Multi-Wallet Management",
    description: "Manage unlimited wallet addresses in one app. No KYC required. Complete control over your digital assets.",
    status: "Coming Soon"
  },
  {
    icon: Users,
    title: "Integrated P2P Market",
    description: "Trade directly with other users through our built-in P2P marketplace. Safe, secure, and instant settlements.",
    status: "Coming Soon"
  },
  {
    icon: Shield,
    title: "Zero KYC Required",
    description: "No identity verification needed. Start trading immediately with complete privacy and anonymity.",
    status: "Coming Soon"
  },
  {
    icon: Zap,
    title: "Instant Transactions",
    description: "Lightning-fast transactions powered by Solana. Send, receive, and trade in seconds, not minutes.",
    status: "Coming Soon"
  },
  {
    icon: Globe,
    title: "Global Accessibility",
    description: "Access your funds from anywhere in the world. Perfect for Nigerians living abroad or traveling.",
    status: "Coming Soon"
  }
]

export function AppFeaturesSection() {
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
    <section ref={sectionRef} className="py-24 bg-secondary/5">
      <div className="container mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 
            ref={headingRef}
            className="text-4xl md:text-5xl font-bold text-foreground mb-6"
          >
            NGNX{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary/60">
              Mobile App
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            The ultimate mobile wallet for Nigerian crypto users. Manage unlimited wallets, 
            trade P2P, and access DeFi features - all with zero KYC requirements.
          </p>
        </div>

        <div 
          ref={cardsRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16"
        >
          {appFeatures.map((feature, index) => {
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

        {/* App Preview CTA */}
        <div 
          ref={ctaRef}
          className="text-center"
        >
          <div className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-2xl p-8 border border-primary/20">
            <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
              Get Early Access to NGNX App
            </h3>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Be among the first to experience the future of Nigerian DeFi. Join our waitlist 
              for exclusive early access to the NGNX mobile app with all premium features.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-4 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
              >
                Join App Waitlist
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
      </div>
    </section>
  )
}
