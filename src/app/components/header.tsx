import Image from "next/image";
import Link from "next/link";

export default function Header() {
  return (
    <header
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "80px",
        backgroundColor: "#2c2f48",
        color: "white",
        zIndex: 1000,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 24px",
        boxShadow: "0 2px 8px rgba(42, 8, 79, 0.2)",
      }}
      //config da logo
    > 
      <Link href="/" style={{ display: "flex", alignItems: "center", gap: "12px" }}>
        <Image src="/Logo.svg" alt="Logo" width={120} height={120} style={{ cursor : "pointer" }} />  

      </Link>

      <button
        style={{
          padding: "10px 16px",
          fontSize: "16px",
          borderRadius: "5px",
          border: "none",
          cursor: "pointer",
          backgroundColor: "white",
          color: "black",
          fontWeight: "bold",
        }}
      >
        Chat
      </button>
    </header>
  );
}
