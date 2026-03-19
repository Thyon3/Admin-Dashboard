import Button from "@/components/ui/button/Button";

export default function ButtonsPage() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
        Buttons
      </h1>
      
      <div className="space-y-6">
        <div>
          <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-4">
            Button Variants
          </h2>
          <div className="flex gap-4">
            <Button variant="primary">Primary Button</Button>
            <Button variant="outline">Outline Button</Button>
          </div>
        </div>
        
        <div>
          <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-4">
            Button Sizes
          </h2>
          <div className="flex gap-4 items-center">
            <Button size="sm">Small</Button>
            <Button size="md">Medium</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
