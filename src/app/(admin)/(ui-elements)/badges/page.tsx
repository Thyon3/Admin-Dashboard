import Badge from "@/components/ui/badge/Badge";

export default function BadgesPage() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
        Badges
      </h1>
      
      <div className="space-y-6">
        <div>
          <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-4">
            Badge Colors
          </h2>
          <div className="flex gap-4 flex-wrap">
            <Badge color="primary">Primary</Badge>
            <Badge color="success">Success</Badge>
            <Badge color="error">Error</Badge>
            <Badge color="warning">Warning</Badge>
            <Badge color="info">Info</Badge>
          </div>
        </div>
        
        <div>
          <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-4">
            Badge Variants
          </h2>
          <div className="flex gap-4 flex-wrap">
            <Badge variant="light" color="primary">Light</Badge>
            <Badge variant="solid" color="primary">Solid</Badge>
          </div>
        </div>
        
        <div>
          <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-4">
            Badge Sizes
          </h2>
          <div className="flex gap-4 items-center">
            <Badge size="sm" color="primary">Small</Badge>
            <Badge size="md" color="primary">Medium</Badge>
          </div>
        </div>
      </div>
    </div>
  );
}
