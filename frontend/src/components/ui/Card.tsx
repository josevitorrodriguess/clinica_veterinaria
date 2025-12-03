import clsx from "clsx";
import type { ReactNode } from "react";

type CardProps = {
  children: ReactNode;
  className?: string;
  padding?: "sm" | "md" | "lg" | "none";
};

const paddings: Record<NonNullable<CardProps["padding"]>, string> = {
  none: "",
  sm: "p-4",
  md: "p-6",
  lg: "p-8"
};

export function Card({ children, className, padding = "md" }: CardProps) {
  return (
    <div className={clsx("rounded-2xl border border-slate-200 bg-white shadow-soft", paddings[padding], className)}>
      {children}
    </div>
  );
}
