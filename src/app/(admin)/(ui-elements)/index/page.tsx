export default function UIElementsIndexPage() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
        UI Elements
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="rounded-xl border border-gray-200 dark:border-gray-800 p-6 hover:shadow-lg transition-shadow">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
            Buttons
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            Various button styles and sizes for different actions.
          </p>
          <a href="/admin/ui-elements/buttons" className="text-brand-500 hover:text-brand-600 font-medium">
            View Buttons →
          </a>
        </div>

        <div className="rounded-xl border border-gray-200 dark:border-gray-800 p-6 hover:shadow-lg transition-shadow">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
            Alerts
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            Notification alerts for success, error, warning, and info messages.
          </p>
          <a href="/admin/ui-elements/alerts" className="text-brand-500 hover:text-brand-600 font-medium">
            View Alerts →
          </a>
        </div>

        <div className="rounded-xl border border-gray-200 dark:border-gray-800 p-6 hover:shadow-lg transition-shadow">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
            Badges
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            Small badges for status indicators and labels.
          </p>
          <a href="/admin/ui-elements/badges" className="text-brand-500 hover:text-brand-600 font-medium">
            View Badges →
          </a>
        </div>

        <div className="rounded-xl border border-gray-200 dark:border-gray-800 p-6 hover:shadow-lg transition-shadow">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
            Avatars
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            User avatars with images, status indicators, and initials.
          </p>
          <a href="/admin/ui-elements/avatars" className="text-brand-500 hover:text-brand-600 font-medium">
            View Avatars →
          </a>
        </div>

        <div className="rounded-xl border border-gray-200 dark:border-gray-800 p-6 hover:shadow-lg transition-shadow">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
            Modals
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            Dialog overlays for user interactions and confirmations.
          </p>
          <a href="/admin/ui-elements/modals" className="text-brand-500 hover:text-brand-600 font-medium">
            View Modals →
          </a>
        </div>

        <div className="rounded-xl border border-gray-200 dark:border-gray-800 p-6 hover:shadow-lg transition-shadow">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
            Forms
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            Input fields, checkboxes, switches, and form controls.
          </p>
          <a href="/admin/ui-elements/forms" className="text-brand-500 hover:text-brand-600 font-medium">
            View Forms →
          </a>
        </div>

        <div className="rounded-xl border border-gray-200 dark:border-gray-800 p-6 hover:shadow-lg transition-shadow">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
            Loading
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            Spinners and skeleton loaders for loading states.
          </p>
          <a href="/admin/ui-elements/loading" className="text-brand-500 hover:text-brand-600 font-medium">
            View Loading →
          </a>
        </div>

        <div className="rounded-xl border border-gray-200 dark:border-gray-800 p-6 hover:shadow-lg transition-shadow">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
            Carousel
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            Interactive carousels with auto-play and navigation.
          </p>
          <a href="/admin/ui-elements/carousel" className="text-brand-500 hover:text-brand-600 font-medium">
            View Carousel →
          </a>
        </div>

        <div className="rounded-xl border border-gray-200 dark:border-gray-800 p-6 hover:shadow-lg transition-shadow">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
            Steps
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            Multi-step process indicators with status tracking.
          </p>
          <a href="/admin/ui-elements/steps" className="text-brand-500 hover:text-brand-600 font-medium">
            View Steps →
          </a>
        </div>
      </div>
    </div>
  );
}
