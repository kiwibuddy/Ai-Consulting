import { useState } from "react";
import { format } from "date-fns";
import { formatInTimeZone, toZonedTime } from "date-fns-tz";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Globe, Calendar, Clock, User, Users, Loader2, Check, X, Edit2 } from "lucide-react";
import { TimezoneSelector } from "@/components/timezone-selector";

interface TimezoneConfirmationDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
  onCancel?: () => void;
  isLoading?: boolean;
  mode: "request" | "confirm";
  sessionTitle: string;
  sessionDescription?: string;
  scheduledAt: Date | string;
  duration: number;
  clientTimezone: string;
  coachTimezone: string;
  onCoachTimezoneChange?: (timezone: string) => void;
  requestedBy: "client" | "coach";
  clientName?: string;
  coachName?: string;
}

export function TimezoneConfirmationDialog({
  open,
  onOpenChange,
  onConfirm,
  onCancel,
  isLoading = false,
  mode,
  sessionTitle,
  sessionDescription,
  scheduledAt,
  duration,
  clientTimezone,
  coachTimezone,
  onCoachTimezoneChange,
  requestedBy,
  clientName = "Client",
  coachName = "Consultant",
}: TimezoneConfirmationDialogProps) {
  const [isEditingTimezone, setIsEditingTimezone] = useState(false);
  const sessionDate = typeof scheduledAt === "string" ? new Date(scheduledAt) : scheduledAt;

  const clientDateTime = formatInTimeZone(sessionDate, clientTimezone, "EEEE, MMMM d, yyyy");
  const clientTime = formatInTimeZone(sessionDate, clientTimezone, "h:mm a");
  const clientTzAbbr = formatInTimeZone(sessionDate, clientTimezone, "zzz");

  const coachDateTime = formatInTimeZone(sessionDate, coachTimezone, "EEEE, MMMM d, yyyy");
  const coachTime = formatInTimeZone(sessionDate, coachTimezone, "h:mm a");
  const coachTzAbbr = formatInTimeZone(sessionDate, coachTimezone, "zzz");

  const areDifferentDates = clientDateTime !== coachDateTime;
  const areDifferentTimezones = clientTimezone !== coachTimezone;

  const getTitle = () => {
    if (mode === "request") {
      return requestedBy === "client" 
        ? "Confirm Your Session Request" 
        : "Confirm Session Schedule";
    }
    return "Confirm Session";
  };

  const getDescription = () => {
    if (mode === "request") {
      return requestedBy === "client"
        ? "Please review the session details and timezone information before submitting your request."
        : "Please review the session details. The client will need to confirm this session.";
    }
    return requestedBy === "client"
      ? "Your consultant has proposed this session. Please confirm the time works for you."
      : "The client has requested this session. Please confirm to schedule it.";
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Globe className="h-5 w-5 text-primary" />
            {getTitle()}
          </DialogTitle>
          <DialogDescription>
            {getDescription()}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div className="space-y-2">
            <h3 className="font-semibold text-lg">{sessionTitle}</h3>
            {sessionDescription && (
              <p className="text-sm text-muted-foreground">{sessionDescription}</p>
            )}
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Clock className="h-4 w-4" />
              <span>{duration} minutes</span>
            </div>
          </div>

          <Separator />

          {areDifferentTimezones && (
            <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg p-3">
              <p className="text-sm text-amber-800 dark:text-amber-200 flex items-center gap-2">
                <Globe className="h-4 w-4" />
                <span className="font-medium">Different timezones detected</span>
              </p>
              <p className="text-xs text-amber-700 dark:text-amber-300 mt-1">
                Please verify the session time is correct for both parties.
              </p>
            </div>
          )}

          <div className="grid gap-4 md:grid-cols-2">
            <Card className={requestedBy === "client" && mode === "confirm" ? "ring-2 ring-primary" : ""}>
              <CardContent className="p-4 space-y-2">
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4 text-muted-foreground" />
                  <span className="font-medium text-sm">{clientName}</span>
                  {mode === "confirm" && requestedBy !== "client" && (
                    <Badge variant="outline" className="text-xs">You</Badge>
                  )}
                  {mode === "request" && requestedBy === "client" && (
                    <Badge variant="outline" className="text-xs">You</Badge>
                  )}
                </div>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Globe className="h-3 w-3" />
                  <span>{clientTimezone}</span>
                </div>
                <Separator className="my-2" />
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-primary" />
                    <span className="font-medium">{clientDateTime}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-primary" />
                    <span className="text-lg font-bold">{clientTime}</span>
                    <Badge variant="secondary" className="text-xs">{clientTzAbbr}</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className={requestedBy === "coach" && mode === "confirm" ? "ring-2 ring-primary" : ""}>
              <CardContent className="p-4 space-y-2">
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-muted-foreground" />
                  <span className="font-medium text-sm">{coachName}</span>
                  {mode === "confirm" && requestedBy !== "coach" && (
                    <Badge variant="outline" className="text-xs">You</Badge>
                  )}
                  {mode === "request" && requestedBy === "coach" && (
                    <Badge variant="outline" className="text-xs">You</Badge>
                  )}
                </div>
                {isEditingTimezone && onCoachTimezoneChange ? (
                  <div className="space-y-2">
                    <TimezoneSelector
                      value={coachTimezone}
                      onChange={(tz) => {
                        onCoachTimezoneChange(tz);
                        setIsEditingTimezone(false);
                      }}
                      showCurrentTime={false}
                    />
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setIsEditingTimezone(false)}
                      className="text-xs"
                    >
                      Cancel
                    </Button>
                  </div>
                ) : (
                  <div 
                    className={`flex items-center gap-2 text-xs text-muted-foreground ${onCoachTimezoneChange ? 'cursor-pointer hover:text-foreground group' : ''}`}
                    onClick={() => onCoachTimezoneChange && setIsEditingTimezone(true)}
                  >
                    <Globe className="h-3 w-3" />
                    <span>{coachTimezone}</span>
                    {onCoachTimezoneChange && (
                      <Edit2 className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                    )}
                  </div>
                )}
                <Separator className="my-2" />
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-primary" />
                    <span className="font-medium">{coachDateTime}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-primary" />
                    <span className="text-lg font-bold">{coachTime}</span>
                    <Badge variant="secondary" className="text-xs">{coachTzAbbr}</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {areDifferentDates && (
            <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-3">
              <p className="text-sm text-blue-800 dark:text-blue-200">
                <strong>Note:</strong> Due to the timezone difference, this session falls on different calendar dates for each participant.
              </p>
            </div>
          )}
        </div>

        <DialogFooter className="gap-2 sm:gap-0">
          {onCancel && (
            <Button
              variant="outline"
              onClick={onCancel}
              disabled={isLoading}
              data-testid="button-timezone-cancel"
            >
              <X className="mr-2 h-4 w-4" />
              Cancel
            </Button>
          )}
          <Button
            onClick={onConfirm}
            disabled={isLoading}
            data-testid="button-timezone-confirm"
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Processing...
              </>
            ) : (
              <>
                <Check className="mr-2 h-4 w-4" />
                {mode === "request" ? "Submit Request" : "Confirm Session"}
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
