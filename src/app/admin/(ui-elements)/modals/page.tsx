"use client";
import { useState } from "react";
import Modal from "@/components/ui/modal";
import Button from "@/components/ui/button/Button";

export default function ModalsPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isFullscreenOpen, setIsFullscreenOpen] = useState(false);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
        Modals
      </h1>
      
      <div className="space-y-6">
        <div className="flex gap-4">
          <Button onClick={() => setIsModalOpen(true)}>
            Open Regular Modal
          </Button>
          <Button onClick={() => setIsFullscreenOpen(true)}>
            Open Fullscreen Modal
          </Button>
        </div>
        
        <Modal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        >
          <div className="p-6">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
              Regular Modal
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              This is a regular modal with standard size and close button.
            </p>
            <Button onClick={() => setIsModalOpen(false)}>
              Close
            </Button>
          </div>
        </Modal>
        
        <Modal
          isOpen={isFullscreenOpen}
          onClose={() => setIsFullscreenOpen(false)}
          isFullscreen={true}
        >
          <div className="p-6">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
              Fullscreen Modal
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              This is a fullscreen modal that takes up the entire viewport.
            </p>
            <Button onClick={() => setIsFullscreenOpen(false)}>
              Close
            </Button>
          </div>
        </Modal>
      </div>
    </div>
  );
}
