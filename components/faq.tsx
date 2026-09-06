"use client";

import { useEffect, useState } from "react";

import { InlineMarkdown } from "@/components/inline-markdown";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { faqs as defaultFaqs } from "@/lib/site";

type FaqItem = {
  id?: string;
  question: string;
  answer: string | readonly string[];
};

function FaqAnswer({ answer }: { answer: FaqItem["answer"] }) {
  if (typeof answer === "string") {
    return <InlineMarkdown text={answer} />;
  }

  return answer.map((paragraph) => (
    <p key={paragraph}>
      <InlineMarkdown text={paragraph} />
    </p>
  ));
}

export function Faq({
  items = defaultFaqs,
  title = "Preguntas frecuentes",
  compact = false,
}: {
  items?: readonly FaqItem[];
  title?: string;
  compact?: boolean;
}) {
  const [value, setValue] = useState("item-0");

  useEffect(() => {
    const applyHash = () => {
      const hash = window.location.hash.replace(/^#/, "");
      const index = items.findIndex((faq) => faq.id === hash);
      if (index >= 0) {
        setValue(`item-${index}`);
      }
    };

    applyHash();
    window.addEventListener("hashchange", applyHash);
    return () => window.removeEventListener("hashchange", applyHash);
  }, [items]);

  return (
    <section
      id="faq"
      className={`mx-auto max-w-3xl scroll-mt-24 ${
        compact ? "mt-16 px-0 py-0" : "px-4 py-24 sm:px-6"
      }`}
    >
      <h2 className="font-heading text-center text-3xl font-semibold text-white sm:text-5xl">
        {title}
      </h2>
      <Accordion
        type="single"
        collapsible
        className="mt-10"
        value={value}
        onValueChange={setValue}
      >
        {items.map((faq, index) => (
          <AccordionItem
            key={faq.question}
            id={faq.id}
            value={`item-${index}`}
            className="scroll-mt-24 border-white/10"
          >
            <AccordionTrigger className="text-white">{faq.question}</AccordionTrigger>
            <AccordionContent className="text-white/60">
              <FaqAnswer answer={faq.answer} />
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
}
