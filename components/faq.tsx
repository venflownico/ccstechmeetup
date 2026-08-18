import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { faqs } from "@/lib/site";

export function Faq() {
  return (
    <section id="faq" className="mx-auto max-w-3xl px-4 py-24 sm:px-6">
      <h2 className="font-heading text-center text-3xl font-semibold text-white sm:text-5xl">
        Preguntas frecuentes
      </h2>
      <Accordion type="single" collapsible className="mt-10" defaultValue="item-0">
        {faqs.map((faq, index) => (
          <AccordionItem key={faq.question} value={`item-${index}`} className="border-white/10">
            <AccordionTrigger className="text-white">{faq.question}</AccordionTrigger>
            <AccordionContent className="text-white/60">{faq.answer}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
}
