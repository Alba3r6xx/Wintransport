'use client';
import { useState, useEffect } from 'react';
import LoadingScreen from '@/components/LoadingScreen';

export default function ClientLayout({ children }) {
  const [isLoading, setIsLoading] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  if (isLoading) {
    return <LoadingScreen onFinished={() => setIsLoading(false)} />;
  }

  return <>{children}</>;
}
