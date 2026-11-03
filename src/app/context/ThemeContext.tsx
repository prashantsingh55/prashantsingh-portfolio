"use client";

import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from "react";

export type ResolvedScheme = "light" | "dark";

interface ThemeContextType {
  theme: ResolvedScheme;
  isSystemDefault: boolean;
  toggleTheme: () => void;
  resetToSystem: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

/**
 * Pure two-state toggle transition:
 * Default scheme is "dark" for all visitors regardless of OS preference.
 * - When currently in default "dark" (storedOverride is null or "dark"), toggling switches to "light" (stores "light").
 * - When currently in "light" (storedOverride is "light"), toggling switches to "dark" (removes stored override or sets "dark").
 */
export function computeNextToggleState(
  storedOverride: ResolvedScheme | null,
  _systemOrFallback?: ResolvedScheme
): {
  targetScheme: ResolvedScheme;
  nextStoredOverride: ResolvedScheme | null;
  metaContent: "light" | "dark";
} {
  const currentlyRendered: ResolvedScheme =
    storedOverride === "light" ? "light" : "dark";
  const targetScheme: ResolvedScheme =
    currentlyRendered === "dark" ? "light" : "dark";
  // The site default is "dark". Switching to "light" sets a stored override.
  // Switching back to "dark" removes the override so it cleanly follows the dark default.
  const nextStoredOverride: ResolvedScheme | null =
    targetScheme === "dark" ? null : "light";
  return {
    targetScheme,
    nextStoredOverride,
    metaContent: targetScheme,
  };
}

function getSystemScheme(): ResolvedScheme {
  if (typeof window === "undefined") return "dark";
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

function getStoredOverride(): ResolvedScheme | null {
  if (typeof window === "undefined") return null;
  try {
    const val = localStorage.getItem("color-scheme");
    if (val === "light" || val === "dark") return val;
    return null;
  } catch {
    return null;
  }
}

function syncDocumentScheme(
  override: ResolvedScheme | null,
  resolved: ResolvedScheme
) {
  if (typeof document === "undefined") return;
  const meta = document.querySelector<HTMLMetaElement>(
    'meta[name="color-scheme"]'
  );
  if (meta) {
    meta.content = resolved;
  }
  document.documentElement.classList.toggle("dark", resolved === "dark");
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<ResolvedScheme>("dark");
  const [isSystemDefault, setIsSystemDefault] = useState<boolean>(true);

  const refreshScheme = useCallback(() => {
    const stored = getStoredOverride();
    // Default is dark for all users unless explicitly set to light
    const resolved: ResolvedScheme = stored === "light" ? "light" : "dark";
    setTheme(resolved);
    setIsSystemDefault(stored === null);
    syncDocumentScheme(stored, resolved);
  }, []);

  useEffect(() => {
    refreshScheme();

    const handleStorage = (event: StorageEvent) => {
      if (event.key === "color-scheme" || event.key === null) {
        refreshScheme();
      }
    };

    window.addEventListener("storage", handleStorage);
    return () => {
      window.removeEventListener("storage", handleStorage);
    };
  }, [refreshScheme]);

  const toggleTheme = useCallback(() => {
    setTheme((prevTheme) => {
      const stored = getStoredOverride();
      const { targetScheme, nextStoredOverride } = computeNextToggleState(
        stored ?? prevTheme,
        "dark"
      );
      try {
        if (nextStoredOverride === null) {
          localStorage.removeItem("color-scheme");
          setIsSystemDefault(true);
        } else {
          localStorage.setItem("color-scheme", nextStoredOverride);
          setIsSystemDefault(false);
        }
      } catch {
        // Ensure theme still toggles in case localStorage throws
      }
      syncDocumentScheme(nextStoredOverride, targetScheme);
      return targetScheme;
    });
  }, []);

  const resetToSystem = useCallback(() => {
    try {
      localStorage.removeItem("color-scheme");
    } catch {
      // ignore storage errors
    }
    setIsSystemDefault(true);
    setTheme("dark");
    syncDocumentScheme(null, "dark");
  }, []);

  return (
    <ThemeContext.Provider
      value={{ theme, isSystemDefault, toggleTheme, resetToSystem }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
