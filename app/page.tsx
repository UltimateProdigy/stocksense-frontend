"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { Product, Sale } from "../types";
import InventoryCard from "../components/InventoryCard";
import AddProductForm from "../components/AddProductForm";
import RecordSaleForm from "../components/RecordSaleForm";
import InsightsPanel from "../components/InsightsPanel";
import SalesLog from "../components/SalesLog";
import EmptyState from "../components/EmptyState";

type Tab = "inventory" | "sales" | "insights";

export default function HomePage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [sales, setSales] = useState<Sale[]>([]);
  const [activeTab, setActiveTab] = useState<Tab>("inventory");

  const fetchProducts = async () => {
    const res = await axios.get("http://localhost:5000/api/products");
    setProducts(res.data);
  };

  const fetchSales = async () => {
    const res = await axios.get("http://localhost:5000/api/sales");
    setSales(res.data);
  };

  const refetchAll = () => {
    fetchProducts();
    fetchSales();
  };

  useEffect(() => {
    fetchProducts();
    fetchSales();
  }, []);

  const totalRevenue = sales.reduce(
    (sum, s) => sum + s.sellingPrice * s.unitsSold,
    0,
  );
  const totalUnitsSold = sales.reduce((sum, s) => sum + s.unitsSold, 0);

  const tabs: { key: Tab; label: string }[] = [
    { key: "inventory", label: "INVENTORY" },
    { key: "sales", label: "SALES LOG" },
    { key: "insights", label: "AI INSIGHTS" },
  ];

  const tabCount: Record<Tab, React.ReactNode> = {
    inventory: (
      <>
        <span style={{ color: "#6B6560" }}>ITEMS:</span>{" "}
        <span style={{ color: "#FF6B1A" }}>{products.length}</span>
      </>
    ),
    sales: (
      <>
        <span style={{ color: "#6B6560" }}>RECORDS:</span>{" "}
        <span style={{ color: "#FF6B1A" }}>{sales.length}</span>
      </>
    ),
    insights: <span style={{ color: "#a855f7" }}>POWERED BY LLAMA 3</span>,
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
      {/* Radial glow */}
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
        className="relative mx-auto max-w-[1280px] px-16 py-12 xl:px-8 lg:px-8 md:px-5 md:py-7 sm:px-4 sm:py-5"
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
              Smart inventory predictions for Nigerian retailers
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

        {/* STATS BAR */}
        <div className="grid grid-cols-3 gap-4 mb-10 sm:grid-cols-1">
          {[
            { label: "TOTAL PRODUCTS", value: products.length },
            { label: "TOTAL UNITS SOLD", value: totalUnitsSold },
            {
              label: "TOTAL REVENUE",
              value: `₦${totalRevenue.toLocaleString()}`,
              orange: true,
            },
          ].map(({ label, value, orange }) => (
            <div
              key={label}
              style={{
                background: "#111111",
                border: "1px solid rgba(255,107,26,0.15)",
                borderRadius: 2,
                padding: "20px 24px",
              }}
            >
              <div
                style={{
                  fontFamily: "'DM Mono', monospace",
                  fontSize: 10,
                  color: "#6B6560",
                  letterSpacing: 2.5,
                  textTransform: "uppercase",
                  marginBottom: 6,
                }}
              >
                {label}
              </div>
              <div
                style={{
                  fontFamily: "'Bebas Neue', sans-serif",
                  fontSize: 32,
                  letterSpacing: 1,
                  color: orange ? "#FF6B1A" : "#F5F0EB",
                }}
              >
                {value}
              </div>
            </div>
          ))}
        </div>

        {/* MAIN GRID */}
        <div
          className="grid gap-8 md:grid-cols-1"
          style={{ gridTemplateColumns: "380px 1fr" }}
        >
          {/* LEFT */}
          <div className="flex flex-col gap-6">
            <AddProductForm onProductAdded={fetchProducts} />
            <RecordSaleForm products={products} onSaleRecorded={refetchAll} />
          </div>

          {/* RIGHT */}
          <div>
            {/* Tabs */}
            <div
              className="flex mb-6"
              style={{ borderBottom: "1px solid rgba(255,107,26,0.2)" }}
            >
              {tabs.map(({ key, label }) => (
                <button
                  key={key}
                  onClick={() => setActiveTab(key)}
                  style={{
                    fontFamily: "'Bebas Neue', sans-serif",
                    fontSize: 18,
                    letterSpacing: 2,
                    padding: "10px 20px",
                    background: "transparent",
                    border: "none",
                    borderBottom:
                      activeTab === key
                        ? "2px solid #FF6B1A"
                        : "2px solid transparent",
                    color: activeTab === key ? "#FF6B1A" : "#6B6560",
                    cursor: "pointer",
                    transition: "color 0.2s",
                    marginBottom: -1,
                    whiteSpace: "nowrap",
                  }}
                >
                  {label}
                </button>
              ))}
              <div
                style={{
                  marginLeft: "auto",
                  fontFamily: "'DM Mono', monospace",
                  fontSize: 11,
                  letterSpacing: 1.5,
                  alignSelf: "center",
                }}
              >
                {tabCount[activeTab]}
              </div>
            </div>

            {/* Tab content */}
            {activeTab === "inventory" && (
              <div className="flex flex-col gap-3">
                {products.length === 0 ? (
                  <EmptyState text="No products yet. Add your first item." />
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
            )}

            {activeTab === "sales" && <SalesLog sales={sales} />}

            {activeTab === "insights" && (
              <InsightsPanel products={products} sales={sales} />
            )}
          </div>
        </div>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Mono:wght@400;500&family=Syne:wght@400;700;800&display=swap');
        @keyframes pulse { 0%,100%{opacity:.7;transform:scale(1)} 50%{opacity:1;transform:scale(1.1)} }
        @keyframes blink { 0%,100%{opacity:1} 50%{opacity:.3} }
        @keyframes spin { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
        input::placeholder, textarea::placeholder { color: #6B6560; }
        select option { background: #181818; color: #F5F0EB; }
      `}</style>
    </main>
  );
}
