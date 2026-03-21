import type { Enrollment } from "@/backend.d";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useActor } from "@/hooks/useActor";
import {
  Download,
  Eye,
  EyeOff,
  Loader2,
  LogOut,
  Search,
  Shield,
} from "lucide-react";
import { useEffect, useState } from "react";

const ALL = "__all__";
const ADMIN_ID = "FRONTLINE00";
const ADMIN_PASS = "123456";
const SESSION_KEY = "frontline_admin_logged_in";

function formatDate(dateStr: string): string {
  if (!dateStr) return "-";
  const d = new Date(dateStr);
  if (Number.isNaN(d.getTime())) return dateStr;
  return d.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

export default function AdminPage() {
  const { actor, isFetching } = useActor();
  const [isLoggedIn, setIsLoggedIn] = useState(
    () => sessionStorage.getItem(SESSION_KEY) === "true",
  );
  const [loginId, setLoginId] = useState("");
  const [loginPass, setLoginPass] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [loginError, setLoginError] = useState("");
  const [enrollments, setEnrollments] = useState<Enrollment[]>([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [filterBatch, setFilterBatch] = useState(ALL);
  const [filterLocation, setFilterLocation] = useState(ALL);
  const [filterPlan, setFilterPlan] = useState(ALL);
  const [filterPlaystyle, setFilterPlaystyle] = useState(ALL);
  const [filterFeeStatus, setFilterFeeStatus] = useState(ALL);
  // Local fee paid overrides: id -> bool (optimistic UI)
  const [feePaidOverrides, setFeePaidOverrides] = useState<
    Record<string, boolean>
  >({});

  useEffect(() => {
    if (!isLoggedIn || !actor || isFetching) return;
    const load = async () => {
      setLoading(true);
      try {
        const data = await actor
          .getEnrollments()
          .catch(() => [] as Enrollment[]);
        setEnrollments(data);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [isLoggedIn, actor, isFetching]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (loginId === ADMIN_ID && loginPass === ADMIN_PASS) {
      sessionStorage.setItem(SESSION_KEY, "true");
      setIsLoggedIn(true);
      setLoginError("");
    } else {
      setLoginError("Invalid Login ID or Password");
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem(SESSION_KEY);
    setIsLoggedIn(false);
    setEnrollments([]);
  };

  const handleToggleFeePaid = async (enrollment: Enrollment) => {
    const idKey = String(enrollment.id);
    const currentPaid =
      idKey in feePaidOverrides ? feePaidOverrides[idKey] : enrollment.feePaid;
    const newPaid = !currentPaid;
    // Optimistic update
    setFeePaidOverrides((prev) => ({ ...prev, [idKey]: newPaid }));
    try {
      if (actor) {
        await actor.setFeePaid(BigInt(enrollment.id), newPaid);
      }
    } catch (_e) {
      // Revert on error
      setFeePaidOverrides((prev) => ({ ...prev, [idKey]: currentPaid }));
    }
  };

  const filtered = enrollments.filter((e) => {
    const q = search.toLowerCase();
    const idKey = String(e.id);
    const paid =
      idKey in feePaidOverrides ? feePaidOverrides[idKey] : e.feePaid;
    const matchSearch =
      !q || e.name.toLowerCase().includes(q) || e.phone.includes(q);
    const matchBatch = filterBatch === ALL || e.batchTimeSlot === filterBatch;
    const matchLocation =
      filterLocation === ALL || e.location === filterLocation;
    const matchPlan = filterPlan === ALL || e.planDuration === filterPlan;
    const matchPlaystyle =
      filterPlaystyle === ALL || e.playstyle === filterPlaystyle;
    const matchFeeStatus =
      filterFeeStatus === ALL ||
      (filterFeeStatus === "paid" && paid) ||
      (filterFeeStatus === "unpaid" && !paid);
    return (
      matchSearch &&
      matchBatch &&
      matchLocation &&
      matchPlan &&
      matchPlaystyle &&
      matchFeeStatus
    );
  });

  const exportCsv = () => {
    const headers = [
      "#",
      "Name",
      "Phone",
      "Age",
      "Email",
      "Batch",
      "Location",
      "Playstyle",
      "Plan",
      "Joining Date",
      "Expiry Date",
      "Fee Paid",
      "Medical",
      "Address",
    ];
    const rows = filtered.map((e, i) => {
      const idKey = String(e.id);
      const paid =
        idKey in feePaidOverrides ? feePaidOverrides[idKey] : e.feePaid;
      return [
        String(i + 1),
        e.name,
        e.phone,
        String(e.age),
        e.email,
        e.batchTimeSlot,
        e.location,
        e.playstyle,
        e.planDuration,
        e.joiningDate || "-",
        e.expiryDate || "-",
        paid ? "Yes" : "No",
        e.medicalProblem ? "Yes" : "No",
        e.address,
      ];
    });
    const csv = [headers, ...rows]
      .map((r) => r.map((c) => `"${c.replace(/"/g, '""')}"`).join(","))
      .join("\n");
    const a = document.createElement("a");
    a.href = URL.createObjectURL(new Blob([csv], { type: "text/csv" }));
    a.download = "enrollments.csv";
    a.click();
  };

  const batches = [...new Set(enrollments.map((e) => e.batchTimeSlot))];
  const locations = [...new Set(enrollments.map((e) => e.location))];
  const plans = [...new Set(enrollments.map((e) => e.planDuration))];
  const playstyles = [...new Set(enrollments.map((e) => e.playstyle))];

  // Count unpaid for badge
  const unpaidCount = enrollments.filter((e) => {
    const idKey = String(e.id);
    return idKey in feePaidOverrides ? !feePaidOverrides[idKey] : !e.feePaid;
  }).length;

  return (
    <div className="min-h-screen bg-secondary">
      {/* Admin Header */}
      <header className="bg-navy px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Shield className="text-gold" size={24} />
          <div>
            <p className="text-white font-black text-lg leading-none">
              Admin Dashboard
            </p>
            <p className="text-white/60 text-xs">Frontline Sports Academy</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          {isLoggedIn && (
            <button
              type="button"
              onClick={handleLogout}
              className="flex items-center gap-1.5 text-white/80 hover:text-white text-sm font-medium transition-colors"
              data-ocid="admin.logout.button"
            >
              <LogOut size={14} /> Logout
            </button>
          )}
          <button
            type="button"
            onClick={() => {
              window.location.hash = "";
            }}
            className="text-white/60 hover:text-white text-sm font-medium transition-colors"
            data-ocid="admin.back.link"
          >
            ← Back to Site
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        {!isLoggedIn ? (
          /* Login Form */
          <div className="flex items-center justify-center min-h-[70vh]">
            <div
              className="bg-white rounded-2xl shadow-lg border border-border w-full max-w-md p-8"
              data-ocid="admin.login.panel"
            >
              <div className="flex flex-col items-center mb-8">
                <div className="bg-navy/10 rounded-full p-4 mb-4">
                  <Shield className="text-navy" size={32} />
                </div>
                <h1 className="text-navy font-black text-2xl">Admin Login</h1>
                <p className="text-muted-foreground text-sm mt-1 text-center">
                  Frontline Sports Academy
                </p>
              </div>

              <form onSubmit={handleLogin} className="flex flex-col gap-5">
                <div className="flex flex-col gap-1.5">
                  <Label htmlFor="loginId" className="text-navy font-semibold">
                    Login ID
                  </Label>
                  <Input
                    id="loginId"
                    type="text"
                    value={loginId}
                    onChange={(e) => setLoginId(e.target.value)}
                    placeholder="Enter your Login ID"
                    autoComplete="username"
                    required
                    data-ocid="admin.login.input"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <Label
                    htmlFor="loginPass"
                    className="text-navy font-semibold"
                  >
                    Password
                  </Label>
                  <div className="relative">
                    <Input
                      id="loginPass"
                      type={showPass ? "text" : "password"}
                      value={loginPass}
                      onChange={(e) => setLoginPass(e.target.value)}
                      placeholder="Enter your Password"
                      autoComplete="current-password"
                      required
                      className="pr-10"
                      data-ocid="admin.password.input"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPass((v) => !v)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-navy transition-colors"
                      tabIndex={-1}
                      data-ocid="admin.show_password.toggle"
                    >
                      {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                </div>

                {loginError && (
                  <p
                    className="text-red-600 text-sm font-medium text-center"
                    data-ocid="admin.login.error_state"
                  >
                    {loginError}
                  </p>
                )}

                <Button
                  type="submit"
                  className="bg-navy hover:bg-navy/90 text-white rounded-full w-full mt-2"
                  data-ocid="admin.login.submit_button"
                >
                  Login
                </Button>
              </form>
            </div>
          </div>
        ) : loading || isFetching ? (
          <div
            className="flex items-center justify-center py-24"
            data-ocid="admin.loading_state"
          >
            <Loader2 className="animate-spin text-navy" size={36} />
          </div>
        ) : (
          <>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
              <div className="flex items-center gap-3 flex-wrap">
                <h1 className="text-navy font-black text-2xl">
                  Enrollments
                  <span className="ml-2 text-sm font-semibold text-muted-foreground bg-white rounded-full px-2 py-0.5">
                    {filtered.length}
                  </span>
                </h1>
                {unpaidCount > 0 && (
                  <button
                    type="button"
                    onClick={() =>
                      setFilterFeeStatus(
                        filterFeeStatus === "unpaid" ? ALL : "unpaid",
                      )
                    }
                    className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border-2 transition-all ${
                      filterFeeStatus === "unpaid"
                        ? "bg-red-500 border-red-500 text-white"
                        : "bg-red-50 border-red-300 text-red-600 hover:bg-red-100"
                    }`}
                    data-ocid="admin.unpaid_filter.badge"
                  >
                    <span className="w-2 h-2 rounded-full bg-current inline-block" />
                    {unpaidCount} Unpaid
                  </button>
                )}
              </div>
              <Button
                onClick={exportCsv}
                className="bg-navy hover:bg-navy/90 text-white rounded-full flex items-center gap-2"
                data-ocid="admin.export.button"
              >
                <Download size={16} /> Export CSV
              </Button>
            </div>

            {/* Filters */}
            <div className="bg-white rounded-xl border p-4 mb-6 grid sm:grid-cols-2 lg:grid-cols-6 gap-3">
              <div className="relative">
                <Search
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                  size={14}
                />
                <Input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search name or phone"
                  className="pl-8"
                  data-ocid="admin.search.input"
                />
              </div>
              <Select onValueChange={setFilterBatch} defaultValue={ALL}>
                <SelectTrigger data-ocid="admin.batch.select">
                  <SelectValue placeholder="All Batches" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value={ALL}>All Batches</SelectItem>
                  {batches.map((b) => (
                    <SelectItem key={b} value={b}>
                      {b}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select onValueChange={setFilterLocation} defaultValue={ALL}>
                <SelectTrigger data-ocid="admin.location.select">
                  <SelectValue placeholder="All Locations" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value={ALL}>All Locations</SelectItem>
                  {locations.map((l) => (
                    <SelectItem key={l} value={l}>
                      {l}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select onValueChange={setFilterPlaystyle} defaultValue={ALL}>
                <SelectTrigger data-ocid="admin.playstyle.select">
                  <SelectValue placeholder="All Playstyles" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value={ALL}>All Playstyles</SelectItem>
                  {playstyles.map((p) => (
                    <SelectItem key={p} value={p}>
                      {p}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select onValueChange={setFilterPlan} defaultValue={ALL}>
                <SelectTrigger data-ocid="admin.plan.select">
                  <SelectValue placeholder="All Plans" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value={ALL}>All Plans</SelectItem>
                  {plans.map((p) => (
                    <SelectItem key={p} value={p}>
                      {p}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select
                value={filterFeeStatus}
                onValueChange={setFilterFeeStatus}
              >
                <SelectTrigger data-ocid="admin.fee_status.select">
                  <SelectValue placeholder="Fee Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value={ALL}>All Fee Status</SelectItem>
                  <SelectItem value="paid">Paid Only</SelectItem>
                  <SelectItem value="unpaid">Unpaid Only</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Table */}
            <div
              className="bg-white rounded-xl border overflow-hidden"
              data-ocid="admin.table"
            >
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-secondary">
                      <TableHead className="font-bold text-navy">#</TableHead>
                      <TableHead className="font-bold text-navy">
                        Name
                      </TableHead>
                      <TableHead className="font-bold text-navy">
                        Phone
                      </TableHead>
                      <TableHead className="font-bold text-navy">Age</TableHead>
                      <TableHead className="font-bold text-navy">
                        Batch
                      </TableHead>
                      <TableHead className="font-bold text-navy">
                        Location
                      </TableHead>
                      <TableHead className="font-bold text-navy">
                        Plan
                      </TableHead>
                      <TableHead className="font-bold text-navy">
                        Joining
                      </TableHead>
                      <TableHead className="font-bold text-navy">
                        Expiry
                      </TableHead>
                      <TableHead className="font-bold text-navy">
                        Fee Paid
                      </TableHead>
                      <TableHead className="font-bold text-navy">
                        Medical
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filtered.length === 0 ? (
                      <TableRow>
                        <TableCell
                          colSpan={11}
                          className="text-center text-muted-foreground py-12"
                          data-ocid="admin.empty_state"
                        >
                          No enrollments found.
                        </TableCell>
                      </TableRow>
                    ) : (
                      filtered.map((e, i) => {
                        const idKey = String(e.id);
                        const paid =
                          idKey in feePaidOverrides
                            ? feePaidOverrides[idKey]
                            : e.feePaid;
                        return (
                          <TableRow
                            key={`${e.name}-${e.phone}-${i}`}
                            data-ocid={`admin.row.item.${i + 1}`}
                            className="hover:bg-secondary/50"
                          >
                            <TableCell className="text-muted-foreground text-sm">
                              {i + 1}
                            </TableCell>
                            <TableCell className="font-semibold text-navy whitespace-nowrap">
                              {e.name}
                            </TableCell>
                            <TableCell className="whitespace-nowrap">
                              {e.phone}
                            </TableCell>
                            <TableCell>{String(e.age)}</TableCell>
                            <TableCell className="whitespace-nowrap text-sm">
                              {e.batchTimeSlot}
                            </TableCell>
                            <TableCell className="whitespace-nowrap">
                              {e.location}
                            </TableCell>
                            <TableCell className="whitespace-nowrap text-sm">
                              {e.planDuration}
                            </TableCell>
                            <TableCell className="whitespace-nowrap text-sm text-muted-foreground">
                              {formatDate(e.joiningDate)}
                            </TableCell>
                            <TableCell className="whitespace-nowrap text-sm text-muted-foreground">
                              {formatDate(e.expiryDate)}
                            </TableCell>
                            <TableCell>
                              <button
                                type="button"
                                onClick={() => handleToggleFeePaid(e)}
                                className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border-2 transition-all ${
                                  paid
                                    ? "bg-green-100 border-green-400 text-green-700 hover:bg-green-200"
                                    : "bg-red-50 border-red-300 text-red-600 hover:bg-red-100"
                                }`}
                                data-ocid={`admin.fee_paid.toggle.${i + 1}`}
                                title={paid ? "Mark as Unpaid" : "Mark as Paid"}
                              >
                                <span
                                  className={`w-3 h-3 rounded-full inline-block ${
                                    paid ? "bg-green-500" : "bg-red-400"
                                  }`}
                                />
                                {paid ? "Paid" : "Unpaid"}
                              </button>
                            </TableCell>
                            <TableCell>
                              <span
                                className={`text-xs font-bold px-2 py-0.5 rounded-full ${
                                  e.medicalProblem
                                    ? "bg-red-100 text-red-700"
                                    : "bg-green-100 text-green-700"
                                }`}
                              >
                                {e.medicalProblem ? "Yes" : "No"}
                              </span>
                            </TableCell>
                          </TableRow>
                        );
                      })
                    )}
                  </TableBody>
                </Table>
              </div>
            </div>
          </>
        )}
      </main>
    </div>
  );
}
