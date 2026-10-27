"use client";

import React, { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import {
  Users,
  Briefcase,
  Mail,
  Phone,
  Building,
  Calendar,
  Search,
  Filter,
  Download,
  RefreshCw,
  ExternalLink,
  CheckCircle2,
  Clock,
  AlertCircle,
  Trash2,
  MessageSquare,
  ShieldAlert,
  Send,
  HelpCircle,
  X,
  ChevronDown
} from "lucide-react";

interface Consultation {
  id: string;
  name: string;
  email: string;
  company: string;
  phone: string;
  service: string;
  message: string;
  timestamp: string;
  createdAt?: string;
  status: "New" | "Contacted" | "In Review" | "Closed";
  notes?: string;
}

interface Application {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: string;
  message: string;
  resumeFileName: string;
  resumeUrl?: string;
  timestamp: string;
}

interface EmailDiagnostics {
  smtp: {
    configured: boolean;
    connected: boolean;
    host: string;
    user: string;
    error: string | null;
  };
  googleWebhook: {
    configured: boolean;
    url: string;
  };
  destinations: {
    contactEmail: string;
    hrEmail: string;
  };
}

export default function AdminConsultationsPage() {
  const [activeTab, setActiveTab] = useState<"consultations" | "applications" | "email-setup">("consultations");
  const [consultations, setConsultations] = useState<Consultation[]>([]);
  const [applications, setApplications] = useState<Application[]>([]);
  const [emailStatus, setEmailStatus] = useState<EmailDiagnostics | null>(null);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [serviceFilter, setServiceFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedConsultation, setSelectedConsultation] = useState<Consultation | null>(null);
  const [noteDraft, setNoteDraft] = useState("");
  const [statusSaving, setStatusSaving] = useState(false);
  const [testEmailAddress, setTestEmailAddress] = useState("contact@techaxisglobal.com");
  const [testEmailSending, setTestEmailSending] = useState(false);
  const [testEmailResult, setTestEmailResult] = useState<{ success: boolean; message: string } | null>(null);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [cRes, aRes, eRes] = await Promise.all([
        fetch("/api/admin/consultations"),
        fetch("/api/admin/applications"),
        fetch("/api/admin/email-status")
      ]);

      if (cRes.ok) {
        const cData = await cRes.json();
        setConsultations(cData.consultations || []);
      }
      if (aRes.ok) {
        const aData = await aRes.json();
        setApplications(aData.applications || []);
      }
      if (eRes.ok) {
        const eData = await eRes.json();
        setEmailStatus(eData.emailSystem || null);
      }
    } catch (err) {
      console.error("Failed to load admin data:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleStatusChange = async (id: string, newStatus: "New" | "Contacted" | "In Review" | "Closed", notes?: string) => {
    setStatusSaving(true);
    try {
      const res = await fetch("/api/admin/consultations", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status: newStatus, notes })
      });

      if (res.ok) {
        setConsultations((prev) =>
          prev.map((c) => (c.id === id ? { ...c, status: newStatus, notes: notes !== undefined ? notes : c.notes } : c))
        );
        if (selectedConsultation && selectedConsultation.id === id) {
          setSelectedConsultation((prev) => (prev ? { ...prev, status: newStatus, notes: notes !== undefined ? notes : prev.notes } : null));
        }
      }
    } catch (err) {
      console.error("Failed to update status:", err);
    } finally {
      setStatusSaving(false);
    }
  };

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`Are you sure you want to delete the consultation request from "${name}"?`)) {
      return;
    }
    try {
      const res = await fetch(`/api/admin/consultations?id=${id}`, { method: "DELETE" });
      if (res.ok) {
        setConsultations((prev) => prev.filter((c) => c.id !== id));
        if (selectedConsultation?.id === id) {
          setSelectedConsultation(null);
        }
      }
    } catch (err) {
      console.error("Failed to delete record:", err);
    }
  };

  const handleSendTestEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    setTestEmailSending(true);
    setTestEmailResult(null);
    try {
      const res = await fetch("/api/admin/email-status", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: testEmailAddress })
      });
      const data = await res.json();
      setTestEmailResult(data);
    } catch (err: any) {
      setTestEmailResult({ success: false, message: err.message || "Network error while sending test email" });
    } finally {
      setTestEmailSending(false);
    }
  };

  const exportToCSV = () => {
    if (consultations.length === 0) {
      alert("No consultations to export.");
      return;
    }
    const headers = ["ID", "Timestamp (UTC)", "Client Name", "Company", "Email", "Phone", "Service", "Status", "Message", "Internal Notes"];
    const rows = consultations.map((c) => [
      `"${c.id}"`,
      `"${c.timestamp}"`,
      `"${c.name.replace(/"/g, '""')}"`,
      `"${c.company.replace(/"/g, '""')}"`,
      `"${c.email.replace(/"/g, '""')}"`,
      `"${(c.phone || "").replace(/"/g, '""')}"`,
      `"${c.service.replace(/"/g, '""')}"`,
      `"${c.status || "New"}"`,
      `"${c.message.replace(/"/g, '""').replace(/\n/g, " ")}"`,
      `"${(c.notes || "").replace(/"/g, '""').replace(/\n/g, " ")}"`
    ]);

    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows.map((r) => r.join(","))].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `TAG_Consultations_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Filtered consultations
  const filteredConsultations = useMemo(() => {
    return consultations.filter((c) => {
      const matchesSearch =
        searchQuery === "" ||
        c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (c.phone && c.phone.includes(searchQuery)) ||
        c.service.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.message.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesService = serviceFilter === "all" || c.service === serviceFilter;
      const matchesStatus = statusFilter === "all" || (c.status || "New") === statusFilter;

      return matchesSearch && matchesService && matchesStatus;
    });
  }, [consultations, searchQuery, serviceFilter, statusFilter]);

  const uniqueServices = useMemo(() => {
    const set = new Set(consultations.map((c) => c.service));
    return Array.from(set);
  }, [consultations]);

  const newConsultationsCount = consultations.filter((c) => !c.status || c.status === "New").length;

  return (
    <div className="min-h-screen bg-[#090D16] text-[#F1F5F9] font-sans antialiased selection:bg-[#B42318] selection:text-white pb-24 pt-20">
      {/* Admin Control Bar */}
      <header className="border-b border-white/10 bg-[#0F172A]/90 backdrop-blur-xl sticky top-20 z-20 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-[#B42318]/20 border border-[#B42318]/40 flex items-center justify-center text-red-400 font-bold text-xs shadow-inner">
              ADM
            </div>
            <div>
              <h1 className="text-sm font-bold text-white tracking-tight flex items-center gap-2">
                <span>Enterprise Inbound Leads & Careers</span>
                <span className="hidden sm:inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  Database Live
                </span>
              </h1>
              <p className="text-[11px] text-zinc-400">TechAxis Global Private Management Console</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={fetchData}
              disabled={loading}
              className="inline-flex items-center gap-2 px-3 py-1.5 text-xs font-semibold rounded-lg bg-white/5 hover:bg-white/10 text-zinc-300 border border-white/10 transition-colors disabled:opacity-50"
              title="Refresh entries"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin text-red-400" : ""}`} />
              <span className="hidden md:inline">Refresh</span>
            </button>

            <button
              onClick={exportToCSV}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 text-xs font-semibold rounded-lg bg-[#B42318] hover:bg-[#991B1B] text-white shadow-md shadow-red-900/20 transition-all hover:scale-[1.02]"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export CSV</span>
            </button>

            <Link
              href="/contact-us"
              target="_blank"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-zinc-400 hover:text-white transition-colors"
            >
              <span>Contact Page</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex space-x-6">
          <button
            onClick={() => setActiveTab("consultations")}
            className={`py-3 text-sm font-semibold border-b-2 flex items-center gap-2 transition-all ${
              activeTab === "consultations"
                ? "border-[#B42318] text-white"
                : "border-transparent text-zinc-400 hover:text-zinc-200"
            }`}
          >
            <Users className="w-4 h-4" />
            <span>Consultation Inquiries</span>
            <span
              className={`px-2 py-0.5 rounded-full text-[11px] font-bold ${
                newConsultationsCount > 0 ? "bg-[#B42318] text-white animate-pulse" : "bg-white/10 text-zinc-300"
              }`}
            >
              {consultations.length}
            </span>
          </button>

          <button
            onClick={() => setActiveTab("applications")}
            className={`py-3 text-sm font-semibold border-b-2 flex items-center gap-2 transition-all ${
              activeTab === "applications"
                ? "border-[#B42318] text-white"
                : "border-transparent text-zinc-400 hover:text-zinc-200"
            }`}
          >
            <Briefcase className="w-4 h-4" />
            <span>Job Applications</span>
            <span className="px-2 py-0.5 rounded-full text-[11px] font-bold bg-white/10 text-zinc-300">
              {applications.length}
            </span>
          </button>

          <button
            onClick={() => setActiveTab("email-setup")}
            className={`py-3 text-sm font-semibold border-b-2 flex items-center gap-2 transition-all ${
              activeTab === "email-setup"
                ? "border-[#B42318] text-white"
                : "border-transparent text-zinc-400 hover:text-zinc-200"
            }`}
          >
            <Mail className="w-4 h-4" />
            <span>Email Delivery & Setup Guide</span>
            {emailStatus && !emailStatus.smtp.connected && (
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
            )}
          </button>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        {/* Email Delivery Warning Banner if SMTP not working */}
        {emailStatus && !emailStatus.smtp.connected && (
          <div className="mb-8 p-4 rounded-xl bg-gradient-to-r from-amber-950/40 via-amber-900/20 to-transparent border border-amber-500/30 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-start gap-3">
              <div className="p-2 rounded-lg bg-amber-500/20 text-amber-400 shrink-0">
                <AlertCircle className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-amber-200">
                  Notice: Microsoft 365 Live Emails Pending Password
                </h4>
                <p className="text-xs text-amber-300/80 mt-0.5">
                  All consultation requests are <strong>100% safely saved</strong> in the table below. To send live email receipts from <code className="bg-black/30 px-1 py-0.5 rounded text-amber-200">contact@techaxisglobal.com</code>, add your Microsoft password to <code className="bg-black/30 px-1 py-0.5 rounded text-white font-mono">MICROSOFT_SMTP_PASS</code> in <code className="bg-black/30 px-1 py-0.5 rounded text-white font-mono">.env.local</code>.
                </p>
              </div>
            </div>
            <button
              onClick={() => setActiveTab("email-setup")}
              className="px-4 py-2 rounded-lg bg-amber-500 hover:bg-amber-400 text-black text-xs font-bold transition-all shadow-md shrink-0 text-center"
            >
              View 2-Minute Email Fix Guide →
            </button>
          </div>
        )}

        {/* ============================================================== */}
        {/* TAB 1: CONSULTATION INQUIRIES                                  */}
        {/* ============================================================== */}
        {activeTab === "consultations" && (
          <>
            {/* KPI Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              <div className="p-5 rounded-2xl bg-[#0F172A]/70 border border-white/10">
                <div className="text-zinc-400 text-xs font-semibold uppercase tracking-wider">Total Consultations</div>
                <div className="text-3xl font-extrabold text-white mt-2">{consultations.length}</div>
                <div className="text-xs text-zinc-500 mt-1">All-time inbound inquiries</div>
              </div>

              <div className="p-5 rounded-2xl bg-[#0F172A]/70 border border-white/10">
                <div className="text-zinc-400 text-xs font-semibold uppercase tracking-wider flex items-center justify-between">
                  <span>New / Action Needed</span>
                  {newConsultationsCount > 0 && (
                    <span className="w-2 h-2 rounded-full bg-[#B42318] animate-ping" />
                  )}
                </div>
                <div className="text-3xl font-extrabold text-[#EF4444] mt-2">{newConsultationsCount}</div>
                <div className="text-xs text-zinc-500 mt-1">Requires architect response</div>
              </div>

              <div className="p-5 rounded-2xl bg-[#0F172A]/70 border border-white/10">
                <div className="text-zinc-400 text-xs font-semibold uppercase tracking-wider">In Progress / Contacted</div>
                <div className="text-3xl font-extrabold text-amber-400 mt-2">
                  {consultations.filter((c) => c.status === "Contacted" || c.status === "In Review").length}
                </div>
                <div className="text-xs text-zinc-500 mt-1">Under technical review</div>
              </div>

              <div className="p-5 rounded-2xl bg-[#0F172A]/70 border border-white/10">
                <div className="text-zinc-400 text-xs font-semibold uppercase tracking-wider">Storage Status</div>
                <div className="text-base font-bold text-emerald-400 mt-3 flex items-center gap-1.5">
                  <CheckCircle2 className="w-5 h-5 shrink-0" />
                  <span>Local Backup OK</span>
                </div>
                <div className="text-xs text-zinc-500 mt-1">data/consultations.json</div>
              </div>
            </div>

            {/* Controls Bar: Search & Filter */}
            <div className="p-4 rounded-2xl bg-[#0F172A]/80 border border-white/10 mb-6 flex flex-col md:flex-row gap-4 items-center justify-between">
              <div className="relative w-full md:w-96">
                <Search className="w-4 h-4 text-zinc-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search by client, company, email, service..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-black/40 border border-white/10 rounded-xl text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-red-500 transition-colors"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery("")}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-white"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>

              <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
                <div className="flex items-center gap-2">
                  <Filter className="w-3.5 h-3.5 text-zinc-400" />
                  <span className="text-xs text-zinc-400 font-medium">Service:</span>
                  <select
                    value={serviceFilter}
                    onChange={(e) => setServiceFilter(e.target.value)}
                    className="px-3 py-2 bg-black/40 border border-white/10 rounded-xl text-xs text-zinc-200 focus:outline-none focus:border-red-500"
                  >
                    <option value="all">All Services</option>
                    {uniqueServices.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-xs text-zinc-400 font-medium">Status:</span>
                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="px-3 py-2 bg-black/40 border border-white/10 rounded-xl text-xs text-zinc-200 focus:outline-none focus:border-red-500"
                  >
                    <option value="all">All Statuses</option>
                    <option value="New">New</option>
                    <option value="Contacted">Contacted</option>
                    <option value="In Review">In Review</option>
                    <option value="Closed">Closed</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Consultations Table */}
            {loading ? (
              <div className="p-16 text-center rounded-2xl bg-[#0F172A]/50 border border-white/10">
                <RefreshCw className="w-8 h-8 text-red-500 animate-spin mx-auto mb-3" />
                <p className="text-sm text-zinc-400">Loading consultation inquiries from server storage...</p>
              </div>
            ) : filteredConsultations.length === 0 ? (
              <div className="p-16 text-center rounded-2xl bg-[#0F172A]/50 border border-white/10">
                <div className="w-14 h-14 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mx-auto mb-4 text-zinc-500">
                  <Users className="w-6 h-6" />
                </div>
                <h3 className="text-base font-bold text-white">No Consultations Found</h3>
                <p className="text-xs text-zinc-400 max-w-md mx-auto mt-1">
                  {searchQuery || serviceFilter !== "all" || statusFilter !== "all"
                    ? "No records match your active search filter. Clear the search or filter to see all inquiries."
                    : "When clients submit the form on the Contact Us page, their full inquiry, contact details, and requirements will appear here instantly."}
                </p>
                <div className="mt-5">
                  <Link
                    href="/contact-us"
                    target="_blank"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/10 hover:bg-white/15 text-xs font-semibold text-white border border-white/10 transition-colors"
                  >
                    <span>Submit a Test Inquiry on Contact Us</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ) : (
              <div className="overflow-hidden rounded-2xl bg-[#0F172A]/70 border border-white/10 shadow-2xl">
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="border-b border-white/10 bg-black/40 text-[11px] uppercase tracking-wider text-zinc-400 font-semibold">
                        <th className="py-4 px-5">Client / Company</th>
                        <th className="py-4 px-5">Contact Details</th>
                        <th className="py-4 px-5">Service Focus</th>
                        <th className="py-4 px-5">Inquiry Message</th>
                        <th className="py-4 px-5">Date Received</th>
                        <th className="py-4 px-5">Status</th>
                        <th className="py-4 px-5 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5 text-sm">
                      {filteredConsultations.map((c) => {
                        const dateObj = new Date(c.timestamp);
                        const formattedDate = isNaN(dateObj.getTime())
                          ? c.timestamp
                          : dateObj.toLocaleDateString("en-US", {
                              month: "short",
                              day: "numeric",
                              year: "numeric"
                            });
                        const formattedTime = isNaN(dateObj.getTime())
                          ? ""
                          : dateObj.toLocaleTimeString("en-US", {
                              hour: "2-digit",
                              minute: "2-digit"
                            });

                        return (
                          <tr
                            key={c.id}
                            className="hover:bg-white/[0.02] transition-colors group"
                          >
                            {/* Client & Company */}
                            <td className="py-4 px-5 align-top">
                              <div className="font-bold text-white group-hover:text-red-400 transition-colors">
                                {c.name}
                              </div>
                              <div className="text-xs text-zinc-400 flex items-center gap-1.5 mt-0.5">
                                <Building className="w-3.5 h-3.5 text-zinc-500 shrink-0" />
                                <span>{c.company}</span>
                              </div>
                            </td>

                            {/* Contact Details */}
                            <td className="py-4 px-5 align-top">
                              <a
                                href={`mailto:${c.email}?subject=Re:%20TechAxis%20Global%20Consultation%20–%20${encodeURIComponent(c.service)}&body=Hello%20${encodeURIComponent(c.name)},%0D%0A%0D%0AThank%20you%20for%20consulting%20with%20TechAxis%20Global%20regarding%20${encodeURIComponent(c.service)}.`}
                                className="text-xs text-red-400 hover:text-red-300 font-medium flex items-center gap-1.5 transition-colors"
                              >
                                <Mail className="w-3.5 h-3.5 shrink-0" />
                                <span className="truncate max-w-[170px]">{c.email}</span>
                              </a>
                              {c.phone && (
                                <a
                                  href={`tel:${c.phone}`}
                                  className="text-xs text-zinc-400 hover:text-zinc-200 flex items-center gap-1.5 mt-1 transition-colors"
                                >
                                  <Phone className="w-3.5 h-3.5 text-zinc-500 shrink-0" />
                                  <span>{c.phone}</span>
                                </a>
                              )}
                            </td>

                            {/* Service Focus */}
                            <td className="py-4 px-5 align-top">
                              <span className="inline-block px-2.5 py-1 rounded-lg text-xs font-semibold bg-white/5 text-zinc-300 border border-white/10">
                                {c.service}
                              </span>
                            </td>

                            {/* Message Preview */}
                            <td className="py-4 px-5 align-top max-w-xs">
                              <p className="text-xs text-zinc-300 line-clamp-2 leading-relaxed">
                                {c.message}
                              </p>
                              <button
                                onClick={() => {
                                  setSelectedConsultation(c);
                                  setNoteDraft(c.notes || "");
                                }}
                                className="text-[11px] text-red-400 hover:text-red-300 font-medium mt-1 inline-flex items-center gap-1"
                              >
                                <span>Read full message & notes</span>
                                <span>→</span>
                              </button>
                            </td>

                            {/* Date */}
                            <td className="py-4 px-5 align-top text-xs text-zinc-400 whitespace-nowrap">
                              <div className="font-medium text-zinc-300">{formattedDate}</div>
                              <div className="text-[11px] text-zinc-500">{formattedTime}</div>
                            </td>

                            {/* Status Dropdown */}
                            <td className="py-4 px-5 align-top">
                              <div className="relative inline-block text-left">
                                <select
                                  value={c.status || "New"}
                                  onChange={(e) =>
                                    handleStatusChange(
                                      c.id,
                                      e.target.value as "New" | "Contacted" | "In Review" | "Closed"
                                    )
                                  }
                                  className={`px-2.5 py-1 rounded-full text-xs font-bold border focus:outline-none cursor-pointer transition-colors ${
                                    c.status === "Contacted"
                                      ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/30"
                                      : c.status === "In Review"
                                      ? "bg-blue-500/10 text-blue-400 border-blue-500/30"
                                      : c.status === "Closed"
                                      ? "bg-zinc-800 text-zinc-400 border-zinc-700"
                                      : "bg-red-500/10 text-red-400 border-red-500/30"
                                  }`}
                                >
                                  <option value="New" className="bg-[#0F172A] text-red-400">
                                    New
                                  </option>
                                  <option value="Contacted" className="bg-[#0F172A] text-emerald-400">
                                    Contacted
                                  </option>
                                  <option value="In Review" className="bg-[#0F172A] text-blue-400">
                                    In Review
                                  </option>
                                  <option value="Closed" className="bg-[#0F172A] text-zinc-400">
                                    Closed
                                  </option>
                                </select>
                              </div>
                            </td>

                            {/* Actions */}
                            <td className="py-4 px-5 align-top text-right">
                              <div className="flex items-center justify-end gap-2">
                                <a
                                  href={`mailto:${c.email}?subject=TechAxis%20Global%20Consultation%20Follow-up%20–%20${encodeURIComponent(c.service)}`}
                                  className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-zinc-300 hover:text-white transition-colors"
                                  title="Send Email to Client"
                                >
                                  <Mail className="w-3.5 h-3.5" />
                                </a>

                                <button
                                  onClick={() => {
                                    setSelectedConsultation(c);
                                    setNoteDraft(c.notes || "");
                                  }}
                                  className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-zinc-300 hover:text-white transition-colors"
                                  title="View Details"
                                >
                                  <MessageSquare className="w-3.5 h-3.5" />
                                </button>

                                <button
                                  onClick={() => handleDelete(c.id, c.name)}
                                  className="p-1.5 rounded-lg bg-white/5 hover:bg-red-500/20 text-zinc-500 hover:text-red-400 transition-colors"
                                  title="Delete Consultation"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </>
        )}

        {/* ============================================================== */}
        {/* TAB 2: JOB APPLICATIONS                                        */}
        {/* ============================================================== */}
        {activeTab === "applications" && (
          <div>
            <div className="p-4 rounded-2xl bg-[#0F172A]/80 border border-white/10 mb-6 flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-white">Job Applications ({applications.length})</h3>
                <p className="text-xs text-zinc-400">Received via the Careers application portal</p>
              </div>
            </div>

            {applications.length === 0 ? (
              <div className="p-16 text-center rounded-2xl bg-[#0F172A]/50 border border-white/10">
                <Briefcase className="w-10 h-10 text-zinc-600 mx-auto mb-3" />
                <h3 className="text-sm font-bold text-white">No Job Applications Yet</h3>
                <p className="text-xs text-zinc-400 mt-1">Applications submitted on /careers will appear here.</p>
              </div>
            ) : (
              <div className="overflow-hidden rounded-2xl bg-[#0F172A]/70 border border-white/10">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-white/10 bg-black/40 text-[11px] uppercase tracking-wider text-zinc-400 font-semibold">
                      <th className="py-4 px-5">Candidate</th>
                      <th className="py-4 px-5">Position Applied</th>
                      <th className="py-4 px-5">Contact</th>
                      <th className="py-4 px-5">Resume</th>
                      <th className="py-4 px-5">Date</th>
                      <th className="py-4 px-5">Cover Note</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5 text-sm">
                    {applications.map((app) => (
                      <tr key={app.id} className="hover:bg-white/[0.02] transition-colors">
                        <td className="py-4 px-5 font-bold text-white">{app.name}</td>
                        <td className="py-4 px-5">
                          <span className="px-2.5 py-1 rounded-md bg-red-500/10 text-red-400 text-xs font-semibold">
                            {app.role}
                          </span>
                        </td>
                        <td className="py-4 px-5 text-xs">
                          <div>
                            <a href={`mailto:${app.email}`} className="text-red-400 hover:underline">
                              {app.email}
                            </a>
                          </div>
                          <div className="text-zinc-400 mt-0.5">{app.phone}</div>
                        </td>
                        <td className="py-4 px-5 text-xs">
                          {app.resumeUrl ? (
                            <a
                              href={app.resumeUrl}
                              target="_blank"
                              rel="noreferrer"
                              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white/5 hover:bg-white/10 text-white font-medium border border-white/10 transition-colors"
                            >
                              <span>📄 View Resume</span>
                              <ExternalLink className="w-3 h-3 text-zinc-400" />
                            </a>
                          ) : (
                            <span className="text-zinc-500">{app.resumeFileName}</span>
                          )}
                        </td>
                        <td className="py-4 px-5 text-xs text-zinc-400">
                          {new Date(app.timestamp).toLocaleDateString()}
                        </td>
                        <td className="py-4 px-5 text-xs text-zinc-300 max-w-xs truncate">
                          {app.message || "(No note)"}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* ============================================================== */}
        {/* TAB 3: EMAIL DELIVERY DIAGNOSTICS & SETUP GUIDE                */}
        {/* ============================================================== */}
        {activeTab === "email-setup" && (
          <div className="space-y-8">
            {/* Live System Diagnostics */}
            <div className="p-6 rounded-2xl bg-[#0F172A]/80 border border-white/10">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <ShieldAlert className="w-5 h-5 text-red-400" />
                <span>Live Email Delivery Status</span>
              </h3>
              <p className="text-xs text-zinc-400 mt-1">
                Real-time connection evaluation of TechAxis Global email sending pipelines
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                {/* SMTP Pipeline */}
                <div className="p-4 rounded-xl bg-black/40 border border-white/10">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-wider text-zinc-400">
                      Method 1: Direct SMTP Mailer
                    </span>
                    <span
                      className={`px-2.5 py-0.5 rounded-full text-xs font-bold ${
                        emailStatus?.smtp.connected
                          ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                          : "bg-amber-500/10 text-amber-400 border border-amber-500/20"
                      }`}
                    >
                      {emailStatus?.smtp.connected ? "Connected & Active" : "Not Configured / Inactive"}
                    </span>
                  </div>
                  <div className="mt-3 text-xs text-zinc-300 space-y-1">
                    <div>
                      <span className="text-zinc-500">SMTP Host: </span>
                      <code className="text-zinc-200">{emailStatus?.smtp.host || "None"}</code>
                    </div>
                    <div>
                      <span className="text-zinc-500">SMTP User: </span>
                      <code className="text-zinc-200">{emailStatus?.smtp.user || "None"}</code>
                    </div>
                    {emailStatus?.smtp.error && (
                      <div className="p-2 rounded bg-red-500/10 border border-red-500/20 text-red-300 text-[11px] mt-2">
                        {emailStatus.smtp.error}
                      </div>
                    )}
                  </div>
                </div>

                {/* Google Webhook Pipeline */}
                <div className="p-4 rounded-xl bg-black/40 border border-white/10">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-wider text-zinc-400">
                      Method 2: Google Apps Script Webhook
                    </span>
                    <span
                      className={`px-2.5 py-0.5 rounded-full text-xs font-bold ${
                        emailStatus?.googleWebhook.configured
                          ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                          : "bg-zinc-700 text-zinc-400"
                      }`}
                    >
                      {emailStatus?.googleWebhook.configured ? "URL Configured" : "Not Configured"}
                    </span>
                  </div>
                  <div className="mt-3 text-xs text-zinc-300 space-y-1">
                    <div>
                      <span className="text-zinc-500">Webhook URL: </span>
                      <code className="text-zinc-200 break-all text-[11px]">
                        {emailStatus?.googleWebhook.url || "None"}
                      </code>
                    </div>
                    <div className="text-[11px] text-zinc-400 mt-2">
                      Zero passwords required. Automatically saves to Google Sheets & dispatches emails from your Google Account.
                    </div>
                  </div>
                </div>
              </div>

              {/* Send Test Email Tool */}
              <div className="mt-6 pt-6 border-t border-white/10">
                <h4 className="text-sm font-bold text-white mb-2 flex items-center gap-2">
                  <Send className="w-4 h-4 text-red-400" />
                  <span>Send a Live Test Email</span>
                </h4>
                <p className="text-xs text-zinc-400 mb-4">
                  Verify your email configuration right now by sending a real test message to your inbox.
                </p>

                <form onSubmit={handleSendTestEmail} className="flex flex-col sm:flex-row gap-3 max-w-lg">
                  <input
                    type="email"
                    value={testEmailAddress}
                    onChange={(e) => setTestEmailAddress(e.target.value)}
                    placeholder="Enter destination email (e.g. techaxisglobal@gmail.com)"
                    required
                    className="flex-1 px-4 py-2.5 bg-black/40 border border-white/10 rounded-xl text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-red-500"
                  />
                  <button
                    type="submit"
                    disabled={testEmailSending}
                    className="px-5 py-2.5 rounded-xl bg-[#B42318] hover:bg-[#991B1B] text-white text-xs font-bold transition-all disabled:opacity-50 shrink-0 flex items-center justify-center gap-2 shadow-lg shadow-red-900/20"
                  >
                    {testEmailSending ? (
                      <>
                        <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                        <span>Sending...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-3.5 h-3.5" />
                        <span>Send Test Email</span>
                      </>
                    )}
                  </button>
                </form>

                {testEmailResult && (
                  <div
                    className={`mt-4 p-3.5 rounded-xl text-xs max-w-lg border ${
                      testEmailResult.success
                        ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-300"
                        : "bg-red-500/10 border-red-500/30 text-red-300"
                    }`}
                  >
                    {testEmailResult.message}
                  </div>
                )}
              </div>
            </div>

            {/* Step-by-Step Fix Guide */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Option A: Microsoft Office 365 */}
              <div className="p-6 rounded-2xl bg-[#0F172A]/70 border border-white/10">
                <div className="flex items-center gap-2 text-white font-bold text-base">
                  <span className="w-6 h-6 rounded-full bg-[#0078D4] text-white text-xs flex items-center justify-center font-bold">
                    M365
                  </span>
                  <span>Microsoft 365 / Office 365 (contact@techaxisglobal.com)</span>
                </div>
                <p className="text-xs text-zinc-400 mt-2">
                  Configured for <code className="text-zinc-200">contact@techaxisglobal.com</code> via <code className="text-zinc-200">smtp.office365.com:587</code>:
                </p>

                <ol className="mt-4 space-y-3 text-xs text-zinc-300 list-decimal list-inside">
                  <li>
                    Enter your Microsoft 365 password or App Password in <code className="bg-black/50 px-1.5 py-0.5 rounded text-white font-mono text-[11px]">.env.local</code>:
                    <div className="mt-2 p-3 rounded-lg bg-black/60 border border-white/10 font-mono text-[11px] text-zinc-200 select-all">
                      MICROSOFT_SMTP_HOST=&quot;smtp.office365.com&quot;<br />
                      MICROSOFT_SMTP_USER=&quot;contact@techaxisglobal.com&quot;<br />
                      MICROSOFT_SMTP_PASS=&quot;your-microsoft-password&quot;<br />
                      MICROSOFT_SMTP_PORT=587
                    </div>
                  </li>
                  <li>
                    <strong>If your Microsoft 365 account has 2FA enabled:</strong> Generate an App Password at{" "}
                    <a
                      href="https://mysignins.microsoft.com/security-info"
                      target="_blank"
                      rel="noreferrer"
                      className="text-blue-400 hover:underline inline-flex items-center gap-1"
                    >
                      mysignins.microsoft.com/security-info <ExternalLink className="w-2.5 h-2.5" />
                    </a>
                  </li>
                  <li>
                    <strong>In Microsoft 365 Admin Center:</strong> Ensure &quot;Authenticated SMTP&quot; is allowed for <code className="text-blue-300">contact@techaxisglobal.com</code> (under Users &gt; Active Users &gt; Mail &gt; Manage email apps &gt; check &quot;Authenticated SMTP&quot;).
                  </li>
                  <li>Save <code className="text-white">.env.local</code> and test live delivery with the <strong>Send Test Email</strong> button above!</li>
                </ol>
              </div>

              {/* Option B: Google Apps Script Webhook */}
              <div className="p-6 rounded-2xl bg-[#0F172A]/70 border border-white/10">
                <div className="flex items-center gap-2 text-white font-bold text-base">
                  <span className="w-6 h-6 rounded-full bg-emerald-600 text-white text-xs flex items-center justify-center font-bold">
                    B
                  </span>
                  <span>Option 2: Free Google Sheets Webhook (Zero Passwords)</span>
                </div>
                <p className="text-xs text-zinc-400 mt-2">
                  Automatically populates a Google Sheet with all leads and sends emails directly via Google Apps Script:
                </p>

                <ol className="mt-4 space-y-3 text-xs text-zinc-300 list-decimal list-inside">
                  <li>
                    Create a new Google Sheet at{" "}
                    <a
                      href="https://sheets.new"
                      target="_blank"
                      rel="noreferrer"
                      className="text-red-400 hover:underline inline-flex items-center gap-1"
                    >
                      sheets.new <ExternalLink className="w-2.5 h-2.5" />
                    </a>
                  </li>
                  <li>Name it <strong>TechAxis Global - Inquiries & Careers</strong>.</li>
                  <li>Click <strong>Extensions &gt; Apps Script</strong> from the top menu.</li>
                  <li>
                    Replace the script with the contents of the updated <code className="bg-black/50 px-1.5 py-0.5 rounded text-white font-mono text-[11px]">google-apps-script.js</code> file in your project.
                  </li>
                  <li>
                    Click the blue <strong>Deploy &gt; New deployment</strong> button.
                  </li>
                  <li>Select type: <strong>Web app</strong>.</li>
                  <li>
                    Set Execute as: <strong>Me</strong> and Who has access: <strong>Anyone</strong> (CRITICAL!).
                  </li>
                  <li>Click <strong>Deploy</strong> and approve permissions.</li>
                  <li>
                    Copy the Web app URL and paste it in <code className="bg-black/50 px-1.5 py-0.5 rounded text-white font-mono text-[11px]">.env.local</code> as:
                    <div className="mt-2 p-3 rounded-lg bg-black/60 border border-white/10 font-mono text-[11px] text-zinc-200 select-all">
                      GOOGLE_SHEET_WEBHOOK_URL=https://script.google.com/macros/s/.../exec
                    </div>
                  </li>
                </ol>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* ============================================================== */}
      {/* CONSULTATION DETAIL MODAL                                      */}
      {/* ============================================================== */}
      {selectedConsultation && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
          <div className="w-full max-w-2xl bg-[#0F172A] border border-white/10 rounded-3xl p-6 sm:p-8 shadow-2xl relative my-8">
            <button
              onClick={() => setSelectedConsultation(null)}
              className="absolute top-6 right-6 p-2 rounded-full bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3">
              <span className="w-10 h-10 rounded-2xl bg-red-500/10 border border-red-500/20 text-red-400 flex items-center justify-center font-bold">
                <Users className="w-5 h-5" />
              </span>
              <div>
                <h3 className="text-xl font-bold text-white">{selectedConsultation.name}</h3>
                <p className="text-xs text-zinc-400 flex items-center gap-2 mt-0.5">
                  <span>{selectedConsultation.company}</span>
                  <span>•</span>
                  <span>{selectedConsultation.service}</span>
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6 p-4 rounded-2xl bg-black/40 border border-white/5 text-xs">
              <div>
                <span className="text-zinc-500 block">Work Email:</span>
                <a
                  href={`mailto:${selectedConsultation.email}`}
                  className="text-red-400 font-semibold hover:underline mt-0.5 inline-block"
                >
                  {selectedConsultation.email}
                </a>
              </div>
              <div>
                <span className="text-zinc-500 block">Phone Number:</span>
                <span className="text-white font-semibold mt-0.5 inline-block">
                  {selectedConsultation.phone || "Not provided"}
                </span>
              </div>
              <div>
                <span className="text-zinc-500 block">Submission Date:</span>
                <span className="text-zinc-300 font-medium mt-0.5 inline-block">
                  {new Date(selectedConsultation.timestamp).toLocaleString()}
                </span>
              </div>
              <div>
                <span className="text-zinc-500 block">Current Status:</span>
                <span className="text-zinc-300 font-medium mt-0.5 inline-block">
                  {selectedConsultation.status || "New"}
                </span>
              </div>
            </div>

            {/* Full Message */}
            <div className="mt-6">
              <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-400 mb-2">
                Client Inquiry Details:
              </h4>
              <div className="p-4 rounded-2xl bg-black/40 border border-white/5 text-sm text-zinc-200 leading-relaxed whitespace-pre-wrap max-h-60 overflow-y-auto">
                {selectedConsultation.message}
              </div>
            </div>

            {/* Internal Notes */}
            <div className="mt-6">
              <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-400 mb-2 flex items-center justify-between">
                <span>Internal Staff Notes:</span>
                <span className="text-[11px] text-zinc-500 font-normal">Private to team</span>
              </h4>
              <textarea
                value={noteDraft}
                onChange={(e) => setNoteDraft(e.target.value)}
                placeholder="Add meeting notes, next follow-up dates, or client requirements..."
                rows={3}
                className="w-full p-3 bg-black/40 border border-white/10 rounded-xl text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-red-500"
              />
            </div>

            {/* Modal Actions */}
            <div className="mt-6 pt-6 border-t border-white/10 flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <select
                  value={selectedConsultation.status || "New"}
                  onChange={(e) =>
                    handleStatusChange(
                      selectedConsultation.id,
                      e.target.value as any,
                      noteDraft
                    )
                  }
                  className="px-3 py-2 bg-black/40 border border-white/10 rounded-xl text-xs text-white focus:outline-none"
                >
                  <option value="New">Mark as New</option>
                  <option value="Contacted">Mark as Contacted</option>
                  <option value="In Review">Mark as In Review</option>
                  <option value="Closed">Mark as Closed</option>
                </select>

                <button
                  onClick={() =>
                    handleStatusChange(
                      selectedConsultation.id,
                      selectedConsultation.status || "New",
                      noteDraft
                    )
                  }
                  disabled={statusSaving}
                  className="px-3.5 py-2 rounded-xl bg-white/10 hover:bg-white/15 text-xs font-semibold text-white transition-colors"
                >
                  {statusSaving ? "Saving..." : "Save Notes"}
                </button>
              </div>

              <div className="flex items-center gap-2">
                <a
                  href={`mailto:${selectedConsultation.email}?subject=TechAxis%20Global%20Consultation%20–%20${encodeURIComponent(selectedConsultation.service)}`}
                  className="px-4 py-2 rounded-xl bg-[#B42318] hover:bg-[#991B1B] text-white text-xs font-bold transition-all shadow-md flex items-center gap-1.5"
                >
                  <Mail className="w-3.5 h-3.5" />
                  <span>Reply via Email</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
