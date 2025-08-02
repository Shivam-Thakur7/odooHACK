import React from 'react';
import {
  FaHome,
  FaInfoCircle,
  FaUsers,
  FaEnvelope,
  FaPhoneAlt,
  FaMapMarkerAlt,
  FaLinkedin,
  FaTwitter,
  FaGithub,
} from 'react-icons/fa';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 },
  };

  return (
    <footer
      className="py-12 font-sans text-[#FAFAF0]"
      style={{
        background: "linear-gradient(135deg, #003224 0%, #1a2e2b 100%)",
      }}
    >
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
        >
          <motion.div variants={itemVariants}>
            <h2 className="text-2xl font-bold mb-4 flex items-center space-x-3">
              <span className="w-10 h-10 bg-[#90EE90] rounded-xl flex items-center justify-center">
                <FaUsers className="text-[#003224]" /> {/* Changed text for contrast */}
              </span>
              <span>CivicSense</span>
            </h2>
            <p className="text-[#FAFAF0]/80">
              Empowering local communities through smart civic engagement.
            </p>
            <div className="flex space-x-4 mt-6">
              {[FaLinkedin, FaTwitter, FaGithub].map((Icon, idx) => (
                <a key={idx} href="#" className="h-10 w-10 rounded-full bg-[#90EE90]/10 hover:bg-[#90EE90]/20 transition-all duration-300 flex items-center justify-center">
                  <Icon className="text-[#90EE90]" />
                </a>
              ))}
            </div>
          </motion.div>

          <motion.div variants={itemVariants}>
            <h3 className="text-xl font-semibold mb-4 border-b border-[#FAFAF0]/40 pb-1">Quick Links</h3>
            <ul className="space-y-3">
              {[
                { label: 'Home', icon: FaHome, route: '/' },
                { label: 'About Us', icon: FaInfoCircle, route: '/aboutus' },
                { label: 'Gallery', icon: FaUsers, route: '/gallery' },
                { label: 'Contact', icon: FaEnvelope, route: '/contact' },
              ].map(({ label, icon: Icon, route }) => (
                <li key={label}>
                  <Link to={route} className="flex items-center space-x-3 group">
                    <span className="h-8 w-8 rounded bg-[#FAFAF0]/10 group-hover:bg-[#90EE90]/20 transition-all flex items-center justify-center">
                      <Icon className="text-[#90EE90]" />
                    </span>
                    <span className="group-hover:text-[#90EE90] transition-colors">{label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div variants={itemVariants}>
            <h3 className="text-xl font-semibold mb-4 border-b border-[#FAFAF0]/40 pb-1">Our Services</h3>
            <ul className="space-y-3">
              {[
                "Complaint Management",
                "Smart Waste Tracking",
                "Public Awareness Drives",
                "Digital Civic Dashboard",
                "Real-time Issue Reporting",
              ].map((service, idx) => (
                <li key={idx} className="flex items-center space-x-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#90EE90]"></span>
                  <span className="text-sm">{service}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div variants={itemVariants}>
            <h3 className="text-xl font-semibold mb-4 border-b border-[#FAFAF0]/40 pb-1">Contact Us</h3>
            <ul className="space-y-4 text-sm">
              <li className="flex items-center space-x-3">
                <span className="h-10 w-10 rounded-full bg-[#90EE90]/10 flex items-center justify-center">
                  <FaEnvelope className="text-[#90EE90]" />
                </span>
                <span className="text-[#FAFAF0]/80">info@civicsense.org</span>
              </li>
              <li className="flex items-center space-x-3">
                <span className="h-10 w-10 rounded-full bg-[#90EE90]/10 flex items-center justify-center">
                  <FaPhoneAlt className="text-[#90EE90]" />
                </span>
                <span className="text-[#FAFAF0]/80">+91 98765 43210</span>
              </li>
              <li className="flex items-center space-x-3">
                <span className="h-10 w-10 rounded-full bg-[#90EE90]/10 flex items-center justify-center">
                  <FaMapMarkerAlt className="text-[#90EE90]" />
                </span>
                <span className="text-[#FAFAF0]/80">Civic Block, Smart City, India</span>
              </li>
            </ul>
          </motion.div>
        </motion.div>

        {/* Newsletter Section */}
        <motion.div
          className="mt-12 py-8 px-6 border border-[#FAFAF0]/20 rounded-lg bg-[#234B28]/90"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="md:w-1/2">
              <h3 className="text-xl font-semibold mb-1 text-[#FAFAF0]">Join Our Newsletter</h3>
              <p className="text-[#FAFAF0]/70">Stay informed about civic updates and events.</p>
            </div>
            <div className="w-full md:w-1/2">
              <div className="flex flex-col sm:flex-row gap-3">
                <input
                  type="email"
                  placeholder="Your email address"
                  className="bg-[#FAFAF0] text-[#234B28] border border-[#234B28]/30 rounded px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-[#90EE90]/40 w-full"
                />
                <button className="bg-[#90EE90] text-[#003224] rounded px-6 py-2.5 font-medium hover:bg-[#7CCD7C] transition-colors">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-[#FAFAF0]/20">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <motion.p
              className="text-sm text-[#FAFAF0]/60"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
            >
              &copy; {currentYear} CivicSense. All rights reserved.
            </motion.p>
            <motion.div
              className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-4 text-sm text-[#FAFAF0]/60"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
            >
              <a href="#" className="hover:text-[#90EE90] transition-colors">Terms</a>
              <a href="#" className="hover:text-[#90EE90] transition-colors">Privacy</a>
              <a href="#" className="hover:text-[#90EE90] transition-colors">Cookies</a>
            </motion.div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
