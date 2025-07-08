import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Menu, X, Calendar } from 'lucide-react';
import CombinedContactModal from './CombinedContactModal';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const location = useLocation();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    setMounted(true);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navBackground = mounted
    ? isScrolled
      ? 'bg-black/90 shadow-lg backdrop-blur-md'
      : 'bg-transparent backdrop-blur-sm'
    : 'bg-transparent';

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-300 ${navBackground} ${!isScrolled ? 'border-b border-white/10' : ''}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <a href="/" className="text-white hover:text-gray-200 transition-colors font-serif">
              <span className="text-base sm:text-lg font-medium">GOGOL•S</span>
              <span className="hidden sm:inline mx-3 text-gray-400">|</span>
              <span className="hidden sm:inline text-base sm:text-lg">Grota Solna & Pensjonat</span>
            </a>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href="/pensjonat"
              className={`transition-colors duration-300 ${location.pathname === '/pensjonat' ? 'text-blue-300' : 'text-white hover:text-blue-300'}`}
            >
              Pensjonat
            </motion.a>
            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href="/grotasolna"
              className={`transition-colors duration-300 ${location.pathname === '/grotasolna' ? 'text-red-300' : 'text-white hover:text-red-300'}`}
            >
              Grota Solna
            </motion.a>
            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsContactModalOpen(true)}
              style={{ cursor: 'pointer' }}
              className="bg-primary text-white px-6 py-2 rounded-md hover:bg-primary-hover transition-colors shadow-lg hover:shadow-xl hover:shadow-primary/20 font-serif font-medium flex items-center gap-2"
            >
              <Calendar size={18} />
              Rezerwuj
            </motion.a>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-white hover:text-gray-200"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div
          className={`md:hidden ${isScrolled ? 'bg-black/95' : 'bg-black/80'} backdrop-blur-md border-t border-white/10`}
        >
          <div className="px-4 pt-4 pb-6 space-y-3">
            <motion.a
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.1 }}
              href="/pensjonat"
              className={`${location.pathname === '/pensjonat' ? 'bg-primary text-white' : 'text-white'} block px-3 py-2 rounded-md text-base font-medium hover:bg-primary hover:text-white transition-colors`}
            >
              Pensjonat
            </motion.a>
            <motion.a
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              href="/grotasolna"
              className={`${location.pathname === '/grotasolna' ? 'bg-primary text-white' : 'text-white'} block px-3 py-2 rounded-md text-base font-medium hover:bg-primary hover:text-white transition-colors`}
            >
              Grota Solna
            </motion.a>
            <motion.a
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
              onClick={() => setIsContactModalOpen(true)}
              style={{ cursor: 'pointer' }}
              className="flex items-center gap-2 px-3 py-2 rounded-md text-base font-medium bg-primary text-white hover:bg-primary-hover transition-colors"
            >
              <Calendar size={18} />
              Rezerwuj
            </motion.a>
          </div>
        </div>
      )}
      
      <CombinedContactModal
        isOpen={isContactModalOpen}
        onClose={() => setIsContactModalOpen(false)}
      />
    </nav>
  );
};

export default Navbar;