"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Menu, Shield } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";

const navLinks = [
  { label: "About",    href: "#about"    },
  { label: "Skills",   href: "#skills"   },
  { label: "Projects", href: "#projects" },
  { label: "CTF",      href: "#ctf"      },
  { label: "Blog",     href: "#blog"     },
  { label: "Contact",  href: "#contact"  },
];

export default function Navbar() {
  const [scrolled, setScrolled]           = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [mobileOpen, setMobileOpen]       = useState(false);

  // Shrink navbar on scroll
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Highlight active section via IntersectionObserver
  useEffect(() => {
    const ids = navLinks.map((l) => l.href.slice(1));
    const observers: IntersectionObserver[] = [];

    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActiveSection(id); },
        { rootMargin: "-40% 0px -55% 0px" }
      );
      obs.observe(el);
      observers.push(obs);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  const scrollTo = (href: string) => {
    setMobileOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-background/80 backdrop-blur-md border-b border-border"
          : "bg-transparent"
      }`}
    >
      <nav className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">

        {/* ── Logo ── */}
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="flex items-center gap-2 group"
        >
          <div className="w-8 h-8 rounded border border-cyber-cyan/50 flex items-center justify-center
                          group-hover:border-cyber-cyan group-hover:glow-cyan transition-all duration-200">
            <Shield className="w-4 h-4 text-cyber-cyan" />
          </div>
          <span className="font-terminal text-sm font-semibold">
            <span className="text-cyber-cyan">ashish</span>
            <span className="text-foreground">@sec</span>
            <span className="text-cyber-cyan animate-pulse">_</span>
          </span>
        </button>

        {/* ── Desktop links ── */}
        <ul className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => {
            const isActive = activeSection === link.href.slice(1);
            return (
              <li key={link.href}>
                <button
                  onClick={() => scrollTo(link.href)}
                  className={`relative px-4 py-2 text-sm font-medium rounded-md transition-colors duration-200 ${
                    isActive
                      ? "text-cyber-cyan"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {isActive && (
                    <motion.span
                      layoutId="active-pill"
                      className="absolute inset-0 rounded-md bg-cyber-cyan/10 border border-cyber-cyan/20"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                  <span className="relative">{link.label}</span>
                </button>
              </li>
            );
          })}
        </ul>

        {/* ── Resume button (desktop) ── */}
        <div className="hidden md:block">
          <Button
            variant="outline"
            size="sm"
            className="border-cyber-cyan/50 text-cyber-cyan hover:bg-cyber-cyan/10
                       hover:border-cyber-cyan font-terminal text-xs"
            asChild
          >
            <a href="/resume.pdf" target="_blank" rel="noopener noreferrer">
              resume.pdf
            </a>
          </Button>
        </div>

        {/* ── Mobile hamburger ── */}
        <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
          <SheetTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden text-muted-foreground hover:text-cyber-cyan"
            >
              <Menu className="w-5 h-5" />
            </Button>
          </SheetTrigger>

          <SheetContent side="right" className="w-72 bg-card border-border p-0">
            <div className="flex flex-col h-full p-6">

              {/* Mobile logo */}
              <div className="flex items-center gap-2 mb-8">
                <Shield className="w-4 h-4 text-cyber-cyan" />
                <span className="font-terminal text-sm text-cyber-cyan">
                  ashish@sec_
                </span>
              </div>

              {/* Mobile links */}
              <ul className="flex flex-col gap-1 flex-1">
                {navLinks.map((link, i) => {
                  const isActive = activeSection === link.href.slice(1);
                  return (
                    <motion.li
                      key={link.href}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.06 }}
                    >
                      <button
                        onClick={() => scrollTo(link.href)}
                        className={`w-full text-left px-4 py-3 rounded-md text-sm font-medium
                                    transition-colors duration-200 ${
                          isActive
                            ? "text-cyber-cyan bg-cyber-cyan/10 border border-cyber-cyan/20"
                            : "text-muted-foreground hover:text-foreground hover:bg-secondary"
                        }`}
                      >
                        <span className="text-cyber-cyan/40 font-terminal mr-2 text-xs">
                          {String(i + 1).padStart(2, "0")}.
                        </span>
                        {link.label}
                      </button>
                    </motion.li>
                  );
                })}
              </ul>

              {/* Mobile resume */}
              <Button
                variant="outline"
                className="w-full mt-4 border-cyber-cyan/50 text-cyber-cyan
                           hover:bg-cyber-cyan/10 font-terminal text-xs"
                asChild
              >
                <a href="/resume.pdf" target="_blank" rel="noopener noreferrer">
                  resume.pdf
                </a>
              </Button>

            </div>
          </SheetContent>
        </Sheet>

      </nav>
    </motion.header>
  );
}