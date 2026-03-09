'use client';
import { useState, useEffect } from 'react';
import styles from './LoadingScreen.module.css';

export default function LoadingScreen({ onFinished }) {
  const [progress, setProgress] = useState(0);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setFadeOut(true);
            setTimeout(() => onFinished?.(), 500);
          }, 200);
          return 100;
        }
        const increment = prev < 40 ? 4 : prev < 75 ? 3 : prev < 95 ? 2 : 1;
        return Math.min(prev + increment, 100);
      });
    }, 30);
    return () => clearInterval(interval);
  }, [onFinished]);

  return (
    <div className={`${styles.screen} ${fadeOut ? styles.fadeOut : ''}`}>
      {/* Background with subtle gradient motion */}
      <div className={styles.bgLayer}>
        <div className={styles.bgGlow}></div>
        <div className={styles.bgGlow2}></div>
      </div>

      {/* Subtle grid overlay */}
      <div className={styles.gridOverlay}></div>

      {/* Horizontal light streak */}
      <div className={styles.streak}></div>
      <div className={styles.streak2}></div>

      {/* Center content */}
      <div className={styles.center}>
        {/* Logo */}
        <div className={styles.logoArea}>
          <img
            src="/wts-logo.png"
            alt="Win Transport Services"
            className={styles.logoImg}
          />
        </div>

        {/* Tagline */}
        <p className={styles.tagline}>Premium Student Transport</p>

        {/* Progress */}
        <div className={styles.progressArea}>
          <div className={styles.progressTrack}>
            <div className={styles.progressFill} style={{ width: `${progress}%` }}>
              <div className={styles.progressShine}></div>
            </div>
          </div>
          <div className={styles.progressMeta}>
            <span className={styles.progressLabel}>Loading experience</span>
            <span className={styles.progressPct}>{Math.round(progress)}%</span>
          </div>
        </div>
      </div>

      {/* Bottom credit */}
      <div className={styles.credit}>
        Powered by <strong>Pro Digital Services</strong>
      </div>
    </div>
  );
}
