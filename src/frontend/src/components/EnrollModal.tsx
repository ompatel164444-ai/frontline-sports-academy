import upiQr from "@/assets/upi-qr.jpg";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Textarea } from "@/components/ui/textarea";
import { useActor } from "@/hooks/useActor";
import { CheckCircle, Loader2, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { SiWhatsapp } from "react-icons/si";

const TERMS = [
  "Fees once paid are non-refundable and non-transferable.",
  "All registration details provided must be accurate and complete.",
  "Players must be medically fit; any existing health condition/injury must be disclosed before joining.",
  "The academy is not responsible for any loss, injury, or accident during training/matches; participation is at the player's own risk.",
  "Regular attendance and punctuality are required; missed sessions may not be compensated.",
  "Maintaining discipline, respectful behavior, and following coach instructions is mandatory; misconduct can lead to suspension.",
  "Players must bring their own basic kit (as advised) and take care of personal belongings.",
  "Training schedule, batch timings, and coach assignments may change based on operational requirements.",
  "Photos/videos may be taken during sessions for academy promotion; if you do not consent, please inform us in writing.",
  "Parents/guardians (for minors) are responsible for timely pickup/drop and consent to the player's participation.",
];

function planToMonths(plan: string): number {
  if (plan.startsWith("1 Month")) return 1;
  if (plan.startsWith("2 Month")) return 2;
  if (plan.startsWith("3 Month")) return 3;
  if (plan.startsWith("4 Month")) return 4;
  if (plan.startsWith("6 Month")) return 6;
  if (plan.startsWith("12 Month")) return 12;
  return 1;
}

function calcExpiry(joiningDate: string, plan: string): string {
  if (!joiningDate || !plan) return "";
  const months = planToMonths(plan);
  const d = new Date(joiningDate);
  d.setMonth(d.getMonth() + months);
  return d.toISOString().slice(0, 10);
}

function formatDate(dateStr: string): string {
  if (!dateStr) return "";
  const d = new Date(dateStr);
  return d.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

interface Props {
  open: boolean;
  onClose: () => void;
}

export default function EnrollModal({ open, onClose }: Props) {
  const { actor } = useActor();
  const [form, setForm] = useState({
    name: "",
    phone: "",
    age: "",
    email: "",
    address: "",
    batch: "",
    location: "",
    playstyle: "",
    plan: "",
    medical: "",
    paymentMode: "",
    joiningDate: "",
  });
  const [agreed, setAgreed] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const update = (field: string, value: string) =>
    setForm((prev) => ({ ...prev, [field]: value }));
  const expiryDate = calcExpiry(form.joiningDate, form.plan);

  const validate = () => {
    if (!form.name.trim()) return "Student Full Name is required.";
    if (!form.phone.trim()) return "Phone Number is required.";
    if (!form.age || Number(form.age) < 1) return "Valid Age is required.";
    if (!form.email.trim()) return "Email Address is required.";
    if (!form.address.trim()) return "Address is required.";
    if (!form.batch) return "Batch Selection is required.";
    if (!form.location) return "Location is required.";
    if (!form.playstyle) return "Playstyle is required.";
    if (!form.plan) return "Plan Duration is required.";
    if (!form.medical) return "Please answer the medical question.";
    if (!form.paymentMode) return "Please select a payment method.";
    if (!form.joiningDate) return "Please select a Date of Joining.";
    if (!agreed) return "Please accept the Terms & Conditions.";
    return null;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const err = validate();
    if (err) {
      setError(err);
      return;
    }
    if (!actor) {
      setError("Not connected. Please try again.");
      return;
    }
    setError("");
    setSubmitting(true);
    try {
      await actor.submitEnrollment(
        form.name,
        form.phone,
        BigInt(form.age),
        form.email,
        form.address,
        form.batch,
        form.location,
        form.playstyle,
        form.plan,
        form.medical === "yes",
        form.joiningDate,
        expiryDate,
      );
      setSuccess(true);
    } catch (_e) {
      setError("Submission failed. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleClose = () => {
    setSuccess(false);
    setError("");
    setForm({
      name: "",
      phone: "",
      age: "",
      email: "",
      address: "",
      batch: "",
      location: "",
      playstyle: "",
      plan: "",
      medical: "",
      paymentMode: "",
      joiningDate: "",
    });
    setAgreed(false);
    onClose();
  };

  const inputClass =
    "bg-white/5 border-white/15 text-white placeholder:text-white/30 focus:border-gold/60 focus:ring-0 rounded-xl transition-colors";
  const labelClass =
    "text-white/60 text-xs font-semibold uppercase tracking-wider mb-1.5 block";
  const selectClass = `w-full px-4 py-2.5 rounded-xl text-white text-sm font-medium border transition-colors outline-none focus:border-gold/60 ${inputClass}`;

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          key="enroll-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[60] flex items-center justify-center p-4"
          style={{
            background: "rgba(0,0,0,0.85)",
            backdropFilter: "blur(8px)",
          }}
          onClick={(e) => {
            if (e.target === e.currentTarget) handleClose();
          }}
          data-ocid="enroll.modal"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 30 }}
            transition={{
              duration: 0.4,
              type: "spring",
              stiffness: 120,
              damping: 20,
            }}
            className="w-full max-w-2xl max-h-[90vh] flex flex-col rounded-3xl overflow-hidden shadow-card-premium"
            style={{
              background: "oklch(0.09 0.01 240)",
              border: "1px solid rgba(255,255,255,0.08)",
            }}
          >
            {/* Header */}
            <div
              className="flex items-center justify-between px-7 py-5 flex-shrink-0"
              style={{
                borderBottom: "1px solid rgba(255,255,255,0.07)",
                background: "rgba(212,160,23,0.06)",
              }}
            >
              <div>
                <h2 className="font-display font-black text-xl text-white">
                  Enroll Now
                </h2>
                <p className="text-white/40 text-xs mt-0.5">
                  Frontline Sports Academy
                </p>
              </div>
              <motion.button
                type="button"
                onClick={handleClose}
                className="w-9 h-9 rounded-full bg-white/8 hover:bg-white/15 flex items-center justify-center text-white/60 hover:text-white transition-all"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                data-ocid="enroll.close_button"
              >
                <X size={18} />
              </motion.button>
            </div>

            {/* Body */}
            <ScrollArea className="flex-1 min-h-0">
              <div className="px-7 py-6">
                <AnimatePresence mode="wait">
                  {success ? (
                    <motion.div
                      key="success"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.5, type: "spring" }}
                      className="text-center py-12"
                      data-ocid="enroll.success_state"
                    >
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{
                          delay: 0.2,
                          type: "spring",
                          stiffness: 200,
                        }}
                        className="w-20 h-20 rounded-full bg-green-500/15 border border-green-500/30 flex items-center justify-center mx-auto mb-6"
                      >
                        <CheckCircle className="text-green-400" size={36} />
                      </motion.div>
                      <h3 className="font-display font-black text-2xl text-white mb-3">
                        Enrollment Submitted!
                      </h3>
                      <p className="text-white/50 mb-6 leading-relaxed">
                        Thank you! Your enrollment request has been received.
                        Our team will contact you shortly to confirm your batch
                        details.
                      </p>
                      <a
                        href="https://wa.me/919879262662"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-3 bg-[#25D366] text-white font-bold px-7 py-3.5 rounded-full hover:opacity-90 transition-opacity mb-4"
                        data-ocid="enroll.whatsapp.button"
                      >
                        <SiWhatsapp size={20} />
                        Message on WhatsApp
                      </a>
                      <br />
                      <button
                        type="button"
                        onClick={handleClose}
                        className="text-white/40 hover:text-white/70 text-sm mt-4 transition-colors"
                        data-ocid="enroll.close_button"
                      >
                        Close
                      </button>
                    </motion.div>
                  ) : (
                    <motion.form
                      key="form"
                      onSubmit={handleSubmit}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="space-y-6"
                      data-ocid="enroll.form"
                    >
                      {/* Student Details */}
                      <div>
                        <h3 className="font-display font-bold text-white/90 text-sm uppercase tracking-widest mb-4 flex items-center gap-2">
                          <span className="w-5 h-5 rounded-full bg-gold/20 border border-gold/40 flex items-center justify-center text-gold text-xs font-black">
                            1
                          </span>
                          Student Details
                        </h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="enroll-name" className={labelClass}>
                              Full Name *
                            </Label>
                            <Input
                              id="enroll-name"
                              value={form.name}
                              onChange={(e) => update("name", e.target.value)}
                              placeholder="Ravi Sharma"
                              className={inputClass}
                              data-ocid="enroll.input"
                            />
                          </div>
                          <div>
                            <Label
                              htmlFor="enroll-phone"
                              className={labelClass}
                            >
                              Phone Number *
                            </Label>
                            <Input
                              id="enroll-phone"
                              type="tel"
                              value={form.phone}
                              onChange={(e) => update("phone", e.target.value)}
                              placeholder="9876543210"
                              className={inputClass}
                              data-ocid="enroll.input"
                            />
                          </div>
                          <div>
                            <Label htmlFor="enroll-age" className={labelClass}>
                              Age *
                            </Label>
                            <Input
                              id="enroll-age"
                              type="number"
                              min="5"
                              max="50"
                              value={form.age}
                              onChange={(e) => update("age", e.target.value)}
                              placeholder="18"
                              className={inputClass}
                              data-ocid="enroll.input"
                            />
                          </div>
                          <div>
                            <Label
                              htmlFor="enroll-email"
                              className={labelClass}
                            >
                              Email Address *
                            </Label>
                            <Input
                              id="enroll-email"
                              type="email"
                              value={form.email}
                              onChange={(e) => update("email", e.target.value)}
                              placeholder="you@email.com"
                              className={inputClass}
                              data-ocid="enroll.input"
                            />
                          </div>
                          <div className="sm:col-span-2">
                            <Label
                              htmlFor="enroll-address"
                              className={labelClass}
                            >
                              Address *
                            </Label>
                            <Textarea
                              id="enroll-address"
                              value={form.address}
                              onChange={(e) =>
                                update("address", e.target.value)
                              }
                              placeholder="Your full address"
                              rows={2}
                              className={inputClass}
                              data-ocid="enroll.textarea"
                            />
                          </div>
                        </div>
                      </div>

                      {/* Batch Selection */}
                      <div>
                        <h3 className="font-display font-bold text-white/90 text-sm uppercase tracking-widest mb-4 flex items-center gap-2">
                          <span className="w-5 h-5 rounded-full bg-gold/20 border border-gold/40 flex items-center justify-center text-gold text-xs font-black">
                            2
                          </span>
                          Batch & Location
                        </h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div>
                            <Label
                              htmlFor="enroll-batch"
                              className={labelClass}
                            >
                              Batch *
                            </Label>
                            <select
                              id="enroll-batch"
                              value={form.batch}
                              onChange={(e) => update("batch", e.target.value)}
                              className={selectClass}
                              style={{
                                backgroundColor: "rgba(255,255,255,0.05)",
                                borderColor: "rgba(255,255,255,0.15)",
                              }}
                              data-ocid="enroll.select"
                            >
                              <option
                                value=""
                                style={{ background: "#0d0d1a" }}
                              >
                                Select Batch
                              </option>
                              <option
                                value="Morning (7:00-8:30 AM)"
                                style={{ background: "#0d0d1a" }}
                              >
                                Morning (7:00–8:30 AM)
                              </option>
                              <option
                                value="Evening Slot 1 (5:00-6:30 PM)"
                                style={{ background: "#0d0d1a" }}
                              >
                                Evening Slot 1 (5:00–6:30 PM)
                              </option>
                              <option
                                value="Evening Slot 2 (6:30-8:00 PM)"
                                style={{ background: "#0d0d1a" }}
                              >
                                Evening Slot 2 (6:30–8:00 PM)
                              </option>
                              <option
                                value="Evening Slot 3 (8:00-9:30 PM)"
                                style={{ background: "#0d0d1a" }}
                              >
                                Evening Slot 3 (8:00–9:30 PM)
                              </option>
                            </select>
                          </div>
                          <div>
                            <Label
                              htmlFor="enroll-location"
                              className={labelClass}
                            >
                              Location *
                            </Label>
                            <select
                              id="enroll-location"
                              value={form.location}
                              onChange={(e) =>
                                update("location", e.target.value)
                              }
                              className={selectClass}
                              style={{
                                backgroundColor: "rgba(255,255,255,0.05)",
                                borderColor: "rgba(255,255,255,0.15)",
                              }}
                              data-ocid="enroll.select"
                            >
                              <option
                                value=""
                                style={{ background: "#0d0d1a" }}
                              >
                                Select Location
                              </option>
                              <option
                                value="Utran, Surat"
                                style={{ background: "#0d0d1a" }}
                              >
                                Utran, Surat
                              </option>
                              <option
                                value="Parvat Patiya, Surat"
                                style={{ background: "#0d0d1a" }}
                              >
                                Parvat Patiya, Surat
                              </option>
                            </select>
                          </div>
                          <div>
                            <Label
                              htmlFor="enroll-playstyle"
                              className={labelClass}
                            >
                              Playstyle *
                            </Label>
                            <select
                              id="enroll-playstyle"
                              value={form.playstyle}
                              onChange={(e) =>
                                update("playstyle", e.target.value)
                              }
                              className={selectClass}
                              style={{
                                backgroundColor: "rgba(255,255,255,0.05)",
                                borderColor: "rgba(255,255,255,0.15)",
                              }}
                              data-ocid="enroll.select"
                            >
                              <option
                                value=""
                                style={{ background: "#0d0d1a" }}
                              >
                                Select Playstyle
                              </option>
                              <option
                                value="Batsman"
                                style={{ background: "#0d0d1a" }}
                              >
                                Batsman
                              </option>
                              <option
                                value="Bowler"
                                style={{ background: "#0d0d1a" }}
                              >
                                Bowler
                              </option>
                              <option
                                value="All-Rounder"
                                style={{ background: "#0d0d1a" }}
                              >
                                All-Rounder
                              </option>
                              <option
                                value="Wicket-Keeper"
                                style={{ background: "#0d0d1a" }}
                              >
                                Wicket-Keeper
                              </option>
                            </select>
                          </div>
                          <div>
                            <Label htmlFor="enroll-plan" className={labelClass}>
                              Plan Duration *
                            </Label>
                            <select
                              id="enroll-plan"
                              value={form.plan}
                              onChange={(e) => update("plan", e.target.value)}
                              className={selectClass}
                              style={{
                                backgroundColor: "rgba(255,255,255,0.05)",
                                borderColor: "rgba(255,255,255,0.15)",
                              }}
                              data-ocid="enroll.select"
                            >
                              <option
                                value=""
                                style={{ background: "#0d0d1a" }}
                              >
                                Select Plan
                              </option>
                              <option
                                value="1 Month - ₹2,000"
                                style={{ background: "#0d0d1a" }}
                              >
                                1 Month – ₹2,000
                              </option>
                              <option
                                value="2 Months - ₹3,500"
                                style={{ background: "#0d0d1a" }}
                              >
                                2 Months – ₹3,500
                              </option>
                              <option
                                value="4 Months - ₹4,500"
                                style={{ background: "#0d0d1a" }}
                              >
                                4 Months – ₹4,500
                              </option>
                              <option
                                value="6 Months - ₹8,000"
                                style={{ background: "#0d0d1a" }}
                              >
                                6 Months – ₹8,000 (Popular)
                              </option>
                              <option
                                value="12 Months - ₹15,000"
                                style={{ background: "#0d0d1a" }}
                              >
                                12 Months – ₹15,000 (Best Value)
                              </option>
                            </select>
                          </div>
                        </div>
                      </div>

                      {/* Dates */}
                      <div>
                        <h3 className="font-display font-bold text-white/90 text-sm uppercase tracking-widest mb-4 flex items-center gap-2">
                          <span className="w-5 h-5 rounded-full bg-gold/20 border border-gold/40 flex items-center justify-center text-gold text-xs font-black">
                            3
                          </span>
                          Joining Date
                        </h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div>
                            <Label
                              htmlFor="enroll-joining"
                              className={labelClass}
                            >
                              Date of Joining *
                            </Label>
                            <Input
                              id="enroll-joining"
                              type="date"
                              value={form.joiningDate}
                              onChange={(e) =>
                                update("joiningDate", e.target.value)
                              }
                              className={inputClass}
                              style={{ colorScheme: "dark" }}
                              data-ocid="enroll.input"
                            />
                          </div>
                          <div>
                            <Label className={labelClass}>
                              Expiry Date (Auto)
                            </Label>
                            <div
                              className="flex items-center h-10 px-4 rounded-xl text-sm font-bold border"
                              style={{
                                background: "rgba(212,160,23,0.08)",
                                borderColor: "rgba(212,160,23,0.25)",
                                color: expiryDate
                                  ? "#D4A017"
                                  : "rgba(255,255,255,0.25)",
                              }}
                            >
                              {expiryDate
                                ? formatDate(expiryDate)
                                : "Auto-calculated"}
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Medical */}
                      <div>
                        <h3 className="font-display font-bold text-white/90 text-sm uppercase tracking-widest mb-4 flex items-center gap-2">
                          <span className="w-5 h-5 rounded-full bg-gold/20 border border-gold/40 flex items-center justify-center text-gold text-xs font-black">
                            4
                          </span>
                          Medical Disclosure
                        </h3>
                        <p className="text-white/50 text-sm mb-3">
                          Do you have any existing medical condition or injury
                          that our coaches should be aware of?
                        </p>
                        <RadioGroup
                          value={form.medical}
                          onValueChange={(v) => update("medical", v)}
                          className="flex gap-6"
                          data-ocid="enroll.radio"
                        >
                          {[
                            { value: "yes", label: "Yes, I have a condition" },
                            { value: "no", label: "No, I'm fully fit" },
                          ].map((opt) => (
                            <div
                              key={opt.value}
                              className="flex items-center gap-2"
                            >
                              <RadioGroupItem
                                value={opt.value}
                                id={`medical-${opt.value}`}
                                className="border-white/40 text-gold"
                              />
                              <Label
                                htmlFor={`medical-${opt.value}`}
                                className="text-white/70 text-sm cursor-pointer"
                              >
                                {opt.label}
                              </Label>
                            </div>
                          ))}
                        </RadioGroup>
                      </div>

                      {/* Payment */}
                      <div>
                        <h3 className="font-display font-bold text-white/90 text-sm uppercase tracking-widest mb-4 flex items-center gap-2">
                          <span className="w-5 h-5 rounded-full bg-gold/20 border border-gold/40 flex items-center justify-center text-gold text-xs font-black">
                            5
                          </span>
                          Payment Method
                        </h3>
                        <RadioGroup
                          value={form.paymentMode}
                          onValueChange={(v) => update("paymentMode", v)}
                          className="flex gap-6 mb-4"
                          data-ocid="enroll.radio"
                        >
                          {[
                            { value: "UPI", label: "UPI (Online)" },
                            { value: "Offline", label: "Offline (Cash)" },
                          ].map((opt) => (
                            <div
                              key={opt.value}
                              className="flex items-center gap-2"
                            >
                              <RadioGroupItem
                                value={opt.value}
                                id={`pay-${opt.value}`}
                                className="border-white/40 text-gold"
                              />
                              <Label
                                htmlFor={`pay-${opt.value}`}
                                className="text-white/70 text-sm cursor-pointer"
                              >
                                {opt.label}
                              </Label>
                            </div>
                          ))}
                        </RadioGroup>
                        <AnimatePresence>
                          {form.paymentMode === "UPI" && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: "auto" }}
                              exit={{ opacity: 0, height: 0 }}
                              transition={{ duration: 0.3 }}
                              className="glass-gold rounded-2xl p-5 flex flex-col items-center gap-3"
                            >
                              <p className="text-white/60 text-sm font-medium">
                                Scan to pay via UPI
                              </p>
                              <img
                                src={upiQr}
                                alt="UPI QR Code"
                                className="w-44 h-44 object-contain rounded-xl"
                              />
                              <p className="text-gold text-xs font-semibold">
                                After payment, please screenshot the receipt and
                                send it on WhatsApp.
                              </p>
                            </motion.div>
                          )}
                          {form.paymentMode === "Offline" && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: "auto" }}
                              exit={{ opacity: 0, height: 0 }}
                              transition={{ duration: 0.3 }}
                              className="glass rounded-2xl p-4 text-center"
                            >
                              <p className="text-white/60 text-sm">
                                Pay cash at the academy on or before your first
                                session. Please carry exact change.
                              </p>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>

                      {/* Terms */}
                      <div>
                        <h3 className="font-display font-bold text-white/90 text-sm uppercase tracking-widest mb-4 flex items-center gap-2">
                          <span className="w-5 h-5 rounded-full bg-gold/20 border border-gold/40 flex items-center justify-center text-gold text-xs font-black">
                            6
                          </span>
                          Terms & Conditions
                        </h3>
                        <div
                          className="glass rounded-xl p-4 mb-4"
                          style={{ maxHeight: 160, overflowY: "auto" }}
                        >
                          <ol className="list-decimal list-inside space-y-2">
                            {TERMS.map((term) => (
                              <li
                                key={term}
                                className="text-white/45 text-xs leading-relaxed"
                              >
                                {term}
                              </li>
                            ))}
                          </ol>
                        </div>
                        <div className="flex items-start gap-3">
                          <Checkbox
                            id="enroll-agree"
                            checked={agreed}
                            onCheckedChange={(c) => setAgreed(Boolean(c))}
                            className="mt-0.5 border-white/30 data-[state=checked]:bg-gold data-[state=checked]:border-gold"
                            data-ocid="enroll.checkbox"
                          />
                          <Label
                            htmlFor="enroll-agree"
                            className="text-white/60 text-sm cursor-pointer leading-relaxed"
                          >
                            I have read and agree to the Terms & Conditions and
                            give my consent to participate.
                          </Label>
                        </div>
                      </div>

                      {/* Error */}
                      <AnimatePresence>
                        {error && (
                          <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0 }}
                            className="rounded-xl px-4 py-3 text-sm font-medium"
                            style={{
                              background: "rgba(220,39,67,0.12)",
                              border: "1px solid rgba(220,39,67,0.3)",
                              color: "#f87171",
                            }}
                            data-ocid="enroll.error_state"
                          >
                            {error}
                          </motion.div>
                        )}
                      </AnimatePresence>

                      {/* Submit */}
                      <motion.div
                        whileHover={{ scale: 1.01 }}
                        whileTap={{ scale: 0.99 }}
                      >
                        <Button
                          type="submit"
                          disabled={submitting}
                          className="w-full shimmer-btn bg-gold hover:bg-gold-bright text-obsidian font-display font-black text-base py-6 rounded-xl shadow-gold-glow hover:shadow-gold-glow-lg transition-all"
                          data-ocid="enroll.submit_button"
                        >
                          {submitting ? (
                            <>
                              <Loader2 className="mr-2 h-5 w-5 animate-spin" />{" "}
                              Submitting...
                            </>
                          ) : (
                            "Submit Enrollment"
                          )}
                        </Button>
                      </motion.div>
                    </motion.form>
                  )}
                </AnimatePresence>
              </div>
            </ScrollArea>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
