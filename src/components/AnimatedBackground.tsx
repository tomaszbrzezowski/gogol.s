import React from 'react';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

interface AnimatedBackgroundProps {
  imageUrl: string;
  children: React.ReactNode;
}

const AnimatedBackground = ({ imageUrl, children }: AnimatedBackgroundProps) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [image, setImage] = useState<HTMLImageElement | null>(null);

  useEffect(() => {
    const img = new Image();
    img.src = imageUrl;
    img.onload = () => {
      setImage(img);
      setImageLoaded(true);
    };
  }, [imageUrl]);

  return (
    <section className="relative min-h-screen overflow-hidden" style={{ height: 'calc(100vh + 4rem)' }}>
      <motion.div
        initial={{ scale: 1.1, opacity: 0 }}
        animate={{ 
          scale: 1,
          opacity: imageLoaded ? 1 : 0,
        }}
        transition={{ 
          duration: 1.5,
          ease: "easeOut"
        }}
        className="absolute inset-0"
      >
        {/* Loading placeholder */}
        <motion.div
          initial={{ opacity: 1 }}
          animate={{ opacity: imageLoaded ? 0 : 1 }}
          className="absolute inset-0 bg-gradient-to-b from-gray-900 to-black"
        />

        <div
          className={`absolute inset-0 shadow-[0_35px_60px_-15px_rgba(0,0,0,0.5)] transition-all duration-700 ${
            imageLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          style={{
            backgroundImage: `url("${imageUrl}")`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            backgroundAttachment: 'fixed',
            filter: 'contrast(1.1) brightness(1.1)',
            willChange: 'transform',
            transform: 'translateZ(0)',
          }}
        />
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: imageLoaded ? 1 : 0 }}
          transition={{ duration: 1 }}
          className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/40"
        />
      </motion.div>
      <div className="relative h-full pt-16">
        {children}
      </div>
    </section>
  );
};

export default AnimatedBackground;