import Spinner from "@/components/ui/loading/Spinner";
import Skeleton from "@/components/ui/loading/Skeleton";

export default function LoadingPage() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
        Loading Components
      </h1>
      
      <div className="space-y-8">
        <div className="rounded-xl border border-gray-200 dark:border-gray-800 p-6">
          <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-4">
            Spinner
          </h2>
          <div className="space-y-4">
            <div className="flex items-center space-x-4">
              <Spinner size="sm" />
              <span className="text-sm text-gray-600 dark:text-gray-400">Small Spinner</span>
            </div>
            <div className="flex items-center space-x-4">
              <Spinner size="md" />
              <span className="text-sm text-gray-600 dark:text-gray-400">Medium Spinner</span>
            </div>
            <div className="flex items-center space-x-4">
              <Spinner size="lg" />
              <span className="text-sm text-gray-600 dark:text-gray-400">Large Spinner</span>
            </div>
          </div>
        </div>
        
        <div className="rounded-xl border border-gray-200 dark:border-gray-800 p-6">
          <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-4">
            Skeleton
          </h2>
          <div className="space-y-4">
            <div className="flex items-center space-x-4">
              <Skeleton variant="text" width="150px" />
              <span className="text-sm text-gray-600 dark:text-gray-400">Text Skeleton</span>
            </div>
            <div className="flex items-center space-x-4">
              <Skeleton variant="circular" width="40px" height="40px" />
              <span className="text-sm text-gray-600 dark:text-gray-400">Circular Skeleton</span>
            </div>
            <div className="flex items-center space-x-4">
              <Skeleton variant="rectangular" width="200px" height="100px" />
              <span className="text-sm text-gray-600 dark:text-gray-400">Rectangular Skeleton</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
