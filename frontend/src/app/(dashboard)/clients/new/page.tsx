"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { Button, ButtonLink } from "../../../../components/ui/Button";
import { Card } from "../../../../components/ui/Card";
import { Input } from "../../../../components/ui/Input";
import { Section } from "../../../../components/ui/Section";
import { api } from "../../../../lib/api";

export default function NewClientPage() {
  const router = useRouter();
  const [form, setForm] = useState({ name: "", email: "", phone: "" });
  const [isSaving, setIsSaving] = useState(false);

  const handleChange = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsSaving(true);
    await api.createClient(form);
    setIsSaving(false);
    router.push("/clients");
  };

  return (
    <div className="flex flex-col gap-6">
      <Section
        title="Novo cliente"
        description="Cadastre os dados básicos do tutor."
        actions={<ButtonLink href="/clients" variant="ghost" leftIcon={<ArrowLeft className="h-4 w-4" />}>Voltar</ButtonLink>}
      >
        <Card>
          <form className="grid grid-cols-1 gap-5 sm:grid-cols-2" onSubmit={handleSubmit}>
            <Input
              label="Nome"
              required
              value={form.name}
              onChange={(e) => handleChange("name", e.target.value)}
              placeholder="Nome completo"
            />
            <Input
              label="Email"
              type="email"
              required
              value={form.email}
              onChange={(e) => handleChange("email", e.target.value)}
              placeholder="email@cliente.com"
            />
            <Input
              label="Telefone"
              required
              value={form.phone}
              onChange={(e) => handleChange("phone", e.target.value)}
              placeholder="(11) 99999-9999"
            />
            <div className="sm:col-span-2 flex justify-end gap-3">
              <Button variant="ghost" type="button" onClick={() => router.back()}>
                Cancelar
              </Button>
              <Button type="submit" isLoading={isSaving}>
                Salvar cliente
              </Button>
            </div>
          </form>
        </Card>
      </Section>
    </div>
  );
}
