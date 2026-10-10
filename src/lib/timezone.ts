/**
 * Timezone utilities for MIGRAFILE appointment booking.
 * Appointments are booked in a selected U.S. timezone and shown in staff members' local time internally.
 */

export type UsTimezone = {
  id: string;
  name: { en: string; ar: string };
  short: string;
};

export const US_TIMEZONES: UsTimezone[] = [
  {
    id: "America/New_York",
    name: { en: "U.S. Eastern Time (ET - New York / DC)", ar: "توقيت شرق أمريكا (ET - نيويورك / واشنطن)" },
    short: "ET",
  },
  {
    id: "America/Chicago",
    name: { en: "U.S. Central Time (CT - Chicago)", ar: "توقيت وسط أمريكا (CT - شيكاغو)" },
    short: "CT",
  },
  {
    id: "America/Denver",
    name: { en: "U.S. Mountain Time (MT - Denver)", ar: "توقيت الجبل الأمريكي (MT - دنفر)" },
    short: "MT",
  },
  {
    id: "America/Los_Angeles",
    name: { en: "U.S. Pacific Time (PT - Los Angeles / SF)", ar: "توقيت المحيط الهادئ (PT - كاليفورنيا)" },
    short: "PT",
  },
];

export const DEFAULT_US_TIMEZONE = "America/New_York";

export const AVAILABLE_SLOTS = [
  "09:00 AM",
  "10:00 AM",
  "11:00 AM",
  "12:00 PM",
  "01:00 PM",
  "02:00 PM",
  "03:00 PM",
  "04:00 PM",
  "05:00 PM",
  "06:00 PM",
] as const;

export type TimeSlot = (typeof AVAILABLE_SLOTS)[number];

/**
 * Converts a 12-hour slot like "11:00 AM" or "02:00 PM" into 24-hour [hours, minutes].
 */
export function slotTo24Hour(slot: string): [number, number] {
  const [timePart, modifier] = slot.trim().split(/\s+/);
  if (!timePart) return [9, 0];
  const [hStr, mStr] = timePart.split(":");
  let hours = parseInt(hStr || "0", 10);
  const minutes = parseInt(mStr || "0", 10);

  if (modifier) {
    const mod = modifier.toUpperCase();
    if (mod === "PM" && hours < 12) hours += 12;
    if (mod === "AM" && hours === 12) hours = 0;
  }
  return [hours, minutes];
}

/**
 * Converts a U.S. date (YYYY-MM-DD) and a time slot (e.g. "11:00 AM")
 * in a specified U.S. timezone (default Eastern Time) to a UTC ISO string.
 */
export function usTimeToUtc(dateStr: string, slotStr: string, timezone = DEFAULT_US_TIMEZONE): string {
  const [year, month, day] = dateStr.split("-").map(Number);
  const [hour, min] = slotTo24Hour(slotStr);

  // Initial UTC guess
  const guess = new Date(Date.UTC(year!, month! - 1, day!, hour, min));

  // Determine what the guess represents in the target U.S. timezone
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: timezone,
    year: "numeric",
    month: "numeric",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    hour12: false,
  }).formatToParts(guess);

  const get = (type: string) => Number(parts.find((p) => p.type === type)?.value);
  let tzHour = get("hour");
  if (tzHour === 24) tzHour = 0;
  const tzDay = get("day");

  // Difference in hours
  const diffHours = (hour - tzHour) + (day! - tzDay) * 24;
  const targetUtc = new Date(guess.getTime() + diffHours * 3600000);
  return targetUtc.toISOString();
}

/**
 * Formats a UTC ISO string in the current device's local timezone.
 */
export function formatLocalTime(isoString: string, locale = "en-US"): {
  full: string;
  date: string;
  time: string;
  dayName: string;
} {
  const date = new Date(isoString);
  const isAr = locale.startsWith("ar");

  const fullFmt = new Intl.DateTimeFormat(isAr ? "ar-EG" : "en-US", {
    dateStyle: "full",
    timeStyle: "short",
  });

  const dateFmt = new Intl.DateTimeFormat(isAr ? "ar-EG" : "en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const timeFmt = new Intl.DateTimeFormat(isAr ? "ar-EG" : "en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });

  const dayFmt = new Intl.DateTimeFormat(isAr ? "ar-EG" : "en-US", {
    weekday: "long",
  });

  return {
    full: fullFmt.format(date),
    date: dateFmt.format(date),
    time: timeFmt.format(date),
    dayName: dayFmt.format(date),
  };
}

/**
 * Formats a UTC ISO string in U.S. Time.
 */
export function formatUsTime(isoString: string, timezone = DEFAULT_US_TIMEZONE, locale = "en-US"): {
  full: string;
  date: string;
  time: string;
  tzLabel: string;
} {
  const date = new Date(isoString);
  const isAr = locale.startsWith("ar");

  const tzInfo = US_TIMEZONES.find((t) => t.id === timezone) ?? US_TIMEZONES[0]!;

  const fullFmt = new Intl.DateTimeFormat(isAr ? "ar-EG" : "en-US", {
    timeZone: timezone,
    dateStyle: "full",
    timeStyle: "short",
  });

  const dateFmt = new Intl.DateTimeFormat(isAr ? "ar-EG" : "en-US", {
    timeZone: timezone,
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  const timeFmt = new Intl.DateTimeFormat(isAr ? "ar-EG" : "en-US", {
    timeZone: timezone,
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });

  return {
    full: `${fullFmt.format(date)} (${tzInfo.short})`,
    date: dateFmt.format(date),
    time: `${timeFmt.format(date)} ${tzInfo.short}`,
    tzLabel: isAr ? tzInfo.name.ar : tzInfo.name.en,
  };
}

/**
 * Returns a relative urgency badge for the appointment.
 */
export function getAppointmentRelative(isoString: string, isAr = true): {
  label: string;
  isToday: boolean;
  isUpcoming: boolean;
  isPast: boolean;
  color: string;
} {
  const now = new Date();
  const apt = new Date(isoString);
  const diffMs = apt.getTime() - now.getTime();
  const diffHours = diffMs / (1000 * 60 * 60);

  const nowLocal = new Intl.DateTimeFormat("en-US", { dateStyle: "short" }).format(now);
  const aptLocal = new Intl.DateTimeFormat("en-US", { dateStyle: "short" }).format(apt);

  if (nowLocal === aptLocal) {
    return {
      label: isAr ? "اليوم" : "Today",
      isToday: true,
      isUpcoming: diffMs > 0,
      isPast: diffMs <= 0,
      color: "bg-status-green/15 text-status-green border-status-green/30",
    };
  }

  if (diffMs < 0) {
    return {
      label: isAr ? "موعد منتهٍ" : "Past",
      isToday: false,
      isUpcoming: false,
      isPast: true,
      color: "bg-muted text-muted-foreground border-border",
    };
  }

  const days = Math.round(diffHours / 24);
  if (days <= 1) {
    return {
      label: isAr ? "غدًا" : "Tomorrow",
      isToday: false,
      isUpcoming: true,
      isPast: false,
      color: "bg-gold/20 text-foreground border-gold/40",
    };
  }

  return {
    label: isAr ? `بعد ${days} أيام` : `In ${days} days`,
    isToday: false,
    isUpcoming: true,
    isPast: false,
    color: "bg-accent/15 text-accent border-accent/30",
  };
}
