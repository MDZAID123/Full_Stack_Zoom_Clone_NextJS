import Sidebar from '@/components/Sidebar'
import StreamVideoProvider from '@/providers/StreamClientProvider'
import { Metadata } from 'next';
import React, { ReactNode } from 'react'

export const metadata: Metadata = {
  title: "YOOM",
  description: "Video calling App",
  icons:{
    icon:'/icons/logo.svg'
  }
};
// this will wrap all the other pages inide the main component
const RootLayout = ({children}:{children:ReactNode}) => {
  return (

 
    <main>
      <StreamVideoProvider>


      
    
    
        {children}
      </StreamVideoProvider>
        Footer

    </main>
  )
}

export default RootLayout
