import Toggle from "@/components/ui/toggle/Toggle";

export default function TogglePage() {
  const [toggles, setToggles] = useState({
    basic: false,
    success: true,
    error: false,
    warning: true,
    disabled: false,
    withLabel: true,
    withDescription: false
  });

  const handleToggle = (key: string, value: boolean) => {
    setToggles(prev => ({ ...prev, [key]: value }));
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
        Toggle Switch
      </h1>
      
      <div className="space-y-8">
        <div className="rounded-xl border border-gray-200 dark:border-gray-800 p-6">
          <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-4">
            Basic Toggles
          </h2>
          <div className="space-y-4">
            <Toggle
              checked={toggles.basic}
              onChange={(value) => handleToggle("basic", value)}
              label="Primary Toggle"
              color="primary"
            />
            <Toggle
              checked={toggles.success}
              onChange={(value) => handleToggle("success", value)}
              label="Success Toggle"
              color="success"
            />
            <Toggle
              checked={toggles.error}
              onChange={(value) => handleToggle("error", value)}
              label="Error Toggle"
              color="error"
            />
            <Toggle
              checked={toggles.warning}
              onChange={(value) => handleToggle("warning", value)}
              label="Warning Toggle"
              color="warning"
            />
          </div>
        </div>
        
        <div className="rounded-xl border border-gray-200 dark:border-gray-800 p-6">
          <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-4">
            Size Variants
          </h2>
          <div className="space-y-4">
            <Toggle
              checked={true}
              label="Small Size"
              size="sm"
              color="primary"
            />
            <Toggle
              checked={true}
              label="Medium Size"
              size="md"
              color="primary"
            />
            <Toggle
              checked={true}
              label="Large Size"
              size="lg"
              color="primary"
            />
          </div>
        </div>
        
        <div className="rounded-xl border border-gray-200 dark:border-gray-800 p-6">
          <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-4">
            With Labels and Descriptions
          </h2>
          <div className="space-y-4">
            <Toggle
              checked={toggles.withLabel}
              onChange={(value) => handleToggle("withLabel", value)}
              label="Enable notifications"
              description="Receive push notifications for important updates"
              color="primary"
            />
            <Toggle
              checked={toggles.withDescription}
              onChange={(value) => handleToggle("withDescription", value)}
              label="Dark mode"
              description="Use dark theme across the application"
              color="primary"
            />
          </div>
        </div>
        
        <div className="rounded-xl border border-gray-200 dark:border-gray-800 p-6">
          <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-4">
            States
          </h2>
          <div className="space-y-4">
            <Toggle
              checked={true}
              label="Enabled State"
              color="primary"
            />
            <Toggle
              checked={false}
              label="Disabled State"
              color="primary"
              disabled={true}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
