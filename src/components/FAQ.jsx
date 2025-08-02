import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaChevronDown, FaMapMarkerAlt } from 'react-icons/fa';

function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      question: "What is CivicTrack?",
      answer: "CivicTrack is a community-first platform that allows citizens to report local civic issues like potholes, garbage overflow, and broken lights within their neighborhood radius."
    },
    {
      question: "How do I report an issue?",
      answer: "Just tap 'Report Issue,' enter a title, short description, select a category, and upload up to 5 photos. Your GPS location helps us pin the report on the local map."
    },
    {
      question: "Can I report issues anonymously?",
      answer: "Yes, you can choose to report anonymously. Verified users, however, may receive real-time updates and credibility scores for trusted reporting."
    },
    {
      question: "How is my issue tracked?",
      answer: "Every issue comes with a status log: Reported → In Progress → Resolved. You’ll receive notifications when there are updates or resolutions from authorities."
    },
    {
      question: "What happens to spam or false reports?",
      answer: "Reports flagged by multiple users are automatically hidden and reviewed by moderators. Repeat spammers can be banned to maintain platform integrity."
    }
  ];

  return (
    <section className="py-20 bg-[#FAFAF0] font-sans text-[#234B28]">
      <div className="container mx-auto px-6 sm:px-8">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-5xl font-bold"
          >
            Frequently Asked Questions
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-[#234B28]/80 text-lg max-w-2xl mx-auto mt-4"
          >
            Learn how CivicTrack helps you take action in your neighborhood.
          </motion.p>
        </div>

        <div className="max-w-3xl mx-auto space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              className="bg-white rounded-xl border border-[#E5E5DC] shadow-md overflow-hidden"
            >
              <motion.button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-[#F0F0E6] transition-colors"
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
              >
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 rounded-full bg-[#90EE90]/10 flex items-center justify-center">
                    <FaMapMarkerAlt className="text-[#90EE90]" />
                  </div>
                  <span className="text-lg font-medium">{faq.question}</span>
                </div>
                <motion.div
                  animate={{ rotate: openIndex === index ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <FaChevronDown className="text-[#90EE90]" />
                </motion.div>
              </motion.button>

              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-6 text-[#234B28]/80 leading-relaxed">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default FAQ;
