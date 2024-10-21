import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";
import { forwardRef } from "react";

const gradientTextVariants = cva(
  "bg-gradient-to-r bg-clip-text font-semibold text-transparent",
  {
    variants: {
      variant: {
        default: "from-blue-600 to-purple-600",
      },
      size: {
        default: "text-base",
        sm: "text-xs",
        lg: "text-lg font-semibold",
        xl: "text-xl font-semibold",
        "2xl": "text-2xl font-semibold",
        "3xl": "text-3xl font-semibold",
        "4xl": "text-4xl font-semibold",
        "5xl": "text-5xl font-semibold",
        "6xl": "text-6xl font-semibold",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export type ElementType =
  | "h1"
  | "h2"
  | "h3"
  | "h4"
  | "h5"
  | "p"
  | "span"
  | "div";

export interface GradientTextProps
  extends React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof gradientTextVariants> {
  as?: ElementType;
}

export const GradientText = forwardRef<HTMLElement, GradientTextProps>(
  ({ className, variant, size, as: Tag = "span", ...props }) => {
    const Component = Tag;

    return (
      <Component
        className={cn(gradientTextVariants({ variant, size }), className)}
        {...props}
      />
    );
  },
);
GradientText.displayName = "GradientText";
