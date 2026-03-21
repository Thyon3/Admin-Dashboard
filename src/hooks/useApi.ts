import { useState, useEffect, useCallback } from "react";

interface ApiState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

interface UseApiOptions {
  immediate?: boolean;
  retryCount?: number;
  retryDelay?: number;
}

interface ApiResponse<T> {
  data?: T;
  error?: string;
  status: number;
}

export function useApi<T>(
  apiCall: () => Promise<ApiResponse<T>>,
  options: UseApiOptions = {}
) {
  const { immediate = true, retryCount = 0, retryDelay = 1000 } = options;
  
  const [state, setState] = useState<ApiState<T>>({
    data: null,
    loading: false,
    error: null,
  });

  const execute = useCallback(async () => {
    setState(prev => ({ ...prev, loading: true, error: null }));
    
    let attempts = 0;
    let lastError: string | null = null;

    while (attempts <= retryCount) {
      try {
        const response = await apiCall();
        
        if (response.error) {
          throw new Error(response.error);
        }
        
        if (response.data !== undefined) {
          setState({
            data: response.data,
            loading: false,
            error: null,
          });
          return response.data;
        }
        
        throw new Error("No data received from API");
        
      } catch (error) {
        lastError = error instanceof Error ? error.message : "Unknown error occurred";
        attempts++;
        
        if (attempts <= retryCount) {
          await new Promise(resolve => setTimeout(resolve, retryDelay));
        }
      }
    }
    
    setState({
      data: null,
      loading: false,
      error: lastError,
    });
    
    return null;
  }, [apiCall, retryCount, retryDelay]);

  const reset = useCallback(() => {
    setState({
      data: null,
      loading: false,
      error: null,
    });
  }, []);

  const refetch = useCallback(() => {
    execute();
  }, [execute]);

  useEffect(() => {
    if (immediate) {
      execute();
    }
  }, [immediate, execute]);

  return {
    ...state,
    execute,
    refetch,
    reset,
  };
}

export function useApiLazy<T>(apiCall: () => Promise<ApiResponse<T>>) {
  return useApi(apiCall, { immediate: false });
}

export default useApi;
