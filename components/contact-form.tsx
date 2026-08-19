"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

type Status = "idle" | "loading" | "success" | "error";

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    setStatus("loading");
    setError("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.get("name"),
          email: data.get("email"),
          message: data.get("message"),
          website: data.get("website"),
        }),
      });
      const payload = (await response.json()) as { error?: string };
      if (!response.ok) {
        throw new Error(payload.error || "No se pudo enviar el mensaje.");
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
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Nombre" name="name" required />
        <Field label="Email" name="email" type="email" required />
      </div>
      <div className="mt-4 space-y-2">
        <Label htmlFor="message" className="text-white/80">
          Mensaje
        </Label>
        <Textarea
          id="message"
          name="message"
          required
          rows={5}
          placeholder="Cuéntanos en qué podemos ayudarte..."
          className="min-h-28 text-white"
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
        {status === "loading" ? "Enviando..." : "Enviar mensaje"}
      </Button>
      {status === "success" ? (
        <p className="mt-3 text-sm text-teal-300">Recibimos tu mensaje. Te respondemos pronto.</p>
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
