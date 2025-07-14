"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

export default function Sidebar() {
  const chats = [
    { id: 1, name: "Deyby", initials: "DY", link: "/secondpage" },
    { id: 2, name: "Miguel", initials: "MI", link: "/test" },
  ];

  const [naoLidas, setNaoLidas] = useState<{ [chatId: number]: boolean }>({});

  const [chatSelecionadoId, setChatSelecionadoId] = useState<number | null>(null);

  const nomeParaId = chats.reduce((acc, chat) => {
    acc[chat.name] = chat.id;
    return acc;
  }, {} as { [nome: string]: number });

  const selecionarChat = (id: number) => {
    setChatSelecionadoId(id);
    setNaoLidas((prev) => ({
      ...prev,
      [id]: false,
    }));
    localStorage.setItem(`ultimoVisto-${id}`, Date.now().toString());
  };


  useEffect(() => {
    const verificarNovasMensagens = async () => {
      try {
        const resp = await fetch("http://localhost:3001/messages/last");
        const ultimas = await resp.json();

        const novas: { [chatId: number]: boolean } = { ...naoLidas };

        ultimas.forEach((msg: any) => {
          const id = msg.chatId;
          const timestamp = new Date(msg.createdAt).getTime();

          const ultimoVisto = Number(localStorage.getItem(`ultimoVisto-${id}`)) || 0;

          if (id !== chatSelecionadoId && timestamp > ultimoVisto) {
            novas[id] = true;
          }
        });

        setNaoLidas(novas);
      } catch (err) {
        console.error("Erro ao verificar mensagens:", err);
      }
    };

    verificarNovasMensagens();
    const interval = setInterval(verificarNovasMensagens, 5000);
    return () => clearInterval(interval);
  }, [chatSelecionadoId]);


  return (
    <aside
      style={{
        width: "260px",
        backgroundColor: "#2c2f48",
        color: "white",
        padding: "10px",
        paddingTop: "20px",
        overflowY: "auto",
        boxSizing: "border-box",
        height: "100vh",
      }}
    >
      <h2 style={{ fontSize: "18px", marginBottom: "1rem" }}>Conversas</h2>

      {chats.map((chat) => (
        <Link
          key={chat.id}
          href={chat.link}
          onClick={() => selecionarChat(chat.id)}
          style={{
            background: chatSelecionadoId === chat.id ? "#217aff" : "transparent",
            padding: "10px",
            marginBottom: "10px",
            borderRadius: "8px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            cursor: "pointer",
            color: "inherit",
            textDecoration: "none",
          }}
        >
          <span>{chat.name}</span>

          {naoLidas[chat.id] && (
            <span
              style={{
                backgroundColor: "#ff3b30",
                width: "16px",
                height: "16px",
                borderRadius: "50%",
                display: "inline-block",
                boxShadow: "0 0 4px rgba(0, 0, 0, 0.3)",
              }}
              aria-label="Mensagem nova"
              title="Mensagem nova"
            />
          )}
        </Link>
      ))}
    </aside>
  );
}
