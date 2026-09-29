"use client";
import styles from './TrustBadges.module.css';

export default function TrustBadges() {
  const partners = [
    "HDFC Bank Approved",
    "SBI Home Loans",
    "ICICI Bank",
    "Axis Bank",
    "RERA Compliant",
    "BDA Approved",
    "CREDAI Member"
  ];

  return (
    <section className={styles.trustSection}>
      <div className={styles.container}>
        <div className={styles.marqueeContainer}>
          <div className={styles.marquee}>
            {[...partners, ...partners, ...partners].map((partner, index) => (
              <div key={index} className={styles.badge}>
                <span className={styles.badgeIcon}>✓</span>
                {partner}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
