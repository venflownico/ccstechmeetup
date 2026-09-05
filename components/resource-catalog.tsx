"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useId, useMemo, useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  founderResources,
  resourceFilters,
  type FounderResource,
  type ResourceFilterId,
} from "@/lib/resources";
import { packagePitch, sponsorshipIntakeOpen } from "@/lib/site";

type Status = "idle" | "loading" | "success" | "error";

export function ResourceCatalog() {
  const [filter, setFilter] = useState<ResourceFilterId>("all");
  const [selected, setSelected] = useState<FounderResource | null>(null);

  const visible = useMemo(() => {
    if (filter === "all") {
      return founderResources;
    }
    return founderResources.filter((resource) => resource.category === filter);
  }, [filter]);

  return (
    <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_16.5rem] lg:items-start">
      <div>
        <div className="flex flex-wrap gap-2">
          {resourceFilters.map((item) => {
            const active = filter === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => setFilter(item.id)}
                className={`rounded-full border px-3 py-1.5 text-xs font-medium transition ${
                  active
                    ? "border-teal-300/50 bg-teal-400/10 text-teal-200"
                    : "border-white/10 text-white/55 hover:border-white/25 hover:text-white"
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </div>
        <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3">
          {visible.map((resource) => (
            <button
              key={resource.id}
              type="button"
              onClick={() => setSelected(resource)}
              className="group flex h-36 flex-col items-center justify-center rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-5 text-center transition hover:border-teal-300/40 hover:bg-teal-400/5"
            >
              <Image
                src={resource.src}
                alt={resource.name}
                width={160}
                height={48}
                className="h-10 w-auto max-w-[140px] object-contain opacity-85 transition group-hover:opacity-100"
              />
              <p className="mt-3 text-[11px] tracking-wide text-white/45 uppercase">
                {resource.offer}
              </p>
            </button>
          ))}
        </div>
        {visible.length === 0 ? (
          <p className="mt-8 text-sm text-white/50">
            Aún no hay grants en esta categoría.
            {sponsorshipIntakeOpen ? (
              <>
                {" "}
                Si tu marca puede poner uno,{" "}
                <Link href="/patrocinar" className="text-teal-300 underline-offset-4 hover:underline">
                  visita Patrocinar
                </Link>
                .
              </>
            ) : null}
          </p>
        ) : null}
      </div>
      {sponsorshipIntakeOpen ? (
        <aside className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 lg:sticky lg:top-24">
          <p className="text-xs font-semibold tracking-[0.18em] text-teal-300/80 uppercase">
            Para marcas
          </p>
          <p className="font-heading mt-2 text-lg font-semibold text-white">
            ¿Quieres que tu recurso aparezca aquí?
          </p>
          <p className="mt-2 text-sm text-white/60">
            Los founders canjean grants acotados desde esta página. Cupos anuales limitados:
            patrocina el meetup mientras la ventana esté abierta.
          </p>
          <Button className="mt-4 h-10 w-full bg-teal-400 text-slate-950 hover:bg-teal-200" asChild>
            <Link href="/patrocinar">Ir a Patrocinar</Link>
          </Button>
        </aside>
      ) : (
        <aside className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 lg:sticky lg:top-24">
          <p className="text-xs font-semibold tracking-[0.18em] text-teal-300/80 uppercase">
            Para marcas
          </p>
          <p className="font-heading mt-2 text-lg font-semibold text-white">
            Cupos del ciclo tomados
          </p>
          <p className="mt-2 text-sm text-white/60">{packagePitch.closedNote}</p>
        </aside>
      )}
      {selected ? (
        <RedeemDialog resource={selected} onClose={() => setSelected(null)} />
      ) : null}
    </div>
  );
}

function RedeemDialog({
  resource,
  onClose,
}: {
  resource: FounderResource;
  onClose: () => void;
}) {
  const titleId = useId();
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };
    document.addEventListener("keydown", onKey);
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = previous;
    };
  }, [onClose]);

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    setStatus("loading");
    setError("");

    try {
      const response = await fetch("/api/resource-redeem", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          resourceId: resource.id,
          name: data.get("name"),
          email: data.get("email"),
          startup: data.get("startup"),
          message: data.get("message"),
          website: data.get("website"),
        }),
      });
      const payload = (await response.json()) as { error?: string };
      if (!response.ok) {
        throw new Error(payload.error || "No se pudo enviar la solicitud.");
      }
      setStatus("success");
      form.reset();
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Error inesperado.");
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center p-4 sm:items-center">
      <button
        type="button"
        aria-label="Cerrar"
        className="absolute inset-0 bg-black/70"
        onClick={onClose}
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className="relative z-10 max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-2xl border border-white/10 bg-[#0b1220] p-6 sm:p-8"
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <Image
              src={resource.src}
              alt={resource.name}
              width={160}
              height={48}
              className="h-10 w-auto max-w-[140px] object-contain"
            />
            <h2 id={titleId} className="font-heading mt-4 text-2xl font-semibold text-white">
              {resource.offer}
            </h2>
            <p className="mt-2 text-sm text-white/60">{resource.detail}</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="text-sm text-white/50 transition hover:text-white"
          >
            Cerrar
          </button>
        </div>
        <form onSubmit={onSubmit} className="mt-6 space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Nombre" name="name" required />
            <Field label="Email" name="email" type="email" required />
          </div>
          <Field label="Startup" name="startup" required />
          <div className="space-y-2">
            <Label htmlFor="message" className="text-white/80">
              Para qué lo necesitas
            </Label>
            <Textarea
              id="message"
              name="message"
              required
              rows={4}
              placeholder="En una o dos líneas, qué estás construyendo y cómo usarías este recurso..."
              className="min-h-24 text-white"
            />
          </div>
          <div className="hidden" aria-hidden="true">
            <label>
              Website
              <input type="text" name="website" tabIndex={-1} autoComplete="off" />
            </label>
          </div>
          <Button
            type="submit"
            disabled={status === "loading" || status === "success"}
            className="h-10 w-full bg-teal-400 text-slate-950 hover:bg-teal-200 sm:w-auto"
          >
            {status === "loading" ? "Enviando..." : "Aplicar a este recurso"}
          </Button>
          {status === "success" ? (
            <p className="text-sm text-teal-300">
              Listo. {resource.name} recibe tu solicitud y te responde directo.
            </p>
          ) : null}
          {status === "error" ? <p className="text-sm text-red-400">{error}</p> : null}
        </form>
      </div>
    </div>
  );
}

function Field({
  label,
  name,
  type = "text",
  required,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <div className="space-y-2">
      <Label htmlFor={name} className="text-white/80">
        {label}
      </Label>
      <Input id={name} name={name} type={type} required={required} className="text-white" />
    </div>
  );
}
