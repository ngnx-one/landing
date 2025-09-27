"use client"

import { useEffect, useRef } from "react"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Percent, DollarSign, TrendingUp, Zap, Shield, Users } from "lucide-react"

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

const feeFeatures = [
  {
    icon: Percent,
    title: "Smart Tiered Pricing",
    description: "Fair fees for small transactions, better rates for larger trades. From ₦1 minimum to 0.2% for large transfers.",
    highlight: "₦1 - 0.2%"
  },
  {
    icon: DollarSign,
    title: "Micro Transfer Friendly",
    description: "₦1-₦3 flat fees for small transfers (₦1-₦500). No percentage fees on micro transactions.",
    highlight: "₦1-₦3 Flat"
  },
  {
    icon: TrendingUp,
    title: "Large Transfer Discount",
    description: "0.2% fee for transfers ₦501-₦1,000,000. Above ₦1M gets 0.2% on first ₦1M + 0.1% on remainder.",
    highlight: "0.2% + 0.1%"
  },
  {
    icon: Zap,
    title: "Ultra-Low Gas Fees",
    description: "Solana's efficient blockchain means gas fees are virtually zero. Keep more of your money.",
    highlight: "₦0.50"
  },
  {
    icon: Shield,
    title: "No Hidden Fees",
    description: "Complete transparency. What you see is what you pay. No monthly fees, no maintenance costs.",
    highlight: "Transparent"
  },
  {
    icon: Users,
    title: "One-Time ATA Creation",
    description: "₦1,000 one-time fee only when creating new token accounts. No recurring charges.",
    highlight: "₦1,000 Once"
  }
]

export function FeeStructureSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const headingRef = useRef<HTMLHeadingElement>(null)
  const cardsRef = useRef<HTMLDivElement>(null)
  const summaryRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    const heading = headingRef.current
    const cards = cardsRef.current
    const summary = summaryRef.current

    if (!section || !heading || !cards || !summary) return

    // Initial state
    gsap.set(heading, { opacity: 0, y: 30 })
    gsap.set(cards.children, { opacity: 0, y: 50, scale: 0.9 })
    gsap.set(summary, { opacity: 0, y: 30 })

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

        // Animate summary
        gsap.to(summary, {
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
            Simple{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary/60">
              Fee Structure
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Smart tiered pricing designed for Nigerian users. 
            Fair fees for small transactions, better rates for larger trades.
          </p>
        </div>

        <div 
          ref={cardsRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16"
        >
          {feeFeatures.map((feature, index) => {
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
                    {feature.highlight}
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Fee Summary */}
        <div 
          ref={summaryRef}
          className="text-center"
        >
          <div className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-2xl p-8 border border-primary/20">
            <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
              Smart Tiered Pricing
            </h3>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Our tiered fee structure ensures fair pricing for everyone, from micro-transactions to large institutional trades.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="text-center">
                <div className="text-4xl font-bold text-primary mb-2">₦1</div>
                <div className="text-sm text-muted-foreground">Minimum Fee</div>
                <div className="text-xs text-muted-foreground mt-1">For ₦1-₦20 transfers</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-primary mb-2">0.2%</div>
                <div className="text-sm text-muted-foreground">Standard Rate</div>
                <div className="text-xs text-muted-foreground mt-1">For ₦501-₦1M transfers</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-primary mb-2">0.1%</div>
                <div className="text-sm text-muted-foreground">Best Rate</div>
                <div className="text-xs text-muted-foreground mt-1">For amounts above ₦1M</div>
              </div>
            </div>
            {/* <div className="space-y-4">
              <div className="p-4 bg-background/50 rounded-lg">
                <p className="text-sm text-muted-foreground">
                  <strong>Micro Transfer (₦100):</strong> Fee = ₦2 → effective 2%
                </p>
              </div>
              <div className="p-4 bg-background/50 rounded-lg">
                <p className="text-sm text-muted-foreground">
                  <strong>Medium Transfer (₦800,000):</strong> Fee = ₦5 + 0.2%×800,000 = ₦1,605 → effective 0.2%
                </p>
              </div>
              <div className="p-4 bg-background/50 rounded-lg">
                <p className="text-sm text-muted-foreground">
                  <strong>Large Transfer (₦1,200,000):</strong> Fee = ₦5 + 0.2%×1,000,000 + 0.1%×200,000 = ₦2,205 → effective 0.18%
                </p>
              </div>
            </div>
            <div className="mt-6 p-4 bg-primary/5 rounded-lg border border-primary/20">
              <p className="text-sm text-muted-foreground">
                <strong>Plus:</strong> Ultra-low Solana gas fees (₦0.50) + Zero platform fees
              </p>
            </div> */}
            
            {/* Detailed Pricing Table */}
            <div className="mt-10">
              <h4 className="text-lg font-semibold text-foreground mb-4 text-center">Complete Fee Schedule</h4>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border/50">
                      <th className="text-left py-3 px-4 font-medium text-foreground">Transfer Amount</th>
                      <th className="text-left py-3 px-4 font-medium text-foreground">Flat Base</th>
                      <th className="text-left py-3 px-4 font-medium text-foreground">Variable Fee</th>
                      <th className="text-left py-3 px-4 font-medium text-foreground">Formula</th>
                      <th className="text-left py-3 px-4 font-medium text-foreground">Total Fee</th>
                    </tr>
                  </thead>
                  <tbody className="text-muted-foreground">
                    <tr className="border-b border-border/30">
                      <td className="py-3 px-4">₦1 – ₦20</td>
                      <td className="py-3 px-4 font-medium text-foreground">₦1</td>
                      <td className="py-3 px-4">–</td>
                      <td className="py-3 px-4 text-xs">–</td>
                      <td className="py-3 px-4 font-medium text-foreground">₦1</td>
                    </tr>
                    <tr className="border-b border-border/30">
                      <td className="py-3 px-4">₦21 – ₦100</td>
                      <td className="py-3 px-4 font-medium text-foreground">₦2</td>
                      <td className="py-3 px-4">–</td>
                      <td className="py-3 px-4 text-xs">–</td>
                      <td className="py-3 px-4 font-medium text-foreground">₦2</td>
                    </tr>
                    <tr className="border-b border-border/30">
                      <td className="py-3 px-4">₦101 – ₦500</td>
                      <td className="py-3 px-4 font-medium text-foreground">₦3</td>
                      <td className="py-3 px-4">–</td>
                      <td className="py-3 px-4 text-xs">–</td>
                      <td className="py-3 px-4 font-medium text-foreground">₦3</td>
                    </tr>
                    <tr className="border-b border-border/30">
                      <td className="py-3 px-4">₦501 – ₦1,000,000</td>
                      <td className="py-3 px-4 font-medium text-foreground">₦5</td>
                      <td className="py-3 px-4 font-medium text-foreground">0.2% of full amount</td>
                      <td className="py-3 px-4 text-xs">0.002 × Amount + 5</td>
                      <td className="py-3 px-4 font-medium text-foreground">e.g. ₦800,000 → ₦1,605</td>
                    </tr>
                    <tr className="border-b border-border/30">
                      <td className="py-3 px-4">Above ₦1,000,000</td>
                      <td className="py-3 px-4 font-medium text-foreground">₦5</td>
                      <td className="py-3 px-4 font-medium text-foreground">0.2% of first ₦1M + 0.1% of remainder</td>
                      <td className="py-3 px-4 text-xs">0.002 × 1,000,000 + 0.001 × (Amount–1,000,000) + 5</td>
                      <td className="py-3 px-4 font-medium text-foreground">e.g. ₦1,200,000 → ₦2,205</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4 font-medium text-foreground">One-time ATA creation</td>
                      <td className="py-3 px-4 font-medium text-foreground">₦1000</td>
                      <td className="py-3 px-4">–</td>
                      <td className="py-3 px-4 text-xs">–</td>
                      <td className="py-3 px-4 font-medium text-foreground">₦1000</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
