"use client";

import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Navigation } from "swiper/modules";
import EventCard from "./EventCard";
import EventModal from "./EventModal";
import { EventsData } from "@/data/EventsData";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/navigation";

const ThreeDCarousel = () => {
  // 2. STATE ADDED: To track which card is clicked
  const [selectedEvent, setSelectedEvent] = useState(null);

  return (
    <div className="w-full h-full flex items-center justify-center relative z-30">
      
      {/* Custom Styles for Arrows */}
      <style>{`
        .swiper-button-prev, .swiper-button-next {
          color: #00eaff !important;
          font-weight: 900;
          width: 40px;
          height: 40px;
          transition: all 0.3s ease;
        }
        .swiper-button-prev:hover, .swiper-button-next:hover {
            text-shadow: 0 0 15px #00eaff;
            transform: scale(1.1);
        }
        .swiper-pagination { display: none; }
      `}</style>

      <Swiper
        effect="coverflow"
        centeredSlides={true}
        grabCursor={true}
        loop={true}
        slidesPerView="auto"
        coverflowEffect={{
          rotate: 0,        
          stretch: 0,       
          depth: 200,       
          modifier: 1,
          slideShadows: false, 
        }}
        navigation={true}
        modules={[EffectCoverflow, Navigation]}
        className="w-full h-full flex items-center py-4"
      >
        {EventsData.map((event) => (
          <SwiperSlide key={event.id} className="!w-[240px] !h-[360px] md:!w-[300px] md:!h-[420px]">
             {({ isActive }) => (
               <EventCard 
                 event={event} 
                 isActive={isActive} 
                 // 3. INTERACTION ADDED: Pass the function to open modal
                 onOpenModal={setSelectedEvent} 
               />
             )}
          </SwiperSlide>
        ))}
      </Swiper>

      {/* 4. MODAL RENDER ADDED: Shows popup when a card is selected */}
      {selectedEvent && (
        <EventModal 
          event={selectedEvent} 
          onClose={() => setSelectedEvent(null)} 
        />
      )}

    </div>
  );
};

export default ThreeDCarousel;