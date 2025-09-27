import { Navbar } from "@/components/navbar"
import { ExchangeHeroSection } from "@/components/exchange-hero-section"
import { ComingSoonSection } from "@/components/coming-soon-section"
import { ExchangeFeatures } from "@/components/exchange-features"
import { Footer } from "@/components/footer"
import { BackgroundAnimation } from "@/components/background-animation"

export default function Exchange() {
  return (
    <div className="min-h-screen bg-background relative">
      <BackgroundAnimation />
      <Navbar />
      <main>
        <ExchangeHeroSection />
        <ComingSoonSection />
        <ExchangeFeatures />
      </main>
      <Footer />
    </div>
  );
}
