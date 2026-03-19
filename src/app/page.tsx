export default function HomePage() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
          Welcome to Next Admin Dashboard
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
          A modern admin dashboard built with Next.js and Tailwind CSS
        </p>
        <a 
          href="/admin" 
          className="inline-flex items-center px-6 py-3 bg-brand-500 text-white font-medium rounded-lg hover:bg-brand-600 transition-colors"
        >
          Go to Dashboard
        </a>
      </div>
    </div>
  );
}
