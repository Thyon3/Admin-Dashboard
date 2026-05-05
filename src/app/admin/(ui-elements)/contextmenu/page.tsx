import ContextMenu from "@/components/ui/contextmenu/ContextMenu";

export default function ContextMenuPage() {
  const basicItems = [
    { id: "1", label: "Copy", onClick: () => alert("Copy clicked") },
    { id: "2", label: "Paste", onClick: () => alert("Paste clicked") },
    { id: "3", label: "Cut", onClick: () => alert("Cut clicked") },
  ];

  const iconItems = [
    { 
      id: "1", 
      label: "Edit", 
      icon: <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
      </svg>,
      onClick: () => alert("Edit clicked")
    },
    { 
      id: "2", 
      label: "Delete", 
      icon: <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
      </svg>,
      danger: true,
      onClick: () => alert("Delete clicked")
    },
  ];

  const disabledItems = [
    { id: "1", label: "Enabled", onClick: () => alert("Enabled clicked") },
    { id: "2", label: "Disabled", disabled: true, onClick: () => alert("Should not fire") },
    { id: "3", label: "Another Enabled", onClick: () => alert("Another enabled clicked") },
  ];

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
        Context Menu
      </h1>
      
      <div className="space-y-8">
        <div className="rounded-xl border border-gray-200 dark:border-gray-800 p-6">
          <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-4">
            Basic Context Menu
          </h2>
          <ContextMenu items={basicItems}>
            <div className="p-8 bg-gray-50 dark:bg-gray-900 rounded-lg text-center text-gray-600 dark:text-gray-400">
              Right-click here for basic menu
            </div>
          </ContextMenu>
        </div>
        
        <div className="rounded-xl border border-gray-200 dark:border-gray-800 p-6">
          <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-4">
            Context Menu with Icons
          </h2>
          <ContextMenu items={iconItems}>
            <div className="p-8 bg-gray-50 dark:bg-gray-900 rounded-lg text-center text-gray-600 dark:text-gray-400">
              Right-click here for menu with icons
            </div>
          </ContextMenu>
        </div>
        
        <div className="rounded-xl border border-gray-200 dark:border-gray-800 p-6">
          <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-4">
            Context Menu with Disabled Items
          </h2>
          <ContextMenu items={disabledItems}>
            <div className="p-8 bg-gray-50 dark:bg-gray-900 rounded-lg text-center text-gray-600 dark:text-gray-400">
              Right-click here for menu with disabled items
            </div>
          </ContextMenu>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <ContextMenu items={basicItems}>
            <div className="p-6 bg-blue-50 dark:bg-blue-900/20 rounded-lg text-center text-blue-600 dark:text-blue-400">
              <h3 className="font-semibold mb-2">Basic Menu</h3>
              <p className="text-sm">Right-click</p>
            </div>
          </ContextMenu>
          
          <ContextMenu items={iconItems}>
            <div className="p-6 bg-green-50 dark:bg-green-900/20 rounded-lg text-center text-green-600 dark:text-green-400">
              <h3 className="font-semibold mb-2">Icon Menu</h3>
              <p className="text-sm">Right-click</p>
            </div>
          </ContextMenu>
          
          <ContextMenu items={disabledItems}>
            <div className="p-6 bg-purple-50 dark:bg-purple-900/20 rounded-lg text-center text-purple-600 dark:text-purple-400">
              <h3 className="font-semibold mb-2">Disabled Menu</h3>
              <p className="text-sm">Right-click</p>
            </div>
          </ContextMenu>
        </div>
      </div>
    </div>
  );
}
