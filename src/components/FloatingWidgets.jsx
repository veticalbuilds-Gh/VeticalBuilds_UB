"use client";
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaWhatsapp, FaPhoneAlt } from 'react-icons/fa';
import styles from './FloatingWidgets.module.css';

export default function FloatingWidgets() {
  const [isVisible, setIsVisible] = useState(false);
  const whatsappNumber = "919501731511"; // Formatted for wa.me link
  const callNumber = "+919501731511";

  useEffect(() => {
    // Show after scrolling down a bit
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          className={styles.widgetContainer}
        >
          {/* Desktop/Tablet Floating WhatsApp (Hidden on Mobile via CSS) */}
          <a
            href={`https://wa.me/${whatsappNumber}?text=Hi, I would like to inquire about your premium projects.`}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.floatingWhatsapp}
            aria-label="Chat on WhatsApp"
          >
            <div className={styles.waIconBox}>
              <FaWhatsapp size={32} />
            </div>
            <span className={styles.waTooltip}>Chat with us</span>
          </a>

          {/* Sticky Mobile Action Bar (Hidden on Desktop via CSS) */}
          <div className={styles.mobileActionBar}>
            <a href={`tel:${callNumber}`} className={styles.mobileCallBtn}>
              <FaPhoneAlt size={18} />
              <span>Call Now</span>
            </a>
            <a 
              href={`https://wa.me/${whatsappNumber}?text=Hi, I would like to inquire about your premium projects.`} 
              target="_blank" 
              rel="noopener noreferrer"
              className={styles.mobileWaBtn}
            >
              <FaWhatsapp size={20} />
              <span>WhatsApp</span>
            </a>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
