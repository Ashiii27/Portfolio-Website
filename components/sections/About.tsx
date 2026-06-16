"use client";

import { motion } from "framer-motion";
import { Shield, Code2, Trophy, GraduationCap, Terminal } from "lucide-react";

// ── Section header helper ─────────────────────────────────────────
function SectionHeading({ label, title }: { label: string; title: string }) {
  return (
    <div className="space-y-2 mb-12">
      <span className="font-terminal text-xs text-cyber-cyan tracking-widest uppercase">
        {label}
      </span>
      <h2 className="text-3xl lg:text-4xl font-bold text-foreground">
        {title}
        <span className="text-cyber-cyan text-glow-cyan">.</span>
      </h2>
    </div>
  );
}

// ── Data ──────────────────────────────────────────────────────────
const timeline = [
  {
    year: "2022 – Present",
    icon: GraduationCap,
    title: "B.Tech Computer Science & Engineering",
    org: "MMMUT Gorakhpur",
    desc: "Pursuing my degree with a focus on cybersecurity, networks, and systems programming. Active in technical clubs and college CTF teams.",
    accent: "cyan",
  },
  {
    year: "2023 – Present",
    icon: Shield,
    title: "SOC & Blue Team Practice",
    org: "TryHackMe · HackTheBox",
    desc: "Achieved Top 2% ranking on TryHackMe globally. Completed 200+ rooms covering SIEM, threat hunting, malware analysis, and network forensics.",
    accent: "green",
  },
  {
    year: "2024",
    icon: Trophy,
    title: "CTF — 1st Place",
    org: "MMMUT CES Capture The Flag",
    desc: "Led team to first place in the college-level CTF competition. Solved challenges across web exploitation, reverse engineering, and cryptography.",
    accent: "cyan",
  },
  {
    year: "2024 – Present",
    icon: Code2,
    title: "Full-Stack & Security Tools",
    org: "Personal Projects",
    desc: "Building production-grade tools — a Network IDS in C++, a GenAI-powered malware analysis pipeline, and various open-source security utilities.",
    accent: "green",
  },
];

const interests = [
  "Threat Hunting",
  "Malware Analysis",
  "Network Forensics",
  "SIEM / SOAR",
  "Reverse Engineering",
  "CTF Competitions",
  "Secure Systems Design",
  "Basketball 🏀",
  "Open Source",
];

const quickFacts = [
  { icon: Terminal, label: "Primary OS", value: "Kali Linux / Windows" },
  { icon: Shield,   label: "Focus Area", value: "Blue Team / DFIR"     },
  { icon: Code2,    label: "Languages",  value: "C++, Python, TypeScript" },
  { icon: Trophy,   label: "THM Rank",   value: "Top 2% Globally"     },
];

// ── Component ─────────────────────────────────────────────────────
export default function About() {
  return (
    <section id="about" className="relative py-24 overflow-hidden">
      {/* Subtle background grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,oklch(0.82_0.15_205/0.03)_1px,transparent_1px),linear-gradient(to_bottom,oklch(0.82_0.15_205/0.03)_1px,transparent_1px)] bg-[size:4rem_4rem]" />

      <div className="relative z-10 max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <SectionHeading label="// about me" title="Who I Am" />
        </motion.div>

        {/* ── Top grid: bio + quick facts ── */}
        <div className="grid lg:grid-cols-5 gap-8 mb-16">

          {/* Bio card — 3 cols */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="lg:col-span-3 cyber-card rounded-xl p-8 space-y-5"
          >
            <div className="flex items-center gap-3 mb-2">
              <span className="w-2 h-2 rounded-full bg-cyber-green animate-pulse" />
              <span className="font-terminal text-xs text-cyber-green tracking-widest">
                PROFILE LOADED
              </span>
            </div>

            <p className="text-muted-foreground leading-relaxed text-base">
              I&apos;m <span className="text-foreground font-semibold">Ashish Kumar</span>, a
              Computer Science student at <span className="text-cyber-cyan">MMMUT Gorakhpur</span>{" "}
              with a deep obsession for cybersecurity and systems engineering.
            </p>
            <p className="text-muted-foreground leading-relaxed text-base">
              My work sits at the intersection of{" "}
              <span className="text-foreground font-semibold">Blue Team defense</span> and{" "}
              <span className="text-foreground font-semibold">full-stack development</span>. I build
              things that matter — from network intrusion detection systems written in raw C++ to
              AI-powered malware analysis pipelines that help security teams respond faster.
            </p>
            <p className="text-muted-foreground leading-relaxed text-base">
              When I&apos;m not hunting threats or writing code, I&apos;m on the basketball court or
              cracking CTF challenges. I believe the discipline of competitive sport and the
              precision of security engineering aren&apos;t that different.
            </p>

            {/* Interests */}
            <div className="pt-2">
              <p className="font-terminal text-xs text-muted-foreground mb-3 tracking-widest">
                INTERESTS &amp; AREAS
              </p>
              <div className="flex flex-wrap gap-2">
                {interests.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 rounded-full text-xs font-terminal border border-cyber-border bg-cyber-surface text-muted-foreground hover:border-cyber-cyan/50 hover:text-cyber-cyan transition-colors duration-200"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Quick facts — 2 cols */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="lg:col-span-2 flex flex-col gap-4"
          >
            {quickFacts.map(({ icon: Icon, label, value }, i) => (
              <motion.div
                key={label}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.25 + i * 0.08 }}
                className="cyber-card rounded-xl p-5 flex items-start gap-4"
              >
                <div className="p-2 rounded-lg bg-cyber-cyan/10 border border-cyber-cyan/20 shrink-0">
                  <Icon className="w-4 h-4 text-cyber-cyan" />
                </div>
                <div>
                  <p className="font-terminal text-xs text-muted-foreground tracking-widest mb-1">
                    {label.toUpperCase()}
                  </p>
                  <p className="text-foreground text-sm font-medium">{value}</p>
                </div>
              </motion.div>
            ))}

            {/* Currently learning card */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.6 }}
              className="cyber-card rounded-xl p-5 border-cyber-green/20 bg-cyber-green/5"
            >
              <p className="font-terminal text-xs text-cyber-green tracking-widest mb-2">
                CURRENTLY LEARNING
              </p>
              <p className="text-foreground text-sm font-medium">
                Rust · Cloud Security (AWS) · Kubernetes Hardening
              </p>
            </motion.div>
          </motion.div>
        </div>

        {/* ── Timeline ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-4"
        >
          <p className="font-terminal text-xs text-cyber-cyan tracking-widest uppercase mb-8">
            // journey
          </p>
        </motion.div>

        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-5 top-0 bottom-0 w-px bg-gradient-to-b from-cyber-cyan/40 via-cyber-border to-transparent hidden md:block" />

          <div className="space-y-6">
            {timeline.map((item, i) => {
              const Icon = item.icon;
              const isCyan = item.accent === "cyan";
              return (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.1 }}
                  className="relative md:pl-16"
                >
                  {/* Timeline dot */}
                  <div
                    className={`absolute left-0 top-5 w-10 h-10 rounded-full border flex items-center justify-center hidden md:flex shrink-0
                      ${isCyan
                        ? "border-cyber-cyan/40 bg-cyber-cyan/10"
                        : "border-cyber-green/40 bg-cyber-green/10"
                      }`}
                  >
                    <Icon
                      className={`w-4 h-4 ${isCyan ? "text-cyber-cyan" : "text-cyber-green"}`}
                    />
                  </div>

                  <div className="cyber-card rounded-xl p-6 group">
                    <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
                      <div>
                        <h3 className="text-foreground font-semibold text-base group-hover:text-cyber-cyan transition-colors duration-200">
                          {item.title}
                        </h3>
                        <p
                          className={`font-terminal text-xs mt-0.5 ${isCyan ? "text-cyber-cyan/70" : "text-cyber-green/70"}`}
                        >
                          {item.org}
                        </p>
                      </div>
                      <span className="font-terminal text-xs text-muted-foreground border border-cyber-border rounded-full px-3 py-1 shrink-0">
                        {item.year}
                      </span>
                    </div>
                    <p className="text-muted-foreground text-sm leading-relaxed">{item.desc}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
