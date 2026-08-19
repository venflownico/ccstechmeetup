"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { packages, type PackageId } from "@/lib/site";

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
      form.reset();
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Error inesperado.");
    }
  }

  return (
    <form
      onSubmit={onSubmit}
      className="mx-auto max-w-2xl rounded-2xl border border-white/10 bg-white/[0.03] p-6 sm:p-8"
    >
      <h3 className="font-heading text-2xl font-semibold text-white">
        Cuéntanos quién eres
      </h3>
      <p className="mt-2 text-sm text-white/55">
        Nicolas recibe un mensaje en Slack apenas envías esto.
      </p>
      <div className="mt-6 grid gap-4 sm:grid-cols-2">
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
          className="h-9 w-full rounded-lg border border-input bg-transparent px-2.5 text-sm text-white dark:bg-input/30"
        >
          {packages.map((pkg) => (
            <option key={pkg.id} value={pkg.id} className="bg-slate-950">
              {pkg.name} — ${pkg.price}/mes
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
          placeholder="Qué recurso acotado ofreces (créditos, pagos, capacidad…), y si quieres estar en la rotación del escenario..."
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
        disabled={status === "loading"}
        className="mt-6 h-10 w-full bg-teal-400 text-slate-950 hover:bg-teal-200 sm:w-auto"
      >
        {status === "loading" ? "Enviando..." : "Quiero patrocinar"}
      </Button>
      {status === "success" ? (
        <p className="mt-3 text-sm text-teal-300">
          Listo. Nicolas te contacta para cerrar el acuerdo.
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
      <Input id={name} name={name} type={type} required={required} className="text-white" />
    </div>
  );
}
