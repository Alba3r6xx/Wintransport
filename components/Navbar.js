'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useAuth } from './AuthContext';
import styles from './Navbar.module.css';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const { user, logout } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/booking', label: 'Book Now' },
    { href: '/fleet', label: 'Fleet' },
    { href: '/services', label: 'Services' },
    { href: '/contact', label: 'Contact' },
  ];

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  // Lock body scroll when drawer is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isMobileMenuOpen]);

  return (
    <>
      {/* Dark backdrop behind drawer */}
      <div
        className={`${styles.backdrop} ${isMobileMenuOpen ? styles.backdropVisible : ''}`}
        onClick={() => setIsMobileMenuOpen(false)}
        aria-hidden="true"
      />
      <nav className={`${styles.navbar} ${isScrolled ? styles.scrolled : ''}`} role="navigation" aria-label="Main navigation">
        <div className={`container ${styles.navContainer}`}>
          <Link href="/" className={styles.logo}>
            <img src="/wts-logo.png" alt="Win Transport Services" className={styles.logoImg} />
          </Link>

          <div className={`${styles.navLinks} ${isMobileMenuOpen ? styles.open : ''}`}>
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`${styles.navLink} ${pathname === link.href ? styles.active : ''}`}
              >
                {link.label}
              </Link>
            ))}
            <div className={styles.mobileActions}>
              {user ? (
                <>
                  {(user.role === 'admin' || user.role === 'agent') && (
                    <Link href="/admin" className={`btn btn-secondary btn-sm ${styles.dashLink}`}>
                      Admin Panel
                    </Link>
                  )}
                  <Link href="/dashboard" className={`btn btn-secondary btn-sm ${styles.dashLink}`}>
                    Dashboard
                  </Link>
                  <button onClick={handleLogout} className={`btn btn-secondary btn-sm ${styles.dashLink}`}>
                    Sign Out
                  </button>
                </>
              ) : (
                <>
                  <Link href="/login" className={`btn btn-secondary btn-sm ${styles.dashLink}`}>
                    Sign In
                  </Link>
                  <Link href="/signup" className={`btn btn-primary btn-sm ${styles.dashLink}`}>
                    Sign Up
                  </Link>
                </>
              )}
            </div>
          </div>

          <div className={styles.actions}>
            {user ? (
              <>
                <div className={styles.userInfo}>
                  <div className={styles.userAvatar}>{user.name?.charAt(0)}</div>
                  <div className={styles.userMeta}>
                    <span className={styles.userName}>{user.name}</span>
                    <span className={styles.userRole}>{user.role}</span>
                  </div>
                </div>
                {(user.role === 'admin' || user.role === 'agent') && (
                  <Link href="/admin" className="btn btn-secondary btn-sm">
                    Admin
                  </Link>
                )}
                <button onClick={handleLogout} className="btn btn-secondary btn-sm">
                  Sign Out
                </button>
              </>
            ) : (
              <>
                <Link href="/login" className="btn btn-secondary btn-sm">
                  Sign In
                </Link>
                <Link href="/booking" className="btn btn-primary btn-sm">
                  Book Now
                </Link>
              </>
            )}
          </div>

          <button
            className={`${styles.hamburger} ${isMobileMenuOpen ? styles.hamburgerOpen : ''}`}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isMobileMenuOpen}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </nav>
    </>
  );
}

