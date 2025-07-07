"use client";
import { useState } from "react";
import Link from "next/link";

export default function Test() {
  const chats = [
    {
      id: 1,
      name: "Deyby",
      initials: "DY",
      link: "/secondpage",
      active: true,
      messages: [
        { from: "Deyby", text: "Feh logo atolou o carro" },
        { from: "Você", text: "Vixi é o brian mesmo KKKAKJSAKJS" },
      ],
    },
    {
      id: 2,
      name: "Miguel",
      initials: "MI",
      link: "/test",
      messages: [
        { from: "Miguel", text: "Menininho é chatão..." },
        { from: "Você", text: "Ele é chato demais mesmo" },
      ],
    },
  ];

  const [chatSelecionado, setChatSelecionado] = useState(chats[0]);

  const selecionarChat = (chat: typeof chats[number]) => {
    setChatSelecionado(chat);
  };

  return (
    <div style={{ display: "flex", height: "100vh" }}>
      <aside
        style={{
          width: "260px",
          backgroundColor: "#2c2f48",
          color: "white",
          padding: "10px",
          overflowY: "auto",
          boxSizing: "border-box",
        }}
      >
        <h2 style={{ fontSize: "18px", marginBottom: "1rem" }}>Conversas</h2>
        {chats.map((chat) => (
          <Link href={chat.link} passHref key={chat.id}>
          <div
           // key={chat.id}
            onClick={() => selecionarChat(chat)}
            style={{
              background:
                chatSelecionado.id === chat.id ? "#217aff" : "transparent",
              padding: "10px",
              marginBottom: "10px",
              borderRadius: "8px",
              display: "flex",
              alignItems: "center",
              cursor: "pointer",
            }}
          >
            <div
              style={{
                backgroundColor: "#444",
                width: "36px",
                height: "36px",
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontWeight: "bold",
                fontSize: "14px",
                color: "white",
                marginRight: "10px",
              }}
            >
              {chat.initials}
            </div>
            
            <div>{chat.name}</div>
          </div>
          </Link>
        ))}
      </aside>

      {/* Conteúdo da conversa */}
      <main
        style={{
          flex: 1,
          padding: "1rem",
          backgroundColor: "#f5f5f5",
          overflowY: "auto",
        }}
      >
   
      </main>
    </div>
  );
}
