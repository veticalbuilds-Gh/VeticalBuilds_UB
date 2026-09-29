"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { FiFacebook, FiInstagram, FiLinkedin, FiTwitter, FiPlus, FiMinus, FiPhone, FiMail } from 'react-icons/fi';
import { FaWhatsapp } from 'react-icons/fa';
import styles from './MobileFooter.module.css';

export default function MobileFooter() {
  const currentYear = new Date().getFullYear();
  const [openSection, setOpenSection] = useState(null);

  const toggleSection = (section) => {
    setOpenSection(openSection === section ? null : section);
  };

  const sections = [
    {
      id: 'quickLinks',
      title: 'Quick Links',
      links: [
        { name: 'Home', href: '/' },
        { name: 'About Us', href: '/about' },
        { name: 'Projects', href: '/projects' },
        { name: 'Services', href: '/construction-services' },
        { name: 'Contact', href: '/contact' },
      ]
    },
    {
      id: 'projects',
      title: 'Projects',
      links: [
        { name: 'Residential', href: '/projects?category=residential' },
        { name: 'Commercial', href: '/projects?category=commercial' },
      ]
    },
    {
      id: 'services',
      title: 'Services',
      links: [
        { name: 'Residential Construction', href: '/construction-services' },
        { name: 'Commercial Construction', href: '/construction-services' },
        { name: 'Turnkey Projects', href: '/construction-services' },
        { name: 'Architecture & Interior', href: '/construction-services' },
      ]
    },
    {
      id: 'company',
      title: 'Company',
      links: [
        { name: 'About Us', href: '/about' },
        { name: 'Careers', href: '/contact' }, // placeholder
      ]
    },
    {
      id: 'contact',
      title: 'Contact',
      content: (
        <div className={styles.accordionContact}>
          <p>No.145 KHB Colony, 5th Block<br />Koramangala, Bangalore - 560095</p>
          <a href="tel:+919501731511">+91 95017 31511</a>
          <a href="mailto:veticalbuilds@gmail.com">veticalbuilds@gmail.com</a>
        </div>
      )
    }
  ];

  return (
    <div className={styles.mobileFooterContainer}>
      {/* Always Visible Top Section */}
      <div className={styles.topSection}>
        <Link href="/" className={styles.logo}>
          <img src="/logo.png" alt="Vetical Builds Logo" className={styles.logoImg} />
        </Link>
        <p className={styles.description}>
          Crafting Landmarks. Creating Legacies. Delivering premium developments with unmatched quality.
        </p>
        
        <div className={styles.quickContact}>
          <a href="tel:+919501731511" className={styles.contactItem}>
            <FiPhone /> +91 95017 31511
          </a>
          <a href="mailto:veticalbuilds@gmail.com" className={styles.contactItem}>
            <FiMail /> veticalbuilds@gmail.com
          </a>
        </div>

        <div className={styles.actionRow}>
          <div className={styles.socialLinks}>
            <a href="https://www.instagram.com/veticalbuilds.in/" target="_blank" rel="noopener noreferrer" className={styles.socialIcon}><FiInstagram /></a>
            {/* Additional icons can be enabled here */}
          </div>
        </div>
      </div>

      {/* Accordion Navigation */}
      <div className={styles.accordionContainer}>
        {sections.map((section) => (
          <div key={section.id} className={styles.accordionItem}>
            <button 
              className={`${styles.accordionHeader} ${openSection === section.id ? styles.active : ''}`}
              onClick={() => toggleSection(section.id)}
            >
              <span>{section.title}</span>
              {openSection === section.id ? <FiMinus className={styles.indicator} /> : <FiPlus className={styles.indicator} />}
            </button>
            <AnimatePresence>
              {openSection === section.id && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: 'easeInOut' }}
                  className={styles.accordionBody}
                >
                  <div className={styles.accordionContent}>
                    {section.links ? (
                      <ul className={styles.linkList}>
                        {section.links.map((link, idx) => (
                          <li key={idx}>
                            <Link href={link.href}>{link.name}</Link>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      section.content
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>

      {/* Bottom Bar */}
      <div className={styles.bottomBar}>
        <p>&copy; {currentYear} Vetical Builds Pvt Ltd</p>
        <div className={styles.legalLinks}>
          <Link href="/privacy-policy">Privacy Policy</Link>
          <span>&middot;</span>
          <Link href="/terms-conditions">Terms</Link>
        </div>
      </div>
    </div>
  );
}
