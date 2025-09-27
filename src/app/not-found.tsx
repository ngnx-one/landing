"use client"

import { useEffect, useRef } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { BackgroundAnimation } from "@/components/background-animation"
import { gsap } from "gsap"
import { Home, ArrowLeft, Search, HelpCircle } from "lucide-react"

export default function NotFound() {
  const containerRef = useRef<HTMLDivElement>(null)
  const numberRef = useRef<HTMLHeadingElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const descriptionRef = useRef<HTMLParagraphElement>(null)
  const buttonsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = containerRef.current
    const number = numberRef.current
    const title = titleRef.current
    const description = descriptionRef.current
    const buttons = buttonsRef.current

    if (!container || !number || !title || !description || !buttons) return

    // Initial state - hidden
    gsap.set([number, title, description, buttons], { opacity: 0, y: 50 })

    // Entrance animations
    const tl = gsap.timeline({ delay: 0.5 })
    
    tl.to(number, {
      opacity: 1,
      y: 0,
      duration: 1,
      ease: "back.out(1.7)",
    })
    .to(title, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: "power2.out",
    }, "-=0.6")
    .to(description, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: "power2.out",
    }, "-=0.4")
    .to(buttons, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: "power2.out",
    }, "-=0.2")

    // Floating animation for the 404 number
    gsap.to(number, {
      y: -10,
      duration: 2,
      ease: "power2.inOut",
      yoyo: true,
      repeat: -1
    })

  }, [])

  return (
    <div className="min-h-screen bg-background relative flex flex-col">
      <BackgroundAnimation />
      <Navbar />
      
      <main className="flex-1 flex items-center justify-center px-6 lg:px-8 mt-20">
        <div 
          ref={containerRef}
          className="text-center max-w-4xl mx-auto relative z-10"
        >
          {/* 404 Number with gradient */}
          <h1 
            ref={numberRef}
            className="text-9xl md:text-[12rem] lg:text-[16rem] font-black text-transparent bg-clip-text bg-gradient-to-r from-primary via-primary/80 to-primary/60 leading-none mb-8"
          >
            404
          </h1>

          {/* Title */}
          <h2 
            ref={titleRef}
            className="text-3xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6"
          >
            Page Not Found
          </h2>

          {/* Description */}
          <p 
            ref={descriptionRef}
            className="text-lg md:text-xl text-muted-foreground mb-12 leading-relaxed max-w-2xl mx-auto"
          >
            Oops! The page you're looking for seems to have wandered off into the blockchain. 
            Don't worry, your safe P2P trading journey with NGNX is still on track.
          </p>

          {/* Action Buttons */}
          <div 
            ref={buttonsRef}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <Button 
              asChild
              size="lg"
              className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-4 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
            >
              <Link href="/">
                <Home className="w-5 h-5 mr-2" />
                Back to Home
              </Link>
            </Button>

            <Button 
              asChild
              variant="outline"
              size="lg"
              className="px-8 py-4 text-lg font-semibold border-2 hover:bg-accent/50 transition-all duration-300 hover:scale-105"
            >
              <Link href="javascript:history.back()">
                <ArrowLeft className="w-5 h-5 mr-2" />
                Go Back
              </Link>
            </Button>
          </div>

          {/* Helpful Links */}
          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
            <Link 
              href="/exchange"
              className="group p-6 bg-card hover:bg-card/80 border border-border rounded-xl transition-all duration-300 hover:shadow-lg hover:scale-105"
            >
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors duration-300">
                <Search className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-semibold text-foreground mb-2">P2P Exchange</h3>
              <p className="text-sm text-muted-foreground">Start trading with other users</p>
            </Link>

            <Link 
              href="/about"
              className="group p-6 bg-card hover:bg-card/80 border border-border rounded-xl transition-all duration-300 hover:shadow-lg hover:scale-105"
            >
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors duration-300">
                <HelpCircle className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-semibold text-foreground mb-2">About NGNX</h3>
              <p className="text-sm text-muted-foreground">Learn about our platform</p>
            </Link>

            <Link 
              href="/contact"
              className="group p-6 bg-card hover:bg-card/80 border border-border rounded-xl transition-all duration-300 hover:shadow-lg hover:scale-105"
            >
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors duration-300">
                <Home className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-semibold text-foreground mb-2">Contact Us</h3>
              <p className="text-sm text-muted-foreground">Get help from our team</p>
            </Link>
          </div>

          {/* Error Code Info */}
          <div className="mt-12 text-sm text-muted-foreground">
            <p>Error Code: 404 | Page Not Found</p>
            <p className="mt-1">If you believe this is an error, please contact our support team.</p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
