import styles from './page.module.css';

const bookings = [
  { id: 'WTR-248', name: 'Ama Mensah', phone: '0XX XXX 1234', route: 'KNUST → Takoradi', date: '2026-03-20', vehicle: 'VIP Minibus', passengers: 1, luggage: 2, status: 'Confirmed' },
  { id: 'WTR-247', name: 'Kwesi Boateng', phone: '0XX XXX 5678', route: 'Takoradi → KNUST', date: '2026-03-20', vehicle: 'VIP Minibus', passengers: 2, luggage: 3, status: 'Pending' },
  { id: 'WTR-246', name: 'Abena Owusu', phone: '0XX XXX 9012', route: 'KNUST → Takoradi', date: '2026-03-19', vehicle: 'VIP Minibus', passengers: 1, luggage: 1, status: 'Confirmed' },
  { id: 'WTR-245', name: 'Yaw Sarpong', phone: '0XX XXX 3456', route: 'KNUST → Takoradi', date: '2026-03-19', vehicle: 'VIP Minibus', passengers: 3, luggage: 4, status: 'Confirmed' },
  { id: 'WTR-244', name: 'Akosua Darko', phone: '0XX XXX 7890', route: 'Takoradi → KNUST', date: '2026-03-18', vehicle: 'VIP Minibus', passengers: 1, luggage: 2, status: 'Completed' },
  { id: 'WTR-243', name: 'Kofi Adjei', phone: '0XX XXX 2345', route: 'KNUST → Takoradi', date: '2026-03-17', vehicle: 'VIP Minibus', passengers: 2, luggage: 3, status: 'Completed' },
];

const statusColors = { Confirmed: 'badge-success', Pending: 'badge-warning', Completed: 'badge-info', Cancelled: 'badge-danger' };

export default function AdminBookingsPage() {
  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <h1 className={styles.title}>All Bookings</h1>
        <div className={styles.filters}>
          <select className="form-select" style={{maxWidth: 180}}>
            <option>All Status</option>
            <option>Confirmed</option>
            <option>Pending</option>
            <option>Completed</option>
            <option>Cancelled</option>
          </select>
          <input type="date" className="form-input" style={{maxWidth: 180}} />
        </div>
      </div>

      <div className={`glass-card ${styles.tableCard}`}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Passenger</th>
              <th>Phone</th>
              <th>Route</th>
              <th>Date</th>
              <th>Vehicle</th>
              <th>Pax</th>
              <th>Bags</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((b) => (
              <tr key={b.id}>
                <td className={styles.mono}>{b.id}</td>
                <td>{b.name}</td>
                <td className={styles.mono}>{b.phone}</td>
                <td>{b.route}</td>
                <td>{b.date}</td>
                <td>{b.vehicle}</td>
                <td>{b.passengers}</td>
                <td>{b.luggage}</td>
                <td><span className={`badge ${statusColors[b.status]}`}>{b.status}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
