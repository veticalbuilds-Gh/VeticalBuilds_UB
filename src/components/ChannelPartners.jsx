"use client";
import styles from './ChannelPartners.module.css';

export default function ChannelPartners() {
  const partners = [
    { name: "Habulus", logo: "/habulus_logo.jpg" },
    /* { name: "Tru Aquapolis", logo: "/Tru_aquapolis_logo.png" }, */
    { name: "Abhee Celestial City", logo: "/Abhee-Celestial-City-Logo-New.png" },
    { name: "Mahendra Arto Helix", logo: "/helix.jpeg" },
  ];

  // Duplicate the array a few times to ensure seamless infinite scroll
  const marqueeItems = [...partners, ...partners, ...partners, ...partners];

  return (
    <section className={styles.channelSection}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h3 className={styles.title}>Our Premium Channel Partners</h3>
        </div>
      </div>
      <div className={styles.marqueeContainer}>
        <div className={styles.marqueeTrack}>
          {marqueeItems.map((partner, index) => (
            <div key={index} className={styles.partnerItem}>
              <div className={styles.logoWrapper}>
                <img src={partner.logo} alt={partner.name} className={styles.logo} />
              </div>
              <span className={styles.partnerName}>{partner.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
