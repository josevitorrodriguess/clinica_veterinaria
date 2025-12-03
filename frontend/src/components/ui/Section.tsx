import clsx from "clsx";
import type { ReactNode } from "react";

type SectionProps = {
  title: string;
  description?: string;
  actions?: ReactNode;
  children: ReactNode;
  className?: string;
};

export function Section({ title, description, actions, children, className }: SectionProps) {
  return (
    <section className={clsx("flex flex-col gap-4", className)}>
      <header className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-lg font-semibold text-slate-800">{title}</h2>
          {description && <p className="text-sm text-slate-500">{description}</p>}
        </div>
        {actions}
      </header>
      {children}
    </section>
  );
}
