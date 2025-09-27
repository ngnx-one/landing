import { Navbar } from "@/components/navbar"
import { EcosystemHeroSection } from "@/components/ecosystem-hero-section"
import { TechnologySection } from "@/components/technology-section"
import { SolanaFeaturesSection } from "@/components/solana-features-section"
import { AppFeaturesSection } from "@/components/app-features-section"
import { FeeStructureSection } from "@/components/fee-structure-section"
import { Footer } from "@/components/footer"
import { BackgroundAnimation } from "@/components/background-animation"

export default function Ecosystem() {
  return (
    <div className="min-h-screen bg-background relative">
      <BackgroundAnimation />
      <Navbar />
      <main>
        <EcosystemHeroSection />
        <TechnologySection />
        <SolanaFeaturesSection />
        <AppFeaturesSection />
        <FeeStructureSection />
      </main>
      <Footer />
    </div>
  );
}
