import { SearchIcon } from "lucide-react"

import { navigationLinks } from "../_constants/navigation"
import { BrandLogo } from "./BrandLogo"
import { MobileMenu } from "./MobileMenu"
import { Button } from "@/components/ui/button"
import { Container } from "@/components/ui/Container"

function Navbar() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 bg-transparent">
      <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-28 bg-gradient-to-b from-black/48 via-black/18 to-transparent" />
      <Container className="flex h-16 items-center justify-between gap-4">
        <BrandLogo />

        <nav
          aria-label="Glavna navigacija"
          className="hidden items-center gap-1 lg:flex"
        >
          {navigationLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="rounded-lg px-3 py-2 text-sm text-white/72 transition-colors hover:bg-white/[0.07] hover:text-white"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-2 lg:flex">
          <Button
            type="button"
            variant="ghost"
            size="icon-lg"
            aria-label="Pretraga"
            className="text-white/76 hover:bg-white/[0.08] hover:text-white"
          >
            <SearchIcon />
          </Button>
          <Button
            asChild
            variant="ghost"
            className="text-white/76 hover:bg-white/[0.08] hover:text-white"
          >
            <a href="#">Prijava</a>
          </Button>
          <Button
            asChild
            className="bg-white/12 text-white shadow-lg shadow-black/20 backdrop-blur-md hover:bg-white/18"
          >
            <a href="#zapocni">Registracija</a>
          </Button>
        </div>

        <div className="flex items-center gap-2 lg:hidden">
          <Button
            type="button"
            variant="ghost"
            size="icon-lg"
            aria-label="Pretraga"
            className="text-white/76 hover:bg-white/[0.08] hover:text-white"
          >
            <SearchIcon />
          </Button>

          <MobileMenu />
        </div>
      </Container>
    </header>
  )
}

export { Navbar }
