import "./globals.css";
import Script from 'next/script';
import { AuthProvider } from '@/components/AuthContext';
import ClientLayout from '@/components/ClientLayout';

export const metadata = {
  title: "Wintransport — Premium Student Transport | KNUST to Takoradi",
  description: "Book your comfortable ride from KNUST Campus through Cape Coast to Takoradi and back. Premium vacation transport for students.",
  keywords: "transport, KNUST, Takoradi, Cape Coast, student transport, vacation transport, Ghana",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <ClientLayout>
            {children}
          </ClientLayout>
        </AuthProvider>
        <Script
          src="https://js.paystack.co/v1/inline.js"
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}
