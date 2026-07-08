/**
 * API Service for authentication and user management
 * Backend: https://backend-obd-production.up.railway.app/api/v1
 */

const BASE_URL = "https://backend-obd-production.up.railway.app/api/v1";

// Types
export interface User {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  phone?: string | null;
  avatar?: string | null;
  is_verified: boolean;
  created_at?: string;
  updated_at?: string;
}

export interface AuthResponse {
  access: string;
  refresh: string;
  user?: User;
}

export interface ProfileResponse {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  phone?: string | null;
  avatar?: string | null;
  is_verified: boolean;
}

/**
 * Get default headers for API requests
 */
const getHeaders = (includeAuth = false, language = "ru") => {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    "Accept-Language": language,
    "X-Locale": language,
  };

  if (includeAuth) {
    const accessToken =
      typeof window !== "undefined"
        ? localStorage.getItem("access_token")
        : null;
    if (accessToken) {
      headers["Authorization"] = `Bearer ${accessToken}`;
    }
  }

  return headers;
};

/**
 * Handle API response and errors
 */
const handleResponse = async (response: Response) => {
  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    const error = new Error(
      data.detail || data.message || "API Error",
    ) as Error & { status: number; data: unknown };
    error.status = response.status;
    error.data = data;
    throw error;
  }

  return data;
};

/**
 * Refresh access token using refresh token
 */
const refreshAccessToken = async () => {
  const refreshToken =
    typeof window !== "undefined"
      ? localStorage.getItem("refresh_token")
      : null;

  if (!refreshToken) {
    throw new Error("No refresh token available");
  }

  const response = await fetch(`${BASE_URL}/auth/token/refresh/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ refresh: refreshToken }),
  });

  const data = await handleResponse(response);

  if (typeof window !== "undefined") {
    localStorage.setItem("access_token", data.access);
    if (data.refresh) {
      localStorage.setItem("refresh_token", data.refresh);
    }
  }

  return data;
};

/**
 * Make authenticated request with auto-refresh on 401
 */
const authenticatedRequest = async (url: string, options: RequestInit = {}) => {
  const response = await fetch(url, {
    ...options,
    headers: {
      ...getHeaders(true),
      ...((options.headers as Record<string, string>) || {}),
    },
  });

  if (response.status === 401) {
    try {
      await refreshAccessToken();

      const retryResponse = await fetch(url, {
        ...options,
        headers: {
          ...getHeaders(true),
          ...((options.headers as Record<string, string>) || {}),
        },
      });

      return handleResponse(retryResponse);
    } catch {
      if (typeof window !== "undefined") {
        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");
      }
      // Включаем "401" в сообщение чтобы auth-context мог определить тип ошибки
      throw new Error("401 Session expired");
    }
  }

  return handleResponse(response);
};

/**
 * Auth API
 */
export const authAPI = {
  /**
   * Register new user
   */
  register: async (
    email: string,
    password1: string,
    password2: string,
  ): Promise<{ detail: string }> => {
    const response = await fetch(`${BASE_URL}/auth/register/mobile/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password1, password2 }),
    });

    return handleResponse(response);
  },

  /**
   * Login with email and password
   */
  login: async (email: string, password: string): Promise<AuthResponse> => {
    const response = await fetch(`${BASE_URL}/auth/email-login/`, {
      method: "POST",
      headers: getHeaders(),
      body: JSON.stringify({ email, password }),
    });

    const data = await handleResponse(response);

    if (typeof window !== "undefined") {
      localStorage.setItem("access_token", data.access);
      localStorage.setItem("refresh_token", data.refresh);
    }

    return data;
  },

  /**
   * Google Sign-In
   */
  googleLogin: async (
    idToken: string,
    hardwareId: string | null = null,
    deviceName: string | null = null,
  ): Promise<AuthResponse> => {
    const body: Record<string, string> = { id_token: idToken };
    if (hardwareId) body.hardware_id = hardwareId;
    if (deviceName) body.device_name = deviceName;

    const response = await fetch(`${BASE_URL}/auth/google/`, {
      method: "POST",
      headers: getHeaders(),
      body: JSON.stringify(body),
    });

    const data = await handleResponse(response);

    if (typeof window !== "undefined") {
      localStorage.setItem("access_token", data.access);
      localStorage.setItem("refresh_token", data.refresh);
    }

    return data;
  },

  /**
   * Apple Sign-In
   */
  appleLogin: async (
    idToken: string,
    hardwareId: string | null = null,
    deviceName: string | null = null,
  ): Promise<AuthResponse> => {
    const body: Record<string, string> = { id_token: idToken };
    if (hardwareId) body.hardware_id = hardwareId;
    if (deviceName) body.device_name = deviceName;

    const response = await fetch(`${BASE_URL}/auth/apple/`, {
      method: "POST",
      headers: getHeaders(),
      body: JSON.stringify(body),
    });

    const data = await handleResponse(response);

    if (typeof window !== "undefined") {
      localStorage.setItem("access_token", data.access);
      localStorage.setItem("refresh_token", data.refresh);
    }

    return data;
  },

  /**
   * Authenticate and get user profile with license
   */
  authenticate: async () => {
    return authenticatedRequest(`${BASE_URL}/auth/authenticate/`, {
      method: "POST",
    });
  },

  /**
   * Logout - clear tokens
   */
  logout: () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("access_token");
      localStorage.removeItem("refresh_token");
    }
  },

  /**
   * Check if user is authenticated
   */
  isAuthenticated: () => {
    if (typeof window === "undefined") return false;
    return !!localStorage.getItem("access_token");
  },

  /**
   * Resend verification email
   */
  resendVerification: async (email: string): Promise<{ detail: string }> => {
    const response = await fetch(`${BASE_URL}/auth/resend-verification/`, {
      method: "POST",
      headers: getHeaders(),
      body: JSON.stringify({ email }),
    });

    return handleResponse(response);
  },
};

/**
 * User API
 */
export const userAPI = {
  /**
   * Get current user profile
   */
  getProfile: async (): Promise<ProfileResponse> => {
    return authenticatedRequest(`${BASE_URL}/users/me/`);
  },

  /**
   * Update user profile
   */
  updateProfile: async (data: {
    first_name?: string;
    last_name?: string;
    phone?: string;
  }): Promise<ProfileResponse> => {
    return authenticatedRequest(`${BASE_URL}/users/me/`, {
      method: "PATCH",
      body: JSON.stringify(data),
    });
  },

  /**
   * Upload avatar
   */
  uploadAvatar: async (avatarFile: File): Promise<ProfileResponse> => {
    const formData = new FormData();
    formData.append("avatar", avatarFile);

    const accessToken =
      typeof window !== "undefined"
        ? localStorage.getItem("access_token")
        : null;

    const response = await fetch(`${BASE_URL}/users/me/avatar/`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      body: formData,
    });

    return handleResponse(response);
  },

  /**
   * Get connected OAuth providers
   */
  getConnections: async () => {
    return authenticatedRequest(`${BASE_URL}/users/me/connections/`);
  },

  /**
   * Get user devices
   */
  getDevices: async () => {
    return authenticatedRequest(`${BASE_URL}/users/me/devices/`);
  },
};

/**
 * Password API
 */
export const passwordAPI = {
  /**
   * Request password reset
   */
  requestReset: async (email: string): Promise<{ detail: string }> => {
    const response = await fetch(`${BASE_URL}/auth/password/reset/`, {
      method: "POST",
      headers: getHeaders(),
      body: JSON.stringify({ email }),
    });

    return handleResponse(response);
  },

  /**
   * Confirm password reset
   */
  confirmReset: async (
    uid: string,
    token: string,
    newPassword1: string,
    newPassword2: string,
  ): Promise<{ detail: string }> => {
    const response = await fetch(`${BASE_URL}/auth/password/reset/confirm/`, {
      method: "POST",
      headers: getHeaders(),
      body: JSON.stringify({
        uid,
        token,
        new_password1: newPassword1,
        new_password2: newPassword2,
      }),
    });

    return handleResponse(response);
  },

  /**
   * Change password (when logged in)
   */
  changePassword: async (
    oldPassword: string,
    newPassword1: string,
    newPassword2: string,
  ): Promise<{ detail: string }> => {
    return authenticatedRequest(`${BASE_URL}/auth/password/change/`, {
      method: "POST",
      body: JSON.stringify({
        old_password: oldPassword,
        new_password1: newPassword1,
        new_password2: newPassword2,
      }),
    });
  },
};

/**
 * Billing API
 */
export const billingAPI = {
  getSubscription: async () => {
    return authenticatedRequest(`${BASE_URL}/billing/subscription/`);
  },

  getPlans: async () => {
    return authenticatedRequest(`${BASE_URL}/billing/plans/`);
  },

  getInvoices: async () => {
    return authenticatedRequest(`${BASE_URL}/billing/invoices/`);
  },

  getPaymentMethods: async () => {
    return authenticatedRequest(`${BASE_URL}/billing/payment-methods/`);
  },

  subscribe: async (planId: number, paymentMethodId?: string | null) => {
    const body: Record<string, unknown> = { plan_id: planId };
    if (paymentMethodId) {
      body.payment_method_id = paymentMethodId;
    }
    return authenticatedRequest(`${BASE_URL}/billing/subscribe/`, {
      method: "POST",
      body: JSON.stringify(body),
    });
  },

  cancelSubscription: async () => {
    return authenticatedRequest(`${BASE_URL}/billing/subscription/cancel/`, {
      method: "POST",
    });
  },

  getCustomerPortal: async () => {
    return authenticatedRequest(`${BASE_URL}/billing/portal/`);
  },
};

/**
 * Payment Types
 */
export interface CreatePaymentRequest {
  amount: number;
  currency: string;
  order_id: string;
  description: string;
  plan_id: string;
  months?: number;
  url_callback?: string;
}

export interface CreatePaymentBackendResponse {
  payment_id: string;
  payment_url: string;
  status: string;
  amount: number;
  currency: string;
}

// Normalized frontend payment response
export interface PaymentResponse {
  payment_id: string;
  payment_url: string;
  status: string;
}

export interface PaymentStatusResponse {
  payment_id: string;
  order_id: string;
  amount: number;
  currency: string;
  status: string;
  payment_url: string;
  created_at: string;
  updated_at: string;
}

export interface ActivePaymentResponse {
  has_active_payment: boolean;
  payment?: {
    payment_id: string;
    payment_url: string;
    amount: number;
    currency: string;
    status: string;
    plan_id: string;
    plan_name: string;
    created_at: string;
  };
}

export interface SubscriptionStatusResponse {
  has_subscription: boolean;
  subscription?: {
    id: number;
    status: "active" | "expired" | "pending" | "cancelled";
    plan_id: string;
    plan_name: string;
    plan_price: number;
    plan_currency: string;
    plan_interval: string;
    start_date: string;
    end_date: string;
    remaining_days: number;
  };
}

export interface RenewSubscriptionRequest {
  plan_id?: string;
  months: number;
}

export interface RenewSubscriptionResponse {
  subscription_id: string;
  plan_id: string;
  plan_name: string;
  new_end_date: string;
  payment: {
    payment_id: string;
    payment_url: string;
    amount: number;
    currency: string;
  };
}

export interface Invoice {
  id: number;
  amount: number;
  currency: string;
  status: "paid" | "pending" | "failed" | "cancelled" | "expired";
  payment_id: string;
  order_id: string;
  created_at: string;
  updated_at: string;
  plan_name?: string;
  plan_interval?: string;
  extension_months?: number | null;
  payment_provider?: "heleket" | "centapp";
}

/**
 * Card Payment Types (Cent.app)
 */
export interface CreateCardPaymentRequest {
  amount: number;
  currency: string;
  plan_id: string;
  description?: string;
  months?: number;
  payment_method?: "BANK_CARD" | "SBP";
}

export interface CardPaymentResponse {
  payment_id: string;
  payment_url: string;
  link_url?: string;
  status: string;
  amount: number;
  currency: string;
  plan_id: string;
  extension_months: number;
  provider: "centapp";
}

export interface ActiveCardPaymentResponse {
  has_active_payment: boolean;
  payment?: {
    payment_id: string;
    payment_url: string;
    amount: number;
    currency: string;
    status: string;
    created_at: string;
    provider: "centapp";
  };
}

export interface CardPaymentStatusResponse {
  payment_id: string;
  amount: number;
  currency: string;
  status: string;
  created_at: string;
  provider: "centapp";
}

/**
 * Webhook URL for Heleket payment notifications
 */
const WEBHOOK_URL =
  "https://backend-obd-production.up.railway.app/api/v1/payments/webhook";

/**
 * Crypto Payments API (Heleket)
 */
export const paymentsAPI = {
  createPayment: async (
    data: CreatePaymentRequest,
  ): Promise<PaymentResponse> => {
    // Add webhook_url to the payment request so Heleket can notify the backend
    const payloadWithWebhook = {
      ...data,
      url_callback: WEBHOOK_URL,
    };

    const response: CreatePaymentBackendResponse = await authenticatedRequest(
      `${BASE_URL}/payments/create`,
      {
        method: "POST",
        body: JSON.stringify(payloadWithWebhook),
      },
    );

    const invoice = response;

    if (!invoice?.payment_id || !invoice?.payment_url) {
      throw new Error("Invalid payment response from backend");
    }

    return {
      payment_id: invoice.payment_id,
      payment_url: invoice.payment_url,
      status: invoice.status,
    };
  },

  getPaymentStatus: async (
    paymentId: string,
  ): Promise<PaymentStatusResponse> => {
    return authenticatedRequest(`${BASE_URL}/payments/${paymentId}/status`);
  },

  getActivePayment: async (): Promise<ActivePaymentResponse> => {
    return authenticatedRequest(`${BASE_URL}/payments/active`);
  },

  getSubscriptionStatus: async (): Promise<SubscriptionStatusResponse> => {
    // Backend has only /billing/subscription/ which returns either:
    // - Active subscription object with nested plan
    // - { status: "inactive" } if no subscription
    const response = await authenticatedRequest(
      `${BASE_URL}/billing/subscription/`,
    );

    // Normalize response to SubscriptionStatusResponse format
    if (response.status === "inactive" || !response.id) {
      return {
        has_subscription: false,
      };
    }

    // Extract plan details from nested plan object
    const plan = response.plan || {};

    // Has active subscription
    return {
      has_subscription: true,
      subscription: {
        id: response.id,
        status: response.status || "active",
        plan_id: plan.id || response.plan_id,
        plan_name: plan.title || response.plan_name || "Unknown Plan",
        plan_price: plan.price || 0,
        plan_currency: plan.currency || "USD",
        plan_interval: plan.interval || "month",
        start_date: response.start_date,
        end_date: response.end_date,
        remaining_days: response.remaining_days || 0,
      },
    };
  },

  getInvoices: async (): Promise<Invoice[]> => {
    return authenticatedRequest(`${BASE_URL}/billing/invoices/`);
  },

  renewSubscription: async (
    data: RenewSubscriptionRequest,
  ): Promise<RenewSubscriptionResponse> => {
    return authenticatedRequest(`${BASE_URL}/subscriptions/renew`, {
      method: "POST",
      body: JSON.stringify(data),
    });
  },

  cancelPendingRenewal: async (
    invoiceId: string,
  ): Promise<{ success: boolean; message: string; invoice_id: string }> => {
    return authenticatedRequest(`${BASE_URL}/subscriptions/renew/${invoiceId}/cancel`, {
      method: "PATCH",
    });
  },

  cancelInvoice: async (
    invoiceId: number,
  ): Promise<{ success: boolean; message: string }> => {
    return authenticatedRequest(`${BASE_URL}/billing/invoices/${invoiceId}/cancel`, {
      method: "PATCH",
    });
  },
};

/**
 * Card Payments API (Cent.app)
 */
export const cardPaymentsAPI = {
  createPayment: async (
    data: CreateCardPaymentRequest,
  ): Promise<CardPaymentResponse> => {
    const response = await authenticatedRequest(
      `${BASE_URL}/card-payments/create`,
      {
        method: "POST",
        body: JSON.stringify(data),
      },
    );

    return response;
  },

  getActivePayment: async (): Promise<ActiveCardPaymentResponse> => {
    return authenticatedRequest(`${BASE_URL}/card-payments/active`);
  },

  getPaymentStatus: async (
    paymentId: string,
  ): Promise<CardPaymentStatusResponse> => {
    return authenticatedRequest(`${BASE_URL}/card-payments/${paymentId}/status`);
  },
};

/**
 * Diagnostics Chat API
 */
export const chatAPI = {
  getSessions: async (page = 1, pageSize = 20, search = "") => {
    let url = `${BASE_URL}/chat/sessions/?page=${page}&page_size=${pageSize}`;
    if (search) {
      url += `&search=${encodeURIComponent(search)}`;
    }
    return authenticatedRequest(url);
  },

  createSession: async (vehicleId: string | null = null) => {
    const body: Record<string, string> = {};
    if (vehicleId) {
      body.vehicle_id = vehicleId;
    }
    return authenticatedRequest(`${BASE_URL}/chat/sessions/`, {
      method: "POST",
      body: JSON.stringify(body),
    });
  },

  getSessionMessages: async (sessionId: string | number) => {
    return authenticatedRequest(`${BASE_URL}/chat/sessions/${sessionId}/`);
  },

  sendMessage: async (sessionId: string | number, message: string) => {
    if (!sessionId) {
      throw new Error("Session ID is required");
    }

    if (!message || !message.trim()) {
      throw new Error("Message is required");
    }

    return authenticatedRequest(
      `${BASE_URL}/chat/sessions/${sessionId}/messages/`,
      {
        method: "POST",
        body: JSON.stringify({ message: message.trim() }),
      },
    );
  },

  deleteSession: async (sessionId: string | number) => {
    return authenticatedRequest(`${BASE_URL}/chat/sessions/${sessionId}/`, {
      method: "DELETE",
    });
  },
};

/**
 * Token management
 */
export const tokenManager = {
  setTokens: (access: string, refresh: string) => {
    if (typeof window !== "undefined") {
      localStorage.setItem("access_token", access);
      localStorage.setItem("refresh_token", refresh);
    }
  },

  getAccessToken: () => {
    if (typeof window === "undefined") return null;
    return localStorage.getItem("access_token");
  },

  getRefreshToken: () => {
    if (typeof window === "undefined") return null;
    return localStorage.getItem("refresh_token");
  },

  clearTokens: () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("access_token");
      localStorage.removeItem("refresh_token");
    }
  },

  hasValidTokens: () => {
    if (typeof window === "undefined") return false;
    // Only access token is required - refresh token is optional for mobile-bridge auth
    // where the backend sets a session cookie instead of returning a refresh token
    return !!localStorage.getItem("access_token");
  },
};

/**
 * Support Types
 */
export interface SupportTicket {
  id: string;
  subject: string;
  status: 'open' | 'pending' | 'resolved' | 'closed';
  priority: 'low' | 'medium' | 'high';
  messages_count: number;
  is_answered: boolean;
  last_message_at: string | null;
  created_at: string;
  updated_at: string;
  user_id?: string;
  user_email?: string;
  first_name?: string;
  last_name?: string;
  unread_count?: number;
}

export interface SupportMessage {
  id: string;
  sender_type: 'user' | 'admin';
  sender_id: string;
  sender_name: string;
  message: string;
  is_read: boolean;
  created_at: string;
}

export interface SupportTicketDetail extends SupportTicket {
  messages: SupportMessage[];
}

export interface CreateTicketRequest {
  subject: string;
  message: string;
  priority?: 'low' | 'medium' | 'high';
}

export interface TicketsListResponse {
  tickets: SupportTicket[];
  total: number;
  page: number;
  pages: number;
}

/**
 * Support API (User side)
 */
export const supportAPI = {
  /**
   * Get user's support tickets
   */
  getTickets: async (page = 1, limit = 20, status = ""): Promise<TicketsListResponse> => {
    let url = `${BASE_URL}/support/tickets?page=${page}&limit=${limit}`;
    if (status) {
      url += `&status=${encodeURIComponent(status)}`;
    }
    return authenticatedRequest(url);
  },

  /**
   * Get single ticket with messages
   */
  getTicket: async (ticketId: string): Promise<SupportTicketDetail> => {
    return authenticatedRequest(`${BASE_URL}/support/tickets/${ticketId}`);
  },

  /**
   * Create new support ticket
   */
  createTicket: async (data: CreateTicketRequest): Promise<SupportTicket> => {
    return authenticatedRequest(`${BASE_URL}/support/tickets`, {
      method: "POST",
      body: JSON.stringify(data),
    });
  },

  /**
   * Send message to ticket
   */
  sendMessage: async (ticketId: string, message: string): Promise<SupportMessage> => {
    return authenticatedRequest(`${BASE_URL}/support/tickets/${ticketId}/messages`, {
      method: "POST",
      body: JSON.stringify({ message }),
    });
  },

  /**
   * Close ticket
   */
  closeTicket: async (ticketId: string): Promise<SupportTicket> => {
    return authenticatedRequest(`${BASE_URL}/support/tickets/${ticketId}`, {
      method: "PATCH",
      body: JSON.stringify({ status: "closed" }),
    });
  },
};

export default {
  authAPI,
  userAPI,
  passwordAPI,
  billingAPI,
  paymentsAPI,
  chatAPI,
  supportAPI,
  tokenManager,
};
