"use client";
import React, { createContext, useContext, useState, useCallback } from "react";

interface UserPreferences {
  status: "online" | "away" | "busy";
  language: string;
  appearance: {
    compactMode: boolean;
    showSidebar: boolean;
    sidebarCollapsed: boolean;
  };
}

interface UserPreferencesContextType {
  preferences: UserPreferences;
  updatePreferences: (updates: Partial<UserPreferences>) => void;
  toggleCompactMode: () => void;
  toggleStatus: () => void;
}

const defaultPreferences: UserPreferences = {
  status: "online",
  language: "en",
  appearance: {
    compactMode: false,
    showSidebar: true,
    sidebarCollapsed: false,
  },
};

const UserPreferencesContext = createContext<UserPreferencesContextType | undefined>(undefined);

export function useUserPreferences() {
  const context = useContext(UserPreferencesContext);
  if (context === undefined) {
    throw new Error("useUserPreferences must be used within a UserPreferencesProvider");
  }
  return context;
}

export function UserPreferencesProvider({ children }: { children: React.ReactNode }) {
  const [preferences, setPreferences] = useState<UserPreferences>(defaultPreferences);

  const updatePreferences = useCallback((updates: Partial<UserPreferences>) => {
    setPreferences(prev => ({ ...prev, ...updates }));
  }, []);

  const toggleCompactMode = useCallback(() => {
    setPreferences(prev => ({
      ...prev,
      appearance: { ...prev.appearance, compactMode: !prev.appearance.compactMode }
    }));
  }, []);

  const toggleStatus = useCallback(() => {
    setPreferences(prev => ({
      ...prev,
      status: prev.status === "online" ? "away" : "online"
    }));
  }, []);

  return (
    <UserPreferencesContext.Provider value={{ preferences, updatePreferences, toggleCompactMode, toggleStatus }}>
      {children}
    </UserPreferencesContext.Provider>
  );
}
