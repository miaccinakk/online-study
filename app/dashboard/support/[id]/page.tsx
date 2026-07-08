"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { supportAPI, type SupportTicketDetail, type SupportMessage } from "@/lib/api";
import { useAuth } from "@/lib/auth-context";
import { useTicketSSE, type SSEMessage } from "@/hooks/use-ticket-sse";
import {
  ArrowLeft,
  Loader2,
  AlertCircle,
  Send,
  Clock,
  CheckCircle2,
  MessageCircle,
  User,
  Shield,
  X,
  Wifi,
  WifiOff,
} from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { cn } from "@/lib/utils";

// Simple notification sound using Web Audio API
const playNotificationSound = () => {
  try {
    const audioContext = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    oscillator.frequency.value = 800;
    oscillator.type = 'sine';
    
    gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);
    
    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.3);
  } catch {
    // Audio not supported or blocked
  }
};

export default function TicketDetailPage() {
  const params = useParams();
  const ticketId = params.id as string;
  const { user, isLoading: authLoading } = useAuth();

  const [ticket, setTicket] = useState<SupportTicketDetail | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isSSEConnected, setIsSSEConnected] = useState(false);

  // Message input state
  const [newMessage, setNewMessage] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [sendError, setSendError] = useState<string | null>(null);

  // Close ticket state
  const [isClosing, setIsClosing] = useState(false);
  const [showCloseConfirm, setShowCloseConfirm] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // SSE handler for new messages
  const handleSSEMessage = useCallback((data: SSEMessage) => {
    // Only add message if it's from admin (our own messages are added optimistically)
    if (data.message.sender_type === 'admin') {
      setTicket((prev) => {
        if (!prev) return prev;
        
        // Check if message already exists to avoid duplicates
        const messageExists = prev.messages.some(m => m.id === data.message.id);
        if (messageExists) return prev;

        return {
          ...prev,
          messages: [...prev.messages, data.message],
          messages_count: prev.messages_count + 1,
          last_message_at: data.message.created_at,
          is_answered: true,
        };
      });
      
      // Play notification sound for admin messages
      playNotificationSound();
    }
  }, []);

  // SSE connection
  useTicketSSE(ticketId, {
    onNewMessage: handleSSEMessage,
    onConnected: () => setIsSSEConnected(true),
    onError: () => setIsSSEConnected(false),
    onTicketUpdated: (data) => {
      setTicket((prev) => {
        if (!prev) return prev;
        return {
          ...prev,
          status: (data.status as SupportTicketDetail['status']) || prev.status,
          is_answered: data.is_answered ?? prev.is_answered,
        };
      });
    },
  });

  const fetchTicket = useCallback(async () => {
    if (!ticketId) return;

    setIsLoading(true);
    setError(null);
    try {
      const data = await supportAPI.getTicket(ticketId);
      setTicket(data);
    } catch (err) {
      console.error("Failed to fetch ticket:", err);
      setError("Failed to load ticket. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }, [ticketId]);

  useEffect(() => {
    if (!authLoading) {
      fetchTicket();
    }
  }, [authLoading, fetchTicket]);

  useEffect(() => {
    if (ticket?.messages) {
      scrollToBottom();
    }
  }, [ticket?.messages]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim() || !ticket || ticket.status === "closed") return;

    setIsSending(true);
    setSendError(null);

    try {
      const message = await supportAPI.sendMessage(ticketId, newMessage.trim());
      setTicket((prev) => {
        if (!prev) return prev;
        return {
          ...prev,
          messages: [...prev.messages, message],
          messages_count: prev.messages_count + 1,
          last_message_at: message.created_at,
          is_answered: false,
        };
      });
      setNewMessage("");
      textareaRef.current?.focus();
    } catch (err) {
      console.error("Failed to send message:", err);
      setSendError("Failed to send message. Please try again.");
    } finally {
      setIsSending(false);
    }
  };

  const handleCloseTicket = async () => {
    if (!ticket) return;

    setIsClosing(true);
    try {
      await supportAPI.closeTicket(ticketId);
      setTicket((prev) => (prev ? { ...prev, status: "closed" } : prev));
      setShowCloseConfirm(false);
    } catch (err) {
      console.error("Failed to close ticket:", err);
    } finally {
      setIsClosing(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      if (newMessage.trim() && !isSending) {
        handleSendMessage(e as unknown as React.FormEvent);
      }
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
    const baseClasses = "px-3 py-1 text-xs font-medium rounded-full";
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

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const formatMessageTime = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const isToday = date.toDateString() === now.toDateString();
    
    if (isToday) {
      return date.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
      });
    }
    
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (authLoading || isLoading) {
    return (
      <div className="min-h-[calc(100vh-160px)] flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (error || !ticket) {
    return (
      <div className="min-h-[calc(100vh-160px)] px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <Link
            href="/dashboard/support"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-6"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Support
          </Link>

          <div className="text-center py-12 bg-card border border-border rounded-2xl">
            <AlertCircle className="h-12 w-12 text-destructive mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-foreground mb-2">
              {error || "Ticket not found"}
            </h2>
            <p className="text-muted-foreground mb-6">
              The ticket you are looking for could not be loaded.
            </p>
            <Button variant="glow" onClick={fetchTicket}>
              Try Again
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-160px)] px-4 py-12">
      <div className="max-w-4xl mx-auto">
        {/* Back Link */}
        <Link
          href="/dashboard/support"
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-6"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Support
        </Link>

        {/* Ticket Header */}
        <div className="bg-card border border-border rounded-2xl p-6 mb-6">
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                {getStatusIcon(ticket.status)}
                <h1 className="text-xl font-bold text-foreground">
                  {ticket.subject}
                </h1>
              </div>
              <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
                <span className={getStatusBadge(ticket.status)}>
                  {ticket.status}
                </span>
                {/* SSE Connection Indicator */}
                <span 
                  className={cn(
                    "flex items-center gap-1.5 px-2 py-0.5 rounded-full text-xs",
                    isSSEConnected 
                      ? "bg-green-500/10 text-green-600" 
                      : "bg-yellow-500/10 text-yellow-600"
                  )}
                  title={isSSEConnected ? "Real-time updates active" : "Connecting..."}
                >
                  {isSSEConnected ? (
                    <>
                      <Wifi className="h-3 w-3" />
                      Live
                    </>
                  ) : (
                    <>
                      <WifiOff className="h-3 w-3" />
                      Connecting
                    </>
                  )}
                </span>
                <span>Created: {formatDate(ticket.created_at)}</span>
              </div>
            </div>
            {ticket.status !== "closed" && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowCloseConfirm(true)}
                className="text-muted-foreground hover:text-destructive hover:border-destructive"
              >
                Close Ticket
              </Button>
            )}
          </div>
        </div>

        {/* Messages */}
        <div className="bg-card border border-border rounded-2xl overflow-hidden">
          {/* Messages Container */}
          <div className="h-[400px] sm:h-[500px] overflow-y-auto p-4 sm:p-6 space-y-4">
            {ticket.messages.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                No messages yet. Start the conversation below.
              </div>
            ) : (
              ticket.messages.map((message) => (
                <MessageBubble
                  key={message.id}
                  message={message}
                  isOwn={message.sender_type === "user"}
                  formatTime={formatMessageTime}
                />
              ))
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Message Input */}
          {ticket.status !== "closed" ? (
            <div className="border-t border-border p-4">
              {sendError && (
                <div className="flex items-center gap-2 p-3 mb-3 rounded-lg bg-destructive/10 text-destructive text-sm">
                  <AlertCircle className="h-4 w-4 shrink-0" />
                  {sendError}
                </div>
              )}
              <form onSubmit={handleSendMessage} className="flex gap-3">
                <textarea
                  ref={textareaRef}
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Type your message... (Enter to send, Shift+Enter for new line)"
                  rows={2}
                  className="flex-1 px-4 py-3 bg-input border border-border rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all resize-none"
                />
                <Button
                  type="submit"
                  variant="glow"
                  disabled={isSending || !newMessage.trim()}
                  className="self-end"
                >
                  {isSending ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Send className="h-4 w-4" />
                  )}
                </Button>
              </form>
            </div>
          ) : (
            <div className="border-t border-border p-4 text-center text-muted-foreground">
              This ticket is closed. You can create a new ticket if you need further assistance.
            </div>
          )}
        </div>

        {/* Close Confirmation Modal */}
        {showCloseConfirm && (
          <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-card border border-border rounded-2xl shadow-xl w-full max-w-md p-6">
              <h2 className="text-xl font-semibold text-foreground mb-4">
                Close Ticket?
              </h2>
              <p className="text-muted-foreground mb-6">
                Are you sure you want to close this ticket? You will not be able to send more messages to it.
              </p>
              <div className="flex justify-end gap-3">
                <Button
                  variant="outline"
                  onClick={() => setShowCloseConfirm(false)}
                  disabled={isClosing}
                >
                  Cancel
                </Button>
                <Button
                  variant="destructive"
                  onClick={handleCloseTicket}
                  disabled={isClosing}
                >
                  {isClosing ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Closing...
                    </>
                  ) : (
                    "Close Ticket"
                  )}
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function MessageBubble({
  message,
  isOwn,
  formatTime,
}: {
  message: SupportMessage;
  isOwn: boolean;
  formatTime: (date: string) => string;
}) {
  return (
    <div className={cn("flex gap-3", isOwn ? "flex-row-reverse" : "flex-row")}>
      {/* Avatar */}
      <div
        className={cn(
          "w-8 h-8 rounded-full flex items-center justify-center shrink-0",
          isOwn ? "bg-primary/10" : "bg-accent/10"
        )}
      >
        {isOwn ? (
          <User className="h-4 w-4 text-primary" />
        ) : (
          <Shield className="h-4 w-4 text-accent" />
        )}
      </div>

      {/* Message Content */}
      <div className={cn("max-w-[75%] flex flex-col gap-1", isOwn ? "items-end" : "items-start")}>
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <span className="font-medium">
            {isOwn ? "You" : message.sender_name || "Support"}
          </span>
          <span>{formatTime(message.created_at)}</span>
        </div>
        <div
          className={cn(
            "px-4 py-2.5 rounded-2xl text-sm",
            isOwn
              ? "bg-primary text-primary-foreground rounded-tr-sm"
              : "bg-muted text-foreground rounded-tl-sm"
          )}
        >
          <p className="whitespace-pre-wrap break-words">{message.message}</p>
        </div>
      </div>
    </div>
  );
}
