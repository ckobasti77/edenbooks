import { Navbar } from "./_components/Navbar"
import { ScrollProgress } from "./_components/ScrollProgress"
import { EdenBooks3DScrollytelling } from "./_components/scrollytelling/EdenBooks3DScrollytelling"
import { FinalCTASection } from "./_components/sections/FinalCTASection"
import { MultiDeviceSection } from "./_components/sections/MultiDeviceSection"
import { PricingSection } from "./_components/sections/PricingSection"

export default function Home() {
  return (
    <>
      <Navbar />
      <ScrollProgress />
      <main>
        <EdenBooks3DScrollytelling />
        <PricingSection />
        <MultiDeviceSection />
        <FinalCTASection />
      </main>
    </>
  )
}
