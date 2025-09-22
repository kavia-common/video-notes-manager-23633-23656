import React from "react";
import { theme } from "../theme";

// PUBLIC_INTERFACE
export const Header: React.FC<{
  userName?: string;
  onNewNote?: () => void;
  onSearch?: (query: string) => void;
}> = ({ userName = "Guest", onNewNote, onSearch }) => {
  const [menuOpen, setMenuOpen] = React.useState(false);
  const [query, setQuery] = React.useState("");

  return (
    <header
      style={{
        position: "relative",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "14px 18px",
        background: theme.gradients.header,
        backdropFilter: "saturate(140%) blur(6px)",
        borderBottom: `1px solid ${theme.colors.border}`,
        boxShadow: theme.shadows.sm,
        borderTopLeftRadius: theme.radii.lg,
        borderTopRightRadius: theme.radii.lg,
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <div
          aria-label="App Logo"
          style={{
            width: 36,
            height: 36,
            borderRadius: theme.radii.full,
            background:
              "radial-gradient(circle at 30% 30%, rgba(37,99,235,0.3), rgba(37,99,235,0.05) 60%), #E8EEF9",
            border: `1px solid ${theme.colors.border}`,
            boxShadow: theme.shadows.sm,
          }}
        />
        <div>
          <div
            style={{
              fontSize: 16,
              fontWeight: 700,
              color: theme.colors.text,
              letterSpacing: 0.2,
            }}
          >
            Ocean Notes
          </div>
          <div style={{ fontSize: 12, color: theme.colors.mutedText }}>
            Create • Manage • Visualize
          </div>
        </div>
      </div>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 12,
          minWidth: 360,
          flex: 1,
          justifyContent: "center",
          padding: "0 16px",
        }}
      >
        <div
          style={{
            position: "relative",
            width: "100%",
            maxWidth: 520,
          }}
        >
          <input
            aria-label="Search notes"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              onSearch?.(e.target.value);
            }}
            placeholder="Search notes, tags, or videos..."
            style={{
              width: "100%",
              padding: "10px 36px",
              borderRadius: theme.radii.full,
              border: `1px solid ${theme.colors.border}`,
              background:
                "linear-gradient(180deg, rgba(255,255,255,0.9), rgba(255,255,255,0.7))",
              outline: "none",
              color: theme.colors.text,
              boxShadow: theme.shadows.sm,
              transition: `box-shadow ${theme.transitions.normal}, border-color ${theme.transitions.normal}`,
            }}
            onFocus={(e) => {
              e.currentTarget.style.boxShadow = theme.shadows.md;
              e.currentTarget.style.borderColor = theme.colors.primary;
            }}
            onBlur={(e) => {
              e.currentTarget.style.boxShadow = theme.shadows.sm;
              e.currentTarget.style.borderColor = theme.colors.border;
            }}
          />
          <span
            style={{
              position: "absolute",
              left: 12,
              top: 8,
              color: theme.colors.mutedText,
              fontSize: 18,
            }}
          >
            🔎
          </span>
        </div>
        <button
          aria-label="Create new note"
          onClick={onNewNote}
          style={{
            padding: "10px 14px",
            borderRadius: theme.radii.full,
            background: theme.colors.primary,
            color: "white",
            border: "none",
            boxShadow: theme.shadows.md,
            transition: `transform ${theme.transitions.fast}, box-shadow ${theme.transitions.normal}`,
            display: "flex",
            alignItems: "center",
            gap: 8,
          }}
          onMouseDown={(e) => (e.currentTarget.style.transform = "scale(0.98)")}
          onMouseUp={(e) => (e.currentTarget.style.transform = "scale(1)")}
          onMouseEnter={(e) => (e.currentTarget.style.boxShadow = theme.shadows.lg)}
          onMouseLeave={(e) => (e.currentTarget.style.boxShadow = theme.shadows.md)}
        >
          <span>＋</span>
          <span style={{ fontWeight: 600 }}>New</span>
        </button>
      </div>

      <div style={{ position: "relative" }}>
        <button
          aria-haspopup="menu"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((v) => !v)}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            background: theme.colors.surface,
            border: `1px solid ${theme.colors.border}`,
            borderRadius: theme.radii.full,
            padding: "6px 10px 6px 6px",
            boxShadow: theme.shadows.sm,
            transition: `box-shadow ${theme.transitions.normal}`,
          }}
          onMouseEnter={(e) => (e.currentTarget.style.boxShadow = theme.shadows.md)}
          onMouseLeave={(e) => (e.currentTarget.style.boxShadow = theme.shadows.sm)}
        >
          <div
            aria-label="User avatar"
            style={{
              width: 28,
              height: 28,
              borderRadius: theme.radii.full,
              background:
                "radial-gradient(circle at 60% 30%, rgba(245,158,11,0.5), rgba(255,255,255,0.2)), #FFF5E6",
              border: `1px solid ${theme.colors.border}`,
            }}
          />
          <span style={{ fontWeight: 600, color: theme.colors.text }}>{userName}</span>
          <span style={{ color: theme.colors.mutedText }}>▾</span>
        </button>
        {menuOpen ? (
          <div
            role="menu"
            style={{
              position: "absolute",
              top: "calc(100% + 8px)",
              right: 0,
              background: theme.colors.surface,
              border: `1px solid ${theme.colors.border}`,
              borderRadius: theme.radii.md,
              boxShadow: theme.shadows.lg,
              minWidth: 200,
              overflow: "hidden",
            }}
          >
            {[
              { label: "Profile", icon: "👤" },
              { label: "Settings", icon: "⚙️" },
              { label: "Sign out", icon: "↗" },
            ].map((i) => (
              <div
                key={i.label}
                role="menuitem"
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  padding: "10px 12px",
                  cursor: "pointer",
                  color: theme.colors.text,
                  transition: `background ${theme.transitions.fast}`,
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.background = "rgba(37,99,235,0.06)")
                }
                onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
              >
                <span>{i.icon}</span>
                <span>{i.label}</span>
              </div>
            ))}
          </div>
        ) : null}
      </div>
    </header>
  );
};
