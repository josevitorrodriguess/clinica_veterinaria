"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft, CalendarClock, UserRound } from "lucide-react";
import { Button, ButtonLink } from "../../../../components/ui/Button";
import { Card } from "../../../../components/ui/Card";
import { Section } from "../../../../components/ui/Section";
import { api, type Appointment, type Client, type Pet } from "../../../../lib/api";

export default function PetDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const [pet, setPet] = useState<Pet | null>(null);
  const [client, setClient] = useState<Client | null>(null);
  const [appointments, setAppointments] = useState<Appointment[]>([]);

  useEffect(() => {
    if (!id) return;
    const load = async () => {
      const [petData, clientsData, appointmentsData] = await Promise.all([
        api.getPet(id),
        api.getClients(),
        api.getAppointments()
      ]);
      setPet(petData);
      if (petData) {
        const tutor = clientsData.find((c) => c.id === petData.clientId) ?? null;
        setClient(tutor);
      }
      setAppointments(appointmentsData.filter((appointment) => appointment.petId === id));
    };
    load();
  }, [id]);

  if (!pet) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center text-slate-500">
        Pet não encontrado.
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      <Section
        title={pet.name}
        description={`${pet.species} · ${pet.breed}`}
        actions={
          <ButtonLink href="/pets" variant="ghost" leftIcon={<ArrowLeft className="h-4 w-4" />}>
            Voltar
          </ButtonLink>
        }
      >
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <Card>
            <h3 className="text-sm font-semibold text-slate-800">Dados do pet</h3>
            <ul className="mt-3 space-y-2 text-sm text-slate-600">
              <li>
                <span className="font-medium text-slate-700">Espécie:</span> {pet.species}
              </li>
              <li>
                <span className="font-medium text-slate-700">Raça:</span> {pet.breed}
              </li>
              <li>
                <span className="font-medium text-slate-700">Idade:</span> {pet.age} anos
              </li>
            </ul>
          </Card>
          <Card className="md:col-span-2">
            <Section title="Tutor" description="Responsável pelo pet.">
              {client ? (
                <div className="flex items-center justify-between rounded-xl border border-slate-200 bg-slate-50 px-4 py-3">
                  <div>
                    <p className="text-sm font-semibold text-slate-800">{client.name}</p>
                    <p className="text-xs text-slate-500">{client.email}</p>
                  </div>
                  <span className="inline-flex items-center gap-2 rounded-full bg-white px-3 py-1 text-xs text-slate-600">
                    <UserRound className="h-4 w-4 text-emerald-600" />
                    {client.phone}
                  </span>
                </div>
              ) : (
                <p className="text-sm text-slate-500">Tutor não encontrado.</p>
              )}
            </Section>
          </Card>
        </div>
      </Section>

      <Card>
        <Section title="Histórico de consultas" description="Consultas realizadas para este pet.">
          {appointments.length === 0 ? (
            <p className="text-sm text-slate-500">Nenhuma consulta registrada.</p>
          ) : (
            <div className="divide-y divide-slate-100">
              {appointments.map((appointment) => (
                <div key={appointment.id} className="flex flex-col gap-1 py-3 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-800">{appointment.reason}</p>
                    <p className="text-xs text-slate-500">
                      <CalendarClock className="mr-1 inline h-4 w-4 text-emerald-600" />
                      {new Date(appointment.date).toLocaleString("pt-BR", {
                        day: "2-digit",
                        month: "2-digit",
                        hour: "2-digit",
                        minute: "2-digit"
                      })}
                    </p>
                  </div>
                  <Button variant="ghost" size="md" onClick={() => router.push("/appointments")}>
                    Ver agenda
                  </Button>
                </div>
              ))}
            </div>
          )}
        </Section>
      </Card>
    </div>
  );
}
