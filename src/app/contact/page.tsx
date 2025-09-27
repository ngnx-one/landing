import { Navbar } from "@/components/navbar"
import { ContactHeroSection } from "@/components/contact-hero-section"
import { ContactForm } from "@/components/contact-form"
import { ContactInfo } from "@/components/contact-info"
import { Footer } from "@/components/footer"
import { BackgroundAnimation } from "@/components/background-animation"

export default function Contact() {
  return (
    <div className="min-h-screen bg-background relative">
      <BackgroundAnimation />
      <Navbar />
      <main>
        <ContactHeroSection />
        <div className="container mx-auto px-6 lg:px-8 py-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <ContactForm />
            <ContactInfo />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
