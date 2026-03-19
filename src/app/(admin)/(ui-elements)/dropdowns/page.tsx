"use client";
import { useState } from "react";
import Dropdown from "@/components/ui/dropdown/Dropdown";
import DropdownItem from "@/components/ui/dropdown/DropdownItem";
import Button from "@/components/ui/button/Button";

export default function DropdownsPage() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
        Dropdowns
      </h1>
      
      <div className="space-y-6">
        <div className="relative inline-block">
          <Button onClick={() => setIsOpen(!isOpen)}>
            Toggle Dropdown
          </Button>
          
          <Dropdown isOpen={isOpen} onClose={() => setIsOpen(false)}>
            <DropdownItem onClick={() => console.log("Profile clicked")}>
              Profile
            </DropdownItem>
            <DropdownItem onClick={() => console.log("Settings clicked")}>
              Settings
            </DropdownItem>
            <DropdownItem onClick={() => console.log("Logout clicked")}>
              Logout
            </DropdownItem>
          </Dropdown>
        </div>
      </div>
    </div>
  );
}
