import Link from "next/link";
import { Bus, Phone, Mail, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white/70">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Bus size={20} className="text-accent" />
              <span className="font-bold text-white text-lg">WinTransport</span>
            </div>
            <p className="text-sm leading-relaxed">
              The Tadi-to-Tech express. Safe, affordable, and reliable bus transport between Takoradi and KNUST.
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-white mb-4 text-sm">Quick Links</h4>
            <div className="space-y-2.5">
              {[
                { href: "/booking", label: "Book a Seat" },
                { href: "/about", label: "About Us" },
                { href: "/contact", label: "Contact" },
                { href: "/terms", label: "Terms of Service" },
              ].map((link) => (
                <Link key={link.href} href={link.href} className="block text-sm hover:text-white transition-colors">
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-white mb-4 text-sm">Routes</h4>
            <div className="space-y-2.5 text-sm">
              <p>Takoradi → KNUST</p>
              <p>KNUST → Takoradi</p>
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-white mb-4 text-sm">Contact</h4>
            <div className="space-y-2.5 text-sm">
              <p className="flex items-center gap-2"><Phone size={14} className="text-accent" /> +233 XX XXX XXXX</p>
              <p className="flex items-center gap-2"><Mail size={14} className="text-accent" /> info@wintransport.com</p>
              <p className="flex items-center gap-2"><MapPin size={14} className="text-accent" /> Takoradi, Western Region</p>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 mt-10 pt-6 text-center text-xs text-white/40">
          © 2025 WinTransport. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
