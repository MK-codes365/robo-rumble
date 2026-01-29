"use client"

import React from 'react'
// Navbar ka path check kar lena, usually components folder me hota hai
import Navbar from '../../../components/Navbara'
import StarryBackground from '../../../components/Partons/StarryBackground'
import Patrons from '../../../components/Partons/Patrons'

const Page = () => {
  return (
    <main className="min-h-screen relative w-full overflow-hidden bg-black">
      
      {/* 1. Navbar (Sabse upar fixed) */}
      <Navbar />

      {/* 2. Background Layer (Peeche Fixed) */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <StarryBackground />
      </div>

      {/* 3. Main Content Wrapper */}
      {/* 'pt-24' (approx 96px) gap rakha hai. Navbar 64px ka hai, toh 32px ka breathing room milega. */}
      <div className="relative z-10 w-full pt-24 pb-10">
        <Patrons />
      </div>
      
    </main>
  )
}

export default Page