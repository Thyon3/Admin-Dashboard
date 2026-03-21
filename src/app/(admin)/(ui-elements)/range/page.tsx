import RangeSlider from "@/components/ui/range/RangeSlider";

export default function RangePage() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
        Range Slider
      </h1>
      
      <div className="space-y-8">
        <div className="rounded-xl border border-gray-200 dark:border-gray-800 p-6">
          <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-4">
            Basic Range Slider
          </h2>
          <RangeSlider
            min={0}
            max={100}
            value={50}
            showValue={true}
            showLabels={true}
            className="max-w-md"
          />
        </div>
        
        <div className="rounded-xl border border-gray-200 dark:border-gray-800 p-6">
          <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-4">
            Custom Range
          </h2>
          <RangeSlider
            min={10}
            max={200}
            step={10}
            value={75}
            showValue={true}
            showLabels={true}
            className="max-w-md"
          />
        </div>
        
        <div className="rounded-xl border border-gray-200 dark:border-gray-800 p-6">
          <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-4">
            Without Labels
          </h2>
          <RangeSlider
            min={0}
            max={50}
            value={25}
            showValue={true}
            showLabels={false}
            className="max-w-md"
          />
        </div>
        
        <div className="rounded-xl border border-gray-200 dark:border-gray-800 p-6">
          <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-4">
            Disabled State
          </h2>
          <RangeSlider
            min={0}
            max={100}
            value={50}
            showValue={true}
            showLabels={true}
            disabled={true}
            className="max-w-md"
          />
        </div>
      </div>
    </div>
  );
}
