"use client";
import { FiDownload } from 'react-icons/fi';
import styles from './BrochureButton.module.css';

export default function BrochureButton({ projectName = "Vetical Builds Premium Projects", brochureUrl }) {
  const handleOpen = () => {
    window.dispatchEvent(new CustomEvent('openBrochureModal', { 
      detail: { projectName, brochureUrl } 
    }));
  };

  return (
    <button className={styles.downloadBtn} onClick={handleOpen}>
      <FiDownload /> Download Brochure
    </button>
  );
}
