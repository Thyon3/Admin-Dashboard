import { useState, useCallback } from "react";

interface UseClipboardReturn {
  copied: boolean;
  copy: (text: string) => Promise<boolean>;
  error: string | null;
}

export function useClipboard(): UseClipboardReturn {
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const copy = useCallback(async (text: string): Promise<boolean> => {
    try {
      // Try modern clipboard API first
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(text);
        setCopied(true);
        setError(null);
        
        // Reset copied state after 2 seconds
        setTimeout(() => setCopied(false), 2000);
        return true;
      }
      
      // Fallback for older browsers
      const textArea = document.createElement("textarea");
      textArea.value = text;
      textArea.style.position = "fixed";
      textArea.style.left = "-999999px";
      textArea.style.top = "-999999px";
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      
      const successful = document.execCommand("copy");
      document.body.removeChild(textArea);
      
      if (successful) {
        setCopied(true);
        setError(null);
        setTimeout(() => setCopied(false), 2000);
        return true;
      } else {
        throw new Error("Copy command failed");
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Failed to copy text";
      setError(errorMessage);
      setCopied(false);
      return false;
    }
  }, []);

  return {
    copied,
    copy,
    error,
  };
}

export default useClipboard;
