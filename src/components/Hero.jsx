"use client";
import { motion } from 'framer-motion';
import styles from './Hero.module.css';
import Link from 'next/link';

export default function Hero() {
  return (
    <section className={styles.heroSection}>
      <div className={styles.videoBackground}>
        <video
          autoPlay
          loop
          muted
          playsInline
          className={styles.video}
          // poster="/webbg.jpg"
          aria-label="Cinematic presentation of Vetical Builds premium real estate projects"
          title="Vetical Builds Real Estate Projects"
        >
          <source src="/background_video.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div className={styles.overlay}></div>
      </div>

      <div className={styles.contentContainer}>
        <motion.div
          className={styles.textContent}
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: { staggerChildren: 0.3, delayChildren: 0.2 }
            }
          }}
        >
          <motion.h1
            className={styles.headline}
            variants={{
              hidden: { opacity: 0, y: 30, scale: 0.95 },
              visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 1, ease: [0.16, 1, 0.3, 1] } }
            }}
          >
            Crafting Tomorrow's <br /><span className={styles.highlight}>Landmarks</span>
          </motion.h1>

          <motion.p
            className={styles.subHeading}
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0, transition: { duration: 1, ease: [0.16, 1, 0.3, 1] } }
            }}
          >
            Premium residential developments, plotted communities and construction solutions designed with quality, innovation and trust.
          </motion.p>

          <motion.div
            className={styles.ctaGroup}
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0, transition: { duration: 1, ease: [0.16, 1, 0.3, 1] } }
            }}
          >
            <Link href="/projects" className={styles.primaryCta}>Explore Projects</Link>
            <Link href="/contact" className={styles.secondaryCta}>Book Site Visit</Link>
          </motion.div>
        </motion.div>

      </div>
    </section>
  );
}
