"use client";

import { cva, type VariantProps } from "class-variance-authority";
import { Loader2 } from "lucide-react";
import clsx from "clsx";
import Link from "next/link";
import type { ButtonHTMLAttributes, ReactNode } from "react";

const buttonStyles = cva(
  "inline-flex items-center justify-center rounded-lg text-sm font-medium transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 disabled:opacity-60 disabled:cursor-not-allowed",
  {
    variants: {
      variant: {
        solid: "bg-emerald-600 text-white hover:bg-emerald-700 focus-visible:outline-emerald-600 shadow-soft",
        ghost: "bg-white text-slate-700 border border-slate-200 hover:bg-slate-100 focus-visible:outline-emerald-600",
        subtle:
          "bg-emerald-50 text-emerald-700 border border-emerald-100 hover:bg-emerald-100 focus-visible:outline-emerald-600"
      },
      size: {
        md: "h-10 px-4",
        lg: "h-11 px-5",
        icon: "h-10 w-10 p-0"
      }
    },
    defaultVariants: {
      variant: "solid",
      size: "md"
    }
  }
);

type ButtonBaseProps = VariantProps<typeof buttonStyles> & {
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  isLoading?: boolean;
};

type ButtonProps = ButtonBaseProps & ButtonHTMLAttributes<HTMLButtonElement>;

export function Button({
  className,
  children,
  variant,
  size,
  leftIcon,
  rightIcon,
  isLoading = false,
  ...props
}: ButtonProps) {
  return (
    <button className={clsx(buttonStyles({ variant, size }), className)} {...props}>
      {isLoading ? (
        <Loader2 className="h-4 w-4 animate-spin" />
      ) : (
        <>
          {leftIcon && <span className="mr-2 flex items-center">{leftIcon}</span>}
          {children}
          {rightIcon && <span className="ml-2 flex items-center">{rightIcon}</span>}
        </>
      )}
    </button>
  );
}

type ButtonLinkProps = ButtonBaseProps & {
  href: string;
  children: ReactNode;
  className?: string;
};

export function ButtonLink({ href, children, className, size, variant, leftIcon, rightIcon }: ButtonLinkProps) {
  return (
    <Link href={href} className={clsx(buttonStyles({ variant, size }), className)}>
      {leftIcon && <span className="mr-2 flex items-center">{leftIcon}</span>}
      {children}
      {rightIcon && <span className="ml-2 flex items-center">{rightIcon}</span>}
    </Link>
  );
}
