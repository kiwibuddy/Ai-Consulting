import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { format, isFuture, isPast } from "date-fns";
import { Link } from "wouter";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { apiRequest } from "@/lib/queryClient";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { EmptyState } from "@/components/empty-state";
import { TableSkeleton } from "@/components/loading-skeleton";
import { SessionCalendar } from "@/components/session-calendar";
import { TimezoneConfirmationDialog } from "@/components/timezone-confirmation-dialog";
import { detectUserTimezone } from "@/components/timezone-selector";
import { useToast } from "@/hooks/use-toast";
import type { Session, ClientProfile, User } from "@shared/schema";
import {
  Calendar,
  Clock,
  Plus,
  ArrowRight,
  CalendarCheck,
  CalendarX,
  Loader2,
  AlertCircle,
  Check,
  User as UserIcon,
  LayoutList,
  CalendarDays,
  Globe,
} from "lucide-react";
import { useState } from "react";

const sessionSchema = z.object({
  clientId: z.string().min(1, "Please select a client"),
  title: z.string().min(1, "Title is required"),
  description: z.string().optional(),
  scheduledAt: z.string().min(1, "Date and time is required"),
  duration: z.coerce.number().min(15).max(180),
  meetingLink: z.string().optional(),
  prepNotes: z.string().optional(),
});

type SessionFormValues = z.infer<typeof sessionSchema>;

export default function CoachSessions() {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [timezoneConfirmOpen, setTimezoneConfirmOpen] = useState(false);
  const [confirmSessionOpen, setConfirmSessionOpen] = useState(false);
  const [selectedSession, setSelectedSession] = useState<Session | null>(null);
  const [pendingFormData, setPendingFormData] = useState<SessionFormValues | null>(null);
  const [viewMode, setViewMode] = useState<"list" | "calendar">("list");

  const { data: user } = useQuery<User>({
    queryKey: ["/api/auth/user"],
  });

  const { data: sessions, isLoading } = useQuery<Session[]>({
    queryKey: ["/api/coach/sessions"],
  });

  const { data: clients } = useQuery<ClientProfile[]>({
    queryKey: ["/api/coach/clients"],
  });

  const coachTimezone = user?.timezone || detectUserTimezone();
  const clientTimezone = "America/Los_Angeles";

  const form = useForm<SessionFormValues>({
    resolver: zodResolver(sessionSchema),
    defaultValues: {
      clientId: "",
      title: "",
      description: "",
      scheduledAt: "",
      duration: 60,
      meetingLink: "",
      prepNotes: "",
    },
  });

  const createSession = useMutation({
    mutationFn: async (data: SessionFormValues & { timezone?: string }) => {
      return apiRequest("POST", "/api/coach/sessions", data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/coach/sessions"] });
      toast({
        title: "Session Created",
        description: "The session has been created and sent to the client for confirmation.",
      });
      form.reset();
      setDialogOpen(false);
      setTimezoneConfirmOpen(false);
      setPendingFormData(null);
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to create session. Please try again.",
        variant: "destructive",
      });
    },
  });

  const confirmSession = useMutation({
    mutationFn: async (sessionId: string) => {
      return apiRequest("PATCH", `/api/coach/sessions/${sessionId}/confirm`, {});
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/coach/sessions"] });
      toast({
        title: "Session Confirmed",
        description: "The session has been confirmed and the client will be notified.",
      });
      setConfirmSessionOpen(false);
      setSelectedSession(null);
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to confirm session. Please try again.",
        variant: "destructive",
      });
    },
  });

  const handleFormSubmit = (data: SessionFormValues) => {
    setPendingFormData(data);
    setDialogOpen(false);
    setTimezoneConfirmOpen(true);
  };

  const handleConfirmCreate = () => {
    if (pendingFormData) {
      // Include the coach's timezone with the request so the server interprets the time correctly
      createSession.mutate({
        ...pendingFormData,
        timezone: coachTimezone,
      });
    }
  };

  const handleSessionClick = (session: Session) => {
    if (session.status === "pending_confirmation" && session.requestedBy === "client") {
      setSelectedSession(session);
      setConfirmSessionOpen(true);
    }
  };

  const handleConfirmSession = () => {
    if (selectedSession) {
      confirmSession.mutate(selectedSession.id);
    }
  };

  if (isLoading) {
    return (
      <div className="p-6">
        <TableSkeleton />
      </div>
    );
  }

  const getClientName = (clientId: string) => {
    const client = clients?.find(c => c.id === clientId);
    return client ? `Client #${client.id.slice(0, 8)}` : "Unknown Client";
  };

  const pendingSessions = sessions?.filter(
    (s) => s.status === "pending_confirmation"
  ).sort((a, b) => new Date(a.scheduledAt).getTime() - new Date(b.scheduledAt).getTime()) || [];

  const clientRequests = pendingSessions.filter(s => s.requestedBy === "client");
  const awaitingClientConfirm = pendingSessions.filter(s => s.requestedBy === "coach");

  const upcomingSessions = sessions?.filter(
    (s) => s.status === "scheduled" && isFuture(new Date(s.scheduledAt))
  ).sort((a, b) => new Date(a.scheduledAt).getTime() - new Date(b.scheduledAt).getTime()) || [];

  const pastSessions = sessions?.filter(
    (s) => s.status === "completed" || (s.status === "scheduled" && isPast(new Date(s.scheduledAt)))
  ).sort((a, b) => new Date(b.scheduledAt).getTime() - new Date(a.scheduledAt).getTime()) || [];

  const allScheduledSessions = sessions?.filter(
    (s) => s.status === "scheduled" || s.status === "pending_confirmation"
  ) || [];

  const SessionCard = ({ session, showConfirm = false }: { session: Session; showConfirm?: boolean }) => (
    <Card className="hover-elevate">
      <CardContent className="p-5">
        <div className="flex items-start gap-4">
          <div className={`rounded-full p-3 ${
            session.status === "completed" 
              ? "bg-green-100 dark:bg-green-900/30" 
              : session.status === "cancelled"
              ? "bg-red-100 dark:bg-red-900/30"
              : session.status === "pending_confirmation"
              ? "bg-amber-100 dark:bg-amber-900/30"
              : "bg-primary/10"
          }`}>
            {session.status === "completed" ? (
              <CalendarCheck className="h-5 w-5 text-green-600 dark:text-green-400" />
            ) : session.status === "cancelled" ? (
              <CalendarX className="h-5 w-5 text-red-600 dark:text-red-400" />
            ) : session.status === "pending_confirmation" ? (
              <AlertCircle className="h-5 w-5 text-amber-600 dark:text-amber-400" />
            ) : (
              <Calendar className="h-5 w-5 text-primary" />
            )}
          </div>
          <div className="flex-1 min-w-0 space-y-1">
            <div className="flex items-center gap-2 flex-wrap">
              <h3 className="font-semibold truncate">{session.title}</h3>
              <Badge 
                variant={
                  session.status === "completed" ? "default" : 
                  session.status === "cancelled" ? "destructive" : 
                  session.status === "pending_confirmation" ? "secondary" :
                  "default"
                }
                className="text-xs"
              >
                {session.status === "pending_confirmation" 
                  ? (session.requestedBy === "client" ? "Client Request" : "Awaiting Client")
                  : session.status
                }
              </Badge>
            </div>
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-muted-foreground">
              <span className="flex items-center gap-1">
                <UserIcon className="h-3.5 w-3.5" />
                {getClientName(session.clientId)}
              </span>
              <span className="flex items-center gap-1">
                <Calendar className="h-3.5 w-3.5" />
                {format(new Date(session.scheduledAt), "MMMM d, yyyy")}
              </span>
              <span className="flex items-center gap-1">
                <Clock className="h-3.5 w-3.5" />
                {format(new Date(session.scheduledAt), "h:mm a")}
              </span>
              <span>{session.duration} min</span>
              <span className="flex items-center gap-1 text-xs">
                <Globe className="h-3 w-3" />
                {coachTimezone}
              </span>
            </div>
            {session.description && (
              <p className="text-sm text-muted-foreground line-clamp-2 pt-1">
                {session.description}
              </p>
            )}
          </div>
          <div className="flex items-center gap-2">
            {showConfirm && session.requestedBy === "client" && (
              <Button
                size="sm"
                onClick={() => {
                  setSelectedSession(session);
                  setConfirmSessionOpen(true);
                }}
                data-testid={`button-confirm-session-${session.id}`}
              >
                <Check className="mr-2 h-4 w-4" />
                Confirm
              </Button>
            )}
            <Link href={`/coach/sessions/${session.id}`}>
              <Button size="icon" variant="ghost">
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <div>
          <h1 className="font-serif text-3xl font-bold tracking-tight">Sessions</h1>
          <p className="text-muted-foreground flex items-center gap-2">
            Manage your coaching sessions.
            <Badge variant="outline" className="text-xs">
              <Globe className="h-3 w-3 mr-1" />
              {coachTimezone}
            </Badge>
          </p>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center border rounded-lg p-1">
            <Button
              size="sm"
              variant={viewMode === "list" ? "default" : "ghost"}
              onClick={() => setViewMode("list")}
              data-testid="button-view-list"
            >
              <LayoutList className="h-4 w-4" />
            </Button>
            <Button
              size="sm"
              variant={viewMode === "calendar" ? "default" : "ghost"}
              onClick={() => setViewMode("calendar")}
              data-testid="button-view-calendar"
            >
              <CalendarDays className="h-4 w-4" />
            </Button>
          </div>
          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
              <Button data-testid="button-create-session">
                <Plus className="mr-2 h-4 w-4" />
                New Session
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-lg">
              <DialogHeader>
                <DialogTitle>Schedule New Session</DialogTitle>
                <DialogDescription>
                  Create a session for a client to confirm.
                </DialogDescription>
              </DialogHeader>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(handleFormSubmit)} className="space-y-4">
                  <FormField
                    control={form.control}
                    name="clientId"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Client *</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger data-testid="select-client">
                              <SelectValue placeholder="Select a client" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {clients?.filter(c => c.status === "active").map((client) => (
                              <SelectItem key={client.id} value={client.id}>
                                Client #{client.id.slice(0, 8)}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Title *</FormLabel>
                        <FormControl>
                          <Input placeholder="Weekly Coaching Session" {...field} data-testid="input-title" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="scheduledAt"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Date & Time *</FormLabel>
                          <FormControl>
                            <Input type="datetime-local" {...field} data-testid="input-datetime" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="duration"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Duration (min)</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={String(field.value)}>
                            <FormControl>
                              <SelectTrigger data-testid="select-duration">
                                <SelectValue />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="30">30 min</SelectItem>
                              <SelectItem value="45">45 min</SelectItem>
                              <SelectItem value="60">60 min</SelectItem>
                              <SelectItem value="90">90 min</SelectItem>
                              <SelectItem value="120">120 min</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="bg-muted/50 rounded-lg p-3 text-sm">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Globe className="h-4 w-4" />
                      <span>Your timezone: <strong>{coachTimezone}</strong></span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      You'll see a timezone confirmation before creating.
                    </p>
                  </div>
                  <FormField
                    control={form.control}
                    name="meetingLink"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Meeting Link</FormLabel>
                        <FormControl>
                          <Input placeholder="https://zoom.us/j/..." {...field} data-testid="input-meeting-link" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Description</FormLabel>
                        <FormControl>
                          <Textarea placeholder="Session focus and agenda..." {...field} data-testid="textarea-description" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="prepNotes"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Pre-session Notes (visible to client)</FormLabel>
                        <FormControl>
                          <Textarea placeholder="What the client should prepare..." {...field} data-testid="textarea-prep-notes" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <DialogFooter>
                    <Button type="submit" data-testid="button-submit-session">
                      Review & Confirm
                    </Button>
                  </DialogFooter>
                </form>
              </Form>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {viewMode === "calendar" && (
        <SessionCalendar
          sessions={allScheduledSessions}
          userTimezone={coachTimezone}
          onSessionClick={handleSessionClick}
        />
      )}

      {viewMode === "list" && (
        <>
          {clientRequests.length > 0 && (
            <div className="space-y-4">
              <h2 className="text-lg font-semibold flex items-center gap-2">
                <AlertCircle className="h-5 w-5 text-amber-500" />
                Client Requests ({clientRequests.length})
              </h2>
              <p className="text-sm text-muted-foreground">These sessions were requested by clients and need your confirmation.</p>
              {clientRequests.map((session) => (
                <SessionCard key={session.id} session={session} showConfirm />
              ))}
            </div>
          )}

          {awaitingClientConfirm.length > 0 && (
            <div className="space-y-4">
              <h2 className="text-lg font-semibold flex items-center gap-2">
                <Clock className="h-5 w-5 text-muted-foreground" />
                Awaiting Client Confirmation ({awaitingClientConfirm.length})
              </h2>
              <p className="text-sm text-muted-foreground">These sessions are waiting for client confirmation.</p>
              {awaitingClientConfirm.map((session) => (
                <SessionCard key={session.id} session={session} />
              ))}
            </div>
          )}

          <Tabs defaultValue="upcoming" className="space-y-6">
            <TabsList>
              <TabsTrigger value="upcoming" data-testid="tab-upcoming">
                Upcoming ({upcomingSessions.length})
              </TabsTrigger>
              <TabsTrigger value="past" data-testid="tab-past">
                Past ({pastSessions.length})
              </TabsTrigger>
            </TabsList>

            <TabsContent value="upcoming" className="space-y-4">
              {upcomingSessions.length > 0 ? (
                upcomingSessions.map((session) => (
                  <SessionCard key={session.id} session={session} />
                ))
              ) : (
                <Card>
                  <CardContent className="py-12">
                    <EmptyState
                      icon={Calendar}
                      title="No upcoming sessions"
                      description="Schedule a new session to get started."
                      actionLabel="New Session"
                      onAction={() => setDialogOpen(true)}
                    />
                  </CardContent>
                </Card>
              )}
            </TabsContent>

            <TabsContent value="past" className="space-y-4">
              {pastSessions.length > 0 ? (
                pastSessions.map((session) => (
                  <SessionCard key={session.id} session={session} />
                ))
              ) : (
                <Card>
                  <CardContent className="py-12">
                    <EmptyState
                      icon={Calendar}
                      title="No past sessions"
                      description="Completed sessions will appear here."
                    />
                  </CardContent>
                </Card>
              )}
            </TabsContent>
          </Tabs>
        </>
      )}

      {pendingFormData && (
        <TimezoneConfirmationDialog
          open={timezoneConfirmOpen}
          onOpenChange={setTimezoneConfirmOpen}
          onConfirm={handleConfirmCreate}
          onCancel={() => {
            setTimezoneConfirmOpen(false);
            setDialogOpen(true);
          }}
          isLoading={createSession.isPending}
          mode="request"
          sessionTitle={pendingFormData.title}
          sessionDescription={pendingFormData.description}
          scheduledAt={pendingFormData.scheduledAt}
          duration={pendingFormData.duration}
          clientTimezone={clientTimezone}
          coachTimezone={coachTimezone}
          requestedBy="coach"
          clientName="Client"
          coachName="You"
        />
      )}

      {selectedSession && (
        <TimezoneConfirmationDialog
          open={confirmSessionOpen}
          onOpenChange={setConfirmSessionOpen}
          onConfirm={handleConfirmSession}
          onCancel={() => setConfirmSessionOpen(false)}
          isLoading={confirmSession.isPending}
          mode="confirm"
          sessionTitle={selectedSession.title}
          sessionDescription={selectedSession.description || undefined}
          scheduledAt={selectedSession.scheduledAt}
          duration={selectedSession.duration || 60}
          clientTimezone={clientTimezone}
          coachTimezone={coachTimezone}
          requestedBy="client"
          clientName="Client"
          coachName="You"
        />
      )}
    </div>
  );
}
