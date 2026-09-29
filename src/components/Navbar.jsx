"use client";
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './Navbar.module.css';
import { FiPhoneCall } from 'react-icons/fi';

export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [hoveredLink, setHoveredLink] = useState(null);
  const [activeHash, setActiveHash] = useState('');

  useEffect(() => {
    setActiveHash(window.location.hash);
    
    const handleHashChange = () => {
      setActiveHash(window.location.hash);
    };
    
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Projects', path: '/projects' },
    { name: 'Overview', path: '/#about' },
    { name: 'Gallery', path: '/gallery' },
    { name: 'Contact Us', path: '/contact' }
  ];

  return (
    <header className={`${styles.header} ${scrolled ? styles.scrolled : ''}`}>
      <div className={styles.container}>
        <Link href="/" className={styles.logoWrapper}>
          <img src="/logo.png" alt="Vetical Builds Logo" className={styles.logoImg} />
          <span className={styles.logoText}>Vetical Builds</span>
        </Link>

        <nav className={styles.nav}>
          <div className={styles.navPillContainer}>
            <ul className={styles.navList}>
              <AnimatePresence>
                {navLinks.map((link) => {
                  let isActive = false;
                  if (link.path.includes('#')) {
                    const basePath = link.path.split('#')[0] || '/';
                    const hash = '#' + link.path.split('#')[1];
                    isActive = pathname === basePath && activeHash === hash;
                  } else if (link.path === '/') {
                    isActive = pathname === '/' && !activeHash;
                  } else {
                    isActive = pathname.startsWith(link.path);
                  }

                  return (
                    <li 
                      key={link.name} 
                      className={styles.navItem}
                      onMouseEnter={() => setHoveredLink(link.name)}
                      onMouseLeave={() => setHoveredLink(null)}
                    >
                      <Link
                        href={link.path} 
                        className={`${styles.navLink} ${isActive ? styles.activeText : ''}`}
                        onClick={() => {
                          if (link.path.includes('#')) {
                            setActiveHash('#' + link.path.split('#')[1]);
                          } else {
                            setActiveHash('');
                          }
                        }}
                      >
                        {isActive && (
                          <motion.div
                            layoutId="activeIndicator"
                            className={styles.activeBox}
                            transition={{ type: 'spring', bounce: 0.15, duration: 0.5 }}
                          />
                        )}
                        {hoveredLink === link.name && !isActive && (
                          <motion.div
                            layoutId="hoverIndicator"
                            className={styles.hoverBox}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ type: 'spring', bounce: 0.15, duration: 0.5 }}
                          />
                        )}
                        <span className={styles.navText}>{link.name}</span>
                      </Link>
                    </li>
                  );
                })}
              </AnimatePresence>
            </ul>
          </div>
        </nav>

        <a href="tel:+919501731511" className={styles.phoneCta}>
          <div className={styles.phoneIconWrapper}>
            <FiPhoneCall size={16} />
          </div>
          +91 95017 31511
        </a>
      </div>
    </header>
  );
}
