"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowUpRight, Plus } from "lucide-react";
import { ButtonLink } from "../../../components/ui/Button";
import { Card } from "../../../components/ui/Card";
import { Section } from "../../../components/ui/Section";
import { api, type Client, type Pet } from "../../../lib/api";

type PetWithClient = Pet & { clientName: string };

export default function PetsPage() {
  const [pets, setPets] = useState<PetWithClient[]>([]);

  useEffect(() => {
    const load = async () => {
      const [petsData, clientsData] = await Promise.all([api.getPets(), api.getClients()]);
      const mapped = petsData.map((pet) => {
        const client = clientsData.find((client) => client.id === pet.clientId);
        return { ...pet, clientName: client?.name ?? "Tutor" };
      });
      setPets(mapped);
    };
    load();
  }, []);

  return (
    <div className="flex flex-col gap-6">
      <Section
        title="Pets"
        description="Visualize os pets cadastrados e seus respectivos tutores."
        actions={
          <ButtonLink href="/pets/new" leftIcon={<Plus className="h-4 w-4" />}>
            Novo Pet
          </ButtonLink>
        }
      >
        <Card padding="none">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-slate-100">
              <thead className="bg-slate-50">
                <tr className="text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                  <th className="px-6 py-3">Nome</th>
                  <th className="px-6 py-3">Espécie</th>
                  <th className="px-6 py-3">Raça</th>
                  <th className="px-6 py-3">Idade</th>
                  <th className="px-6 py-3">Tutor</th>
                  <th className="px-6 py-3 text-right">Detalhes</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-sm text-slate-700">
                {pets.map((pet) => (
                  <tr key={pet.id} className="hover:bg-slate-50">
                    <td className="px-6 py-4 font-medium text-slate-800">{pet.name}</td>
                    <td className="px-6 py-4">{pet.species}</td>
                    <td className="px-6 py-4">{pet.breed}</td>
                    <td className="px-6 py-4">{pet.age} anos</td>
                    <td className="px-6 py-4">{pet.clientName}</td>
                    <td className="px-6 py-4 text-right">
                      <Link
                        href={`/pets/${pet.id}`}
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
