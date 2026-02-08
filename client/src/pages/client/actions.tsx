import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { format } from "date-fns";
import { apiRequest } from "@/lib/queryClient";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { EmptyState } from "@/components/empty-state";
import { TableSkeleton } from "@/components/loading-skeleton";
import { useToast } from "@/hooks/use-toast";
import type { ActionItem } from "@shared/schema";
import { Target, CheckCircle2, Clock, AlertCircle } from "lucide-react";

export default function ClientActions() {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: actionItems, isLoading } = useQuery<ActionItem[]>({
    queryKey: ["/api/client/actions"],
  });

  const toggleAction = useMutation({
    mutationFn: async ({ id, status }: { id: string; status: string }) => {
      return apiRequest("PATCH", `/api/client/actions/${id}`, { status });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/client/actions"] });
      toast({
        title: "Action Updated",
        description: "Your action item has been updated.",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to update action. Please try again.",
        variant: "destructive",
      });
    },
  });

  if (isLoading) {
    return (
      <div className="p-6">
        <TableSkeleton />
      </div>
    );
  }

  const pendingActions = actionItems?.filter((a) => a.status === "pending") || [];
  const inProgressActions = actionItems?.filter((a) => a.status === "in_progress") || [];
  const completedActions = actionItems?.filter((a) => a.status === "completed") || [];

  const allPending = [...pendingActions, ...inProgressActions];
  const progress = actionItems?.length
    ? Math.round((completedActions.length / actionItems.length) * 100)
    : 0;

  const ActionCard = ({ action }: { action: ActionItem }) => {
    const isOverdue = action.dueDate && new Date(action.dueDate) < new Date() && action.status !== "completed";
    
    return (
      <Card className={`hover-elevate ${isOverdue ? "border-red-200 dark:border-red-900" : ""}`}>
        <CardContent className="p-5">
          <div className="flex items-start gap-4">
            <Checkbox
              checked={action.status === "completed"}
              onCheckedChange={(checked) => {
                toggleAction.mutate({
                  id: action.id,
                  status: checked ? "completed" : "pending",
                });
              }}
              data-testid={`checkbox-action-${action.id}`}
              className="mt-1"
            />
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <h3
                  className={`font-medium ${
                    action.status === "completed" ? "line-through text-muted-foreground" : ""
                  }`}
                >
                  {action.title}
                </h3>
                {isOverdue && (
                  <Badge variant="destructive" className="text-xs">
                    <AlertCircle className="mr-1 h-3 w-3" />
                    Overdue
                  </Badge>
                )}
                <Badge
                  variant={
                    (action.status ?? "") === "completed"
                      ? "default"
                      : (action.status ?? "") === "in_progress"
                      ? "secondary"
                      : "outline"
                  }
                  className="text-xs"
                >
                  {(action.status ?? "pending").replace("_", " ")}
                </Badge>
              </div>
              {action.description && (
                <p className="text-sm text-muted-foreground mt-1">{action.description}</p>
              )}
              <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                {action.dueDate && (
                  <span className={`flex items-center gap-1 ${isOverdue ? "text-red-600 dark:text-red-400" : ""}`}>
                    <Clock className="h-3 w-3" />
                    Due {format(new Date(action.dueDate), "MMM d, yyyy")}
                  </span>
                )}
                <span>Created {format(new Date(action.createdAt!), "MMM d")}</span>
              </div>
            </div>
            {action.status !== "completed" && (
              <div className="flex gap-2">
                {action.status === "pending" && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() =>
                      toggleAction.mutate({ id: action.id, status: "in_progress" })
                    }
                    data-testid={`button-start-${action.id}`}
                  >
                    Start
                  </Button>
                )}
                <Button
                  size="sm"
                  onClick={() =>
                    toggleAction.mutate({ id: action.id, status: "completed" })
                  }
                  data-testid={`button-complete-${action.id}`}
                >
                  Complete
                </Button>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="space-y-6 p-6">
      <div>
        <h1 className="font-serif text-3xl font-bold tracking-tight">Action Items</h1>
        <p className="text-muted-foreground">
          Track and complete your consulting action items.
        </p>
      </div>

      {/* Progress Overview */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center gap-6">
            <div className="rounded-full bg-primary/10 p-4">
              <Target className="h-8 w-8 text-primary" />
            </div>
            <div className="flex-1 space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-medium">Overall Progress</span>
                <span className="text-sm text-muted-foreground">
                  {completedActions.length} of {actionItems?.length || 0} completed
                </span>
              </div>
              <Progress value={progress} className="h-3" />
            </div>
            <div className="text-3xl font-bold text-primary">{progress}%</div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="active" className="space-y-6">
        <TabsList>
          <TabsTrigger value="active" data-testid="tab-active">
            Active ({allPending.length})
          </TabsTrigger>
          <TabsTrigger value="completed" data-testid="tab-completed">
            Completed ({completedActions.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="active" className="space-y-4">
          {allPending.length > 0 ? (
            allPending.map((action) => <ActionCard key={action.id} action={action} />)
          ) : (
            <Card>
              <CardContent className="py-12">
                <EmptyState
                  icon={CheckCircle2}
                  title="All caught up!"
                  description="You've completed all your action items. Great work!"
                />
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="completed" className="space-y-4">
          {completedActions.length > 0 ? (
            completedActions.map((action) => <ActionCard key={action.id} action={action} />)
          ) : (
            <Card>
              <CardContent className="py-12">
                <EmptyState
                  icon={Target}
                  title="No completed actions"
                  description="Completed action items will appear here."
                />
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
