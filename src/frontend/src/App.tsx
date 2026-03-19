import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
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
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
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
      "Sport-specific fitness programs covering strength, agility, endurance, and injury prevention for cricketers.",
    image: "/assets/generated/program-fitness.dim_600x400.jpg",
  },
  {
    icon: Star,
    title: "Match Experience",
    description:
      "Build confidence through net sessions, match simulations, and tournament opportunities that prepare you for real competitive cricket.",
    image: "/assets/generated/program-match.dim_600x400.jpg",
  },
];

const STATS = [
  { icon: Users, value: "500+", label: "Players Trained" },
  { icon: Trophy, value: "50+", label: "Tournaments Won" },
  { icon: Star, value: "10+", label: "Years of Excellence" },
  { icon: Award, value: "20+", label: "Expert Coaches" },
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

function Navbar({ scrolled }: { scrolled: boolean }) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleNavClick = (href: string) => {
    setMobileOpen(false);
    scrollTo(href);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-navy shadow-lg" : "bg-navy/95"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <button
            type="button"
            className="flex items-center gap-3"
            onClick={() => handleNavClick("#home")}
          >
            <img
              src="/assets/uploads/images-1-3-1.jpeg"
              alt="Frontline Sports Academy Logo"
              className="h-10 w-10 object-contain"
            />
            <div className="hidden sm:block">
              <p className="text-white font-bold text-sm leading-tight">
                FRONTLINE
              </p>
              <p className="text-gold text-xs font-semibold tracking-widest">
                SPORTS ACADEMY
              </p>
            </div>
          </button>

          {/* Desktop Nav */}
          <nav
            className="hidden md:flex items-center gap-8"
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
                className="text-white/80 hover:text-gold font-medium text-sm transition-colors"
                data-ocid={`nav.${link.label.toLowerCase()}.link`}
              >
                {link.label}
              </a>
            ))}
            <Button
              onClick={() => handleNavClick("#contact")}
              className="bg-gold hover:bg-gold-dark text-navy font-bold px-6 rounded-full text-sm"
              data-ocid="nav.join_now.button"
            >
              Join Now
            </Button>
          </nav>

          {/* Mobile menu toggle */}
          <button
            type="button"
            className="md:hidden text-white p-2"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
            data-ocid="nav.menu.toggle"
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
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
            className="md:hidden bg-navy-dark border-t border-white/10"
          >
            <div className="px-4 py-4 flex flex-col gap-3">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(link.href);
                  }}
                  className="text-white/80 hover:text-gold font-medium py-2 transition-colors"
                  data-ocid={`nav.mobile.${link.label.toLowerCase()}.link`}
                >
                  {link.label}
                </a>
              ))}
              <Button
                onClick={() => handleNavClick("#contact")}
                className="bg-gold hover:bg-gold-dark text-navy font-bold rounded-full mt-2"
                data-ocid="nav.mobile.join_now.button"
              >
                Join Now
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

function HeroSection() {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-start overflow-hidden"
      style={{
        background:
          "linear-gradient(135deg, #0B1E34 0%, #0d2440 40%, #0a2a50 70%, #071828 100%)",
      }}
    >
      <div
        className="absolute inset-0 bg-cover bg-center opacity-30"
        style={{
          backgroundImage:
            "url('/assets/generated/cricket-hero-bg.dim_1920x900.jpg')",
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-navy via-navy/80 to-transparent" />

      <div className="absolute top-20 right-10 w-64 h-64 rounded-full border border-gold/10 opacity-40" />
      <div className="absolute top-32 right-20 w-40 h-40 rounded-full border border-gold/15 opacity-30" />
      <div className="absolute bottom-20 right-40 w-80 h-80 rounded-full border border-white/5 opacity-20" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-2xl"
        >
          <div className="flex items-center gap-2 mb-4">
            <div className="h-0.5 w-12 bg-gold" />
            <span className="text-gold font-semibold text-sm uppercase tracking-widest">
              Frontline Sports Academy
            </span>
          </div>

          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black text-white leading-tight mb-6">
            Premier Cricket
            <span className="block text-gold">Excellence</span>
          </h1>

          <p className="text-white/75 text-lg sm:text-xl leading-relaxed mb-8 max-w-lg">
            Developing tomorrow's cricket champions with world-class coaching,
            state-of-the-art facilities, and a passion for the game.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <Button
              onClick={() => scrollTo("#programs")}
              className="bg-gold hover:bg-gold-dark text-navy font-bold px-8 py-6 text-base rounded-full shadow-lg hover:shadow-xl transition-all"
              data-ocid="hero.explore_programs.button"
            >
              Explore Programs <ChevronRight className="ml-1" size={18} />
            </Button>
            <Button
              variant="outline"
              onClick={() => scrollTo("#contact")}
              className="border-2 border-white text-white hover:bg-white hover:text-navy font-bold px-8 py-6 text-base rounded-full transition-all bg-transparent"
              data-ocid="hero.contact_us.button"
            >
              Contact Us
            </Button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4"
        >
          {STATS.map((stat) => {
            const Icon = stat.icon;
            return (
              <div
                key={stat.label}
                className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center border border-white/10"
              >
                <Icon className="text-gold mx-auto mb-2" size={22} />
                <p className="text-white font-black text-2xl">{stat.value}</p>
                <p className="text-white/60 text-xs font-medium mt-1">
                  {stat.label}
                </p>
              </div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}

function AboutSection() {
  return (
    <section id="about" className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <div className="flex items-center justify-center gap-2 mb-3">
            <div className="h-0.5 w-8 bg-gold" />
            <span className="text-gold font-semibold text-sm uppercase tracking-widest">
              About Us
            </span>
            <div className="h-0.5 w-8 bg-gold" />
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-navy mb-4">
            Welcome to Frontline Sports Academy
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Established with a vision to nurture cricket talent, Frontline
            Sports Academy has been a cornerstone of cricket development —
            producing players who compete at the highest levels.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-10 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="text-2xl font-bold text-navy mb-4">
              World-Class Coaching, Real Results
            </h3>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              At Frontline Sports Academy, we believe every player has the
              potential to excel. Our expert coaches combine technical expertise
              with individual attention to unlock each player's true potential.
            </p>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              From beginners to advanced players, our structured programs cover
              every aspect of cricket — from the basics of batting and bowling
              to high-performance fitness conditioning.
            </p>
            <div className="grid grid-cols-2 gap-4">
              {[
                { label: "Professional Coaching", icon: "🏏" },
                { label: "Personalized Training", icon: "🎯" },
                { label: "Video Analysis", icon: "📹" },
                { label: "Match Preparation", icon: "🏆" },
              ].map((item) => (
                <div key={item.label} className="flex items-center gap-2">
                  <span className="text-xl">{item.icon}</span>
                  <span className="text-sm font-semibold text-navy">
                    {item.label}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Card className="overflow-hidden shadow-card border-0">
              <div className="bg-navy p-8 text-center">
                <div className="w-20 h-20 rounded-full bg-gold/20 border-2 border-gold flex items-center justify-center mx-auto mb-4">
                  <span className="text-4xl">👤</span>
                </div>
                <h3 className="text-white font-black text-2xl">
                  Chintan Patel
                </h3>
                <p className="text-gold font-semibold mt-1">
                  Founder & Head Coach
                </p>
              </div>
              <CardContent className="p-6">
                <p className="text-muted-foreground text-center mb-4 leading-relaxed">
                  With years of experience in competitive cricket and coaching,
                  Chintan Patel leads Frontline Sports Academy with passion and
                  expertise.
                </p>
                <div className="flex items-center justify-center gap-3 bg-background rounded-lg p-3 border">
                  <Phone className="text-gold" size={20} />
                  <a
                    href="tel:9879262662"
                    className="text-navy font-bold text-lg hover:text-gold transition-colors"
                    data-ocid="about.phone.link"
                  >
                    9879262662
                  </a>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function ProgramsSection() {
  return (
    <section id="programs" className="py-20 bg-secondary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <div className="flex items-center justify-center gap-2 mb-3">
            <div className="h-0.5 w-8 bg-gold" />
            <span className="text-gold font-semibold text-sm uppercase tracking-widest">
              Training Programs
            </span>
            <div className="h-0.5 w-8 bg-gold" />
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-navy mb-4">
            Our Coaching Programs
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            Comprehensive cricket training programs designed for all skill
            levels.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {PROGRAMS.map((program, i) => {
            const Icon = program.icon;
            return (
              <motion.div
                key={program.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                data-ocid={`programs.item.${i + 1}`}
              >
                <Card className="overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-300 border-0 group cursor-pointer">
                  <div className="aspect-video overflow-hidden">
                    <img
                      src={program.image}
                      alt={program.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <CardContent className="p-5">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-9 h-9 rounded-lg bg-gold/15 flex items-center justify-center flex-shrink-0">
                        <Icon className="text-gold" size={18} />
                      </div>
                      <h3 className="font-bold text-navy text-base">
                        {program.title}
                      </h3>
                    </div>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {program.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function FeesSection() {
  return (
    <section id="fees" className="py-20 bg-navy">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <div className="flex items-center justify-center gap-2 mb-3">
            <div className="h-0.5 w-8 bg-gold" />
            <span className="text-gold font-semibold text-sm uppercase tracking-widest">
              Fees & Pricing
            </span>
            <div className="h-0.5 w-8 bg-gold" />
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-white mb-4">
            Batch Fees & Timing Structure
          </h2>
          <p className="text-white/60 text-lg max-w-xl mx-auto">
            Transparent pricing for all our cricket programs. Choose the plan
            that best fits your training goals.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Batch Fees */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-1"
            data-ocid="fees.batch.card"
          >
            <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden">
              <div className="bg-gold/10 border-b border-gold/20 px-6 py-4 flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-gold/20 flex items-center justify-center">
                  <IndianRupee className="text-gold" size={18} />
                </div>
                <h3 className="text-white font-bold text-lg">Batch Fees</h3>
              </div>
              <div className="p-4 space-y-2">
                {BATCH_FEES.map((fee) => (
                  <div
                    key={fee.duration}
                    className={`flex items-center justify-between rounded-xl px-4 py-3 transition-colors ${
                      fee.best
                        ? "bg-gold/20 border border-gold/40"
                        : fee.popular
                          ? "bg-white/10 border border-white/20"
                          : "bg-white/5 border border-transparent hover:border-white/10"
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-white font-semibold text-sm">
                        {fee.duration}
                      </span>
                      {fee.best && (
                        <span className="text-[10px] font-bold bg-gold text-navy px-2 py-0.5 rounded-full uppercase tracking-wide">
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
                      className={`font-black text-base ${
                        fee.best ? "text-gold" : "text-white"
                      }`}
                    >
                      {fee.price}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Timings + Personal Coaching stacked */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:col-span-2 flex flex-col gap-8"
          >
            {/* Training Timings */}
            <div
              className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden"
              data-ocid="fees.timings.card"
            >
              <div className="bg-gold/10 border-b border-gold/20 px-6 py-4 flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-gold/20 flex items-center justify-center">
                  <Clock className="text-gold" size={18} />
                </div>
                <h3 className="text-white font-bold text-lg">
                  Training Timings
                </h3>
              </div>
              <div className="p-4 grid sm:grid-cols-2 gap-3">
                {TIMINGS.map((t) => (
                  <div
                    key={t.slot}
                    className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 flex items-center gap-3"
                  >
                    <div className="w-2 h-2 rounded-full bg-gold flex-shrink-0" />
                    <div>
                      <p className="text-white/50 text-xs font-medium uppercase tracking-wide">
                        {t.slot}
                      </p>
                      <p className="text-white font-bold text-sm">{t.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Personal Coaching */}
            <div
              className="bg-gradient-to-br from-gold/15 to-gold/5 border border-gold/30 rounded-2xl overflow-hidden"
              data-ocid="fees.personal.card"
            >
              <div className="bg-gold/10 border-b border-gold/20 px-6 py-4 flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-gold/30 flex items-center justify-center">
                  <Trophy className="text-gold" size={18} />
                </div>
                <div>
                  <h3 className="text-white font-bold text-lg">
                    Personal Coaching
                  </h3>
                  <p className="text-gold/80 text-xs font-medium">
                    One-on-one dedicated training
                  </p>
                </div>
              </div>
              <div className="p-6">
                <div className="flex items-center gap-4 mb-5">
                  <div className="text-4xl font-black text-gold">₹6,000/-</div>
                  <div>
                    <p className="text-white font-semibold text-sm">
                      Per Month
                    </p>
                    <p className="text-white/50 text-xs">
                      Exclusive one-on-one coaching
                    </p>
                  </div>
                </div>
                <div className="grid sm:grid-cols-2 gap-3">
                  <div className="bg-white/10 rounded-xl px-4 py-3 flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-gold flex-shrink-0" />
                    <div>
                      <p className="text-white/50 text-xs font-medium uppercase tracking-wide">
                        Morning Session
                      </p>
                      <p className="text-white font-bold text-sm">
                        8:00 AM – 9:30 AM
                      </p>
                    </div>
                  </div>
                  <div className="bg-white/10 rounded-xl px-4 py-3 flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-gold flex-shrink-0" />
                    <div>
                      <p className="text-white/50 text-xs font-medium uppercase tracking-wide">
                        Evening Session
                      </p>
                      <p className="text-white font-bold text-sm">
                        4:00 PM – 5:00 PM
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-10 text-center"
        >
          <p className="text-white/50 text-sm mb-4">
            Ready to start your cricket journey? Contact us to enroll today!
          </p>
          <Button
            onClick={() => scrollTo("#contact")}
            className="bg-gold hover:bg-gold-dark text-navy font-bold px-8 py-5 rounded-full text-base shadow-lg"
            data-ocid="fees.enroll.button"
          >
            Enroll Now <ChevronRight className="ml-1" size={18} />
          </Button>
        </motion.div>
      </div>
    </section>
  );
}

function LocationsSection() {
  return (
    <section id="locations" className="py-20 bg-secondary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <div className="flex items-center justify-center gap-2 mb-3">
            <div className="h-0.5 w-8 bg-gold" />
            <span className="text-gold font-semibold text-sm uppercase tracking-widest">
              Our Locations
            </span>
            <div className="h-0.5 w-8 bg-gold" />
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-navy mb-4">
            Find Us in Surat
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            Two convenient training venues in Surat, Gujarat — choose the one
            nearest to you.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {LOCATIONS.map((loc, i) => (
            <motion.div
              key={loc.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              data-ocid={`locations.item.${i + 1}`}
            >
              <Card className="overflow-hidden shadow-card border-0 h-full">
                {/* Card Header */}
                <div className="bg-navy px-6 py-5 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-gold/20 flex items-center justify-center flex-shrink-0">
                    <MapPin className="text-gold" size={20} />
                  </div>
                  <h3 className="text-white font-black text-xl">{loc.name}</h3>
                </div>

                <CardContent className="p-6 space-y-4">
                  {/* Address */}
                  <div className="flex items-start gap-3">
                    <MapPin
                      className="text-gold mt-0.5 flex-shrink-0"
                      size={18}
                    />
                    <div>
                      <p className="text-muted-foreground text-xs font-semibold uppercase tracking-wide mb-1">
                        Address
                      </p>
                      <p className="text-navy font-medium text-sm leading-relaxed">
                        {loc.address}
                      </p>
                    </div>
                  </div>

                  {/* Phone */}
                  <div className="flex items-center gap-3">
                    <Phone className="text-gold flex-shrink-0" size={18} />
                    <div>
                      <p className="text-muted-foreground text-xs font-semibold uppercase tracking-wide mb-0.5">
                        Mobile
                      </p>
                      <a
                        href={`tel:${loc.phone.replace(/\s/g, "")}`}
                        className="text-navy font-bold hover:text-gold transition-colors text-sm"
                        data-ocid={`locations.phone.${i + 1}`}
                      >
                        {loc.phone}
                      </a>
                    </div>
                  </div>

                  {/* Email */}
                  <div className="flex items-center gap-3">
                    <Mail className="text-gold flex-shrink-0" size={18} />
                    <div>
                      <p className="text-muted-foreground text-xs font-semibold uppercase tracking-wide mb-0.5">
                        Email
                      </p>
                      <a
                        href={`mailto:${loc.email}`}
                        className="text-navy font-bold hover:text-gold transition-colors text-sm"
                        data-ocid={`locations.email.${i + 1}`}
                      >
                        {loc.email}
                      </a>
                    </div>
                  </div>

                  {/* Maps Button */}
                  <a
                    href={loc.mapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-2 flex items-center justify-center gap-2 w-full bg-gold hover:bg-gold-dark text-navy font-bold py-3 px-5 rounded-xl transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] shadow-sm"
                    data-ocid={`locations.maps.button.${i + 1}`}
                  >
                    <MapPin size={16} />
                    Open in Google Maps
                  </a>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ConnectSection() {
  return (
    <section id="contact" className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <div className="flex items-center justify-center gap-2 mb-3">
            <div className="h-0.5 w-8 bg-gold" />
            <span className="text-gold font-semibold text-sm uppercase tracking-widest">
              Get In Touch
            </span>
            <div className="h-0.5 w-8 bg-gold" />
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-navy mb-4">
            Connect With Us
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            Message us directly through your favourite platform — we're just a
            tap away!
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-10 items-start">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <h3 className="text-navy text-2xl font-bold">Reach Us Directly</h3>
            <p className="text-muted-foreground leading-relaxed">
              Whether you want to inquire about programs, schedule a trial
              session, or just have a quick question — reach out and we'll get
              back to you promptly.
            </p>

            <div className="space-y-4">
              <div className="flex items-center gap-4 bg-secondary rounded-xl p-4 border border-border">
                <div className="w-10 h-10 rounded-lg bg-gold/20 flex items-center justify-center flex-shrink-0">
                  <Phone className="text-gold" size={20} />
                </div>
                <div>
                  <p className="text-muted-foreground text-xs font-medium uppercase tracking-wide">
                    Phone / WhatsApp
                  </p>
                  <a
                    href="tel:9879262662"
                    className="text-navy font-bold text-lg hover:text-gold transition-colors"
                    data-ocid="contact.phone.link"
                  >
                    +91 9879262662
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-4 bg-secondary rounded-xl p-4 border border-border">
                <div className="w-10 h-10 rounded-lg bg-gold/20 flex items-center justify-center flex-shrink-0">
                  <Mail className="text-gold" size={20} />
                </div>
                <div>
                  <p className="text-muted-foreground text-xs font-medium uppercase tracking-wide">
                    Owner
                  </p>
                  <p className="text-navy font-bold text-lg">Chintan Patel</p>
                </div>
              </div>

              <div className="flex items-center gap-4 bg-secondary rounded-xl p-4 border border-border">
                <div className="w-10 h-10 rounded-lg bg-gold/20 flex items-center justify-center flex-shrink-0">
                  <MapPin className="text-gold" size={20} />
                </div>
                <div>
                  <p className="text-muted-foreground text-xs font-medium uppercase tracking-wide">
                    Location
                  </p>
                  <p className="text-navy font-bold">
                    Frontline Sports Academy
                  </p>
                  <p className="text-muted-foreground text-sm">
                    Utran &amp; Parvat Patiya, Surat, Gujarat, India
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-4"
          >
            <h3 className="text-navy text-xl font-bold mb-2">
              Message Us Instantly
            </h3>

            <a
              href="https://wa.me/919879262662"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-5 rounded-2xl p-5 transition-all duration-300 hover:scale-[1.02] hover:shadow-xl active:scale-[0.98] group"
              style={{ backgroundColor: "#25D366" }}
              data-ocid="contact.whatsapp.button"
            >
              <div className="w-14 h-14 rounded-xl bg-white/20 flex items-center justify-center flex-shrink-0">
                <SiWhatsapp size={30} color="white" />
              </div>
              <div className="flex-1">
                <p className="text-white font-black text-lg">WhatsApp</p>
                <p className="text-white/80 text-sm">Message us on WhatsApp</p>
                <p className="text-white/60 text-xs mt-0.5">Tap to message →</p>
              </div>
              <ChevronRight
                className="text-white/60 group-hover:translate-x-1 transition-transform"
                size={22}
              />
            </a>

            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-5 rounded-2xl p-5 transition-all duration-300 hover:scale-[1.02] hover:shadow-xl active:scale-[0.98] group"
              style={{ backgroundColor: "#1877F2" }}
              data-ocid="contact.facebook.button"
            >
              <div className="w-14 h-14 rounded-xl bg-white/20 flex items-center justify-center flex-shrink-0">
                <SiFacebook size={30} color="white" />
              </div>
              <div className="flex-1">
                <p className="text-white font-black text-lg">Facebook</p>
                <p className="text-white/80 text-sm">Message us on Facebook</p>
                <p className="text-white/60 text-xs mt-0.5">Tap to message →</p>
              </div>
              <ChevronRight
                className="text-white/60 group-hover:translate-x-1 transition-transform"
                size={22}
              />
            </a>

            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-5 rounded-2xl p-5 transition-all duration-300 hover:scale-[1.02] hover:shadow-xl active:scale-[0.98] group"
              style={{
                background:
                  "linear-gradient(135deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%)",
              }}
              data-ocid="contact.instagram.button"
            >
              <div className="w-14 h-14 rounded-xl bg-white/20 flex items-center justify-center flex-shrink-0">
                <SiInstagram size={30} color="white" />
              </div>
              <div className="flex-1">
                <p className="text-white font-black text-lg">Instagram</p>
                <p className="text-white/80 text-sm">DM us on Instagram</p>
                <p className="text-white/60 text-xs mt-0.5">Tap to message →</p>
              </div>
              <ChevronRight
                className="text-white/60 group-hover:translate-x-1 transition-transform"
                size={22}
              />
            </a>
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
      transition={{ duration: 0.8 }}
      className="w-full"
      data-ocid="banner.section"
    >
      <img
        src="/assets/uploads/images-1--1.jpeg"
        alt="Frontline Sports Academy Banner"
        className="w-full object-cover shadow-2xl"
        style={{ maxHeight: "240px" }}
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
    <footer className="bg-navy-dark border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <img
                src="/assets/uploads/images-1-3-1.jpeg"
                alt="Frontline Sports Academy"
                className="h-12 w-12 object-contain"
              />
              <div>
                <p className="text-white font-black text-base">FRONTLINE</p>
                <p className="text-gold text-xs font-semibold tracking-widest">
                  SPORTS ACADEMY
                </p>
              </div>
            </div>
            <p className="text-white/50 text-sm leading-relaxed max-w-xs">
              Developing cricket champions with world-class coaching and a
              passion for the game.
            </p>
            <div className="flex gap-3 mt-5">
              <a
                href="https://wa.me/919879262662"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg flex items-center justify-center transition-opacity hover:opacity-80"
                style={{ backgroundColor: "#25D366" }}
                data-ocid="footer.whatsapp.link"
              >
                <SiWhatsapp size={18} color="white" />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg flex items-center justify-center transition-opacity hover:opacity-80"
                style={{ backgroundColor: "#1877F2" }}
                data-ocid="footer.facebook.link"
              >
                <SiFacebook size={18} color="white" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg flex items-center justify-center transition-opacity hover:opacity-80"
                style={{
                  background:
                    "linear-gradient(135deg, #f09433, #dc2743, #bc1888)",
                }}
                data-ocid="footer.instagram.link"
              >
                <SiInstagram size={18} color="white" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-white font-bold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={(e) => {
                      e.preventDefault();
                      scrollTo(link.href);
                    }}
                    className="text-white/50 hover:text-gold text-sm transition-colors"
                    data-ocid={`footer.${link.label.toLowerCase()}.link`}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-4">Contact</h4>
            <div className="space-y-2">
              <p className="text-white/50 text-sm">Chintan Patel</p>
              <a
                href="tel:9879262662"
                className="text-white/50 hover:text-gold text-sm transition-colors flex items-center gap-2"
                data-ocid="footer.phone.link"
              >
                <Phone size={14} /> 9879262662
              </a>
              <p className="text-white/50 text-sm flex items-start gap-2">
                <MapPin size={14} className="mt-0.5 flex-shrink-0" />
                Utran &amp; Parvat Patiya, Surat, Gujarat
              </p>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-white/40 text-sm">
            © {year} Frontline Sports Academy. All rights reserved.
          </p>
          <a
            href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${hostname}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-white/30 hover:text-white/50 text-xs transition-colors"
          >
            Built with ❤️ using caffeine.ai
          </a>
        </div>
      </div>
    </footer>
  );
}

export default function App() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen">
      <Navbar scrolled={scrolled} />
      <main>
        <HeroSection />
        <FeesSection />
        <AboutSection />
        <ProgramsSection />
        <LocationsSection />
        <ConnectSection />
      </main>
      <BannerSection />
      <Footer />
    </div>
  );
}
