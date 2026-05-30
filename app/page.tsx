"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import InventoryCard from "../components/InventoryCard";

export default function HomePage() {
  const [products, setProducts] = useState<any[]>([]);
  const [name, setName] = useState("");
  const [stock, setStock] = useState("");
  const [price, setPrice] = useState("");

  const fetchProducts = async () => {
    const res = await axios.get("http://localhost:5000/api/products");
    setProducts(res.data);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleAddProduct = async () => {
    await axios.post("http://localhost:5000/api/products", {
      name,
      currentStock: Number(stock),
      costPrice: Number(price),
    });
    setName("");
    setStock("");
    setPrice("");
    fetchProducts();
  };

  return (
    <main
      className="relative min-h-screen overflow-x-hidden"
      style={{
        background: "#0a0a0a",
        backgroundImage:
          "linear-gradient(rgba(255,107,26,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,107,26,0.04) 1px, transparent 1px)",
        backgroundSize: "48px 48px",
        fontFamily: "'Syne', sans-serif",
        color: "#F5F0EB",
      }}
    >
      {/* Orange radial glow */}
      <div
        className="pointer-events-none fixed"
        style={{
          top: -200,
          left: -200,
          width: 700,
          height: 700,
          background:
            "radial-gradient(circle, rgba(255,107,26,0.1) 0%, transparent 65%)",
          animation: "pulse 6s ease-in-out infinite",
          zIndex: 0,
        }}
      />

      <div
        className="relative mx-auto max-w-[1280px] px-16 py-12 xl:px-8 xl:py-10 lg:px-8 md:px-5 md:py-7 sm:px-4 sm:py-5"
        style={{ zIndex: 1 }}
      >
        {/* HEADER */}
        <header
          className="flex items-end justify-between mb-14 pb-8 md:flex-col md:items-start md:gap-4"
          style={{ borderBottom: "1px solid rgba(255,107,26,0.2)" }}
        >
          <div className="flex flex-col gap-1">
            <h1
              style={{
                fontFamily: "'Bebas Neue', sans-serif",
                fontSize: "clamp(36px, 5vw, 64px)",
                lineHeight: 1,
                letterSpacing: 3,
                color: "#F5F0EB",
              }}
            >
              STOCK
              <span
                style={{
                  color: "#FF6B1A",
                  textShadow: "0 0 24px rgba(255,107,26,0.4)",
                }}
              >
                SENSE
              </span>{" "}
              AI
            </h1>
            <p
              style={{
                fontFamily: "'DM Mono', monospace",
                fontSize: 12,
                color: "#6B6560",
                letterSpacing: 3,
                textTransform: "uppercase",
              }}
            >
              Smart inventory predictions for retailers
            </p>
          </div>

          <div
            style={{
              fontFamily: "'DM Mono', monospace",
              fontSize: 11,
              background: "rgba(255,107,26,0.12)",
              border: "1px solid rgba(255,107,26,0.2)",
              color: "#FF8C42",
              padding: "8px 16px",
              borderRadius: 4,
              letterSpacing: 2,
              textTransform: "uppercase",
              whiteSpace: "nowrap",
            }}
          >
            ● LIVE TRACKING
          </div>
        </header>

        {/* MAIN GRID */}
        <div
          className="grid gap-8 md:grid-cols-1"
          style={{ gridTemplateColumns: "380px 1fr" }}
        >
          {/* FORM PANEL */}
          <div
            className="self-start sticky top-8 md:static"
            style={{
              background: "#111111",
              border: "1px solid rgba(255,107,26,0.2)",
              borderRadius: 2,
              padding: 32,
            }}
          >
            <div className="flex items-center gap-3 mb-7">
              <div
                style={{
                  width: 10,
                  height: 10,
                  borderRadius: "50%",
                  background: "#FF6B1A",
                  boxShadow: "0 0 12px #FF6B1A",
                  animation: "blink 2s ease-in-out infinite",
                }}
              />
              <span
                style={{
                  fontFamily: "'Bebas Neue', sans-serif",
                  fontSize: 26,
                  letterSpacing: 2,
                }}
              >
                ADD PRODUCT
              </span>
            </div>

            {[
              {
                label: "Product Name",
                val: name,
                set: setName,
                ph: "e.g. Running Shoes XL",
                type: "text",
              },
              {
                label: "Current Stock (units)",
                val: stock,
                set: setStock,
                ph: "e.g. 150",
                type: "number",
              },
              {
                label: "Cost Price (€)",
                val: price,
                set: setPrice,
                ph: "e.g. 49.99",
                type: "number",
              },
            ].map(({ label, val, set, ph, type }) => (
              <div key={label} className="flex flex-col gap-1.5 mb-4">
                <label
                  style={{
                    fontFamily: "'DM Mono', monospace",
                    fontSize: 10,
                    letterSpacing: 2.5,
                    textTransform: "uppercase",
                    color: "#6B6560",
                  }}
                >
                  {label}
                </label>
                <input
                  type={type}
                  placeholder={ph}
                  value={val}
                  onChange={(e) => set(e.target.value)}
                  style={{
                    background: "#181818",
                    border: "1px solid rgba(255,107,26,0.15)",
                    color: "#F5F0EB",
                    fontFamily: "'DM Mono', monospace",
                    fontSize: 14,
                    padding: "14px 16px",
                    borderRadius: 2,
                    outline: "none",
                    width: "100%",
                    transition: "border-color 0.2s, box-shadow 0.2s",
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = "#FF6B1A";
                    e.target.style.boxShadow =
                      "0 0 0 3px rgba(255,107,26,0.12)";
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = "rgba(255,107,26,0.15)";
                    e.target.style.boxShadow = "none";
                  }}
                />
              </div>
            ))}

            <button
              onClick={handleAddProduct}
              style={{
                width: "100%",
                marginTop: 8,
                background: "#FF6B1A",
                color: "#0a0a0a",
                fontFamily: "'Bebas Neue', sans-serif",
                fontSize: 20,
                letterSpacing: 3,
                padding: "16px",
                border: "none",
                borderRadius: 2,
                cursor: "pointer",
                transition: "background 0.2s, transform 0.15s, box-shadow 0.2s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "#FF8C42";
                e.currentTarget.style.boxShadow =
                  "0 0 32px rgba(255,107,26,0.3)";
                e.currentTarget.style.transform = "translateY(-1px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "#FF6B1A";
                e.currentTarget.style.boxShadow = "none";
                e.currentTarget.style.transform = "translateY(0)";
              }}
            >
              SAVE PRODUCT
            </button>
          </div>

          {/* INVENTORY LIST */}
          <div>
            <div className="flex items-baseline justify-between mb-5">
              <span
                style={{
                  fontFamily: "'Bebas Neue', sans-serif",
                  fontSize: 26,
                  letterSpacing: 2,
                }}
              >
                INVENTORY
              </span>
              <span
                style={{
                  fontFamily: "'DM Mono', monospace",
                  fontSize: 11,
                  color: "#6B6560",
                  letterSpacing: 1.5,
                }}
              >
                ITEMS:{" "}
                <span style={{ color: "#FF6B1A" }}>{products.length}</span>
              </span>
            </div>

            <div className="flex flex-col gap-3">
              {products.length === 0 ? (
                <div
                  className="flex flex-col items-center justify-center gap-3 py-16"
                  style={{
                    border: "1px dashed rgba(255,107,26,0.2)",
                    borderRadius: 2,
                  }}
                >
                  <span style={{ fontSize: 48, opacity: 0.3 }}>📦</span>
                  <span
                    style={{
                      fontFamily: "'DM Mono', monospace",
                      fontSize: 12,
                      color: "#6B6560",
                      letterSpacing: 2,
                      textAlign: "center",
                      textTransform: "uppercase",
                    }}
                  >
                    No products yet.
                    <br />
                    Add your first item.
                  </span>
                </div>
              ) : (
                products.map((product) => (
                  <InventoryCard
                    key={product._id}
                    name={product.name}
                    stock={product.currentStock}
                    costPrice={product.costPrice}
                  />
                ))
              )}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Mono:wght@400;500&family=Syne:wght@400;700;800&display=swap');
        @keyframes pulse { 0%,100%{opacity:.7;transform:scale(1)} 50%{opacity:1;transform:scale(1.1)} }
        @keyframes blink { 0%,100%{opacity:1} 50%{opacity:.3} }
        input::placeholder { color: #6B6560; }
      `}</style>
    </main>
  );
}
