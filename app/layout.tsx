import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";
import AuthProvider from "@/components/providers/auth-provider";
import { AuthProvider as LegacyAuthProvider } from "@/components/AuthContext";
import ClientLayout from "@/components/ClientLayout";

export const metadata: Metadata = {
  title: "WinTransport — Takoradi ↔ KNUST",
  description: "Book bus seats, pick your spot, pay when you're ready.",
  keywords: "transport, KNUST, Takoradi, Cape Coast, student transport, vacation transport, Ghana",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-background text-text antialiased">
        <AuthProvider>
          <LegacyAuthProvider>
            <ClientLayout>
              {children}
            </ClientLayout>
          </LegacyAuthProvider>
        </AuthProvider>
        <Script
          src="https://js.paystack.co/v1/inline.js"
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}
