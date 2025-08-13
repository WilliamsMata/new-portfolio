"use client";
import dynamic from "next/dynamic";
import type { PropsWithChildren } from "react";

const TracingBeam = dynamic(
  () => import("../ui/tracing-beam").then((m) => m.TracingBeam),
  { ssr: false },
);

interface TracingBeamClientProps extends PropsWithChildren {
  className?: string;
}

export default function TracingBeamClient({
  children,
  className,
}: TracingBeamClientProps) {
  return <TracingBeam className={className}>{children}</TracingBeam>;
}
