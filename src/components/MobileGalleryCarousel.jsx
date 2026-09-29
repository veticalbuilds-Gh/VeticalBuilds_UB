"use client";
import { useState, useRef } from 'react';
import { FiChevronLeft, FiChevronRight, FiPlay } from 'react-icons/fi';
import Image from 'next/image';
import styles from './MobileGalleryCarousel.module.css';

export default function MobileGalleryCarousel({ mediaList, onMediaClick }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const trackRef = useRef(null);

  const handleScroll = () => {
    if (!trackRef.current) return;
    const scrollPosition = trackRef.current.scrollLeft;
    const itemWidth = trackRef.current.clientWidth * 0.85; // 85vw
    const newIndex = Math.round(scrollPosition / itemWidth);
    if (newIndex !== activeIndex && newIndex >= 0 && newIndex < mediaList.length) {
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
  };

  if (!mediaList || mediaList.length === 0) return null;

  return (
    <div className={styles.carouselWrapper}>
      <div 
        className={styles.carouselTrack} 
        ref={trackRef}
        onScroll={handleScroll}
      >
        {mediaList.map((media, index) => (
          <div 
            key={media.id} 
            className={`${styles.carouselItem} ${index === activeIndex ? styles.activeItem : ''}`}
            onClick={() => onMediaClick(index)}
          >
            <div className={styles.imageWrapper}>
              {media.type === 'VIDEO' ? (
                <>
                  <video src={media.src} className={styles.mediaContent} muted playsInline preload="metadata" />
                  <div className={styles.playIconOverlay}><FiPlay size={32} /></div>
                </>
              ) : (
                <Image src={media.src} alt={media.caption} className={styles.mediaContent} fill loading="lazy" style={{ objectFit: 'cover' }} sizes="(max-width: 768px) 100vw, 85vw" unoptimized />
              )}
            </div>
          </div>
        ))}
      </div>

      <div className={styles.carouselControls}>
        <button 
          className={styles.arrowBtn} 
          onClick={() => scrollToIndex(Math.max(0, activeIndex - 1))}
          disabled={activeIndex === 0}
        >
          <FiChevronLeft size={24} />
        </button>
        
        <div className={styles.counter}>
          {(activeIndex + 1).toString().padStart(2, '0')} / {mediaList.length.toString().padStart(2, '0')}
        </div>

        <button 
          className={styles.arrowBtn} 
          onClick={() => scrollToIndex(Math.min(mediaList.length - 1, activeIndex + 1))}
          disabled={activeIndex === mediaList.length - 1}
        >
          <FiChevronRight size={24} />
        </button>
      </div>
      
      <div className={styles.activeCaption}>
        {mediaList[activeIndex]?.caption}
      </div>
    </div>
  );
}
