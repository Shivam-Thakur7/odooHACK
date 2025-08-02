import React, { useState, useEffect } from 'react';
import {
  FaBars,
  FaTimes,
  FaUser,
  FaSignOutAlt,
  FaShoppingCart,
} from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';

function Navbar({ user, onSignOut }) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavigation = (path) => {
    if (path.startsWith('/#')) {
      const sectionId = path.slice(2);
      const element = document.getElementById(sectionId);
      if (element) element.scrollIntoView({ behavior: 'smooth' });
    } else {
      navigate(path);
    }
    setIsOpen(false);
  };

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Services', path: '/report' },
    { name: 'Categories', path: '/#about' },
    { name: 'Testimonials', path: '/#testimonials' },
    { name: 'FAQ', path: '/#faq' },
    { name: 'Contact', path: '/#contact' },
    ...(user
      ? [
          { name: user.name, icon: <FaUser />, path: '/profile' },
          { name: 'Sign Out', icon: <FaSignOutAlt />, onClick: onSignOut },
        ]
      : [{ name: 'Sign In', icon: <FaUser />, path: '/signin' }]),
  ];

  const isActive = (path) => {
    if (!path) return false;
    if (path.startsWith('/#')) {
      const hash = `#${path.slice(2)}`;
      return location.pathname === '/' && window.location.hash === hash;
    }
    return location.pathname === path;
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[#003C2E]/90 backdrop-blur-md shadow-md border-b border-[#015E47]'
          : 'bg-[#003C2E]/70'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center space-x-3 cursor-pointer"
            onClick={() => handleNavigation('/')}
          >
            <img
              src="/logo.png"
              alt="CivicSense Logo"
              className="w-20 h-25  rounded-xl "
            />
          </motion.div>

          {/* Desktop Nav */}
          <div className="hidden md:flex space-x-8 items-center">
            {navItems.map((item) => (
              <motion.button
                key={item.name}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={item.onClick || (() => handleNavigation(item.path))}
                className={`flex items-center space-x-2 text-sm font-semibold tracking-wide transition-colors duration-300 ${
                  isActive(item.path)
                    ? 'text-white underline underline-offset-4'
                    : 'text-white/80 hover:text-white'
                }`}
              >
                {item.icon}
                <span>{item.name}</span>
              </motion.button>
            ))}
          </div>

         

          {/* Mobile Menu Toggle */}
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-white ml-3"
          >
            {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </motion.button>
        </div>

        {/* Mobile Dropdown */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-[#003C2E]/95 backdrop-blur-sm border-t border-[#015E47] px-4 pb-4 pt-2 rounded-b-lg"
            >
              {navItems.map((item, index) => (
                <motion.button
                  key={item.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  onClick={item.onClick || (() => handleNavigation(item.path))}
                  className={`w-full flex items-center space-x-3 py-2 text-base font-semibold tracking-wide ${
                    isActive(item.path)
                      ? 'text-white underline underline-offset-4'
                      : 'text-white/80 hover:text-white'
                  }`}
                >
                  {item.icon}
                  <span>{item.name}</span>
                </motion.button>
              ))}

             
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
}

export default Navbar;
