export const theme = {
  name: "Ocean Professional",
  colors: {
    primary: "#2563EB", // Blue 600
    secondary: "#F59E0B", // Amber 500
    success: "#F59E0B",
    error: "#EF4444",
    background: "#f9fafb", // Gray-50
    surface: "#ffffff",
    text: "#111827",
    mutedText: "#6B7280",
    border: "#E5E7EB",
  },
  gradients: {
    subtle: "linear-gradient(135deg, rgba(59,130,246,0.08) 0%, rgba(249,250,251,1) 100%)",
    header: "linear-gradient(180deg, rgba(37,99,235,0.08) 0%, rgba(255,255,255,0.5) 100%)",
  },
  shadows: {
    sm: "0 1px 2px rgba(0,0,0,0.06)",
    md: "0 4px 12px rgba(0,0,0,0.08)",
    lg: "0 12px 24px rgba(0,0,0,0.1)",
    insetTop: "inset 0 1px 0 rgba(255,255,255,0.6)",
  },
  radii: {
    sm: 8,
    md: 12,
    lg: 16,
    xl: 20,
    full: 999,
  },
  transitions: {
    fast: "150ms ease",
    normal: "220ms ease",
    slow: "350ms ease",
  },
};

export type Theme = typeof theme;
