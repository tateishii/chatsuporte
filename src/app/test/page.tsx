"use client";
import { useState, useEffect } from "react";

type Mensagem = {
  from: string;
  text: string;
  dataHora?: string;
};

export default function ChatMi() {
  const mensagensIniciais: Mensagem[] = [
    {
      from: "Miguel",
      text: "Oi, tudo bem? Como posso te ajudar hoje?",
      dataHora: "06/07/2025 14:30",
    },
    {
      from: "Você",
      text: "Oi Miguel, tudo certo! Estou com uma dúvida sobre o produto X.",
      dataHora: "06/07/2025 14:32",
    },
  ];

  const [mensagens, setMensagens] = useState<Mensagem[]>(() => {
    if (typeof window !== "undefined") {
      const salvas = localStorage.getItem("Chat-Mi");
      return salvas ? JSON.parse(salvas) : mensagensIniciais;
    }
    return mensagensIniciais;
  });

  useEffect(() => {
    localStorage.setItem("Chat-Mi", JSON.stringify(mensagens));
  }, [mensagens]);

  const [novaMensagem, setNovaMensagem] = useState("");

  const enviarMensagem = () => {
    if (novaMensagem.trim() === "") return;

    const agora = new Date();
    const data = agora.toLocaleDateString("pt-BR");
    const hora = agora.toLocaleTimeString("pt-BR", {
      hour: "2-digit",
      minute: "2-digit",
    });

    const dataHoraCompleta = `${data} ${hora}`;

    setMensagens([
      ...mensagens,
      { from: "Você", text: novaMensagem, dataHora: dataHoraCompleta },
    ]);
    setNovaMensagem("");
  };

  const apagarMensagem = (index: number) => {
    setMensagens(mensagens.filter((_, i) => i !== index));
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") enviarMensagem();
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100vh" }}>
      <div
        style={{
          backgroundColor: "#fff",
          padding: "12px 16px",
          borderBottom: "1px solid #ccc",
          display: "flex",
          alignItems: "center",
          gap: "12px",
          position: "sticky",
          top: 0,
          zIndex: 10,
          boxShadow: "0 2px 4px rgba(0, 0, 0, 0.05)",
        }}
      >
        <div
          style={{
            backgroundColor: "#217aff",
            color: "white",
            borderRadius: "50%",
            width: "40px",
            height: "40px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontWeight: "bold",
            fontSize: "1rem",
          }}
        >
          MI
        </div>
        <div>
          <div
            style={{ fontWeight: "bold", fontSize: "1.1rem", color: "black" }}
          >
            Miguel
          </div>
          <div style={{ fontSize: "0.8rem", color: "gray" }}>Online</div>
        </div>
      </div>

      <div
        style={{
          flex: 1,
          padding: "1rem",
          backgroundColor: "#f5f5f5",
          overflowY: "auto",
        }}
      >
        {mensagens.map((msg, index) => (
          <div
            key={index}
            style={{
              marginBottom: "10px",
              textAlign: msg.from === "Você" ? "right" : "left",
            }}
          >
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "space-between",
                backgroundColor: msg.from === "Você" ? "#217aff" : "#ddd",
                color: msg.from === "Você" ? "white" : "black",
                padding: "10px 12px",
                borderRadius: "10px",
                maxWidth: "60%",
                gap: "8px",
              }}
            >
              <div style={{ flexGrow: 1 }}>
                <strong>{msg.from}:</strong> {msg.text}
                {msg.dataHora && (
                  <div
                    style={{
                      fontSize: "0.75rem",
                      color: "#ccc",
                      marginTop: "4px",
                      textAlign: "right",
                    }}
                  >
                    {msg.dataHora}
                  </div>
                )}
              </div>

              {msg.from === "Você" && (
                <button
                  onClick={() => apagarMensagem(index)}
                  style={{
                    background: "transparent",
                    border: "none",
                    color: "white",
                    cursor: "pointer",
                    fontWeight: "bold",
                    fontSize: "16px",
                    userSelect: "none",
                    padding: 0,
                    marginLeft: "8px",
                    lineHeight: 1,
                  }}
                  aria-label="Apagar mensagem"
                  title="Apagar mensagem"
                >
                  ×
                </button>
              )}
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
