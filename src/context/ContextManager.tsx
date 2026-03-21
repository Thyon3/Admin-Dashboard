"use client";
import React, { createContext, useContext, useState, useCallback } from "react";

interface Context {
  id: string;
  name: string;
  data: any;
  timestamp: number;
}

interface ContextManagerType {
  contexts: Map<string, Context>;
  setContext: (id: string, name: string, data: any) => void;
  getContext: (id: string) => Context | undefined;
  removeContext: (id: string) => void;
  clearContexts: () => void;
  getContextsByName: (name: string) => Context[];
  getRecentContexts: (limit?: number) => Context[];
}

const ContextManagerContext = createContext<ContextManagerType | undefined>(undefined);

export function useContextManager() {
  const context = useContext(ContextManagerContext);
  if (context === undefined) {
    throw new Error("useContextManager must be used within a ContextManagerProvider");
  }
  return context;
}

interface ContextManagerProviderProps {
  children: React.ReactNode;
}

export function ContextManagerProvider({ children }: ContextManagerProviderProps) {
  const [contexts, setContexts] = useState<Map<string, Context>>(new Map());

  const setContext = useCallback((id: string, name: string, data: any) => {
    setContexts(prev => {
      const newMap = new Map(prev);
      newMap.set(id, {
        id,
        name,
        data,
        timestamp: Date.now(),
      });
      return newMap;
    });
  }, []);

  const getContext = useCallback((id: string) => {
    return contexts.get(id);
  }, [contexts]);

  const removeContext = useCallback((id: string) => {
    setContexts(prev => {
      const newMap = new Map(prev);
      newMap.delete(id);
      return newMap;
    });
  }, []);

  const clearContexts = useCallback(() => {
    setContexts(new Map());
  }, []);

  const getContextsByName = useCallback((name: string) => {
    return Array.from(contexts.values()).filter(context => context.name === name);
  }, [contexts]);

  const getRecentContexts = useCallback((limit: number = 10) => {
    return Array.from(contexts.values())
      .sort((a, b) => b.timestamp - a.timestamp)
      .slice(0, limit);
  }, [contexts]);

  const value: ContextManagerType = {
    contexts,
    setContext,
    getContext,
    removeContext,
    clearContexts,
    getContextsByName,
    getRecentContexts,
  };

  return (
    <ContextManagerContext.Provider value={value}>
      {children}
    </ContextManagerContext.Provider>
  );
}

export default ContextManagerProvider;
