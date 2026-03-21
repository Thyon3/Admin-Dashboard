"use client";
import React, { createContext, useContext, useState, useCallback } from "react";

interface UserPreferences {
  language: string;
  timezone: string;
  dateFormat: string;
  notifications: {
    email: boolean;
    push: boolean;
    desktop: boolean;
  };
  appearance: {
    compactMode: boolean;
    showSidebar: boolean;
    sidebarCollapsed: boolean;
  };
}

interface UserPreferencesContextType {
  preferences: UserPreferences;
  updatePreferences: (updates: Partial<UserPreferences>) => void;
  resetPreferences: () => void;
}

const defaultPreferences: UserPreferences = {
  language: "en",
  timezone: "UTC",
  dateFormat: "MM/DD/YYYY",
  notifications: {
    email: true,
    push: true,
    desktop: false,
  },
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

interface UserPreferencesProviderProps {
  children: React.ReactNode;
  initialPreferences?: Partial<UserPreferences>;
}

export function UserPreferencesProvider({ 
  children, 
  initialPreferences = {} 
}: UserPreferencesProviderProps) {
  const [preferences, setPreferences] = useState<UserPreferences>({
    ...defaultPreferences,
    ...initialPreferences,
  });

  const updatePreferences = useCallback((updates: Partial<UserPreferences>) => {
    setPreferences(prev => ({
      ...prev,
      ...updates,
      notifications: {
        ...prev.notifications,
        ...updates.notifications,
      },
      appearance: {
        ...prev.appearance,
        ...updates.appearance,
      },
    }));
  }, []);

  const resetPreferences = useCallback(() => {
    setPreferences(defaultPreferences);
  }, []);

  const value: UserPreferencesContextType = {
    preferences,
    updatePreferences,
    resetPreferences,
  };

  return (
    <UserPreferencesContext.Provider value={value}>
      {children}
    </UserPreferencesContext.Provider>
  );
}

export default UserPreferencesProvider;
