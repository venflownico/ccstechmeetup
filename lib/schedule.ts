export const MEETUP_TIMEZONE = "America/Caracas";
/** Caracas has no DST; historical Luma events start at 17:30 local (21:30Z). */
const START_HOUR = 17;
const START_MINUTE = 30;
export const RSVP_LEAD_DAYS = 7;

const MONTHS_ES = [
  "Enero",
  "Febrero",
  "Marzo",
  "Abril",
  "Mayo",
  "Junio",
  "Julio",
  "Agosto",
  "Septiembre",
  "Octubre",
  "Noviembre",
  "Diciembre",
] as const;

function pad(value: number) {
  return String(value).padStart(2, "0");
}

function caracasDateTime(year: number, month: number, day: number, hour: number, minute: number) {
  return `${year}-${pad(month)}-${pad(day)}T${pad(hour)}:${pad(minute)}:00-04:00`;
}

function weekdayInCaracas(year: number, month: number, day: number) {
  return new Date(caracasDateTime(year, month, day, 12, 0)).getUTCDay();
}

/** Third Thursday of a month (1–12), as a calendar day. */
export function thirdThursdayDay(year: number, month: number) {
  const firstWeekday = weekdayInCaracas(year, month, 1);
  const daysUntilThursday = (4 - firstWeekday + 7) % 7;
  return 1 + daysUntilThursday + 14;
}

export function caracasDayKey(iso: string) {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: MEETUP_TIMEZONE,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(new Date(iso));
}

export type ScheduledMeetup = {
  id: string;
  name: string;
  startAt: string;
  timezone: string;
};

export function remainingScheduledMeetups(from = new Date()): ScheduledMeetup[] {
  const year = Number(
    new Intl.DateTimeFormat("en-CA", {
      timeZone: MEETUP_TIMEZONE,
      year: "numeric",
    }).format(from),
  );
  const events: ScheduledMeetup[] = [];

  for (let month = 1; month <= 12; month += 1) {
    const day = thirdThursdayDay(year, month);
    const startAt = caracasDateTime(year, month, day, START_HOUR, START_MINUTE);
    if (new Date(startAt).getTime() <= from.getTime()) continue;

    events.push({
      id: `scheduled-${year}-${pad(month)}`,
      name: `Caracas Tech Meetup - ${MONTHS_ES[month - 1]} ${year}`,
      startAt,
      timezone: MEETUP_TIMEZONE,
    });
  }

  return events;
}

export function isRsvpOpen(event: { url: string | null; startAt: string }, now = Date.now()) {
  if (!event.url) return false;
  return new Date(event.startAt).getTime() - now <= RSVP_LEAD_DAYS * 24 * 60 * 60 * 1000;
}
