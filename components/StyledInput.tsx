import { inputStyle } from "../styles/shared";

interface Props {
  label: string;
  type?: string;
  placeholder?: string;
  value: string;
  onChange: (val: string) => void;
  focusColor?: string;
}

export default function StyledInput({
  label,
  type = "text",
  placeholder,
  value,
  onChange,
  focusColor = "#FF6B1A",
}: Props) {
  return (
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
        {label}
      </label>
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        style={inputStyle}
        onFocus={(e) => {
          e.target.style.borderColor = focusColor;
          e.target.style.boxShadow = `0 0 0 3px ${focusColor}1f`;
        }}
        onBlur={(e) => {
          e.target.style.borderColor = "rgba(255,107,26,0.15)";
          e.target.style.boxShadow = "none";
        }}
      />
    </div>
  );
}