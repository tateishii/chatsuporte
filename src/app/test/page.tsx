"use client";
import React, { useState, useEffect, useRef } from "react";

type Mensagem = {
  from: string;
  text?: string;
  dataHora?: string;
  imagem?: string;
};

const mensagensFixas: Mensagem[] = [
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

export default function ChatMi() {
  const [mensagens, setMensagens] = useState<Mensagem[]>([]);
  const [novaMensagem, setNovaMensagem] = useState("");
  const [imagemSelecionada, setImagemSelecionada] = useState<string | null>(null);
  const mensagensRef = useRef<HTMLDivElement>(null);
  const storageKey = "chat-Mi";

  const rolarParaBaixo = () => {
    mensagensRef.current?.scrollTo({ top: mensagensRef.current.scrollHeight, behavior: "smooth" });
  };

  useEffect(() => {
    const salvas = localStorage.getItem(storageKey);
    let carregadas: Mensagem[] = [];

    try {
      if (salvas) carregadas = JSON.parse(salvas);
    } catch {}

    setMensagens([...mensagensFixas, ...carregadas]);
  }, []);

  useEffect(() => {
    if (mensagens.length > mensagensFixas.length) {
      const dinamicas = mensagens.slice(mensagensFixas.length);
      localStorage.setItem(storageKey, JSON.stringify(dinamicas));
    }
    rolarParaBaixo();
  }, [mensagens]);

  const enviarMensagem = () => {
    if (!novaMensagem.trim() && !imagemSelecionada) return;

    const agora = new Date();
    const data = agora.toLocaleDateString("pt-BR");
    const hora = agora.toLocaleTimeString("pt-BR", {
      hour: "2-digit",
      minute: "2-digit",
    });

    const nova: Mensagem = {
      from: "Você",
      dataHora: `${data} ${hora}`,
      text: novaMensagem.trim() || undefined,
      imagem: imagemSelecionada || undefined,
    };

    setMensagens((antigas) => [...antigas, nova]);
    setNovaMensagem("");
    setImagemSelecionada(null);
  };

  const apagarMensagem = (index: number) => {
    if (index < mensagensFixas.length) return;
    setMensagens((antigas) => antigas.filter((_, i) => i !== index));
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") enviarMensagem();
  };

  const handleImagemChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const imagemURL = URL.createObjectURL(file);
      setImagemSelecionada(imagemURL);
    }
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
          <div style={{ fontWeight: "bold", fontSize: "1.1rem", color: "black" }}>
            Miguel
          </div>
          <div style={{ fontSize: "0.8rem", color: "gray" }}>Online</div>
        </div>
      </div>

      <div
        ref={mensagensRef}
        style={{
          flex: 1,
          padding: "1rem",
          paddingBottom: "80px",
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
                position: "relative",
                display: "inline-flex",
                alignItems: "center",
                flexDirection: "column",
                backgroundColor: msg.from === "Você" ? "#217aff" : "#ddd",
                color: msg.from === "Você" ? "white" : "black",
                padding: msg.from === "Você" ? "10px 40px 10px 12px" : "10px 12px",
                borderRadius: "10px",
                maxWidth: "60%",
                gap: "8px",
                wordBreak: "break-word",
                whiteSpace: "normal",
              }}
            >
              <div style={{ alignSelf: "flex-start" }}>
                <strong>{msg.from}:</strong> {msg.text}
              </div>

              {msg.imagem && (
                <img
                  src={msg.imagem}
                  alt="Imagem enviada"
                  style={{
                    maxWidth: "100%",
                    borderRadius: "8px",
                    marginTop: "-4px",
                  }}
                />
              )}

              {msg.dataHora && (
                <div
                  style={{
                    fontSize: "0.75rem",
                    color: msg.from === "Você" ? "#ccc" : "#555",
                    marginTop: "4px",
                    textAlign: "right",
                    width: "100%",
                  }}
                >
                  {msg.dataHora}
                </div>
              )}

              {msg.from === "Você" && (
                <button
                  onClick={() => apagarMensagem(index)}
                  style={{
                    position: "absolute",
                    bottom: "4px",
                    right: "8px",
                    background: "transparent",
                    border: "none",
                    color: "white",
                    cursor: "pointer",
                    fontWeight: "bold",
                    fontSize: "16px",
                    userSelect: "none",
                    padding: 0,
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
          alignItems: "center",
          position: "fixed",
          bottom: "10px",
          left: 0,
          right: 0,
          color: "black",
          maxWidth: "60%",
          margin: "0 auto",
          borderRadius: "8px",
          boxShadow: "0 0 10px rgba(0,0,0,0.1)",
          zIndex: 20,
          gap: "10px",
        }}
      >
        <label
          htmlFor="input-imagem"
          style={{
            display: "flex",
            alignItems: "center",
            padding: "8px 12px",
            backgroundColor: "#eee",
            borderRadius: 6,
            cursor: "pointer",
            marginRight: "10px",
            fontSize: "14px",
          }}
        >
          📎 Anexar
        </label>
        <input
          id="input-imagem"
          type="file"
          accept="image/*"
          onChange={handleImagemChange}
          style={{ display: "none" }}
        />

        {imagemSelecionada && (
          <img
            src={imagemSelecionada}
            alt="Prévia"
            style={{
              width: "40px",
              height: "40px",
              objectFit: "cover",
              borderRadius: "6px",
              marginRight: "10px",
            }}
          />
        )}

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
