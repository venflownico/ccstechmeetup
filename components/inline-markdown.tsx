import Link from "next/link";
import { Fragment, type MouseEventHandler } from "react";

export function InlineMarkdown({
  text,
  onLinkClick,
}: {
  text: string;
  onLinkClick?: MouseEventHandler<HTMLAnchorElement>;
}) {
  const nodes = [];
  let lastIndex = 0;
  const pattern = /\[([^\]]+)\]\(([^)]+)\)/g;

  for (const match of text.matchAll(pattern)) {
    const index = match.index ?? 0;
    if (index > lastIndex) {
      nodes.push(text.slice(lastIndex, index));
    }

    const href = match[2];
    const external = /^https?:\/\//.test(href);
    nodes.push(
      <Link
        href={href}
        className="text-teal-300 underline-offset-4 hover:underline"
        onClick={onLinkClick}
        {...(external ? { target: "_blank", rel: "noreferrer" } : {})}
      >
        {match[1]}
      </Link>,
    );
    lastIndex = index + match[0].length;
  }

  if (lastIndex < text.length) {
    nodes.push(text.slice(lastIndex));
  }

  if (nodes.length === 1 && typeof nodes[0] === "string") {
    return nodes[0];
  }

  return nodes.map((node, index) => <Fragment key={index}>{node}</Fragment>);
}
