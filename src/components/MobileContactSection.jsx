"use client";
import { useState } from 'react';
import { FiPhoneCall, FiMail, FiMapPin, FiArrowRight, FiCheck } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './MobileContactSection.module.css';

export default function MobileContactSection() {
  const [formData, setFormData] = useState({ name: '', phone: '', email: '', project: '', message: '' });
  const [status, setStatus] = useState('idle'); // idle, loading, success, error

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const text = `Hi, I am interested in your projects.
Name: ${formData.name}
Phone: ${formData.phone}
Email: ${formData.email}
Project of Interest: ${formData.project || 'General'}
Message: ${formData.message}`;
    
    const encodedText = encodeURIComponent(text);
    window.open(`https://wa.me/919501731511?text=${encodedText}`, '_blank');
    
    setStatus('success');
    setFormData({ name: '', phone: '', email: '', project: '', message: '' });
  };

  const handleReset = () => {
    setStatus('idle');
  };

  return (
    <section className={styles.mobileSection}>
      <div className={styles.header}>
        <h2 className={styles.title}>Get In Touch</h2>
        <p className={styles.subtitle}>Book a site visit or inquire about our premium projects.</p>
      </div>

      {/* Quick Contact Chips Above Form */}
      <div className={styles.chipsContainer}>
        <a href="tel:+919501731511" className={styles.contactChip}>
          <div className={styles.chipIconWrapper}><FiPhoneCall size={18} /></div>
          <span>Call Us</span>
        </a>
        <a href="mailto:veticalbuilds@gmail.com" className={styles.contactChip}>
          <div className={styles.chipIconWrapper}><FiMail size={18} /></div>
          <span>Email</span>
        </a>
        <a href="https://maps.google.com/?q=No.145+KHB+Colony+5th+Block+Koramangala+Bangalore" target="_blank" rel="noopener noreferrer" className={styles.contactChip}>
          <div className={styles.chipIconWrapper}><FiMapPin size={18} /></div>
          <span>Locate</span>
        </a>
      </div>

      {/* Premium Glassmorphism Form Card */}
      <motion.div 
        className={styles.glassCard}
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <AnimatePresence mode="wait">
          {status === 'success' ? (
            <motion.div 
              key="success-view"
              className={styles.successView}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.4 }}
            >
              <div className={styles.successIconWrapper}>
                <motion.svg 
                  className={styles.successSvg} 
                  viewBox="0 0 50 50"
                  initial="hidden"
                  animate="visible"
                >
                  <motion.circle 
                    cx="25" cy="25" r="22" 
                    fill="transparent" 
                    stroke="#0E7A74" 
                    strokeWidth="3"
                    variants={{
                      hidden: { pathLength: 0 },
                      visible: { pathLength: 1, transition: { duration: 0.6, ease: "easeOut" } }
                    }}
                  />
                  <motion.path 
                    d="M16 26l6 6 13-13" 
                    fill="transparent" 
                    stroke="#0E7A74" 
                    strokeWidth="4" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                    variants={{
                      hidden: { pathLength: 0 },
                      visible: { pathLength: 1, transition: { duration: 0.4, delay: 0.4, ease: "easeOut" } }
                    }}
                  />
                </motion.svg>
              </div>
              <h3 className={styles.successTitle}>Inquiry Sent Successfully!</h3>
              <p className={styles.successMessage}>
                Thank you for contacting Vetical Builds Pvt Ltd. We've received your inquiry successfully. Our team will contact you shortly.
              </p>
              <button className={styles.doneBtn} onClick={handleReset}>
                Done
              </button>
            </motion.div>
          ) : (
            <motion.form 
              key="form-view"
              onSubmit={handleSubmit} 
              className={styles.form}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
            >
              <input type="text" name="_honey" style={{ display: 'none' }} />
              
              <div className={styles.inputWrapper}>
                <input 
                  type="text" 
                  id="m-name" 
                  name="name" 
                  required 
                  maxLength="100"
                  className={`${styles.inputField} ${formData.name ? styles.hasValue : ''}`} 
                  value={formData.name} 
                  onChange={handleChange} 
                />
                <label htmlFor="m-name" className={styles.floatingLabel}>Full Name</label>
              </div>

              <div className={styles.inputWrapper}>
                <input 
                  type="tel" 
                  id="m-phone" 
                  name="phone" 
                  required 
                  maxLength="20"
                  className={`${styles.inputField} ${formData.phone ? styles.hasValue : ''}`} 
                  value={formData.phone} 
                  onChange={handleChange} 
                />
                <label htmlFor="m-phone" className={styles.floatingLabel}>Phone Number</label>
              </div>

              <div className={styles.inputWrapper}>
                <input 
                  type="email" 
                  id="m-email" 
                  name="email" 
                  required 
                  maxLength="100"
                  className={`${styles.inputField} ${formData.email ? styles.hasValue : ''}`} 
                  value={formData.email} 
                  onChange={handleChange} 
                />
                <label htmlFor="m-email" className={styles.floatingLabel}>Email Address</label>
              </div>

              <div className={styles.inputWrapper}>
                <select 
                  id="m-project"
                  name="project" 
                  className={`${styles.inputField} ${styles.selectField} ${formData.project ? styles.hasValue : ''}`} 
                  required 
                  value={formData.project} 
                  onChange={handleChange}
                >
                  <option value="" disabled hidden></option>
                  <option value="Habulus">Habulus</option>
                  <option value="Abhee Celestial City">Abhee Celestial City</option>
                  <option value="Chanapattana">Chanapattana</option>
                  {/* <option value="Tru Aquapolis">Tru Aquapolis</option> */}
                </select>
                <label htmlFor="m-project" className={styles.floatingLabel}>Project Interested In</label>
              </div>

              <div className={styles.inputWrapper}>
                <textarea 
                  id="m-message"
                  name="message" 
                  maxLength="2000"
                  className={`${styles.inputField} ${styles.textareaField} ${formData.message ? styles.hasValue : ''}`} 
                  value={formData.message} 
                  onChange={handleChange}
                ></textarea>
                <label htmlFor="m-message" className={styles.floatingLabel}>Your Message (Optional)</label>
              </div>

              <button 
                type="submit" 
                className={`${styles.submitBtn} ${status === 'loading' ? styles.loadingBtn : ''}`}
                disabled={status === 'loading'}
              >
                {status === 'idle' && <>Submit Inquiry <FiArrowRight size={20} /></>}
                {status === 'loading' && 'Sending...'}
                {status === 'error' && 'Failed. Try Again.'}
              </button>
            </motion.form>
          )}
        </AnimatePresence>
      </motion.div>
    </section>
  );
}
