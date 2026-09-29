"use client";
import { motion } from 'framer-motion';
import styles from './ServicesList.module.css';
import { FiHome, FiBriefcase, FiKey, FiEdit3 } from 'react-icons/fi';
import MobileServicesCarousel from './MobileServicesCarousel';

export default function ServicesList() {
  const services = [
    {
      icon: <FiHome />,
      title: "Residential Construction",
      description: "Premium villas, bespoke independent houses, and high-end apartments built with uncompromising quality.",
      image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
    {
      icon: <FiBriefcase />,
      title: "Commercial Construction",
      description: "State-of-the-art office spaces, retail complexes, and commercial buildings designed for modern businesses.",
      image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
    {
      icon: <FiKey />,
      title: "Turnkey Projects",
      description: "End-to-end solutions from conceptualization and design to construction and final handover.",
      image: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
    {
      icon: <FiEdit3 />,
      title: "Architecture & Interior",
      description: "Innovative architectural design and luxurious interior spaces that reflect your unique style.",
      image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    }
  ];

  return (
    <section className={styles.servicesSection}>
      <div className={styles.container}>
        <motion.div 
          className={styles.header}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8 }}
        >
          <h4 className={styles.sectionSubtitle}>OUR EXPERTISE</h4>
          <h2 className={styles.sectionTitle}>Services</h2>
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
          {services.map((service, index) => (
            <motion.div 
              key={index} 
              className={styles.card}
              variants={{
                hidden: { opacity: 0, y: 50 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
              }}
            >
              <div className={styles.iconWrapper}>
                {service.icon}
              </div>
              <h3 className={styles.cardTitle}>{service.title}</h3>
              <p className={styles.cardDescription}>{service.description}</p>
            </motion.div>
          ))}
        </motion.div>

        <div className={styles.mobileCarouselWrapper}>
          <MobileServicesCarousel services={services} />
        </div>
      </div>
    </section>
  );
}
