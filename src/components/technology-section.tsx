"use client"

import { useEffect, useRef } from "react"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Zap, Shield, Globe, Cpu, Database, Lock } from "lucide-react"

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

const technologies = [
  {
    icon: Zap,
    title: "Solana Blockchain",
    description: "Built on the fastest, most secure blockchain. Experience sub-second transaction finality and minimal fees.",
    status: "Active"
  },
  {
    icon: Shield,
    title: "Smart Contracts",
    description: "Secure, audited smart contracts ensuring safe P2P transactions and automated yield generation.",
    status: "Active"
  },
  {
    icon: Globe,
    title: "Decentralized Network",
    description: "Fully decentralized infrastructure with no single point of failure. Your funds are always secure.",
    status: "Active"
  },
  {
    icon: Cpu,
    title: "High Performance",
    description: "Optimized for speed and efficiency. Handle thousands of transactions per second with ease.",
    status: "Active"
  },
  {
    icon: Database,
    title: "Immutable Ledger",
    description: "All transactions are permanently recorded on the blockchain, ensuring complete transparency.",
    status: "Active"
  },
  {
    icon: Lock,
    title: "Zero-Knowledge Privacy",
    description: "Advanced privacy features protect your trading data while maintaining full transparency.",
    status: "Active"
  }
]

export function TechnologySection() {
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
            Cutting-Edge{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary/60">
              Technology
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            NGNX leverages the most advanced blockchain technology to deliver 
            unprecedented speed, security, and reliability for Nigerian users.
          </p>
        </div>

        <div 
          ref={cardsRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {technologies.map((tech, index) => {
            const Icon = tech.icon
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
                    {tech.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-muted-foreground leading-relaxed mb-4">
                    {tech.description}
                  </CardDescription>
                  <div className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-500/10 text-green-600 border border-green-500/20">
                    {tech.status}
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
