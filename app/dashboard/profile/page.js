'use client';
import styles from './page.module.css';

export default function ProfilePage() {
  return (
    <div className={styles.page}>
      <h2 className={styles.title}>My Profile</h2>

      <div className={`glass-card ${styles.profileCard}`}>
        <div className={styles.avatar}>KA</div>
        <div>
          <h3 className={styles.name}>Kwame Asante</h3>
          <p className={styles.info}>Computer Science, Level 300</p>
          <p className={styles.info}>KNUST Campus</p>
        </div>
      </div>

      <div className={`glass-card ${styles.formCard}`}>
        <h3 className={styles.formTitle}>Edit Profile</h3>
        <form className={styles.formGrid}>
          <div className="form-group">
            <label className="form-label">Full Name</label>
            <input className="form-input" defaultValue="Kwame Asante" />
          </div>
          <div className="form-group">
            <label className="form-label">Phone</label>
            <input className="form-input" defaultValue="0XX XXX XXXX" />
          </div>
          <div className="form-group">
            <label className="form-label">Email</label>
            <input className="form-input" defaultValue="kwame@example.com" />
          </div>
          <div className="form-group">
            <label className="form-label">Department</label>
            <input className="form-input" defaultValue="Computer Science" />
          </div>
          <div className="form-group">
            <label className="form-label">Level</label>
            <select className="form-select" defaultValue="300">
              <option>100</option>
              <option>200</option>
              <option>300</option>
              <option>400</option>
              <option>Graduate</option>
            </select>
          </div>
          <div className="form-group">
            <label className="form-label">Emergency Contact</label>
            <input className="form-input" placeholder="0XX XXX XXXX" />
          </div>
          <div className={styles.formActions}>
            <button type="submit" className="btn btn-primary" onClick={(e) => e.preventDefault()}>Save Changes</button>
          </div>
        </form>
      </div>
    </div>
  );
}
