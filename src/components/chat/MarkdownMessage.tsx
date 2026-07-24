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
          "font-semibold text-blue dark:text-cyan underline decoration-blue/40 dark:decoration-cyan/40 underline-offset-4 transition-colors hover:decoration-blue dark:hover:decoration-cyan",
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
          className={cn("font-mono text-[0.88em] leading-6 text-foreground", className)}
        >
          {children}
        </code>
      );
    }

    return (
      <code
        {...props}
        className={cn(
          "rounded-md border border-border/60 bg-muted/60 px-1.5 py-0.5 font-mono text-[0.85em] font-medium text-foreground",
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
          "my-3 overflow-x-auto rounded-2xl border border-border/70 bg-card/90 p-4 text-[0.85rem] leading-6 text-card-foreground shadow-sm backdrop-blur-md dark:border-white/10 dark:bg-black/50",
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
      <div className="my-3 w-full overflow-x-auto rounded-xl border border-border/60">
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
  "prose prose-sm max-w-none text-foreground",
  "prose-neutral dark:prose-invert",
  "prose-p:my-1.5 prose-p:leading-relaxed prose-headings:my-2 prose-headings:font-bold prose-headings:tracking-tight",
  "prose-h1:text-lg prose-h2:text-base prose-h3:text-sm",
  "prose-ul:my-2 prose-ol:my-2 prose-li:my-0.5 prose-li:leading-relaxed",
  "prose-blockquote:my-2 prose-blockquote:border-l-blue prose-hr:my-4",
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

