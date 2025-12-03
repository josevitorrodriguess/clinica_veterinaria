"use client";

import { CalendarClock, Home, PawPrint, UsersRound } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";

const navigation = [
  { label: "Dashboard", href: "/", icon: Home },
  { label: "Clientes", href: "/clients", icon: UsersRound },
  { label: "Pets", href: "/pets", icon: PawPrint },
  { label: "Consultas", href: "/appointments", icon: CalendarClock }
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed left-0 top-0 z-30 flex h-full w-64 flex-col border-r border-slate-200 bg-white px-6 py-8 shadow-soft">
      <div className="mb-10">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-700">
            <PawPrint className="h-6 w-6" />
          </div>
          <div>
            <p className="text-sm font-semibold text-emerald-700">Clínica Veterinária</p>
            <p className="text-xs text-slate-500">Painel Médico</p>
          </div>
        </div>
      </div>

      <nav className="space-y-1">
        {navigation.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href || pathname?.startsWith(item.href + "/");
          return (
            <Link
              key={item.href}
              href={item.href}
              className={clsx(
                "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition",
                isActive ? "bg-emerald-50 text-emerald-700" : "text-slate-600 hover:bg-slate-100"
              )}
            >
              <Icon className={clsx("h-5 w-5", isActive ? "text-emerald-600" : "text-slate-500")} />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="mt-auto rounded-xl border border-dashed border-emerald-200 bg-emerald-50/60 p-4 text-xs text-emerald-700">
        Acesse rapidamente as áreas de pacientes, consultas e cadastros.
      </div>
    </aside>
  );
}
