import type { Metadata } from 'next'
import '@css/index.css'
import '@vanilla/style/index.css'
import 'bootstrap-icons/font/bootstrap-icons.css'
import Navbar from '@components/Navbar'
import {ReactNode} from 'react'
import UserData from '../context/userData'
import Footer from '@components/Footer'
import Providers from '@components/Providers'

export const metadata: Metadata = {
  title: 'Shipping App',
  description: 'First Money app',
}

export default function RootLayout({
  children,
}: {
  children: ReactNode
}) {




  
  return (
    <html lang="en">
      <body>
        <Providers>        
        <UserData>
        <Navbar/>
        {children}
          <Footer/>
        </UserData>
        </Providers>
      </body>
    </html>
  )
}
