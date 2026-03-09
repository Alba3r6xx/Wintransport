'use client';
import { useState } from 'react';
import styles from './page.module.css';

const luggageRecords = [
  { id: 'LUG-001', trip: 'WTR-001', bags: 2, weight: '25kg', status: 'Paid', amount: 'GH₵ 40', date: '2026-03-18' },
  { id: 'LUG-002', trip: 'WTR-002', bags: 3, weight: '35kg', status: 'Pending', amount: 'GH₵ 60', date: '2026-04-08' },
  { id: 'LUG-003', trip: 'WTR-003', bags: 1, weight: '10kg', status: 'Paid', amount: 'GH₵ 20', date: '2026-02-13' },
];

const statusColors = {
  Paid: 'badge-success',
  Pending: 'badge-warning',
};

export default function LuggagePage() {
  const [showForm, setShowForm] = useState(false);

  return (
    <div className={styles.page}>
      <div className={styles.topBar}>
        <h2 className={styles.title}>Luggage Payments</h2>
        <button className="btn btn-primary btn-sm" onClick={() => setShowForm(!showForm)}>
          {showForm ? 'Cancel' : '+ New Payment'}
        </button>
      </div>

      {showForm && (
        <div className={`glass-card ${styles.formCard} animate-fade-in`}>
          <h3 className={styles.formTitle}>Add Luggage Payment</h3>
          <form className={styles.formGrid} onSubmit={(e) => { e.preventDefault(); setShowForm(false); }}>
            <div className="form-group">
              <label className="form-label">Trip ID</label>
              <input className="form-input" placeholder="e.g. WTR-001" required />
            </div>
            <div className="form-group">
              <label className="form-label">Number of Bags</label>
              <select className="form-select">
                {[1,2,3,4,5].map(n => <option key={n} value={n}>{n}</option>)}
              </select>
            </div>
            <div className="form-group">
              <label className="form-label">Estimated Weight</label>
              <input className="form-input" placeholder="e.g. 25kg" />
            </div>
            <div className="form-group">
              <label className="form-label">Payment Method</label>
              <select className="form-select">
                <option>Cash on Departure</option>
                <option>Mobile Money (Coming Soon)</option>
              </select>
            </div>
            <div className={styles.formActions}>
              <button type="submit" className="btn btn-primary">Submit Payment</button>
            </div>
          </form>
        </div>
      )}

      <div className={styles.list}>
        {luggageRecords.map((l) => (
          <div key={l.id} className={`glass-card ${styles.card}`}>
            <div className={styles.cardTop}>
              <span className={styles.luggageId}>{l.id}</span>
              <span className={`badge ${statusColors[l.status]}`}>{l.status}</span>
            </div>
            <div className={styles.cardDetails}>
              <span>Trip: {l.trip}</span>
              <span>{l.bags} bag(s)</span>
              <span>{l.weight}</span>
              <span>{l.date}</span>
            </div>
            <div className={styles.cardAmount}>
              {l.amount}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
