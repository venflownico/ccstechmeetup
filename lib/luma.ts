export type LumaEvent = {
  id: string;
  name: string;
  startAt: string;
  timezone: string;
  url: string;
  guestCount: number | null;
  city: string | null;
  requireApproval: boolean;
};

const CALENDAR_ID = "cal-u2swYaAgKESq0h1";
const LUMA_API = "https://api.lu.ma/calendar/get-items";

type LumaPeriod = "future" | "past";

type LumaApiEvent = {
  api_id?: string;
  name?: string;
  start_at?: string;
  timezone?: string;
  url?: string;
  geo_address_info?: { city?: string };
};

type LumaApiEntry = {
  api_id?: string;
  start_at?: string;
  guest_count?: number;
  ticket_info?: { require_approval?: boolean };
  event?: LumaApiEvent;
};

type LumaApiResponse = {
  entries?: LumaApiEntry[];
  has_more?: boolean;
  next_cursor?: string;
};

function eventUrl(slug: string | undefined) {
  if (!slug) return "https://luma.com/ccstech_";
  if (slug.startsWith("http://") || slug.startsWith("https://")) return slug;
  return `https://luma.com/${slug}`;
}

function mapEntry(entry: LumaApiEntry): LumaEvent | null {
  const event = entry.event;
  if (!event?.name || !event.start_at) return null;

  return {
    id: event.api_id ?? entry.api_id ?? event.url ?? event.name,
    name: event.name,
    startAt: event.start_at,
    timezone: event.timezone || "America/Caracas",
    url: eventUrl(event.url),
    guestCount: typeof entry.guest_count === "number" ? entry.guest_count : null,
    city: event.geo_address_info?.city ?? "Caracas",
    requireApproval: Boolean(entry.ticket_info?.require_approval),
  };
}

const PAST_LIMIT = 10;

async function fetchPeriod(
  period: LumaPeriod,
  limit?: number,
): Promise<{ events: LumaEvent[]; hasMore: boolean }> {
  const events: LumaEvent[] = [];
  let cursor: string | undefined;
  let hasMore = false;

  for (let page = 0; page < 5; page += 1) {
    const url = new URL(LUMA_API);
    url.searchParams.set("calendar_api_id", CALENDAR_ID);
    url.searchParams.set("period", period);
    if (cursor) url.searchParams.set("pagination_cursor", cursor);

    const response = await fetch(url, {
      headers: {
        Accept: "application/json",
        "User-Agent": "CaracasTechMeetup/1.0 (+https://ccstechmeetup.com)",
      },
      next: { revalidate: 1800 },
    });

    if (!response.ok) {
      throw new Error(`Luma ${period} ${response.status}`);
    }

    const payload = (await response.json()) as LumaApiResponse;
    for (const entry of payload.entries ?? []) {
      const mapped = mapEntry(entry);
      if (!mapped) continue;

      if (limit && events.length >= limit) {
        hasMore = true;
        break;
      }
      events.push(mapped);
    }

    hasMore = hasMore || Boolean(payload.has_more);
    if (hasMore || !payload.has_more || !payload.next_cursor) break;
    cursor = payload.next_cursor;
  }

  events.sort((a, b) => {
    const delta = +new Date(a.startAt) - +new Date(b.startAt);
    return period === "past" ? -delta : delta;
  });
  return { events, hasMore };
}

export async function getLumaEvents(): Promise<{
  upcoming: LumaEvent[];
  past: LumaEvent[];
  hasMorePast: boolean;
}> {
  try {
    const [upcomingResult, pastResult] = await Promise.all([
      fetchPeriod("future"),
      fetchPeriod("past", PAST_LIMIT),
    ]);
    return {
      upcoming: upcomingResult.events,
      past: pastResult.events,
      hasMorePast: pastResult.hasMore,
    };
  } catch {
    return { upcoming: [], past: [], hasMorePast: false };
  }
}
