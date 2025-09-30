export default function UndoButton({ handleUndo, lastAction, loading }) {
  const disabled = loading || !localStorage.getItem("lastScoreUpdate");
  return (
    <button
      onClick={handleUndo}
      disabled={disabled}
      style={{
        background: disabled ? "#e0e7ef" : "#1976d2",
        color: disabled ? "#888" : "#fff",
        border: "none",
        borderRadius: "6px",
        padding: "8px 18px",
        fontWeight: "bold",
        fontSize: "15px",
        cursor: disabled ? "not-allowed" : "pointer",
        boxShadow: disabled ? "none" : "0 2px 8px 0 rgba(25, 118, 210, 0.08)",
        transition: "background 0.2s, color 0.2s",
        marginRight: "10px",
      }}
    >
      {loading ? "Undoing..." : "Undo"}
      {!loading && lastAction ? (
        <span style={{ marginLeft: 8, fontWeight: 400, fontSize: "14px" }}>
          ({lastAction.name} {lastAction.type}+{lastAction.points})
        </span>
      ) : null}
    </button>
  );
}
