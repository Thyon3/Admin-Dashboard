"use client";
import React, { useState, useRef, useEffect } from "react";

interface ContextMenuItem {
  id: string;
  label: string;
  icon?: React.ReactNode;
  disabled?: boolean;
  danger?: boolean;
  onClick?: () => void;
}

interface ContextMenuProps {
  items: ContextMenuItem[];
  children: React.ReactNode;
  className?: string;
}

const ContextMenu: React.FC<ContextMenuProps> = ({
  items,
  children,
  className = ""
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const menuRef = useRef<HTMLDivElement>(null);

  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    setPosition({ x: e.clientX, y: e.clientY });
    setIsOpen(true);
  };

  const handleClick = () => {
    setIsOpen(false);
  };

  const handleItemClick = (item: ContextMenuItem) => {
    if (!item.disabled && item.onClick) {
      item.onClick();
    }
    setIsOpen(false);
  };

  useEffect(() => {
    const handleGlobalClick = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleGlobalClick);
      document.addEventListener("keydown", handleEscape);
    }

    return () => {
      document.removeEventListener("mousedown", handleGlobalClick);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen]);

  // Adjust position if menu goes off screen
  useEffect(() => {
    if (isOpen && menuRef.current) {
      const rect = menuRef.current.getBoundingClientRect();
      const adjustedX = position.x;
      const adjustedY = position.y;

      if (rect.right > window.innerWidth) {
        setPosition(prev => ({ ...prev, x: window.innerWidth - rect.width - 10 }));
      }
      if (rect.bottom > window.innerHeight) {
        setPosition(prev => ({ ...prev, y: window.innerHeight - rect.height - 10 }));
      }
    }
  }, [isOpen, position]);

  return (
    <div className={className}>
      <div onContextMenu={handleContextMenu} onClick={handleClick}>
        {children}
      </div>
      
      {isOpen && (
        <div
          ref={menuRef}
          className="fixed z-50 min-w-48 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg"
          style={{
            left: position.x,
            top: position.y,
          }}
          role="menu"
        >
          {items.map((item) => (
            <button
              key={item.id}
              onClick={() => handleItemClick(item)}
              disabled={item.disabled}
              className={`
                w-full px-4 py-2 text-left flex items-center space-x-2 text-sm
                ${item.disabled 
                  ? "text-gray-400 cursor-not-allowed" 
                  : item.danger
                    ? "text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20"
                    : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                }
                transition-colors
              `}
              role="menuitem"
            >
              {item.icon && (
                <span className="flex-shrink-0 w-4 h-4">
                  {item.icon}
                </span>
              )}
              <span className="flex-1">{item.label}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default ContextMenu;
