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
import { TimezoneSelector, detectUserTimezone } from "@/components/timezone-selector";
import { useToast } from "@/hooks/use-toast";
import type { Session, User } from "@shared/schema";
import {
  Calendar,
  Clock,
  Video,
  ArrowRight,
  CalendarCheck,
  CalendarX,
  CalendarPlus,
  Check,
  Loader2,
  AlertCircle,
  LayoutList,
  CalendarDays,
  Globe,
} from "lucide-react";
import { useState, useEffect } from "react";

const sessionRequestSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().optional(),
  scheduledAt: z.string().min(1, "Preferred date and time is required"),
  duration: z.coerce.number().min(15).max(180),
});

type SessionRequestValues = z.infer<typeof sessionRequestSchema>;

export default function ClientSessions() {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [timezoneConfirmOpen, setTimezoneConfirmOpen] = useState(false);
  const [confirmSessionOpen, setConfirmSessionOpen] = useState(false);
  const [selectedSession, setSelectedSession] = useState<Session | null>(null);
  const [pendingFormData, setPendingFormData] = useState<SessionRequestValues | null>(null);
  const [viewMode, setViewMode] = useState<"list" | "calendar">("list");

  const { data: user } = useQuery<User>({
    queryKey: ["/api/auth/user"],
  });

  const { data: sessions, isLoading } = useQuery<Session[]>({
    queryKey: ["/api/client/sessions"],
  });

  const userTimezone = user?.timezone || detectUserTimezone();
  const coachTimezone = "America/New_York";

  const form = useForm<SessionRequestValues>({
    resolver: zodResolver(sessionRequestSchema),
    defaultValues: {
      title: "",
      description: "",
      scheduledAt: "",
      duration: 60,
    },
  });

  const requestSession = useMutation({
    mutationFn: async (data: SessionRequestValues & { timezone?: string }) => {
      return apiRequest("POST", "/api/client/sessions", data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/client/sessions"] });
      toast({
        title: "Session Requested",
        description: "Your session request has been sent to your consultant for confirmation.",
      });
      form.reset();
      setDialogOpen(false);
      setTimezoneConfirmOpen(false);
      setPendingFormData(null);
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to request session. Please try again.",
        variant: "destructive",
      });
    },
  });

  const confirmSession = useMutation({
    mutationFn: async (sessionId: string) => {
      return apiRequest("PATCH", `/api/client/sessions/${sessionId}/confirm`, {});
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/client/sessions"] });
      toast({
        title: "Session Confirmed",
        description: "The session has been confirmed.",
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

  const handleFormSubmit = (data: SessionRequestValues) => {
    setPendingFormData(data);
    setDialogOpen(false);
    setTimezoneConfirmOpen(true);
  };

  const handleConfirmRequest = () => {
    if (pendingFormData) {
      // Include the user's timezone with the request so the server interprets the time correctly
      requestSession.mutate({
        ...pendingFormData,
        timezone: userTimezone,
      });
    }
  };

  const handleSessionClick = (session: Session) => {
    if (session.status === "pending_confirmation" && session.requestedBy === "coach") {
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

  const pendingSessions = sessions?.filter(
    (s) => s.status === "pending_confirmation"
  ).sort((a, b) => new Date(a.scheduledAt).getTime() - new Date(b.scheduledAt).getTime()) || [];

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
                  ? (session.requestedBy === "coach" ? "Awaiting Your Confirmation" : "Pending Consultant Approval")
                  : session.status
                }
              </Badge>
            </div>
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-muted-foreground">
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
                {userTimezone}
              </span>
            </div>
            {session.description && (
              <p className="text-sm text-muted-foreground line-clamp-2 pt-1">
                {session.description}
              </p>
            )}
          </div>
          <div className="flex items-center gap-2">
            {showConfirm && session.requestedBy === "coach" && (
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
            {session.status === "scheduled" && session.meetingLink && (
              <Button
                size="sm"
                variant="outline"
                onClick={() => window.open(session.meetingLink!, "_blank")}
                data-testid={`button-join-session-${session.id}`}
              >
                <Video className="mr-2 h-4 w-4" />
                Join
              </Button>
            )}
            <Link href={`/client/sessions/${session.id}`}>
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
            View and manage your consulting sessions.
            <Badge variant="outline" className="text-xs">
              <Globe className="h-3 w-3 mr-1" />
              {userTimezone}
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
              <Button data-testid="button-request-session">
                <CalendarPlus className="mr-2 h-4 w-4" />
                Request Session
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-lg">
              <DialogHeader>
                <DialogTitle>Request a Session</DialogTitle>
                <DialogDescription>
                  Submit a session request for your consultant to confirm.
                </DialogDescription>
              </DialogHeader>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(handleFormSubmit)} className="space-y-4">
                  <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Session Topic *</FormLabel>
                        <FormControl>
                          <Input placeholder="What would you like to focus on?" {...field} data-testid="input-title" />
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
                          <FormLabel>Preferred Date & Time *</FormLabel>
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
                          <FormLabel>Duration</FormLabel>
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
                      <span>Your timezone: <strong>{userTimezone}</strong></span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      You'll see a timezone confirmation before submitting.
                    </p>
                  </div>
                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>What would you like to discuss?</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Share any topics, challenges, or goals you'd like to cover in this session..." 
                            {...field} 
                            data-testid="textarea-description" 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <DialogFooter>
                    <Button type="submit" data-testid="button-submit-request">
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
          userTimezone={userTimezone}
          onSessionClick={handleSessionClick}
        />
      )}

      {viewMode === "list" && (
        <>
          {pendingSessions.length > 0 && (
            <div className="space-y-4">
              <h2 className="text-lg font-semibold flex items-center gap-2">
                <AlertCircle className="h-5 w-5 text-amber-500" />
                Pending Confirmation ({pendingSessions.length})
              </h2>
              {pendingSessions.map((session) => (
                <SessionCard key={session.id} session={session} showConfirm />
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
                      description="Request a session to get started on your consulting journey."
                      actionLabel="Request Session"
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
                      description="Your completed sessions will appear here."
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
          onConfirm={handleConfirmRequest}
          onCancel={() => {
            setTimezoneConfirmOpen(false);
            setDialogOpen(true);
          }}
          isLoading={requestSession.isPending}
          mode="request"
          sessionTitle={pendingFormData.title}
          sessionDescription={pendingFormData.description}
          scheduledAt={pendingFormData.scheduledAt}
          duration={pendingFormData.duration}
          clientTimezone={userTimezone}
          coachTimezone={coachTimezone}
          requestedBy="client"
          clientName="You"
          coachName="Consultant"
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
          clientTimezone={userTimezone}
          coachTimezone={coachTimezone}
          requestedBy="coach"
          clientName="You"
          coachName="Consultant"
        />
      )}
    </div>
  );
}
