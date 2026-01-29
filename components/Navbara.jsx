"use client"

import { useState, useEffect } from "react"
import Link from "next/link"

/* ---------------- Navbar Component ---------------- */
export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  // Mobile Menu khulne par background scroll lock
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "unset"
    }
  }, [isOpen])

  return (
    <nav className="fixed top-0 left-0 right-0 z-[9999] w-full bg-[#000047]/95 backdrop-blur-md border-b border-[#00FF9E]/20 h-16 transition-all duration-300">
      
      <div className="w-full h-full px-4 md:px-10 flex items-center justify-between max-w-[100vw]">
        
        {/* LOGO SECTION */}
        <div className="flex items-center flex-shrink-0 z-[10001]">
          <Link href="/" className="flex items-center group">
            <h1 className="font-black text-xs sm:text-base md:text-2xl uppercase tracking-normal md:tracking-widest text-white transition-transform duration-300 group-hover:scale-105 whitespace-nowrap">
              Robo Rumble
              <span className="ml-0.5 md:ml-2 text-[#00FF9E] drop-shadow-[0_0_8px_rgba(0,255,158,0.8)]">
                26
              </span>
            </h1>
          </Link>
        </div>

        {/* --- DESKTOP MENU --- */}
        <div className="hidden lg:flex items-center gap-5 xl:gap-6 text-xs xl:text-sm font-bold tracking-[0.2em] uppercase">
          <NavLink href="/">Home</NavLink>
          <NavLink href="/events">Events</NavLink>
          <NavLink href="/schedule">Schedule</NavLink>
          <NavLink href="/patrons">Patrons</NavLink> 
          <NavLink href="/contacts">Our Team</NavLink>
          <NavLink href="/gallery">Gallery</NavLink>
          <NavLink href="/register">Registration</NavLink>
          <NavLink href="/sponsors">Sponsors</NavLink>
        </div>

        {/* --- HAMBURGER BUTTON --- */}
        <button 
          onClick={() => setIsOpen(!isOpen)}
          className="lg:hidden z-[10001] relative w-6 h-5 flex flex-col justify-between items-end group flex-shrink-0 ml-auto"
        >
          <span className={`h-[2px] w-full bg-[#00FF9E] rounded transition-all duration-300 ${isOpen ? "rotate-45 translate-y-[9px]" : ""}`} />
          <span className={`h-[2px] w-2/3 bg-[#00FF9E] rounded transition-all duration-300 ${isOpen ? "opacity-0" : "group-hover:w-full"}`} />
          <span className={`h-[2px] w-full bg-[#00FF9E] rounded transition-all duration-300 ${isOpen ? "-rotate-45 -translate-y-[9px]" : ""}`} />
        </button>

        {/* --- MOBILE SIDE DRAWER --- */}
        <div 
          className={`fixed top-0 right-0 h-screen w-[75%] sm:w-[350px] bg-[#050510] z-[10000] transform transition-transform duration-500 ease-[cubic-bezier(0.77,0,0.175,1)] shadow-[-10px_0_30px_rgba(0,0,0,0.8)] ${
            isOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
            <div className="absolute inset-0 bg-gradient-to-b from-[#000047]/40 to-transparent pointer-events-none" />

            <div className="flex flex-col h-full pt-20 px-6 pb-10 overflow-y-auto">
                <div className="flex flex-col gap-5 items-end text-right">
                    <MobileNavLink href="/" onClick={() => setIsOpen(false)}>Home</MobileNavLink>
                    <MobileNavLink href="/events" onClick={() => setIsOpen(false)}>Events</MobileNavLink>
                    <MobileNavLink href="/schedule" onClick={() => setIsOpen(false)}>Schedule</MobileNavLink>
                    <MobileNavLink href="/patrons" onClick={() => setIsOpen(false)}>Patrons</MobileNavLink>
                    <MobileNavLink href="/our-team" onClick={() => setIsOpen(false)}>Our Team</MobileNavLink>
                    <MobileNavLink href="/gallery" onClick={() => setIsOpen(false)}>Gallery</MobileNavLink>
                    <MobileNavLink href="/register" onClick={() => setIsOpen(false)}>Registration</MobileNavLink>
                    <MobileNavLink href="/sponsors" onClick={() => setIsOpen(false)}>Sponsors</MobileNavLink>
                </div>
            </div>
        </div>
        
        {/* Black Overlay */}
        {isOpen && (
            <div 
                className="fixed inset-0 bg-black/80 z-[9999] lg:hidden backdrop-blur-[4px] transition-opacity duration-500"
                onClick={() => setIsOpen(false)}
            />
        )}
      </div>
    </nav>
  )
}

/* ---------------- Helper Components ---------------- */

// FIX: className ko Single Line mein convert kar diya hai taaki error na aaye
function NavLink({ href, children }) {
  return (
    <Link 
      href={href} 
      className="relative px-4 py-2 rounded-md transition-all duration-300 ease-out text-white/80 border border-transparent hover:text-[#00FF9E] hover:border-[#00FF9E]/30 hover:bg-gradient-to-b hover:from-[#00FF9E]/20 hover:to-transparent hover:shadow-[0_0_15px_rgba(0,255,158,0.2),inset_0_0_10px_rgba(0,255,158,0.05)] hover:-translate-y-0.5"
    >
      {children}
    </Link>
  )
}

function MobileNavLink({ href, onClick, children }) {
  return (
    <Link 
      href={href} 
      onClick={onClick}
      className="text-white font-bold text-lg sm:text-xl tracking-[0.1em] uppercase hover:text-[#00FF9E] transition-all duration-300 hover:tracking-[0.2em] hover:drop-shadow-[0_0_5px_#00FF9E]"
    >
      {children}
    </Link>
  )
}