import { useState, useMemo } from "react";
import {
  format,
  startOfWeek,
  endOfWeek,
  startOfMonth,
  endOfMonth,
  startOfYear,
  endOfYear,
  eachDayOfInterval,
  eachWeekOfInterval,
  eachMonthOfInterval,
  isSameDay,
  isSameMonth,
  addDays,
  addWeeks,
  addMonths,
  addYears,
  subDays,
  subWeeks,
  subMonths,
  subYears,
} from "date-fns";
import { formatInTimeZone } from "date-fns-tz";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import type { Session } from "@shared/schema";
import { ChevronLeft, ChevronRight, Calendar, Clock, Globe } from "lucide-react";
import { cn } from "@/lib/utils";

type CalendarView = "week" | "month" | "year";

interface SessionCalendarProps {
  sessions: Session[];
  userTimezone: string;
  onSessionClick?: (session: Session) => void;
}

export function SessionCalendar({
  sessions,
  userTimezone,
  onSessionClick,
}: SessionCalendarProps) {
  const [view, setView] = useState<CalendarView>("month");
  const [currentDate, setCurrentDate] = useState(new Date());

  const navigatePrevious = () => {
    switch (view) {
      case "week":
        setCurrentDate(subWeeks(currentDate, 1));
        break;
      case "month":
        setCurrentDate(subMonths(currentDate, 1));
        break;
      case "year":
        setCurrentDate(subYears(currentDate, 1));
        break;
    }
  };

  const navigateNext = () => {
    switch (view) {
      case "week":
        setCurrentDate(addWeeks(currentDate, 1));
        break;
      case "month":
        setCurrentDate(addMonths(currentDate, 1));
        break;
      case "year":
        setCurrentDate(addYears(currentDate, 1));
        break;
    }
  };

  const goToToday = () => {
    setCurrentDate(new Date());
  };

  const getSessionsForDate = (date: Date) => {
    return sessions.filter((session) =>
      isSameDay(new Date(session.scheduledAt), date)
    );
  };

  const getSessionsForMonth = (date: Date) => {
    return sessions.filter((session) =>
      isSameMonth(new Date(session.scheduledAt), date)
    );
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "scheduled":
        return "bg-primary text-primary-foreground";
      case "completed":
        return "bg-green-500 text-white";
      case "pending_confirmation":
        return "bg-amber-500 text-white";
      case "cancelled":
        return "bg-destructive text-destructive-foreground";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  const getViewTitle = () => {
    switch (view) {
      case "week":
        const weekStart = startOfWeek(currentDate, { weekStartsOn: 0 });
        const weekEnd = endOfWeek(currentDate, { weekStartsOn: 0 });
        return `${format(weekStart, "MMM d")} - ${format(weekEnd, "MMM d, yyyy")}`;
      case "month":
        return format(currentDate, "MMMM yyyy");
      case "year":
        return format(currentDate, "yyyy");
    }
  };

  return (
    <Card>
      <CardHeader className="pb-4">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-2">
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Calendar
            </CardTitle>
            <Badge variant="outline" className="text-xs">
              <Globe className="h-3 w-3 mr-1" />
              {userTimezone}
            </Badge>
          </div>
          <Tabs value={view} onValueChange={(v) => setView(v as CalendarView)}>
            <TabsList>
              <TabsTrigger value="week" data-testid="tab-calendar-week">Week</TabsTrigger>
              <TabsTrigger value="month" data-testid="tab-calendar-month">Month</TabsTrigger>
              <TabsTrigger value="year" data-testid="tab-calendar-year">Year</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
        <div className="flex items-center justify-between gap-4 pt-2">
          <div className="flex items-center gap-2">
            <Button size="icon" variant="outline" onClick={navigatePrevious} data-testid="button-calendar-prev">
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button size="icon" variant="outline" onClick={navigateNext} data-testid="button-calendar-next">
              <ChevronRight className="h-4 w-4" />
            </Button>
            <Button variant="outline" onClick={goToToday} data-testid="button-calendar-today">
              Today
            </Button>
          </div>
          <h3 className="text-lg font-semibold">{getViewTitle()}</h3>
        </div>
      </CardHeader>
      <CardContent>
        {view === "week" && (
          <WeekView
            currentDate={currentDate}
            sessions={sessions}
            userTimezone={userTimezone}
            getSessionsForDate={getSessionsForDate}
            getStatusColor={getStatusColor}
            onSessionClick={onSessionClick}
          />
        )}
        {view === "month" && (
          <MonthView
            currentDate={currentDate}
            sessions={sessions}
            userTimezone={userTimezone}
            getSessionsForDate={getSessionsForDate}
            getStatusColor={getStatusColor}
            onSessionClick={onSessionClick}
          />
        )}
        {view === "year" && (
          <YearView
            currentDate={currentDate}
            getSessionsForMonth={getSessionsForMonth}
            getStatusColor={getStatusColor}
            onMonthClick={(month) => {
              setCurrentDate(month);
              setView("month");
            }}
          />
        )}
      </CardContent>
    </Card>
  );
}

function WeekView({
  currentDate,
  sessions,
  userTimezone,
  getSessionsForDate,
  getStatusColor,
  onSessionClick,
}: {
  currentDate: Date;
  sessions: Session[];
  userTimezone: string;
  getSessionsForDate: (date: Date) => Session[];
  getStatusColor: (status: string) => string;
  onSessionClick?: (session: Session) => void;
}) {
  const weekStart = startOfWeek(currentDate, { weekStartsOn: 0 });
  const weekDays = eachDayOfInterval({
    start: weekStart,
    end: endOfWeek(currentDate, { weekStartsOn: 0 }),
  });

  return (
    <div className="grid grid-cols-7 gap-1">
      {weekDays.map((day) => (
        <div key={day.toISOString()} className="min-h-[120px]">
          <div
            className={cn(
              "text-center py-2 font-medium text-sm rounded-t-md",
              isSameDay(day, new Date())
                ? "bg-primary text-primary-foreground"
                : "bg-muted"
            )}
          >
            <div>{format(day, "EEE")}</div>
            <div className="text-lg">{format(day, "d")}</div>
          </div>
          <div className="border border-t-0 rounded-b-md p-1 space-y-1 min-h-[80px]">
            {getSessionsForDate(day).map((session) => (
              <Tooltip key={session.id}>
                <TooltipTrigger asChild>
                  <button
                    className={cn(
                      "w-full text-left text-xs p-1 rounded truncate",
                      getStatusColor(session.status || "scheduled")
                    )}
                    onClick={() => onSessionClick?.(session)}
                    data-testid={`calendar-session-${session.id}`}
                  >
                    <div className="flex items-center gap-1">
                      <Clock className="h-3 w-3 shrink-0" />
                      <span className="truncate">
                        {formatInTimeZone(new Date(session.scheduledAt), userTimezone, "h:mm a")}
                      </span>
                    </div>
                    <div className="truncate font-medium">{session.title}</div>
                  </button>
                </TooltipTrigger>
                <TooltipContent>
                  <div className="text-sm">
                    <div className="font-semibold">{session.title}</div>
                    <div>{formatInTimeZone(new Date(session.scheduledAt), userTimezone, "h:mm a zzz")}</div>
                    <div>{session.duration} min</div>
                  </div>
                </TooltipContent>
              </Tooltip>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

function MonthView({
  currentDate,
  sessions,
  userTimezone,
  getSessionsForDate,
  getStatusColor,
  onSessionClick,
}: {
  currentDate: Date;
  sessions: Session[];
  userTimezone: string;
  getSessionsForDate: (date: Date) => Session[];
  getStatusColor: (status: string) => string;
  onSessionClick?: (session: Session) => void;
}) {
  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(currentDate);
  const calendarStart = startOfWeek(monthStart, { weekStartsOn: 0 });
  const calendarEnd = endOfWeek(monthEnd, { weekStartsOn: 0 });

  const days = eachDayOfInterval({ start: calendarStart, end: calendarEnd });
  const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return (
    <div>
      <div className="grid grid-cols-7 gap-1 mb-1">
        {weekdays.map((day) => (
          <div key={day} className="text-center text-sm font-medium text-muted-foreground py-2">
            {day}
          </div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-1">
        {days.map((day) => {
          const daySessions = getSessionsForDate(day);
          const isCurrentMonth = isSameMonth(day, currentDate);
          const isToday = isSameDay(day, new Date());

          return (
            <div
              key={day.toISOString()}
              className={cn(
                "min-h-[80px] border rounded-md p-1",
                !isCurrentMonth && "opacity-40",
                isToday && "ring-2 ring-primary"
              )}
            >
              <div
                className={cn(
                  "text-sm font-medium mb-1",
                  isToday && "text-primary"
                )}
              >
                {format(day, "d")}
              </div>
              <div className="space-y-0.5">
                {daySessions.slice(0, 2).map((session) => (
                  <Tooltip key={session.id}>
                    <TooltipTrigger asChild>
                      <button
                        className={cn(
                          "w-full text-left text-xs p-0.5 rounded truncate",
                          getStatusColor(session.status || "scheduled")
                        )}
                        onClick={() => onSessionClick?.(session)}
                        data-testid={`calendar-session-${session.id}`}
                      >
                        {session.title}
                      </button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <div className="text-sm">
                        <div className="font-semibold">{session.title}</div>
                        <div>{formatInTimeZone(new Date(session.scheduledAt), userTimezone, "h:mm a zzz")}</div>
                        <div>{session.duration} min</div>
                      </div>
                    </TooltipContent>
                  </Tooltip>
                ))}
                {daySessions.length > 2 && (
                  <div className="text-xs text-muted-foreground">
                    +{daySessions.length - 2} more
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function YearView({
  currentDate,
  getSessionsForMonth,
  getStatusColor,
  onMonthClick,
}: {
  currentDate: Date;
  getSessionsForMonth: (date: Date) => Session[];
  getStatusColor: (status: string) => string;
  onMonthClick: (month: Date) => void;
}) {
  const yearStart = startOfYear(currentDate);
  const yearEnd = endOfYear(currentDate);
  const months = eachMonthOfInterval({ start: yearStart, end: yearEnd });

  return (
    <div className="grid grid-cols-3 sm:grid-cols-4 gap-4">
      {months.map((month) => {
        const monthSessions = getSessionsForMonth(month);
        const isCurrentMonth = isSameMonth(month, new Date());

        return (
          <button
            key={month.toISOString()}
            onClick={() => onMonthClick(month)}
            className={cn(
              "p-4 border rounded-lg text-left hover-elevate transition-colors",
              isCurrentMonth && "ring-2 ring-primary"
            )}
            data-testid={`calendar-month-${format(month, "MMM").toLowerCase()}`}
          >
            <div className="font-semibold text-lg mb-2">{format(month, "MMM")}</div>
            <div className="text-sm text-muted-foreground">
              {monthSessions.length} session{monthSessions.length !== 1 ? "s" : ""}
            </div>
            {monthSessions.length > 0 && (
              <div className="flex flex-wrap gap-1 mt-2">
                {monthSessions.slice(0, 3).map((session) => (
                  <div
                    key={session.id}
                    className={cn("w-2 h-2 rounded-full", getStatusColor(session.status || "scheduled"))}
                  />
                ))}
                {monthSessions.length > 3 && (
                  <span className="text-xs text-muted-foreground">+{monthSessions.length - 3}</span>
                )}
              </div>
            )}
          </button>
        );
      })}
    </div>
  );
}
