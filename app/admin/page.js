import Link from 'next/link';
import styles from './page.module.css';

const stats = [
  { label: 'Total Revenue', value: 'GH₵ 12,450', delta: '+15%', icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg> },
  { label: 'Total Bookings', value: '248', delta: '+23', icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg> },
  { label: 'Active Trips', value: '3', delta: 'Live', icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="1" y="3" width="15" height="13" rx="2"/><polygon points="16 8 20 12 20 17 16 17 16 8"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg> },
  { label: 'Passengers', value: '1,842', delta: '+120', icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg> },
];

const recentBookings = [
  { id: 'WTR-248', name: 'Ama Mensah', route: 'KNUST → Takoradi', date: '2026-03-20', status: 'Confirmed' },
  { id: 'WTR-247', name: 'Kwesi Boateng', route: 'Takoradi → KNUST', date: '2026-03-20', status: 'Pending' },
  { id: 'WTR-246', name: 'Abena Owusu', route: 'KNUST → Takoradi', date: '2026-03-19', status: 'Confirmed' },
  { id: 'WTR-245', name: 'Yaw Sarpong', route: 'KNUST → Takoradi', date: '2026-03-19', status: 'Confirmed' },
  { id: 'WTR-244', name: 'Akosua Darko', route: 'Takoradi → KNUST', date: '2026-03-18', status: 'Completed' },
];

const statusColors = {
  Confirmed: 'badge-success',
  Pending: 'badge-warning',
  Completed: 'badge-info',
  Cancelled: 'badge-danger',
};

export default function AdminOverviewPage() {
  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <div>
          <h1 className={styles.title}>Dashboard</h1>
          <p className={styles.subtitle}>Welcome back, Admin</p>
        </div>
        <Link href="/admin/trips" className="btn btn-primary btn-sm">+ New Trip</Link>
      </div>

      {/* Stats */}
      <div className={styles.statsGrid}>
        {stats.map((s, i) => (
          <div key={i} className={`glass-card ${styles.statCard}`}>
            <div className={styles.statIcon}>{s.icon}</div>
            <div>
              <span className={styles.statValue}>{s.value}</span>
              <span className={styles.statLabel}>{s.label}</span>
            </div>
            <span className={styles.statDelta}>{s.delta}</span>
          </div>
        ))}
      </div>

      {/* Recent Bookings */}
      <div className={styles.section}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>Recent Bookings</h2>
          <Link href="/admin/bookings" className={styles.viewAll}>View All →</Link>
        </div>
        <div className={`glass-card ${styles.tableCard}`}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>ID</th>
                <th>Passenger</th>
                <th>Route</th>
                <th>Date</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {recentBookings.map((b) => (
                <tr key={b.id}>
                  <td className={styles.tableId}>{b.id}</td>
                  <td>{b.name}</td>
                  <td>{b.route}</td>
                  <td>{b.date}</td>
                  <td><span className={`badge ${statusColors[b.status]}`}>{b.status}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Quick Actions Row */}
      <div className={styles.quickActions}>
        <Link href="/admin/trips" className={`glass-card ${styles.quickAction}`}>
          <span className={styles.qaIcon}><svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="1.5"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg></span>
          <span className={styles.qaLabel}>Manage Trips</span>
        </Link>
        <Link href="/admin/fleet" className={`glass-card ${styles.quickAction}`}>
          <span className={styles.qaIcon}><svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="1.5"><rect x="1" y="3" width="15" height="13" rx="2"/><polygon points="16 8 20 12 20 17 16 17 16 8"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg></span>
          <span className={styles.qaLabel}>Manage Fleet</span>
        </Link>
        <Link href="/admin/revenue" className={`glass-card ${styles.quickAction}`}>
          <span className={styles.qaIcon}><svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="1.5"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg></span>
          <span className={styles.qaLabel}>View Revenue</span>
        </Link>
      </div>
    </div>
  );
}
