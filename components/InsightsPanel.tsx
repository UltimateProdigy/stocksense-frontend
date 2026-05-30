import { useState } from "react";
import axios from "axios";
import StyledButton from "./StyledButton";
import {
  panelStyle,
  dotStyle,
  panelTitleStyle,
  inputStyle,
  insightSectionLabel,
} from "../styles/shared";
import { Insight, Product, Sale } from "../types";

interface Props {
  products: Product[];
  sales: Sale[];
}

export default function InsightsPanel({ products, sales }: Props) {
  const [marketNotes, setMarketNotes] = useState("");
  const [insights, setInsights] = useState<Insight | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleGenerate = async () => {
    setLoading(true);
    setError("");
    setInsights(null);
    try {
      const res = await axios.post("http://localhost:5000/api/insights", {
        salesData: sales,
        inventory: products,
        marketNotes,
      });
      const raw = res.data;
      const parsed: Insight = typeof raw === "string" ? JSON.parse(raw) : raw;
      setInsights(parsed);
    } catch {
      setError("Failed to generate insights. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Market Notes */}
      <div style={panelStyle}>
        <div className="flex items-center gap-3 mb-5">
          <div
            style={{
              ...dotStyle,
              background: "#a855f7",
              boxShadow: "0 0 12px #a855f7",
            }}
          />
          <span style={panelTitleStyle}>MARKET NOTES</span>
        </div>

        <div className="flex flex-col gap-1.5 mb-4">
          <label
            style={{
              fontFamily: "'DM Mono', monospace",
              fontSize: 10,
              letterSpacing: 2.5,
              textTransform: "uppercase",
              color: "#6B6560",
            }}
          >
            Any market context the AI should know?
          </label>
          <textarea
            placeholder="e.g. Ramadan season coming up, fuel prices rising, Christmas demand expected..."
            value={marketNotes}
            onChange={(e) => setMarketNotes(e.target.value)}
            rows={4}
            style={
              {
                ...inputStyle,
                resize: "vertical",
                lineHeight: 1.6,
              } as React.CSSProperties
            }
            onFocus={(e) => {
              e.target.style.borderColor = "#a855f7";
              e.target.style.boxShadow = "0 0 0 3px rgba(168,85,247,0.12)";
            }}
            onBlur={(e) => {
              e.target.style.borderColor = "rgba(255,107,26,0.15)";
              e.target.style.boxShadow = "none";
            }}
          />
        </div>

        <StyledButton
          onClick={handleGenerate}
          loading={loading}
          loadingText="ANALYZING YOUR DATA..."
          color="#a855f7"
          hoverColor="#9333ea"
          glowColor="rgba(168,85,247,0.3)"
          textColor="#fff"
        >
          ✦ GENERATE AI INSIGHTS
        </StyledButton>
      </div>

      {/* Error */}
      {error && (
        <div
          style={{
            background: "rgba(239,68,68,0.1)",
            border: "1px solid rgba(239,68,68,0.2)",
            borderRadius: 2,
            padding: "16px 20px",
            fontFamily: "'DM Mono', monospace",
            fontSize: 12,
            color: "#f87171",
            letterSpacing: 1,
          }}
        >
          {error}
        </div>
      )}

      {/* Results */}
      {insights && (
        <div className="flex flex-col gap-4">
          {/* Trend Forecast */}
          <div
            style={{
              background: "#111111",
              border: "1px solid rgba(168,85,247,0.2)",
              borderLeft: "3px solid #a855f7",
              borderRadius: 2,
              padding: "24px",
            }}
          >
            <div style={insightSectionLabel("#a855f7")}>
              ✦ NEXT MONTH TREND FORECAST
            </div>
            <p
              style={{
                fontFamily: "'Syne', sans-serif",
                fontSize: 15,
                color: "#F5F0EB",
                lineHeight: 1.7,
                marginTop: 10,
              }}
            >
              {insights.nextMonthTrendForecast}
            </p>
          </div>

          {/* Critical Restock Alerts */}
          {insights.criticalRestockAlerts?.length > 0 && (
            <div
              style={{
                background: "#111111",
                border: "1px solid rgba(239,68,68,0.2)",
                borderLeft: "3px solid #f87171",
                borderRadius: 2,
                padding: "24px",
              }}
            >
              <div style={insightSectionLabel("#f87171")}>
                ⚠ CRITICAL RESTOCK ALERTS
              </div>
              <div className="flex flex-col gap-3 mt-4">
                {insights.criticalRestockAlerts.map((alert, i) => (
                  <div
                    key={i}
                    style={{
                      background: "rgba(239,68,68,0.06)",
                      border: "1px solid rgba(239,68,68,0.15)",
                      borderRadius: 2,
                      padding: "14px 16px",
                    }}
                  >
                    <div
                      style={{
                        fontFamily: "'Syne', sans-serif",
                        fontSize: 14,
                        fontWeight: 700,
                        color: "#f87171",
                        marginBottom: 4,
                      }}
                    >
                      {alert.itemName}
                    </div>
                    <div
                      style={{
                        fontFamily: "'DM Mono', monospace",
                        fontSize: 12,
                        color: "#9ca3af",
                        lineHeight: 1.6,
                      }}
                    >
                      {alert.reason}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Dead Stock Warnings */}
          {insights.deadStockWarning?.length > 0 && (
            <div
              style={{
                background: "#111111",
                border: "1px solid rgba(255,107,26,0.2)",
                borderLeft: "3px solid #FF6B1A",
                borderRadius: 2,
                padding: "24px",
              }}
            >
              <div style={insightSectionLabel("#FF6B1A")}>
                ◈ DEAD STOCK WARNINGS
              </div>
              <div className="flex flex-col gap-3 mt-4">
                {insights.deadStockWarning.map((item, i) => (
                  <div
                    key={i}
                    style={{
                      background: "rgba(255,107,26,0.06)",
                      border: "1px solid rgba(255,107,26,0.15)",
                      borderRadius: 2,
                      padding: "14px 16px",
                    }}
                  >
                    <div
                      style={{
                        fontFamily: "'Syne', sans-serif",
                        fontSize: 14,
                        fontWeight: 700,
                        color: "#FF8C42",
                        marginBottom: 4,
                      }}
                    >
                      {item.itemName}
                    </div>
                    <div
                      style={{
                        fontFamily: "'DM Mono', monospace",
                        fontSize: 12,
                        color: "#9ca3af",
                        lineHeight: 1.6,
                      }}
                    >
                      {item.actionAdvice}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* All healthy */}
          {insights.criticalRestockAlerts?.length === 0 &&
            insights.deadStockWarning?.length === 0 && (
              <div
                style={{
                  background: "rgba(74,222,128,0.06)",
                  border: "1px solid rgba(74,222,128,0.2)",
                  borderLeft: "3px solid #4ade80",
                  borderRadius: 2,
                  padding: "20px 24px",
                  fontFamily: "'DM Mono', monospace",
                  fontSize: 13,
                  color: "#4ade80",
                  letterSpacing: 1,
                }}
              >
                ✓ No critical alerts or dead stock detected. Your inventory
                looks healthy!
              </div>
            )}
        </div>
      )}
    </div>
  );
}
