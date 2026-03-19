import ResponsiveImage from "@/components/ui/images/ResponsiveImage";
import TwoColumnImageGrid from "@/components/ui/images/TwoColumnImageGrid";
import ThreeColumnImageGrid from "@/components/ui/images/ThreeColumnImageGrid";

export default function ImagesPage() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
        Images
      </h1>
      
      <div className="space-y-8">
        <div>
          <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-4">
            Responsive Image
          </h2>
          <ResponsiveImage />
        </div>
        
        <div>
          <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-4">
            Two Column Grid
          </h2>
          <TwoColumnImageGrid />
        </div>
        
        <div>
          <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-4">
            Three Column Grid
          </h2>
          <ThreeColumnImageGrid />
        </div>
      </div>
    </div>
  );
}
