import { useQuery } from "@tanstack/react-query";
import { format, isFuture, isToday, startOfToday, endOfWeek } from "date-fns";
import { Link } from "wouter";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { StatCard } from "@/components/stat-card";
import { EmptyState } from "@/components/empty-state";
import { DashboardSkeleton } from "@/components/loading-skeleton";
import { useAuth } from "@/hooks/use-auth";
import type { Session, IntakeForm, ClientProfile } from "@shared/schema";
import {
  Calendar,
  Users,
  FileText,
  Clock,
  ArrowRight,
  CalendarDays,
  UserPlus,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";

export default function CoachDashboard() {
  const { user } = useAuth();

  const { data: clients, isLoading: clientsLoading } = useQuery<ClientProfile[]>({
    queryKey: ["/api/coach/clients"],
  });

  const { data: sessions, isLoading: sessionsLoading } = useQuery<Session[]>({
    queryKey: ["/api/coach/sessions"],
  });

  const { data: intakes, isLoading: intakesLoading } = useQuery<IntakeForm[]>({
    queryKey: ["/api/coach/intake"],
  });

  const isLoading = clientsLoading || sessionsLoading || intakesLoading;

  if (isLoading) {
    return <DashboardSkeleton />;
  }

  const activeClients = clients?.filter((c) => c.status === "active") || [];
  const pendingIntakes = intakes?.filter((i) => i.status === "pending") || [];
  const upcomingSessions = sessions?.filter((s) => s.status === "scheduled" && isFuture(new Date(s.scheduledAt))) || [];
  const todaySessions = upcomingSessions.filter((s) => isToday(new Date(s.scheduledAt)));
  const completedSessions = sessions?.filter((s) => s.status === "completed") || [];

  const weekEnd = endOfWeek(startOfToday());
  const thisWeekSessions = upcomingSessions.filter((s) => new Date(s.scheduledAt) <= weekEnd);

  return (
    <div className="space-y-8 p-6">
      {/* Welcome Section */}
      <div className="space-y-2">
        <h1 className="font-serif text-3xl font-bold tracking-tight">
          Welcome back, {user?.firstName || "Coach"}
        </h1>
        <p className="text-muted-foreground">
          Here's an overview of your coaching practice.
        </p>
      </div>

      {/* Quick Stats */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Active Clients"
          value={activeClients.length}
          icon={Users}
        />
        <StatCard
          title="Today's Sessions"
          value={todaySessions.length}
          description={`${thisWeekSessions.length} this week`}
          icon={Calendar}
        />
        <StatCard
          title="Total Sessions"
          value={sessions?.length || 0}
          description={`${completedSessions.length} completed`}
          icon={CheckCircle2}
        />
        <StatCard
          title="Pending Intakes"
          value={pendingIntakes.length}
          icon={UserPlus}
        />
      </div>

      {/* Alerts */}
      {pendingIntakes.length > 0 && (
        <Card className="border-amber-200 dark:border-amber-900 bg-amber-50/50 dark:bg-amber-900/10">
          <CardContent className="p-4">
            <div className="flex items-center gap-4">
              <div className="rounded-full bg-amber-100 dark:bg-amber-900/30 p-3">
                <AlertCircle className="h-5 w-5 text-amber-600 dark:text-amber-400" />
              </div>
              <div className="flex-1">
                <p className="font-medium">
                  {pendingIntakes.length} pending intake{pendingIntakes.length !== 1 ? "s" : ""} awaiting review
                </p>
                <p className="text-sm text-muted-foreground">
                  New prospective clients are waiting for your response.
                </p>
              </div>
              <Link href="/coach/intake">
                <Button data-testid="button-review-intakes">
                  Review Now
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Today's Schedule */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between gap-4 space-y-0">
            <div>
              <CardTitle className="text-lg">Today's Schedule</CardTitle>
              <CardDescription>{format(new Date(), "EEEE, MMMM d")}</CardDescription>
            </div>
            <Link href="/coach/sessions">
              <Button variant="ghost" size="sm" data-testid="button-view-all-sessions">
                View All
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </CardHeader>
          <CardContent>
            {todaySessions.length > 0 ? (
              <div className="space-y-3">
                {todaySessions.map((session) => (
                  <Link key={session.id} href={`/coach/sessions/${session.id}`}>
                    <div className="flex items-center gap-4 p-4 rounded-lg bg-muted/50 hover-elevate cursor-pointer">
                      <div className="rounded-full bg-primary/10 p-2">
                        <CalendarDays className="h-4 w-4 text-primary" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium truncate">{session.title}</p>
                        <p className="text-sm text-muted-foreground">
                          {format(new Date(session.scheduledAt), "h:mm a")} · {session.duration} min
                        </p>
                      </div>
                      <Badge variant="secondary">
                        {format(new Date(session.scheduledAt), "h:mm a")}
                      </Badge>
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <EmptyState
                icon={Calendar}
                title="No sessions today"
                description="You don't have any sessions scheduled for today."
              />
            )}
          </CardContent>
        </Card>

        {/* Recent Clients */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between gap-4 space-y-0">
            <div>
              <CardTitle className="text-lg">Active Clients</CardTitle>
              <CardDescription>Your current coaching clients</CardDescription>
            </div>
            <Link href="/coach/clients">
              <Button variant="ghost" size="sm" data-testid="button-view-all-clients">
                View All
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </CardHeader>
          <CardContent>
            {activeClients.length > 0 ? (
              <div className="space-y-3">
                {activeClients.slice(0, 5).map((client) => (
                  <Link key={client.id} href={`/coach/clients/${client.id}`}>
                    <div className="flex items-center gap-4 p-3 rounded-lg hover-elevate cursor-pointer">
                      <div className="rounded-full bg-primary/10 h-10 w-10 flex items-center justify-center">
                        <Users className="h-5 w-5 text-primary" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium truncate">Client #{client.id.slice(0, 8)}</p>
                        <p className="text-sm text-muted-foreground truncate">
                          {client.goals?.slice(0, 50) || "No goals specified"}...
                        </p>
                      </div>
                      <Badge variant="outline" className="text-green-600 dark:text-green-400">
                        Active
                      </Badge>
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <EmptyState
                icon={Users}
                title="No active clients"
                description="Accept intake requests to add new clients."
              />
            )}
          </CardContent>
        </Card>
      </div>

      {/* Upcoming This Week */}
      {thisWeekSessions.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">This Week's Sessions</CardTitle>
            <CardDescription>Upcoming sessions for the rest of the week</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
              {thisWeekSessions.slice(0, 6).map((session) => (
                <Link key={session.id} href={`/coach/sessions/${session.id}`}>
                  <div className="p-4 rounded-lg border bg-card hover-elevate cursor-pointer">
                    <div className="flex items-center gap-3 mb-2">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm font-medium">
                        {format(new Date(session.scheduledAt), "EEE, MMM d")}
                      </span>
                    </div>
                    <p className="font-medium truncate">{session.title}</p>
                    <p className="text-sm text-muted-foreground">
                      {format(new Date(session.scheduledAt), "h:mm a")} · {session.duration} min
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
