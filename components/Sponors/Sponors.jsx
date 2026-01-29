"use client";
import React from "react";
import { motion } from "framer-motion";

const sponsors = [
  { id: 1, name: "Nkosh", logo: "/images/Nkosh.png" },
  { id: 2, name: "Red Bull", logo: "/images/redbull2.png" },
  { id: 3, name: "CSJMIF", logo: "/images/CSJMIF.jpg" },
  { id: 4, name: "Dominos", logo: "/images/dominos.png" },
  { id: 5, name: "Sahara", logo: "/images/sahara.jpg" },
  { id: 6, name: "Daily Wash", logo: "/images/dailywash.jpg" },
];

const Sponsors = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 60, damping: 15 },
    },
  };

  return (
    // ✅ Yahan maine nayi class 'fix-sponsors-padding' laga di hai
    <div className="fix-sponsors-padding text-white font-orbitron relative z-10">
      
      {/* Title Section */}
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        whileHover={{ 
          color: "#68ee68", 
          textShadow: "0px 0px 20px rgba(104, 238, 104, 0.8)",
          scale: 1.05 
        }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="text-4xl md:text-6xl  font-bold mb-16 text-center uppercase tracking-wider text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.3)]"
      >
        Previous Sponsors
      </motion.h1>

      {/* Grid Section */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        // ✅ Yahan maine nayi class 'fix-sponsors-grid' laga di hai
        className="fix-sponsors-grid"
      >
        {sponsors.map((sponsor) => (
          <motion.div
            key={sponsor.id}
            variants={itemVariants}
            whileHover={{ 
              borderColor: "#68ee68", 
              boxShadow: "0px 0px 25px rgba(104, 238, 104, 0.4)", 
              backgroundColor: "rgba(39, 39, 42, 0.9)",
              scale: 1.05,
            }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="bg-zinc-900/40 border border-zinc-700 h-48 w-full rounded-2xl flex flex-col items-center justify-center gap-4 backdrop-blur-md cursor-pointer group shadow-lg"
          >
            {/* Logo Image */}
            <div className="h-24 w-full flex items-center justify-center overflow-hidden p-4">
                <img
                  src={sponsor.logo}
                  alt={sponsor.name}
                  className="h-full w-auto max-w-[80%] object-contain transition-transform duration-300 group-hover:scale-110"
                  onError={(e) => {
                      e.target.style.display = "none";
                  }}
                />
            </div>

            {/* Name */}
            <motion.span 
              className="text-xl font-semibold text-gray-400 tracking-wide transition-colors duration-300 group-hover:text-[#68ee68]"
            >
              {sponsor.name}
            </motion.span>
          </motion.div>
        ))}
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="mt-24 text-lg md:text-xl text-[#68ee68] tracking-[0.3em] font-semibold animate-pulse text-center"
      >
        COMING SOON...
      </motion.div>
    </div>
  );
};

export default Sponsors;