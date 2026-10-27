import React, { createContext, useContext, useState, ReactNode } from "react";

export type Theme = "light" | "dark";

export interface ThemeColors {
  background: string;
  card: string;
  text: string;
  textSecondary: string;
  border: string;
  primary: string;
  primaryText: string;
  headerBackground: string;
  headerText: string;
  drawerBackground: string;
  drawerActiveBackground: string;
  drawerActiveTint: string;
  drawerInactiveTint: string;
  playerX: string;
  playerO: string;
  currentMoveBackground: string;
  winningSquareBackground: string;
  winningSquareText: string;
  statusBarStyle: "light" | "dark";
}

export const lightColors: ThemeColors = {
  background: "#f3f4f6",
  card: "#ffffff",
  text: "#111827",
  textSecondary: "#4b5563",
  border: "#d1d5db",
  primary: "#2563eb",
  primaryText: "#ffffff",
  headerBackground: "#ffffff",
  headerText: "#111827",
  drawerBackground: "#ffffff",
  drawerActiveBackground: "#e0e7ff",
  drawerActiveTint: "#2563eb",
  drawerInactiveTint: "#4b5563",
  playerX: "#2563eb",
  playerO: "#dc2626",
  currentMoveBackground: "#e5e7eb",
  winningSquareBackground: "#2563eb",
  winningSquareText: "#ffffff",
  statusBarStyle: "dark",
};

export const darkColors: ThemeColors = {
  background: "#111827",
  card: "#1f2937",
  text: "#f9fafb",
  textSecondary: "#9ca3af",
  border: "#374151",
  primary: "#3b82f6",
  primaryText: "#ffffff",
  headerBackground: "#1f2937",
  headerText: "#f9fafb",
  drawerBackground: "#1f2937",
  drawerActiveBackground: "#1e3a8a",
  drawerActiveTint: "#60a5fa",
  drawerInactiveTint: "#9ca3af",
  playerX: "#60a5fa",
  playerO: "#f87171",
  currentMoveBackground: "#374151",
  winningSquareBackground: "#3b82f6",
  winningSquareText: "#ffffff",
  statusBarStyle: "light",
};

export interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
  isDark: boolean;
  colors: ThemeColors;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
  // The theme is the only state. The colours are computed from it, not stored separately.
  const [theme, setTheme] = useState<Theme>("light");

  const colors = theme === "dark" ? darkColors : lightColors;
  const isDark = theme === "dark";

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  return (
    <ThemeContext.Provider
      value={{
        theme,
        setTheme,
        toggleTheme,
        isDark,
        colors,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme(): ThemeContextType {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
