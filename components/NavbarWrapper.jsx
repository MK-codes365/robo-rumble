"use client"; // MUST for client-only components

import dynamic from "next/dynamic";

// Load your interactive Navbar client-side only
const Navbar = dynamic(() => import("./Navbara"), { ssr: false });

export default function NavbarWrapper() {
  return <Navbar />;
}
