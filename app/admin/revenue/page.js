import styles from './page.module.css';

const revenueData = [
  { month: 'January', trips: 18, passengers: 210, luggage: 'GH₵ 1,200', tickets: 'GH₵ 8,400', total: 'GH₵ 9,600' },
  { month: 'February', trips: 15, passengers: 185, luggage: 'GH₵ 980', tickets: 'GH₵ 7,400', total: 'GH₵ 8,380' },
  { month: 'March', trips: 22, passengers: 280, luggage: 'GH₵ 1,600', tickets: 'GH₵ 11,200', total: 'GH₵ 12,800' },
];

const luggagePayments = [
  { id: 'LUG-050', passenger: 'Ama Mensah', bags: 3, amount: 'GH₵ 60', date: '2026-03-18', status: 'Paid' },
  { id: 'LUG-049', passenger: 'Kwesi Boateng', bags: 2, amount: 'GH₵ 40', date: '2026-03-17', status: 'Paid' },
  { id: 'LUG-048', passenger: 'Abena Owusu', bags: 1, amount: 'GH₵ 20', date: '2026-03-16', status: 'Pending' },
  { id: 'LUG-047', passenger: 'Yaw Sarpong', bags: 4, amount: 'GH₵ 80', date: '2026-03-15', status: 'Paid' },
];

const statusColors = { Paid: 'badge-success', Pending: 'badge-warning' };

export default function RevenuePage() {
  return (
    <div className={styles.page}>
      <h1 className={styles.title}>Revenue & Payments</h1>

      {/* Summary Cards */}
      <div className={styles.summaryGrid}>
        <div className={`glass-card ${styles.summaryCard}`}>
          <span className={styles.summaryValue}>GH₵ 30,780</span>
          <span className={styles.summaryLabel}>Total Revenue (YTD)</span>
        </div>
        <div className={`glass-card ${styles.summaryCard}`}>
          <span className={styles.summaryValue}>GH₵ 3,780</span>
          <span className={styles.summaryLabel}>Luggage Revenue</span>
        </div>
        <div className={`glass-card ${styles.summaryCard}`}>
          <span className={styles.summaryValue}>GH₵ 27,000</span>
          <span className={styles.summaryLabel}>Ticket Revenue</span>
        </div>
        <div className={`glass-card ${styles.summaryCard}`}>
          <span className={styles.summaryValue}>55</span>
          <span className={styles.summaryLabel}>Total Trips</span>
        </div>
      </div>

      {/* Monthly Breakdown */}
      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>Monthly Breakdown</h2>
        <div className={`glass-card ${styles.tableCard}`}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Month</th>
                <th>Trips</th>
                <th>Passengers</th>
                <th>Luggage Rev.</th>
                <th>Ticket Rev.</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              {revenueData.map((r) => (
                <tr key={r.month}>
                  <td className={styles.bold}>{r.month}</td>
                  <td>{r.trips}</td>
                  <td>{r.passengers}</td>
                  <td>{r.luggage}</td>
                  <td>{r.tickets}</td>
                  <td className={styles.accent}>{r.total}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Luggage Payments */}
      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>Recent Luggage Payments</h2>
        <div className={`glass-card ${styles.tableCard}`}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>ID</th>
                <th>Passenger</th>
                <th>Bags</th>
                <th>Amount</th>
                <th>Date</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {luggagePayments.map((l) => (
                <tr key={l.id}>
                  <td className={styles.mono}>{l.id}</td>
                  <td>{l.passenger}</td>
                  <td>{l.bags}</td>
                  <td className={styles.accent}>{l.amount}</td>
                  <td>{l.date}</td>
                  <td><span className={`badge ${statusColors[l.status]}`}>{l.status}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
