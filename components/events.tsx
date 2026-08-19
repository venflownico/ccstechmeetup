"use client";

import Link from "next/link";
import { useState, type ReactNode } from "react";

import { Button } from "@/components/ui/button";
import type { LumaEvent } from "@/lib/luma";
import { site } from "@/lib/site";

type Period = "upcoming" | "past";

function formatDate(iso: string, timezone: string) {
  return new Intl.DateTimeFormat("es-VE", {
    weekday: "short",
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: timezone,
  }).format(new Date(iso));
}

function formatTime(iso: string, timezone: string) {
  return new Intl.DateTimeFormat("es-VE", {
    hour: "numeric",
    minute: "2-digit",
    timeZone: timezone,
  }).format(new Date(iso));
}

export function Events({
  upcoming,
  past,
  hasMorePast,
}: {
  upcoming: LumaEvent[];
  past: LumaEvent[];
  hasMorePast: boolean;
}) {
  const [period, setPeriod] = useState<Period>("upcoming");
  const events = period === "upcoming" ? upcoming : past;
  const empty = upcoming.length === 0 && past.length === 0;

  return (
    <section id="eventos" className="mx-auto max-w-6xl scroll-mt-24 px-4 py-24 sm:px-6">
      <div className="mb-8 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-semibold tracking-[0.2em] text-teal-300 uppercase">
            Agenda
          </p>
          <h2 className="font-heading mt-3 text-3xl font-semibold text-white sm:text-5xl">
            Próximos eventos agendados
          </h2>
          <p className="mt-3 max-w-xl text-white/60">
            Nos reunimos el tercer jueves de cada mes. La agenda se actualiza sola desde
            nuestro calendario en Luma; el RSVP te lleva a la página del evento para
            registrarte.
          </p>
        </div>
        <Link
          href={site.lumaCalendarUrl}
          target="_blank"
          rel="noreferrer"
          className="text-sm font-medium text-teal-300 hover:text-teal-200"
        >
          Calendario en Luma →
        </Link>
      </div>

      <div className="mb-8 inline-flex rounded-full border border-white/15 bg-white/[0.03] p-1">
        <ToggleButton
          active={period === "upcoming"}
          onClick={() => setPeriod("upcoming")}
        >
          Próximos
        </ToggleButton>
        <ToggleButton active={period === "past"} onClick={() => setPeriod("past")}>
          Pasados
        </ToggleButton>
      </div>

      {empty || events.length === 0 ? (
        <p className="rounded-2xl border border-white/10 bg-white/[0.03] px-5 py-10 text-center text-white/60">
          {period === "upcoming"
            ? "Aún no hay una próxima edición publicada. Síguenos en Instagram para enterarte primero."
            : "No encontramos eventos pasados por ahora."}
        </p>
      ) : (
        <div className="overflow-x-auto rounded-2xl border border-white/10">
          <table className="w-full min-w-[36rem] text-left">
            <thead className="border-b border-white/10 text-xs font-semibold tracking-[0.16em] text-white/40 uppercase">
              <tr>
                <th className="px-5 py-3 font-semibold">Fecha</th>
                <th className="px-5 py-3 font-semibold">Hora</th>
                <th className="px-5 py-3 font-semibold">Evento</th>
                <th className="px-5 py-3 font-semibold">
                  <span className="sr-only">Acción</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {events.map((event) => (
                <tr
                  key={event.id}
                  className="border-b border-white/8 last:border-0"
                >
                  <td className="px-5 py-4 whitespace-nowrap text-white">
                    {formatDate(event.startAt, event.timezone)}
                  </td>
                  <td className="px-5 py-4 whitespace-nowrap text-teal-300">
                    {formatTime(event.startAt, event.timezone)}
                  </td>
                  <td className="px-5 py-4">
                    <p className="font-medium text-white">{event.name}</p>
                    <p className="mt-0.5 text-sm text-white/45">
                      {event.city ?? "Caracas"}
                      {period === "upcoming" && event.requireApproval
                        ? " · con aprobación"
                        : ""}
                    </p>
                  </td>
                  <td className="px-5 py-4 text-right">
                    <Button
                      className="bg-teal-400 text-slate-950 hover:bg-teal-200"
                      asChild
                    >
                      <a href={event.url} target="_blank" rel="noreferrer">
                        {period === "past" ? "Ver" : "RSVP"}
                      </a>
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {period === "past" && hasMorePast ? (
            <div className="border-t border-white/10 px-5 py-4 text-center">
              <p className="text-sm text-white/55">Mostramos los 10 eventos más recientes.</p>
              <Link
                href={site.lumaCalendarUrl}
                target="_blank"
                rel="noreferrer"
                className="mt-2 inline-block text-sm font-medium text-teal-300 hover:text-teal-200"
              >
                Ver el resto en Luma →
              </Link>
            </div>
          ) : null}
        </div>
      )}
    </section>
  );
}

function ToggleButton({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-full px-5 py-2 text-sm font-medium transition ${
        active ? "bg-teal-400 text-slate-950" : "text-white/70 hover:text-white"
      }`}
    >
      {children}
    </button>
  );
}
