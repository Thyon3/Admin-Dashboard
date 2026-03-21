import React from "react";

interface BreadcrumbItem {
  label: string;
  href?: string;
  isActive?: boolean;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
  separator?: string;
  className?: string;
}

const Breadcrumb: React.FC<BreadcrumbProps> = ({ 
  items, 
  separator = "/", 
  className = "" 
}) => {
  return (
    <nav 
      aria-label="Breadcrumb"
      className={`flex items-center space-x-2 text-sm ${className}`}
    >
      {items.map((item, index) => (
        <div key={index} className="flex items-center">
          {index > 0 && (
            <span className="mx-2 text-gray-400 dark:text-gray-600">
              {separator}
            </span>
          )}
          
          {item.href ? (
            <a
              href={item.href}
              className={`transition-colors ${
                item.isActive
                  ? "text-brand-500 font-medium"
                  : "text-gray-600 hover:text-brand-500 dark:text-gray-400 dark:hover:text-brand-500"
              }`}
              aria-current={item.isActive ? "page" : undefined}
            >
              {item.label}
            </a>
          ) : (
            <span
              className={`${
                item.isActive
                  ? "text-brand-500 font-medium"
                  : "text-gray-600 dark:text-gray-400"
              }`}
              aria-current={item.isActive ? "page" : undefined}
            >
              {item.label}
            </span>
          )}
        </div>
      ))}
    </nav>
  );
};

export default Breadcrumb;
