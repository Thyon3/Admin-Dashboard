import Alert from "@/components/ui/alert/Alert";

export default function AlertsPage() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
        Alerts
      </h1>
      
      <div className="space-y-6">
        <Alert
          variant="success"
          title="Success"
          message="Your changes have been saved successfully."
        />
        
        <Alert
          variant="error"
          title="Error"
          message="There was an error processing your request."
        />
        
        <Alert
          variant="warning"
          title="Warning"
          message="Please review your input before proceeding."
        />
        
        <Alert
          variant="info"
          title="Information"
          message="This is an informational message."
        />
      </div>
    </div>
  );
}
