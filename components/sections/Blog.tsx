"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BookOpen, Clock, ArrowRight, Tag, Rss } from "lucide-react";

// ── Types ─────────────────────────────────────────────────────────────
type BlogTag = "All" | "Security" | "CTF" | "Dev" | "AI/ML";

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: number;
  tags: BlogTag[];
  category: string;
  featured?: boolean;
  href?: string;
  accent: "cyan" | "green" | "purple" | "amber";
}

// ── Data ──────────────────────────────────────────────────────────────
const posts: BlogPost[] = [
  {
    id: "1",
    title: "Building a Real-Time NIDS with C++ and libpcap",
    excerpt:
      "A deep dive into crafting a high-performance network intrusion detection system from scratch — packet capture, rule engines, and live alerting.",
    date: "Jun 12, 2025",
    readTime: 12,
    tags: ["Security", "Dev"],
    category: "Security Engineering",
    featured: true,
    accent: "cyan",
  },
  {
    id: "2",
    title: "JWT Vulnerabilities: From None Algorithm to Key Confusion",
    excerpt:
      "Exploring the most dangerous JWT attack vectors I've encountered in CTFs and real-world pentests, with working PoC code.",
    date: "May 28, 2025",
    readTime: 8,
    tags: ["Security", "CTF"],
    category: "Web Security",
    accent: "green",
  },
  {
    id: "3",
    title: "Using Gemini API for Automated Malware Triage",
    excerpt:
      "How I built a GenAI-powered pipeline that takes a suspicious binary, disassembles it with Ghidra, and produces a human-readable threat report.",
    date: "May 10, 2025",
    readTime: 10,
    tags: ["AI/ML", "Security"],
    category: "AI × Security",
    accent: "purple",
  },
  {
    id: "4",
    title: "PicoCTF 2024: ret2libc Writeup and ROP Chain Breakdown",
    excerpt:
      "Step-by-step walkthrough of a classic return-to-libc exploit: leak addresses, defeat ASLR, and pop a shell using a minimal ROP gadget chain.",
    date: "Apr 22, 2025",
    readTime: 6,
    tags: ["CTF", "Security"],
    category: "Binary Exploitation",
    accent: "amber",
  },
  {
    id: "5",
    title: "Building a Threat Intel Dashboard with FastAPI + React",
    excerpt:
      "Aggregating IOC feeds from VirusTotal, OTX, and abuse.ch into a single searchable UI — architecture, API design, and caching strategy.",
    date: "Apr 05, 2025",
    readTime: 9,
    tags: ["Dev", "Security"],
    category: "Full-Stack",
    accent: "cyan",
  },
  {
    id: "6",
    title: "MITRE ATT&CK Mapping in Practice: Log Correlation with Python",
    excerpt:
      "How to programmatically map SIEM alerts to ATT&CK techniques using Python and the TAXII feed — building actionable incident summaries.",
    date: "Mar 18, 2025",
    readTime: 7,
    tags: ["Security", "Dev"],
    category: "Blue Team",
    accent: "green",
  },
];

// ── Accent helpers ────────────────────────────────────────────────────
const accentCls = {
  cyan:   { text: "text-cyber-cyan",  border: "border-cyber-cyan/30",  bg: "bg-cyber-cyan/10",  bar: "bg-cyber-cyan"  },
  green:  { text: "text-cyber-green", border: "border-cyber-green/30", bg: "bg-cyber-green/10", bar: "bg-cyber-green" },
  purple: { text: "text-purple-400",  border: "border-purple-400/30",  bg: "bg-purple-400/10",  bar: "bg-purple-400"  },
  amber:  { text: "text-amber-400",   border: "border-amber-400/30",   bg: "bg-amber-400/10",   bar: "bg-amber-400"   },
};

const TAGS: BlogTag[] = ["All", "Security", "CTF", "Dev", "AI/ML"];

// ── Featured post ─────────────────────────────────────────────────────
function FeaturedPost({ post }: { post: BlogPost }) {
  const a = accentCls[post.accent];
  return (
    <motion.a
      href={post.href ?? "#"}
      target={post.href ? "_blank" : undefined}
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="cyber-card rounded-xl p-7 lg:p-8 group relative overflow-hidden block mb-8"
    >
      {/* Glow blob */}
      <div className={`absolute -top-10 -right-10 w-48 h-48 rounded-full blur-3xl opacity-10 ${a.bar}`} />

      <div className="relative z-10">
        <div className="flex flex-wrap items-center gap-2 mb-4">
          <span className={`font-terminal text-[10px] px-2 py-0.5 rounded-full border ${a.bg} ${a.border} ${a.text}`}>
            ★ Featured
          </span>
          <span className="font-terminal text-[10px] text-muted-foreground">{post.category}</span>
        </div>

        <h3 className={`text-xl lg:text-2xl font-bold text-foreground group-hover:${a.text} transition-colors duration-200 mb-3 leading-snug`}>
          {post.title}
        </h3>
        <p className="text-sm text-muted-foreground leading-relaxed max-w-2xl mb-5">
          {post.excerpt}
        </p>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <span className="font-terminal text-xs text-muted-foreground">{post.date}</span>
            <span className="flex items-center gap-1 font-terminal text-xs text-muted-foreground">
              <Clock className="w-3 h-3" />
              {post.readTime} min read
            </span>
          </div>
          <span className={`flex items-center gap-1 font-terminal text-xs ${a.text} group-hover:gap-2 transition-all duration-200`}>
            Read post <ArrowRight className="w-3.5 h-3.5" />
          </span>
        </div>
      </div>
    </motion.a>
  );
}

// ── Blog Card ─────────────────────────────────────────────────────────
function BlogCard({ post, index }: { post: BlogPost; index: number }) {
  const a = accentCls[post.accent];
  return (
    <motion.a
      href={post.href ?? "#"}
      target={post.href ? "_blank" : undefined}
      rel="noopener noreferrer"
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.35, delay: index * 0.07 }}
      className="cyber-card rounded-xl p-5 flex flex-col gap-3 group"
    >
      {/* Category label */}
      <div className="flex items-center justify-between">
        <span className={`font-terminal text-[10px] tracking-widest ${a.text}`}>
          {post.category.toUpperCase()}
        </span>
        <div className={`w-1.5 h-1.5 rounded-full ${a.bar}`} />
      </div>

      {/* Title */}
      <h3 className={`text-sm font-semibold text-foreground leading-snug group-hover:${a.text} transition-colors duration-200`}>
        {post.title}
      </h3>

      {/* Excerpt */}
      <p className="text-xs text-muted-foreground leading-relaxed flex-1">
        {post.excerpt}
      </p>

      {/* Footer */}
      <div className="flex items-center justify-between pt-2 border-t border-cyber-border">
        <div className="flex items-center gap-3">
          <span className="font-terminal text-[10px] text-muted-foreground">{post.date}</span>
          <span className="flex items-center gap-1 font-terminal text-[10px] text-muted-foreground">
            <Clock className="w-2.5 h-2.5" />
            {post.readTime}m
          </span>
        </div>
        <ArrowRight className={`w-3.5 h-3.5 ${a.text} opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all duration-200`} />
      </div>
    </motion.a>
  );
}

// ── Section ───────────────────────────────────────────────────────────
export default function Blog() {
  const [activeTag, setActiveTag] = useState<BlogTag>("All");

  const featuredPost = posts.find((p) => p.featured);
  const otherPosts = posts.filter((p) => !p.featured);

  const filtered =
    activeTag === "All"
      ? otherPosts
      : otherPosts.filter((p) => p.tags.includes(activeTag));

  return (
    <section id="blog" className="relative py-24 overflow-hidden">
      {/* Background glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_20%_80%,oklch(0.89_0.28_142/0.05),transparent)]" />

      <div className="relative z-10 max-w-6xl mx-auto px-6">

        {/* ── Header ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <span className="font-terminal text-xs text-cyber-cyan tracking-widest uppercase">
            // blog
          </span>
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mt-2">
            Thoughts &amp; Writeups<span className="text-cyber-cyan text-glow-cyan">.</span>
          </h2>
          <p className="text-muted-foreground text-sm mt-3 max-w-lg">
            Security research, CTF breakdowns, and engineering deep-dives — written to share what I learn.
          </p>
        </motion.div>

        {/* ── Featured post ── */}
        {featuredPost && <FeaturedPost post={featuredPost} />}

        {/* ── Tag filter ── */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="flex flex-wrap gap-2 mb-8"
        >
          {TAGS.map((tag) => {
            const isActive = activeTag === tag;
            const count = tag === "All" ? otherPosts.length : otherPosts.filter(p => p.tags.includes(tag)).length;
            return (
              <button
                key={tag}
                onClick={() => setActiveTag(tag)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border transition-all duration-200
                  ${isActive
                    ? "bg-cyber-cyan/10 border-cyber-cyan/50 text-cyber-cyan"
                    : "border-cyber-border text-muted-foreground hover:text-foreground hover:border-cyber-cyan/30 hover:bg-cyber-surface"
                  }`}
              >
                <Tag className="w-3 h-3" />
                {tag}
                <span className="font-terminal text-[10px] opacity-60">({count})</span>
              </button>
            );
          })}
        </motion.div>

        {/* ── Posts grid ── */}
        <motion.div layout className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          <AnimatePresence mode="popLayout">
            {filtered.map((post, i) => (
              <BlogCard key={post.id} post={post} index={i} />
            ))}
          </AnimatePresence>
        </motion.div>

        {/* ── Newsletter / RSS CTA ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-12 cyber-card rounded-xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4"
        >
          <div className="flex items-start gap-3">
            <div className="p-2.5 rounded-lg bg-cyber-cyan/10 border border-cyber-cyan/30 shrink-0 mt-0.5">
              <BookOpen className="w-4 h-4 text-cyber-cyan" />
            </div>
            <div>
              <p className="font-terminal text-xs text-cyber-cyan tracking-widest mb-1">STAY UPDATED</p>
              <p className="text-sm text-muted-foreground">New posts on security research, CTF writeups, and tool builds — published regularly.</p>
            </div>
          </div>
          <a
            href="#"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border border-cyber-cyan/40 text-cyber-cyan font-terminal text-xs hover:bg-cyber-cyan/10 hover:border-cyber-cyan transition-all duration-200 shrink-0"
          >
            <Rss className="w-3.5 h-3.5" />
            RSS Feed
          </a>
        </motion.div>

      </div>
    </section>
  );
}
