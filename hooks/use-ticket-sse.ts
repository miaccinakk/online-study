import { useEffect, useRef, useCallback } from 'react';
import { tokenManager } from '@/lib/api';

const BASE_URL = "https://backend-obd-production.up.railway.app/api/v1";

export interface SSEMessage {
  ticketId: string;
  message: {
    id: string;
    sender_type: 'user' | 'admin';
    sender_id: string;
    sender_name: string;
    message: string;
    is_read: boolean;
    created_at: string;
  };
}

export interface SSETicketUpdate {
  ticketId: string;
  status?: string;
  is_answered?: boolean;
  last_message_at?: string;
  messages_count?: number;
}

interface UseTicketSSEOptions {
  onNewMessage?: (data: SSEMessage) => void;
  onTicketUpdated?: (data: SSETicketUpdate) => void;
  onConnected?: () => void;
  onError?: (error: Event) => void;
}

/**
 * Hook for real-time ticket updates via SSE
 * Connects to backend SSE endpoint for a specific ticket
 */
export function useTicketSSE(
  ticketId: string | null,
  options: UseTicketSSEOptions = {}
) {
  const { onNewMessage, onTicketUpdated, onConnected, onError } = options;
  const eventSourceRef = useRef<EventSource | null>(null);
  const reconnectTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const reconnectAttemptsRef = useRef(0);
  const maxReconnectAttempts = 5;
  const isConnectedRef = useRef(false);

  const connect = useCallback(() => {
    if (!ticketId) return;

    const accessToken = tokenManager.getAccessToken();
    if (!accessToken) {
      console.warn('[SSE] No access token available');
      return;
    }

    // Close existing connection if any
    if (eventSourceRef.current) {
      eventSourceRef.current.close();
    }

    // SSE doesn't support custom headers, so we pass token via query param
    const url = `${BASE_URL}/support/sse/tickets/${ticketId}?token=${accessToken}`;
    
    try {
      const eventSource = new EventSource(url);
      eventSourceRef.current = eventSource;

      eventSource.addEventListener('connected', (e) => {
        console.log('[SSE] Connected to ticket:', ticketId);
        reconnectAttemptsRef.current = 0;
        isConnectedRef.current = true;
        try {
          const data = JSON.parse(e.data);
          console.log('[SSE] Connection data:', data);
        } catch {
          // Ignore parse errors for connection event
        }
        onConnected?.();
      });

      eventSource.addEventListener('new_message', (e) => {
        try {
          const data = JSON.parse(e.data) as SSEMessage;
          console.log('[SSE] New message received:', data);
          onNewMessage?.(data);
        } catch (err) {
          console.error('[SSE] Failed to parse new_message:', err);
        }
      });

      eventSource.addEventListener('ticket_updated', (e) => {
        try {
          const data = JSON.parse(e.data) as SSETicketUpdate;
          console.log('[SSE] Ticket updated:', data);
          onTicketUpdated?.(data);
        } catch (err) {
          console.error('[SSE] Failed to parse ticket_updated:', err);
        }
      });

      eventSource.addEventListener('heartbeat', () => {
        // Connection is alive, no action needed
      });

      eventSource.onerror = (err) => {
        console.error('[SSE] Connection error:', err);
        isConnectedRef.current = false;
        onError?.(err);
        
        eventSource.close();
        eventSourceRef.current = null;

        // Attempt reconnection with exponential backoff
        if (reconnectAttemptsRef.current < maxReconnectAttempts) {
          const delay = Math.min(1000 * Math.pow(2, reconnectAttemptsRef.current), 30000);
          console.log(`[SSE] Reconnecting in ${delay}ms (attempt ${reconnectAttemptsRef.current + 1})`);
          
          reconnectTimeoutRef.current = setTimeout(() => {
            reconnectAttemptsRef.current++;
            connect();
          }, delay);
        } else {
          console.error('[SSE] Max reconnection attempts reached');
        }
      };

    } catch (err) {
      console.error('[SSE] Failed to create EventSource:', err);
    }
  }, [ticketId, onNewMessage, onTicketUpdated, onConnected, onError]);

  const disconnect = useCallback(() => {
    if (reconnectTimeoutRef.current) {
      clearTimeout(reconnectTimeoutRef.current);
      reconnectTimeoutRef.current = null;
    }
    if (eventSourceRef.current) {
      eventSourceRef.current.close();
      eventSourceRef.current = null;
      isConnectedRef.current = false;
    }
  }, []);

  useEffect(() => {
    connect();

    return () => {
      disconnect();
    };
  }, [connect, disconnect]);

  return {
    isConnected: isConnectedRef.current,
    reconnect: connect,
    disconnect,
  };
}

/**
 * Hook for real-time updates on all user tickets (for tickets list page)
 */
export function useTicketsListSSE(
  options: {
    onNewMessage?: (data: SSEMessage) => void;
    onTicketUpdated?: (data: SSETicketUpdate) => void;
    onConnected?: () => void;
    onError?: (error: Event) => void;
  } = {}
) {
  const { onNewMessage, onTicketUpdated, onConnected, onError } = options;
  const eventSourceRef = useRef<EventSource | null>(null);
  const reconnectTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const reconnectAttemptsRef = useRef(0);
  const maxReconnectAttempts = 5;

  const connect = useCallback(() => {
    const accessToken = tokenManager.getAccessToken();
    if (!accessToken) {
      console.warn('[SSE] No access token available');
      return;
    }

    if (eventSourceRef.current) {
      eventSourceRef.current.close();
    }

    const url = `${BASE_URL}/support/sse/tickets?token=${accessToken}`;
    
    try {
      const eventSource = new EventSource(url);
      eventSourceRef.current = eventSource;

      eventSource.addEventListener('connected', (e) => {
        console.log('[SSE] Connected to tickets list');
        reconnectAttemptsRef.current = 0;
        onConnected?.();
      });

      eventSource.addEventListener('new_message', (e) => {
        try {
          const data = JSON.parse(e.data) as SSEMessage;
          console.log('[SSE] New message in ticket:', data.ticketId);
          onNewMessage?.(data);
        } catch (err) {
          console.error('[SSE] Failed to parse new_message:', err);
        }
      });

      eventSource.addEventListener('ticket_updated', (e) => {
        try {
          const data = JSON.parse(e.data) as SSETicketUpdate;
          console.log('[SSE] Ticket updated:', data.ticketId);
          onTicketUpdated?.(data);
        } catch (err) {
          console.error('[SSE] Failed to parse ticket_updated:', err);
        }
      });

      eventSource.addEventListener('heartbeat', () => {
        // Connection is alive
      });

      eventSource.onerror = (err) => {
        console.error('[SSE] Connection error:', err);
        onError?.(err);
        
        eventSource.close();
        eventSourceRef.current = null;

        if (reconnectAttemptsRef.current < maxReconnectAttempts) {
          const delay = Math.min(1000 * Math.pow(2, reconnectAttemptsRef.current), 30000);
          console.log(`[SSE] Reconnecting in ${delay}ms`);
          
          reconnectTimeoutRef.current = setTimeout(() => {
            reconnectAttemptsRef.current++;
            connect();
          }, delay);
        }
      };

    } catch (err) {
      console.error('[SSE] Failed to create EventSource:', err);
    }
  }, [onNewMessage, onTicketUpdated, onConnected, onError]);

  const disconnect = useCallback(() => {
    if (reconnectTimeoutRef.current) {
      clearTimeout(reconnectTimeoutRef.current);
      reconnectTimeoutRef.current = null;
    }
    if (eventSourceRef.current) {
      eventSourceRef.current.close();
      eventSourceRef.current = null;
    }
  }, []);

  useEffect(() => {
    connect();
    return () => disconnect();
  }, [connect, disconnect]);

  return { reconnect: connect, disconnect };
}
