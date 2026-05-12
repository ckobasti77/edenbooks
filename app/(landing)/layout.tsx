import { SmoothScrollProvider } from "./_providers/SmoothScrollProvider"

export default function LandingLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return <SmoothScrollProvider>{children}</SmoothScrollProvider>
}
