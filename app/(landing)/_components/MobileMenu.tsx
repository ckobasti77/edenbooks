"use client"

import { MenuIcon } from "lucide-react"
import { useSyncExternalStore } from "react"

import { navigationLinks } from "../_constants/navigation"
import { BrandLogo } from "./BrandLogo"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"

const subscribe = () => () => {}
const getClientSnapshot = () => true
const getServerSnapshot = () => false

function MobileMenu() {
  const mounted = useSyncExternalStore(
    subscribe,
    getClientSnapshot,
    getServerSnapshot
  )

  if (!mounted) {
    return (
      <Button
        type="button"
        variant="outline"
        size="icon-lg"
        aria-label="Otvori meni"
        className="border-white/10 bg-white/[0.06] text-white hover:bg-white/[0.1]"
      >
        <MenuIcon />
      </Button>
    )
  }

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          type="button"
          variant="outline"
          size="icon-lg"
          aria-label="Otvori meni"
          className="border-white/10 bg-white/[0.06] text-white hover:bg-white/[0.1]"
        >
          <MenuIcon />
        </Button>
      </SheetTrigger>
      <SheetContent
        side="right"
        className="border-white/10 bg-[#050914]/96 text-white backdrop-blur-xl"
      >
        <SheetHeader>
          <SheetTitle className="sr-only">EDEN BOOKS meni</SheetTitle>
          <BrandLogo />
        </SheetHeader>
        <Separator className="bg-white/10" />
        <nav aria-label="Mobilna navigacija" className="flex flex-col p-4">
          {navigationLinks.map((link) => (
            <SheetClose asChild key={link.href}>
              <a
                href={link.href}
                className="rounded-lg px-3 py-3 text-base text-white/76 transition-colors hover:bg-white/[0.08] hover:text-white"
              >
                {link.label}
              </a>
            </SheetClose>
          ))}
        </nav>
        <div className="mt-auto flex flex-col gap-2 p-4">
          <Button asChild variant="ghost" className="justify-center">
            <a href="#">Prijava</a>
          </Button>
          <SheetClose asChild>
            <Button asChild className="shadow-lg shadow-blue-500/20">
              <a href="#zapocni">Registracija</a>
            </Button>
          </SheetClose>
        </div>
      </SheetContent>
    </Sheet>
  )
}

export { MobileMenu }
