"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { Button, ButtonLink } from "../../../../components/ui/Button";
import { Card } from "../../../../components/ui/Card";
import { Input } from "../../../../components/ui/Input";
import { Section } from "../../../../components/ui/Section";
import { api, type Client } from "../../../../lib/api";

export default function NewPetPage() {
  const router = useRouter();
  const [clients, setClients] = useState<Client[]>([]);
  const [form, setForm] = useState({
    name: "",
    species: "",
    breed: "",
    age: 0,
    clientId: ""
  });
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    api.getClients().then(setClients);
  }, []);

  const handleChange = (field: string, value: string | number) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsSaving(true);
    await api.createPet({
      name: form.name,
      species: form.species,
      breed: form.breed,
      age: Number(form.age),
      clientId: form.clientId
    });
    setIsSaving(false);
    router.push("/pets");
  };

  return (
    <div className="flex flex-col gap-6">
      <Section
        title="Novo pet"
        description="Associe o pet a um tutor existente."
        actions={<ButtonLink href="/pets" variant="ghost" leftIcon={<ArrowLeft className="h-4 w-4" />}>Voltar</ButtonLink>}
      >
        <Card>
          <form className="grid grid-cols-1 gap-5 sm:grid-cols-2" onSubmit={handleSubmit}>
            <Input
              label="Nome"
              required
              value={form.name}
              onChange={(e) => handleChange("name", e.target.value)}
              placeholder="Nome do pet"
            />
            <Input
              label="Espécie"
              required
              value={form.species}
              onChange={(e) => handleChange("species", e.target.value)}
              placeholder="Cachorro, gato..."
            />
            <Input
              label="Raça"
              required
              value={form.breed}
              onChange={(e) => handleChange("breed", e.target.value)}
              placeholder="Raça do pet"
            />
            <Input
              label="Idade"
              type="number"
              min={0}
              required
              value={form.age}
              onChange={(e) => handleChange("age", Number(e.target.value))}
              placeholder="Em anos"
            />
            <label className="sm:col-span-2 flex flex-col gap-1.5 text-sm font-medium text-slate-700">
              Tutor
              <select
                required
                value={form.clientId}
                onChange={(e) => handleChange("clientId", e.target.value)}
                className="h-11 rounded-lg border border-slate-200 bg-white px-3 text-sm text-slate-800 shadow-sm outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500"
              >
                <option value="">Selecione o tutor</option>
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
                Salvar pet
              </Button>
            </div>
          </form>
        </Card>
      </Section>
    </div>
  );
}
