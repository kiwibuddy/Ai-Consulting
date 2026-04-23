import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { format } from "date-fns";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { EmptyState } from "@/components/empty-state";
import { TableSkeleton } from "@/components/loading-skeleton";
import { CreditCard, FileText, CheckCircle, Clock, AlertCircle, ExternalLink } from "lucide-react";
import { useLocation } from "wouter";
import { useToast } from "@/hooks/use-toast";
import { useEffect } from "react";
import { apiRequest } from "@/lib/queryClient";

interface Payment {
  id: string;
  amount: number;
  currency: string;
  status: string;
  provider: string;
  description: string | null;
  paidAt: string | null;
  createdAt: string;
  receiptUrl: string | null;
}

interface Invoice {
  id: string;
  invoiceNumber: string;
  amount: number;
  currency: string;
  status: string;
  dueDate: string | null;
  paidAt: string | null;
  items: string;
  createdAt: string;
  stripeInvoicePdf: string | null;
  stripeHostedInvoiceUrl: string | null;
}

interface PaymentProviders {
  stripe: boolean;
  paypal: boolean;
}

export default function ClientBilling() {
  const [location] = useLocation();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: payments, isLoading: paymentsLoading } = useQuery<Payment[]>({
    queryKey: ["/api/client/payments"],
  });

  const { data: invoices, isLoading: invoicesLoading } = useQuery<Invoice[]>({
    queryKey: ["/api/client/invoices"],
  });

  const { data: providers } = useQuery<PaymentProviders>({
    queryKey: ["/api/payments/providers"],
  });

  const payStripeMutation = useMutation({
    mutationFn: (invoiceId: string) =>
      apiRequest<{ url: string }>("POST", "/api/payments/stripe/checkout", { invoiceId }),
    onSuccess: (res) => {
      if (res?.url) window.location.href = res.url;
    },
    onError: () => {
      toast({ title: "Could not start payment", variant: "destructive" });
    },
  });

  const payPaypalMutation = useMutation({
    mutationFn: (invoiceId: string) =>
      apiRequest<{ approvalUrl: string }>("POST", "/api/payments/paypal/create-order", { invoiceId }),
    onSuccess: (res) => {
      if (res?.approvalUrl) window.location.href = res.approvalUrl;
    },
    onError: () => {
      toast({ title: "Could not start PayPal", variant: "destructive" });
    },
  });

  const portalMutation = useMutation({
    mutationFn: () => apiRequest<{ url: string }>("POST", "/api/client/billing/portal", {}),
    onSuccess: (r) => {
      if (r?.url) window.location.href = r.url;
    },
  });

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get("success") === "true") {
      toast({ title: "Payment successful", description: "Thank you for your payment." });
      queryClient.invalidateQueries({ queryKey: ["/api/client/payments"] });
      queryClient.invalidateQueries({ queryKey: ["/api/client/invoices"] });
      window.history.replaceState({}, "", "/client/billing");
    } else if (params.get("cancelled") === "true" || params.get("error") === "capture_failed") {
      toast({
        title: "Payment not completed",
        description: "You can try again from an unpaid invoice.",
        variant: "destructive",
      });
      window.history.replaceState({}, "", "/client/billing");
    }
  }, [location, toast, queryClient]);

  const isLoading = paymentsLoading || invoicesLoading;

  if (isLoading) {
    return (
      <div className="p-6">
        <TableSkeleton />
      </div>
    );
  }

  const formatAmount = (amount: number, currency: string) => {
    return new Intl.NumberFormat("en-NZ", {
      style: "currency",
      currency: currency.toUpperCase(),
    }).format(amount / 100);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
      case "paid":
        return <Badge variant="default"><CheckCircle className="h-3 w-3 mr-1" /> Paid</Badge>;
      case "pending":
      case "sent":
        return <Badge variant="secondary"><Clock className="h-3 w-3 mr-1" /> Pending</Badge>;
      case "overdue":
        return <Badge variant="destructive"><AlertCircle className="h-3 w-3 mr-1" /> Overdue</Badge>;
      case "refunded":
        return <Badge variant="outline">Refunded</Badge>;
      case "failed":
        return <Badge variant="destructive">Failed</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const unpaidInvoices = invoices?.filter((inv) => inv.status === "sent" || inv.status === "overdue") || [];
  const totalOwed = unpaidInvoices.reduce((sum, inv) => sum + inv.amount, 0);
  const singleCurrency = unpaidInvoices.length > 0 && unpaidInvoices.every((i) => i.currency === unpaidInvoices[0]!.currency);
  const displayCurrency = singleCurrency && unpaidInvoices[0] ? unpaidInvoices[0].currency : "nzd";

  return (
    <div className="space-y-6 p-6">
      <div>
        <h1 className="font-serif text-3xl font-bold tracking-tight">Billing</h1>
        <p className="text-muted-foreground">
          View your invoices, pay online, and download receipts.
        </p>
        {providers?.stripe && (
          <Button
            variant="outline"
            size="sm"
            className="mt-3"
            onClick={() => portalMutation.mutate()}
            disabled={portalMutation.isPending}
          >
            <ExternalLink className="h-4 w-4 mr-2" />
            Manage card &amp; subscription (Stripe)
          </Button>
        )}
      </div>

      {totalOwed > 0 && (
        <Card className="border-amber-200 dark:border-amber-900 bg-amber-50/50 dark:bg-amber-900/10">
          <CardContent className="p-4">
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="rounded-full bg-amber-100 dark:bg-amber-900/30 p-3">
                  <AlertCircle className="h-5 w-5 text-amber-600 dark:text-amber-400" />
                </div>
                <div>
                  <p className="font-medium">Outstanding balance</p>
                  <p className="text-sm text-muted-foreground">
                    {unpaidInvoices.length} unpaid invoice{unpaidInvoices.length > 1 ? "s" : ""}
                    {!singleCurrency && " (mixed currencies — see table)"}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold">
                  {singleCurrency
                    ? formatAmount(totalOwed, displayCurrency)
                    : "—"}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CreditCard className="h-5 w-5" />
            Payment methods
          </CardTitle>
          <CardDescription>
            Available for your account (set by your consultant).
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-4">
            {providers?.stripe && (
              <div className="flex items-center gap-2 px-4 py-2 border rounded-md">
                <span className="font-medium">Card (Stripe)</span>
                <Badge variant="outline">Enabled</Badge>
              </div>
            )}
            {providers?.paypal && (
              <div className="flex items-center gap-2 px-4 py-2 border rounded-md">
                <span className="font-medium">PayPal</span>
                <Badge variant="outline">Enabled</Badge>
              </div>
            )}
            {!providers?.stripe && !providers?.paypal && (
              <p className="text-muted-foreground">
                No online payment methods are configured. Contact your consultant.
              </p>
            )}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Invoices
          </CardTitle>
        </CardHeader>
        <CardContent>
          {invoices && invoices.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Invoice #</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Due</TableHead>
                  <TableHead>PDF</TableHead>
                  <TableHead className="text-right">Pay</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {invoices.map((invoice) => (
                  <TableRow key={invoice.id}>
                    <TableCell className="font-medium">{invoice.invoiceNumber}</TableCell>
                    <TableCell>{formatAmount(invoice.amount, invoice.currency)}</TableCell>
                    <TableCell>{getStatusBadge(invoice.status)}</TableCell>
                    <TableCell>
                      {invoice.dueDate ? format(new Date(invoice.dueDate), "MMM d, yyyy") : "—"}
                    </TableCell>
                    <TableCell>
                      {invoice.stripeInvoicePdf ? (
                        <a
                          className="text-primary underline text-sm"
                          href={invoice.stripeInvoicePdf}
                          target="_blank"
                          rel="noreferrer"
                        >
                          Download
                        </a>
                      ) : (
                        "—"
                      )}
                    </TableCell>
                    <TableCell className="text-right">
                      {(invoice.status === "sent" || invoice.status === "overdue") && (
                        <div className="flex justify-end gap-1 flex-wrap">
                          {providers?.stripe && (
                            <Button
                              size="sm"
                              onClick={() => payStripeMutation.mutate(invoice.id)}
                              disabled={payStripeMutation.isPending}
                            >
                              Pay (card)
                            </Button>
                          )}
                          {providers?.paypal && (
                            <Button
                              size="sm"
                              variant="secondary"
                              onClick={() => payPaypalMutation.mutate(invoice.id)}
                              disabled={payPaypalMutation.isPending}
                            >
                              PayPal
                            </Button>
                          )}
                        </div>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <EmptyState
              icon={FileText}
              title="No invoices yet"
              description="You don’t have any invoices at the moment."
            />
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CreditCard className="h-5 w-5" />
            Payment history
          </CardTitle>
        </CardHeader>
        <CardContent>
          {payments && payments.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Method</TableHead>
                  <TableHead>Receipt</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {payments.map((payment) => (
                  <TableRow key={payment.id}>
                    <TableCell>
                      {payment.paidAt
                        ? format(new Date(payment.paidAt), "MMM d, yyyy")
                        : format(new Date(payment.createdAt), "MMM d, yyyy")}
                    </TableCell>
                    <TableCell>{payment.description || "Payment"}</TableCell>
                    <TableCell>{formatAmount(payment.amount, payment.currency)}</TableCell>
                    <TableCell>{getStatusBadge(payment.status)}</TableCell>
                    <TableCell>
                      <Badge variant="outline">
                        {payment.provider === "stripe" ? "Card" : "PayPal"}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {payment.receiptUrl ? (
                        <a
                          className="text-primary text-sm underline"
                          href={payment.receiptUrl}
                          target="_blank"
                          rel="noreferrer"
                        >
                          View
                        </a>
                      ) : (
                        "—"
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <EmptyState
              icon={CreditCard}
              title="No payment history"
              description="You haven’t made any payments yet."
            />
          )}
        </CardContent>
      </Card>
    </div>
  );
}
