"use client";
import Link from 'next/link';
import { motion } from 'framer-motion';
import styles from './Footer.module.css';
import { FiFacebook, FiInstagram, FiLinkedin, FiTwitter } from 'react-icons/fi';
import MobileFooter from './MobileFooter';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <motion.div
          className={styles.grid}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
          }}
        >
          <motion.div
            className={styles.brandCol}
            variants={{
              hidden: { opacity: 0, y: 30 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
            }}
          >
            <Link href="/" className={styles.logo}>
              <img src="/logo.png" alt="Vetical Builds Logo" className={styles.logoImg} />
            </Link>
            <p className={styles.description}>
              Crafting Landmarks. Creating Legacies. Delivering premium residential and commercial developments with unmatched quality and trust.
            </p>
            <div className={styles.socialLinks}>
              <a href="https://www.instagram.com/veticalbuilds.in/" target="_blank" rel="noopener noreferrer" className={styles.socialIcon}><FiInstagram /></a>
              {/* <a href="#" aria-label="Facebook" target="_blank" rel="noopener noreferrer" className={styles.socialIcon}><FiFacebook /></a>
              <a href="#" aria-label="LinkedIn" className={styles.socialIcon}><FiLinkedin /></a>
              <a href="#" aria-label="Twitter" className={styles.socialIcon}><FiTwitter /></a> */}
            </div>
          </motion.div>

          <motion.div
            className={styles.linksCol}
            variants={{
              hidden: { opacity: 0, y: 30 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
            }}
          >
            <h4 className={styles.colTitle}>Quick Links</h4>
            <ul className={styles.linkList}>
              <li><Link href="/">Home</Link></li>
              <li><Link href="/about">About Us</Link></li>
              <li><Link href="/projects">Projects</Link></li>
              <li><Link href="/construction-services">Services</Link></li>
              <li><Link href="/contact">Contact</Link></li>
            </ul>
          </motion.div>

          <motion.div
            className={styles.linksCol}
            variants={{
              hidden: { opacity: 0, y: 30 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
            }}
          >
            <h4 className={styles.colTitle}>Legal</h4>
            <ul className={styles.linkList}>
              <li><Link href="/privacy-policy">Privacy Policy</Link></li>
            </ul>
          </motion.div>

          <motion.div
            className={styles.contactCol}
            variants={{
              hidden: { opacity: 0, y: 30 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
            }}
          >
            <h4 className={styles.colTitle}>Contact</h4>
            <p>No.145 KHB Colony, 5th Block<br />Koramangala, Bangalore - 560095</p>
            <p className={styles.phone}>+91 95017 31511</p>
          </motion.div>
        </motion.div>

        <div className={styles.bottomBar}>
          <p>&copy; {currentYear} Vetical Builds Pvt Ltd. All Rights Reserved.</p>
        </div>
      </div>
      <div className={styles.mobileFooterWrapper}>
        <MobileFooter />
      </div>
    </footer>
  );
}
