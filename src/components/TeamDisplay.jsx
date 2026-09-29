"use client";
import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { FiMail, FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import styles from './TeamDisplay.module.css';

export default function TeamDisplay({ title, subtitle, members, variant = 'channel' }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const trackRef = useRef(null);

  const isDirectors = variant === 'directors';

  const handleScroll = () => {
    if (!trackRef.current) return;
    const scrollPosition = trackRef.current.scrollLeft;
    const itemWidth = trackRef.current.clientWidth;
    const newIndex = Math.round(scrollPosition / itemWidth);
    if (newIndex !== activeIndex && newIndex >= 0 && newIndex < members.length) {
      setActiveIndex(newIndex);
    }
  };

  const scrollToIndex = (index) => {
    if (!trackRef.current) return;
    const itemWidth = trackRef.current.clientWidth;
    trackRef.current.scrollTo({
      left: index * itemWidth,
      behavior: 'smooth'
    });
  };

  return (
    <div className={styles.teamComponent}>
      <div className={styles.container}>
        <motion.div 
          className={styles.header}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8 }}
        >
          <h4 className={styles.sectionSubtitle}>{title}</h4>
          <h2 className={styles.sectionTitle}>{subtitle}</h2>
        </motion.div>

        {/* Desktop Grid */}
        <motion.div 
          className={styles.desktopGrid}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1, transition: { staggerChildren: 0.2 } }
          }}
        >
          {members.map((member, index) => (
            <motion.div 
              key={index} 
              className={`${styles.memberCard} ${isDirectors ? styles.directorCard : styles.channelCard}`}
              variants={{
                hidden: { opacity: 0, y: 50 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
              }}
            >
              <div className={`${styles.imageWrapper} ${isDirectors ? styles.directorImageWrapper : styles.channelImageWrapper}`}>
                <Image 
                  src={member.image} 
                  alt={`${member.name} - ${member.role || 'Channel Team Member'} at Vetical Builds`} 
                  fill 
                  className={styles.profileImage} 
                  sizes="(max-width: 992px) 100vw, 33vw"
                  quality={90}
                  unoptimized={true}
                />
                <div className={styles.imageOverlay}></div>
              </div>
              <div className={styles.cardContent}>
                <h3 className={styles.memberName}>{member.name}</h3>
                {isDirectors ? (
                  <p className={styles.directorRole}>{member.role}</p>
                ) : (
                  <a href={`mailto:${member.email}`} className={styles.emailLink}>
                    <span className={styles.emailText}>{member.email}</span>
                    <span className={styles.emailAction}>Email &rarr;</span>
                  </a>
                )}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Mobile Swipe Carousel */}
        <div className={styles.mobileCarouselWrapper}>
          <div 
            className={styles.carouselTrack} 
            ref={trackRef}
            onScroll={handleScroll}
          >
            {members.map((member, index) => (
              <div key={index} className={styles.carouselItem}>
                <div className={`${styles.memberCard} ${isDirectors ? styles.directorCard : styles.channelCard}`}>
                  <div className={`${styles.imageWrapper} ${isDirectors ? styles.directorImageWrapper : styles.channelImageWrapper}`}>
                    <Image 
                      src={member.image} 
                      alt={`${member.name} - ${member.role || 'Channel Team Member'} at Vetical Builds`} 
                      fill 
                      className={styles.profileImage} 
                      sizes="(max-width: 992px) 100vw, 33vw"
                      quality={90}
                      unoptimized={true}
                    />
                    <div className={styles.imageOverlay}></div>
                  </div>
                  <div className={styles.cardContent}>
                    <h3 className={styles.memberName}>{member.name}</h3>
                    {isDirectors ? (
                      <p className={styles.directorRole}>{member.role}</p>
                    ) : (
                      <a href={`mailto:${member.email}`} className={styles.emailLink}>
                        <span className={styles.emailText}>{member.email}</span>
                        <div className={styles.mobileEmailBtn}>
                          <FiMail className={styles.mailIcon} /> Contact
                        </div>
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className={styles.carouselControls}>
            <button 
              className={styles.arrowBtn} 
              onClick={() => scrollToIndex(Math.max(0, activeIndex - 1))}
              disabled={activeIndex === 0}
              aria-label="Previous Team Member"
            >
              <FiChevronLeft size={20} />
            </button>
            
            <div className={styles.pagination}>
              <span className={styles.paginationText}>
                {(activeIndex + 1).toString().padStart(2, '0')} / {members.length.toString().padStart(2, '0')}
              </span>
            </div>

            <button 
              className={styles.arrowBtn} 
              onClick={() => scrollToIndex(Math.min(members.length - 1, activeIndex + 1))}
              disabled={activeIndex === members.length - 1}
              aria-label="Next Team Member"
            >
              <FiChevronRight size={20} />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
