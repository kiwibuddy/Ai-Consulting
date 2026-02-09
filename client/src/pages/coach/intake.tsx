import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { format } from "date-fns";
import { apiRequest } from "@/lib/queryClient";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { EmptyState } from "@/components/empty-state";
import { TableSkeleton } from "@/components/loading-skeleton";
import { useToast } from "@/hooks/use-toast";
import type { IntakeForm } from "@shared/schema";
import { UserPlus, Check, X, Mail, Phone, Calendar, Target, Loader2 } from "lucide-react";
import { useState } from "react";

type DialogMode = "accept" | "decline" | null;

export default function CoachIntake() {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [selectedIntake, setSelectedIntake] = useState<IntakeForm | null>(null);
  const [dialogMode, setDialogMode] = useState<DialogMode>(null);
  const [notes, setNotes] = useState("");

  const { data: intakes, isLoading } = useQuery<IntakeForm[]>({
    queryKey: ["/api/coach/intake"],
  });

  const updateIntake = useMutation({
    mutationFn: async ({ id, status, coachNotes }: { id: string; status: string; coachNotes?: string }) => {
      return apiRequest("PATCH", `/api/coach/intake/${id}`, { status, coachNotes });
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["/api/coach/intake"] });
      queryClient.invalidateQueries({ queryKey: ["/api/coach/clients"] });
      toast({
        title: variables.status === "accepted" ? "Intake Accepted" : "Intake Declined",
        description:
          variables.status === "accepted"
            ? "A new client profile has been created."
            : "The intake request has been declined.",
      });
      setSelectedIntake(null);
      setDialogMode(null);
      setNotes("");
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to update intake. Please try again.",
        variant: "destructive",
      });
    },
  });

  const closeDialog = () => {
    setDialogMode(null);
    setSelectedIntake(null);
    setNotes("");
  };

  if (isLoading) {
    return (
      <div className="p-6">
        <TableSkeleton />
      </div>
    );
  }

  const pendingIntakes = intakes?.filter((i) => i.status === "pending") || [];
  const processedIntakes = intakes?.filter((i) => i.status !== "pending") || [];

  const IntakeCard = ({ intake, showActions = false }: { intake: IntakeForm; showActions?: boolean }) => (
    <Card className="hover-elevate">
      <CardContent className="p-5">
        <div className="flex items-start gap-4">
          <div className="rounded-full bg-primary/10 p-3">
            <UserPlus className="h-5 w-5 text-primary" />
          </div>
          <div className="flex-1 space-y-3">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h3 className="font-semibold">
                  {intake.firstName} {intake.lastName}
                </h3>
                <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-muted-foreground mt-1">
                  <span className="flex items-center gap-1">
                    <Mail className="h-3.5 w-3.5" />
                    {intake.email}
                  </span>
                  {intake.phone && (
                    <span className="flex items-center gap-1">
                      <Phone className="h-3.5 w-3.5" />
                      {intake.phone}
                    </span>
                  )}
                </div>
              </div>
              <Badge
                variant={
                  intake.status === "accepted"
                    ? "default"
                    : intake.status === "declined"
                    ? "destructive"
                    : "secondary"
                }
              >
                {intake.status}
              </Badge>
            </div>

            <div className="space-y-2">
              {(intake.problemStatement || intake.goals) && (
                <div>
                  <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-1">
                    Problem Statement
                  </p>
                  <p className="text-sm">{intake.problemStatement || intake.goals}</p>
                </div>
              )}
              {(intake.organisation || intake.industry) && (
                <div className="flex flex-wrap gap-4 text-xs text-muted-foreground">
                  {intake.organisation && <span>Org: {intake.organisation}</span>}
                  {intake.industry && <span>Industry: {intake.industry}</span>}
                </div>
              )}
              {intake.currentSituation && (
                <div>
                  <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-1">
                    Current Situation
                  </p>
                  <p className="text-sm text-muted-foreground">{intake.currentSituation}</p>
                </div>
              )}
              {intake.shortTermGoals && (
                <div>
                  <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-1">
                    Short-term Goals
                  </p>
                  <p className="text-sm text-muted-foreground">{intake.shortTermGoals}</p>
                </div>
              )}
              {intake.experience && (
                <div>
                  <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-1">
                    Previous Experience
                  </p>
                  <p className="text-sm text-muted-foreground">{intake.experience}</p>
                </div>
              )}
              <div className="flex flex-wrap gap-4 pt-2 text-xs text-muted-foreground">
                {intake.availability && (
                  <span className="flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    Prefers: {intake.availability}
                  </span>
                )}
                {intake.howDidYouHear && (
                  <span>Found via: {intake.howDidYouHear}</span>
                )}
                <span>Submitted: {format(new Date(intake.createdAt!), "MMM d, yyyy")}</span>
              </div>
            </div>

            {showActions && (
              <div className="flex gap-2 pt-2">
                <Button
                  onClick={() => {
                    setSelectedIntake(intake);
                    setDialogMode("accept");
                    setNotes("");
                  }}
                  data-testid={`button-accept-${intake.id}`}
                >
                  <Check className="mr-2 h-4 w-4" />
                  Accept
                </Button>
                <Button
                  variant="outline"
                  onClick={() => {
                    setSelectedIntake(intake);
                    setDialogMode("decline");
                    setNotes("");
                  }}
                  data-testid={`button-decline-${intake.id}`}
                >
                  <X className="mr-2 h-4 w-4" />
                  Decline
                </Button>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="space-y-6 p-6">
      <div>
        <h1 className="font-serif text-3xl font-bold tracking-tight">Intake Requests</h1>
        <p className="text-muted-foreground">
          Review and manage prospective client applications.
        </p>
      </div>

      <Tabs defaultValue="pending" className="space-y-6">
        <TabsList>
          <TabsTrigger value="pending" data-testid="tab-pending">
            Pending ({pendingIntakes.length})
          </TabsTrigger>
          <TabsTrigger value="processed" data-testid="tab-processed">
            Processed ({processedIntakes.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="pending" className="space-y-4">
          {pendingIntakes.length > 0 ? (
            pendingIntakes.map((intake) => (
              <IntakeCard key={intake.id} intake={intake} showActions />
            ))
          ) : (
            <Card>
              <CardContent className="py-12">
                <EmptyState
                  icon={UserPlus}
                  title="No pending intakes"
                  description="New intake requests will appear here."
                />
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="processed" className="space-y-4">
          {processedIntakes.length > 0 ? (
            processedIntakes.map((intake) => <IntakeCard key={intake.id} intake={intake} />)
          ) : (
            <Card>
              <CardContent className="py-12">
                <EmptyState
                  icon={UserPlus}
                  title="No processed intakes"
                  description="Accepted and declined intakes will appear here."
                />
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>

      {/* Controlled Accept dialog - stays open while typing notes */}
      <Dialog open={dialogMode === "accept" && selectedIntake !== null} onOpenChange={(open) => !open && closeDialog()}>
        <DialogContent>
          {selectedIntake && (
            <>
              <DialogHeader>
                <DialogTitle>Accept Intake Request</DialogTitle>
                <DialogDescription>
                  This will create a new client profile for {selectedIntake.firstName} {selectedIntake.lastName}.
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div>
                  <label className="text-sm font-medium">Notes (optional)</label>
                  <Textarea
                    placeholder="Add any notes about this client..."
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    className="mt-2"
                    data-testid="textarea-notes"
                  />
                </div>
              </div>
              <DialogFooter>
                <Button
                  onClick={() =>
                    updateIntake.mutate({
                      id: selectedIntake.id,
                      status: "accepted",
                      coachNotes: notes,
                    })
                  }
                  disabled={updateIntake.isPending}
                  data-testid="button-confirm-accept"
                >
                  {updateIntake.isPending ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    "Confirm & Create Client"
                  )}
                </Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* Controlled Decline dialog */}
      <Dialog open={dialogMode === "decline" && selectedIntake !== null} onOpenChange={(open) => !open && closeDialog()}>
        <DialogContent>
          {selectedIntake && (
            <>
              <DialogHeader>
                <DialogTitle>Decline Intake Request</DialogTitle>
                <DialogDescription>
                  Are you sure you want to decline this request from {selectedIntake.firstName} {selectedIntake.lastName}?
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div>
                  <label className="text-sm font-medium">Reason (optional)</label>
                  <Textarea
                    placeholder="Add a reason for declining..."
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    className="mt-2"
                    data-testid="textarea-decline-reason"
                  />
                </div>
              </div>
              <DialogFooter>
                <Button
                  variant="destructive"
                  onClick={() =>
                    updateIntake.mutate({
                      id: selectedIntake.id,
                      status: "declined",
                      coachNotes: notes,
                    })
                  }
                  disabled={updateIntake.isPending}
                  data-testid="button-confirm-decline"
                >
                  {updateIntake.isPending ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    "Confirm Decline"
                  )}
                </Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
