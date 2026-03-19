import Label from "@/components/form/Label";
import InputField from "@/components/form/input/InputField";
import Checkbox from "@/components/form/checkbox/Checkbox";
import Switch from "@/components/form/switch/Switch";
import Button from "@/components/ui/button/Button";

export default function FormsPage() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
        Forms
      </h1>
      
      <div className="space-y-6">
        <div className="rounded-xl border border-gray-200 dark:border-gray-800 p-6">
          <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-4">
            Input Fields
          </h2>
          <div className="space-y-4">
            <div>
              <Label htmlFor="name">Name</Label>
              <InputField id="name" placeholder="Enter your name" />
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <InputField id="email" type="email" placeholder="Enter your email" />
            </div>
            <div>
              <Label htmlFor="password">Password</Label>
              <InputField id="password" type="password" placeholder="Enter your password" />
            </div>
          </div>
        </div>
        
        <div className="rounded-xl border border-gray-200 dark:border-gray-800 p-6">
          <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-4">
            Checkboxes & Switches
          </h2>
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <Checkbox
                label="I agree to the terms and conditions"
                checked={true}
                onChange={(checked) => console.log("Checkbox:", checked)}
              />
            </div>
            <div className="flex items-center gap-4">
              <Switch
                label="Enable notifications"
                defaultChecked={false}
                onChange={(checked) => console.log("Switch:", checked)}
              />
            </div>
          </div>
        </div>
        
        <div className="flex gap-4">
          <Button variant="primary">Submit</Button>
          <Button variant="outline">Cancel</Button>
        </div>
      </div>
    </div>
  );
}
