import { useParams, useLocation } from "wouter";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { apiRequest, ApiError } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { SiteHeader } from "@/components/site-header";
import { PageSEO } from "@/components/page-seo";
import { Loader2, CheckCircle, ExternalLink } from "lucide-react";
type PublicInvoice = {
  id: string;
  invoiceNumber: string;
  amount: number;
  currency: string;
  status: string;
  dueDate: string | null;
  items: string;
  isPaid?: boolean;
  paidAt?: string | null;
};

export default function PublicPayPage() {
  const params = useParams<{ token: string }>();
  const token = params.token || "";
  const { toast } = useToast();
  const [location] = useLocation();
  const sp = new URLSearchParams(
    typeof window !== "undefined" ? window.location.search : location.includes("?") ? `?${location.split("?")[1]}` : ""
  );

  const { data: inv, isLoading, error } = useQuery<PublicInvoice>({
    queryKey: ["/api/public/invoices", token],
    queryFn: async () => {
      return apiRequest("GET", `/api/public/invoices/${token}`);
    },
    enabled: !!token,
  });

  const { data: methods } = useQuery<{ stripe: boolean; paypal: boolean }>({
    queryKey: ["/api/public/payment-methods"],
  });

  const payMutation = useMutation({
    mutationFn: async (provider: "stripe" | "paypal") => {
      return apiRequest<{ url: string; mode: string; orderId?: string }>(
        "POST",
        `/api/public/invoices/${token}/checkout`,
        { provider }
      );
    },
    onSuccess: (res) => {
      if (res.url) {
        window.location.href = res.url;
      }
    },
    onError: (err) => {
      const msg = err instanceof ApiError ? (err.body as { error?: string })?.error : null;
      toast({ title: "Could not start payment", description: msg || "Please try again.", variant: "destructive" });
    },
  });

  const formatAmount = (amount: number, currency: string) =>
    new Intl.NumberFormat("en-NZ", { style: "currency", currency: currency.toUpperCase() }).format(
      amount / 100
    );

  if (!token) {
    return <div className="p-8 text-center">Invalid link.</div>;
  }

  if (isLoading) {
    return (
      <div data-theme="site" className="min-h-screen bg-neutral-50 flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-neutral-500" />
      </div>
    );
  }

  if (error || !inv) {
    return (
      <div data-theme="site" className="min-h-screen bg-neutral-50">
        <SiteHeader />
        <div className="pt-32 px-4 max-w-md mx-auto text-center">
          <p className="text-neutral-600">This invoice could not be found or the link is invalid.</p>
        </div>
      </div>
    );
  }

  if (inv.isPaid || inv.status === "paid") {
    return (
      <div data-theme="site" className="min-h-screen bg-neutral-50 text-neutral-900 font-sans">
        <PageSEO
          title="Invoice paid"
          description="Thank you — this invoice has been paid."
          canonicalPath="/pay"
        />
        <SiteHeader />
        <main className="public-form-light max-w-lg mx-auto px-6 pt-28 pb-16 text-center">
          <div className="rounded-full bg-green-50 w-16 h-16 flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="h-8 w-8 text-green-600" />
          </div>
          <h1 className="text-2xl font-bold text-neutral-900 mb-2">Thank you</h1>
          <p className="text-neutral-600">Invoice {inv.invoiceNumber} is marked as paid.</p>
        </main>
      </div>
    );
  }

  const spSuccess = sp.get("success");
  if (spSuccess === "true" || spSuccess === "1") {
    return (
      <div data-theme="site" className="min-h-screen bg-neutral-50">
        <SiteHeader />
        <main className="pt-28 pb-16 px-4 max-w-md mx-auto text-center">
          <CheckCircle className="h-12 w-12 text-green-600 mx-auto mb-4" />
          <h1 className="text-2xl font-bold">Payment received</h1>
          <p className="text-neutral-600 mt-2">You can close this window. If you have questions, email your consultant.</p>
        </main>
      </div>
    );
  }

  let lineItems: { description: string; amount: number }[] = [];
  try {
    lineItems = JSON.parse(inv.items);
  } catch {
    /* empty */
  }

  return (
    <div data-theme="site" className="min-h-screen bg-neutral-50 text-neutral-900 font-sans">
      <PageSEO
        title={`Pay invoice ${inv.invoiceNumber}`}
        description="Secure payment for your invoice."
        canonicalPath="/pay"
      />
      <SiteHeader />
      <main className="public-form-light max-w-lg mx-auto px-6 pt-28 pb-16">
        <Card className="border-0 shadow-lg bg-white">
          <CardHeader>
            <CardTitle>Invoice {inv.invoiceNumber}</CardTitle>
            <CardDescription>
              {inv.dueDate
                ? `Due ${new Date(inv.dueDate).toLocaleDateString("en-NZ", { dateStyle: "long" })}`
                : "Amount due"}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <ul className="text-sm text-neutral-600 space-y-2">
              {lineItems.map((line, i) => (
                <li key={i} className="flex justify-between gap-2">
                  <span>{line.description}</span>
                  <span className="font-medium">{formatAmount(line.amount, inv.currency)}</span>
                </li>
              ))}
            </ul>
            <div className="text-2xl font-bold border-t pt-4">{formatAmount(inv.amount, inv.currency)}</div>
            <div className="flex flex-col sm:flex-row gap-3">
              {methods?.stripe && (
                <Button
                  className="tesoro-cta-gradient font-semibold flex-1"
                  size="lg"
                  disabled={payMutation.isPending}
                  onClick={() => payMutation.mutate("stripe")}
                >
                  {payMutation.isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
                  Pay with card
                  <ExternalLink className="h-4 w-4 ml-1 opacity-80" />
                </Button>
              )}
              {methods?.paypal && (
                <Button
                  variant="outline"
                  className="flex-1"
                  size="lg"
                  disabled={payMutation.isPending}
                  onClick={() => payMutation.mutate("paypal")}
                >
                  Pay with PayPal
                </Button>
              )}
            </div>
            {!methods?.stripe && !methods?.paypal && (
              <p className="text-sm text-amber-700">Online payment is not available right now. Please contact your consultant.</p>
            )}
            <p className="text-xs text-neutral-400">Secure payments are processed by Stripe or PayPal.</p>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
