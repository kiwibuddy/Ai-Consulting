import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { format } from "date-fns";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { EmptyState } from "@/components/empty-state";
import { TableSkeleton } from "@/components/loading-skeleton";
import { StatCard } from "@/components/stat-card";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import {
  CreditCard,
  FileText,
  Plus,
  CheckCircle,
  Clock,
  AlertCircle,
  DollarSign,
  TrendingUp,
  Send,
  RotateCcw,
  BarChart3,
} from "lucide-react";
import type { ClientProfile } from "@shared/schema";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";

interface Payment {
  id: string;
  clientId: string;
  amount: number;
  currency: string;
  status: string;
  provider: string;
  description: string | null;
  paidAt: string | null;
  createdAt: string;
  refundedAmount?: number | null;
}

interface Invoice {
  id: string;
  invoiceNumber: string;
  clientId: string;
  amount: number;
  currency: string;
  status: string;
  dueDate: string | null;
  paidAt: string | null;
  items: string;
  notes: string | null;
  createdAt: string;
  stripeInvoiceId?: string | null;
}

interface Retainer {
  id: string;
  clientId: string;
  name: string;
  amount: number;
  currency: string;
  status: string;
  interval: string;
  currentPeriodEnd: string | null;
  stripeSubscriptionId: string | null;
}

interface BillingMetrics {
  mrrCents: number;
  arCents: number;
  arByCurrency: { currency: string; cents: number }[];
  last30dCents: number;
  aging: { bucket: string; cents: number }[];
  overdueInvoices: Invoice[];
}

export default function CoachBilling() {
  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const [retainerOpen, setRetainerOpen] = useState(false);
  const [selectedClient, setSelectedClient] = useState("");
  const [retainerClient, setRetainerClient] = useState("");
  const [amount, setAmount] = useState("");
  const [retainerName, setRetainerName] = useState("");
  const [retainerAmount, setRetainerAmount] = useState("");
  const [retainerInterval, setRetainerInterval] = useState<"month" | "quarter" | "year">("month");
  const [retainerCurrency, setRetainerCurrency] = useState<"nzd" | "usd">("nzd");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [notes, setNotes] = useState("");
  const [invoiceCurrency, setInvoiceCurrency] = useState<"nzd" | "usd">("nzd");

  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: payments, isLoading: paymentsLoading } = useQuery<Payment[]>({
    queryKey: ["/api/coach/payments"],
  });

  const { data: invoices, isLoading: invoicesLoading } = useQuery<Invoice[]>({
    queryKey: ["/api/coach/invoices"],
  });

  const { data: clients } = useQuery<ClientProfile[]>({
    queryKey: ["/api/coach/clients"],
  });

  const { data: retainers, isLoading: retainersLoading } = useQuery<Retainer[]>({
    queryKey: ["/api/coach/retainers"],
  });

  const { data: metrics, isLoading: metricsLoading } = useQuery<BillingMetrics>({
    queryKey: ["/api/coach/billing-metrics"],
  });

  const getClientName = (clientId: string) => {
    const client = clients?.find((c) => c.id === clientId) as any;
    if (!client) return `Client #${clientId.slice(0, 8)}`;
    const user = client.user;
    if (user?.firstName || user?.lastName) {
      return `${user.firstName || ""} ${user.lastName || ""}`.trim();
    }
    return user?.email || `Client #${client.id.slice(0, 8)}`;
  };

  const createInvoiceMutation = useMutation({
    mutationFn: (data: {
      clientId: string;
      amount: number;
      dueDate?: string;
      items: string;
      notes?: string;
      currency: "nzd" | "usd";
    }) => apiRequest("POST", "/api/coach/invoices", data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/coach/invoices"] });
      queryClient.invalidateQueries({ queryKey: ["/api/coach/billing-metrics"] });
      setCreateDialogOpen(false);
      resetForm();
      toast({ title: "Invoice created" });
    },
  });

  const sendInvoiceMutation = useMutation({
    mutationFn: (id: string) => apiRequest("POST", `/api/coach/invoices/${id}/send`, {}),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/coach/invoices"] });
      toast({ title: "Invoice sent", description: "The client can pay online or from email." });
    },
  });

  const resendMutation = useMutation({
    mutationFn: (id: string) => apiRequest("POST", `/api/coach/invoices/${id}/resend`, {}),
    onSuccess: () => toast({ title: "Reminder sent" }),
  });

  const updateInvoiceMutation = useMutation({
    mutationFn: ({ id, status }: { id: string; status: string }) =>
      apiRequest("PATCH", `/api/coach/invoices/${id}`, { status }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/coach/invoices"] });
      queryClient.invalidateQueries({ queryKey: ["/api/coach/billing-metrics"] });
      toast({ title: "Invoice updated" });
    },
  });

  const refundMutation = useMutation({
    mutationFn: (id: string) => apiRequest("POST", `/api/coach/payments/${id}/refund`, {}),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/coach/payments"] });
      toast({ title: "Refund initiated" });
    },
  });

  const createRetainerMutation = useMutation({
    mutationFn: (data: {
      clientId: string;
      name: string;
      amountCents: number;
      currency: "nzd" | "usd";
      interval: "month" | "quarter" | "year";
    }) => apiRequest("POST", "/api/coach/retainers", data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/coach/retainers"] });
      queryClient.invalidateQueries({ queryKey: ["/api/coach/billing-metrics"] });
      setRetainerOpen(false);
      setRetainerName("");
      setRetainerAmount("");
      setRetainerClient("");
      toast({ title: "Retainer created" });
    },
  });

  const resetForm = () => {
    setSelectedClient("");
    setAmount("");
    setDescription("");
    setDueDate("");
    setNotes("");
    setInvoiceCurrency("nzd");
  };

  const handleCreateInvoice = () => {
    const amountCents = Math.round(parseFloat(amount) * 100);
    if (!selectedClient || isNaN(amountCents) || amountCents < 100) {
      toast({ title: "Invalid", description: "Client and at least $1.00 required.", variant: "destructive" });
      return;
    }
    const items = JSON.stringify([{ description: description || "Consulting services", amount: amountCents }]);
    createInvoiceMutation.mutate({
      clientId: selectedClient,
      amount: amountCents,
      dueDate: dueDate || undefined,
      items,
      notes: notes || undefined,
      currency: invoiceCurrency,
    });
  };

  const isLoading = paymentsLoading || invoicesLoading;
  if (isLoading) {
    return (
      <div className="p-6">
        <TableSkeleton />
      </div>
    );
  }

  const formatAmount = (cents: number, currency: string) =>
    new Intl.NumberFormat("en-NZ", { style: "currency", currency: currency.toUpperCase() }).format(
      cents / 100
    );

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
      case "paid":
        return (
          <Badge variant="default">
            <CheckCircle className="h-3 w-3 mr-1" /> Paid
          </Badge>
        );
      case "pending":
      case "sent":
        return (
          <Badge variant="secondary">
            <Clock className="h-3 w-3 mr-1" /> Sent
          </Badge>
        );
      case "draft":
        return <Badge variant="outline">Draft</Badge>;
      case "overdue":
        return (
          <Badge variant="destructive">
            <AlertCircle className="h-3 w-3 mr-1" /> Overdue
          </Badge>
        );
      case "void":
        return <Badge variant="outline">Void</Badge>;
      case "refunded":
        return <Badge variant="outline">Refunded</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const totalReceived = payments?.filter((p) => p.status === "completed").reduce((s, p) => s + p.amount, 0) || 0;
  const completedCount = payments?.filter((p) => p.status === "completed").length || 0;

  const mrrCents = metrics?.mrrCents ?? 0;
  const arCents = metrics?.arCents ?? 0;
  const last30 = metrics?.last30dCents ?? 0;
  const chartData = (metrics?.aging || []).map((a) => ({ name: a.bucket, amount: a.cents / 100 }));

  return (
    <div className="space-y-6 p-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-serif text-3xl font-bold tracking-tight">Billing</h1>
          <p className="text-muted-foreground">Invoices, payments, retainers, and metrics (NZD default).</p>
        </div>
        <div className="flex gap-2">
          <Dialog open={retainerOpen} onOpenChange={setRetainerOpen}>
            <DialogTrigger asChild>
              <Button variant="outline" size="sm">
                <Plus className="h-4 w-4 mr-1" />
                New retainer
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Recurring retainer (Stripe)</DialogTitle>
                <DialogDescription>Creates a subscription invoice on each period.</DialogDescription>
              </DialogHeader>
              <div className="space-y-3">
                <div>
                  <Label>Client</Label>
                  <Select value={retainerClient} onValueChange={setRetainerClient}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select client" />
                    </SelectTrigger>
                    <SelectContent>
                      {clients?.map((c) => (
                        <SelectItem key={c.id} value={c.id}>
                          {getClientName(c.id)}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Name</Label>
                  <Input value={retainerName} onChange={(e) => setRetainerName(e.target.value)} placeholder="Monthly advisory" />
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <Label>Amount</Label>
                    <Input
                      type="number"
                      min="1"
                      step="0.01"
                      value={retainerAmount}
                      onChange={(e) => setRetainerAmount(e.target.value)}
                    />
                  </div>
                  <div>
                    <Label>Currency</Label>
                    <Select value={retainerCurrency} onValueChange={(v) => setRetainerCurrency(v as "nzd" | "usd")}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="nzd">NZD</SelectItem>
                        <SelectItem value="usd">USD</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div>
                  <Label>Interval</Label>
                  <Select value={retainerInterval} onValueChange={(v) => setRetainerInterval(v as typeof retainerInterval)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="month">Monthly</SelectItem>
                      <SelectItem value="quarter">Quarterly</SelectItem>
                      <SelectItem value="year">Yearly</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <DialogFooter>
                <Button
                  onClick={() => {
                    const c = Math.round(parseFloat(retainerAmount) * 100);
                    if (!retainerClient || !retainerName || c < 100) {
                      toast({ title: "Check fields", variant: "destructive" });
                      return;
                    }
                    createRetainerMutation.mutate({
                      clientId: retainerClient,
                      name: retainerName,
                      amountCents: c,
                      currency: retainerCurrency,
                      interval: retainerInterval,
                    });
                  }}
                  disabled={createRetainerMutation.isPending}
                >
                  {createRetainerMutation.isPending ? "Creating…" : "Create retainer"}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
          <Dialog open={createDialogOpen} onOpenChange={setCreateDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Create invoice
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Create invoice</DialogTitle>
                <DialogDescription>Add a draft; then send to client with Stripe or pay link email.</DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-2">
                <div>
                  <Label>Client</Label>
                  <Select value={selectedClient} onValueChange={setSelectedClient}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a client" />
                    </SelectTrigger>
                    <SelectContent>
                      {clients?.map((c) => (
                        <SelectItem key={c.id} value={c.id}>
                          {getClientName(c.id)}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <Label>Amount</Label>
                    <Input type="number" min="1" step="0.01" placeholder="150.00" value={amount} onChange={(e) => setAmount(e.target.value)} />
                  </div>
                  <div>
                    <Label>Currency</Label>
                    <Select value={invoiceCurrency} onValueChange={(v) => setInvoiceCurrency(v as "nzd" | "usd")}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="nzd">NZD</SelectItem>
                        <SelectItem value="usd">USD</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div>
                  <Label>Description</Label>
                  <Input placeholder="Line item" value={description} onChange={(e) => setDescription(e.target.value)} />
                </div>
                <div>
                  <Label>Due date (optional)</Label>
                  <Input type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} />
                </div>
                <div>
                  <Label>Internal notes (optional)</Label>
                  <Textarea value={notes} onChange={(e) => setNotes(e.target.value)} />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setCreateDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleCreateInvoice} disabled={createInvoiceMutation.isPending}>
                  {createInvoiceMutation.isPending ? "…" : "Create"}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="MRR (equiv.)"
          value={formatAmount(mrrCents, "nzd")}
          icon={TrendingUp}
        />
        <StatCard title="Outstanding A/R" value={formatAmount(arCents, "nzd")} icon={DollarSign} />
        <StatCard title="Last 30 days" value={formatAmount(last30, "nzd")} icon={BarChart3} />
        <StatCard title="Payments recorded" value={String(completedCount)} icon={CheckCircle} />
      </div>

      {chartData.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-base">A/R aging (approx., single currency view)</CardTitle>
          </CardHeader>
          <CardContent className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                <XAxis dataKey="name" fontSize={12} />
                <YAxis fontSize={12} tickFormatter={(v) => `$${v}`} />
                <Tooltip />
                <Line type="monotone" dataKey="amount" stroke="hsl(142 76% 42%)" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      )}

      <Tabs defaultValue="invoices">
        <TabsList>
          <TabsTrigger value="invoices">
            <FileText className="h-4 w-4 mr-1" />
            Invoices
          </TabsTrigger>
          <TabsTrigger value="payments">
            <CreditCard className="h-4 w-4 mr-1" />
            Payments
          </TabsTrigger>
          <TabsTrigger value="retainers">Retainers</TabsTrigger>
          <TabsTrigger value="overdue">Overdue</TabsTrigger>
        </TabsList>

        <TabsContent value="invoices" className="mt-4">
          <Card>
            <CardContent className="pt-6">
              {invoices && invoices.length > 0 ? (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>#</TableHead>
                      <TableHead>Client</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Due</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {invoices.map((invoice) => (
                      <TableRow key={invoice.id}>
                        <TableCell className="font-medium">{invoice.invoiceNumber}</TableCell>
                        <TableCell>{getClientName(invoice.clientId)}</TableCell>
                        <TableCell>{formatAmount(invoice.amount, invoice.currency)}</TableCell>
                        <TableCell>{getStatusBadge(invoice.status)}</TableCell>
                        <TableCell>
                          {invoice.dueDate ? format(new Date(invoice.dueDate), "MMM d, yyyy") : "—"}
                        </TableCell>
                        <TableCell className="text-right space-x-1">
                          {invoice.status === "draft" && (
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => sendInvoiceMutation.mutate(invoice.id)}
                              disabled={sendInvoiceMutation.isPending}
                            >
                              <Send className="h-3 w-3 mr-1" />
                              Send
                            </Button>
                          )}
                          {invoice.stripeInvoiceId && (invoice.status === "sent" || invoice.status === "overdue") && (
                            <Button size="sm" variant="ghost" onClick={() => resendMutation.mutate(invoice.id)}>
                              <RotateCcw className="h-3 w-3" />
                            </Button>
                          )}
                          {(invoice.status === "sent" || invoice.status === "overdue") && (
                            <Button
                              size="sm"
                              onClick={() => updateInvoiceMutation.mutate({ id: invoice.id, status: "paid" })}
                            >
                              Mark paid (off-platform)
                            </Button>
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              ) : (
                <EmptyState
                  icon={FileText}
                  title="No invoices"
                  description="Create a draft, then send it to the client."
                  actionLabel="Create"
                  onAction={() => setCreateDialogOpen(true)}
                />
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="payments" className="mt-4">
          <Card>
            <CardContent className="pt-6">
              <p className="text-sm text-muted-foreground mb-4">Total received (all time, sum of cents): {formatAmount(totalReceived, "nzd")}</p>
              {payments && payments.length > 0 ? (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Date</TableHead>
                      <TableHead>Client</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Method</TableHead>
                      <TableHead>Refund</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {payments.map((p) => (
                      <TableRow key={p.id}>
                        <TableCell>
                          {p.paidAt ? format(new Date(p.paidAt), "MMM d, yyyy") : format(new Date(p.createdAt), "MMM d, yyyy")}
                        </TableCell>
                        <TableCell>{getClientName(p.clientId)}</TableCell>
                        <TableCell>{formatAmount(p.amount, p.currency)}</TableCell>
                        <TableCell>{getStatusBadge(p.status)}</TableCell>
                        <TableCell>{p.provider === "stripe" ? "Stripe" : "PayPal"}</TableCell>
                        <TableCell>
                          {p.provider === "stripe" && p.status === "completed" && !p.refundedAmount && (
                            <Button size="sm" variant="outline" onClick={() => refundMutation.mutate(p.id)}>
                              Refund
                            </Button>
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              ) : (
                <EmptyState icon={CreditCard} title="No payments" description="Payments appear when clients pay online." />
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="retainers" className="mt-4">
          <Card>
            <CardContent className="pt-6">
              {retainers && retainers.length > 0 ? (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Client</TableHead>
                      <TableHead>Plan</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Interval</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {retainers.map((r) => (
                      <TableRow key={r.id}>
                        <TableCell>{getClientName(r.clientId)}</TableCell>
                        <TableCell>{r.name}</TableCell>
                        <TableCell>{formatAmount(r.amount, r.currency)}</TableCell>
                        <TableCell className="capitalize">{r.interval}</TableCell>
                        <TableCell>{r.status}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              ) : retainersLoading ? (
                <TableSkeleton />
              ) : (
                <EmptyState icon={TrendingUp} title="No retainers" description="Add a monthly or quarterly plan." />
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="overdue" className="mt-4">
          <Card>
            <CardContent className="pt-6">
              {metrics?.overdueInvoices && metrics.overdueInvoices.length > 0 ? (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>#</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Due</TableHead>
                      <TableHead>Resend</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {metrics.overdueInvoices.map((inv) => (
                      <TableRow key={inv.id}>
                        <TableCell>{inv.invoiceNumber}</TableCell>
                        <TableCell>{formatAmount(inv.amount, inv.currency)}</TableCell>
                        <TableCell>{inv.dueDate ? format(new Date(inv.dueDate), "MMM d, yyyy") : "—"}</TableCell>
                        <TableCell>
                          {inv.stripeInvoiceId && (
                            <Button size="sm" onClick={() => resendMutation.mutate(inv.id)} variant="outline">
                              Resend
                            </Button>
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              ) : (
                <p className="text-muted-foreground">No overdue invoices in this view.</p>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
