import type { Metadata } from "next";
import Link from "next/link";

import { ContactForm } from "@/components/contact-form";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contacto",
  description: `Escríbele al equipo de ${site.name}. También puedes encontrarnos en Instagram ${site.instagramHandle}.`,
};

export default function ContactoPage() {
  return (
    <>
      <SiteHeader />
      <main className="flex-1 pt-16">
        <section className="mx-auto max-w-3xl px-4 pt-20 pb-10 text-center sm:px-6">
          <p className="text-sm font-semibold tracking-[0.2em] text-teal-300 uppercase">
            Contacto
          </p>
          <h1 className="font-heading mt-3 text-4xl font-semibold text-white sm:text-6xl">
            Hablemos
          </h1>
          <p className="mt-5 text-lg text-white/65">
            Completa el formulario y te respondemos. Si prefieres algo más directo, escríbenos
            por Instagram{" "}
            <Link
              href={site.instagram}
              target="_blank"
              rel="noreferrer"
              className="text-teal-300 underline-offset-4 hover:underline"
            >
              {site.instagramHandle}
            </Link>
            .
          </p>
        </section>
        <section className="px-4 pb-24 sm:px-6">
          <ContactForm />
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
