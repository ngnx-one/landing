"use client"

import Link from "next/link"
import Image from "next/image"
import { Separator } from "@/components/ui/separator"
import { Twitter, MessageCircle, Mail, Phone, MapPin } from "lucide-react"

const footerLinks = {
  product: [
    { name: "Safe P2P Exchange", href: "/exchange" },
    { name: "Guaranteed Liquidity", href: "/yield" },
    { name: "NGNX Stablecoin", href: "/stablecoin" },
    { name: "Mobile App (Coming Soon)", href: "/app" },
  ],
  company: [
    { name: "About Us", href: "/about" },
    { name: "Careers", href: "/careers" },
    { name: "Blog", href: "/blog" },
    { name: "Press Kit", href: "/press" },
  ],
  resources: [
    { name: "Documentation", href: "/docs" },
    { name: "API Reference", href: "/api" },
    { name: "Help Center", href: "/help" },
    { name: "Community", href: "/community" },
  ],
  legal: [
    { name: "Privacy Policy", href: "/privacy" },
    { name: "Terms of Service", href: "/terms" },
    { name: "Cookie Policy", href: "/cookies" },
    { name: "Compliance", href: "/compliance" },
  ]
}

const socialLinks = [
  { name: "Twitter", href: "https://twitter.com/ngnx", icon: Twitter },
  { name: "Discord", href: "https://discord.gg/ngnx", icon: MessageCircle },
]

export function Footer() {
  return (
    <footer className="bg-secondary/10 border-t border-border">
      <div className="container mx-auto px-6 lg:px-8">
        {/* Main footer content */}
        <div className="py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8">
            {/* Brand section */}
            <div className="lg:col-span-2">
            <Link href="/" className="flex items-center space-x-2 mb-6">
              <Image
                src="/logo.png"
                alt="NGNX Logo"
                width={40}
                height={40}
                className="h-10 w-10 dark:invert"
              />
              <span className="text-2xl font-bold text-foreground">NGNX</span>
            </Link>
              <p className="text-muted-foreground mb-6 leading-relaxed max-w-sm">
                The future of Nigerian finance. Safe P2P trading with guaranteed liquidity, low fees, and mobile wallet coming soon.
              </p>
              
              {/* Social links */}
              <div className="flex space-x-4">
                {socialLinks.map((social) => {
                  const Icon = social.icon
                  return (
                    <Link
                      key={social.name}
                      href={social.href}
                      className="w-10 h-10 bg-primary/10 hover:bg-primary/20 rounded-lg flex items-center justify-center transition-colors duration-300 group"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Icon className="w-5 h-5 text-primary group-hover:scale-110 transition-transform duration-300" />
                    </Link>
                  )
                })}
              </div>
            </div>

            {/* Links sections */}
            <div>
              <h3 className="font-semibold text-foreground mb-4">Product</h3>
              <ul className="space-y-3">
                {footerLinks.product.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-muted-foreground hover:text-primary transition-colors duration-300"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-foreground mb-4">Company</h3>
              <ul className="space-y-3">
                {footerLinks.company.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-muted-foreground hover:text-primary transition-colors duration-300"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-foreground mb-4">Resources</h3>
              <ul className="space-y-3">
                {footerLinks.resources.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-muted-foreground hover:text-primary transition-colors duration-300"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-foreground mb-4">Legal</h3>
              <ul className="space-y-3">
                {footerLinks.legal.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-muted-foreground hover:text-primary transition-colors duration-300"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <Separator className="bg-border/50" />

        {/* Bottom section */}
        <div className="py-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-6 text-sm text-muted-foreground">
              <p>&copy; 2024 NGNX. All rights reserved.</p>
              <div className="flex items-center space-x-4">
                <div className="flex items-center">
                  <MapPin className="w-4 h-4 mr-1" />
                  Lagos, Nigeria
                </div>
                <div className="flex items-center">
                  <Mail className="w-4 h-4 mr-1" />
                  hello@ngnx.com
                </div>
              </div>
            </div>

            <div className="text-sm text-muted-foreground">
              <p>Built with 💚 for Nigeria</p>
            </div>
          </div>
        </div>

        {/* Disclaimers */}
        <div className="pb-8">
          <div className="bg-secondary/20 rounded-lg p-6">
            <h4 className="font-semibold text-foreground mb-3">Important Disclaimers</h4>
            <div className="text-xs text-muted-foreground space-y-2 leading-relaxed">
              <p>
                <strong>Investment Risk:</strong> Cryptocurrency investments carry significant risk. 
                The value of your investments may fluctuate, and you may lose some or all of your invested capital.
              </p>
              <p>
                <strong>Independent Platform:</strong> NGNX operates independently and is not backed by the Central Bank of Nigeria. 
                All P2P transactions are safe and secure through our platform protocols.
              </p>
              <p>
                <strong>No Financial Advice:</strong> The information provided on this platform does not constitute financial advice. 
                Please consult with qualified financial advisors before making investment decisions.
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
