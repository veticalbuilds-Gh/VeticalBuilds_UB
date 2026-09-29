"use client";
import { useState, useRef, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { FiSearch, FiChevronLeft, FiChevronRight, FiMapPin } from 'react-icons/fi';
import BrochureButton from './BrochureButton';
import styles from './MobileProjectCarousel.module.css';

const filters = ["All", "Premium", "Luxury", "Plots", "Ongoing", "Completed"];

export default function MobileProjectCarousel({ projects }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("All");
  const [activeIndex, setActiveIndex] = useState(0);
  const trackRef = useRef(null);
  const router = useRouter();

  // Filter Logic
  const filteredProjects = useMemo(() => {
    return projects.filter(project => {
      const matchesSearch = project.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            project.location.toLowerCase().includes(searchQuery.toLowerCase());
      
      let matchesFilter = true;
      if (activeFilter !== "All") {
        const typeStr = project.type.toLowerCase();
        const statusStr = project.status.toLowerCase();
        const f = activeFilter.toLowerCase();
        matchesFilter = typeStr.includes(f) || statusStr.includes(f);
      }
      return matchesSearch && matchesFilter;
    });
  }, [projects, searchQuery, activeFilter]);

  const handleScroll = () => {
    if (!trackRef.current) return;
    const scrollPosition = trackRef.current.scrollLeft;
    const itemWidth = trackRef.current.clientWidth * 0.85; // 85vw
    const newIndex = Math.round(scrollPosition / itemWidth);
    if (newIndex !== activeIndex && newIndex >= 0 && newIndex < filteredProjects.length) {
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

  return (
    <div className={styles.mobileCarouselSection}>
      {/* Search Bar */}
      <div className={styles.searchContainer}>
        <div className={styles.searchInputWrapper}>
          <FiSearch className={styles.searchIcon} />
          <input 
            type="text" 
            placeholder="Search projects or locations..." 
            className={styles.searchInput}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Filter Chips */}
      <div className={styles.filtersWrapper}>
        <div className={styles.filtersTrack}>
          {filters.map(filter => (
            <button 
              key={filter}
              className={`${styles.filterChip} ${activeFilter === filter ? styles.activeFilter : ''}`}
              onClick={() => {
                setActiveFilter(filter);
                setActiveIndex(0); // reset index when filtering
                if(trackRef.current) trackRef.current.scrollTo({ left: 0 });
              }}
            >
              {filter}
            </button>
          ))}
        </div>
      </div>

      {/* Projects Carousel */}
      {filteredProjects.length > 0 ? (
        <>
          <div className={styles.carouselWrapper}>
            <div 
              className={styles.carouselTrack} 
              ref={trackRef}
              onScroll={handleScroll}
            >
              {filteredProjects.map((project, index) => (
                <div 
                  key={project.id} 
                  className={`${styles.carouselItem} ${index === activeIndex ? styles.activeItem : ''}`}
                >
                  <div 
                    className={styles.projectCard}
                    onClick={() => router.push(`/gallery?project=${project.id}`)}
                  >
                    <div className={styles.imageContainer}>
                      <img src={project.image} alt={project.name} loading="lazy" className={styles.projectImage} />
                      <div className={styles.statusBadge}>{project.status}</div>
                    </div>
                    
                    <div className={styles.cardContent}>
                      <h3 className={styles.projectName}>{project.name}</h3>
                      <p className={styles.projectLocation}><FiMapPin size={14}/> {project.location}</p>
                      
                      <div className={styles.detailsRow}>
                        <span className={styles.detailTag}>{project.type}</span>
                        <span className={styles.detailPrice}>{project.price}</span>
                      </div>
                      
                      <p className={styles.projectDescription}>{project.description}</p>
                      
                      <div 
                        className={styles.actionButtons}
                        onClick={(e) => e.stopPropagation()}
                      >
                        <BrochureButton projectName={project.name} brochureUrl={project.brochure} />
                        <Link href={`/gallery?project=${project.id}`} className={styles.detailsBtn}>
                          View Details
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Controls */}
          {filteredProjects.length > 1 && (
            <div className={styles.carouselControls}>
              <button 
                className={styles.arrowBtn} 
                onClick={() => scrollToIndex(Math.max(0, activeIndex - 1))}
                disabled={activeIndex === 0}
              >
                <FiChevronLeft size={20} />
              </button>
              
              <div className={styles.pagination}>
                {filteredProjects.map((_, idx) => (
                  <span 
                    key={idx} 
                    className={`${styles.dot} ${idx === activeIndex ? styles.activeDot : ''}`}
                    onClick={() => scrollToIndex(idx)}
                  />
                ))}
              </div>

              <button 
                className={styles.arrowBtn} 
                onClick={() => scrollToIndex(Math.min(filteredProjects.length - 1, activeIndex + 1))}
                disabled={activeIndex === filteredProjects.length - 1}
              >
                <FiChevronRight size={20} />
              </button>
            </div>
          )}
        </>
      ) : (
        /* Empty State */
        <motion.div 
          className={styles.emptyState}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <div className={styles.emptyIcon}>🔍</div>
          <h3>No Projects Found</h3>
          <p>We couldn't find any projects matching your search criteria. Please try adjusting your filters.</p>
          <button className={styles.clearBtn} onClick={() => { setSearchQuery(""); setActiveFilter("All"); }}>
            Clear Filters
          </button>
        </motion.div>
      )}
    </div>
  );
}
