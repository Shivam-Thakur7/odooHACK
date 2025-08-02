import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const features = [
  {
    title: 'Report Local Issues',
    description: 'Easily report civic problems like potholes, water leaks, or garbage via GPS-tagged forms.',
    image: 'pothole.png',
    alt: 'Report civic issues UI',
  },
  {
    title: 'Track Issue Status',
    description: 'Get real-time updates on the status of reported issues with complete transparency.',
    image: 'serv2.png',
    alt: 'Status tracking screen',
  },
  {
    title: 'Neighborhood View',
    description: 'See only relevant reports in your area with distance-based filtering and map pins.',
    image: 'serv3.png',
    alt: 'Map view of nearby reports',
  },
  {
    title: 'Community Moderation',
    description: 'Flag spam or irrelevant reports. Multiple flags auto-hide the report pending review.',
    image: 'serv4.png',
    alt: 'Community report moderation',
  },
  {
    title: 'Analytics & Admin Tools',
    description: 'Admins can view insights, manage reports, and take action against spam or abuse.',
    image: 'serv5.png',
    alt: 'Admin dashboard view',
  },
];

const FeatureCard = ({ feature, index, activeIndex, setActiveIndex }) => {
  const [ref, inView] = useInView({
    threshold: 0.5,
    triggerOnce: false,
  });

  useEffect(() => {
    if (inView) {
      setActiveIndex(index);
    }
  }, [inView, index, setActiveIndex]);

  return (
    <motion.div
      ref={ref}
      key={feature.title}
      className={`p-6 rounded-xl snap-start transition-transform duration-300 ${
        index === activeIndex
          ? 'bg-white bg-opacity-90 shadow-lg backdrop-blur-sm scale-105'
          : 'opacity-60 bg-white/60'
      }`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
    >
      <h3 className="text-2xl font-bold text-[#234D20]">{feature.title}</h3>
      <p className="text-[#3C5738] mt-2">{feature.description}</p>
    </motion.div>
  );
};

const FeaturesShowcase = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section className="w-full min-h-screen bg-[#FAFAF2] py-24 px-8">
      <div className="container mx-auto flex flex-col lg:flex-row items-center gap-12">
        {/* Left Image */}
        <div className="w-full lg:w-1/2 relative h-[400px] lg:h-[500px] flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.img
              key={features[activeIndex].image}
              src={features[activeIndex].image}
              alt={features[activeIndex].alt}
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 50 }}
              transition={{ duration: 0.6 }}
              className="rounded-xl shadow-2xl object-contain max-h-full max-w-full"
            />
          </AnimatePresence>
        </div>

        {/* Right Feature Stack */}
        <div
          className="w-full lg:w-1/2 max-h-[500px] overflow-y-auto scroll-smooth snap-y snap-mandatory space-y-12 pr-2"
          style={{
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
          }}
        >
          <style>
            {`
              ::-webkit-scrollbar {
                display: none;
              }
            `}
          </style>
          {features.map((feature, index) => (
            <FeatureCard
              key={feature.title}
              feature={feature}
              index={index}
              activeIndex={activeIndex}
              setActiveIndex={setActiveIndex}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesShowcase;
