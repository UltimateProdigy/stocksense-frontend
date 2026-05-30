import StatCol from "./StatCol";
import EmptyState from "./EmptyState";
import { Sale } from "../types";

interface Props {
  sales: Sale[];
}

export default function SalesLog({ sales }: Props) {
  if (sales.length === 0) return <EmptyState text="No sales recorded yet." />;

  return (
    <div className="flex flex-col gap-3">
      {[...sales].reverse().map((sale) => (
        <div
          key={sale._id}
          style={{
            background: "#111111",
            border: "1px solid rgba(255,107,26,0.12)",
            borderLeft: "3px solid #4ade80",
            borderRadius: 2,
            padding: "18px 24px",
            display: "grid",
            gridTemplateColumns: "1fr auto auto auto",
            alignItems: "center",
            gap: 16,
          }}
        >
          <div>
            <div
              style={{
                fontFamily: "'Syne', sans-serif",
                fontSize: 15,
                fontWeight: 700,
                color: "#F5F0EB",
              }}
            >
              {sale.productName}
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
              {new Date(sale.date).toLocaleDateString("en-NG", {
                day: "numeric",
                month: "short",
                year: "numeric",
              })}
            </div>
          </div>
          <StatCol label="UNITS SOLD" value={sale.unitsSold} />
          <StatCol
            label="SELL PRICE"
            value={`₦${Number(sale.sellingPrice).toLocaleString()}`}
            orange
          />
          <StatCol
            label="REVENUE"
            value={`₦${(sale.unitsSold * sale.sellingPrice).toLocaleString()}`}
            orange
          />
        </div>
      ))}
    </div>
  );
}
