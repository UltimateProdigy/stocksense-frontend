interface Props {
  text: string;
}

export default function EmptyState({ text }: Props) {
  return (
    <div
      className="flex flex-col items-center justify-center gap-3 py-16"
      style={{ border: "1px dashed rgba(255,107,26,0.2)", borderRadius: 2 }}
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
        {text}
      </span>
    </div>
  );
}