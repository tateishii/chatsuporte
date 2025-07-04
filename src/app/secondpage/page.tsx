
"use client";
import { useState } from "react";
import Sidebar from "../components/sidebar";

export default function MinhaSidebar() {
  const chats = [
    {
      id: 1,
      name: "Deyby",
      initials: "DY",
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
    <aside style={{ backgroundColor: "#2c2f48", color: "white", padding: "10px" }}>
      <h2>Conversas</h2>
      {chats.map((chat) => (
        <div
          key={chat.id}
          onClick={() => selecionarChat(chat)}
          style={{
            padding: "10px",
            backgroundColor: chatSelecionado.id === chat.id ? "#217aff" : "transparent",
            borderRadius: "8px",
            marginBottom: "8px",
            cursor: "pointer",
          }}
        >
          <strong>{chat.initials}</strong> - {chat.name}
        </div>
      ))}
    </aside>
  );
}


