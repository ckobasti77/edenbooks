import { Navbar } from "./_components/Navbar"
import { ScrollProgress } from "./_components/ScrollProgress"
import { VideoScrollytellingHero } from "./_components/scrollytelling/VideoScrollytellingHero"
import { FinalCTASection } from "./_components/sections/FinalCTASection"
import { MultiDeviceSection } from "./_components/sections/MultiDeviceSection"
import { PricingSection } from "./_components/sections/PricingSection"

export default function Home() {
  return (
    <>
      <Navbar />
      <ScrollProgress />
      <main>
        <VideoScrollytellingHero />
        <PricingSection />
        <MultiDeviceSection />
        <FinalCTASection />
      </main>
    </>
  )
}
