"use client"; 
import React, { useState } from 'react';

const Schedule = () => {
  const [activeTab, setActiveTab] = useState(1);

  const days = [
    { id: 1, date: "9", month: "MAR", day: "MON" },
    { id: 2, date: "10", month: "MAR", day: "TUE" },
     { id: 3, date: "11", month: "MAR", day: "WENS" },
  ];

  return (
    // FIX IS HERE: 'bg-[#020617]' ko hata kar 'bg-transparent' kar diya
    <div className="relative min-h-screen w-full bg-transparent text-white overflow-hidden font-sans selection:bg-green-500 selection:text-black">
      
      {/* Import Font */}
      <style>
        {`@import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;500;700;900&display=swap');`}
      </style>

      {/* Central Glow Effect (Optional overlay) */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[300px] bg-green-500/10 blur-[120px] rounded-full pointer-events-none"></div>

      <div className="relative z-10 flex flex-col items-center pt-20 px-4">
        
        {/* --- TITLE --- */}
        <h1 className="text-5xl md:text-7xl font-black tracking-widest uppercase mb-16 text-center font-['Orbitron']"
            style={{
                background: 'linear-gradient(to bottom, #ffeb3b, #d4af37)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                dropShadow: '0 0 20px rgba(255, 215, 0, 0.5)',
                filter: 'drop-shadow(0 0 10px rgba(212, 175, 55, 0.5))'
            }}
        >
          SCHEDULE
        </h1>

        {/* --- BUTTONS --- */}
        <div className="flex flex-wrap justify-center gap-8 mb-24">
          {days.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`
                relative px-10 py-4 md:px-16 md:py-6 rounded-lg border-2 
                flex flex-col items-center justify-center cursor-pointer
                transition-all duration-500 ease-out group font-['Orbitron']
                ${activeTab === item.id 
                  ? 'border-[#00FF9E] bg-[#00FF00]/10 shadow-[0_0_30px_rgba(0,255,0,0.6)] scale-105' 
                  : 'border-slate-700 bg-slate-900/50 text-slate-400 hover:border-slate-500 hover:text-slate-300'
                }
              `}
            >
              <span className={`text-2xl md:text-3xl font-bold transition-colors duration-300 
                  ${activeTab === item.id ? 'text-[#00FF9E] drop-shadow-[0_0_10px_rgba(0,255,0,0.8)]' : ''}`}>
                {item.date} {item.month}
              </span>
              
              <span className={`text-sm tracking-widest mt-1 uppercase transition-colors duration-300
                  ${activeTab === item.id ? 'text-[#00FF9E]' : ''}`}>
                {item.day}
              </span>

              {activeTab === item.id && (
                  <>
                    <span className="absolute -top-1 -left-1 w-3 h-3 border-t-2 border-l-2 border-[#00FF9E]"></span>
                    <span className="absolute -bottom-1 -right-1 w-3 h-3 border-b-2 border-r-2 border-[#00FF9E]"></span>
                  </>
              )}
            </button>
          ))}
        </div>

        {/* --- COMING SOON SECTION --- */}
        <div className="mt-8 flex flex-col items-center justify-center">
            <div className="w-full max-w-2xl h-[1px] bg-gradient-to-r from-transparent via-[#00FF9E] to-transparent mb-12"></div>
            
            <div className="text-center animate-pulse">
                <h2 className="text-4xl md:text-6xl font-['Orbitron'] font-bold tracking-[0.2em] text-transparent bg-clip-text bg-gradient-to-b from-[#00FF00] to-emerald-800 drop-shadow-[0_0_15px_rgba(0,255,0,0.6)]">
                    COMING SOON...
                </h2>
                <p className="text-green-400/60 mt-4 tracking-[0.5em] text-sm md:text-base uppercase font-mono">
                    System Updates Pending
                </p>
            </div>
        </div>

      </div>
    </div>
  );
};

export default Schedule;