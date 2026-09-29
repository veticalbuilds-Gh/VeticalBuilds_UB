"use client";
import { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { FiX, FiPlay, FiMapPin, FiCheckCircle, FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import BrochureButton from './BrochureButton';
import MobileGalleryCarousel from './MobileGalleryCarousel';
import styles from './Gallery.module.css';

export default function Gallery({ projects = [] }) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const projectParam = searchParams.get('project');

  // Derive activeTab from URL, avoiding stale state and duplicated state variables
  const activeTab = (projectParam && projects.some(p => p.id === projectParam)) 
    ? projectParam 
    : (projects.length > 0 ? projects[0].id : null);

  const [activeFilter, setActiveFilter] = useState('ALL');
  const [viewerIndex, setViewerIndex] = useState(null);

  // Reset viewer and filters when the active project changes
  useEffect(() => {
    setActiveFilter('ALL');
    setViewerIndex(null);
  }, [activeTab]);

  const handleTabClick = (projectId) => {
    // Navigate via router to update URL state, keeping #gallery as the target
    router.replace(`/gallery?project=${projectId}#gallery`, { scroll: false });
  };

  if (!projects || projects.length === 0) {
    return <div style={{ textAlign: 'center', padding: '100px', color: 'var(--text-light-grey)' }}>No projects available.</div>;
  }

  const activeProject = projects.find(p => p.id === activeTab) || projects[0];

  const allMedia = [];
  if (activeProject.video && typeof activeProject.video === 'string' && activeProject.video.trim() !== '') {
    allMedia.push({ type: 'VIDEO', src: activeProject.video, caption: 'Cinematic Walkthrough', id: 'vid-1' });
  }
  if (activeProject.images && Array.isArray(activeProject.images)) {
    activeProject.images.forEach((img, idx) => {
      if (img && typeof img === 'string' && img.trim() !== '') {
        // Prevent 200MP massive images from crashing Next.js by using Sanity's CDN to downscale first
        const optimizedSrc = img.includes('cdn.sanity.io') 
          ? `${img}${img.includes('?') ? '&' : '?'}w=1920&q=80&auto=format` 
          : img;
        allMedia.push({ type: 'IMAGE', src: optimizedSrc, caption: `${activeProject.name} premium residential real estate project view ${idx + 1}`, id: `img-${idx}` });
      }
    });
  }

  const filteredMedia = activeFilter === 'ALL'
    ? allMedia
    : allMedia.filter(m => m.type === activeFilter);

  const heroMedia = allMedia.length > 0 ? allMedia[0] : null;

  const nextViewerMedia = () => {
    if (viewerIndex < filteredMedia.length - 1) setViewerIndex(viewerIndex + 1);
  };
  const prevViewerMedia = () => {
    if (viewerIndex > 0) setViewerIndex(viewerIndex - 1);
  };

  return (
    <section id="gallery" className={styles.projectDetailSection}>
      <div className={styles.container}>

        {/* Project Selection Tabs */}
        <div className={styles.tabsContainer}>
          {projects.map((project) => (
            <button
              key={project.id}
              className={`${styles.tabBtn} ${activeTab === project.id ? styles.activeTab : ''}`}
              onClick={() => handleTabClick(project.id)}
            >
              {project.name}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className={styles.projectContent}
          >
            {/* Cinematic Hero Section */}
            {heroMedia && (
              <div className={styles.heroGalleryWrapper}>
                <div className={styles.heroTextOverlay}>
                  <motion.h2
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className={styles.heroGalleryTitle}
                  >

                  </motion.h2>
                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                    className={styles.heroScrollPrompt}
                    onClick={() => document.getElementById('gallery-grid')?.scrollIntoView({ behavior: 'smooth' })}
                    style={{ cursor: 'pointer' }}
                  >
                    Explore Gallery ↓
                  </motion.p>
                </div>
                <div className={styles.heroMediaContainer}>
                  {heroMedia.type === 'VIDEO' ? (
                    <video src={heroMedia.src} className={styles.heroMedia} muted loop autoPlay playsInline preload="auto" />
                  ) : (
                    <Image src={heroMedia.src} alt={heroMedia.caption} className={styles.heroMedia} fill priority style={{ objectFit: 'cover' }} unoptimized />
                  )}
                  <div className={styles.heroCounter}>01 / {allMedia.length.toString().padStart(2, '0')}</div>
                </div>
              </div>
            )}

            {/* Overview & Amenities (Editorial Layout) */}
            <div className={styles.editorialSection}>
              <div className={styles.editorialLeft}>
                <h3 className={styles.projectName}>{activeProject.name}</h3>
                <p className={styles.locationText}><FiMapPin /> {activeProject.location}</p>
                <p className={styles.description}>{activeProject.overview || activeProject.description}</p>
                <div className={styles.actionContainer}>
                  {activeProject.brochure && (
                    <BrochureButton projectName={activeProject.name} brochureUrl={activeProject.brochure} />
                  )}
                </div>
              </div>
              <div className={styles.editorialRight}>
                <h4 className={styles.subHeading}>Premium Amenities</h4>
                <div className={styles.amenitiesGrid}>
                  {activeProject.amenities && activeProject.amenities.map((amenity, idx) => (
                    <div key={idx} className={styles.amenityItem}>
                      <FiCheckCircle className={styles.amenityIcon} />
                      <span>{amenity}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* 3D Gallery Section */}
            <div id="gallery-grid" className={styles.galleryContainer}>
              <div className={styles.galleryFilters}>
                {['ALL', 'IMAGE', 'VIDEO'].map(filter => (
                  <button
                    key={filter}
                    className={`${styles.filterBtn} ${activeFilter === filter ? styles.activeFilter : ''}`}
                    onClick={() => setActiveFilter(filter)}
                  >
                    {filter === 'IMAGE' ? 'IMAGES' : filter === 'VIDEO' ? 'VIDEOS' : 'ALL'}
                  </button>
                ))}
              </div>

              {/* Desktop 3D Depth Grid */}
              <div className={styles.desktop3DGrid}>
                {filteredMedia.map((media, idx) => (
                  <motion.div
                    key={media.id}
                    className={`${styles.depthCard} ${idx % 3 === 1 ? styles.cardSecondary : styles.cardPrimary}`}
                    onClick={() => setViewerIndex(idx)}
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.6, delay: (idx % 3) * 0.1 }}
                  >
                    <div className={styles.cardImageWrapper}>
                      {media.type === 'VIDEO' ? (
                        <>
                          <video src={media.src} className={styles.depthMedia} muted playsInline preload="metadata" />
                          <div className={styles.playIconOverlay}><FiPlay size={32} /></div>
                        </>
                      ) : (
                        <Image src={media.src} alt={media.caption} className={styles.depthMedia} fill loading="lazy" style={{ objectFit: 'cover' }} sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" unoptimized />
                      )}
                      <div className={styles.cardHoverOverlay}>
                        <span className={styles.cardCounter}>{(idx + 1).toString().padStart(2, '0')} / {filteredMedia.length}</span>
                        <span className={styles.cardCaption}>{media.caption}</span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Mobile Swipe Gallery */}
              <div className={styles.mobileCarouselWrapper}>
                <MobileGalleryCarousel
                  mediaList={filteredMedia}
                  onMediaClick={(idx) => setViewerIndex(idx)}
                />
              </div>
            </div>

          </motion.div>
        </AnimatePresence>
      </div>

      {/* Premium Fullscreen Viewer */}
      <AnimatePresence>
        {viewerIndex !== null && (
          <motion.div
            className={styles.premiumViewer}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            <div className={styles.viewerHeader}>
              <div className={styles.viewerMetadata}>
                <span className={styles.viewerProject}>{activeProject.name}</span>
                <span className={styles.viewerCategory}>{filteredMedia[viewerIndex].type}</span>
              </div>
              <div className={styles.viewerCounter}>
                {(viewerIndex + 1).toString().padStart(2, '0')} / {filteredMedia.length.toString().padStart(2, '0')}
              </div>
              <button className={styles.viewerClose} onClick={() => setViewerIndex(null)}>
                <FiX size={32} />
              </button>
            </div>

            <div className={styles.viewerContentArea}>
              <button className={`${styles.viewerNav} ${styles.navLeft}`} onClick={(e) => { e.stopPropagation(); prevViewerMedia(); }} disabled={viewerIndex === 0}>
                <FiChevronLeft size={48} />
              </button>

              <AnimatePresence mode="wait">
                <motion.div
                  key={viewerIndex}
                  className={styles.viewerMediaWrapper}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.05 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                  onClick={(e) => e.stopPropagation()}
                >
                  {filteredMedia[viewerIndex].type === 'VIDEO' ? (
                    <video src={filteredMedia[viewerIndex].src} controls autoPlay className={styles.viewerVideo} preload="auto" />
                  ) : (
                    <Image 
                      src={filteredMedia[viewerIndex].src} 
                      alt={filteredMedia[viewerIndex].caption} 
                      className={styles.viewerImg} 
                      fill 
                      style={{ objectFit: 'contain' }} 
                      quality={85}
                      priority
                      sizes="100vw"
                      unoptimized
                    />
                  )}
                  {/* Preload Next Image */}
                  {viewerIndex < filteredMedia.length - 1 && filteredMedia[viewerIndex + 1].type === 'IMAGE' && (
                    <div style={{ display: 'none' }}>
                      <Image src={filteredMedia[viewerIndex + 1].src} alt="preload" fill priority sizes="100vw" unoptimized />
                    </div>
                  )}
                  {/* Preload Prev Image */}
                  {viewerIndex > 0 && filteredMedia[viewerIndex - 1].type === 'IMAGE' && (
                    <div style={{ display: 'none' }}>
                      <Image src={filteredMedia[viewerIndex - 1].src} alt="preload" fill priority sizes="100vw" unoptimized />
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>

              <button className={`${styles.viewerNav} ${styles.navRight}`} onClick={(e) => { e.stopPropagation(); nextViewerMedia(); }} disabled={viewerIndex === filteredMedia.length - 1}>
                <FiChevronRight size={48} />
              </button>
            </div>
            <div className={styles.viewerCaption}>
              {filteredMedia[viewerIndex].caption}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
