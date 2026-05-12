import { HeroSection } from "./_components/HeroSection"
import { Navbar } from "./_components/Navbar"
import { ScrollProgress } from "./_components/ScrollProgress"
import { DigitalLibrarySection } from "./_components/sections/DigitalLibrarySection"
import { FinalCTASection } from "./_components/sections/FinalCTASection"
import { MultiDeviceSection } from "./_components/sections/MultiDeviceSection"
import { PricingSection } from "./_components/sections/PricingSection"
import { ReadListenSection } from "./_components/sections/ReadListenSection"
import { RecommendationsSection } from "./_components/sections/RecommendationsSection"

export default function Home() {
  return (
    <>
      <Navbar />
      <ScrollProgress />
      <main>
        <HeroSection />
        <DigitalLibrarySection />
        <ReadListenSection />
        <RecommendationsSection />
        <PricingSection />
        <MultiDeviceSection />
        <FinalCTASection />
      </main>
    </>
  )
}
