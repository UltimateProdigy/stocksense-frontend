interface Props {
  label: string;
  value: string | number;
  orange?: boolean;
}

export default function StatCol({ label, value, orange }: Props) {
  return (
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
        {label}
      </div>
      <div
        style={{
          fontFamily: "'Bebas Neue', sans-serif",
          fontSize: 22,
          letterSpacing: 1,
          color: orange ? "#FF6B1A" : "#F5F0EB",
        }}
      >
        {value}
      </div>
    </div>
  );
}