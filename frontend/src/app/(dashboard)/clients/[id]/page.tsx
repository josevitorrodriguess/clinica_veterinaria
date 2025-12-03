"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft, CalendarClock, PawPrint } from "lucide-react";
import { Button, ButtonLink } from "../../../../components/ui/Button";
import { Card } from "../../../../components/ui/Card";
import { Section } from "../../../../components/ui/Section";
import { api, type Appointment, type Client, type Pet } from "../../../../lib/api";

export default function ClientDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const [client, setClient] = useState<Client | null>(null);
  const [pets, setPets] = useState<Pet[]>([]);
  const [appointments, setAppointments] = useState<Appointment[]>([]);

  useEffect(() => {
    if (!id) return;
    const load = async () => {
      const [clientData, petsData, appointmentsData] = await Promise.all([
        api.getClient(id),
        api.getPets(),
        api.getAppointments()
      ]);
      setClient(clientData);
      setPets(petsData.filter((pet) => pet.clientId === id));
      setAppointments(appointmentsData.filter((appointment) => appointment.clientId === id));
    };
    load();
  }, [id]);

  if (!client) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center text-slate-500">
        Cliente não encontrado.
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      <Section
        title={client.name}
        description="Resumo do tutor, pets e histórico de consultas."
        actions={
          <div className="flex gap-3">
            <ButtonLink href="/clients" variant="ghost" leftIcon={<ArrowLeft className="h-4 w-4" />}>
              Voltar
            </ButtonLink>
            <ButtonLink href="/pets/new" leftIcon={<PawPrint className="h-4 w-4" />}>
              Novo Pet
            </ButtonLink>
          </div>
        }
      >
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <Card>
            <h3 className="text-sm font-semibold text-slate-800">Dados do cliente</h3>
            <ul className="mt-3 space-y-2 text-sm text-slate-600">
              <li>
                <span className="font-medium text-slate-700">E-mail:</span> {client.email}
              </li>
              <li>
                <span className="font-medium text-slate-700">Telefone:</span> {client.phone}
              </li>
              <li>
                <span className="font-medium text-slate-700">Pets cadastrados:</span> {pets.length}
              </li>
            </ul>
          </Card>
          <Card className="md:col-span-2">
            <Section title="Pets" description="Animais vinculados ao tutor.">
              {pets.length === 0 ? (
                <p className="text-sm text-slate-500">Nenhum pet cadastrado ainda.</p>
              ) : (
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  {pets.map((pet) => (
                    <Card key={pet.id} padding="sm" className="border-slate-200">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-semibold text-slate-800">{pet.name}</p>
                          <p className="text-xs text-slate-500">
                            {pet.species} · {pet.breed}
                          </p>
                        </div>
                        <span className="rounded-full bg-slate-100 px-3 py-1 text-xs text-slate-600">{pet.age} anos</span>
                      </div>
                    </Card>
                  ))}
                </div>
              )}
            </Section>
          </Card>
        </div>
      </Section>

      <Card>
        <Section title="Consultas" description="Histórico de consultas do cliente.">
          {appointments.length === 0 ? (
            <p className="text-sm text-slate-500">Nenhuma consulta registrada.</p>
          ) : (
            <div className="divide-y divide-slate-100">
              {appointments.map((appointment) => (
                <div
                  key={appointment.id}
                  className="flex flex-col gap-1 py-3 sm:flex-row sm:items-center sm:justify-between"
                >
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
