"use client"

import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { NavigationMenu, NavigationMenuList, NavigationMenuItem, NavigationMenuLink } from "@/components/ui/navigation-menu"

const navItems = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "P2P Exchange", href: "/exchange" },
  { name: "Ecosystem", href: "/ecosystem" },
  { name: "Blog", href: "/blog" },
  { name: "Contact", href: "/contact" },
]

export function Navbar() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center space-x-2">
              <Image
                src="/logo.png"
                alt="NGNX Logo"
                width={32}
                height={32}
                className="h-8 w-8 dark:invert"
                priority
              />
              <span className="text-xl font-bold text-foreground">NGNX</span>
            </Link>
          </div>

          {/* Primary Navigation */}
          <NavigationMenu className="hidden md:flex">
            <NavigationMenuList className="flex space-x-1">
              {navItems.map((item) => (
                <NavigationMenuItem key={item.name}>
                  <NavigationMenuLink
                    href={item.href}
                    className="px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {item.name}
                  </NavigationMenuLink>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>

          {/* CTA Buttons */}
          <div className="flex items-center space-x-3">
            <Button variant="secondary" size="sm" className="hidden sm:inline-flex">
              Learn More
            </Button>
            <Button size="sm" className="bg-primary hover:bg-primary/90 text-primary-foreground">
              Join Up
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
}
