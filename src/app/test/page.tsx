"use client";
import { useState } from "react";

export default function Test() {
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
    <div style={{ display: "flex", height: "100vh" }}>


      <main
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
        {chatSelecionado.messages.map((msg, index) => (
          <div
            key={index}
            style={{
              marginBottom: "10px",
              textAlign: msg.from === "Você" ? "right" : "left",
            }}
          >
            <div
              style={{
                display: "inline-block",
                backgroundColor: msg.from === "Você" ? "#217aff" : "#ddd",
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
      </main>
    </div>
  );
}
