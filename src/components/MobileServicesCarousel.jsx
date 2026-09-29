"use client";
import React, { useRef, useState } from 'react';
import { FiChevronLeft, FiChevronRight, FiArrowRight } from 'react-icons/fi';
import styles from './MobileServicesCarousel.module.css';

export default function MobileServicesCarousel({ services }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const trackRef = useRef(null);

  const handleScroll = () => {
    if (!trackRef.current) return;
    const scrollPosition = trackRef.current.scrollLeft;
    const itemWidth = trackRef.current.clientWidth * 0.85; // matches CSS width
    const newIndex = Math.round(scrollPosition / itemWidth);
    if (newIndex !== activeIndex && newIndex >= 0 && newIndex < services.length) {
      setActiveIndex(newIndex);
    }
  };

  const scrollToIndex = (index) => {
    if (!trackRef.current) return;
    const itemWidth = trackRef.current.clientWidth * 0.85;
    trackRef.current.scrollTo({
      left: index * itemWidth,
      behavior: 'smooth'
    });
    setActiveIndex(index);
  };

  const nextSlide = () => {
    if (activeIndex < services.length - 1) scrollToIndex(activeIndex + 1);
  };

  const prevSlide = () => {
    if (activeIndex > 0) scrollToIndex(activeIndex - 1);
  };

  return (
    <div className={styles.carouselContainer}>
      <div 
        className={styles.carouselTrack} 
        ref={trackRef}
        onScroll={handleScroll}
      >
        {services.map((service, index) => (
          <div key={index} className={styles.serviceCard}>
            <div className={styles.imageWrapper}>
              <img src={service.image} alt={service.title} loading="lazy" className={styles.serviceImage} />
              <div className={styles.iconBadge}>
                {service.icon}
              </div>
            </div>
            <div className={styles.contentWrapper}>
              <h3 className={styles.serviceTitle}>{service.title}</h3>
              <p className={styles.serviceDescription}>{service.description}</p>
            </div>
          </div>
        ))}
      </div>

      <div className={styles.controls}>
        <button 
          className={`${styles.navBtn} ${activeIndex === 0 ? styles.disabled : ''}`}
          onClick={prevSlide}
          disabled={activeIndex === 0}
          aria-label="Previous service"
        >
          <FiChevronLeft size={24} />
        </button>

        <div className={styles.pagination}>
          <span className={styles.currentPage}>{(activeIndex + 1).toString().padStart(2, '0')}</span>
          <span className={styles.separator}>/</span>
          <span className={styles.totalPages}>{services.length.toString().padStart(2, '0')}</span>
        </div>

        <button 
          className={`${styles.navBtn} ${activeIndex === services.length - 1 ? styles.disabled : ''}`}
          onClick={nextSlide}
          disabled={activeIndex === services.length - 1}
          aria-label="Next service"
        >
          <FiChevronRight size={24} />
        </button>
      </div>
    </div>
  );
}
