import { type ComponentPropsWithoutRef } from "react";
import ReactMarkdown, { type Components } from "react-markdown";
import remarkBreaks from "remark-breaks";
import remarkGfm from "remark-gfm";
import { cn } from "@/lib/utils";

type MarkdownCodeProps = ComponentPropsWithoutRef<"code"> & {
  inline?: boolean;
  node?: unknown;
};

const markdownComponents: Components = {
  a: ({ className, href, children, node, ...props }) => {
    void node;

    const isExternal = typeof href === "string" && /^https?:\/\//i.test(href);

    return (
      <a
        {...props}
        href={href}
        target={isExternal ? "_blank" : undefined}
        rel={isExternal ? "noreferrer noopener" : undefined}
        className={cn(
          "font-medium text-primary underline decoration-primary/40 underline-offset-4 transition hover:decoration-primary",
          className,
        )}
      >
        {children}
      </a>
    );
  },
  code: ({ inline, className, children, node, ...props }: MarkdownCodeProps) => {
    void node;

    if (!inline) {
      return (
        <code
          {...props}
          className={cn("font-mono text-[0.9em] leading-6", className)}
        >
          {children}
        </code>
      );
    }

    return (
      <code
        {...props}
        className={cn(
          "rounded-md border border-zinc-200 bg-zinc-200/70 px-1.5 py-0.5 font-mono text-[0.85em] font-medium text-zinc-900 dark:border-white/10 dark:bg-white/10 dark:text-neutral-50",
          className,
        )}
      >
        {children}
      </code>
    );
  },
  pre: ({ className, children, node, ...props }) => {
    void node;

    return (
      <pre
        {...props}
        className={cn(
          "my-3 overflow-x-auto rounded-2xl border border-zinc-200 bg-zinc-100 p-4 text-[0.85rem] leading-6 text-zinc-900 shadow-sm dark:border-white/10 dark:bg-black/40 dark:text-neutral-50",
          className,
        )}
      >
        {children}
      </pre>
    );
  },
  table: ({ className, children, node, ...props }) => {
    void node;

    return (
      <div className="my-3 w-full overflow-x-auto">
        <table
          {...props}
          className={cn("w-full border-collapse text-left text-sm", className)}
        >
          {children}
        </table>
      </div>
    );
  },
};

const assistantMarkdownClassName = cn(
  "prose prose-sm max-w-none text-zinc-900 dark:text-neutral-50",
  "prose-zinc dark:prose-invert",
  "prose-p:my-1 prose-headings:my-2 prose-headings:font-semibold prose-headings:tracking-tight",
  "prose-h1:text-lg prose-h2:text-base prose-h3:text-sm",
  "prose-ul:my-2 prose-ol:my-2 prose-li:my-0 prose-li:leading-7",
  "prose-blockquote:my-2 prose-hr:my-4",
  "prose-img:my-3 prose-img:rounded-2xl",
);

export function MarkdownMessage({ content }: { content: string }) {
  return (
    <div className={assistantMarkdownClassName}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm, remarkBreaks]}
        components={markdownComponents}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
