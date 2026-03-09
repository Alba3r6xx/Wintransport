'use client';
import { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import styles from './page.module.css';

const contactInfo = [
  {
    label: 'Call Us',
    value: '0XX-XXX-XXXX',
    desc: 'Mon–Sat, 7 AM – 8 PM',
    icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>,
  },
  {
    label: 'WhatsApp',
    value: '0XX-XXX-XXXX',
    desc: 'Fastest way to reach us',
    icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg>,
  },
  {
    label: 'Email',
    value: 'info@wintransport.com',
    desc: 'For inquiries and partnerships',
    icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>,
  },
  {
    label: 'Pickup Point',
    value: 'KNUST Campus',
    desc: 'Near the Main Gate, Kumasi',
    icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="10" r="3"/><path d="M12 21.7C17.3 17 20 13 20 10a8 8 0 1 0-16 0c0 3 2.7 7 8 11.7z"/></svg>,
  },
];

export default function ContactPage() {
  const [sent, setSent] = useState(false);

  return (
    <>
      <Navbar />
      <main className={styles.page}>
        <div className="container">
          <div className={styles.header}>
            <span className="section-label">Contact</span>
            <h1 className="section-title">Get in touch.</h1>
            <p className="section-subtitle">
              Got questions about a trip, need to change a booking, or just want to talk? We're around.
            </p>
          </div>

          {/* Contact Cards */}
          <div className={styles.contactGrid}>
            {contactInfo.map((c, i) => (
              <div key={i} className={`glass-card ${styles.contactCard}`}>
                <div className={styles.contactIcon}>{c.icon}</div>
                <div>
                  <span className={styles.contactLabel}>{c.label}</span>
                  <strong className={styles.contactValue}>{c.value}</strong>
                  <span className={styles.contactDesc}>{c.desc}</span>
                </div>
              </div>
            ))}
          </div>

          <div className={styles.twoCol}>
            {/* Contact Form */}
            <div className={`glass-card ${styles.formCard}`}>
              <h2>Send us a message</h2>
              {sent ? (
                <div className={styles.sentMsg}>
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
                  <p>Got it! We'll get back to you soon.</p>
                  <button className="btn btn-secondary" onClick={() => setSent(false)}>Send Another</button>
                </div>
              ) : (
                <form onSubmit={(e) => { e.preventDefault(); setSent(true); }}>
                  <div className={styles.formGrid}>
                    <div className="form-group">
                      <label className="form-label">Your Name</label>
                      <input className="form-input" placeholder="Kwame Asante" required />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Phone or Email</label>
                      <input className="form-input" placeholder="0XX XXX XXXX" required />
                    </div>
                    <div className="form-group" style={{gridColumn: '1 / -1'}}>
                      <label className="form-label">What's this about?</label>
                      <select className="form-select">
                        <option>Booking inquiry</option>
                        <option>Change or cancel a trip</option>
                        <option>Luggage question</option>
                        <option>Partnership or sponsorship</option>
                        <option>Other</option>
                      </select>
                    </div>
                    <div className="form-group" style={{gridColumn: '1 / -1'}}>
                      <label className="form-label">Message</label>
                      <textarea className="form-input" rows={4} placeholder="Tell us what you need..." required></textarea>
                    </div>
                  </div>
                  <button type="submit" className="btn btn-primary" style={{marginTop: 'var(--space-lg)'}}>Send Message</button>
                </form>
              )}
            </div>

            {/* About */}
            <div className={`glass-card ${styles.aboutCard}`}>
              <h2>About Wintransport</h2>
              <p>
                Wintransport started because we were tired of the same thing every vac — 
                standing at bus stations for hours, squeezing into overloaded trotros, and getting 
                home exhausted instead of relaxed.
              </p>
              <p>
                So we did something about it. We put together a proper VIP fleet, built an online 
                booking system with seat selection, and made the KNUST-to-Takoradi run something 
                students can actually look forward to.
              </p>
              <p>
                We're students who built this for students. Every trip is tracked, every bus is 
                insured, every driver is vetted. Your safety and comfort isn't a marketing line — 
                it's why we exist.
              </p>
              <div className={styles.aboutValues}>
                <div className={styles.aboutValue}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                  <span>Safety first, always</span>
                </div>
                <div className={styles.aboutValue}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                  <span>On-time departures</span>
                </div>
                <div className={styles.aboutValue}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
                  <span>Built by students, for students</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
