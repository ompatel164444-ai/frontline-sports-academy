import bannerImg from "@/assets/banner.jpeg";
import logoImg from "@/assets/logo.jpeg";
import AdminPage from "@/components/AdminPage";
import EnrollModal from "@/components/EnrollModal";
import LoadingScreen from "@/components/LoadingScreen";
import { Button } from "@/components/ui/button";
import {
  Activity,
  Award,
  ChevronRight,
  Clock,
  IndianRupee,
  Mail,
  MapPin,
  Menu,
  Phone,
  Star,
  Target,
  Trophy,
  Users,
  X,
  Zap,
} from "lucide-react";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";
import { useEffect, useRef, useState } from "react";
import { SiFacebook, SiInstagram, SiWhatsapp } from "react-icons/si";

const NAV_LINKS = [
  { label: "Home", href: "#home" },
  { label: "Fees", href: "#fees" },
  { label: "About", href: "#about" },
  { label: "Programs", href: "#programs" },
  { label: "Locations", href: "#locations" },
  { label: "Contact", href: "#contact" },
];

const PROGRAMS = [
  {
    icon: Trophy,
    title: "Batting Coaching",
    description:
      "Master every stroke from cover drives to pulls with expert guidance on technique, footwork, and shot selection.",
    image: "/assets/generated/program-batting.dim_600x400.jpg",
  },
  {
    icon: Target,
    title: "Bowling Coaching",
    description:
      "Develop pace, swing, and spin with biomechanics-focused coaching that builds match-winning skills.",
    image: "/assets/generated/program-bowling.dim_600x400.jpg",
  },
  {
    icon: Zap,
    title: "Fielding Training",
    description:
      "Improve agility, reflexes, and ground coverage with advanced fielding drills.",
    image: "/assets/generated/program-fielding.dim_600x400.jpg",
  },
  {
    icon: Activity,
    title: "Fitness & Conditioning",
    description:
      "Sport-specific fitness programs covering strength, agility, endurance, and injury prevention.",
    image: "/assets/generated/program-fitness.dim_600x400.jpg",
  },
  {
    icon: Star,
    title: "Match Experience",
    description:
      "Build confidence through net sessions, match simulations, and tournament opportunities.",
    image: "/assets/generated/program-match.dim_600x400.jpg",
  },
];

const STATS = [
  { icon: Users, value: 500, suffix: "+", label: "Players Trained" },
  { icon: Trophy, value: 50, suffix: "+", label: "Tournaments Won" },
  { icon: Star, value: 10, suffix: "+", label: "Years of Excellence" },
  { icon: Award, value: 20, suffix: "+", label: "Expert Coaches" },
];

const BATCH_FEES = [
  { duration: "1 Month", price: "₹2,000/-" },
  { duration: "2 Months", price: "₹3,500/-" },
  { duration: "4 Months", price: "₹4,500/-" },
  { duration: "6 Months", price: "₹8,000/-", popular: true },
  { duration: "12 Months", price: "₹15,000/-", best: true },
];

const TIMINGS = [
  { slot: "Morning", time: "7:00 AM – 8:30 AM" },
  { slot: "Evening Slot 1", time: "5:00 PM – 6:30 PM" },
  { slot: "Evening Slot 2", time: "6:30 PM – 8:00 PM" },
  { slot: "Evening Slot 3", time: "8:00 PM – 9:30 PM" },
];

const LOCATIONS = [
  {
    name: "Utran, Surat",
    address:
      "Odd Aditya Banglows, Near Kapodra bridge, VIP circle, Utran, Surat - 394105",
    phone: "+91 9879262661",
    email: "chintanpatel.1644@gmail.com",
    mapsUrl: "https://maps.app.goo.gl/rSvXAGBa6AfZ9jm46",
  },
  {
    name: "Parvat Patiya, Surat",
    address:
      "Near Mahavir mobile, behind D R India, Archana road, Parvat Patiya, Surat - 395010",
    phone: "+91 9879262661",
    email: "chintanpatel.1644@gmail.com",
    mapsUrl: "https://maps.app.goo.gl/v2BNAg9e4UfWKDiv9",
  },
];

function scrollTo(href: string) {
  document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
}

// Animated counter hook
function useCounter(target: number, inView: boolean) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const duration = 1800;
    const step = (target / duration) * 16;
    const timer = setInterval(() => {
      start += step;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [inView, target]);
  return count;
}

// Scroll progress indicator
function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 200, damping: 30 });
  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-[2px] z-[200] origin-left"
      style={{
        scaleX,
        background: "linear-gradient(90deg, #D4A017, #f0c84a, #D4A017)",
      }}
    />
  );
}

// Section header with animated gold line
function SectionHeader({
  eyebrow,
  title,
  subtitle,
  light = false,
}: {
  eyebrow: string;
  title: string;
  subtitle?: string;
  light?: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, ease: [0.2, 0, 0.2, 1] }}
      className="text-center mb-16"
    >
      <div className="flex items-center justify-center gap-3 mb-4">
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="h-px w-16 bg-gold origin-right"
        />
        <span className="text-gold font-semibold text-xs uppercase tracking-[0.2em]">
          {eyebrow}
        </span>
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="h-px w-16 bg-gold origin-left"
        />
      </div>
      <h2
        className={`font-display font-black text-4xl sm:text-5xl mb-4 leading-tight ${
          light ? "text-white" : "text-white"
        }`}
      >
        {title}
      </h2>
      {subtitle && (
        <p className="text-white/50 text-lg max-w-xl mx-auto leading-relaxed">
          {subtitle}
        </p>
      )}
    </motion.div>
  );
}

function Navbar({
  scrolled,
  onEnroll,
}: { scrolled: boolean; onEnroll: () => void }) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleNavClick = (href: string) => {
    setMobileOpen(false);
    scrollTo(href);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "glass border-b border-white/8 shadow-card"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          <motion.button
            type="button"
            className="flex items-center gap-3"
            onClick={() => handleNavClick("#home")}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <img
              src={logoImg}
              alt="Frontline Sports Academy Logo"
              className="h-10 w-10 object-contain rounded-lg"
            />
            <div className="hidden sm:block">
              <p className="text-white font-display font-black text-sm leading-tight tracking-wider">
                FRONTLINE
              </p>
              <p className="text-gold text-[10px] font-bold tracking-[0.25em] uppercase">
                SPORTS ACADEMY
              </p>
            </div>
          </motion.button>

          {/* Desktop Nav */}
          <nav
            className="hidden md:flex items-center gap-1"
            data-ocid="nav.panel"
          >
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(link.href);
                }}
                className="relative text-white/70 hover:text-white font-medium text-sm transition-colors px-4 py-2 group"
                data-ocid={`nav.${link.label.toLowerCase()}.link`}
              >
                {link.label}
                <span className="absolute bottom-1 left-4 right-4 h-px bg-gold scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
              </a>
            ))}
            <motion.button
              type="button"
              onClick={onEnroll}
              className="ml-4 shimmer-btn bg-gold text-obsidian font-bold px-6 py-2.5 rounded-full text-sm transition-all"
              whileHover={{
                scale: 1.05,
                boxShadow: "0 0 24px rgba(212,160,23,0.4)",
              }}
              whileTap={{ scale: 0.95 }}
              data-ocid="nav.join_now.button"
            >
              Join Now
            </motion.button>
          </nav>

          <button
            type="button"
            className="md:hidden text-white/80 hover:text-white p-2 transition-colors"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
            data-ocid="nav.menu.toggle"
          >
            <AnimatePresence mode="wait" initial={false}>
              {mobileOpen ? (
                <motion.div
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.15 }}
                >
                  <X size={24} />
                </motion.div>
              ) : (
                <motion.div
                  key="menu"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.15 }}
                >
                  <Menu size={24} />
                </motion.div>
              )}
            </AnimatePresence>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
            className="md:hidden glass border-t border-white/10 overflow-hidden"
          >
            <div className="px-4 py-5 flex flex-col gap-1">
              {NAV_LINKS.map((link, i) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(link.href);
                  }}
                  className="text-white/70 hover:text-gold font-medium py-3 px-2 transition-colors border-b border-white/5 last:border-0"
                  data-ocid={`nav.mobile.${link.label.toLowerCase()}.link`}
                >
                  {link.label}
                </motion.a>
              ))}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="mt-3"
              >
                <Button
                  onClick={() => {
                    setMobileOpen(false);
                    onEnroll();
                  }}
                  className="w-full shimmer-btn bg-gold hover:bg-gold-bright text-obsidian font-bold rounded-full"
                  data-ocid="nav.mobile.join_now.button"
                >
                  Join Now / Enroll
                </Button>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

function StatCounter({
  value,
  suffix,
  label,
  icon: Icon,
  delay,
}: {
  value: number;
  suffix: string;
  label: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  delay: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) setInView(true);
      },
      { threshold: 0.5 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  const count = useCounter(value, inView);
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay, duration: 0.6, type: "spring", stiffness: 100 }}
      className="glass rounded-2xl p-5 text-center hover:border-gold/30 transition-all duration-300 group"
    >
      <Icon
        size={22}
        className="text-gold mx-auto mb-3 group-hover:scale-110 transition-transform"
      />
      <p className="font-display font-black text-3xl text-white">
        {count}
        {suffix}
      </p>
      <p className="text-white/50 text-xs font-medium mt-1 uppercase tracking-wider">
        {label}
      </p>
    </motion.div>
  );
}

function HeroSection() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <section
      id="home"
      ref={ref}
      className="relative min-h-screen flex items-center justify-start overflow-hidden"
      style={{ background: "oklch(0.06 0.01 240)" }}
    >
      {/* Animated orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="animate-orb1 absolute rounded-full"
          style={{
            width: 700,
            height: 700,
            top: "-10%",
            right: "-15%",
            background:
              "radial-gradient(circle, rgba(212,160,23,0.08) 0%, rgba(212,160,23,0.02) 50%, transparent 70%)",
          }}
        />
        <div
          className="animate-orb2 absolute rounded-full"
          style={{
            width: 500,
            height: 500,
            bottom: "-5%",
            left: "-10%",
            background:
              "radial-gradient(circle, rgba(180,30,30,0.07) 0%, transparent 70%)",
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(rgba(255,255,255,0.03) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />
      </div>

      {/* Parallax background image */}
      <motion.div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('/assets/generated/cricket-hero-bg.dim_1920x900.jpg')",
          opacity: 0.18,
          y,
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(135deg, oklch(0.06 0.01 240) 30%, oklch(0.08 0.01 240) 60%, oklch(0.06 0.01 240)/50% 100%)",
        }}
      />

      <motion.div
        style={{ opacity }}
        className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-20 w-full"
      >
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, ease: [0.2, 0, 0.2, 1] }}
          className="max-w-3xl"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="flex items-center gap-3 mb-6"
          >
            <div className="h-px w-12 bg-gold" />
            <span className="text-gold font-bold text-xs uppercase tracking-[0.25em]">
              Frontline Sports Academy
            </span>
          </motion.div>

          <div className="overflow-hidden mb-2">
            <motion.h1
              initial={{ y: 80, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.9, ease: [0.2, 0, 0.2, 1] }}
              className="font-display font-black text-6xl sm:text-7xl lg:text-8xl text-white leading-none tracking-tight"
            >
              Premier
            </motion.h1>
          </div>
          <div className="overflow-hidden mb-4">
            <motion.h1
              initial={{ y: 80, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{
                delay: 0.45,
                duration: 0.9,
                ease: [0.2, 0, 0.2, 1],
              }}
              className="font-display font-black text-6xl sm:text-7xl lg:text-8xl leading-none tracking-tight text-gradient-gold"
            >
              Cricket
            </motion.h1>
          </div>
          <div className="overflow-hidden mb-8">
            <motion.h1
              initial={{ y: 80, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.9, ease: [0.2, 0, 0.2, 1] }}
              className="font-display font-black text-6xl sm:text-7xl lg:text-8xl text-white leading-none tracking-tight"
            >
              Excellence
            </motion.h1>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.7 }}
            className="text-white/55 text-lg sm:text-xl leading-relaxed mb-10 max-w-xl"
          >
            Developing tomorrow's cricket champions with world-class coaching,
            state-of-the-art facilities, and an unwavering passion for the game.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.0, duration: 0.6 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <motion.button
              type="button"
              onClick={() => scrollTo("#programs")}
              className="shimmer-btn bg-gold text-obsidian font-bold px-10 py-4 text-base rounded-full shadow-gold-glow flex items-center justify-center gap-2"
              whileHover={{
                scale: 1.05,
                boxShadow:
                  "0 0 40px rgba(212,160,23,0.5), 0 0 80px rgba(212,160,23,0.15)",
              }}
              whileTap={{ scale: 0.97 }}
              data-ocid="hero.explore_programs.button"
            >
              Explore Programs <ChevronRight size={18} />
            </motion.button>
            <motion.button
              type="button"
              onClick={() => scrollTo("#contact")}
              className="border border-white/30 text-white font-bold px-10 py-4 text-base rounded-full hover:border-white/60 hover:bg-white/5 transition-all relative overflow-hidden flex items-center justify-center"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              data-ocid="hero.contact_us.button"
            >
              Contact Us
            </motion.button>
          </motion.div>
        </motion.div>

        {/* Stats */}
        <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-4">
          {STATS.map((stat, i) => (
            <StatCounter key={stat.label} {...stat} delay={1.1 + i * 0.1} />
          ))}
        </div>
      </motion.div>

      {/* Scroll hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-white/30 text-xs tracking-widest uppercase">
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
          className="w-px h-8 bg-gradient-to-b from-gold/60 to-transparent"
        />
      </motion.div>
    </section>
  );
}

function AboutSection() {
  return (
    <section
      id="about"
      className="py-24"
      style={{ background: "oklch(0.08 0.008 240)" }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="About Us"
          title="Welcome to Frontline"
          subtitle="Established with a vision to nurture cricket talent — producing players who compete at the highest levels."
        />

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, type: "spring", stiffness: 80 }}
          >
            <h3 className="font-display font-bold text-2xl text-white mb-5">
              World-Class Coaching, Real Results
            </h3>
            <p className="text-white/55 mb-5 leading-relaxed">
              At Frontline Sports Academy, we believe every player has the
              potential to excel. Our expert coaches combine technical expertise
              with individual attention to unlock each player's true potential.
            </p>
            <p className="text-white/55 mb-8 leading-relaxed">
              From beginners to advanced players, our structured programs cover
              every aspect of cricket — from batting and bowling fundamentals to
              high-performance fitness conditioning.
            </p>
            <div className="grid grid-cols-2 gap-3">
              {[
                { label: "Professional Coaching", icon: "🏏" },
                { label: "Personalized Training", icon: "🎯" },
                { label: "Video Analysis", icon: "📹" },
                { label: "Match Preparation", icon: "🏆" },
              ].map((item) => (
                <motion.div
                  key={item.label}
                  whileHover={{ scale: 1.03 }}
                  className="glass rounded-xl p-3 flex items-center gap-3"
                >
                  <span className="text-xl">{item.icon}</span>
                  <span className="text-sm font-semibold text-white/80">
                    {item.label}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{
              duration: 0.7,
              delay: 0.2,
              type: "spring",
              stiffness: 80,
            }}
          >
            <div className="glass-gold rounded-3xl overflow-hidden shadow-card-premium">
              <div
                className="p-8 text-center"
                style={{
                  background:
                    "linear-gradient(135deg, rgba(212,160,23,0.12) 0%, rgba(212,160,23,0.04) 100%)",
                }}
              >
                <div className="w-20 h-20 rounded-full border-2 border-gold/50 flex items-center justify-center mx-auto mb-5 bg-gold/10">
                  <span className="text-4xl">👤</span>
                </div>
                <h3 className="font-display font-black text-2xl text-white">
                  Chintan Patel
                </h3>
                <p className="text-gold font-semibold mt-1 text-sm">
                  Founder & Head Coach
                </p>
              </div>
              <div className="p-6">
                <p className="text-white/55 text-center mb-5 leading-relaxed text-sm">
                  With years of experience in competitive cricket and coaching,
                  Chintan Patel leads Frontline Sports Academy with passion and
                  expertise.
                </p>
                <motion.a
                  href="tel:9879262662"
                  className="flex items-center justify-center gap-3 glass rounded-xl p-4 hover:border-gold/40 transition-all group"
                  whileHover={{ scale: 1.02 }}
                  data-ocid="about.phone.link"
                >
                  <Phone
                    className="text-gold group-hover:scale-110 transition-transform"
                    size={20}
                  />
                  <span className="font-display font-bold text-xl text-white group-hover:text-gold transition-colors">
                    9879262662
                  </span>
                </motion.a>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function ProgramsSection() {
  return (
    <section
      id="programs"
      className="py-24"
      style={{ background: "oklch(0.06 0.008 240)" }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="Training Programs"
          title="Our Coaching Programs"
          subtitle="Comprehensive cricket training programs designed for all skill levels."
        />

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {PROGRAMS.map((program, i) => {
            const Icon = program.icon;
            return (
              <motion.div
                key={program.title}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{
                  duration: 0.6,
                  delay: i * 0.08,
                  type: "spring",
                  stiffness: 80,
                }}
                whileHover={{ y: -8 }}
                className="glass rounded-2xl overflow-hidden shadow-card hover:shadow-card-hover hover:border-gold/25 transition-all duration-400 group cursor-pointer"
                data-ocid={`programs.item.${i + 1}`}
              >
                <div className="aspect-video overflow-hidden relative">
                  <img
                    src={program.image}
                    alt={program.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400" />
                  <div className="absolute inset-0 flex items-end p-5 opacity-0 group-hover:opacity-100 transition-opacity duration-400">
                    <p className="text-white/90 text-sm leading-relaxed">
                      {program.description}
                    </p>
                  </div>
                </div>
                <div className="p-5">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-9 h-9 rounded-lg bg-gold/15 flex items-center justify-center flex-shrink-0 group-hover:bg-gold/25 transition-colors">
                      <Icon className="text-gold" size={18} />
                    </div>
                    <h3 className="font-display font-bold text-white text-base">
                      {program.title}
                    </h3>
                  </div>
                  <p className="text-white/45 text-sm leading-relaxed">
                    {program.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function FeesSection({ onEnroll }: { onEnroll: () => void }) {
  return (
    <section
      id="fees"
      className="py-24"
      style={{ background: "oklch(0.05 0.008 240)" }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="Fees & Pricing"
          title="Batch Fees & Timing"
          subtitle="Transparent pricing for all our cricket programs."
        />

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Batch Fees */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, type: "spring", stiffness: 80 }}
            className="lg:col-span-1"
            data-ocid="fees.batch.card"
          >
            <div className="glass rounded-2xl overflow-hidden h-full">
              <div className="glass-gold px-6 py-4 flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-gold/20 flex items-center justify-center">
                  <IndianRupee className="text-gold" size={18} />
                </div>
                <h3 className="text-white font-display font-bold text-lg">
                  Batch Fees
                </h3>
              </div>
              <div className="p-4 space-y-2">
                {BATCH_FEES.map((fee, i) => (
                  <motion.div
                    key={fee.duration}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.08 }}
                    className={`flex items-center justify-between rounded-xl px-4 py-3.5 transition-all ${
                      fee.best
                        ? "animate-glow-pulse bg-gold/15 border border-gold/40"
                        : fee.popular
                          ? "bg-white/8 border border-white/15"
                          : "bg-white/4 border border-transparent hover:border-white/10"
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-white font-semibold text-sm">
                        {fee.duration}
                      </span>
                      {fee.best && (
                        <span className="text-[10px] font-bold bg-gold text-obsidian px-2 py-0.5 rounded-full uppercase tracking-wide">
                          Best Value
                        </span>
                      )}
                      {fee.popular && !fee.best && (
                        <span className="text-[10px] font-bold bg-white/20 text-white px-2 py-0.5 rounded-full uppercase tracking-wide">
                          Popular
                        </span>
                      )}
                    </div>
                    <span
                      className={`font-display font-black text-base ${fee.best ? "text-gold" : "text-white"}`}
                    >
                      {fee.price}
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{
              duration: 0.7,
              delay: 0.1,
              type: "spring",
              stiffness: 80,
            }}
            className="lg:col-span-2 flex flex-col gap-6"
          >
            {/* Timings */}
            <div
              className="glass rounded-2xl overflow-hidden"
              data-ocid="fees.timings.card"
            >
              <div className="glass-gold px-6 py-4 flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-gold/20 flex items-center justify-center">
                  <Clock className="text-gold" size={18} />
                </div>
                <h3 className="text-white font-display font-bold text-lg">
                  Training Timings
                </h3>
              </div>
              <div className="p-4 grid sm:grid-cols-2 gap-3">
                {TIMINGS.map((t, i) => (
                  <motion.div
                    key={t.slot}
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.07 }}
                    className="bg-white/4 border border-white/8 rounded-xl px-4 py-3 flex items-center gap-3 hover:border-gold/25 transition-colors"
                  >
                    <div className="w-2 h-2 rounded-full bg-gold flex-shrink-0" />
                    <div>
                      <p className="text-white/40 text-xs font-medium uppercase tracking-wide">
                        {t.slot}
                      </p>
                      <p className="text-white font-bold text-sm">{t.time}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Personal Coaching */}
            <div
              className="glass-gold rounded-2xl overflow-hidden"
              data-ocid="fees.personal.card"
            >
              <div className="px-6 py-4 flex items-center gap-3 border-b border-gold/15">
                <div className="w-9 h-9 rounded-lg bg-gold/30 flex items-center justify-center">
                  <Trophy className="text-gold" size={18} />
                </div>
                <div>
                  <h3 className="text-white font-display font-bold text-lg">
                    Personal Coaching
                  </h3>
                  <p className="text-gold/70 text-xs font-medium">
                    One-on-one dedicated training
                  </p>
                </div>
              </div>
              <div className="p-6">
                <div className="flex items-center gap-5 mb-6">
                  <div className="font-display font-black text-5xl text-gradient-gold">
                    ₹6,000/-
                  </div>
                  <div>
                    <p className="text-white font-semibold text-sm">
                      Per Month
                    </p>
                    <p className="text-white/40 text-xs">
                      Exclusive one-on-one coaching
                    </p>
                  </div>
                </div>
                <div className="grid sm:grid-cols-2 gap-3 mb-6">
                  <div className="bg-white/6 border border-white/10 rounded-xl px-4 py-3 flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-gold flex-shrink-0" />
                    <div>
                      <p className="text-white/40 text-xs font-medium uppercase tracking-wide">
                        Morning Session
                      </p>
                      <p className="text-white font-bold text-sm">
                        7:00 AM – 8:30 AM
                      </p>
                    </div>
                  </div>
                  <div className="bg-white/6 border border-white/10 rounded-xl px-4 py-3 flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-gold flex-shrink-0" />
                    <div>
                      <p className="text-white/40 text-xs font-medium uppercase tracking-wide">
                        Evening Session
                      </p>
                      <p className="text-white font-bold text-sm">
                        5:00 PM – 9:30 PM
                      </p>
                    </div>
                  </div>
                </div>
                <motion.button
                  type="button"
                  onClick={onEnroll}
                  className="shimmer-btn w-full bg-gold text-obsidian font-bold py-4 rounded-xl text-base"
                  whileHover={{
                    scale: 1.02,
                    boxShadow: "0 0 30px rgba(212,160,23,0.4)",
                  }}
                  whileTap={{ scale: 0.98 }}
                  data-ocid="fees.enroll.button"
                >
                  Enroll Now
                </motion.button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function LocationsSection() {
  return (
    <section
      id="locations"
      className="py-24"
      style={{ background: "oklch(0.08 0.008 240)" }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="Our Locations"
          title="Find Us in Surat"
          subtitle="Two state-of-the-art cricket training facilities in Surat, Gujarat."
        />

        <div className="grid md:grid-cols-2 gap-8">
          {LOCATIONS.map((loc, i) => (
            <motion.div
              key={loc.name}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.7,
                delay: i * 0.15,
                type: "spring",
                stiffness: 80,
              }}
              whileHover={{ y: -6 }}
              className="glass rounded-2xl overflow-hidden shadow-card hover:shadow-card-hover hover:border-gold/25 transition-all duration-400"
              data-ocid={`locations.item.${i + 1}`}
            >
              <div className="glass-gold px-6 py-5">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gold/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <MapPin className="text-gold" size={20} />
                  </div>
                  <div>
                    <h3 className="font-display font-bold text-white text-xl">
                      {loc.name}
                    </h3>
                    <p className="text-white/50 text-sm mt-1 leading-relaxed">
                      {loc.address}
                    </p>
                  </div>
                </div>
              </div>
              <div className="p-6 space-y-4">
                <div className="flex items-center gap-3">
                  <Phone className="text-gold flex-shrink-0" size={18} />
                  <div>
                    <p className="text-white/40 text-xs font-semibold uppercase tracking-wide mb-0.5">
                      Mobile
                    </p>
                    <a
                      href={`tel:${loc.phone.replace(/\s/g, "")}`}
                      className="text-white font-bold hover:text-gold transition-colors text-sm"
                      data-ocid={`locations.phone.${i + 1}`}
                    >
                      {loc.phone}
                    </a>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="text-gold flex-shrink-0" size={18} />
                  <div>
                    <p className="text-white/40 text-xs font-semibold uppercase tracking-wide mb-0.5">
                      Email
                    </p>
                    <a
                      href={`mailto:${loc.email}`}
                      className="text-white font-bold hover:text-gold transition-colors text-sm"
                      data-ocid={`locations.email.${i + 1}`}
                    >
                      {loc.email}
                    </a>
                  </div>
                </div>
                <motion.a
                  href={loc.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="shimmer-btn mt-2 flex items-center justify-center gap-2 w-full bg-gold text-obsidian font-bold py-3.5 px-5 rounded-xl"
                  whileHover={{
                    scale: 1.02,
                    boxShadow: "0 0 20px rgba(212,160,23,0.3)",
                  }}
                  whileTap={{ scale: 0.98 }}
                  data-ocid={`locations.maps.button.${i + 1}`}
                >
                  <MapPin size={16} />
                  Open in Google Maps
                </motion.a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ConnectSection() {
  return (
    <section
      id="contact"
      className="py-24"
      style={{ background: "oklch(0.06 0.008 240)" }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="Get In Touch"
          title="Connect With Us"
          subtitle="Message us directly through your favourite platform — we're just a tap away!"
        />

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, type: "spring", stiffness: 80 }}
            className="space-y-5"
          >
            <h3 className="font-display font-bold text-white text-2xl">
              Reach Us Directly
            </h3>
            <p className="text-white/50 leading-relaxed">
              Whether you want to inquire about programs, schedule a trial
              session, or just have a quick question — reach out and we'll get
              back to you promptly.
            </p>

            {[
              {
                icon: Phone,
                label: "Phone / WhatsApp",
                value: "+91 9879262662",
                href: "tel:9879262662",
                ocid: "contact.phone.link",
              },
              {
                icon: Mail,
                label: "Owner",
                value: "Chintan Patel",
                href: "mailto:chintanpatel.1644@gmail.com",
                ocid: "contact.owner.link",
              },
              {
                icon: MapPin,
                label: "Location",
                value: "Utran & Parvat Patiya, Surat, Gujarat",
                href: "#locations",
                ocid: "contact.location.link",
              },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <motion.a
                  key={item.label}
                  href={item.href}
                  className="flex items-center gap-4 glass rounded-xl p-4 hover:border-gold/30 transition-all group"
                  whileHover={{ x: 4 }}
                  data-ocid={item.ocid}
                >
                  <div className="w-10 h-10 rounded-lg bg-gold/15 flex items-center justify-center flex-shrink-0 group-hover:bg-gold/25 transition-colors">
                    <Icon className="text-gold" size={20} />
                  </div>
                  <div>
                    <p className="text-white/40 text-xs font-medium uppercase tracking-wide">
                      {item.label}
                    </p>
                    <p className="text-white font-bold">{item.value}</p>
                  </div>
                </motion.a>
              );
            })}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{
              duration: 0.7,
              delay: 0.15,
              type: "spring",
              stiffness: 80,
            }}
            className="space-y-4"
          >
            <h3 className="font-display font-bold text-white text-xl">
              Message Us Instantly
            </h3>

            {/* WhatsApp - with bounce pulse */}
            <motion.a
              href="https://wa.me/919879262662"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-5 rounded-2xl p-5 transition-all group relative overflow-hidden shimmer-btn"
              style={{ backgroundColor: "#25D366" }}
              animate={{ scale: [1, 1.012, 1] }}
              transition={{
                duration: 2.5,
                repeat: Number.POSITIVE_INFINITY,
                repeatDelay: 3,
              }}
              whileHover={{
                scale: 1.03,
                boxShadow: "0 8px 32px rgba(37,211,102,0.35)",
              }}
              whileTap={{ scale: 0.97 }}
              data-ocid="contact.whatsapp.button"
            >
              <div className="w-14 h-14 rounded-xl bg-white/20 flex items-center justify-center flex-shrink-0">
                <SiWhatsapp size={30} color="white" />
              </div>
              <div className="flex-1">
                <p className="text-white font-display font-black text-lg">
                  WhatsApp
                </p>
                <p className="text-white/80 text-sm">Message us on WhatsApp</p>
                <p className="text-white/55 text-xs mt-0.5">Tap to message →</p>
              </div>
              <ChevronRight
                className="text-white/60 group-hover:translate-x-1 transition-transform"
                size={22}
              />
            </motion.a>

            <motion.a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-5 rounded-2xl p-5 transition-all group shimmer-btn"
              style={{ backgroundColor: "#1877F2" }}
              whileHover={{
                scale: 1.03,
                boxShadow: "0 8px 32px rgba(24,119,242,0.35)",
              }}
              whileTap={{ scale: 0.97 }}
              data-ocid="contact.facebook.button"
            >
              <div className="w-14 h-14 rounded-xl bg-white/20 flex items-center justify-center flex-shrink-0">
                <SiFacebook size={30} color="white" />
              </div>
              <div className="flex-1">
                <p className="text-white font-display font-black text-lg">
                  Facebook
                </p>
                <p className="text-white/80 text-sm">Message us on Facebook</p>
                <p className="text-white/55 text-xs mt-0.5">Tap to message →</p>
              </div>
              <ChevronRight
                className="text-white/60 group-hover:translate-x-1 transition-transform"
                size={22}
              />
            </motion.a>

            <motion.a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-5 rounded-2xl p-5 transition-all group shimmer-btn"
              style={{
                background:
                  "linear-gradient(135deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%)",
              }}
              whileHover={{
                scale: 1.03,
                boxShadow: "0 8px 32px rgba(220,39,67,0.35)",
              }}
              whileTap={{ scale: 0.97 }}
              data-ocid="contact.instagram.button"
            >
              <div className="w-14 h-14 rounded-xl bg-white/20 flex items-center justify-center flex-shrink-0">
                <SiInstagram size={30} color="white" />
              </div>
              <div className="flex-1">
                <p className="text-white font-display font-black text-lg">
                  Instagram
                </p>
                <p className="text-white/80 text-sm">DM us on Instagram</p>
                <p className="text-white/55 text-xs mt-0.5">Tap to message →</p>
              </div>
              <ChevronRight
                className="text-white/60 group-hover:translate-x-1 transition-transform"
                size={22}
              />
            </motion.a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function BannerSection() {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 1 }}
      className="w-full relative overflow-hidden"
      data-ocid="banner.section"
    >
      <img
        src={bannerImg}
        alt="Frontline Sports Academy Banner"
        className="w-full object-cover"
        style={{ maxHeight: "240px" }}
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to bottom, oklch(0.06 0.008 240) 0%, transparent 20%, transparent 80%, oklch(0.06 0.008 240) 100%)",
        }}
      />
    </motion.section>
  );
}

function Footer() {
  const year = new Date().getFullYear();
  const hostname =
    typeof window !== "undefined"
      ? encodeURIComponent(window.location.hostname)
      : "";

  return (
    <footer
      style={{
        background: "oklch(0.05 0.008 240)",
        borderTop: "1px solid rgba(255,255,255,0.06)",
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-5">
              <img
                src={logoImg}
                alt="Frontline Sports Academy"
                className="h-12 w-12 object-contain rounded-lg"
              />
              <div>
                <p className="text-white font-display font-black text-sm tracking-wider">
                  FRONTLINE
                </p>
                <p className="text-gold text-[10px] font-bold tracking-[0.25em] uppercase">
                  SPORTS ACADEMY
                </p>
              </div>
            </div>
            <p className="text-white/35 text-sm leading-relaxed max-w-xs mb-6">
              Developing cricket champions with world-class coaching and a
              passion for the game.
            </p>
            <div className="flex gap-3">
              {[
                {
                  href: "https://wa.me/919879262662",
                  bg: "#25D366",
                  icon: SiWhatsapp,
                  ocid: "footer.whatsapp.link",
                },
                {
                  href: "https://facebook.com",
                  bg: "#1877F2",
                  icon: SiFacebook,
                  ocid: "footer.facebook.link",
                },
              ].map((s) => (
                <motion.a
                  key={s.ocid}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-lg flex items-center justify-center"
                  style={{ backgroundColor: s.bg }}
                  whileHover={{ scale: 1.15, y: -2 }}
                  whileTap={{ scale: 0.9 }}
                  data-ocid={s.ocid}
                >
                  <s.icon size={18} color="white" />
                </motion.a>
              ))}
              <motion.a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg flex items-center justify-center"
                style={{
                  background:
                    "linear-gradient(135deg, #f09433, #dc2743, #bc1888)",
                }}
                whileHover={{ scale: 1.15, y: -2 }}
                whileTap={{ scale: 0.9 }}
                data-ocid="footer.instagram.link"
              >
                <SiInstagram size={18} color="white" />
              </motion.a>
            </div>
          </div>

          <div>
            <h4 className="text-white font-display font-bold mb-5 text-sm uppercase tracking-wider">
              Quick Links
            </h4>
            <ul className="space-y-2.5">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={(e) => {
                      e.preventDefault();
                      scrollTo(link.href);
                    }}
                    className="text-white/35 hover:text-gold text-sm transition-colors"
                    data-ocid={`footer.${link.label.toLowerCase()}.link`}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-display font-bold mb-5 text-sm uppercase tracking-wider">
              Contact
            </h4>
            <div className="space-y-3">
              <p className="text-white/35 text-sm">Chintan Patel</p>
              <a
                href="tel:9879262662"
                className="text-white/35 hover:text-gold text-sm transition-colors flex items-center gap-2"
                data-ocid="footer.phone.link"
              >
                <Phone size={14} /> 9879262662
              </a>
              <p className="text-white/35 text-sm flex items-start gap-2">
                <MapPin size={14} className="mt-0.5 flex-shrink-0" />
                Utran & Parvat Patiya, Surat, Gujarat
              </p>
            </div>
          </div>
        </div>

        <div
          className="mt-12 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3"
          style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}
        >
          <p className="text-white/25 text-sm">
            © {year} Frontline Sports Academy. All rights reserved.
          </p>
          <a
            href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${hostname}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-white/20 hover:text-white/40 text-xs transition-colors"
          >
            Built with ❤️ With Om and Team
          </a>
        </div>
      </div>
    </footer>
  );
}

export default function App() {
  const [loading, setLoading] = useState(true);
  const [scrolled, setScrolled] = useState(false);
  const [enrollOpen, setEnrollOpen] = useState(false);
  const [hash, setHash] = useState(window.location.hash);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2400);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleHash = () => setHash(window.location.hash);
    window.addEventListener("hashchange", handleHash);
    return () => window.removeEventListener("hashchange", handleHash);
  }, []);

  if (hash === "#/admin") {
    return <AdminPage />;
  }

  return (
    <>
      <LoadingScreen visible={loading} />
      <ScrollProgress />
      <div className="min-h-screen">
        <Navbar scrolled={scrolled} onEnroll={() => setEnrollOpen(true)} />
        <main>
          <HeroSection />
          <FeesSection onEnroll={() => setEnrollOpen(true)} />
          <AboutSection />
          <ProgramsSection />
          <LocationsSection />
          <ConnectSection />
        </main>
        <BannerSection />
        <Footer />
        <EnrollModal open={enrollOpen} onClose={() => setEnrollOpen(false)} />
      </div>
    </>
  );
}
