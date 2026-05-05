import Steps from "@/components/ui/steps/Steps";

export default function StepsPage() {
  const basicSteps = [
    { id: "1", title: "Account Setup", description: "Create your account" },
    { id: "2", title: "Profile Information", description: "Add your personal details" },
    { id: "3", title: "Preferences", description: "Set your preferences" },
    { id: "4", title: "Review", description: "Review your information" }
  ];

  const currentSteps = [
    { id: "1", title: "Account Setup", description: "Create your account", status: "completed" as const },
    { id: "2", title: "Profile Information", description: "Add your personal details", status: "in-progress" as const },
    { id: "3", title: "Preferences", description: "Set your preferences", status: "pending" as const },
    { id: "4", title: "Review", description: "Review your information", status: "pending" as const }
  ];

  const errorSteps = [
    { id: "1", title: "Account Setup", description: "Create your account", status: "completed" as const },
    { id: "2", title: "Profile Information", description: "Add your personal details", status: "completed" as const },
    { id: "3", title: "Preferences", description: "Set your preferences", status: "error" as const },
    { id: "4", title: "Review", description: "Review your information", status: "pending" as const }
  ];

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
        Steps
      </h1>
      
      <div className="space-y-8">
        <div className="rounded-xl border border-gray-200 dark:border-gray-800 p-6">
          <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-4">
            Basic Steps
          </h2>
          <Steps
            items={basicSteps}
            currentStep="2"
            size="md"
            direction="horizontal"
          />
        </div>
        
        <div className="rounded-xl border border-gray-200 dark:border-gray-800 p-6">
          <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-4">
            With Status
          </h2>
          <Steps
            items={currentSteps}
            size="md"
            direction="horizontal"
          />
        </div>
        
        <div className="rounded-xl border border-gray-200 dark:border-gray-800 p-6">
          <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-4">
            Vertical Steps
          </h2>
          <Steps
            items={currentSteps}
            size="md"
            direction="vertical"
          />
        </div>
        
        <div className="rounded-xl border border-gray-200 dark:border-gray-800 p-6">
          <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-4">
            With Error State
          </h2>
          <Steps
            items={errorSteps}
            size="md"
            direction="horizontal"
          />
        </div>
        
        <div className="rounded-xl border border-gray-200 dark:border-gray-800 p-6">
          <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-4">
            Small Size
          </h2>
          <Steps
            items={basicSteps}
            currentStep="2"
            size="sm"
            direction="horizontal"
          />
        </div>
      </div>
    </div>
  );
}
