"use client";

import { Bell, LogOut } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "../ui/Button";
import { useAuth } from "../../context/AuthContext";

const pageTitles: Record<string, string> = {
  "/": "Dashboard",
  "/clients": "Clientes",
  "/clients/new": "Novo Cliente",
  "/pets": "Pets",
  "/pets/new": "Novo Pet",
  "/appointments": "Consultas",
  "/appointments/new": "Nova Consulta"
};

export function Topbar() {
  const pathname = usePathname() ?? "/";
  const router = useRouter();
  const { user, logout } = useAuth();

  const pageTitle =
    pageTitles[pathname] ??
    (pathname.startsWith("/clients/") ? "Ficha do Cliente" : pathname.startsWith("/pets/") ? "Ficha do Pet" : "Painel");

  const handleLogout = () => {
    logout();
    router.replace("/login");
  };

  return (
    <header className="fixed left-64 right-0 top-0 z-20 flex h-16 items-center justify-between border-b border-slate-200 bg-white/80 px-8 backdrop-blur-md">
      <div>
        <p className="text-sm uppercase tracking-wide text-slate-400">Painel</p>
        <h1 className="text-lg font-semibold text-slate-800">{pageTitle}</h1>
      </div>

      <div className="flex items-center gap-4">
        <button className="relative rounded-full border border-slate-200 bg-white p-2 text-slate-500 transition hover:text-emerald-700">
          <Bell className="h-5 w-5" />
          <span className="absolute -right-0.5 -top-0.5 h-2.5 w-2.5 rounded-full bg-emerald-500" />
        </button>
        <div className="hidden text-right sm:block">
          <p className="text-sm font-medium text-slate-800">{user?.name ?? "Médico"}</p>
          <p className="text-xs text-slate-500">{user?.email ?? "suporte@clinicavet.com"}</p>
        </div>
        <div className="hidden h-10 w-10 items-center justify-center rounded-full bg-emerald-100 text-emerald-700 sm:flex">
          {user?.name?.slice(0, 1).toUpperCase() ?? "D"}
        </div>
        <Button variant="ghost" size="md" onClick={handleLogout} leftIcon={<LogOut className="h-4 w-4" />}>
          Sair
        </Button>
      </div>
    </header>
  );
}
