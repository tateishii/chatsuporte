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
        zIndex: 50,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 24px",
        boxShadow: "0 2px 8px rgba(42, 8, 79, 0.2)",
      }}
    > 
      <Link href="/" style={{ display: "flex", alignItems: "center", gap: "12px" }}>
        <Image src="/Logo.svg" alt="Logo" width={120} height={120} style={{ cursor : "pointer" }} />  

      </Link>

   
    </header>
  );
}
