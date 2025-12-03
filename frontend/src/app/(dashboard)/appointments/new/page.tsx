"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { Button, ButtonLink } from "../../../../components/ui/Button";
import { Card } from "../../../../components/ui/Card";
import { Input } from "../../../../components/ui/Input";
import { Section } from "../../../../components/ui/Section";
import { useAuth } from "../../../../context/AuthContext";
import { api, type Client, type Pet } from "../../../../lib/api";

type FormState = {
  date: string;
  reason: string;
  petId: string;
  clientId: string;
};

export default function NewAppointmentPage() {
  const router = useRouter();
  const { user } = useAuth();
  const [clients, setClients] = useState<Client[]>([]);
  const [pets, setPets] = useState<Pet[]>([]);
  const [form, setForm] = useState<FormState>({
    date: new Date().toISOString().slice(0, 16),
    reason: "",
    petId: "",
    clientId: ""
  });
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    const load = async () => {
      const [clientsData, petsData] = await Promise.all([api.getClients(), api.getPets()]);
      setClients(clientsData);
      setPets(petsData);
    };
    load();
  }, []);

  const handleChange = (field: keyof FormState, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsSaving(true);
    await api.createAppointment({
      date: form.date,
      reason: form.reason,
      petId: form.petId,
      clientId: form.clientId,
      vet: user?.name ?? "Médico"
    });
    setIsSaving(false);
    router.push("/appointments");
  };

  return (
    <div className="flex flex-col gap-6">
      <Section
        title="Nova consulta"
        description="Agende data, pet e tutor. O médico logado é vinculado automaticamente."
        actions={<ButtonLink href="/appointments" variant="ghost" leftIcon={<ArrowLeft className="h-4 w-4" />}>Voltar</ButtonLink>}
      >
        <Card>
          <form className="grid grid-cols-1 gap-5 sm:grid-cols-2" onSubmit={handleSubmit}>
            <label className="sm:col-span-1 flex flex-col gap-1.5 text-sm font-medium text-slate-700">
              Data/Hora
              <input
                required
                type="datetime-local"
                value={form.date}
                onChange={(e) => handleChange("date", e.target.value)}
                className="h-11 rounded-lg border border-slate-200 bg-white px-3 text-sm text-slate-800 shadow-sm outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500"
              />
            </label>
            <Input
              label="Motivo"
              required
              value={form.reason}
              onChange={(e) => handleChange("reason", e.target.value)}
              placeholder="Ex: Revisão, vacinação..."
            />
            <label className="flex flex-col gap-1.5 text-sm font-medium text-slate-700">
              Pet
              <select
                required
                value={form.petId}
                onChange={(e) => handleChange("petId", e.target.value)}
                className="h-11 rounded-lg border border-slate-200 bg-white px-3 text-sm text-slate-800 shadow-sm outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500"
              >
                <option value="">Selecione o pet</option>
                {pets.map((pet) => (
                  <option key={pet.id} value={pet.id}>
                    {pet.name}
                  </option>
                ))}
              </select>
            </label>
            <label className="flex flex-col gap-1.5 text-sm font-medium text-slate-700">
              Cliente
              <select
                required
                value={form.clientId}
                onChange={(e) => handleChange("clientId", e.target.value)}
                className="h-11 rounded-lg border border-slate-200 bg-white px-3 text-sm text-slate-800 shadow-sm outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500"
              >
                <option value="">Selecione o cliente</option>
                {clients.map((client) => (
                  <option key={client.id} value={client.id}>
                    {client.name}
                  </option>
                ))}
              </select>
            </label>
            <div className="sm:col-span-2 flex justify-end gap-3">
              <Button variant="ghost" type="button" onClick={() => router.back()}>
                Cancelar
              </Button>
              <Button type="submit" isLoading={isSaving}>
                Agendar consulta
              </Button>
            </div>
          </form>
        </Card>
      </Section>
    </div>
  );
}
