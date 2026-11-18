"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { formatoMiles } from "@/components/patrocinar/formato";
import { packages, sponsorshipCallUrl, type PackageId } from "@/lib/site";

type Status = "idle" | "loading" | "success" | "error";

export function SponsorForm({
  selectedPackage,
  onPackageChange,
}: {
  selectedPackage: PackageId;
  onPackageChange: (id: PackageId) => void;
}) {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    setStatus("loading");
    setError("");

    try {
      const response = await fetch("/api/sponsor", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.get("name"),
          company: data.get("company"),
          email: data.get("email"),
          phone: data.get("phone"),
          packageId: data.get("packageId"),
          message: data.get("message"),
          website: data.get("website"),
        }),
      });
      const payload = (await response.json()) as { error?: string };
      if (!response.ok) {
        throw new Error(payload.error || "No se pudo enviar el formulario.");
      }
      setStatus("success");
      const name = String(data.get("name") ?? "").trim();
      const email = String(data.get("email") ?? "").trim();
      window.location.assign(sponsorshipCallUrl({ name, email }));
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Error inesperado.");
    }
  }

  return (
    <form
      onSubmit={onSubmit}
      className="max-w-2xl rounded-[6px] border border-white/12 bg-[#0b141c] p-5 sm:p-8"
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Nombre" name="name" required />
        <Field label="Empresa" name="company" required />
        <Field label="Email" name="email" type="email" required />
        <Field label="Teléfono" name="phone" required />
      </div>
      <div className="mt-4 space-y-2">
        <Label htmlFor="packageId" className="text-white/80">
          Paquete
        </Label>
        <select
          id="packageId"
          name="packageId"
          value={selectedPackage}
          onChange={(event) => onPackageChange(event.target.value as PackageId)}
          className="h-10 w-full rounded-[6px] border border-input bg-transparent px-2.5 text-sm text-white dark:bg-input/30"
        >
          {packages
            .filter((pkg) => pkg.available)
            .map((pkg) => (
              <option key={pkg.id} value={pkg.id} className="bg-slate-950">
                {`${pkg.name}, desde $${formatoMiles(pkg.price)} al mes`}
              </option>
            ))}
        </select>
      </div>
      <div className="mt-4 space-y-2">
        <Label htmlFor="message" className="text-white/80">
          Mensaje
        </Label>
        <Textarea
          id="message"
          name="message"
          rows={4}
          placeholder="Qué recurso acotado ofreces (créditos, pagos, capacidad…) y cómo lo canjean los founders..."
          className="min-h-24 rounded-[6px] text-white"
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
        disabled={status === "loading"}
        className="mt-6 h-12 w-full rounded-full bg-[#46c536] px-8 text-base font-semibold text-[#050b12] hover:bg-[#7fe36f] sm:w-auto"
      >
        {status === "loading" ? "Enviando..." : "Quiero patrocinar"}
      </Button>
      {status === "success" ? (
        <p className="mt-3 text-sm text-teal-300">
          Listo. Te llevamos a agendar una llamada de 30 minutos.
        </p>
      ) : null}
      {status === "error" ? <p className="mt-3 text-sm text-red-400">{error}</p> : null}
    </form>
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
      <Input id={name} name={name} type={type} required={required} className="h-10 rounded-[6px] text-white" />
    </div>
  );
}
