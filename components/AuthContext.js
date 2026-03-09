'use client';
import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

// Mock users database (localStorage-backed)
const DEFAULT_USERS = [
  { id: 1, name: 'Admin User', email: 'admin@wintransport.com', password: 'admin123', phone: '024 000 0001', role: 'admin' },
  { id: 2, name: 'Agent Kofi', email: 'agent@wintransport.com', password: 'agent123', phone: '024 000 0002', role: 'agent' },
  { id: 3, name: 'Kwame Student', email: 'student@knust.edu.gh', password: 'student123', phone: '024 000 0003', role: 'customer' },
];

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Initialize default users if not in localStorage
    const storedUsers = localStorage.getItem('wt_users');
    if (!storedUsers) {
      localStorage.setItem('wt_users', JSON.stringify(DEFAULT_USERS));
    }

    // Check for existing session
    const session = localStorage.getItem('wt_session');
    if (session) {
      try {
        setUser(JSON.parse(session));
      } catch (e) {
        localStorage.removeItem('wt_session');
      }
    }
    setLoading(false);
  }, []);

  const getUsers = () => {
    try {
      return JSON.parse(localStorage.getItem('wt_users') || '[]');
    } catch {
      return [];
    }
  };

  const login = (email, password) => {
    const users = getUsers();
    const found = users.find(u => u.email === email && u.password === password);
    if (!found) {
      return { success: false, error: 'Invalid email or password' };
    }
    const sessionUser = { id: found.id, name: found.name, email: found.email, phone: found.phone, role: found.role };
    setUser(sessionUser);
    localStorage.setItem('wt_session', JSON.stringify(sessionUser));
    return { success: true, user: sessionUser };
  };

  const signup = (name, email, phone, password, role = 'customer') => {
    const users = getUsers();
    if (users.find(u => u.email === email)) {
      return { success: false, error: 'Email already registered' };
    }
    const newUser = {
      id: Date.now(),
      name,
      email,
      phone,
      password,
      role,
    };
    users.push(newUser);
    localStorage.setItem('wt_users', JSON.stringify(users));

    const sessionUser = { id: newUser.id, name: newUser.name, email: newUser.email, phone: newUser.phone, role: newUser.role };
    setUser(sessionUser);
    localStorage.setItem('wt_session', JSON.stringify(sessionUser));
    return { success: true, user: sessionUser };
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('wt_session');
  };

  const isAdmin = () => user?.role === 'admin';
  const isAgent = () => user?.role === 'agent';
  const isCustomer = () => user?.role === 'customer';

  return (
    <AuthContext.Provider value={{ user, loading, login, signup, logout, isAdmin, isAgent, isCustomer }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

export default AuthContext;
