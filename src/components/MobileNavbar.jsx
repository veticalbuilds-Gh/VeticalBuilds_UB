"use client";
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMenu, FiX, FiPhoneCall } from 'react-icons/fi';
import styles from './MobileNavbar.module.css';

export default function MobileNavbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Projects', path: '/projects' },
    { name: 'Overview', path: '/#about' },
    { name: 'Gallery', path: '/gallery' },
    { name: 'Price', path: '/#price' },
    { name: 'Contact Us', path: '/contact' }
  ];

  // Prevent scroll when menu is open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; }
  }, [menuOpen]);

  return (
    <>
      <header className={`${styles.mobileHeader} ${scrolled ? styles.scrolled : ''}`}>
        <div className={styles.container}>
          <Link href="/" className={styles.logoWrapper} onClick={() => setMenuOpen(false)}>
            <img src="/logo.png" alt="Logo" className={styles.logoImg} />
            <span className={styles.logoText}>Vetical Builds</span>
          </Link>

          <div className={styles.actions}>
            <a href="tel:+919501731511" className={styles.phoneIcon}>
              <FiPhoneCall size={18} />
            </a>
            <button className={styles.menuToggle} onClick={() => setMenuOpen(true)}>
              <FiMenu size={24} />
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {menuOpen && (
          <motion.div 
            className={styles.fullscreenMenu}
            initial={{ y: '-100%' }}
            animate={{ y: 0 }}
            exit={{ y: '-100%' }}
            transition={{ type: 'tween', duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className={styles.menuHeader}>
              <Link href="/" className={styles.logoWrapper} onClick={() => setMenuOpen(false)}>
                <img src="/logo.png" alt="Logo" className={styles.logoImg} />
                <span className={styles.logoText}>Vetical Builds</span>
              </Link>
              <button className={styles.closeBtn} onClick={() => setMenuOpen(false)}>
                <FiX size={28} />
              </button>
            </div>

            <nav className={styles.menuNav}>
              {navLinks.map((link, i) => {
                const isActive = pathname === link.path || (link.path !== '/' && pathname.startsWith(link.path));
                return (
                  <motion.div 
                    key={link.name}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 + (i * 0.05) }}
                  >
                    <Link 
                      href={link.path}
                      className={`${styles.menuLink} ${isActive ? styles.activeLink : ''}`}
                      onClick={() => setMenuOpen(false)}
                    >
                      {link.name}
                    </Link>
                  </motion.div>
                );
              })}
            </nav>
            
            <motion.div 
              className={styles.menuFooter}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              <a href="tel:+919501731511" className={styles.menuCta}>
                <FiPhoneCall size={20} />
                Call Now: +91 95017 31511
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
