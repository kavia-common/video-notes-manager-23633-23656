import React from "react";
import { theme } from "../theme";

export type NoteListItem = {
  id: string;
  title: string;
  updatedAt: string;
  preview?: string;
  pinned?: boolean;
};

// PUBLIC_INTERFACE
export const Sidebar: React.FC<{
  notes: NoteListItem[];
  selectedId?: string;
  onSelect: (id: string) => void;
  onCreate?: () => void;
  onPinToggle?: (id: string) => void;
}> = ({ notes, selectedId, onSelect, onCreate, onPinToggle }) => {
  const [collapsed, setCollapsed] = React.useState(false);

  return (
    <aside
      style={{
        height: "100%",
        width: collapsed ? 72 : 320,
        transition: `width ${theme.transitions.normal}`,
        borderRight: `1px solid ${theme.colors.border}`,
        background: theme.gradients.subtle,
        boxShadow: theme.shadows.insetTop,
        overflow: "hidden",
        borderBottomLeftRadius: theme.radii.lg,
      }}
    >
      <div
        style={{
          padding: 12,
          display: "flex",
          alignItems: "center",
          justifyContent: collapsed ? "center" : "space-between",
          borderBottom: `1px solid ${theme.colors.border}`,
          background: "rgba(255,255,255,0.6)",
          backdropFilter: "saturate(120%) blur(4px)",
        }}
      >
        <button
          aria-label="Toggle sidebar"
          onClick={() => setCollapsed((v) => !v)}
          style={{
            border: "none",
            background: "transparent",
            cursor: "pointer",
            fontSize: 18,
            padding: 6,
            borderRadius: theme.radii.full,
            transition: `background ${theme.transitions.fast}`,
          }}
          onMouseEnter={(e) =>
            (e.currentTarget.style.background = "rgba(37,99,235,0.08)")
          }
          onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
        >
          {collapsed ? "»" : "«"}
        </button>
        {!collapsed && (
          <button
            onClick={onCreate}
            style={{
              border: `1px solid ${theme.colors.border}`,
              background: theme.colors.surface,
              color: theme.colors.text,
              padding: "8px 10px",
              borderRadius: theme.radii.full,
              fontWeight: 600,
              boxShadow: theme.shadows.sm,
            }}
          >
            + New Note
          </button>
        )}
      </div>

      {!collapsed && (
        <div style={{ padding: 12, display: "grid", gap: 10 }}>
          <div style={{ color: theme.colors.mutedText, fontSize: 12, fontWeight: 700 }}>
            NAVIGATION
          </div>
          <div style={{ display: "grid", gap: 6 }}>
            {[
              { label: "All Notes", icon: "🗒️" },
              { label: "Pinned", icon: "📌" },
              { label: "With Video", icon: "🎬" },
              { label: "Trash", icon: "🗑️" },
            ].map((item) => (
              <div
                key={item.label}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  padding: "8px 10px",
                  borderRadius: theme.radii.md,
                  cursor: "pointer",
                  transition: `background ${theme.transitions.fast}`,
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.background = "rgba(37,99,235,0.06)")
                }
                onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
              >
                <span>{item.icon}</span>
                <span style={{ color: theme.colors.text, fontWeight: 600 }}>
                  {item.label}
                </span>
              </div>
            ))}
          </div>

          <div
            style={{
              marginTop: 8,
              color: theme.colors.mutedText,
              fontSize: 12,
              fontWeight: 700,
            }}
          >
            NOTES
          </div>
          <div
            style={{
              display: "grid",
              gap: 8,
              paddingRight: 6,
              overflowY: "auto",
              maxHeight: "calc(100vh - 280px)",
            }}
          >
            {notes.map((n) => {
              const selected = n.id === selectedId;
              return (
                <div
                  key={n.id}
                  onClick={() => onSelect(n.id)}
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr auto",
                    gap: 6,
                    padding: "10px 12px",
                    borderRadius: theme.radii.md,
                    cursor: "pointer",
                    background: selected ? "rgba(37,99,235,0.08)" : theme.colors.surface,
                    border: `1px solid ${
                      selected ? theme.colors.primary : theme.colors.border
                    }`,
                    boxShadow: selected ? theme.shadows.md : theme.shadows.sm,
                    transition: `box-shadow ${theme.transitions.normal}, border-color ${theme.transitions.normal}, transform ${theme.transitions.fast}`,
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.boxShadow = theme.shadows.md;
                    e.currentTarget.style.transform = "translateY(-1px)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.boxShadow = selected
                      ? theme.shadows.md
                      : theme.shadows.sm;
                    e.currentTarget.style.transform = "translateY(0)";
                  }}
                >
                  <div style={{ minWidth: 0 }}>
                    <div
                      style={{
                        fontWeight: 700,
                        color: theme.colors.text,
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                      }}
                    >
                      {n.title}
                    </div>
                    <div
                      style={{
                        fontSize: 12,
                        color: theme.colors.mutedText,
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                      }}
                    >
                      {n.preview ?? "No preview available"}
                    </div>
                    <div style={{ fontSize: 11, color: theme.colors.mutedText }}>
                      Updated {n.updatedAt}
                    </div>
                  </div>
                  <button
                    aria-label="Toggle pin"
                    onClick={(e) => {
                      e.stopPropagation();
                      onPinToggle?.(n.id);
                    }}
                    style={{
                      alignSelf: "start",
                      border: "none",
                      background: "transparent",
                      cursor: "pointer",
                      fontSize: 16,
                      color: n.pinned ? theme.colors.secondary : theme.colors.mutedText,
                      transition: `transform ${theme.transitions.fast}`,
                    }}
                    onMouseDown={(e) => (e.currentTarget.style.transform = "scale(0.9)")}
                    onMouseUp={(e) => (e.currentTarget.style.transform = "scale(1)")}
                  >
                    📌
                  </button>
                </div>
              );
            })}
          </div>

          <div style={{ marginTop: 8, color: theme.colors.mutedText, fontSize: 12, fontWeight: 700 }}>
            TAGS
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8, paddingBottom: 16 }}>
            {["Work", "Ideas", "Research", "Personal", "Video"].map((t) => (
              <div
                key={t}
                style={{
                  padding: "6px 10px",
                  borderRadius: theme.radii.full,
                  border: `1px solid ${theme.colors.border}`,
                  background: "white",
                  color: theme.colors.text,
                  boxShadow: theme.shadows.sm,
                }}
              >
                #{t}
              </div>
            ))}
          </div>
        </div>
      )}
    </aside>
  );
};
