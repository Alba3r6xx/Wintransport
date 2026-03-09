import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import styles from './page.module.css';

const services = [
  {
    title: 'Vacation Transport',
    desc: 'End-of-semester rides between KNUST and Takoradi. We run trips around vac time so you don\'t have to fight for a seat at Kejetia or rely on random drivers.',
    features: ['Scheduled around KNUST academic calendar', 'Direct KNUST Campus pickup', 'Cape Coast stop included', 'Book ahead or walk in'],
    icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="1" y="3" width="15" height="13" rx="2"/><polygon points="16 8 20 12 20 17 16 17 16 8"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg>,
  },
  {
    title: 'Luggage Service',
    desc: 'Your boxes, bags, and whatever else you\'re dragging home — we\'ll handle it. Every seat comes with luggage space, and extra bags are charged separately so it stays fair.',
    features: ['Secure luggage compartment', 'Extra bags at flat rate', 'Fragile items handled with care', 'Track your luggage status'],
    icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="2" y="7" width="20" height="15" rx="2"/><path d="M16 7V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v3"/></svg>,
  },
  {
    title: 'Group Bookings',
    desc: 'Traveling with your squad? Book multiple seats together and get group rates. Good for departmental trips, hall events, or just going home with friends.',
    features: ['Up to 45 seats per booking', 'Group discounts available', 'Seating arrangement by choice', 'One invoice for the group'],
    icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>,
  },
  {
    title: 'Charter Service',
    desc: 'Need the whole bus? Charter a VIP coach for your event, trip, or special occasion. You pick the date, time, and destination — we handle the rest.',
    features: ['Full bus rental', 'Custom route and timing', 'Professional driver included', 'Ideal for events and trips'],
    icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="12" r="10"/><polygon points="10 8 16 12 10 16 10 8"/></svg>,
  },
];

export default function ServicesPage() {
  return (
    <>
      <Navbar />
      <main className={styles.page}>
        <div className="container">
          <div className={styles.header}>
            <span className="section-label">Services</span>
            <h1 className="section-title">What we actually do.</h1>
            <p className="section-subtitle">
              We keep it simple — get students from campus to home safely and comfortably. 
              Here's everything we offer.
            </p>
          </div>

          <div className={styles.servicesGrid}>
            {services.map((s, i) => (
              <div key={i} className={`glass-card ${styles.serviceCard}`}>
                <div className={styles.serviceIcon}>{s.icon}</div>
                <h3>{s.title}</h3>
                <p className={styles.serviceDesc}>{s.desc}</p>
                <ul className={styles.featuresList}>
                  {s.features.map((f, j) => (
                    <li key={j}>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Route Info */}
          <div className={styles.routeSection}>
            <h2 className={styles.routeTitle}>The Route</h2>
            <p className={styles.routeDesc}>
              We cover the full stretch between KNUST in Kumasi and Takoradi, stopping at Cape Coast along the way. 
              No half trips — the whole thing or nothing.
            </p>
            <div className={styles.routeMap}>
              <div className={styles.routeNode}>
                <div className={styles.routeNodeDot}></div>
                <div className={styles.routeNodeInfo}>
                  <strong>KNUST Campus</strong>
                  <span>Kumasi, Ashanti Region</span>
                </div>
              </div>
              <div className={styles.routeConnector}>
                <div className={styles.routeConnectorLine}></div>
                <span className={styles.routeConnectorLabel}>~2 hrs</span>
              </div>
              <div className={styles.routeNode}>
                <div className={`${styles.routeNodeDot} ${styles.routeNodeDotMid}`}></div>
                <div className={styles.routeNodeInfo}>
                  <strong>Cape Coast</strong>
                  <span>Central Region</span>
                </div>
              </div>
              <div className={styles.routeConnector}>
                <div className={styles.routeConnectorLine}></div>
                <span className={styles.routeConnectorLabel}>~1.5 hrs</span>
              </div>
              <div className={styles.routeNode}>
                <div className={`${styles.routeNodeDot} ${styles.routeNodeDotEnd}`}></div>
                <div className={styles.routeNodeInfo}>
                  <strong>Takoradi</strong>
                  <span>Western Region</span>
                </div>
              </div>
            </div>
          </div>

          <div className={`glass-card ${styles.ctaCard}`}>
            <h3>Ready to lock in your seat?</h3>
            <p>Pick your date, choose your seat on the map, and you're set.</p>
            <Link href="/booking" className="btn btn-primary">Book Now</Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
