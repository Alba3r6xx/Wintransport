'use client';
import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import styles from './page.module.css';

const services = [
  {
    title: 'KNUST to Takoradi',
    desc: 'Straight shot from campus to home through Cape Coast. No half trips, no random stops. Just you and the road.',
    icon: <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="10" r="3"/><path d="M12 21.7C17.3 17 20 13 20 10a8 8 0 1 0-16 0c0 3 2.7 7 8 11.7z"/></svg>,
  },
  {
    title: 'Made for Students',
    desc: 'We literally started this because trotro stress was killing us. Affordable fares, times that make sense, seats you can actually sleep in.',
    icon: <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>,
  },
  {
    title: 'VIP Fleet Only',
    desc: 'Every bus is VIP. Air conditioning that actually works, proper reclining seats, and enough legroom that your knees won\'t hate you.',
    icon: <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="1" y="3" width="15" height="13" rx="2"/><polygon points="16 8 20 12 20 17 16 17 16 8"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg>,
  },
  {
    title: 'Safe & Tracked',
    desc: 'GPS on every bus, experienced drivers who know the road, full insurance. Your parents can relax too.',
    icon: <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>,
  },
];

const testimonials = [
  { name: 'Ama M.', dept: 'Computer Science, L300', text: 'Took Wintransport last vac and honestly, best decision. Slept the whole way. Beats standing at Kejetia praying for a trotro.' },
  { name: 'Kwesi B.', dept: 'Mech. Engineering, L200', text: 'The seat selection thing is clutch. I always pick the window. Plus they actually leave on time which is... rare around here.' },
  { name: 'Abena O.', dept: 'Pharmacy, L400', text: 'I used to dread going home because the journey was always chaotic. Now I just book, show up, and chill. Worth every pesewa.' },
];

export default function HomePage() {
  const [statsVisible, setStatsVisible] = useState(false);
  const statsRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setStatsVisible(true); },
      { threshold: 0.3 }
    );
    if (statsRef.current) observer.observe(statsRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <Navbar />
      <main>
        {/* Hero */}
        <section className={styles.hero}>
          <div className={styles.heroGlow}></div>
          <div className={`container ${styles.heroContent}`}>
            <div className={styles.heroGrid}>
              <div className={styles.heroText}>
                <h1 className={styles.heroTitle}>
                  Going home <span className={styles.accent}>shouldn't be a struggle.</span>
                </h1>
                <p className={styles.heroDesc}>
                  VIP transport from KNUST to Takoradi through Cape Coast. Pick your seat, book online, and actually enjoy the ride for once.
                </p>
                <div className={styles.heroActions}>
                  <Link href="/booking" className="btn btn-primary btn-lg">
                    Book a Seat
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
                  </Link>
                  <Link href="/fleet" className="btn btn-secondary btn-lg">See the Bus</Link>
                </div>
              </div>

              <div className={styles.heroImage}>
                <img src="/bus-exterior-1.jpeg" alt="Wintransport VIP Coach" className={styles.busImg} />
                <div className={styles.routePreview}>
                  <div className={styles.routeStop}>
                    <div className={styles.routeDot}></div>
                    <span>KNUST Campus</span>
                  </div>
                  <div className={styles.routeLine}></div>
                  <div className={styles.routeStop}>
                    <div className={`${styles.routeDot} ${styles.routeDotMid}`}></div>
                    <span>Cape Coast</span>
                  </div>
                  <div className={styles.routeLine}></div>
                  <div className={styles.routeStop}>
                    <div className={`${styles.routeDot} ${styles.routeDotEnd}`}></div>
                    <span>Takoradi</span>
                  </div>
                </div>
              </div>
            </div>

            <div className={styles.stats} ref={statsRef}>
              <div className={`${styles.stat} ${statsVisible ? 'animate-fade-in' : ''}`}>
                <span className={styles.statNum}>2,400+</span>
                <span className={styles.statLabel}>Students moved</span>
              </div>
              <div className={`${styles.stat} ${statsVisible ? 'animate-fade-in' : ''}`} style={{animationDelay: '0.1s'}}>
                <span className={styles.statNum}>300+</span>
                <span className={styles.statLabel}>Trips completed</span>
              </div>
              <div className={`${styles.stat} ${statsVisible ? 'animate-fade-in' : ''}`} style={{animationDelay: '0.2s'}}>
                <span className={styles.statNum}>4.8/5</span>
                <span className={styles.statLabel}>Average rating</span>
              </div>
              <div className={`${styles.stat} ${statsVisible ? 'animate-fade-in' : ''}`} style={{animationDelay: '0.3s'}}>
                <span className={styles.statNum}>0</span>
                <span className={styles.statLabel}>Accidents so far</span>
              </div>
            </div>
          </div>
        </section>

        {/* Services */}
        <section className="section">
          <div className="container">
            <span className="section-label">What We Do</span>
            <h2 className="section-title">No frills, just solid transport.</h2>
            <p className="section-subtitle">We fixed the things that annoyed us about traveling home.</p>
            <div className={styles.servicesGrid}>
              {services.map((s, i) => (
                <div key={i} className={`glass-card ${styles.serviceCard}`} style={{animationDelay: `${i * 0.1}s`}}>
                  <div className={styles.serviceIcon}>{s.icon}</div>
                  <h3>{s.title}</h3>
                  <p>{s.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Fleet Preview */}
        <section className="section">
          <div className="container">
            <span className="section-label">The Bus</span>
            <h2 className="section-title">VIP all the way.</h2>
            <p className="section-subtitle">One class of service. No cramped seats, no broken AC, no vibes-killing journeys.</p>
            <div className={styles.fleetShowcase}>
              <div className={styles.fleetImageWrap}>
                <img src="/bus-interior-2.jpeg" alt="VIP Bus Interior" className={styles.fleetImage} />
              </div>
              <div className={`glass-card ${styles.fleetCard}`}>
                <span className={styles.fleetBadge}>VIP COACH</span>
                <h3>45-Seater VIP Coach</h3>
                <ul className={styles.fleetFeatures}>
                  <li>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2"><polyline points="20 6 9 17 4 12"/></svg>
                    Air-conditioned (for real)
                  </li>
                  <li>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2"><polyline points="20 6 9 17 4 12"/></svg>
                    Reclining padded seats
                  </li>
                  <li>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2"><polyline points="20 6 9 17 4 12"/></svg>
                    Luggage compartment
                  </li>
                  <li>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2"><polyline points="20 6 9 17 4 12"/></svg>
                    Phone charging ports
                  </li>
                  <li>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2"><polyline points="20 6 9 17 4 12"/></svg>
                    GPS tracked
                  </li>
                </ul>
                <div className={styles.fleetPrice}>
                  <span>from</span>
                  <strong>GH₵ 170</strong>
                  <span>/seat</span>
                </div>
                <Link href="/booking" className="btn btn-primary">Book This Bus</Link>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="section">
          <div className="container">
            <span className="section-label">Word on Campus</span>
            <h2 className="section-title">Don't take our word for it.</h2>
            <p className="section-subtitle">Here's what actual students are saying after riding with us.</p>
            <div className={styles.testimonialsGrid}>
              {testimonials.map((t, i) => (
                <div key={i} className={`glass-card ${styles.testimonialCard}`}>
                  <p className={styles.testimonialText}>"{t.text}"</p>
                  <div className={styles.testimonialAuthor}>
                    <div className={styles.testimonialAvatar}>{t.name.charAt(0)}</div>
                    <div>
                      <strong>{t.name}</strong>
                      <span>{t.dept}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="section">
          <div className="container">
            <div className={`glass-card ${styles.cta}`}>
              <h2>Heading home soon?</h2>
              <p>Seats fill up fast around vac time. Don't be the person scrambling for transport last minute.</p>
              <Link href="/booking" className="btn btn-primary btn-lg">
                Grab Your Seat
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
