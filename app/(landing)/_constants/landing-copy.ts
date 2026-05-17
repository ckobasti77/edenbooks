export const landingCopy = {
  hero: {
    eyebrow: "TVOJ SVET KNJIGA",
    title: "Knjige koje idu sa tobom.",
    subtitle:
      "Eden Books spaja e-knjige, audio knjige i pametne preporuke u jedno mirno, pregledno i lično iskustvo čitanja.",
    primaryCta: "Započni čitanje",
    secondaryCta: "Pogledaj kako radi",
    featureHighlights: [
      "E-knjige i audio knjige",
      "Sinhronizovan progres",
      "Preporuke po tvom ukusu",
    ],
    stats: [
      {
        value: "50K+",
        label: "naslova",
      },
      {
        value: "Čitanje",
        label: "i slušanje",
      },
      {
        value: "4.8",
        label: "prosečna ocena",
      },
      {
        value: "Svi uređaji",
        label: "sinhronizovano",
      },
    ],
    floatingBooks: ["Digitalna polica", "Audio knjige", "Lični izbor"],
    phone: {
      title: "EDEN BOOKS",
      activeBook: "Tvoja sledeća knjiga je već tu",
      progress: "68% pročitano",
    },
    emblem: {
      title: "Lični izbor",
      text: "Preporuka za tvoje sledeće poglavlje",
    },
  },
  scrollytelling: [
    {
      key: "hero",
      eyebrow: "TVOJ SVET KNJIGA",
      title: "Knjige koje idu sa tobom.",
      text: "Eden Books spaja e-knjige, audio knjige i pametne preporuke u jedno mirno, pregledno i lično iskustvo čitanja.",
      cta: "Započni čitanje",
      href: "#biblioteka",
      position: "left",
    },
    {
      key: "library",
      eyebrow: "Digitalna polica",
      title: "Biblioteka koja uvek ide sa tobom.",
      text: "Sačuvaj omiljene naslove, nastavi započete knjige i pronađi sledeće štivo bez lutanja kroz beskrajne liste.",
      cta: "Istraži biblioteku",
      href: "#biblioteka",
      position: "bottom-right",
    },
    {
      key: "recommendations",
      eyebrow: "Lični izbor",
      title: "Preporuke koje razumeju tvoj ukus.",
      text: "Umesto beskrajnog pretraživanja, dobijaš izbor naslova prema žanrovima koje voliš, knjigama koje čitaš i ritmu koji ti odgovara.",
      cta: "Pogledaj preporuke",
      href: "#preporuke",
      position: "bottom-left",
    },
    {
      key: "audio",
      eyebrow: "Audio knjige",
      title: "Kad nemaš vremena za čitanje - slušaj.",
      text: "Prebaci se na audio izdanje u šetnji, vožnji ili pred spavanje. Eden Books pamti gde si stao.",
      cta: "Pogledaj audio iskustvo",
      href: "#audio-knjige",
      position: "bottom-center",
    },
  ],
  sections: {
    digitalLibrary: {
      id: "biblioteka",
      title: "Biblioteka koja uvek ide sa tobom.",
      text: "Sačuvaj omiljene naslove, nastavi započete knjige i pronađi sledeće štivo bez lutanja kroz beskrajne liste.",
      visualTitle: "Digitalna polica",
      visualItems: ["Digitalna polica", "Nova izdanja", "Klasici", "Sačuvano", "U toku"],
    },
    readListen: {
      id: "audio-knjige",
      title: "Kad nemaš vremena za čitanje - slušaj.",
      text: "Prebaci se na audio izdanje u šetnji, vožnji ili pred spavanje. Eden Books pamti gde si stao.",
      visualTitle: "Nastavi slušanje",
      visualItems: ["Nastavi slušanje", "Audio izdanje", "Sinhronizovan progres", "Offline mod"],
    },
    recommendations: {
      id: "preporuke",
      title: "Preporuke koje razumeju tvoj ukus.",
      text: "Umesto beskrajnog pretraživanja, dobijaš izbor naslova prema žanrovima koje voliš, knjigama koje čitaš i ritmu koji ti odgovara.",
      visualTitle: "Lični izbor",
      visualItems: ["Lični izbor", "Drama", "Biznis", "Psihologija", "Trileri"],
    },
    pricing: {
      id: "paketi",
      title: "Izaberi paket koji prati tvoj ritam.",
      text: "Bilo da čitaš povremeno, svake večeri ili deliš biblioteku sa porodicom, izaberi paket koji se uklapa u tvoj način čitanja.",
      visualTitle: "Paketi",
      visualItems: ["Essential", "Premium", "Family"],
      packages: [
        {
          name: "Essential",
          description: "Za mirno čitanje i osnovni pristup biblioteci.",
        },
        {
          name: "Premium",
          description:
            "Za one koji žele više naslova, audio knjige i napredne preporuke.",
        },
        {
          name: "Family",
          description:
            "Za više čitalaca, više ukusa i jednu zajedničku biblioteku.",
        },
      ],
    },
    multiDevice: {
      id: "uredjaji",
      title: "Počni na telefonu, nastavi gde god želiš.",
      text: "Tvoj progres, omiljeni naslovi i beleške ostaju sinhronizovani - na telefonu, tabletu i računaru.",
      visualTitle: "Sinhronizovano",
      visualItems: ["Telefon", "Tablet", "Desktop", "Sinhronizovano"],
    },
    finalCta: {
      id: "zapocni",
      title: "Tvoja sledeća knjiga je već tu.",
      text: "Uđi u Eden Books i pronađi naslov koji će ti otvoriti novo poglavlje.",
      cta: "Započni čitanje",
    },
  },
} as const
