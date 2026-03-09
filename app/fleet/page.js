import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import styles from './page.module.css';

export default function FleetPage() {
  return (
    <>
      <Navbar />
      <main className={styles.page}>
        <div className="container">
          <div className={styles.header}>
            <span className="section-label">The Fleet</span>
            <h1 className="section-title">One bus. Done right.</h1>
            <p className="section-subtitle">
              We don't do tiers. Every seat on every trip is VIP. No economy class, no hidden upgrades.
            </p>
          </div>

          {/* Main Bus Card */}
          <div className={styles.mainCard}>
            <div className={styles.imageSection}>
              <img src="/bus-exterior-2.jpeg" alt="VIP Coach" className={styles.mainImage} />
              <div className={styles.imageBadge}>VIP COACH</div>
            </div>
            <div className={styles.detailsSection}>
              <h2>45-Seater VIP Bus</h2>
              <p className={styles.busDesc}>
                This is what you're riding in. A full-size 45-seater VIP coach with reclining padded seats, 
                generous legroom, and a massive luggage hold for your boxes and bags. 
                Every bus is tracked via GPS, fully insured, and driven by someone who knows the KNUST–Cape Coast–Takoradi 
                road like the back of their hand.
              </p>

              <div className={styles.specsGrid}>
                <div className={styles.specItem}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/></svg>
                  <div>
                    <span className={styles.specValue}>45</span>
                    <span className={styles.specLabel}>Seats</span>
                  </div>
                </div>
                <div className={styles.specItem}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2"><rect x="2" y="7" width="20" height="15" rx="2"/><path d="M16 7V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v3"/></svg>
                  <div>
                    <span className={styles.specValue}>45</span>
                    <span className={styles.specLabel}>Luggage spaces</span>
                  </div>
                </div>
                <div className={styles.specItem}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                  <div>
                    <span className={styles.specValue}>Full</span>
                    <span className={styles.specLabel}>Insurance</span>
                  </div>
                </div>
                <div className={styles.specItem}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2"><circle cx="12" cy="10" r="3"/><path d="M12 21.7C17.3 17 20 13 20 10a8 8 0 1 0-16 0c0 3 2.7 7 8 11.7z"/></svg>
                  <div>
                    <span className={styles.specValue}>GPS</span>
                    <span className={styles.specLabel}>Live tracking</span>
                  </div>
                </div>
              </div>

              <div className={styles.amenities}>
                <h3>What you get</h3>
                <ul>
                  <li>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>
                    AC that blasts cold (not warm air pretending)
                  </li>
                  <li>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>
                    Reclining padded seats — nap-friendly
                  </li>
                  <li>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>
                    USB charging ports at every seat
                  </li>
                  <li>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>
                    Proper luggage compartment
                  </li>
                  <li>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>
                    Professional, uniformed drivers
                  </li>
                  <li>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>
                    Water provided on every trip
                  </li>
                </ul>
              </div>

              <div className={styles.pricing}>
                <div className={styles.priceTag}>
                  <span>from</span>
                  <strong>GH₵ 170</strong>
                  <span>/seat</span>
                </div>
                <Link href="/booking" className="btn btn-primary btn-lg">Book a Seat</Link>
              </div>
            </div>
          </div>

          {/* Interior Shot */}
          <div className={styles.interiorSection}>
            <div className={styles.interiorImage}>
              <img src="/vip-interior.png" alt="Bus Interior" />
            </div>
            <div className={styles.interiorInfo}>
              <h3>Pick your exact seat</h3>
              <p>
                When you book, you get to choose your seat on a live map. Window person? Front rider? 
                Back-of-the-bus sleeper? It's yours. You can also see which seats are already taken 
                or reserved, so there's no surprises when you board.
              </p>
              <Link href="/booking" className="btn btn-secondary">Try the Seat Map</Link>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
