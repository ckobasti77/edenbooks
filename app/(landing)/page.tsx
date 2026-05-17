import { Navbar } from "./_components/Navbar"
import { ScrollProgress } from "./_components/ScrollProgress"
import { VideoScrollytellingHero } from "./_components/scrollytelling/VideoScrollytellingHero"
import { PostHeroPitchSections } from "./_components/sections/PostHeroPitchSections"

export default function Home() {
  return (
    <>
      <Navbar />
      <ScrollProgress />
      <main>
        <VideoScrollytellingHero />
        <PostHeroPitchSections />
      </main>
    </>
  )
}
