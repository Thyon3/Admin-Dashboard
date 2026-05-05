"use client";
import React from "react";
import Card from "@/components/ui/card/Card";
import Label from "@/components/form/Label";
import InputField from "@/components/form/input/InputField";
import Button from "@/components/ui/button/Button";

const SettingsPage = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">General Settings</h1>
        <p className="text-gray-500 dark:text-gray-400">Manage your account preferences and system settings.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card title="Profile Information">
          <div className="space-y-4">
            <div>
              <Label htmlFor="full-name">Full Name</Label>
              <InputField id="full-name" defaultValue="John Doe" />
            </div>
            <div>
              <Label htmlFor="email-settings">Email Address</Label>
              <InputField id="email-settings" type="email" defaultValue="john@example.com" />
            </div>
            <Button variant="primary" className="mt-2">Save Profile</Button>
          </div>
        </Card>

        <Card title="Security">
          <div className="space-y-4">
            <div>
              <Label htmlFor="current-password">Current Password</Label>
              <InputField id="current-password" type="password" placeholder="••••••••" />
            </div>
            <div>
              <Label htmlFor="new-password">New Password</Label>
              <InputField id="new-password" type="password" placeholder="••••••••" />
            </div>
            <Button variant="outline" className="mt-2">Update Password</Button>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default SettingsPage;
