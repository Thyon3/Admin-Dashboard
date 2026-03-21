import Tag from "@/components/ui/tag/Tag";

export default function TagPage() {
  const [tags, setTags] = useState([
    { id: 1, text: "React", color: "primary" as const },
    { id: 2, text: "TypeScript", color: "success" as const },
    { id: 3, text: "Next.js", color: "warning" as const },
    { id: 4, text: "Tailwind", color: "error" as const },
    { id: 5, text: "JavaScript", color: "gray" as const },
  ]);

  const handleRemoveTag = (id: number) => {
    setTags(prev => prev.filter(tag => tag.id !== id));
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
        Tags
      </h1>
      
      <div className="space-y-8">
        <div className="rounded-xl border border-gray-200 dark:border-gray-800 p-6">
          <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-4">
            Default Variants
          </h2>
          <div className="flex flex-wrap gap-2">
            <Tag color="primary">Primary</Tag>
            <Tag color="success">Success</Tag>
            <Tag color="error">Error</Tag>
            <Tag color="warning">Warning</Tag>
            <Tag color="gray">Gray</Tag>
          </div>
        </div>
        
        <div className="rounded-xl border border-gray-200 dark:border-gray-800 p-6">
          <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-4">
            Outlined Variants
          </h2>
          <div className="flex flex-wrap gap-2">
            <Tag variant="outlined" color="primary">Primary</Tag>
            <Tag variant="outlined" color="success">Success</Tag>
            <Tag variant="outlined" color="error">Error</Tag>
            <Tag variant="outlined" color="warning">Warning</Tag>
            <Tag variant="outlined" color="gray">Gray</Tag>
          </div>
        </div>
        
        <div className="rounded-xl border border-gray-200 dark:border-gray-800 p-6">
          <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-4">
            Filled Variants
          </h2>
          <div className="flex flex-wrap gap-2">
            <Tag variant="filled" color="primary">Primary</Tag>
            <Tag variant="filled" color="success">Success</Tag>
            <Tag variant="filled" color="error">Error</Tag>
            <Tag variant="filled" color="warning">Warning</Tag>
            <Tag variant="filled" color="gray">Gray</Tag>
          </div>
        </div>
        
        <div className="rounded-xl border border-gray-200 dark:border-gray-800 p-6">
          <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-4">
            Size Variants
          </h2>
          <div className="space-y-4">
            <div className="flex flex-wrap gap-2">
              <Tag size="sm" color="primary">Small</Tag>
              <Tag size="sm" color="success">Small</Tag>
              <Tag size="sm" color="error">Small</Tag>
            </div>
            <div className="flex flex-wrap gap-2">
              <Tag size="md" color="primary">Medium</Tag>
              <Tag size="md" color="success">Medium</Tag>
              <Tag size="md" color="error">Medium</Tag>
            </div>
            <div className="flex flex-wrap gap-2">
              <Tag size="lg" color="primary">Large</Tag>
              <Tag size="lg" color="success">Large</Tag>
              <Tag size="lg" color="error">Large</Tag>
            </div>
          </div>
        </div>
        
        <div className="rounded-xl border border-gray-200 dark:border-gray-800 p-6">
          <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-4">
            Removable Tags
          </h2>
          <div className="flex flex-wrap gap-2">
            {tags.map(tag => (
              <Tag
                key={tag.id}
                color={tag.color}
                removable
                onRemove={() => handleRemoveTag(tag.id)}
              >
                {tag.text}
              </Tag>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
