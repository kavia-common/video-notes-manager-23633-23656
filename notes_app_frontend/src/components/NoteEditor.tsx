import React from "react";
import { theme } from "../theme";

export type NoteModel = {
  id: string;
  title: string;
  content: string;
  updatedAt: string;
};

// PUBLIC_INTERFACE
export const NoteEditor: React.FC<{
  note: NoteModel | null;
  onChange: (note: NoteModel) => void;
  onSave?: (note: NoteModel) => void;
  onDelete?: (id: string) => void;
}> = ({ note, onChange, onSave, onDelete }) => {
  if (!note) {
    return (
      <div
        style={{
          height: "100%",
          display: "grid",
          placeItems: "center",
          color: theme.colors.mutedText,
        }}
      >
        Select or create a note to get started.
      </div>
    );
  }

  const update = (patch: Partial<NoteModel>) => onChange({ ...note, ...patch });

  return (
    <div
      style={{
        display: "grid",
        gridTemplateRows: "auto 1fr auto",
        gap: 10,
        height: "100%",
        padding: 16,
      }}
    >
      <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
        <input
          value={note.title}
          onChange={(e) => update({ title: e.target.value })}
          placeholder="Note title"
          style={{
            flex: 1,
            padding: "12px 14px",
            borderRadius: theme.radii.md,
            border: `1px solid ${theme.colors.border}`,
            fontSize: 18,
            fontWeight: 700,
            background: theme.colors.surface,
            color: theme.colors.text,
            boxShadow: theme.shadows.sm,
          }}
        />
        <button
          aria-label="Save note"
          onClick={() => onSave?.(note)}
          style={{
            padding: "10px 14px",
            borderRadius: theme.radii.full,
            background: theme.colors.primary,
            color: "white",
            border: "none",
            boxShadow: theme.shadows.md,
            transition: `box-shadow ${theme.transitions.normal}, transform ${theme.transitions.fast}`,
            fontWeight: 700,
          }}
          onMouseEnter={(e) => (e.currentTarget.style.boxShadow = theme.shadows.lg)}
          onMouseLeave={(e) => (e.currentTarget.style.boxShadow = theme.shadows.md)}
          onMouseDown={(e) => (e.currentTarget.style.transform = "scale(0.98)")}
          onMouseUp={(e) => (e.currentTarget.style.transform = "scale(1)")}
        >
          Save
        </button>
        <button
          aria-label="Delete note"
          onClick={() => onDelete?.(note.id)}
          style={{
            padding: "10px 14px",
            borderRadius: theme.radii.full,
            background: "white",
            color: theme.colors.error,
            border: `1px solid ${theme.colors.error}33`,
            boxShadow: theme.shadows.sm,
            transition: `background ${theme.transitions.fast}`,
            fontWeight: 700,
          }}
          onMouseEnter={(e) => (e.currentTarget.style.background = "#FEF2F2")}
          onMouseLeave={(e) => (e.currentTarget.style.background = "white")}
        >
          Delete
        </button>
      </div>

      <div
        style={{
          position: "relative",
          borderRadius: theme.radii.lg,
          border: `1px solid ${theme.colors.border}`,
          background: "linear-gradient(180deg, #FFFFFF, #FBFBFD)",
          overflow: "hidden",
          boxShadow: theme.shadows.md,
        }}
      >
        <textarea
          value={note.content}
          onChange={(e) => update({ content: e.target.value })}
          placeholder="Write your note here... Use #tags, bullets, and attach timecodes to video snippets."
          style={{
            width: "100%",
            height: "100%",
            padding: 16,
            border: "none",
            outline: "none",
            resize: "none",
            fontSize: 15,
            lineHeight: 1.6,
            color: theme.colors.text,
            background: "transparent",
          }}
        />
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          color: theme.colors.mutedText,
          fontSize: 12,
          marginTop: 2,
        }}
      >
        <span>Last updated: {note.updatedAt}</span>
        <div style={{ display: "flex", gap: 8 }}>
          {["Bold", "Italic", "Bullet", "Quote", "Code"].map((a) => (
            <button
              key={a}
              style={{
                padding: "6px 10px",
                borderRadius: theme.radii.full,
                border: `1px solid ${theme.colors.border}`,
                background: "white",
                color: theme.colors.text,
                boxShadow: theme.shadows.sm,
              }}
            >
              {a}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
