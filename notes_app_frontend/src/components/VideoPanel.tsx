import React from "react";
import { theme } from "../theme";

export type VideoNote = {
  id: string;
  time: number; // seconds
  text: string;
};

// PUBLIC_INTERFACE
export const VideoPanel: React.FC<{
  src?: string;
  poster?: string;
  notes: VideoNote[];
  onSeek?: (time: number) => void;
  onAddNote?: (time: number) => void;
}> = ({ src, poster, notes, onSeek, onAddNote }) => {
  const videoRef = React.useRef<HTMLVideoElement | null>(null);
  const [current, setCurrent] = React.useState(0);

  const formatTime = (t: number) => {
    const mm = Math.floor(t / 60)
      .toString()
      .padStart(2, "0");
    const ss = Math.floor(t % 60)
      .toString()
      .padStart(2, "0");
    return `${mm}:${ss}`;
    };

  return (
    <div
      style={{
        height: "100%",
        display: "grid",
        gridTemplateRows: "auto 1fr auto",
        gap: 10,
        padding: 16,
      }}
    >
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ fontWeight: 700, color: theme.colors.text }}>Video</div>
        <div style={{ color: theme.colors.mutedText, fontSize: 12 }}>
          {src ? "Loaded" : "No video selected"}
        </div>
      </div>

      <div
        style={{
          position: "relative",
          borderRadius: theme.radii.lg,
          overflow: "hidden",
          border: `1px solid ${theme.colors.border}`,
          background: theme.colors.surface,
          boxShadow: theme.shadows.md,
          display: "grid",
          gridTemplateRows: "auto auto 1fr",
        }}
      >
        <video
          ref={videoRef}
          src={src}
          poster={poster}
          controls
          onTimeUpdate={() => setCurrent(videoRef.current?.currentTime ?? 0)}
          style={{
            width: "100%",
            height: 220,
            objectFit: "cover",
            background: "#000",
          }}
        />
        <div
          style={{
            padding: "8px 12px",
            borderTop: `1px solid ${theme.colors.border}`,
            background: "linear-gradient(180deg, rgba(37,99,235,0.06), rgba(255,255,255,0.8))",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div style={{ color: theme.colors.text, fontWeight: 600 }}>
            Current Time: {formatTime(current)}
          </div>
          <button
            onClick={() => {
              const t = Math.floor(videoRef.current?.currentTime ?? 0);
              onAddNote?.(t);
            }}
            style={{
              padding: "8px 12px",
              borderRadius: theme.radii.full,
              border: `1px solid ${theme.colors.border}`,
              background: theme.colors.surface,
              color: theme.colors.text,
              boxShadow: theme.shadows.sm,
              fontWeight: 700,
            }}
          >
            + Add Timecode Note
          </button>
        </div>

        <div style={{ overflowY: "auto", padding: 12, display: "grid", gap: 8 }}>
          {notes.length === 0 ? (
            <div style={{ color: theme.colors.mutedText, fontSize: 13 }}>
              No timecode notes yet. Use the button above to add one.
            </div>
          ) : (
            notes.map((n) => (
              <div
                key={n.id}
                onClick={() => {
                  const el = videoRef.current;
                  if (!el) return;
                  el.currentTime = n.time;
                  onSeek?.(n.time);
                  el.play().catch(() => undefined);
                }}
                style={{
                  display: "grid",
                  gridTemplateColumns: "auto 1fr",
                  gap: 10,
                  padding: "8px 10px",
                  borderRadius: theme.radii.md,
                  border: `1px solid ${theme.colors.border}`,
                  background: "white",
                  cursor: "pointer",
                  boxShadow: theme.shadows.sm,
                  transition: `transform ${theme.transitions.fast}, box-shadow ${theme.transitions.normal}, background ${theme.transitions.fast}`,
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-1px)";
                  e.currentTarget.style.boxShadow = theme.shadows.md;
                  e.currentTarget.style.background = "rgba(245,158,11,0.06)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = theme.shadows.sm;
                  e.currentTarget.style.background = "white";
                }}
              >
                <div
                  style={{
                    fontWeight: 800,
                    color: theme.colors.secondary,
                    fontVariantNumeric: "tabular-nums",
                    minWidth: 54,
                  }}
                >
                  {formatTime(n.time)}
                </div>
                <div style={{ color: theme.colors.text }}>{n.text}</div>
              </div>
            ))
          )}
        </div>
      </div>
      <div style={{ color: theme.colors.mutedText, fontSize: 12 }}>
        Tip: Attach timecodes to your notes to quickly jump to key moments.
      </div>
    </div>
  );
};
