"use client";
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './ContactPopup.module.css';
import { FiX } from 'react-icons/fi';

export default function ContactPopup() {
  const [isOpen, setIsOpen] = useState(false);
  const [isGlobalModalOpen, setIsGlobalModalOpen] = useState(false);
  const [formData, setFormData] = useState({ name: '', phone: '', email: '' });
  const [status, setStatus] = useState('idle'); // idle, loading, success, error

  useEffect(() => {
    const handleGlobalModal = (e) => setIsGlobalModalOpen(e.detail.isOpen);
    window.addEventListener('globalModalState', handleGlobalModal);
    return () => window.removeEventListener('globalModalState', handleGlobalModal);
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const text = `Hi, I am interested in your projects.
Name: ${formData.name}
Phone: ${formData.phone}
Email: ${formData.email}`;
    
    const encodedText = encodeURIComponent(text);
    window.open(`https://wa.me/919501731511?text=${encodedText}`, '_blank');
    
    setStatus('success');
    setTimeout(() => {
      setIsOpen(false);
      setStatus('idle');
      setFormData({ name: '', phone: '', email: '' });
    }, 2000);
  };

  useEffect(() => {
    // Show popup every 2 minutes (120,000 ms)
    const interval = setInterval(() => {
      setIsOpen(true);
    }, 120000);

    // Initial show after 15 seconds
    const initialTimeout = setTimeout(() => {
      setIsOpen(true);
    }, 15000);

    return () => {
      clearInterval(interval);
      clearTimeout(initialTimeout);
    };
  }, []);

  if (!isOpen || isGlobalModalOpen) return null;

  return (
    <AnimatePresence>
      <div className={styles.overlay}>
        <motion.div
          className={styles.popup}
          initial={{ opacity: 0, scale: 0.9, x: 50 }}
          animate={{ opacity: 1, scale: 1, x: 0 }}
          exit={{ opacity: 0, scale: 0.9, x: 50 }}
          transition={{ duration: 0.4 }}
        >
          <button className={styles.closeBtn} onClick={() => setIsOpen(false)}>
            <FiX size={24} />
          </button>
          
          <div className={styles.header}>
            <h3 className={styles.title}>Interested in Premium Living?</h3>
            <p className={styles.subtitle}>Book a site visit or drop your inquiry. Our experts will get in touch with you shortly.</p>
          </div>

          <form className={styles.form} onSubmit={handleSubmit}>
            <div className={styles.inputGroup}>
              <input type="text" name="name" placeholder="Full Name" required className={styles.input} value={formData.name} onChange={handleChange} />
            </div>
            <div className={styles.inputGroup}>
              <input type="tel" name="phone" placeholder="Phone Number" required className={styles.input} value={formData.phone} onChange={handleChange} />
            </div>
            <div className={styles.inputGroup}>
              <input type="email" name="email" placeholder="Email Address" className={styles.input} value={formData.email} onChange={handleChange} />
            </div>
            
            <button type="submit" className={styles.submitBtn} disabled={status === 'loading' || status === 'success'}>
              {status === 'loading' ? 'Sending...' : status === 'success' ? 'Sent Successfully!' : 'Request Call Back'}
            </button>
            
            {status === 'error' && (
              <p style={{ color: '#C62828', fontSize: '0.85rem', marginTop: '0.5rem', textAlign: 'center' }}>
                Failed to send. Please try again.
              </p>
            )}
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
