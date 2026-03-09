'use client';
import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/components/AuthContext';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import styles from './page.module.css';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    // Small delay for UX
    await new Promise(r => setTimeout(r, 500));

    const result = login(email, password);
    setIsLoading(false);

    if (result.success) {
      // Redirect based on role
      if (result.user.role === 'admin') {
        router.push('/admin');
      } else if (result.user.role === 'agent') {
        router.push('/admin');
      } else {
        router.push('/dashboard');
      }
    } else {
      setError(result.error);
    }
  };

  return (
    <>
      <Navbar />
      <main className={styles.page}>
        <div className={styles.authContainer}>
          <div className={styles.authCard}>
            {/* Decorative top accent */}
            <div className={styles.cardAccent}></div>

            <div className={styles.authHeader}>
              <div className={styles.logoIcon}>
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M8 6v6a6 6 0 0 0 12 0V6"/>
                  <path d="M2 12h4"/>
                  <path d="M18 12h4"/>
                  <path d="M12 2v2"/>
                </svg>
              </div>
              <h1>Welcome Back</h1>
              <p>Sign in to your Wintransport account</p>
            </div>

            {error && (
              <div className={styles.errorAlert}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/>
                </svg>
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className={styles.authForm}>
              <div className="form-group">
                <label className="form-label">Email Address</label>
                <input
                  type="email"
                  className="form-input"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  id="login-email"
                />
              </div>

              <div className="form-group">
                <label className="form-label">Password</label>
                <input
                  type="password"
                  className="form-input"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  id="login-password"
                />
              </div>

              <button
                type="submit"
                className={`btn btn-primary btn-lg ${styles.authBtn}`}
                disabled={isLoading}
                id="login-submit"
              >
                {isLoading ? (
                  <span className={styles.spinner}></span>
                ) : (
                  <>
                    Sign In
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
                    </svg>
                  </>
                )}
              </button>
            </form>

            <div className={styles.authFooter}>
              <p>Don't have an account? <Link href="/signup" className={styles.authLink}>Sign Up</Link></p>
            </div>

            {/* Demo accounts */}
            <div className={styles.demoSection}>
              <span className={styles.demoLabel}>Demo Accounts</span>
              <div className={styles.demoAccounts}>
                <button
                  type="button"
                  className={styles.demoBtn}
                  onClick={() => { setEmail('admin@wintransport.com'); setPassword('admin123'); }}
                >
                  <span className={styles.demoBadge}>Admin</span>
                  admin@wintransport.com
                </button>
                <button
                  type="button"
                  className={styles.demoBtn}
                  onClick={() => { setEmail('agent@wintransport.com'); setPassword('agent123'); }}
                >
                  <span className={styles.demoBadge}>Agent</span>
                  agent@wintransport.com
                </button>
                <button
                  type="button"
                  className={styles.demoBtn}
                  onClick={() => { setEmail('student@knust.edu.gh'); setPassword('student123'); }}
                >
                  <span className={styles.demoBadge}>Customer</span>
                  student@knust.edu.gh
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
