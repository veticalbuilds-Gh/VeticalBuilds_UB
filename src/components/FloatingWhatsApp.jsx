"use client";
import { motion } from 'framer-motion';
import { FaWhatsapp } from 'react-icons/fa';
import styles from './FloatingWhatsApp.module.css';

export default function FloatingWhatsApp() {
  const phoneNumber = "919501731511"; // Include country code 91
  const message = encodeURIComponent("Hello! I'm interested in your premium real estate projects and would like to know more.");

  return (
    <motion.a
      href={`https://wa.me/${phoneNumber}?text=${message}`}
      target="_blank"
      rel="noopener noreferrer"
      className={styles.floatingWhatsapp}
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: 'spring', stiffness: 260, damping: 20, delay: 1 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
    >
      <div className={styles.pulseRing}></div>
      <FaWhatsapp className={styles.icon} />
    </motion.a>
  );
}
