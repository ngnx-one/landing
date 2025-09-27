"use client"

import { useEffect, useRef } from "react"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Mail, MessageCircle, Clock, MapPin, Users, Shield } from "lucide-react"

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

const contactMethods = [
  {
    icon: Mail,
    title: "Email Support",
    description: "Get help via email",
    details: "support@ngnx.com",
    action: "mailto:support@ngnx.com"
  },
  {
    icon: MessageCircle,
    title: "Discord Community",
    description: "Join our community",
    details: "Connect with other users",
    action: "#"
  },
  {
    icon: Clock,
    title: "Response Time",
    description: "We typically respond within",
    details: "24 hours",
    action: null
  }
]

const features = [
  {
    icon: Users,
    title: "Community Driven",
    description: "Built by Nigerians, for Nigerians. Join thousands of users already protecting their wealth."
  },
  {
    icon: Shield,
    title: "Secure & Private",
    description: "Your data is protected with enterprise-grade security. We respect your privacy."
  }
]

export function ContactInfo() {
  const sectionRef = useRef<HTMLElement>(null)
  const headingRef = useRef<HTMLHeadingElement>(null)
  const contactCardsRef = useRef<HTMLDivElement>(null)
  const featureCardsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    const heading = headingRef.current
    const contactCards = contactCardsRef.current
    const featureCards = featureCardsRef.current

    if (!section || !heading || !contactCards || !featureCards) return

    // Initial state
    gsap.set(heading, { opacity: 0, y: 30 })
    gsap.set(contactCards.children, { opacity: 0, y: 50, scale: 0.9 })
    gsap.set(featureCards.children, { opacity: 0, y: 50, scale: 0.9 })

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

        // Stagger animate contact cards
        gsap.to(contactCards.children, {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.6,
          ease: "back.out(1.7)",
          stagger: 0.1
        })

        // Stagger animate feature cards
        gsap.to(featureCards.children, {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.6,
          ease: "back.out(1.7)",
          stagger: 0.1,
          delay: 0.2
        })
      }
    })

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
    }
  }, [])

  return (
    <div ref={sectionRef} className="space-y-8">
      {/* Contact Methods */}
      <div>
        <h2 
          ref={headingRef}
          className="text-2xl font-bold text-foreground mb-6"
        >
          Other Ways to Reach Us
        </h2>
        <div 
          ref={contactCardsRef}
          className="space-y-4"
        >
          {contactMethods.map((method, index) => {
            const Icon = method.icon
            return (
              <Card 
                key={index}
                className="group cursor-pointer border-border/50 hover:border-primary/20 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10"
              >
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center group-hover:bg-primary/20 transition-colors duration-300">
                      <Icon className="w-6 h-6 text-primary" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-foreground mb-1">
                        {method.title}
                      </h3>
                      <p className="text-sm text-muted-foreground mb-2">
                        {method.description}
                      </p>
                      <p className="text-sm font-medium text-primary">
                        {method.details}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>

      {/* Features */}
      <div>
        <h3 className="text-xl font-bold text-foreground mb-6">
          Why Choose NGNX?
        </h3>
        <div 
          ref={featureCardsRef}
          className="space-y-4"
        >
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <Card 
                key={index}
                className="group cursor-pointer border-border/50 hover:border-primary/20 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10"
              >
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center group-hover:bg-primary/20 transition-colors duration-300">
                      <Icon className="w-6 h-6 text-primary" />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-lg font-semibold text-foreground mb-2">
                        {feature.title}
                      </h4>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>

      {/* Additional Info */}
      <Card className="border-primary/20 bg-gradient-to-r from-primary/5 to-secondary/5">
        <CardContent className="p-6">
          <div className="text-center">
            <h4 className="text-lg font-semibold text-foreground mb-2">
              Ready to Get Started?
            </h4>
            <p className="text-sm text-muted-foreground mb-4">
              Join thousands of Nigerians who are already protecting their wealth and generating yield with NGNX.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <button className="px-6 py-2 bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg text-sm font-medium transition-colors">
                Join Waitlist
              </button>
              <button className="px-6 py-2 border border-primary/20 hover:bg-primary/10 text-primary rounded-lg text-sm font-medium transition-colors">
                Learn More
              </button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
