import { useState } from "react";
import axios from "axios";
import StyledInput from "./StyledInput";
import StyledButton from "./StyledButton";
import {
  panelStyle,
  dotStyle,
  panelTitleStyle,
  inputStyle,
} from "../styles/shared";
import { Product } from "../types";

interface Props {
  products: Product[];
  onSaleRecorded: () => void;
}

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export default function RecordSaleForm({ products, onSaleRecorded }: Props) {
  const [selectedProduct, setSelectedProduct] = useState("");
  const [unitsSold, setUnitsSold] = useState("");
  const [sellingPrice, setSellingPrice] = useState("");
  const [saleDate, setSaleDate] = useState(
    new Date().toISOString().split("T")[0],
  );

  const handleSubmit = async () => {
    if (!selectedProduct || !unitsSold || !sellingPrice || !saleDate) return;
    const product = products.find((p) => p._id === selectedProduct);
    if (!product) return;

    await axios.post(`${API_URL}/api/sales`, {
      productId: selectedProduct,
      productName: product.name,
      unitsSold: Number(unitsSold),
      sellingPrice: Number(sellingPrice),
      date: saleDate,
    });

    setSelectedProduct("");
    setUnitsSold("");
    setSellingPrice("");
    setSaleDate(new Date().toISOString().split("T")[0]);
    onSaleRecorded();
  };

  return (
    <div style={panelStyle}>
      <div className="flex items-center gap-3 mb-7">
        <div
          style={{
            ...dotStyle,
            background: "#4ade80",
            boxShadow: "0 0 12px #4ade80",
          }}
        />
        <span style={panelTitleStyle}>RECORD SALE</span>
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
          Product
        </label>
        <select
          value={selectedProduct}
          onChange={(e) => setSelectedProduct(e.target.value)}
          style={{ ...inputStyle, appearance: "none" } as React.CSSProperties}
          onFocus={(e) => {
            e.target.style.borderColor = "#FF6B1A";
            e.target.style.boxShadow = "0 0 0 3px rgba(255,107,26,0.12)";
          }}
          onBlur={(e) => {
            e.target.style.borderColor = "rgba(255,107,26,0.15)";
            e.target.style.boxShadow = "none";
          }}
        >
          <option value="">Select a product...</option>
          {products.map((p) => (
            <option key={p._id} value={p._id}>
              {p.name} — {p.currentStock} units left
            </option>
          ))}
        </select>
      </div>

      <StyledInput
        label="Units Sold"
        type="number"
        placeholder="e.g. 10"
        value={unitsSold}
        onChange={setUnitsSold}
      />
      <StyledInput
        label="Selling Price (₦)"
        type="number"
        placeholder="e.g. 55000"
        value={sellingPrice}
        onChange={setSellingPrice}
      />

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
          Date of Sale
        </label>
        <input
          type="date"
          value={saleDate}
          onChange={(e) => setSaleDate(e.target.value)}
          style={{ ...inputStyle, colorScheme: "dark" } as React.CSSProperties}
          onFocus={(e) => {
            e.target.style.borderColor = "#FF6B1A";
            e.target.style.boxShadow = "0 0 0 3px rgba(255,107,26,0.12)";
          }}
          onBlur={(e) => {
            e.target.style.borderColor = "rgba(255,107,26,0.15)";
            e.target.style.boxShadow = "none";
          }}
        />
      </div>

      <StyledButton
        onClick={handleSubmit}
        color="#4ade80"
        hoverColor="#86efac"
        glowColor="rgba(74,222,128,0.3)"
        textColor="#0a0a0a"
      >
        RECORD SALE
      </StyledButton>
    </div>
  );
}
