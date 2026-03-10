import { createContext, ReactNode, useContext, useMemo, useState } from "react";
import { AppThemeColors, appThemeByMode, getNavigationTheme, ThemeMode } from "@/constants/design";

interface AppThemeContextValue {
  mode: ThemeMode;
  colors: AppThemeColors;
  toggleMode: () => void;
  navigationTheme: ReturnType<typeof getNavigationTheme>;
}

const AppThemeContext = createContext<AppThemeContextValue | null>(null);

export function AppThemeProvider({ children }: { children: ReactNode }) {
  const [mode, setMode] = useState<ThemeMode>("light");

  const value = useMemo(() => {
    const colors = appThemeByMode[mode];
    return {
      mode,
      colors,
      toggleMode: () => setMode((prev) => (prev === "light" ? "dark" : "light")),
      navigationTheme: getNavigationTheme(mode),
    };
  }, [mode]);

  return <AppThemeContext.Provider value={value}>{children}</AppThemeContext.Provider>;
}

export function useAppTheme() {
  const context = useContext(AppThemeContext);
  if (!context) {
    throw new Error("useAppTheme must be used within AppThemeProvider");
  }
  return context;
}
