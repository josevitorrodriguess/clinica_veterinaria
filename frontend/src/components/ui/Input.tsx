"use client";

import clsx from "clsx";
import type { InputHTMLAttributes, ReactNode } from "react";

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  hint?: string;
  error?: string;
  leftIcon?: ReactNode;
};

export function Input({ label, hint, error, className, leftIcon, ...props }: InputProps) {
  return (
    <label className="flex flex-col gap-1.5">
      {label && <span className="text-sm font-medium text-slate-700">{label}</span>}
      <div className="relative">
        {leftIcon && <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">{leftIcon}</span>}
        <input
          className={clsx(
            "h-11 w-full rounded-lg border bg-white px-3 text-sm text-slate-800 shadow-sm outline-none transition focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 placeholder:text-slate-400",
            error ? "border-red-400" : "border-slate-200",
            leftIcon && "pl-9",
            className
          )}
          {...props}
        />
      </div>
      {hint && !error && <span className="text-xs text-slate-500">{hint}</span>}
      {error && <span className="text-xs text-red-500">{error}</span>}
    </label>
  );
}
