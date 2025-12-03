"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Lock, Mail } from "lucide-react";
import { Button } from "../../components/ui/Button";
import { Input } from "../../components/ui/Input";
import { useAuth } from "../../context/AuthContext";

export default function LoginPage() {
  const router = useRouter();
  const { login, token, isLoading } = useAuth();
  const [email, setEmail] = useState("medico@clinicavet.com");
  const [password, setPassword] = useState("123456");
  const [error, setError] = useState("");

  useEffect(() => {
    if (token) {
      router.replace("/");
    }
  }, [token, router]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError("");
    try {
      await login(email, password);
      router.replace("/");
    } catch (err) {
      const message = err instanceof Error ? err.message : "Nao foi possivel fazer login.";
      setError(message);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-emerald-50 via-slate-50 to-white px-4 py-10">
      <div className="grid w-full max-w-5xl grid-cols-1 overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-soft lg:grid-cols-2">
        <div className="relative hidden bg-gradient-to-br from-emerald-600 to-emerald-500 p-10 text-white lg:block">
          <div className="flex h-full flex-col justify-between">
            <div className="space-y-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/15">
                <Lock className="h-6 w-6" />
              </div>
              <h2 className="text-3xl font-semibold leading-tight">Acesse o painel do medico</h2>
              <p className="text-sm text-emerald-50">
                Gerencie clientes, pets e consultas com um fluxo enxuto e organizado. Seus dados permanecem somente na sua sessao local.
              </p>
            </div>
            <div className="space-y-2 text-sm text-emerald-50/90">
              <p>Clinica Veterinaria Aurora</p>
              <p>Painel interno com App Router</p>
            </div>
          </div>
        </div>

        <div className="p-8 sm:p-10">
          <div className="mb-8 space-y-2">
            <p className="text-sm uppercase tracking-wide text-emerald-600">Bem-vindo(a)</p>
            <h1 className="text-2xl font-semibold text-slate-800">Entrar no painel</h1>
            <p className="text-sm text-slate-500">Use seu e-mail institucional para continuar.</p>
          </div>

          <form className="space-y-5" onSubmit={handleSubmit}>
            <Input
              type="email"
              label="E-mail"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="seu.email@clinica.com"
              leftIcon={<Mail className="h-4 w-4 text-slate-400" />}
            />
            <Input
              type="password"
              label="Senha"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="********"
            />
            {error && <p className="text-sm text-red-500">{error}</p>}
            <Button type="submit" className="h-11 w-full" isLoading={isLoading}>
              Entrar
            </Button>
            <div className="flex items-center justify-between text-sm text-slate-500">
              <span>Ao entrar, o token fica salvo apenas no seu navegador.</span>
              <Link className="font-semibold text-emerald-600 hover:text-emerald-500" href="/register">
                Criar conta
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
