"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Menu, X, User, LogOut, Shield, LayoutDashboard, UserCircle } from "lucide-react";
import Logo from "@/components/ui/logo";
import Button from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useAppStore } from "@/lib/store";
import { createClient } from "@/lib/supabase/client";

const links = [
  { href: "/", label: "Home" },
  { href: "/booking", label: "Book" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const userMenuRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const router = useRouter();
  const user = useAppStore((s) => s.user);
  const setUser = useAppStore((s) => s.setUser);
  const isHome = pathname === "/";
  const transparent = isHome && !scrolled;

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (userMenuRef.current && !userMenuRef.current.contains(e.target as Node)) {
        setUserMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  // Lock body scroll when mobile drawer is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false);
    setUserMenuOpen(false);
  }, [pathname]);

  const handleSignOut = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    setUser(null);
    setUserMenuOpen(false);
    router.push("/");
  };

  return (
    <nav
      className={cn(
        "fixed top-0 inset-x-0 z-50 transition-all duration-300",
        transparent
          ? "bg-transparent"
          : "bg-white border-b border-border shadow-sm"
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <Logo dark={!transparent} />
          </Link>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-1">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                  pathname === link.href
                    ? transparent ? "text-white bg-white/10" : "text-accent bg-accent-light"
                    : transparent ? "text-white/70 hover:text-white hover:bg-white/10" : "text-text-secondary hover:text-text hover:bg-surface"
                )}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Desktop right */}
          <div className="hidden md:flex items-center gap-3">
            {user ? (
              <div ref={userMenuRef} className="relative">
                <button
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className={cn(
                    "flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-medium transition-colors",
                    transparent ? "text-white hover:bg-white/10" : "text-text hover:bg-surface border border-border"
                  )}
                >
                  <div className="w-7 h-7 rounded-full bg-accent/10 flex items-center justify-center">
                    <User size={14} className="text-accent" />
                  </div>
                  <span className="max-w-[100px] truncate">{user.full_name || user.email}</span>
                </button>

                {userMenuOpen && (
                  <div className="absolute right-0 mt-2 w-52 bg-white rounded-xl border border-border shadow-xl py-1.5 animate-scale-in">
                    <Link href="/dashboard" onClick={() => setUserMenuOpen(false)} className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-text-secondary hover:text-text hover:bg-surface transition-colors">
                      <LayoutDashboard size={15} /> Dashboard
                    </Link>
                    <Link href="/profile" onClick={() => setUserMenuOpen(false)} className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-text-secondary hover:text-text hover:bg-surface transition-colors">
                      <UserCircle size={15} /> Profile
                    </Link>
                    {user.role === "admin" && (
                      <Link href="/admin" onClick={() => setUserMenuOpen(false)} className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-text-secondary hover:text-text hover:bg-surface transition-colors">
                        <Shield size={15} /> Admin
                      </Link>
                    )}
                    <div className="border-t border-border my-1" />
                    <button onClick={handleSignOut} className="w-full flex items-center gap-2.5 px-4 py-2.5 text-sm text-danger hover:bg-red-50 transition-colors">
                      <LogOut size={15} /> Sign Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <>
                <Button href="/login" variant="ghost" size="sm" className={transparent ? "text-white/80 hover:text-white hover:bg-white/10" : ""}>
                  Sign In
                </Button>
                <Button href="/signup" variant="accent" size="sm">
                  Sign Up
                </Button>
              </>
            )}
          </div>

          {/* Mobile hamburger */}
          <button
            className={cn("md:hidden p-2 rounded-lg", transparent ? "text-white" : "text-text")}
            onClick={() => setMobileOpen(true)}
            aria-label="Open menu"
          >
            <Menu size={22} />
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      {mobileOpen && (
        <>
          <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[60]" onClick={() => setMobileOpen(false)} />
          <div className="fixed top-0 right-0 bottom-0 w-72 bg-white z-[70] shadow-2xl animate-slide-in-right flex flex-col">
            <div className="flex items-center justify-between p-4 border-b border-border">
              <span className="font-bold text-lg">Menu</span>
              <button onClick={() => setMobileOpen(false)} className="p-1.5 rounded-lg hover:bg-surface">
                <X size={20} />
              </button>
            </div>
            <div className="flex-1 p-4 space-y-1">
              {links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className={cn(
                    "block px-4 py-3 rounded-xl text-sm font-medium transition-colors",
                    pathname === link.href ? "text-accent bg-accent-light" : "text-text-secondary hover:text-text hover:bg-surface"
                  )}
                >
                  {link.label}
                </Link>
              ))}
              {user && (
                <>
                  <div className="border-t border-border my-2" />
                  <Link href="/dashboard" onClick={() => setMobileOpen(false)} className="block px-4 py-3 rounded-xl text-sm font-medium text-text-secondary hover:text-text hover:bg-surface">Dashboard</Link>
                  <Link href="/profile" onClick={() => setMobileOpen(false)} className="block px-4 py-3 rounded-xl text-sm font-medium text-text-secondary hover:text-text hover:bg-surface">Profile</Link>
                  {user.role === "admin" && (
                    <Link href="/admin" onClick={() => setMobileOpen(false)} className="block px-4 py-3 rounded-xl text-sm font-medium text-text-secondary hover:text-text hover:bg-surface">Admin</Link>
                  )}
                </>
              )}
            </div>
            <div className="p-4 border-t border-border">
              {user ? (
                <button onClick={handleSignOut} className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-sm font-medium text-danger hover:bg-red-50 transition-colors">
                  <LogOut size={16} /> Sign Out
                </button>
              ) : (
                <div className="flex gap-2">
                  <Button href="/login" variant="outline" size="sm" className="flex-1" onClick={() => setMobileOpen(false)}>Sign In</Button>
                  <Button href="/signup" variant="accent" size="sm" className="flex-1" onClick={() => setMobileOpen(false)}>Sign Up</Button>
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </nav>
  );
}
