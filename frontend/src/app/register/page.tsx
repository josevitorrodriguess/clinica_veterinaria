"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Lock, Mail, ShieldCheck, UserRound } from "lucide-react";
import { Button } from "../../components/ui/Button";
import { Input } from "../../components/ui/Input";
import { useAuth } from "../../context/AuthContext";

export default function RegisterPage() {
  const router = useRouter();
  const { register, token, isLoading } = useAuth();
  const [name, setName] = useState("Nova Pessoa");
  const [email, setEmail] = useState("novo@clinicavet.com");
  const [password, setPassword] = useState("123456");
  const [confirmPassword, setConfirmPassword] = useState("123456");
  const [error, setError] = useState("");

  useEffect(() => {
    if (token) {
      router.replace("/");
    }
  }, [token, router]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("As senhas precisam ser iguais.");
      return;
    }

    try {
      await register({ name, email, password });
      router.replace("/");
    } catch (err) {
      const message = err instanceof Error ? err.message : "Nao foi possivel criar sua conta.";
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
                <ShieldCheck className="h-6 w-6" />
              </div>
              <h2 className="text-3xl font-semibold leading-tight">Crie seu acesso seguro</h2>
              <p className="text-sm text-emerald-50">
                Cadastre um perfil para acessar o painel interno. Depois, voce pode gerenciar clientes, pets e consultas sem sair daqui.
              </p>
            </div>
            <div className="space-y-2 text-sm text-emerald-50/90">
              <p>Clinica Veterinaria Aurora</p>
              <p>Credenciais armazenadas apenas no navegador</p>
            </div>
          </div>
        </div>

        <div className="p-8 sm:p-10">
          <div className="mb-8 space-y-2">
            <p className="text-sm uppercase tracking-wide text-emerald-600">Nova conta</p>
            <h1 className="text-2xl font-semibold text-slate-800">Registrar acesso</h1>
            <p className="text-sm text-slate-500">Preencha os dados para liberar o painel.</p>
          </div>

          <form className="space-y-5" onSubmit={handleSubmit}>
            <Input
              type="text"
              label="Nome completo"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Seu nome"
              leftIcon={<UserRound className="h-4 w-4 text-slate-400" />}
            />
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
              placeholder="Minimo de 6 caracteres"
              leftIcon={<Lock className="h-4 w-4 text-slate-400" />}
            />
            <Input
              type="password"
              label="Confirmar senha"
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Repita a senha"
              leftIcon={<Lock className="h-4 w-4 text-slate-400" />}
            />
            {error && <p className="text-sm text-red-500">{error}</p>}
            <Button type="submit" className="h-11 w-full" isLoading={isLoading}>
              Criar conta e entrar
            </Button>
            <div className="flex items-center justify-between text-sm text-slate-500">
              <span>Usaremos os dados apenas para autenticar voce.</span>
              <Link className="font-semibold text-emerald-600 hover:text-emerald-500" href="/login">
                Ja tenho acesso
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
