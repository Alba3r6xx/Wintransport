'use client';
import { useState } from 'react';
import styles from './page.module.css';

const vehicles = [
  { id: 'V-001', name: 'VIP Minibus Alpha', type: 'Minibus', capacity: 14, plate: 'GR-1234-26', status: 'Active', trips: 42 },
  { id: 'V-002', name: 'VIP Minibus Beta', type: 'Minibus', capacity: 14, plate: 'GR-5678-26', status: 'Active', trips: 35 },
  { id: 'V-003', name: 'VIP Minibus Gamma', type: 'Minibus', capacity: 14, plate: 'GR-9012-26', status: 'Maintenance', trips: 15 },
  { id: 'V-004', name: 'VIP Minibus Delta', type: 'Minibus', capacity: 14, plate: 'GR-3456-26', status: 'Active', trips: 28 },
];

const statusColors = { Active: 'badge-success', Maintenance: 'badge-warning', Retired: 'badge-danger' };

export default function AdminFleetPage() {
  const [showForm, setShowForm] = useState(false);

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <h1 className={styles.title}>Fleet Management</h1>
        <button className="btn btn-primary btn-sm" onClick={() => setShowForm(!showForm)}>
          {showForm ? 'Cancel' : '+ Add Vehicle'}
        </button>
      </div>

      {showForm && (
        <div className={`glass-card ${styles.formCard} animate-fade-in`}>
          <h3 className={styles.formTitle}>Add Vehicle</h3>
          <form className={styles.formGrid} onSubmit={(e) => { e.preventDefault(); setShowForm(false); }}>
            <div className="form-group"><label className="form-label">Vehicle Name</label><input className="form-input" placeholder="e.g. VIP Minibus Gamma" required /></div>
            <div className="form-group"><label className="form-label">Type</label><select className="form-select"><option>VIP Minibus</option></select></div>
            <div className="form-group"><label className="form-label">Capacity</label><input type="number" className="form-input" placeholder="14" required /></div>
            <div className="form-group"><label className="form-label">License Plate</label><input className="form-input" placeholder="GR-XXXX-26" required /></div>
            <div className={styles.formActions}><button type="submit" className="btn btn-primary">Add Vehicle</button></div>
          </form>
        </div>
      )}

      <div className={styles.grid}>
        {vehicles.map((v) => (
          <div key={v.id} className={`glass-card ${styles.card}`}>
            <div className={styles.cardTop}>
              <span className={styles.cardId}>{v.id}</span>
              <span className={`badge ${statusColors[v.status]}`}>{v.status}</span>
            </div>
            <h3 className={styles.cardName}>{v.name}</h3>
            <div className={styles.cardDetails}>
              <div className={styles.detail}><span className={styles.detailLabel}>Type</span><span>{v.type}</span></div>
              <div className={styles.detail}><span className={styles.detailLabel}>Capacity</span><span>{v.capacity} seats</span></div>
              <div className={styles.detail}><span className={styles.detailLabel}>Plate</span><span className={styles.mono}>{v.plate}</span></div>
              <div className={styles.detail}><span className={styles.detailLabel}>Total Trips</span><span>{v.trips}</span></div>
            </div>
            <div className={styles.cardActions}>
              <button className="btn btn-secondary btn-sm">Edit</button>
              <button className="btn btn-secondary btn-sm" style={{color:'var(--warning)'}}>Maintenance</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
