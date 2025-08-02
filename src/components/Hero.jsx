import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaCheckCircle, FaShieldAlt, FaUsers } from "react-icons/fa";
import TutorialSlides from "./TutorialSlides"; 

const Hero = () => {
  const [showTutorial, setShowTutorial] = useState(false);

  return (
    <section
      className="relative text-white py-16 px-4 md:px-12 lg:px-24 overflow-hidden"
      style={{
        background: "linear-gradient(135deg, #003224ff)",
      }}
    >
      {/* White spots overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
        style={{
          background: `
            radial-gradient(circle at 20% 30%, rgba(255,255,255,0.18) 0%, transparent 40%),
            radial-gradient(circle at 80% 20%, rgba(255,255,255,0.12) 0%, transparent 45%)
          `,
          zIndex: 0,
        }}
      />

      <div className="relative grid grid-cols-1 md:grid-cols-2 items-center gap-10 z-10">
        {/* Left Content */}
        <motion.div
          initial={{ x: -40, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="space-y-6"
        >
          <h1 className="text-4xl md:text-5xl font-bold leading-tight">
            Your City, <br className="hidden md:block" />
            Your <span className="text-[#90EE90]">Responsibility</span>
          </h1>
          <p className="text-lg text-gray-200">
            Report issues like potholes, garbage, and water leaks directly to your local authorities. 
            Be the change-maker your neighborhood needs.
          </p>
          <button
            onClick={() => setShowTutorial(true)}
            className="bg-[#1A5D1A] hover:bg-[#2E8B57] transition px-6 py-3 rounded-full text-white font-semibold shadow-lg w-fit"
          >
            Watch How CivicSense Works →
          </button>
        </motion.div>

        {/* Right Image */}
        <motion.div
          initial={{ x: 40, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="relative w-full max-w-sm mx-auto"
        >
          <div className="bg-none rounded-t-[3rem] overflow-hidden p-6 ">
            <img
              src="/image.png"
              alt="Citizen reporting pothole in the street"
              className="w-full h-auto object-cover"
            />
          </div>
        </motion.div>
      </div>

      {/* Bottom Feature Strip - Darker Background */}
      <div className="relative mt-16 z-10">
        <div className="bg-[#00271e] rounded-2xl p-10 grid grid-cols-1 md:grid-cols-3 gap-8 text-center text-sm text-gray-200 shadow-inner">
          <div className="flex flex-col items-center space-y-2">
            <FaCheckCircle size={24} className="text-[#90EE90]" />
            <p className="font-semibold">Instant Reporting</p>
            <p>Report an issue in under 60 seconds with real-time location tagging.</p>
          </div>
          <div className="flex flex-col items-center space-y-2">
            <FaShieldAlt size={24} className="text-[#90EE90]" />
            <p className="font-semibold">Secure Platform</p>
            <p>Your data is safe. Verified submissions, zero spam tolerance.</p>
          </div>
          <div className="flex flex-col items-center space-y-2">
            <FaUsers size={24} className="text-[#90EE90]" />
            <p className="font-semibold">Community Driven</p>
            <p>Join thousands of active users reporting and solving civic issues daily.</p>
          </div>
        </div>
      </div>

      {/* Tutorial Slides Overlay */}
      {showTutorial && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex justify-center items-center bg-black bg-opacity-80"
        >
          <div className="bg-white rounded-xl shadow-lg max-w-4xl w-full p-6 relative">
            <button
              className="absolute top-4 right-4 text-black font-bold text-xl"
              onClick={() => setShowTutorial(false)}
            >
              ×
            </button>
            <TutorialSlides />
             {/* Show TutorialSlides as a modal */}
      {showTutorial && (
        <TutorialSlides onClose={() => setShowTutorial(false)} />
      )}
          </div>
        </motion.div>
      )}
    </section>
  );
};

export default Hero;
