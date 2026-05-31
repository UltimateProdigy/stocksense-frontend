interface Props {
  name: string;
  stock: number;
  costPrice: number;
}

export default function InventoryCard({ name, stock, costPrice }: Props) {
  const getBadge = (stock: number) => {
    if (stock <= 5)
      return {
        label: "CRITICAL",
        bg: "rgba(239,68,68,0.1)",
        color: "#f87171",
        border: "rgba(239,68,68,0.2)",
      };
    if (stock <= 15)
      return {
        label: "LOW STOCK",
        bg: "rgba(255,107,26,0.12)",
        color: "#FF8C42",
        border: "rgba(255,107,26,0.2)",
      };
    return {
      label: "IN STOCK",
      bg: "rgba(34,197,94,0.1)",
      color: "#4ade80",
      border: "rgba(34,197,94,0.2)",
    };
  };

  const badge = getBadge(stock);

  return (
    <div
      style={{
        background: "#111111",
        border: "1px solid rgba(255,107,26,0.12)",
        borderLeft: "3px solid #FF6B1A",
        borderRadius: 2,
        padding: "20px 24px",
        display: "grid",
        gridTemplateColumns: "1fr auto auto auto",
        alignItems: "center",
        gap: 16,
        transition: "border-color 0.2s, background 0.2s, transform 0.2s",
        cursor: "default",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = "#FF6B1A";
        e.currentTarget.style.background = "#161616";
        e.currentTarget.style.transform = "translateX(4px)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = "rgba(255,107,26,0.12)";
        e.currentTarget.style.background = "#111111";
        e.currentTarget.style.transform = "translateX(0)";
      }}
    >
      {/* Name & SKU */}
      <div>
        <div
          style={{
            fontFamily: "'Syne', sans-serif",
            fontSize: 15,
            fontWeight: 700,
            color: "#F5F0EB",
            letterSpacing: 0.5,
          }}
        >
          {name}
        </div>
        <div
          style={{
            fontFamily: "'DM Mono', monospace",
            fontSize: 10,
            color: "#6B6560",
            textTransform: "uppercase",
            letterSpacing: 1.5,
            marginTop: 3,
          }}
        >
          Cost Price
        </div>
      </div>
      <div style={{ textAlign: "right" }}>
        <div
          style={{
            fontFamily: "'DM Mono', monospace",
            fontSize: 9,
            color: "#6B6560",
            letterSpacing: 2,
            textTransform: "uppercase",
          }}
        >
          PRICE
        </div>
        <div
          style={{
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: 22,
            letterSpacing: 1,
            color: "#FF6B1A",
          }}
        >
          ₦{costPrice}
        </div>
      </div>
      <div style={{ textAlign: "right" }}>
        <div
          style={{
            fontFamily: "'DM Mono', monospace",
            fontSize: 9,
            color: "#6B6560",
            letterSpacing: 2,
            textTransform: "uppercase",
          }}
        >
          STOCK
        </div>
        <div
          style={{
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: 22,
            letterSpacing: 1,
            color: "#F5F0EB",
          }}
        >
          {stock}
        </div>
      </div>
      <div
        style={{
          fontFamily: "'DM Mono', monospace",
          fontSize: 9,
          letterSpacing: 1.5,
          textTransform: "uppercase",
          padding: "4px 10px",
          borderRadius: 2,
          background: badge.bg,
          color: badge.color,
          border: `1px solid ${badge.border}`,
          whiteSpace: "nowrap",
        }}
      >
        {badge.label}
      </div>
    </div>
  );
}
