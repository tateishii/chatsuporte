import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "./components/header";
import Sidebar from "./components/sidebar";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        style={{
          margin: 0,
          display: "flex",
          flexDirection: "column",
          height: "100vh",
        }}
      >
        {/* Header fixo de 80px */}
        <Header />

        {/* Container principal */}
        <div
          style={{
            marginTop: "80px",                   // empurra abaixo do Header
            display: "flex",
            flex: 1,
            height: "calc(100vh - 80px)",       // só o que sobra da tela
          }}
        >
          {/* Sidebar fixa na esquerda */}
          <aside style={{ width: "250px" }}>
            <Sidebar />
          </aside>

          {/* Main: espaço restante, scroll interno */}
          <main
            style={{
              flex: 1,
              padding: "1rem",
              backgroundColor: "#f5f5f5",
              overflowY: "auto",
            }}
          >
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
