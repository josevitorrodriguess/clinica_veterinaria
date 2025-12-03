import type { Metadata } from "next";
import { Space_Grotesk } from "next/font/google";
import "../styles/utils.css";
import "./globals.css";
import { AuthProvider } from "../context/AuthContext";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  display: "swap"
});

export const metadata: Metadata = {
  title: "Clínica Veterinária | Painel",
  description: "Painel da clínica veterinária para gestão de clientes, pets e consultas."
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body className={spaceGrotesk.className}>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
