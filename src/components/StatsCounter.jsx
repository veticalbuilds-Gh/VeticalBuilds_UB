"use client";
import { motion } from 'framer-motion';
import CountUp from 'react-countup';
import { useInView } from 'react-intersection-observer';
import styles from './StatsCounter.module.css';

export default function StatsCounter() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.3,
  });

  const stats = [
    { number: 15, suffix: "+", label: "Years Experience" },
    { number: 500, suffix: "+", label: "Happy Families" },
    { number: 20, suffix: "+", label: "Projects Delivered" },
    { number: 100, suffix: "%", label: "Transparency" },
  ];

  return (
    <section className={styles.statsSection} ref={ref}>
      <div className={styles.container}>
        <div className={styles.grid}>
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              className={styles.statCard}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.8, delay: index * 0.15 }}
            >
              <h3 className={styles.statNumber}>
                {inView ? (
                  <CountUp end={stat.number} duration={2.5} />
                ) : (
                  "0"
                )}
                <span className={styles.suffix}>{stat.suffix}</span>
              </h3>
              <p className={styles.statLabel}>{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
