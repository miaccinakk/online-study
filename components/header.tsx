"use client";

import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { Menu, X, User, LogOut, Settings, ChevronDown, CreditCard, MessageCircle, Languages } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/lib/auth-context";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/courses", label: "Courses" },
  { href: "/pricing", label: "Pricing" },
  { href: "/about", label: "About" },
];

export function Header() {
  const { user, isAuthenticated, isLoading, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const userMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close user menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        userMenuRef.current &&
        !userMenuRef.current.contains(event.target as Node)
      ) {
        setUserMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    setUserMenuOpen(false);
    setMobileMenuOpen(false);
    logout();
  };

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        scrolled
          ? "border-b border-border/50 bg-background/90 shadow-sm backdrop-blur-xl"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2 group">
          <div
            className={`relative flex h-10 w-10 items-center justify-center rounded-xl transition-all duration-300 ${
              scrolled
                ? "bg-primary text-primary-foreground group-hover:glow-primary"
                : "bg-white/20 text-white backdrop-blur-sm"
            }`}
          >
            <Languages className="h-5 w-5" />
          </div>
          <span
            className={`text-lg font-bold transition-colors duration-300 ${
              scrolled ? "text-foreground" : "text-white"
            }`}
          >
            Lingua<span className={scrolled ? "text-primary" : "text-white/80"}>Hub</span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`rounded-lg px-4 py-2 text-sm font-medium transition-all duration-200 ${
                scrolled
                  ? "text-muted-foreground hover:bg-muted/80 hover:text-foreground"
                  : "text-white/90 hover:bg-white/15 hover:text-white"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Desktop Auth/CTA */}
        <div className="hidden md:flex items-center gap-3">
          {isLoading ? (
            <div className="h-10 w-24 bg-muted animate-pulse rounded-lg" />
          ) : isAuthenticated && user ? (
            <div className="relative" ref={userMenuRef}>
              <button
                onClick={() => setUserMenuOpen(!userMenuOpen)}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-colors ${
                  scrolled ? "hover:bg-muted/80" : "hover:bg-white/15"
                }`}
              >
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center overflow-hidden border border-border">
                  {user.avatar ? (
                    <img
                      src={user.avatar}
                      alt={user.first_name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <User className="h-4 w-4 text-primary" />
                  )}
                </div>
                <span
                  className={`text-sm font-medium max-w-[120px] truncate ${
                    scrolled ? "text-foreground" : "text-white"
                  }`}
                >
                  {user.first_name}
                </span>
                <ChevronDown
                  className={`h-4 w-4 transition-transform ${scrolled ? "text-muted-foreground" : "text-white/80"} ${userMenuOpen ? "rotate-180" : ""}`}
                />
              </button>

              {/* User Dropdown Menu */}
              {userMenuOpen && (
                <div className="absolute right-0 top-full mt-2 w-56 bg-card border border-border rounded-xl shadow-lg py-2 z-50">
                  <div className="px-4 py-2 border-b border-border">
                    <p className="text-sm font-medium text-foreground truncate">
                      {user.first_name} {user.last_name}
                    </p>
                    <p className="text-xs text-muted-foreground truncate">
                      {user.email}
                    </p>
                  </div>
                  <Link
                    href="/dashboard"
                    onClick={() => setUserMenuOpen(false)}
                    className="flex items-center gap-3 px-4 py-2.5 text-sm text-foreground hover:bg-muted/80 transition-colors"
                  >
                    <Settings className="h-4 w-4 text-muted-foreground" />
                    Dashboard
                  </Link>
                  <Link
                    href="/dashboard/subscription"
                    onClick={() => setUserMenuOpen(false)}
                    className="flex items-center gap-3 px-4 py-2.5 text-sm text-foreground hover:bg-muted/80 transition-colors"
                  >
                    <CreditCard className="h-4 w-4 text-muted-foreground" />
                    Subscription
                  </Link>
                  <Link
                    href="/dashboard/support"
                    onClick={() => setUserMenuOpen(false)}
                    className="flex items-center gap-3 px-4 py-2.5 text-sm text-foreground hover:bg-muted/80 transition-colors"
                  >
                    <MessageCircle className="h-4 w-4 text-muted-foreground" />
                    Support
                  </Link>
                  <div className="border-t border-border mt-1 pt-1">
                    <button
                      onClick={handleLogout}
                      className="flex items-center gap-3 px-4 py-2.5 text-sm text-destructive hover:bg-destructive/10 transition-colors w-full text-left"
                    >
                      <LogOut className="h-4 w-4" />
                      Sign Out
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <>
              <Button
                asChild
                variant="ghost"
                className={scrolled ? "" : "text-white hover:bg-white/15 hover:text-white"}
              >
                <Link href="/login">Sign In</Link>
              </Button>
              <Button asChild variant="glow">
                <Link href="/register">Get Started</Link>
              </Button>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          type="button"
          className={`inline-flex items-center justify-center rounded-lg p-2 transition-colors md:hidden ${
            scrolled
              ? "text-muted-foreground hover:bg-muted/80 hover:text-foreground"
              : "text-white hover:bg-white/15"
          }`}
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="border-t border-border/30 bg-background/95 backdrop-blur-xl md:hidden">
          <div className="space-y-1 px-4 py-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="block rounded-lg px-4 py-3 text-base font-medium text-muted-foreground transition-colors hover:bg-muted/80 hover:text-foreground"
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}

            <div className="pt-3 border-t border-border/30 mt-3">
              {isLoading ? (
                <div className="h-12 bg-muted animate-pulse rounded-lg" />
              ) : isAuthenticated && user ? (
                <div className="space-y-2">
                  {/* User Info */}
                  <div className="flex items-center gap-3 px-4 py-3 bg-muted/50 rounded-lg">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center overflow-hidden border border-border">
                      {user.avatar ? (
                        <img
                          src={user.avatar}
                          alt={user.first_name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <User className="h-5 w-5 text-primary" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-foreground truncate">
                        {user.first_name} {user.last_name}
                      </p>
                      <p className="text-xs text-muted-foreground truncate">
                        {user.email}
                      </p>
                    </div>
                  </div>

                  <Link
                    href="/dashboard"
                    className="flex items-center gap-3 px-4 py-3 text-base font-medium text-foreground hover:bg-muted/80 rounded-lg transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <Settings className="h-5 w-5 text-muted-foreground" />
                    Dashboard
                  </Link>

                  <Link
                    href="/dashboard/subscription"
                    className="flex items-center gap-3 px-4 py-3 text-base font-medium text-foreground hover:bg-muted/80 rounded-lg transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <CreditCard className="h-5 w-5 text-muted-foreground" />
                    Subscription
                  </Link>

                  <Link
                    href="/dashboard/support"
                    className="flex items-center gap-3 px-4 py-3 text-base font-medium text-foreground hover:bg-muted/80 rounded-lg transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <MessageCircle className="h-5 w-5 text-muted-foreground" />
                    Support
                  </Link>

                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-3 px-4 py-3 text-base font-medium text-destructive hover:bg-destructive/10 rounded-lg transition-colors w-full text-left"
                  >
                    <LogOut className="h-5 w-5" />
                    Sign Out
                  </button>
                </div>
              ) : (
                <div className="space-y-2">
                  <Button asChild variant="outline" className="w-full">
                    <Link
                      href="/login"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Sign In
                    </Link>
                  </Button>
                  <Button asChild variant="glow" className="w-full">
                    <Link
                      href="/register"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Get Started
                    </Link>
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
