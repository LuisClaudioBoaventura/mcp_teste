import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import '@/styles/output.css'
import '@/styles/main.css'
import '@/styles/dashboard.css'
import { KanbanProvider } from '@/contexts/KanbanContext'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'DeepSite - Login',
  description: 'Página de login elegante com efeitos visuais modernos',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR" className="light">
      <head>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" />
      </head>
      <body className={inter.className}>
        <KanbanProvider>
          {children}
        </KanbanProvider>
      </body>
    </html>
  )
}