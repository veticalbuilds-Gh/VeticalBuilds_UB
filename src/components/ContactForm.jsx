"use client";
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './ContactForm.module.css';
import { FiMail, FiPhoneCall, FiMapPin, FiSend, FiBriefcase } from 'react-icons/fi';

export default function ContactForm({ variant = "page" }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    project: '',
    message: ''
  });
  const [status, setStatus] = useState('idle'); // idle, loading, success, error
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const text = `Hi, I am interested in your projects.
Name: ${formData.name}
Phone: ${formData.phone}
Email: ${formData.email}
Project of Interest: ${formData.project || 'General'}
Message: ${formData.message}`;

    const encodedText = encodeURIComponent(text);
    window.open(`https://wa.me/919501731511?text=${encodedText}`, '_blank');

    setStatus('success');
    setFormData({ name: '', email: '', phone: '', project: '', message: '' });
  };

  const handleReset = () => setStatus('idle');

  return (
    <section className={variant === "section" ? styles.sectionWrapper : ""}>
      <div className={styles.contactContainer}>
        <div className={styles.contactInfo}>
          <div className={styles.infoHeader}>
            <h2 className={styles.infoTitle}>Get in Touch</h2>
            <p className={styles.infoSubtitle}>We would love to hear from you. Reach out to us for any inquiries, project details, or to book a site visit.</p>
          </div>

          <div className={styles.infoItems}>
            <div className={styles.infoCard}>
              <div className={styles.iconWrapper}>
                <FiPhoneCall size={24} />
              </div>
              <div>
                <h3>Call Us</h3>
                <p>+91 95017 31511</p>
                <p>Mon-Sat, 9AM to 6PM</p>
              </div>
            </div>

            <div className={styles.infoCard}>
              <div className={styles.iconWrapper}>
                <FiMail size={24} />
              </div>
              <div>
                <h3>Email Us</h3>
                <p>veticalbuilds@gmail.com</p>
              </div>
            </div>

            <div className={styles.infoCard}>
              <div className={styles.iconWrapper}>
                <FiMapPin size={24} />
              </div>
              <div>
                <h3>Visit Us</h3>
                <p>No.145 KHB Colony, 5th Block</p>
                <p>Koramangala, Bangalore</p>
                <p>Karnataka 560095</p>
              </div>
            </div>

            <div className={styles.infoCard}>
              <div className={styles.iconWrapper}>
                <FiBriefcase size={24} />
              </div>
              <div>
                <h3>GSTIN</h3>
                <p>29AAMCV1611R1ZN</p>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.formContainer}>
          <h3 className={styles.formTitle}>Send us a Message</h3>
          <AnimatePresence mode="wait">
            {status === 'success' ? (
              <motion.div
                key="success-view"
                className={styles.successView}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
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
                <h3 className={styles.successTitle}>Message Sent Successfully!</h3>
                <p className={styles.successMessage}>
                  Thank you for reaching out. We have received your inquiry and our team will get back to you shortly.
                </p>
                <button className={styles.doneBtn} onClick={handleReset}>
                  Done
                </button>
              </motion.div>
            ) : (
              <motion.form
                key="form-view"
                className={styles.form}
                onSubmit={handleSubmit}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
              >
                <input type="text" name="_honey" style={{ display: 'none' }} />
                <div className={styles.inputRow}>
                  <div className={styles.inputGroup}>
                    <label htmlFor="name">Full Name *</label>
                    <input type="text" id="name" name="name" required maxLength="100" value={formData.name} onChange={handleChange} placeholder="John Doe" className={styles.input} />
                  </div>
                  <div className={styles.inputGroup}>
                    <label htmlFor="email">Email Address *</label>
                    <input type="email" id="email" name="email" required maxLength="100" value={formData.email} onChange={handleChange} placeholder="john@example.com" className={styles.input} />
                  </div>
                </div>

                <div className={styles.inputRow}>
                  <div className={styles.inputGroup}>
                    <label htmlFor="phone">Phone Number</label>
                    <input type="tel" id="phone" name="phone" maxLength="20" value={formData.phone} onChange={handleChange} placeholder="+91 98765 43210" className={styles.input} />
                  </div>
                  <div className={styles.inputGroup}>
                    <label htmlFor="project">Interested Project</label>
                    <select id="project" name="project" value={formData.project} onChange={handleChange} className={styles.input}>
                      <option value="">General Inquiry</option>
                      <option value="Habulus Tranquil">Habulus Tranquil</option>
                      {/* <option value="Mahan Lake Prime">Mahan Lake Prime</option> */}
                      {/* <option value="TRU Aquapolis">TRU Aquapolis</option> */}
                      <option value="Abhee Celestial City">Abhee Celestial City</option>
                    </select>
                  </div>
                </div>

                <div className={styles.inputGroup}>
                  <label htmlFor="message">Your Message *</label>
                  <textarea id="message" name="message" required maxLength="2000" value={formData.message} onChange={handleChange} placeholder="How can we help you?" rows="5" className={styles.textarea}></textarea>
                </div>

                <button type="submit" className={styles.submitBtn} disabled={status === 'loading'}>
                  {status === 'loading' ? (
                    <span className={styles.loader}>Sending...</span>
                  ) : (
                    <>
                      <span>Send Message</span>
                      <FiSend size={18} />
                    </>
                  )}
                </button>

                {status === 'error' && (
                  <div className={styles.errorMessage}>
                    {errorMessage}
                  </div>
                )}
              </motion.form>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
