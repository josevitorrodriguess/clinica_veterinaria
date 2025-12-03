"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowUpRight, Plus } from "lucide-react";
import { ButtonLink } from "../../../components/ui/Button";
import { Card } from "../../../components/ui/Card";
import { Section } from "../../../components/ui/Section";
import { api, type Client } from "../../../lib/api";

export default function ClientsPage() {
  const [clients, setClients] = useState<Client[]>([]);

  useEffect(() => {
    api.getClients().then(setClients);
  }, []);

  return (
    <div className="flex flex-col gap-6">
      <Section
        title="Clientes"
        description="Cadastre tutores e veja seu histórico de pets e consultas."
        actions={
          <ButtonLink href="/clients/new" leftIcon={<Plus className="h-4 w-4" />}>
            Novo Cliente
          </ButtonLink>
        }
      >
        <Card padding="none">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-slate-100">
              <thead className="bg-slate-50">
                <tr className="text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                  <th className="px-6 py-3">Nome</th>
                  <th className="px-6 py-3">Email</th>
                  <th className="px-6 py-3">Telefone</th>
                  <th className="px-6 py-3">Pets</th>
                  <th className="px-6 py-3 text-right">Detalhes</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-sm text-slate-700">
                {clients.map((client) => (
                  <tr key={client.id} className="hover:bg-slate-50">
                    <td className="px-6 py-4 font-medium text-slate-800">{client.name}</td>
                    <td className="px-6 py-4">{client.email}</td>
                    <td className="px-6 py-4">{client.phone}</td>
                    <td className="px-6 py-4">{client.petCount ?? client.petIds?.length ?? client.pets?.length ?? 0}</td>
                    <td className="px-6 py-4 text-right">
                      <Link
                        href={`/clients/${client.id}`}
                        className="inline-flex items-center gap-2 text-emerald-600 hover:text-emerald-700"
                      >
                        Ver ficha <ArrowUpRight className="h-4 w-4" />
                      </Link>
                    </td>
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
