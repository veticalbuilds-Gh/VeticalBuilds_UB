"use client";
import Link from 'next/link';
import { motion } from 'framer-motion';
import BrochureButton from './BrochureButton';
import MobileProjectCarousel from './MobileProjectCarousel';
import styles from './ProjectGrid.module.css';

export default function ProjectGrid({ projects = [] }) {
  return (
    <section className={styles.projectSection}>
      <div className={styles.container}>
        <motion.div
          className={styles.header}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8 }}
        >
          <h4 className={styles.sectionSubtitle}>FEATURED PROJECTS</h4>
          <h3 className={styles.sectionTitle}>Premium Properties in Bangalore's Fastest-Growing Locations</h3>
        </motion.div>

        <motion.div
          className={styles.grid}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1, transition: { staggerChildren: 0.2 } }
          }}
        >
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              className={styles.card}
              variants={{
                hidden: { opacity: 0, y: 50 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
              }}
              whileHover="hover"
            >
              <div className={styles.imageContainer}>
                <motion.img
                  src={project.image}
                  alt={project.name}
                  className={styles.image}
                  variants={{
                    hover: { scale: 1.1 }
                  }}
                  transition={{ duration: 0.4 }}
                />
                <div className={styles.statusBadge}>{project.status}</div>
                <motion.div
                  className={styles.imageOverlay}
                  variants={{
                    hover: { opacity: 1 }
                  }}
                ></motion.div>
              </div>
              <div className={styles.cardContent}>
                <h3 className={styles.projectName}>{project.name}</h3>
                <p className={styles.projectLocation}>{project.location}</p>
                <p className={styles.projectDescription}>{project.description}</p>
                <div className={styles.projectDetails}>
                  <span className={styles.projectType}>{project.type}</span>
                  <span className={styles.projectPrice}>{project.price}</span>
                </div>
                <div className={styles.actionButtons}>
                  <BrochureButton projectName={project.name} brochureUrl={project.brochure} />
                  <Link href={`/gallery?project=${project.id}#gallery`} className={styles.detailsBtn}>
                    <span style={{ display: 'block', textAlign: 'center', width: '100%' }}>View Details</span>
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <MobileProjectCarousel projects={projects} />
      </div>
    </section>
  );
}
