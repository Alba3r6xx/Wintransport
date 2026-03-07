import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div>
            <Image
              src="/logo.png"
              alt="WinTransport"
              width={140}
              height={48}
              className="h-10 w-auto mb-4 brightness-0 invert"
            />
            <p className="text-gray-400 text-sm leading-relaxed">
              Your trusted bus service for the Takoradi–KNUST corridor. Safe, reliable, and always on time.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>
                <Link href="/" className="hover:text-white transition-colors">Home</Link>
              </li>
              <li>
                <Link href="/book" className="hover:text-white transition-colors">Book a Seat</Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-white transition-colors">About Us</Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white transition-colors">Contact</Link>
              </li>
            </ul>
          </div>

          {/* Route Info */}
          <div>
            <h3 className="font-semibold mb-4">Our Route</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>Takoradi (Market Circle Terminal)</li>
              <li>KNUST (Tech Junction Terminal)</li>
              <li>Daily departures from 5:00 AM</li>
              <li>~3.5 hours journey time</li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li className="flex items-center gap-2">
                <svg className="w-4 h-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                +233 XX XXX XXXX
              </li>
              <li className="flex items-center gap-2">
                <svg className="w-4 h-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                info@wintransport.com
              </li>
              <li className="flex items-center gap-2">
                <svg className="w-4 h-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                Market Circle, Takoradi
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-gray-800 text-center text-sm text-gray-400">
          <p>&copy; {new Date().getFullYear()} Win Transport Services. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
