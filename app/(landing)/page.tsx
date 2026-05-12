import { Navbar } from "./_components/Navbar"
import { ScrollProgress } from "./_components/ScrollProgress"
import { EdenScrollytelling } from "./_components/scrollytelling/EdenScrollytelling"
import { FinalCTASection } from "./_components/sections/FinalCTASection"
import { MultiDeviceSection } from "./_components/sections/MultiDeviceSection"
import { PricingSection } from "./_components/sections/PricingSection"

export default function Home() {
  return (
    <>
      <Navbar />
      <ScrollProgress />
      <main>
        <EdenScrollytelling />
        <PricingSection />
        <MultiDeviceSection />
        <FinalCTASection />
      </main>
    </>
  )
}
