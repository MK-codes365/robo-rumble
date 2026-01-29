"use client";

import { useEffect, useState } from "react";
import TeamSection from "../../../components/TeamSection";
import SciFiBackground from "../../../components/SciFiBackground";


export default function Page() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null; // 👈 hydration mismatch FIX

  return (
    <div className="relative min-h-screen">
      
      <SciFiBackground/>

      <div className="relative z-10 pt-32 flex flex-col items-center gap-12">
        

       <TeamSection/>
      </div>
    </div>
  );
}
