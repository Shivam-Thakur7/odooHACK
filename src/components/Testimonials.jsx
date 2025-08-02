import React, { useState, useEffect } from 'react';
import { FaQuoteLeft, FaStar } from 'react-icons/fa';
import { motion } from 'framer-motion';

const testimonials = [
  {
    name: 'Priya Mehta',
    role: 'Community Organizer',
    company: 'San Jose, CA',
    image: 'https://i.pinimg.com/474x/57/98/78/5798782f9d8f580266d08521f3d507d5.jpg',
    quote: 'CivicSense helps keep our neighborhoods informed and engaged. A real civic game-changer!',
    rating: 5
  },
  {
    name: 'Liam Wong',
    role: 'Urban Planner',
    company: 'San Francisco, CA',
    image: 'https://i.pinimg.com/474x/47/01/77/470177c3c1d29dd0e95d9079bac12a19.jpg',
    quote: 'The clarity CivicSense provides through maps and data is invaluable to city planning.',
    rating: 5
  },
  {
    name: 'Fatima Hassan',
    role: 'Local Business Owner',
    company: 'Sacramento, CA',
    image: 'https://i.pinimg.com/474x/5a/fd/5d/5afd5d03dbd8b8ad527414d10da74595.jpg',
    quote: 'Thanks to CivicSense, we can track community events and stay connected with local changes.',
    rating: 5
  },
  {
    name: 'Carlos Rivera',
    role: 'City Council Member',
    company: 'Fresno, CA',
    image: 'https://i.pinimg.com/474x/f0/4b/c7/f04bc7f4b16a2fc94078139ad03e6f88.jpg',
    quote: 'An essential tool for transparency and civic engagement in today’s digital age.',
    rating: 5
  },
  {
    name: 'Anna Lee',
    role: 'Public Policy Analyst',
    company: 'Oakland, CA',
    image: 'https://i.pinimg.com/474x/1f/5e/01/1f5e011e9b8dc817c581ad6f64819c6e.jpg',
    quote: 'CivicSense brings government data to life in ways that empower citizens to act.',
    rating: 5
  },
  {
    name: 'Raj Patel',
    role: 'Journalist',
    company: 'Berkeley, CA',
    image: 'https://i.pinimg.com/474x/83/8b/24/838b2427d975b902e9e63a11269d8606.jpg',
    quote: 'It’s like having city hall in your pocket. Smart, sleek, and incredibly useful.',
    rating: 5
  }
];

const Testimonial = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [imagesLoaded, setImagesLoaded] = useState(false);

  useEffect(() => {
    const preload = testimonials.map(t => {
      return new Promise((res, rej) => {
        const img = new Image();
        img.src = t.image;
        img.onload = res;
        img.onerror = rej;
      });
    });
    Promise.all(preload).then(() => setImagesLoaded(true));
  }, []);

  useEffect(() => {
    if (!imagesLoaded) return;
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [imagesLoaded]);

  return (
    <section className="bg-[#FAFAF0] py-12 px-4 overflow-hidden text-[#234B28] font-sans">
      <div className="container mx-auto text-center max-w-5xl">
        <div className="mb-4">
          <h2 className="text-3xl sm:text-4xl font-bold text-[#234B28] animate-gradient">
            What Our Users Are Saying
          </h2>
          <div className="h-1 w-16 bg-[#90EE90] mx-auto my-2"></div>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-[#234B28]/80 text-base sm:text-lg max-w-2xl mx-auto"
          >
            Hear how CivicSense is making a difference across communities and cities.
          </motion.p>
        </div>

        {!imagesLoaded ? (
          <div className="flex justify-center items-center h-48">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#90EE90]"></div>
          </div>
        ) : (
          <div className="relative flex justify-center items-center mt-4 min-h-[280px]">
            {testimonials.map((t, index) => {
              const offset = index - activeIndex;
              const visible = Math.abs(offset) <= 1;
              const scale = offset === 0 ? 1 : 0.85;
              const opacity = visible ? 1 : 0;
              const zIndex = 10 - Math.abs(offset);
              const translateX = `${offset * 260}px`;

              return (
                <div
                  key={index}
                  className="absolute transition-all duration-500 ease-in-out"
                  style={{
                    transform: `translateX(${translateX}) scale(${scale})`,
                    opacity,
                    zIndex,
                    pointerEvents: offset === 0 ? 'auto' : 'none',
                  }}
                >
                  <div className="bg-[#E6E6DA] text-[#234B28] rounded-xl p-6 w-80 shadow-xl border border-[#90EE90]">
                    <div className="flex justify-center mb-4">
                      <div className="relative">
                        <img
                          src={t.image}
                          alt={t.name}
                          className="w-20 h-20 rounded-full object-cover border-4 border-[#90EE90]"
                        />
                        <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 bg-[#90EE90] rounded-full p-1">
                          <FaQuoteLeft className="text-sm text-[#FAFAF0]" />
                        </div>
                      </div>
                    </div>
                    <p className="italic mb-3 text-sm">"{t.quote}"</p>
                    <div className="flex justify-center space-x-1 mb-2">
                      {[...Array(5)].map((_, i) => (
                        <FaStar
                          key={i}
                          className={`${i < t.rating ? 'text-[#90EE90]' : 'text-[#90EE90]/30'}`}
                        />
                      ))}
                    </div>
                    <h3 className="text-lg font-semibold text-[#234B28]">{t.name}</h3>
                    <p className="text-[#90EE90]/90 text-sm">{t.role}, {t.company}</p>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        <div className="flex justify-center mt-6 space-x-2">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => setActiveIndex(index)}
              className={`w-3 h-3 rounded-full transition-colors duration-300 ${
                index === activeIndex ? 'bg-[#90EE90]' : 'bg-[#90EE90]/30'
              }`}
            />
          ))}
        </div>
      </div>

      <style>
        {`
          @keyframes shimmer {
            0% {
              background-position: -200% 0;
            }
            100% {
              background-position: 200% 0;
            }
          }

          .animate-gradient {
            background-size: 200% auto;
            animation: shimmer 5s linear infinite;
          }
        `}
      </style>
    </section>
  );
};

export default Testimonial;
