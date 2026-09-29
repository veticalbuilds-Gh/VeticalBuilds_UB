"use client";
import { useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, useScroll, useTransform } from 'framer-motion';
import { FiArrowRight } from 'react-icons/fi';
import styles from './AboutPreview.module.css';

export default function AboutPreview() {
  const ref = useRef(null);

  return (
    <section className={styles.aboutSection} id="about" ref={ref}>
      {/* Decorative architectural grid overlay */}
      <div className={styles.architecturalGrid}></div>

      <div className={styles.container}>
        <div className={styles.contentColumn}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className={styles.eyebrowWrapper}>
              <span className={styles.sectionSubtitle}>ABOUT VETICAL BUILDS</span>
              <div className={styles.eyebrowLine}></div>
            </div>

            <h2 className={styles.sectionTitle}>
              Building Dreams <br />
              <span className={styles.titleItalic}>Into Reality</span>
            </h2>

            <p className={styles.description}>
              <span className={styles.dropCap}>V</span>etical Builds Pvt Ltd is a premium real estate and construction company dedicated to delivering landmark residential and commercial developments with unmatched quality, innovation, and customer satisfaction. Every project reflects our commitment to exceptional craftsmanship, sustainable practices, and creating spaces that stand the test of time.
            </p>

            <Link href="/projects" className={styles.exploreBtn}>
              <span className={styles.btnText}>EXPLORE OUR PROJECT</span>
              <FiArrowRight className={styles.btnIcon} />
              <div className={styles.btnLine}></div>
            </Link>
          </motion.div>
        </div>

        <div className={styles.imageColumn}>
          <div className={styles.imageComposition}>
            <motion.div
              className={styles.imageWrapper}
              initial={{ opacity: 0, clipPath: 'inset(10% 0% 10% 0% round 24px)' }}
              whileInView={{ opacity: 1, clipPath: 'inset(0% 0% 0% 0% round 24px)' }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            >
              <video
                src="/about.mp4"
                className={styles.image}
                autoPlay
                loop
                muted
                playsInline
                preload="auto"
              />
            </motion.div>
            <motion.div
              className={styles.imageMetadata}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <span className={styles.metadataNumber}>01</span>
              <span className={styles.metadataText}>BUILT WITH PURPOSE</span>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Trust Strip */}
      <motion.div
        className={styles.statsContainer}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <div className={styles.statItem}>
          <span className={styles.statIndex}>01</span>
          <span className={styles.statLabel}>RESIDENTIAL</span>
        </div>
        <div className={styles.statDivider}></div>
        <div className={styles.statItem}>
          <span className={styles.statIndex}>02</span>
          <span className={styles.statLabel}>COMMERCIAL</span>
        </div>
        <div className={styles.statDivider}></div>
        <div className={styles.statItem}>
          <span className={styles.statIndex}>03</span>
          <span className={styles.statLabel}>DEVELOPMENT</span>
        </div>
      </motion.div>
    </section>
  );
}
