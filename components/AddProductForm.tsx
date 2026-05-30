import { useState } from "react";
import axios from "axios";
import StyledInput from "./StyledInput";
import StyledButton from "./StyledButton";
import { panelStyle, dotStyle, panelTitleStyle } from "../styles/shared";

interface Props {
  onProductAdded: () => void;
}

export default function AddProductForm({ onProductAdded }: Props) {
  const [name, setName] = useState("");
  const [stock, setStock] = useState("");
  const [price, setPrice] = useState("");

  const handleSubmit = async () => {
    if (!name || !stock || !price) return;
    await axios.post("http://localhost:5000/api/products", {
      name,
      currentStock: Number(stock),
      costPrice: Number(price),
    });
    setName("");
    setStock("");
    setPrice("");
    onProductAdded();
  };

  return (
    <div style={panelStyle}>
      <div className="flex items-center gap-3 mb-7">
        <div style={{ ...dotStyle, background: "#FF6B1A", boxShadow: "0 0 12px #FF6B1A" }} />
        <span style={panelTitleStyle}>ADD PRODUCT</span>
      </div>

      <StyledInput label="Product Name" placeholder="e.g. Bag of Rice" value={name} onChange={setName} />
      <StyledInput label="Current Stock (units)" type="number" placeholder="e.g. 150" value={stock} onChange={setStock} />
      <StyledInput label="Cost Price (₦)" type="number" placeholder="e.g. 49000" value={price} onChange={setPrice} />

      <StyledButton onClick={handleSubmit}>SAVE PRODUCT</StyledButton>
    </div>
  );
}