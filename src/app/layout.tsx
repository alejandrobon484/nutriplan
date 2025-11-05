import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Nutriplan - Tu Planificador de Comidas Estacional',
  description: 'Planifica tus comidas según la estación del año con recetas saludables y equilibradas',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  )
}
