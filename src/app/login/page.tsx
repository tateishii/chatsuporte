"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const router = useRouter();

  const handleLogin = async () => { 
    const res = await fetch("http://192.168.0.165:3001/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, name }),
    });

    const data = await res.json();
    localStorage.setItem("user", JSON.stringify(data));
    router.push("/home");
  };

  return (
    <div
      style={{
        padding: 20,
        display: "flex",
        flexDirection: "column",
        gap: 10,
        maxWidth: 300,
        margin: "0 auto",
        marginTop: "20vh",
      }}
    >
      <h2 style={{ color: "black", textAlign: "center" }}>Login</h2>

      <input
        placeholder="Nome"
        value={name}
        onChange={(e) => setName(e.target.value)}
        style={{
          padding: 10,
          fontSize: 16,
          color: "black",
          border: "1px solid #ccc",
          borderRadius: 4,
        }}
      />
      <input
        placeholder="Usuário"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        style={{
          padding: 10,
          fontSize: 16,
          color: "black",
          border: "1px solid #ccc",
          borderRadius: 4,
        }}
      />
      <button
        onClick={handleLogin}
        style={{
          padding: 10,
          fontSize: 16,
          backgroundColor: "#217aff",
          color: "white",
          border: "none",
          borderRadius: 4,
          cursor: "pointer",
        }}
      >
        Entrar
      </button>
    </div>
  );
}
