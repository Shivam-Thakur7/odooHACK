import React from "react";
import { motion } from "framer-motion";

const journeyStats = [
  {
    icon: "🕳️",
    title: "Potholes Fixed",
    subtext: "1,275 reported issues resolved",
  },
  {
    icon: "💡",
    title: "Streetlights Restored",
    subtext: "892 repairs completed",
  },
  {
    icon: "🗑️",
    title: "Garbage Cleared",
    subtext: "2,043 waste reports addressed",
  },
  {
    icon: "🚰",
    title: "Water Issues Solved",
    subtext: "601 leakages repaired",
  },
];

const OurJourney = () => {
  return (
    <section className="bg-white py-16 text-center font-sans px-4 md:px-10">
      <h2 className="text-4xl md:text-5xl font-extrabold text-[#2D4739] mb-10 uppercase tracking-wide">
        OUR JOURNEY
      </h2>

      <div className="flex flex-wrap justify-center gap-8 max-w-6xl mx-auto mb-12">
        {journeyStats.map((stat, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.15 }}
            viewport={{ once: true }}
            className="flex flex-col items-center justify-center bg-[#F9FFF9] shadow-md rounded-3xl p-6 w-[250px] hover:scale-105 transition-all border-2 border-[#B1F22A]"
          >
            <div className="text-[48px] mb-4">{stat.icon}</div>
            <h3 className="font-bold text-lg text-[#2D4739] mb-1 leading-snug">
              {stat.title}
            </h3>
            <p className="text-sm text-[#4A654F] font-medium">{stat.subtext}</p>
          </motion.div>
        ))}
      </div>

      <div className="text-xl md:text-2xl font-bold text-[#2D4739]">
        <span className="text-black">Civic sense in action.</span>{" "}
        <span className="text-[#B1F22A]">One issue at a time.</span>
      </div>
    </section>
  );
};

export default OurJourney;
