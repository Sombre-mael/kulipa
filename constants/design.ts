import { DarkTheme, DefaultTheme, Theme } from "@react-navigation/native";

export type ThemeMode = "light" | "dark";

export interface AppThemeColors {
  bg: string;
  bgSoft: string;
  text: string;
  textMuted: string;
  border: string;
  primary: string;
  success: string;
  warning: string;
  danger: string;
  glass: string;
  glassStrong: string;
  tabBg: string;
  shadow: string;
}

const lightColors: AppThemeColors = {
  bg: "#F6F8FC",
  bgSoft: "#EAF0FA",
  text: "#0F172A",
  textMuted: "#64748B",
  border: "rgba(99, 102, 241, 0.18)",
  primary: "#6366F1",
  success: "#10B981",
  warning: "#F59E0B",
  danger: "#EF4444",
  glass: "rgba(255, 255, 255, 0.66)",
  glassStrong: "rgba(255, 255, 255, 0.84)",
  tabBg: "rgba(255, 255, 255, 0.9)",
  shadow: "rgba(15, 23, 42, 0.12)",
};

const darkColors: AppThemeColors = {
  bg: "#0B1220",
  bgSoft: "#121C31",
  text: "#E2E8F0",
  textMuted: "#93A4BC",
  border: "rgba(99, 102, 241, 0.3)",
  primary: "#818CF8",
  success: "#34D399",
  warning: "#FBBF24",
  danger: "#F87171",
  glass: "rgba(17, 24, 39, 0.62)",
  glassStrong: "rgba(17, 24, 39, 0.8)",
  tabBg: "rgba(17, 24, 39, 0.76)",
  shadow: "rgba(0, 0, 0, 0.35)",
};

export const appThemeByMode: Record<ThemeMode, AppThemeColors> = {
  light: lightColors,
  dark: darkColors,
};

export function getNavigationTheme(mode: ThemeMode): Theme {
  const palette = appThemeByMode[mode];
  const base = mode === "dark" ? DarkTheme : DefaultTheme;

  return {
    ...base,
    colors: {
      ...base.colors,
      background: palette.bg,
      card: palette.glassStrong,
      text: palette.text,
      border: palette.border,
      primary: palette.primary,
    },
  };
}

export const AppColors = lightColors;

export const Spacing = {
  xs: 6,
  sm: 10,
  md: 16,
  lg: 20,
  xl: 28,
};

export const Radius = {
  sm: 10,
  md: 14,
  lg: 18,
  xl: 26,
};
