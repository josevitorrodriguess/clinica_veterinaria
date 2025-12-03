"use client";

import { useEffect, useState } from "react";
import { ArrowUpRight, CalendarClock, PawPrint, UsersRound } from "lucide-react";
import { ButtonLink } from "../../components/ui/Button";
import { Card } from "../../components/ui/Card";
import { Section } from "../../components/ui/Section";
import { api, type Appointment } from "../../lib/api";

type Summary = {
  clients: number;
  pets: number;
  todaysAppointments: number;
};

export default function DashboardPage() {
  const [summary, setSummary] = useState<Summary>({ clients: 0, pets: 0, todaysAppointments: 0 });
  const [appointments, setAppointments] = useState<
    (Appointment & { petName: string; clientName: string })[]
  >([]);

  useEffect(() => {
    const load = async () => {
      const [summaryData, appointmentsData] = await Promise.all([
        api.getDashboardSummary(),
        api.getAppointmentsWithDetails()
      ]);
      setSummary(summaryData);
      setAppointments(appointmentsData);
    };
    load();
  }, []);

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="page-title">Visão geral</h1>
        <p className="subtitle">Acompanhe o pulso da clínica e agilize os atendimentos de hoje.</p>
      </div>

      <div className="card-grid">
        <StatCard
          title="Consultas de hoje"
          value={summary.todaysAppointments}
          icon={<CalendarClock className="h-5 w-5" />}
          accent="bg-emerald-100 text-emerald-700"
        />
        <StatCard
          title="Clientes cadastrados"
          value={summary.clients}
          icon={<UsersRound className="h-5 w-5" />}
          accent="bg-slate-100 text-slate-700"
        />
        <StatCard
          title="Pets cadastrados"
          value={summary.pets}
          icon={<PawPrint className="h-5 w-5" />}
          accent="bg-slate-100 text-slate-700"
        />
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <Section
            title="Próximas consultas"
            description="Agenda do dia com tutor e pet."
            actions={<ButtonLink href="/appointments" variant="ghost" rightIcon={<ArrowUpRight className="h-4 w-4" />}>Ver todas</ButtonLink>}
          >
            <div className="divide-y divide-slate-100">
              {appointments.slice(0, 5).map((appointment) => (
                <div key={appointment.id} className="flex flex-col gap-1 py-3 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-800">{appointment.reason}</p>
                    <p className="text-xs text-slate-500">
                      {appointment.petName} · {appointment.clientName}
                    </p>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-slate-600">
                    <span className="rounded-full bg-emerald-50 px-3 py-1 text-emerald-700">
                      {new Date(appointment.date).toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" })}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </Section>
        </Card>

        <Card>
          <Section title="Atalhos rápidos" description="Navegue pelos módulos principais.">
            <div className="grid grid-cols-1 gap-3">
              <Shortcut href="/clients" label="Clientes" />
              <Shortcut href="/pets" label="Pets" />
              <Shortcut href="/appointments" label="Consultas" />
            </div>
          </Section>
        </Card>
      </div>
    </div>
  );
}

function StatCard({
  title,
  value,
  icon,
  accent
}: {
  title: string;
  value: number;
  icon: React.ReactNode;
  accent: string;
}) {
  return (
    <Card>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-slate-500">{title}</p>
          <p className="mt-2 text-3xl font-semibold text-slate-800">{value}</p>
        </div>
        <div className={`flex h-12 w-12 items-center justify-center rounded-2xl ${accent}`}>{icon}</div>
      </div>
    </Card>
  );
}

function Shortcut({ href, label }: { href: string; label: string }) {
  return (
    <ButtonLink
      href={href}
      variant="ghost"
      className="h-12 justify-between border border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100"
      rightIcon={<ArrowUpRight className="h-4 w-4" />}
    >
      {label}
    </ButtonLink>
  );
}
