import { useState, useMemo, useEffect } from "react";
import { Check, ChevronsUpDown, Globe, Clock } from "lucide-react";
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
  // Americas - North
  { value: "America/New_York", label: "New York (ET)", region: "Americas", keywords: "new york nyc boston miami philadelphia washington dc east coast usa eastern" },
  { value: "America/Chicago", label: "Chicago (CT)", region: "Americas", keywords: "chicago dallas houston austin central usa" },
  { value: "America/Denver", label: "Denver (MT)", region: "Americas", keywords: "denver salt lake city mountain usa" },
  { value: "America/Phoenix", label: "Phoenix (MST)", region: "Americas", keywords: "phoenix arizona usa mountain" },
  { value: "America/Los_Angeles", label: "Los Angeles (PT)", region: "Americas", keywords: "los angeles la san francisco seattle portland west coast usa california pacific" },
  { value: "America/Anchorage", label: "Anchorage (AKT)", region: "Americas", keywords: "alaska anchorage usa" },
  { value: "Pacific/Honolulu", label: "Honolulu (HST)", region: "Americas", keywords: "hawaii honolulu usa" },
  { value: "America/Toronto", label: "Toronto (ET)", region: "Americas", keywords: "toronto canada ontario" },
  { value: "America/Vancouver", label: "Vancouver (PT)", region: "Americas", keywords: "vancouver canada british columbia" },
  { value: "America/Montreal", label: "Montreal (ET)", region: "Americas", keywords: "montreal canada quebec" },
  // Americas - Central & South
  { value: "America/Mexico_City", label: "Mexico City (CT)", region: "Americas", keywords: "mexico city mexico" },
  { value: "America/Bogota", label: "Bogota (COT)", region: "Americas", keywords: "bogota colombia" },
  { value: "America/Lima", label: "Lima (PET)", region: "Americas", keywords: "lima peru" },
  { value: "America/Santiago", label: "Santiago (CLT)", region: "Americas", keywords: "santiago chile" },
  { value: "America/Sao_Paulo", label: "São Paulo (BRT)", region: "Americas", keywords: "sao paulo brazil brasil rio" },
  { value: "America/Buenos_Aires", label: "Buenos Aires (ART)", region: "Americas", keywords: "buenos aires argentina" },
  // Europe
  { value: "Europe/London", label: "London (GMT/BST)", region: "Europe", keywords: "london uk united kingdom england britain" },
  { value: "Europe/Dublin", label: "Dublin (GMT/IST)", region: "Europe", keywords: "dublin ireland" },
  { value: "Europe/Lisbon", label: "Lisbon (WET)", region: "Europe", keywords: "lisbon portugal" },
  { value: "Europe/Paris", label: "Paris (CET)", region: "Europe", keywords: "paris france" },
  { value: "Europe/Berlin", label: "Berlin (CET)", region: "Europe", keywords: "berlin germany deutschland munich" },
  { value: "Europe/Amsterdam", label: "Amsterdam (CET)", region: "Europe", keywords: "amsterdam netherlands holland" },
  { value: "Europe/Brussels", label: "Brussels (CET)", region: "Europe", keywords: "brussels belgium" },
  { value: "Europe/Rome", label: "Rome (CET)", region: "Europe", keywords: "rome italy italia milan" },
  { value: "Europe/Madrid", label: "Madrid (CET)", region: "Europe", keywords: "madrid spain barcelona" },
  { value: "Europe/Vienna", label: "Vienna (CET)", region: "Europe", keywords: "vienna austria" },
  { value: "Europe/Zurich", label: "Zurich (CET)", region: "Europe", keywords: "zurich switzerland geneva" },
  { value: "Europe/Stockholm", label: "Stockholm (CET)", region: "Europe", keywords: "stockholm sweden" },
  { value: "Europe/Oslo", label: "Oslo (CET)", region: "Europe", keywords: "oslo norway" },
  { value: "Europe/Copenhagen", label: "Copenhagen (CET)", region: "Europe", keywords: "copenhagen denmark" },
  { value: "Europe/Warsaw", label: "Warsaw (CET)", region: "Europe", keywords: "warsaw poland" },
  { value: "Europe/Prague", label: "Prague (CET)", region: "Europe", keywords: "prague czech" },
  { value: "Europe/Athens", label: "Athens (EET)", region: "Europe", keywords: "athens greece" },
  { value: "Europe/Helsinki", label: "Helsinki (EET)", region: "Europe", keywords: "helsinki finland" },
  { value: "Europe/Istanbul", label: "Istanbul (TRT)", region: "Europe", keywords: "istanbul turkey" },
  { value: "Europe/Moscow", label: "Moscow (MSK)", region: "Europe", keywords: "moscow russia" },
  { value: "Europe/Kiev", label: "Kyiv (EET)", region: "Europe", keywords: "kyiv kiev ukraine" },
  // Asia
  { value: "Asia/Dubai", label: "Dubai (GST)", region: "Asia", keywords: "dubai uae abu dhabi" },
  { value: "Asia/Riyadh", label: "Riyadh (AST)", region: "Asia", keywords: "riyadh saudi arabia" },
  { value: "Asia/Jerusalem", label: "Jerusalem (IST)", region: "Asia", keywords: "jerusalem tel aviv israel" },
  { value: "Asia/Kolkata", label: "Mumbai / Delhi (IST)", region: "Asia", keywords: "india mumbai delhi bangalore kolkata chennai" },
  { value: "Asia/Dhaka", label: "Dhaka (BST)", region: "Asia", keywords: "dhaka bangladesh" },
  { value: "Asia/Bangkok", label: "Bangkok (ICT)", region: "Asia", keywords: "bangkok thailand" },
  { value: "Asia/Ho_Chi_Minh", label: "Ho Chi Minh (ICT)", region: "Asia", keywords: "ho chi minh vietnam saigon hanoi" },
  { value: "Asia/Jakarta", label: "Jakarta (WIB)", region: "Asia", keywords: "jakarta indonesia" },
  { value: "Asia/Singapore", label: "Singapore (SGT)", region: "Asia", keywords: "singapore" },
  { value: "Asia/Kuala_Lumpur", label: "Kuala Lumpur (MYT)", region: "Asia", keywords: "kuala lumpur malaysia" },
  { value: "Asia/Manila", label: "Manila (PHT)", region: "Asia", keywords: "manila philippines" },
  { value: "Asia/Hong_Kong", label: "Hong Kong (HKT)", region: "Asia", keywords: "hong kong china" },
  { value: "Asia/Shanghai", label: "Shanghai / Beijing (CST)", region: "Asia", keywords: "shanghai china beijing" },
  { value: "Asia/Taipei", label: "Taipei (CST)", region: "Asia", keywords: "taipei taiwan" },
  { value: "Asia/Tokyo", label: "Tokyo (JST)", region: "Asia", keywords: "tokyo japan osaka" },
  { value: "Asia/Seoul", label: "Seoul (KST)", region: "Asia", keywords: "seoul korea south korea" },
  // Oceania / Pacific
  { value: "Australia/Perth", label: "Perth (AWST)", region: "Oceania", keywords: "perth australia western" },
  { value: "Australia/Darwin", label: "Darwin (ACST)", region: "Oceania", keywords: "darwin australia northern territory" },
  { value: "Australia/Adelaide", label: "Adelaide (ACDT)", region: "Oceania", keywords: "adelaide australia south" },
  { value: "Australia/Brisbane", label: "Brisbane (AEST)", region: "Oceania", keywords: "brisbane australia queensland" },
  { value: "Australia/Sydney", label: "Sydney (AEDT)", region: "Oceania", keywords: "sydney australia new south wales" },
  { value: "Australia/Melbourne", label: "Melbourne (AEDT)", region: "Oceania", keywords: "melbourne australia victoria" },
  { value: "Australia/Hobart", label: "Hobart (AEDT)", region: "Oceania", keywords: "hobart australia tasmania" },
  { value: "Pacific/Auckland", label: "Auckland (NZDT)", region: "Oceania", keywords: "auckland new zealand nz wellington christchurch" },
  { value: "Pacific/Fiji", label: "Fiji (FJT)", region: "Oceania", keywords: "fiji suva" },
  { value: "Pacific/Guam", label: "Guam (ChST)", region: "Oceania", keywords: "guam" },
  // Africa
  { value: "Africa/Cairo", label: "Cairo (EET)", region: "Africa", keywords: "cairo egypt" },
  { value: "Africa/Johannesburg", label: "Johannesburg (SAST)", region: "Africa", keywords: "johannesburg south africa cape town" },
  { value: "Africa/Lagos", label: "Lagos (WAT)", region: "Africa", keywords: "lagos nigeria" },
  { value: "Africa/Nairobi", label: "Nairobi (EAT)", region: "Africa", keywords: "nairobi kenya" },
  { value: "Africa/Casablanca", label: "Casablanca (WET)", region: "Africa", keywords: "casablanca morocco" },
  // Universal
  { value: "UTC", label: "UTC (Coordinated Universal Time)", region: "Universal", keywords: "utc gmt universal coordinated" },
];

function getCurrentTime(timezone: string): string {
  try {
    return new Date().toLocaleTimeString("en-US", {
      timeZone: timezone,
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  } catch {
    return "";
  }
}

interface TimezoneSelectorProps {
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
  placeholder?: string;
  showCurrentTime?: boolean;
}

export function TimezoneSelector({
  value,
  onChange,
  disabled = false,
  placeholder = "Select timezone",
  showCurrentTime = true,
}: TimezoneSelectorProps) {
  const [open, setOpen] = useState(false);
  const [currentTime, setCurrentTime] = useState("");

  const selectedTimezone = commonTimezones.find((tz) => tz.value === value);

  // Update current time every minute
  useEffect(() => {
    if (selectedTimezone && showCurrentTime) {
      setCurrentTime(getCurrentTime(selectedTimezone.value));
      const interval = setInterval(() => {
        setCurrentTime(getCurrentTime(selectedTimezone.value));
      }, 60000);
      return () => clearInterval(interval);
    }
  }, [selectedTimezone, showCurrentTime]);

  const groupedTimezones = useMemo(() => {
    const groups: Record<string, typeof commonTimezones> = {};
    // Define order of regions
    const regionOrder = ["Oceania", "Asia", "Europe", "Africa", "Americas", "Universal"];
    commonTimezones.forEach((tz) => {
      if (!groups[tz.region]) {
        groups[tz.region] = [];
      }
      groups[tz.region].push(tz);
    });
    // Sort by defined order
    const sorted: Record<string, typeof commonTimezones> = {};
    regionOrder.forEach((region) => {
      if (groups[region]) {
        sorted[region] = groups[region];
      }
    });
    return sorted;
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
            <Clock className="h-4 w-4 shrink-0 text-muted-foreground" />
            {selectedTimezone ? (
              <>
                <span>{selectedTimezone.label}</span>
                {showCurrentTime && currentTime && (
                  <span className="text-muted-foreground">({currentTime})</span>
                )}
              </>
            ) : (
              <span className="text-muted-foreground">{placeholder}</span>
            )}
          </span>
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[400px] p-0" align="start">
        <Command>
          <CommandInput placeholder="Search city or timezone..." />
          <CommandList className="max-h-[300px]">
            <CommandEmpty>No timezone found. Try searching by city name.</CommandEmpty>
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
                    className="flex items-center justify-between"
                  >
                    <div className="flex items-center">
                      <Check
                        className={cn(
                          "mr-2 h-4 w-4",
                          value === tz.value ? "opacity-100" : "opacity-0"
                        )}
                      />
                      <span>{tz.label}</span>
                    </div>
                    <span className="text-xs text-muted-foreground">
                      {getCurrentTime(tz.value)}
                    </span>
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
