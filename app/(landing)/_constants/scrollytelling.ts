export const scrollytellingAssets = {
  logo: "/images/logos/logo.png",
  emblem: "/images/logos/emblem.png",
  phone: "/images/devices/mobile-mockup.avif",
} as const

export const scrollytellingBooks = [
  {
    src: "/images/books/1.avif",
    title: "Plava biblioteka",
    meta: "Novo izdanje",
  },
  {
    src: "/images/books/2.avif",
    title: "Tihi fokus",
    meta: "Preporuka",
  },
  {
    src: "/images/books/3.avif",
    title: "Granice uma",
    meta: "Audio knjiga",
  },
  {
    src: "/images/books/4.avif",
    title: "Noćni ritam",
    meta: "Popularno",
  },
  {
    src: "/images/books/5.avif",
    title: "Sledeće poglavlje",
    meta: "Za tebe",
  },
] as const

export const scrollytellingScenes = [
  {
    key: "discovery",
    eyebrow: "TVOJ SVET KNJIGA",
    title: "Knjige koje te pokreću.",
    text: "Otkrij, čitaj i slušaj hiljade naslova bilo kad i bilo gde. Eden Books spaja digitalnu biblioteku, audio knjige i personalizovane preporuke u jedno premium iskustvo.",
    primaryCta: "Istraži knjige",
    secondaryCta: "Pogledaj kako radi",
    featurePills: ["Hiljade naslova", "Čitaj ili slušaj", "Uvek uz tebe"],
  },
  {
    key: "library",
    eyebrow: "DIGITALNA BIBLIOTEKA",
    title: "Biblioteka koja uvek ide sa tobom.",
    text: "Od klasika do novih izdanja, Eden Books ti daje preglednu digitalnu biblioteku koja je dostupna u svakom trenutku.",
    categoryChips: ["Klasici", "Trileri", "Biznis", "Psihologija", "Audio knjige"],
  },
  {
    key: "audio",
    eyebrow: "ČITAJ ILI SLUŠAJ",
    title: "Kad ne možeš da čitaš - slušaj.",
    text: "Nastavi knjigu kao audio izdanje, sačuvaj progres i vrati se tačno tamo gde si stao.",
    uiLabels: [
      "Nastavi tamo gde si stao",
      "Sinhronizovan progres",
      "Offline dostupno",
      "Audio režim",
    ],
  },
  {
    key: "recommendations",
    eyebrow: "PREPORUKE ZA TEBE",
    title: "Preporuke koje prate tvoj ukus.",
    text: "Pronađi sledeću knjigu bez beskrajnog pretraživanja. Eden Books ti predlaže naslove prema tvojim interesovanjima, žanrovima i navikama čitanja.",
    cta: "Započni čitanje",
    recommendationChips: [
      "Za večeras",
      "Kratko čitanje",
      "Popularno u tvom žanru",
      "Nastavi serijal",
    ],
  },
] as const

export const scrollytellingTiming = {
  labels: {
    discovery: 0,
    library: 1,
    audio: 2,
    recommendations: 3,
  },
  scrub: 0.9,
  desktopMinWidth: 1024,
} as const
