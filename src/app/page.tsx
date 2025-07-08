"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

type Mensagem = {
  from: string;
  text: string;
};

type Chat = {
  id: number;
  name: string;
  messages: Mensagem[];
};

export default function Chat() {
  const router = useRouter();

  const [chats, setChats] = useState<Chat[]>([
    {
      id: 1,
      name: "Deyby",
      messages: [
        { from: "Deyby", text: "Feh logo atolou o carro" },
        { from: "Você", text: "Vixi é o Brian mesmo KKKAKJSAKJS" },
      ],
    },
    {
      id: 2,
      name: "Miguel",
      messages: [
        { from: "Miguel", text: "Menininho é chatão..." },
        { from: "Você", text: "Ele é chato demais mesmo" },
      ],
    },
  ]);

  const [chatSelecionado, setChatSelecionado] = useState<Chat | null>(null);
  const [novaMensagem, setNovaMensagem] = useState("");

  const criarNovoChat = () => {
    const nome = prompt("Digite o nome do novo contato:");
    if (!nome || nome.trim() === "") return;

    const novoChat: Chat = {
      id: Date.now(),
      name: nome.trim(),
      messages: [],
    };

    setChats((prevChats) => [...prevChats, novoChat]);
    setChatSelecionado(novoChat);
  };

  const enviarMensagem = () => {
    if (novaMensagem.trim() === "" || !chatSelecionado) return;

    const novaLista = chats.map((chat) =>
      chat.id === chatSelecionado.id
        ? {
            ...chat,
            messages: [...chat.messages, { from: "Você", text: novaMensagem }],
          }
        : chat
    );

    const chatAtualizado = novaLista.find((c) => c.id === chatSelecionado.id)!;

    setChats(novaLista);
    setChatSelecionado(chatAtualizado);
    setNovaMensagem("");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") enviarMensagem();
  };

  if (!chatSelecionado) {
    return (
      <div
        style={{
          height: "100vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#f5f5f5",
          textAlign: "center",
          padding: "20px",
        }}
      >
        <h1
          style={{
            fontSize: "1.8rem",
            marginBottom: "1rem",
            color: "#333",
          }}
        >
          Bem-vindo ao chat!
        </h1>
        <p
          style={{
            marginBottom: "2rem",
            color: "#666",
            fontSize: "1rem",
          }}
        >
          Clique no botão abaixo para iniciar sua primeira conversa.
        </p>
        <div style={{ display: "flex", gap: "1rem" }}>
          <button
            onClick={() => router.push("/secondpage")}
            style={{
              padding: "1rem 2rem",
              fontSize: "1.2rem",
              backgroundColor: "#217aff",
              color: "white",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
            }}
          >
            Mensagens
          </button>

          <button
            onClick={criarNovoChat}
            style={{
              padding: "1rem 2rem",
              fontSize: "1.2rem",
              backgroundColor: "#28a745",
              color: "white",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
            }}
          >
            Novo Chat
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100vh",
      }}
    >
      <div
        style={{
          flex: 1,
          padding: "1rem",
          backgroundColor: "#f5f5f5",
          overflowY: "auto",
        }}
      >
        <h2 style={{ marginBottom: "1rem", color: "black" }}>
          Conversa com {chatSelecionado.name}
        </h2>
        {chatSelecionado.messages.length === 0 && (
          <p style={{ color: "#666" }}>Sem mensagens ainda.</p>
        )}
        {chatSelecionado.messages.map((msg, index) => (
          <div
            key={index}
            style={{
              display: "flex",
              justifyContent:
                msg.from === "Você" ? "flex-end" : "flex-start",
              marginBottom: "10px",
            }}
          >
            <div
              style={{
                backgroundColor:
                  msg.from === "Você" ? "#217aff" : "#ddd",
                color: msg.from === "Você" ? "white" : "black",
                padding: "10px",
                borderRadius: "10px",
                maxWidth: "60%",
              }}
            >
              <strong>{msg.from}:</strong> {msg.text}
            </div>
          </div>
        ))}
      </div>

      <footer
        style={{
          padding: "10px",
          backgroundColor: "#fff",
          borderTop: "1px solid #ccc",
          display: "flex",
          position: "sticky",
          bottom: 0,
        }}
      >
        <input
          type="text"
          value={novaMensagem}
          onChange={(e) => setNovaMensagem(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Digite sua mensagem..."
          style={{
            flex: 1,
            padding: "10px",
            borderRadius: "5px",
            border: "1px solid #ccc",
            marginRight: "10px",
            color: "black",
          }}
        />
        <button
          onClick={enviarMensagem}
          style={{
            padding: "10px 20px",
            backgroundColor: "#217aff",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Enviar
        </button>
      </footer>
    </div>
  );
}
