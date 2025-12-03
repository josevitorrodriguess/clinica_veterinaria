"use client";

import { useEffect, useState } from "react";
import { Plus } from "lucide-react";
import { ButtonLink } from "../../../components/ui/Button";
import { Card } from "../../../components/ui/Card";
import { Section } from "../../../components/ui/Section";
import { api, type Appointment } from "../../../lib/api";

type AppointmentWithRelations = Appointment & { petName: string; clientName: string };

export default function AppointmentsPage() {
  const [appointments, setAppointments] = useState<AppointmentWithRelations[]>([]);

  useEffect(() => {
    api.getAppointmentsWithDetails().then(setAppointments);
  }, []);

  return (
    <div className="flex flex-col gap-6">
      <Section
        title="Consultas"
        description="Agenda com os atendimentos programados."
        actions={
          <ButtonLink href="/appointments/new" leftIcon={<Plus className="h-4 w-4" />}>
            Nova consulta
          </ButtonLink>
        }
      >
        <Card padding="none">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-slate-100">
              <thead className="bg-slate-50">
                <tr className="text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                  <th className="px-6 py-3">Data</th>
                  <th className="px-6 py-3">Motivo</th>
                  <th className="px-6 py-3">Pet</th>
                  <th className="px-6 py-3">Tutor</th>
                  <th className="px-6 py-3">Médico</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-sm text-slate-700">
                {appointments.map((appointment) => (
                  <tr key={appointment.id} className="hover:bg-slate-50">
                    <td className="px-6 py-4 text-slate-600">
                      {new Date(appointment.date).toLocaleString("pt-BR", {
                        day: "2-digit",
                        month: "2-digit",
                        hour: "2-digit",
                        minute: "2-digit"
                      })}
                    </td>
                    <td className="px-6 py-4 font-medium text-slate-800">{appointment.reason}</td>
                    <td className="px-6 py-4">{appointment.petName}</td>
                    <td className="px-6 py-4">{appointment.clientName}</td>
                    <td className="px-6 py-4">{appointment.vet}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </Section>
    </div>
  );
}
