"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Download, Printer, X, XCircle, Loader2, ExternalLink } from "lucide-react";
import type { Invoice } from "@/lib/api";
import { paymentsAPI } from "@/lib/api";
import { cn } from "@/lib/utils";

interface InvoiceDetailModalProps {
  invoice: Invoice | null;
  isOpen: boolean;
  onClose: () => void;
  onInvoiceUpdate?: (updatedInvoice: Invoice) => void;
}

export function InvoiceDetailModal({
  invoice,
  isOpen,
  onClose,
  onInvoiceUpdate,
}: InvoiceDetailModalProps) {
  const [isCancelling, setIsCancelling] = useState(false);
  const [localInvoice, setLocalInvoice] = useState<Invoice | null>(null);
  
  // Use local invoice if it's been updated, otherwise use prop
  const currentInvoice = localInvoice?.id === invoice?.id ? localInvoice : invoice;
  
  if (!isOpen || !currentInvoice) return null;

  const isPending = currentInvoice.status === "pending";
  const isCancelled = currentInvoice.status === "cancelled";

  const handleCancelInvoice = async () => {
    if (!currentInvoice || isCancelling) return;
    
    setIsCancelling(true);
    try {
      await paymentsAPI.cancelInvoice(currentInvoice.id);
      const updatedInvoice = { ...currentInvoice, status: "cancelled" as const };
      setLocalInvoice(updatedInvoice);
      onInvoiceUpdate?.(updatedInvoice);
    } catch (err) {
      console.error("Failed to cancel invoice:", err);
    } finally {
      setIsCancelling(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getStatusStyles = (status: string) => {
    switch (status) {
      case "paid":
        return "bg-emerald-500/10 text-emerald-500 border-emerald-500/20";
      case "pending":
        return "bg-yellow-500/10 text-yellow-500 border-yellow-500/20";
      case "failed":
        return "bg-red-500/10 text-red-500 border-red-500/20";
      case "cancelled":
        return "bg-gray-500/10 text-gray-500 border-gray-500/20";
      case "expired":
        return "bg-orange-500/10 text-orange-500 border-orange-500/20";
      default:
        return "bg-gray-500/10 text-gray-500 border-gray-500/20";
    }
  };

  const handlePrint = () => {
    const printWindow = window.open("", "_blank");
    if (!printWindow) return;

    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>Invoice #${currentInvoice.id} - AI4Car</title>
          <style>
            * {
              margin: 0;
              padding: 0;
              box-sizing: border-box;
            }
            body {
              font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
              padding: 40px;
              color: #1a1a1a;
              line-height: 1.6;
            }
            .invoice-header {
              display: flex;
              justify-content: space-between;
              align-items: flex-start;
              margin-bottom: 40px;
              padding-bottom: 20px;
              border-bottom: 2px solid #e5e7eb;
            }
            .logo {
              font-size: 28px;
              font-weight: 700;
              color: #3b82f6;
            }
            .invoice-title {
              text-align: right;
            }
            .invoice-title h1 {
              font-size: 32px;
              color: #1a1a1a;
              margin-bottom: 8px;
            }
            .invoice-number {
              color: #6b7280;
              font-size: 14px;
            }
            .details-grid {
              display: grid;
              grid-template-columns: 1fr 1fr;
              gap: 40px;
              margin-bottom: 40px;
            }
            .detail-section h3 {
              font-size: 12px;
              text-transform: uppercase;
              letter-spacing: 0.05em;
              color: #6b7280;
              margin-bottom: 8px;
            }
            .detail-section p {
              font-size: 14px;
              color: #1a1a1a;
              margin-bottom: 4px;
            }
            .items-table {
              width: 100%;
              border-collapse: collapse;
              margin-bottom: 30px;
            }
            .items-table th {
              text-align: left;
              padding: 12px 16px;
              background: #f9fafb;
              font-size: 12px;
              text-transform: uppercase;
              letter-spacing: 0.05em;
              color: #6b7280;
              border-bottom: 1px solid #e5e7eb;
            }
            .items-table td {
              padding: 16px;
              border-bottom: 1px solid #e5e7eb;
              font-size: 14px;
            }
            .items-table .amount {
              text-align: right;
              font-weight: 600;
            }
            .total-section {
              display: flex;
              justify-content: flex-end;
              margin-bottom: 40px;
            }
            .total-box {
              background: #f9fafb;
              padding: 20px 30px;
              border-radius: 8px;
              min-width: 250px;
            }
            .total-row {
              display: flex;
              justify-content: space-between;
              margin-bottom: 8px;
              font-size: 14px;
            }
            .total-row.final {
              font-size: 18px;
              font-weight: 700;
              padding-top: 12px;
              border-top: 2px solid #e5e7eb;
              margin-top: 12px;
              margin-bottom: 0;
            }
            .status-badge {
              display: inline-block;
              padding: 4px 12px;
              border-radius: 20px;
              font-size: 12px;
              font-weight: 600;
              text-transform: uppercase;
            }
            .status-paid {
              background: #d1fae5;
              color: #059669;
            }
            .status-pending {
              background: #fef3c7;
              color: #d97706;
            }
.status-failed {
            background: #fee2e2;
            color: #dc2626;
            }
            .status-cancelled {
            background: #f3f4f6;
            color: #6b7280;
            }
            .status-expired {
            background: #ffedd5;
            color: #ea580c;
            }
            .footer {
              margin-top: 60px;
              padding-top: 20px;
              border-top: 1px solid #e5e7eb;
              text-align: center;
              color: #6b7280;
              font-size: 12px;
            }
            @media print {
              body {
                padding: 20px;
              }
            }
          </style>
        </head>
        <body>
          <div class="invoice-header">
            <div class="logo">AI4Car</div>
            <div class="invoice-title">
              <h1>INVOICE</h1>
              <p class="invoice-number">#${currentInvoice.id.toString().padStart(6, "0")}</p>
            </div>
          </div>
          
          <div class="details-grid">
            <div class="detail-section">
              <h3>Invoice Details</h3>
              <p><strong>Payment ID:</strong> ${currentInvoice.payment_id}</p>
              <p><strong>Order ID:</strong> ${currentInvoice.order_id || "N/A"}</p>
              <p><strong>Date:</strong> ${formatDate(currentInvoice.created_at)}</p>
              <p><strong>Status:</strong> <span class="status-badge status-${currentInvoice.status}">${currentInvoice.status.toUpperCase()}</span></p>
            </div>
            <div class="detail-section">
              <h3>Payment Information</h3>
              <p><strong>Currency:</strong> ${currentInvoice.currency}</p>
              ${currentInvoice.plan_name ? `<p><strong>Plan:</strong> ${currentInvoice.plan_name}</p>` : ""}
              <p><strong>Duration:</strong> ${(currentInvoice.extension_months ?? 1) === 1 ? "1 month" : `${currentInvoice.extension_months ?? 1} months`}</p>
            </div>
          </div>
          
          <table class="items-table">
            <thead>
              <tr>
                <th>Description</th>
                <th>Quantity</th>
                <th class="amount">Amount</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>${currentInvoice.plan_name || "Subscription"} (${(currentInvoice.extension_months ?? 1) === 1 ? "1 month" : `${currentInvoice.extension_months ?? 1} months`})</td>
                <td>1</td>
                <td class="amount">${currentInvoice.amount} ${currentInvoice.currency}</td>
              </tr>
            </tbody>
          </table>
          
          <div class="total-section">
            <div class="total-box">
              <div class="total-row">
                <span>Subtotal</span>
                <span>${currentInvoice.amount} ${currentInvoice.currency}</span>
              </div>
              <div class="total-row final">
                <span>Total</span>
                <span>${currentInvoice.amount} ${currentInvoice.currency}</span>
              </div>
            </div>
          </div>
          
          <div class="footer">
            <p>Thank you for your business!</p>
            <p>AI4Car - AI-Powered Vehicle Diagnostics</p>
          </div>
        </body>
      </html>
    `);

    printWindow.document.close();
    printWindow.focus();

    setTimeout(() => {
      printWindow.print();
    }, 250);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-foreground/20 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative w-full max-w-2xl bg-card border border-border rounded-2xl shadow-xl overflow-hidden max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-border shrink-0">
          <div className="flex items-center gap-3">
            <h2 className={cn(
              "text-lg font-semibold",
              isCancelled ? "text-muted-foreground" : "text-foreground"
            )}>
              Invoice #{currentInvoice.id.toString().padStart(6, "0")}
            </h2>
            <span
              className={cn(
                "px-2.5 py-0.5 text-xs font-medium rounded-full border",
                getStatusStyles(currentInvoice.status)
              )}
            >
              {currentInvoice.status.toUpperCase()}
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
            aria-label="Close"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 overflow-y-auto flex-1">
          {/* Invoice Details Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="space-y-3">
              <h3 className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                Invoice Details
              </h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Payment ID</span>
                  <span className="font-mono text-xs truncate max-w-[180px]">
                    {currentInvoice.payment_id}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Order ID</span>
                  <span className="font-mono text-xs truncate max-w-[180px]">
                    {currentInvoice.order_id || "N/A"}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Date</span>
                  <span>{formatDate(currentInvoice.created_at)}</span>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <h3 className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                Payment Info
              </h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Currency</span>
                  <span>{currentInvoice.currency}</span>
                </div>
                {currentInvoice.plan_name && (
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Plan</span>
                    <span>{currentInvoice.plan_name}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Duration</span>
                  <span>
                    {(currentInvoice.extension_months ?? 1) === 1 
                      ? "1 month" 
                      : `${currentInvoice.extension_months ?? 1} months`}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Separator */}
          <div className="h-px bg-border mb-6" />

          {/* Line Items */}
          <div className="space-y-3 mb-6">
            <h3 className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
              Items
            </h3>
            <div className="rounded-lg border border-border overflow-hidden">
              <div className="grid grid-cols-[1fr_80px_100px] gap-4 p-3 bg-muted/50 text-xs font-medium text-muted-foreground uppercase tracking-wide">
                <span>Description</span>
                <span className="text-center">Qty</span>
                <span className="text-right">Amount</span>
              </div>
              <div className={cn(
                "grid grid-cols-[1fr_80px_100px] gap-4 p-3 text-sm",
                isCancelled && "text-muted-foreground"
              )}>
                <span className={isCancelled ? "line-through" : ""}>
                  {currentInvoice.plan_name || "Subscription"}
                  <span className="text-muted-foreground ml-1">
                    ({(currentInvoice.extension_months ?? 1) === 1 ? "1 month" : `${currentInvoice.extension_months ?? 1} months`})
                  </span>
                </span>
                <span className="text-center">1</span>
                <span className={cn(
                  "text-right font-medium",
                  isCancelled && "line-through"
                )}>
                  {currentInvoice.amount} {currentInvoice.currency}
                </span>
              </div>
            </div>
          </div>

          {/* Separator */}
          <div className="h-px bg-border mb-6" />

          {/* Total */}
          <div className="flex justify-end">
            <div className="w-64 space-y-2">
              <div className={cn(
                "flex justify-between text-sm",
                isCancelled && "text-muted-foreground"
              )}>
                <span className="text-muted-foreground">Subtotal</span>
                <span className={isCancelled ? "line-through" : ""}>
                  {currentInvoice.amount} {currentInvoice.currency}
                </span>
              </div>
              <div className="h-px bg-border" />
              <div className={cn(
                "flex justify-between text-lg font-semibold",
                isCancelled && "text-muted-foreground"
              )}>
                <span>Total</span>
                <span className={isCancelled ? "line-through" : ""}>
                  {currentInvoice.amount} {currentInvoice.currency}
                </span>
              </div>
            </div>
          </div>

          {/* Cancelled Notice */}
          {isCancelled && (
            <div className="mt-6 p-4 bg-muted/50 rounded-lg border border-border">
              <div className="flex items-center gap-2 text-muted-foreground">
                <XCircle className="h-5 w-5" />
                <span className="text-sm font-medium">This invoice has been cancelled</span>
              </div>
              <p className="text-xs text-muted-foreground mt-1 ml-7">
                You can create a new invoice if you wish to proceed with a new payment.
              </p>
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="flex flex-wrap justify-between gap-3 p-5 border-t border-border shrink-0">
          {/* Left side - Cancel action for pending invoices */}
          <div>
            {isPending && (
              <Button
                variant="destructive"
                onClick={handleCancelInvoice}
                disabled={isCancelling}
              >
                {isCancelling ? (
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                ) : (
                  <XCircle className="h-4 w-4 mr-2" />
                )}
                Cancel Payment
              </Button>
            )}
          </div>
          
          {/* Right side - View/Print actions */}
          <div className="flex gap-3">
            <Button variant="outline" onClick={onClose}>
              <X className="h-4 w-4 mr-2" />
              Close
            </Button>
            <Button 
              variant="outline" 
              onClick={handlePrint}
              disabled={isCancelled}
            >
              <Printer className="h-4 w-4 mr-2" />
              Print
            </Button>
            <Button 
              onClick={handlePrint}
              disabled={isCancelled}
            >
              <Download className="h-4 w-4 mr-2" />
              Download PDF
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
