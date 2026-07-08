"use client";

import { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { supportAPI, type SupportTicket, type TicketsListResponse } from "@/lib/api";
import { useAuth } from "@/lib/auth-context";
import {
  MessageSquare,
  Plus,
  Loader2,
  AlertCircle,
  ArrowLeft,
  Clock,
  CheckCircle2,
  MessageCircle,
  ChevronRight,
  Search,
  Filter,
  X,
  Send,
} from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

type TicketStatus = "" | "open" | "pending" | "resolved" | "closed";

export default function SupportPage() {
  const { isAuthenticated, isLoading: authLoading } = useAuth();

  const [tickets, setTickets] = useState<SupportTicket[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [statusFilter, setStatusFilter] = useState<TicketStatus>("");
  const [showFilters, setShowFilters] = useState(false);

  // Create ticket modal state
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [newTicketSubject, setNewTicketSubject] = useState("");
  const [newTicketMessage, setNewTicketMessage] = useState("");
  const [isCreating, setIsCreating] = useState(false);
  const [createError, setCreateError] = useState<string | null>(null);

  const fetchTickets = useCallback(async () => {
    if (!isAuthenticated) return;

    setIsLoading(true);
    setError(null);
    try {
      const data: TicketsListResponse = await supportAPI.getTickets(page, 20, statusFilter);
      setTickets(data.tickets);
      setTotalPages(data.pages);
    } catch (err) {
      console.error("Failed to fetch tickets:", err);
      setError("Failed to load support tickets. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }, [isAuthenticated, page, statusFilter]);

  useEffect(() => {
    if (!authLoading) {
      fetchTickets();
    }
  }, [authLoading, fetchTickets]);

  const handleCreateTicket = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTicketSubject.trim() || !newTicketMessage.trim()) return;

    setIsCreating(true);
    setCreateError(null);

    try {
      await supportAPI.createTicket({
        subject: newTicketSubject.trim(),
        message: newTicketMessage.trim(),
      });
      setIsCreateModalOpen(false);
      setNewTicketSubject("");
      setNewTicketMessage("");
      fetchTickets();
    } catch (err) {
      console.error("Failed to create ticket:", err);
      setCreateError("Failed to create ticket. Please try again.");
    } finally {
      setIsCreating(false);
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "open":
        return <MessageCircle className="h-4 w-4 text-primary" />;
      case "pending":
        return <Clock className="h-4 w-4 text-yellow-500" />;
      case "resolved":
        return <CheckCircle2 className="h-4 w-4 text-green-500" />;
      case "closed":
        return <CheckCircle2 className="h-4 w-4 text-muted-foreground" />;
      default:
        return <MessageCircle className="h-4 w-4 text-muted-foreground" />;
    }
  };

  const getStatusBadge = (status: string) => {
    const baseClasses = "px-2 py-0.5 text-xs font-medium rounded-full";
    switch (status) {
      case "open":
        return `${baseClasses} bg-primary/20 text-primary`;
      case "pending":
        return `${baseClasses} bg-yellow-500/20 text-yellow-600`;
      case "resolved":
        return `${baseClasses} bg-green-500/20 text-green-600`;
      case "closed":
        return `${baseClasses} bg-muted text-muted-foreground`;
      default:
        return `${baseClasses} bg-muted text-muted-foreground`;
    }
  };

  const formatDate = (dateString: string | null) => {
    if (!dateString) return "No messages";
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const statusOptions: { value: TicketStatus; label: string }[] = [
    { value: "", label: "All" },
    { value: "open", label: "Open" },
    { value: "pending", label: "Pending" },
    { value: "resolved", label: "Resolved" },
    { value: "closed", label: "Closed" },
  ];

  if (authLoading) {
    return (
      <div className="min-h-[calc(100vh-160px)] flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-160px)] px-4 py-12">
      <div className="max-w-4xl mx-auto">
        {/* Back Link */}
        <Link
          href="/dashboard"
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-6"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Dashboard
        </Link>

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">Support</h1>
            <p className="text-muted-foreground">
              Need help? Create a ticket and our team will assist you.
            </p>
          </div>
          <Button variant="glow" onClick={() => setIsCreateModalOpen(true)}>
            <Plus className="h-4 w-4" />
            New Ticket
          </Button>
        </div>

        {/* Error Message */}
        {error && (
          <div className="flex items-center gap-3 p-4 mb-6 rounded-xl bg-destructive/10 border border-destructive/20 text-destructive">
            <AlertCircle className="h-5 w-5 shrink-0" />
            <span className="text-sm">{error}</span>
          </div>
        )}

        {/* Filters */}
        <div className="mb-6">
          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowFilters(!showFilters)}
              className={cn(showFilters && "border-primary text-primary")}
            >
              <Filter className="h-4 w-4" />
              Filter
            </Button>
            {statusFilter && (
              <span className="text-sm text-muted-foreground">
                Status: <span className="font-medium text-foreground">{statusFilter}</span>
                <button
                  onClick={() => setStatusFilter("")}
                  className="ml-2 text-muted-foreground hover:text-foreground"
                >
                  <X className="h-3 w-3 inline" />
                </button>
              </span>
            )}
          </div>

          {showFilters && (
            <div className="mt-4 p-4 bg-card border border-border rounded-xl">
              <label className="text-sm font-medium text-foreground mb-2 block">
                Status
              </label>
              <div className="flex flex-wrap gap-2">
                {statusOptions.map((option) => (
                  <button
                    key={option.value}
                    onClick={() => {
                      setStatusFilter(option.value);
                      setPage(1);
                    }}
                    className={cn(
                      "px-3 py-1.5 text-sm rounded-lg border transition-colors",
                      statusFilter === option.value
                        ? "bg-primary text-primary-foreground border-primary"
                        : "bg-card border-border text-foreground hover:bg-muted"
                    )}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Tickets List */}
        {isLoading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : tickets.length === 0 ? (
          <div className="text-center py-12 bg-card border border-border rounded-2xl">
            <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
              <MessageSquare className="h-8 w-8 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-semibold text-foreground mb-2">
              No tickets yet
            </h3>
            <p className="text-muted-foreground mb-6">
              Have a question or need assistance? Create your first support ticket.
            </p>
            <Button variant="glow" onClick={() => setIsCreateModalOpen(true)}>
              <Plus className="h-4 w-4" />
              Create Ticket
            </Button>
          </div>
        ) : (
          <div className="space-y-3">
            {tickets.map((ticket) => (
              <Link
                key={ticket.id}
                href={`/dashboard/support/${ticket.id}`}
                className="block p-4 bg-card border border-border rounded-xl hover:border-primary/50 hover:bg-card/80 transition-all group"
              >
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-muted rounded-lg flex items-center justify-center shrink-0">
                    {getStatusIcon(ticket.status)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2 mb-1">
                      <h3 className="font-medium text-foreground truncate group-hover:text-primary transition-colors">
                        {ticket.subject}
                      </h3>
                      <span className={getStatusBadge(ticket.status)}>
                        {ticket.status}
                      </span>
                    </div>
                    <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <MessageSquare className="h-3.5 w-3.5" />
                        {ticket.messages_count} messages
                      </span>
                      <span>
                        {formatDate(ticket.last_message_at || ticket.created_at)}
                      </span>
                      {!ticket.is_answered && ticket.status === "open" && (
                        <span className="text-xs px-2 py-0.5 bg-accent/20 text-accent rounded-full">
                          Awaiting response
                        </span>
                      )}
                    </div>
                  </div>
                  <ChevronRight className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors shrink-0" />
                </div>
              </Link>
            ))}
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-2 mt-8">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
            >
              Previous
            </Button>
            <span className="text-sm text-muted-foreground px-4">
              Page {page} of {totalPages}
            </span>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
            >
              Next
            </Button>
          </div>
        )}
      </div>

      {/* Create Ticket Modal */}
      {isCreateModalOpen && (
        <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-card border border-border rounded-2xl shadow-xl w-full max-w-lg">
            <div className="flex items-center justify-between p-6 border-b border-border">
              <h2 className="text-xl font-semibold text-foreground">
                Create Support Ticket
              </h2>
              <button
                onClick={() => setIsCreateModalOpen(false)}
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleCreateTicket} className="p-6">
              {createError && (
                <div className="flex items-center gap-3 p-4 mb-4 rounded-xl bg-destructive/10 border border-destructive/20 text-destructive">
                  <AlertCircle className="h-5 w-5 shrink-0" />
                  <span className="text-sm">{createError}</span>
                </div>
              )}

              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">
                    Subject
                  </label>
                  <input
                    type="text"
                    value={newTicketSubject}
                    onChange={(e) => setNewTicketSubject(e.target.value)}
                    placeholder="Brief description of your issue"
                    className="w-full h-11 px-4 bg-input border border-border rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
                    required
                  />
                </div>

                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">
                    Message
                  </label>
                  <textarea
                    value={newTicketMessage}
                    onChange={(e) => setNewTicketMessage(e.target.value)}
                    placeholder="Describe your issue in detail..."
                    rows={5}
                    className="w-full px-4 py-3 bg-input border border-border rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all resize-none"
                    required
                  />
                </div>
              </div>

              <div className="flex justify-end gap-3 mt-6">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsCreateModalOpen(false)}
                  disabled={isCreating}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  variant="glow"
                  disabled={isCreating || !newTicketSubject.trim() || !newTicketMessage.trim()}
                >
                  {isCreating ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Creating...
                    </>
                  ) : (
                    <>
                      <Send className="h-4 w-4" />
                      Create Ticket
                    </>
                  )}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
