import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState, useRef } from "react";
import {
  Code2, Smartphone, Layers, Database, Brain, Cpu,
  Mail, Phone, Github, Instagram, ArrowRight, Send,
  Menu, X, Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Subhan Shafique — Computer Science Student & Frontend Developer" },
      { name: "description", content: "Portfolio of Subhan Shafique, a Computer Science student and frontend developer crafting modern, responsive web experiences with React.js." },
      { property: "og:title", content: "Subhan Shafique — Portfolio" },
      { property: "og:description", content: "Computer Science student & frontend developer building modern web applications." },
    ],
    links: [
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=Inter:wght@300;400;500;600&display=swap" },
    ],
  }),
  component: Portfolio,
});

const SECTIONS = ["home", "about", "services", "contact"] as const;

function Portfolio() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState<string>("home");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 900);
    return () => clearTimeout(t);
  }, []);

  // Scroll reveal
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("visible");
        });
      },
      { threshold: 0.12 },
    );
    document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [loading]);

  // Active section tracking
  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY + 120;
      for (const id of SECTIONS) {
        const el = document.getElementById(id);
        if (el && el.offsetTop <= y && el.offsetTop + el.offsetHeight > y) {
          setActive(id);
          break;
        }
      }
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id: string) => {
    setMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  if (loading) return <Loader />;

  return (
    <div className="min-h-screen text-foreground font-body">
      <Navbar active={active} onNav={scrollTo} menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
      <Home onNav={scrollTo} />
      <About />
      <Skills />
      <Services />
      <Contact />
      <Footer />
    </div>
  );
}

function Loader() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="relative h-16 w-16">
        <div className="absolute inset-0 rounded-full border-2 border-accent/20" />
        <div className="absolute inset-0 animate-spin rounded-full border-2 border-transparent border-t-accent" />
        <div className="absolute inset-2 animate-pulse rounded-full bg-accent/20" />
      </div>
    </div>
  );
}

function Navbar({ active, onNav, menuOpen, setMenuOpen }: {
  active: string; onNav: (id: string) => void; menuOpen: boolean; setMenuOpen: (v: boolean) => void;
}) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "py-3" : "py-5"}`}>
      <nav className={`mx-auto flex max-w-6xl items-center justify-between px-6 transition-all duration-300 ${scrolled ? "glass rounded-2xl mx-4 md:mx-auto" : ""}`}>
        <button onClick={() => onNav("home")} className="flex items-center gap-2 font-display text-lg font-bold">
          <span className="grid h-8 w-8 place-items-center rounded-lg bg-accent/15 text-accent">S</span>
          <span>Subhan<span className="text-accent">.</span></span>
        </button>

        <ul className="hidden items-center gap-1 md:flex">
          {SECTIONS.map((id) => (
            <li key={id}>
              <button
                onClick={() => onNav(id)}
                className={`relative rounded-lg px-4 py-2 text-sm capitalize transition-colors ${active === id ? "text-foreground" : "text-muted-foreground hover:text-foreground"}`}
              >
                {id}
                {active === id && (
                  <span className="absolute bottom-0 left-1/2 h-0.5 w-6 -translate-x-1/2 rounded-full bg-accent" />
                )}
              </button>
            </li>
          ))}
        </ul>

        <Button onClick={() => onNav("contact")} className="hidden md:inline-flex bg-accent text-accent-foreground hover:bg-accent/90">
          Hire Me
        </Button>

        <button className="md:hidden" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu">
          {menuOpen ? <X /> : <Menu />}
        </button>
      </nav>

      {menuOpen && (
        <div className="glass mx-4 mt-2 rounded-2xl p-4 md:hidden animate-scale-in">
          <ul className="flex flex-col gap-1">
            {SECTIONS.map((id) => (
              <li key={id}>
                <button onClick={() => onNav(id)} className="w-full rounded-lg px-4 py-3 text-left text-sm capitalize hover:bg-white/5">
                  {id}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
}

function Home({ onNav }: { onNav: (id: string) => void }) {
  return (
    <section id="home" className="relative flex min-h-screen items-center px-6 pt-32 pb-20">
      <div className="absolute top-1/2 left-1/2 -z-10 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/20 blur-[120px]" />
      <div className="mx-auto grid w-full max-w-6xl items-center gap-12 md:grid-cols-[1.3fr_1fr]">
        <div>
          <div className="glass mb-6 inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs text-muted-foreground animate-fade-up">
            <Sparkles className="h-3.5 w-3.5 text-accent" />
            Available for new projects
          </div>
          <h1 className="font-display text-4xl font-bold leading-tight sm:text-5xl md:text-6xl lg:text-7xl">
            <span className="block animate-fade-up">Hi, I'm</span>
            <span className="text-gradient block animate-fade-up" style={{ animationDelay: "0.15s" }}>
              Subhan Shafique
            </span>
          </h1>
          <p className="mt-4 h-7 overflow-hidden text-lg text-muted-foreground sm:text-xl">
            <span className="typing-text">Computer Science Student & Frontend Developer</span>
          </p>
          <p className="mt-6 max-w-xl text-base text-muted-foreground/90 animate-fade-up sm:text-lg" style={{ animationDelay: "0.4s" }}>
            I craft fast, accessible, and beautifully designed web experiences using modern tools like React, with a love for clean code, problem solving, and intelligent systems.
          </p>
          <div className="mt-8 flex flex-wrap gap-3 animate-fade-up" style={{ animationDelay: "0.55s" }}>
            <Button size="lg" onClick={() => onNav("services")} className="btn-glow bg-accent text-accent-foreground hover:bg-accent/90">
              View Projects <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button size="lg" variant="outline" onClick={() => onNav("contact")} className="border-white/20 bg-transparent hover:bg-white/5">
              Contact Me
            </Button>
          </div>
        </div>

        <div className="relative mx-auto hidden md:block">
          <div className="absolute -inset-6 rounded-full bg-gradient-to-tr from-accent/30 to-accent-glow/30 blur-2xl" />
          <div className="glass relative grid aspect-square w-72 place-items-center rounded-full animate-float">
            <div className="grid h-56 w-56 place-items-center rounded-full border border-white/10 bg-background/60">
              <span className="font-display text-7xl font-bold text-gradient">SS</span>
            </div>
            {["React", "Python", "ML", "SQL"].map((s, i) => (
              <span
                key={s}
                className="glass absolute rounded-full px-3 py-1 text-xs font-medium"
                style={{
                  top: `${50 + 48 * Math.sin((i / 4) * Math.PI * 2)}%`,
                  left: `${50 + 48 * Math.cos((i / 4) * Math.PI * 2)}%`,
                  transform: "translate(-50%, -50%)",
                }}
              >
                {s}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function SectionHeader({ tag, title, subtitle }: { tag: string; title: string; subtitle?: string }) {
  return (
    <div className="reveal mb-14 text-center">
      <span className="glass inline-block rounded-full px-3 py-1 text-xs uppercase tracking-widest text-accent">{tag}</span>
      <h2 className="mt-4 font-display text-3xl font-bold sm:text-4xl md:text-5xl">{title}</h2>
      {subtitle && <p className="mx-auto mt-3 max-w-2xl text-muted-foreground">{subtitle}</p>}
    </div>
  );
}

function About() {
  return (
    <section id="about" className="px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <SectionHeader tag="About Me" title="Curious builder, lifelong learner" />
        <div className="grid items-center gap-10 md:grid-cols-2">
          <div className="reveal glass relative aspect-[4/5] overflow-hidden rounded-3xl p-1">
            <div className="grid h-full w-full place-items-center rounded-[20px] bg-gradient-to-br from-accent/20 via-background to-accent-glow/20">
              <div className="text-center">
                <div className="mx-auto mb-4 grid h-32 w-32 place-items-center rounded-full bg-background/60 font-display text-5xl font-bold text-gradient">SS</div>
                <p className="font-display text-xl font-semibold">Subhan Shafique</p>
                <p className="text-sm text-muted-foreground">CS Student · Developer</p>
              </div>
            </div>
          </div>

          <div className="reveal space-y-5 text-muted-foreground">
            <p className="text-lg leading-relaxed">
              I'm a Computer Science student deeply passionate about technology and frontend
              development. I love turning complex ideas into clean, intuitive interfaces and
              solving real-world problems through code.
            </p>
            <p className="leading-relaxed">
              My focus areas span modern web applications, software engineering, and emerging
              fields like AI and Machine Learning. I'm constantly learning new technologies and
              experimenting with ways to build user-friendly digital experiences that feel both
              fast and delightful.
            </p>
            <div className="grid grid-cols-3 gap-3 pt-4">
              {[
                { k: "10+", v: "Projects" },
                { k: "2+", v: "Years Coding" },
                { k: "∞", v: "Curiosity" },
              ].map((s) => (
                <div key={s.v} className="glass rounded-xl p-4 text-center">
                  <div className="font-display text-2xl font-bold text-gradient">{s.k}</div>
                  <div className="mt-1 text-xs uppercase tracking-wider">{s.v}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

const SKILLS = [
  { name: "HTML", level: 95 },
  { name: "CSS", level: 90 },
  { name: "JavaScript", level: 85 },
  { name: "React.js", level: 85 },
  { name: "SQL / Database", level: 80 },
  { name: "OOP", level: 85 },
  { name: "Python", level: 80 },
  { name: "Machine Learning", level: 70 },
];

function Skills() {
  return (
    <section id="skills" className="px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <SectionHeader tag="Skills" title="Tools I work with" subtitle="A blend of frontend craft, backend fundamentals, and a growing toolkit in AI/ML." />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {SKILLS.map((s, i) => (
            <SkillCard key={s.name} skill={s} delay={i * 60} />
          ))}
        </div>
      </div>
    </section>
  );
}

function SkillCard({ skill, delay }: { skill: { name: string; level: number }; delay: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [w, setW] = useState(0);
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setTimeout(() => setW(skill.level), delay);
        });
      },
      { threshold: 0.3 },
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [delay, skill.level]);

  return (
    <div ref={ref} className="reveal glass group rounded-2xl p-5 transition-all hover:-translate-y-1 hover:shadow-[0_0_30px_oklch(0.7_0.18_250/_25%)]">
      <div className="flex items-center justify-between">
        <h3 className="font-display font-semibold">{skill.name}</h3>
        <span className="text-sm text-accent">{skill.level}%</span>
      </div>
      <div className="mt-3 h-2 overflow-hidden rounded-full bg-white/5">
        <div
          className="h-full rounded-full bg-gradient-to-r from-accent to-accent-glow transition-[width] duration-1000 ease-out"
          style={{ width: `${w}%` }}
        />
      </div>
    </div>
  );
}

const SERVICES = [
  { icon: Code2, title: "Frontend Web Development", desc: "Pixel-perfect, performant interfaces built with semantic HTML, modern CSS, and JavaScript." },
  { icon: Smartphone, title: "Responsive Website Design", desc: "Mobile-first layouts that look and feel great on every screen size and device." },
  { icon: Layers, title: "React.js Development", desc: "Scalable component-driven applications with clean state management and great UX." },
  { icon: Database, title: "Database Design", desc: "Well-structured SQL schemas, normalization, and efficient queries for real apps." },
  { icon: Cpu, title: "Python Programming", desc: "Scripts, automation, and clean OOP solutions tailored to your problem domain." },
  { icon: Brain, title: "Machine Learning Projects", desc: "Practical ML models — data prep, training, evaluation, and simple deployment." },
];

function Services() {
  return (
    <section id="services" className="px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <SectionHeader tag="Services" title="What I can build for you" subtitle="From a single landing page to full-featured web apps and data-driven prototypes." />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map(({ icon: Icon, title, desc }) => (
            <div key={title} className="reveal glass group relative overflow-hidden rounded-2xl p-6 transition-all hover:-translate-y-2">
              <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-accent/10 blur-2xl transition-all group-hover:bg-accent/30" />
              <div className="relative">
                <div className="grid h-12 w-12 place-items-center rounded-xl bg-accent/15 text-accent transition-transform group-hover:scale-110">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="mt-5 font-display text-xl font-semibold">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{desc}</p>
                <div className="mt-5 flex items-center gap-1 text-sm text-accent opacity-0 transition-opacity group-hover:opacity-100">
                  Learn more <ArrowRight className="h-4 w-4" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Contact() {
  const [submitting, setSubmitting] = useState(false);
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      toast.success("Message sent! I'll get back to you soon.");
      (e.target as HTMLFormElement).reset();
    }, 900);
  };

  return (
    <section id="contact" className="px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <SectionHeader tag="Contact" title="Let's build something together" subtitle="Have a project in mind or just want to say hi? My inbox is always open." />
        <div className="grid gap-8 md:grid-cols-[1fr_1.2fr]">
          <div className="reveal space-y-4">
            <ContactRow icon={Mail} label="Email" value="miansubhan443@gmail.com" href="mailto:miansubhan443@gmail.com" />
            <ContactRow icon={Phone} label="Phone" value="0318 1450839" href="tel:+923181450839" />
            <div className="glass rounded-2xl p-5">
              <p className="text-xs uppercase tracking-widest text-muted-foreground">Follow me</p>
              <div className="mt-3 flex gap-3">
                <SocialBtn href="https://github.com/" label="GitHub"><Github className="h-5 w-5" /></SocialBtn>
                <SocialBtn href="https://instagram.com/" label="Instagram"><Instagram className="h-5 w-5" /></SocialBtn>
              </div>
            </div>
          </div>

          <form onSubmit={onSubmit} className="reveal glass space-y-4 rounded-2xl p-6">
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Your Name"><Input required name="name" placeholder="John Doe" className="border-white/10 bg-white/5" /></Field>
              <Field label="Your Email"><Input required type="email" name="email" placeholder="you@example.com" className="border-white/10 bg-white/5" /></Field>
            </div>
            <Field label="Subject"><Input required name="subject" placeholder="Project inquiry" className="border-white/10 bg-white/5" /></Field>
            <Field label="Message"><Textarea required name="message" rows={5} placeholder="Tell me about your idea..." className="border-white/10 bg-white/5" /></Field>
            <Button type="submit" disabled={submitting} size="lg" className="w-full btn-glow bg-accent text-accent-foreground hover:bg-accent/90">
              {submitting ? "Sending..." : (<>Send Message <Send className="ml-2 h-4 w-4" /></>)}
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs uppercase tracking-wider text-muted-foreground">{label}</span>
      {children}
    </label>
  );
}

function ContactRow({ icon: Icon, label, value, href }: { icon: typeof Mail; label: string; value: string; href: string }) {
  return (
    <a href={href} className="glass flex items-center gap-4 rounded-2xl p-5 transition-all hover:-translate-y-0.5 hover:bg-white/5">
      <div className="grid h-11 w-11 place-items-center rounded-xl bg-accent/15 text-accent"><Icon className="h-5 w-5" /></div>
      <div>
        <p className="text-xs uppercase tracking-widest text-muted-foreground">{label}</p>
        <p className="font-medium">{value}</p>
      </div>
    </a>
  );
}

function SocialBtn({ href, label, children }: { href: string; label: string; children: React.ReactNode }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" aria-label={label}
      className="grid h-11 w-11 place-items-center rounded-xl border border-white/10 bg-white/5 text-foreground transition-all hover:-translate-y-1 hover:border-accent/50 hover:bg-accent/15 hover:text-accent">
      {children}
    </a>
  );
}

function Footer() {
  return (
    <footer className="border-t border-white/5 px-6 py-8">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 text-sm text-muted-foreground sm:flex-row">
        <p>© 2026 Subhan Shafique. All Rights Reserved.</p>
        <p>Built with <span className="text-accent">React</span> & passion.</p>
      </div>
    </footer>
  );
}
