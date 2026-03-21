import ProgressBar from "@/components/ui/progress/ProgressBar";
import ProgressRing from "@/components/ui/progress/ProgressRing";

export default function ProgressPage() {
  const [progress, setProgress] = useState(65);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
        Progress Indicators
      </h1>
      
      <div className="space-y-8">
        <div className="rounded-xl border border-gray-200 dark:border-gray-800 p-6">
          <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-4">
            Progress Bars
          </h2>
          <div className="space-y-4">
            <ProgressBar progress={progress} color="primary" />
            <ProgressBar progress={40} color="success" />
            <ProgressBar progress={75} color="error" />
            <ProgressBar progress={30} color="warning" />
            <ProgressBar progress={90} size="lg" color="primary" />
            <ProgressBar progress={50} size="sm" color="success" />
          </div>
        </div>
        
        <div className="rounded-xl border border-gray-200 dark:border-gray-800 p-6">
          <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-4">
            Progress Rings
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <ProgressRing progress={progress} color="primary" />
            <ProgressRing progress={40} color="success" />
            <ProgressRing progress={75} color="error" />
            <ProgressRing progress={30} color="warning" />
          </div>
        </div>
        
        <div className="rounded-xl border border-gray-200 dark:border-gray-800 p-6">
          <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-4">
            Interactive Progress
          </h2>
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Progress Value: {progress}%
              </label>
              <input
                type="range"
                min="0"
                max="100"
                value={progress}
                onChange={(e) => setProgress(Number(e.target.value))}
                className="w-full"
              />
            </div>
            
            <div className="flex items-center space-x-8">
              <div className="text-center">
                <ProgressBar progress={progress} color="primary" className="w-32" />
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">Bar</p>
              </div>
              <div className="text-center">
                <ProgressRing progress={progress} color="primary" size={80} />
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">Ring</p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="rounded-xl border border-gray-200 dark:border-gray-800 p-6">
          <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-4">
            Without Percentage
          </h2>
          <div className="flex items-center space-x-8">
            <ProgressBar progress={60} color="primary" showPercentage={false} />
            <ProgressRing progress={60} color="primary" showPercentage={false} />
          </div>
        </div>
      </div>
    </div>
  );
}
