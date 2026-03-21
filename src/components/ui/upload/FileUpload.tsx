"use client";
import React, { useState, useRef } from "react";

interface FileUploadProps {
  accept?: string;
  multiple?: boolean;
  maxSize?: number;
  maxFiles?: number;
  onFilesSelected?: (files: File[]) => void;
  className?: string;
}

const FileUpload: React.FC<FileUploadProps> = ({
  accept = "*/*",
  multiple = false,
  maxSize = 10 * 1024 * 1024, // 10MB
  maxFiles = 1,
  onFilesSelected,
  className = ""
}) => {
  const [isDragOver, setIsDragOver] = useState(false);
  const [error, setError] = useState<string>("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const validateFiles = (files: FileList) => {
    const fileArray = Array.from(files);
    
    if (!multiple && fileArray.length > 1) {
      setError("Only one file is allowed");
      return [];
    }
    
    if (fileArray.length > maxFiles) {
      setError(`Maximum ${maxFiles} files allowed`);
      return [];
    }
    
    const oversizedFiles = fileArray.filter(file => file.size > maxSize);
    if (oversizedFiles.length > 0) {
      setError(`File size exceeds maximum of ${Math.round(maxSize / 1024 / 1024)}MB`);
      return [];
    }
    
    setError("");
    return fileArray;
  };

  const handleFiles = (files: FileList) => {
    const validFiles = validateFiles(files);
    if (validFiles.length > 0 && onFilesSelected) {
      onFilesSelected(validFiles);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragOver(false);
    
    const files = e.dataTransfer.files;
    handleFiles(files);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      handleFiles(files);
    }
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  return (
    <div className={className}>
      <div
        className={`
          border-2 border-dashed rounded-lg p-8 text-center transition-colors cursor-pointer
          ${isDragOver 
            ? "border-brand-500 bg-brand-50 dark:bg-brand-900/20" 
            : "border-gray-300 dark:border-gray-600 hover:border-brand-400 dark:hover:border-brand-500"
          }
        `}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onClick={handleClick}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            handleClick();
          }
        }}
        aria-label="File upload area"
      >
        <svg
          className="w-12 h-12 mx-auto mb-4 text-gray-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
          />
        </svg>
        
        <div className="text-gray-600 dark:text-gray-400">
          <p className="text-lg font-medium mb-2">
            {isDragOver ? "Drop files here" : "Drop files here or click to browse"}
          </p>
          <p className="text-sm">
            {multiple ? `Up to ${maxFiles} files` : "Single file"} • Max {formatFileSize(maxSize)}
          </p>
        </div>
        
        <input
          ref={fileInputRef}
          type="file"
          accept={accept}
          multiple={multiple}
          onChange={handleFileInput}
          className="hidden"
          aria-label="File input"
        />
      </div>
      
      {error && (
        <div className="mt-4 p-3 bg-error-100 dark:bg-error-900/20 border border-error-300 dark:border-error-700 rounded-lg">
          <p className="text-sm text-error-600 dark:text-error-400">{error}</p>
        </div>
      )}
    </div>
  );
};

export default FileUpload;
