import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Sysmetric - Dashboard de Monitoramento",
  description: "Dashboard para monitoramento de sistemas em tempo real",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className="light">
      <body className="antialiased bg-background text-foreground">
        {children}
      </body>
    </html>
  );
}
