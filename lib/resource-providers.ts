import type { FounderResourceId } from "@/lib/resources";

const providerEmails: Partial<Record<FounderResourceId, string>> = {
  venflow: "info@venflow.app",
};

export function providerEmailFor(id: FounderResourceId) {
  return providerEmails[id] || process.env.CONTACT_EMAIL || "";
}
