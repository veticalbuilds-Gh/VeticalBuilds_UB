"use client";
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiDownload, FiX } from 'react-icons/fi';
import styles from './BrochureButton.module.css';

export default function BrochureModalContainer() {
  const [modalState, setModalState] = useState({ isOpen: false, projectName: '', brochureUrl: '' });
  const [formData, setFormData] = useState({ name: '', email: '', phone: '' });
  const [isSending, setIsSending] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const handleOpenModal = (e) => {
      setModalState({
        isOpen: true,
        projectName: e.detail.projectName,
        brochureUrl: e.detail.brochureUrl,
      });
      document.body.style.overflow = 'hidden';
      window.dispatchEvent(new CustomEvent('globalModalState', { detail: { isOpen: true } }));
    };

    window.addEventListener('openBrochureModal', handleOpenModal);
    return () => window.removeEventListener('openBrochureModal', handleOpenModal);
  }, []);

  const handleClose = () => {
    setModalState(prev => ({ ...prev, isOpen: false }));
    document.body.style.overflow = '';
    window.dispatchEvent(new CustomEvent('globalModalState', { detail: { isOpen: false } }));
    // Reset form after exit animation
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: '', email: '', phone: '' });
    }, 400);
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && modalState.isOpen) handleClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [modalState.isOpen]);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSending(true);

    // Save to Sanity backend
    try {
      await fetch('/api/submit-lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          project: modalState.projectName,
          source: 'Brochure Download'
        })
      });
    } catch (err) {
      console.error("Failed to save lead", err);
    }

    const text = `Hi, I would like to download the brochure for ${modalState.projectName}.
Name: ${formData.name}
Phone: ${formData.phone}
Email: ${formData.email}`;

    const encodedText = encodeURIComponent(text);
    
    // Force silent background download by fetching as blob
    if (modalState.brochureUrl) {
      let fileName = `${modalState.projectName.replace(/\s+/g, '-')}-Brochure`;
      if (modalState.brochureUrl.endsWith('.pdf')) fileName += '.pdf';
      else if (modalState.brochureUrl.endsWith('.jpg') || modalState.brochureUrl.endsWith('.jpeg')) fileName += '.jpg';
      else fileName += '.pdf'; 
      
      try {
        fetch(modalState.brochureUrl)
          .then(res => res.blob())
          .then(blob => {
            const blobUrl = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = blobUrl;
            link.download = fileName;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            window.URL.revokeObjectURL(blobUrl);
          })
          .catch(() => {
            // Fallback if CORS prevents blob fetch
            const link = document.createElement('a');
            link.href = modalState.brochureUrl;
            link.download = fileName;
            link.target = '_blank';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
          });
      } catch (err) {
        console.error("Download failed", err);
      }
    }

    // Navigate to WhatsApp
    window.open(`https://wa.me/919501731511?text=${encodedText}`, '_blank');

    setIsSending(false);
    setSubmitted(true);
    
    setTimeout(() => {
      handleClose();
    }, 3000);
  };

  return (
    <AnimatePresence>
      {modalState.isOpen && (
        <motion.div 
          className={styles.overlayWrapper}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div className={styles.overlay} onClick={handleClose} />
          <motion.div 
            className={styles.modal}
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
          >
            <button className={styles.closeBtn} onClick={handleClose}>
              <FiX size={24} />
            </button>

            {!submitted ? (
              <div className={styles.modalContent}>
                <h3 className={styles.modalTitle} style={{ fontWeight: 'bold' }}>For Full Information,<br/>Download Brochure</h3>
                <p className={styles.modalSub}>Enter your details to download the complete brochure for <strong>{modalState.projectName}</strong>.</p>
                
                <form onSubmit={handleSubmit} className={styles.form}>
                  <input type="text" name="_honey" style={{ display: 'none' }} />
                  <div className={styles.inputGroup}>
                    <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Full Name" required maxLength="100" className={styles.input} autoFocus />
                  </div>
                  <div className={styles.inputGroup}>
                    <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email Address" required maxLength="100" className={styles.input} />
                  </div>
                  <div className={styles.inputGroup}>
                    <input type="tel" name="phone" value={formData.phone} onChange={handleChange} placeholder="Phone Number" required maxLength="20" className={styles.input} />
                  </div>
                  <button type="submit" className={styles.submitBtn} disabled={isSending}>
                    {isSending ? 'Processing...' : <><FiDownload /> Download Now</>}
                  </button>
                </form>
                <p className={styles.privacyText}>Your information is secure. We hate spam as much as you do.</p>
              </div>
            ) : (
              <motion.div 
                className={styles.successContent}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4 }}
              >
                <div className={styles.successIconWrapper}>
                  <motion.svg 
                    className={styles.successSvg} 
                    viewBox="0 0 50 50"
                    initial="hidden"
                    animate="visible"
                  >
                    <motion.circle 
                      cx="25" cy="25" r="22" 
                      fill="transparent" 
                      stroke="#0E7A74" 
                      strokeWidth="3"
                      variants={{
                        hidden: { pathLength: 0 },
                        visible: { pathLength: 1, transition: { duration: 0.6, ease: "easeOut" } }
                      }}
                    />
                    <motion.path 
                      d="M16 26l6 6 13-13" 
                      fill="transparent" 
                      stroke="#0E7A74" 
                      strokeWidth="4" 
                      strokeLinecap="round" 
                      strokeLinejoin="round"
                      variants={{
                        hidden: { pathLength: 0 },
                        visible: { pathLength: 1, transition: { duration: 0.4, delay: 0.4, ease: "easeOut" } }
                      }}
                    />
                  </motion.svg>
                </div>
                <h3 className={styles.modalTitle}>Success!</h3>
                <p className={styles.modalSub}>Your brochure download has started. Our team will reach out to you shortly.</p>
              </motion.div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
