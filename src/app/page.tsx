"use client";

import React, { useState, useEffect } from "react";
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

  let usuarioLogado = null;
  if (typeof window !== "undefined") {
    try {
      usuarioLogado = JSON.parse(localStorage.getItem("user") || "null");
    } catch (error) {
      console.error("Erro ao ler usuário logado:", error);
    }
  }


  useEffect(() => {
    if (!usuarioLogado) return;

    const carregarChats = async () => {
      try {
        const resp = await fetch(`http://192.168.0.165:3001/chats/chatsDoUsuario/${usuarioLogado.id}`);
        const data = await resp.json();
        setChats(data);
      } catch (error) {
        console.error("Erro ao carregar chats:", error);
      }
    };

    carregarChats();
  }, []);


  const [chats, setChats] = useState<Chat[]>([]);


  const [chatSelecionado, setChatSelecionado] = useState<Chat | null>(null);
  const [novaMensagem, setNovaMensagem] = useState("");

  const criarNovoChat = async () => {
    const usernameOutro = prompt("Digite o @username do contato:");
    if (!usernameOutro || usernameOutro.trim() === "") return;

    try {
      const respUser = await fetch(`http://192.168.0.165:3001/usuarios/${usernameOutro}`);
      if (!respUser.ok) {
        alert("Usuário não encontrado");
        return;
      }


      const outroUsuario = await respUser.json();

      const respChat = await fetch("http://192.168.0.165:3001/chats", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          user1: usuarioLogado.id,
          user2: outroUsuario.id,
        }),
      });

      const chat = await respChat.json();
      router.push(`/chat/${chat.id}`);
    } catch (error: any) {
      alert("Erro ao criar chat: " + error.message);
    }
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
