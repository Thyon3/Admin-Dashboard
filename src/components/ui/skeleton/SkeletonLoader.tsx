import React from "react";
import Skeleton from "@/components/ui/loading/Skeleton";

interface SkeletonLoaderProps {
  type?: "card" | "list" | "table" | "form" | "avatar";
  count?: number;
  className?: string;
}

const SkeletonLoader: React.FC<SkeletonLoaderProps> = ({
  type = "card",
  count = 1,
  className = ""
}) => {
  const renderCardSkeleton = () => (
    <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
      <Skeleton variant="text" width="60%" className="mb-3" />
      <Skeleton variant="text" width="100%" className="mb-2" />
      <Skeleton variant="text" width="80%" className="mb-4" />
      <div className="flex space-x-2">
        <Skeleton variant="rectangular" width="60px" height="60px" className="rounded" />
        <div className="flex-1">
          <Skeleton variant="text" width="70%" className="mb-2" />
          <Skeleton variant="text" width="100%" />
        </div>
      </div>
    </div>
  );

  const renderListSkeleton = () => (
    <div className="space-y-3">
      {Array.from({ length: 5 }).map((_, index) => (
        <div key={index} className="flex items-center space-x-3 p-3">
          <Skeleton variant="circular" width="40px" height="40px" />
          <div className="flex-1">
            <Skeleton variant="text" width="40%" className="mb-2" />
            <Skeleton variant="text" width="100%" />
          </div>
        </div>
      ))}
    </div>
  );

  const renderTableSkeleton = () => (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr>
            {Array.from({ length: 4 }).map((_, index) => (
              <th key={index} className="px-6 py-3 text-left">
                <Skeleton variant="text" width="100px" />
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {Array.from({ length: 5 }).map((_, rowIndex) => (
            <tr key={rowIndex}>
              {Array.from({ length: 4 }).map((_, colIndex) => (
                <td key={colIndex} className="px-6 py-4">
                  <Skeleton variant="text" width="120px" />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  const renderFormSkeleton = () => (
    <div className="space-y-4">
      <Skeleton variant="text" width="30%" className="mb-2" />
      <Skeleton variant="rectangular" width="100%" height="40px" className="rounded" />
      
      <Skeleton variant="text" width="25%" className="mb-2" />
      <Skeleton variant="rectangular" width="100%" height="40px" className="rounded" />
      
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Skeleton variant="text" width="40%" className="mb-2" />
          <Skeleton variant="rectangular" width="100%" height="40px" className="rounded" />
        </div>
        <div>
          <Skeleton variant="text" width="45%" className="mb-2" />
          <Skeleton variant="rectangular" width="100%" height="40px" className="rounded" />
        </div>
      </div>
      
      <Skeleton variant="rectangular" width="120px" height="40px" className="rounded" />
    </div>
  );

  const renderAvatarSkeleton = () => (
    <div className="flex flex-wrap gap-4">
      {Array.from({ length: 8 }).map((_, index) => (
        <div key={index} className="text-center">
          <Skeleton variant="circular" width="64px" height="64px" className="mx-auto mb-2" />
          <Skeleton variant="text" width="80px" />
        </div>
      ))}
    </div>
  );

  const renderSkeleton = () => {
    switch (type) {
      case "card":
        return renderCardSkeleton();
      case "list":
        return renderListSkeleton();
      case "table":
        return renderTableSkeleton();
      case "form":
        return renderFormSkeleton();
      case "avatar":
        return renderAvatarSkeleton();
      default:
        return renderCardSkeleton();
    }
  };

  return (
    <div className={className}>
      {Array.from({ length: count }).map((_, index) => (
        <div key={index}>
          {renderSkeleton()}
        </div>
      ))}
    </div>
  );
};

export default SkeletonLoader;
