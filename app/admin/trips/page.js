'use client';
import { useState } from 'react';
import styles from './page.module.css';

const initialTrips = [
  { id: 'TRP-010', route: 'KNUST → Takoradi', date: '2026-03-20', time: '08:00 AM', vehicle: 'VIP Minibus', seats: 14, booked: 11, status: 'Scheduled' },
  { id: 'TRP-011', route: 'Takoradi → KNUST', date: '2026-03-22', time: '10:00 AM', vehicle: 'VIP Minibus', seats: 14, booked: 8, status: 'Scheduled' },
  { id: 'TRP-012', route: 'KNUST → Takoradi', date: '2026-03-25', time: '06:00 AM', vehicle: 'VIP Minibus', seats: 14, booked: 14, status: 'Full' },
  { id: 'TRP-009', route: 'KNUST → Takoradi', date: '2026-03-15', time: '08:00 AM', vehicle: 'VIP Minibus', seats: 14, booked: 14, status: 'Completed' },
];

const statusColors = { Scheduled: 'badge-info', Full: 'badge-warning', Completed: 'badge-success', Cancelled: 'badge-danger' };

export default function TripsPage() {
  const [showForm, setShowForm] = useState(false);

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <h1 className={styles.title}>Trip Management</h1>
        <button className="btn btn-primary btn-sm" onClick={() => setShowForm(!showForm)}>
          {showForm ? 'Cancel' : '+ New Trip'}
        </button>
      </div>

      {showForm && (
        <div className={`glass-card ${styles.formCard} animate-fade-in`}>
          <h3 className={styles.formTitle}>Create New Trip</h3>
          <form className={styles.formGrid} onSubmit={(e) => { e.preventDefault(); setShowForm(false); }}>
            <div className="form-group">
              <label className="form-label">Direction</label>
              <select className="form-select">
                <option>KNUST → Takoradi</option>
                <option>Takoradi → KNUST</option>
              </select>
            </div>
            <div className="form-group">
              <label className="form-label">Date</label>
              <input type="date" className="form-input" required />
            </div>
            <div className="form-group">
              <label className="form-label">Time</label>
              <select className="form-select">
                <option>06:00 AM</option>
                <option>08:00 AM</option>
                <option>10:00 AM</option>
                <option>12:00 PM</option>
                <option>02:00 PM</option>
                <option>04:00 PM</option>
              </select>
            </div>
            <div className="form-group">
              <label className="form-label">Vehicle</label>
              <select className="form-select">
                <option>VIP Minibus</option>
              </select>
            </div>
            <div className={styles.formActions}>
              <button type="submit" className="btn btn-primary">Create Trip</button>
            </div>
          </form>
        </div>
      )}

      <div className={`glass-card ${styles.tableCard}`}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Route</th>
              <th>Date</th>
              <th>Time</th>
              <th>Vehicle</th>
              <th>Seats</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {initialTrips.map((t) => (
              <tr key={t.id}>
                <td className={styles.mono}>{t.id}</td>
                <td>{t.route}</td>
                <td>{t.date}</td>
                <td>{t.time}</td>
                <td>{t.vehicle}</td>
                <td>{t.booked}/{t.seats}</td>
                <td><span className={`badge ${statusColors[t.status]}`}>{t.status}</span></td>
                <td>
                  <div className={styles.actions}>
                    <button className="btn btn-secondary btn-sm">Edit</button>
                    <button className="btn btn-secondary btn-sm" style={{color:'var(--danger)'}}>Cancel</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
