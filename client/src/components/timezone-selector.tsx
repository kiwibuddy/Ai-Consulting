import { useState, useMemo } from "react";
import { Check, ChevronsUpDown, Globe, Search } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const commonTimezones = [
  { value: "America/New_York", label: "Eastern Time (ET)", region: "Americas", keywords: "new york nyc boston miami philadelphia washington dc east coast usa" },
  { value: "America/Chicago", label: "Central Time (CT)", region: "Americas", keywords: "chicago dallas houston austin central usa" },
  { value: "America/Denver", label: "Mountain Time (MT)", region: "Americas", keywords: "denver phoenix salt lake city mountain usa" },
  { value: "America/Los_Angeles", label: "Pacific Time (PT)", region: "Americas", keywords: "los angeles la san francisco seattle portland west coast usa california" },
  { value: "America/Anchorage", label: "Alaska Time (AKT)", region: "Americas", keywords: "alaska anchorage usa" },
  { value: "Pacific/Honolulu", label: "Hawaii Time (HST)", region: "Americas", keywords: "hawaii honolulu usa" },
  { value: "America/Toronto", label: "Toronto (ET)", region: "Americas", keywords: "toronto canada ontario" },
  { value: "America/Vancouver", label: "Vancouver (PT)", region: "Americas", keywords: "vancouver canada british columbia" },
  { value: "America/Mexico_City", label: "Mexico City (CT)", region: "Americas", keywords: "mexico city mexico" },
  { value: "America/Sao_Paulo", label: "Sao Paulo (BRT)", region: "Americas", keywords: "sao paulo brazil brasil rio" },
  { value: "America/Buenos_Aires", label: "Buenos Aires (ART)", region: "Americas", keywords: "buenos aires argentina" },
  { value: "Europe/London", label: "London (GMT/BST)", region: "Europe", keywords: "london uk united kingdom england britain" },
  { value: "Europe/Paris", label: "Paris (CET)", region: "Europe", keywords: "paris france" },
  { value: "Europe/Berlin", label: "Berlin (CET)", region: "Europe", keywords: "berlin germany deutschland" },
  { value: "Europe/Amsterdam", label: "Amsterdam (CET)", region: "Europe", keywords: "amsterdam netherlands holland" },
  { value: "Europe/Rome", label: "Rome (CET)", region: "Europe", keywords: "rome italy italia milan" },
  { value: "Europe/Madrid", label: "Madrid (CET)", region: "Europe", keywords: "madrid spain barcelona" },
  { value: "Europe/Zurich", label: "Zurich (CET)", region: "Europe", keywords: "zurich switzerland geneva" },
  { value: "Europe/Stockholm", label: "Stockholm (CET)", region: "Europe", keywords: "stockholm sweden" },
  { value: "Europe/Moscow", label: "Moscow (MSK)", region: "Europe", keywords: "moscow russia" },
  { value: "Asia/Dubai", label: "Dubai (GST)", region: "Asia", keywords: "dubai uae abu dhabi" },
  { value: "Asia/Kolkata", label: "India (IST)", region: "Asia", keywords: "india mumbai delhi bangalore kolkata chennai" },
  { value: "Asia/Singapore", label: "Singapore (SGT)", region: "Asia", keywords: "singapore" },
  { value: "Asia/Hong_Kong", label: "Hong Kong (HKT)", region: "Asia", keywords: "hong kong china" },
  { value: "Asia/Tokyo", label: "Tokyo (JST)", region: "Asia", keywords: "tokyo japan osaka" },
  { value: "Asia/Seoul", label: "Seoul (KST)", region: "Asia", keywords: "seoul korea south korea" },
  { value: "Asia/Shanghai", label: "Shanghai (CST)", region: "Asia", keywords: "shanghai china beijing" },
  { value: "Australia/Sydney", label: "Sydney (AEST)", region: "Oceania", keywords: "sydney australia" },
  { value: "Australia/Melbourne", label: "Melbourne (AEST)", region: "Oceania", keywords: "melbourne australia" },
  { value: "Australia/Perth", label: "Perth (AWST)", region: "Oceania", keywords: "perth australia western" },
  { value: "Pacific/Auckland", label: "Auckland (NZST)", region: "Oceania", keywords: "auckland new zealand nz wellington" },
  { value: "Africa/Johannesburg", label: "Johannesburg (SAST)", region: "Africa", keywords: "johannesburg south africa cape town" },
  { value: "Africa/Cairo", label: "Cairo (EET)", region: "Africa", keywords: "cairo egypt" },
  { value: "Africa/Lagos", label: "Lagos (WAT)", region: "Africa", keywords: "lagos nigeria" },
  { value: "UTC", label: "UTC (Coordinated Universal Time)", region: "Universal", keywords: "utc gmt universal" },
];

interface TimezoneSelectorProps {
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
  placeholder?: string;
}

export function TimezoneSelector({
  value,
  onChange,
  disabled = false,
  placeholder = "Select timezone",
}: TimezoneSelectorProps) {
  const [open, setOpen] = useState(false);

  const selectedTimezone = commonTimezones.find((tz) => tz.value === value);

  const groupedTimezones = useMemo(() => {
    const groups: Record<string, typeof commonTimezones> = {};
    commonTimezones.forEach((tz) => {
      if (!groups[tz.region]) {
        groups[tz.region] = [];
      }
      groups[tz.region].push(tz);
    });
    return groups;
  }, []);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          disabled={disabled}
          className="w-full justify-between"
          data-testid="button-timezone-select"
        >
          <span className="flex items-center gap-2 truncate">
            <Globe className="h-4 w-4 shrink-0" />
            {selectedTimezone ? selectedTimezone.label : placeholder}
          </span>
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[350px] p-0" align="start">
        <Command>
          <CommandInput placeholder="Search timezone..." />
          <CommandList>
            <CommandEmpty>No timezone found.</CommandEmpty>
            {Object.entries(groupedTimezones).map(([region, timezones]) => (
              <CommandGroup key={region} heading={region}>
                {timezones.map((tz) => (
                  <CommandItem
                    key={tz.value}
                    value={`${tz.label} ${tz.value} ${tz.keywords}`}
                    onSelect={() => {
                      onChange(tz.value);
                      setOpen(false);
                    }}
                    data-testid={`timezone-option-${tz.value.replace(/\//g, "-")}`}
                  >
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4",
                        value === tz.value ? "opacity-100" : "opacity-0"
                      )}
                    />
                    <div className="flex flex-col">
                      <span>{tz.label}</span>
                      <span className="text-xs text-muted-foreground">{tz.value}</span>
                    </div>
                  </CommandItem>
                ))}
              </CommandGroup>
            ))}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}

export function detectUserTimezone(): string {
  try {
    return Intl.DateTimeFormat().resolvedOptions().timeZone;
  } catch {
    return "UTC";
  }
}
