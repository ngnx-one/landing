import { Navbar } from "@/components/navbar"
import { AboutHeroSection } from "@/components/about-hero-section"
import { ProblemSection } from "@/components/problem-section"
import { SolutionSection } from "@/components/solution-section"
import { ImpactSection } from "@/components/impact-section"
import { Footer } from "@/components/footer"
import { BackgroundAnimation } from "@/components/background-animation"

export default function About() {
  return (
    <div className="min-h-screen bg-background relative">
      <BackgroundAnimation />
      <Navbar />
      <main>
        <AboutHeroSection />
        <ProblemSection />
        <SolutionSection />
        <ImpactSection />
      </main>
      <Footer />
    </div>
  );
}
