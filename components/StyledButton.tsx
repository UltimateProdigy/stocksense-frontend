interface Props {
  onClick: () => void;
  disabled?: boolean;
  loading?: boolean;
  loadingText?: string;
  color?: string;
  hoverColor?: string;
  glowColor?: string;
  textColor?: string;
  children: React.ReactNode;
}

export default function StyledButton({
  onClick,
  disabled = false,
  loading = false,
  loadingText = "LOADING...",
  color = "#FF6B1A",
  hoverColor = "#FF8C42",
  glowColor = "rgba(255,107,26,0.3)",
  textColor = "#0a0a0a",
  children,
}: Props) {
  return (
    <button
      onClick={onClick}
      disabled={disabled || loading}
      style={{
        width: "100%",
        marginTop: 8,
        background: loading ? "rgba(0,0,0,0.3)" : color,
        color: loading ? color : textColor,
        fontFamily: "'Bebas Neue', sans-serif",
        fontSize: 20,
        letterSpacing: 3,
        padding: "16px",
        border: loading ? `1px solid ${color}` : "none",
        borderRadius: 2,
        cursor: loading || disabled ? "not-allowed" : "pointer",
        transition: "background 0.2s, transform 0.15s, box-shadow 0.2s",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 10,
      }}
      onMouseEnter={(e) => {
        if (loading || disabled) return;
        e.currentTarget.style.background = hoverColor;
        e.currentTarget.style.boxShadow = `0 0 32px ${glowColor}`;
        e.currentTarget.style.transform = "translateY(-1px)";
      }}
      onMouseLeave={(e) => {
        if (loading || disabled) return;
        e.currentTarget.style.background = color;
        e.currentTarget.style.boxShadow = "none";
        e.currentTarget.style.transform = "translateY(0)";
      }}
    >
      {loading ? (
        <>
          <span
            style={{
              animation: "spin 1s linear infinite",
              display: "inline-block",
            }}
          >
            ⟳
          </span>
          {loadingText}
        </>
      ) : (
        children
      )}
    </button>
  );
}
