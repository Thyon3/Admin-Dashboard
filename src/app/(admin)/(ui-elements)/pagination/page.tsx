import Pagination from "@/components/ui/pagination/Pagination";

export default function PaginationPage() {
  const [currentPage, setCurrentPage] = useState(5);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
        Pagination
      </h1>
      
      <div className="space-y-8">
        <div className="rounded-xl border border-gray-200 dark:border-gray-800 p-6">
          <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-4">
            Basic Pagination
          </h2>
          <Pagination
            currentPage={currentPage}
            totalPages={10}
            onPageChange={setCurrentPage}
            className="max-w-2xl mx-auto"
          />
        </div>
        
        <div className="rounded-xl border border-gray-200 dark:border-gray-800 p-6">
          <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-4">
            Without First/Last
          </h2>
          <Pagination
            currentPage={currentPage}
            totalPages={15}
            onPageChange={setCurrentPage}
            showFirstLast={false}
            className="max-w-2xl mx-auto"
          />
        </div>
        
        <div className="rounded-xl border border-gray-200 dark:border-gray-800 p-6">
          <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-4">
            Without Prev/Next
          </h2>
          <Pagination
            currentPage={currentPage}
            totalPages={8}
            onPageChange={setCurrentPage}
            showPrevNext={false}
            className="max-w-2xl mx-auto"
          />
        </div>
        
        <div className="rounded-xl border border-gray-200 dark:border-gray-800 p-6">
          <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-4">
            Many Pages
          </h2>
          <Pagination
            currentPage={currentPage}
            totalPages={50}
            onPageChange={setCurrentPage}
            maxVisiblePages={7}
            className="max-w-2xl mx-auto"
          />
        </div>
      </div>
    </div>
  );
}
