"use client";
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { FaQuoteLeft } from 'react-icons/fa';
import styles from './Testimonials.module.css';

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const testimonials = [
    {
      name: "Rajesh & Priya Sharma",
      project: "Habulus Tranquil",
      text: "The quality of construction and the attention to detail is just phenomenal. We looked at 15 different properties before choosing Vetical Builds, and we couldn't be happier with our decision. It truly feels like a premium sanctuary.",
      image: "https://images.unsplash.com/photo-1542596594-649edbc13630?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
    },
    /*
    {
      name: "Siddarth Menon",
      project: "TRU Aquapolis",
      text: "What sold me was the absolute transparency throughout the buying process. From the legal paperwork to the master plan walkthrough, everything was handled with utmost professionalism. The lake view from my balcony is worth every penny.",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
    },
    */
    {
      name: "The Reddy Family",
      project: "Mahan Lake Prime",
      text: "We wanted a weekend getaway plot and found the perfect investment with Vetical Builds. The gated community amenities are exactly as promised in the brochures. Highly recommend them for anyone looking for plotted developments.",
      image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
    }
  ];

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  return (
    <section className={styles.testimonialSection}>
      <div className={styles.container}>
        <motion.div 
          className={styles.header}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h4 className={styles.sectionSubtitle}>Client Diaries</h4>
          <h2 className={styles.sectionTitle}>Stories of Trust</h2>
        </motion.div>

        <div className={styles.sliderContainer}>
          <button className={styles.navBtn} onClick={handlePrev}>
            <FiChevronLeft size={24} />
          </button>

          <div className={styles.cardWrapper}>
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                className={styles.testimonialCard}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
              >
                <div className={styles.quoteIconWrapper}>
                  <FaQuoteLeft className={styles.quoteIcon} />
                </div>
                
                <p className={styles.testimonialText}>
                  "{testimonials[currentIndex].text}"
                </p>
                
                <div className={styles.clientInfo}>
                  <img 
                    src={testimonials[currentIndex].image} 
                    alt={testimonials[currentIndex].name}
                    className={styles.clientImage} 
                  />
                  <div>
                    <h4 className={styles.clientName}>{testimonials[currentIndex].name}</h4>
                    <span className={styles.clientProject}>Owner at {testimonials[currentIndex].project}</span>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          <button className={styles.navBtn} onClick={handleNext}>
            <FiChevronRight size={24} />
          </button>
        </div>

        <div className={styles.dots}>
          {testimonials.map((_, idx) => (
            <button 
              key={idx} 
              className={`${styles.dot} ${idx === currentIndex ? styles.activeDot : ''}`}
              onClick={() => setCurrentIndex(idx)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
