"use client";
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './Preloader.module.css';

export default function Preloader() {
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setIsLoading(false);
      // If the user hard-refreshed on a sub-page, redirect them to the homepage
      if (window.location.pathname !== '/') {
        router.replace('/');
      }
    }, 2000); // 2 seconds cinematic reveal

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          key="preloader"
          className={styles.preloader}
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
        >
          <div className={styles.logoContainer}>
            <div className={styles.logoWrapper}>
              <img
                src="/logo.png"
                alt="Vetical Builds Logo"
                className={styles.logoImg}
              />
            </div>
            <div className={styles.loadingText}>
              Vetical Builds
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
