import styles from './page.module.css';

const bookings = [
  { id: 'WTR-001', route: 'KNUST → Takoradi', date: '2026-03-20', time: '08:00 AM', status: 'Confirmed', vehicle: 'VIP Minibus', passengers: 1, luggage: 2 },
  { id: 'WTR-002', route: 'Takoradi → KNUST', date: '2026-04-10', time: '10:00 AM', status: 'Pending', vehicle: 'VIP Minibus', passengers: 2, luggage: 3 },
  { id: 'WTR-003', route: 'KNUST → Takoradi', date: '2026-02-15', time: '06:00 AM', status: 'Completed', vehicle: 'VIP Minibus', passengers: 1, luggage: 1 },
  { id: 'WTR-004', route: 'Takoradi → KNUST', date: '2026-01-05', time: '08:00 AM', status: 'Completed', vehicle: 'VIP Minibus', passengers: 1, luggage: 2 },
];

const statusColors = {
  Confirmed: 'badge-success',
  Pending: 'badge-warning',
  Completed: 'badge-info',
  Cancelled: 'badge-danger',
};

export default function DashboardPage() {
  const upcoming = bookings.filter(b => b.status !== 'Completed');
  const past = bookings.filter(b => b.status === 'Completed');

  return (
    <div className={styles.page}>
      {/* Stats */}
      <div className={styles.statsGrid}>
        <div className={`glass-card ${styles.statCard}`}>
          <span className={styles.statValue}>4</span>
          <span className={styles.statLabel}>Total Trips</span>
        </div>
        <div className={`glass-card ${styles.statCard}`}>
          <span className={styles.statValue}>2</span>
          <span className={styles.statLabel}>Upcoming</span>
        </div>
        <div className={`glass-card ${styles.statCard}`}>
          <span className={styles.statValue}>8</span>
          <span className={styles.statLabel}>Luggage Bags</span>
        </div>
      </div>

      {/* Upcoming Bookings */}
      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>Upcoming Trips</h2>
        <div className={styles.bookingList}>
          {upcoming.map((b) => (
            <div key={b.id} className={`glass-card ${styles.bookingCard}`}>
              <div className={styles.bookingTop}>
                <span className={styles.bookingId}>{b.id}</span>
                <span className={`badge ${statusColors[b.status]}`}>{b.status}</span>
              </div>
              <h3 className={styles.bookingRoute}>{b.route}</h3>
              <div className={styles.bookingDetails}>
                <span>Date: {b.date}</span>
                <span>Time: {b.time}</span>
                <span>Bus: {b.vehicle}</span>
                <span>{b.passengers} pax</span>
                <span>{b.luggage} bags</span>
              </div>
              <div className={styles.bookingActions}>
                <button className="btn btn-secondary btn-sm">Modify</button>
                <button className="btn btn-secondary btn-sm" style={{color: 'var(--danger)'}}>Cancel</button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Past Bookings */}
      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>Past Trips</h2>
        <div className={styles.bookingList}>
          {past.map((b) => (
            <div key={b.id} className={`glass-card ${styles.bookingCard} ${styles.pastCard}`}>
              <div className={styles.bookingTop}>
                <span className={styles.bookingId}>{b.id}</span>
                <span className={`badge ${statusColors[b.status]}`}>{b.status}</span>
              </div>
              <h3 className={styles.bookingRoute}>{b.route}</h3>
              <div className={styles.bookingDetails}>
                <span>Date: {b.date}</span>
                <span>Time: {b.time}</span>
                <span>Bus: {b.vehicle}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
