import YouTubeEmbed from "@/components/ui/video/YouTubeEmbed";

export default function VideosPage() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
        Videos
      </h1>
      
      <div className="space-y-8">
        <div>
          <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-4">
            Video Embeds
          </h2>
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            <div>
              <h3 className="text-md font-medium text-gray-600 dark:text-gray-400 mb-2">
                16:9 Aspect Ratio
              </h3>
              <YouTubeEmbed videoId="dQw4w9WgXcQ" />
            </div>
            <div>
              <h3 className="text-md font-medium text-gray-600 dark:text-gray-400 mb-2">
                4:3 Aspect Ratio
              </h3>
              <YouTubeEmbed videoId="dQw4w9WgXcQ" aspectRatio="4:3" />
            </div>
            <div>
              <h3 className="text-md font-medium text-gray-600 dark:text-gray-400 mb-2">
                21:9 Aspect Ratio
              </h3>
              <YouTubeEmbed videoId="dQw4w9WgXcQ" aspectRatio="21:9" />
            </div>
            <div>
              <h3 className="text-md font-medium text-gray-600 dark:text-gray-400 mb-2">
                1:1 Aspect Ratio
              </h3>
              <YouTubeEmbed videoId="dQw4w9WgXcQ" aspectRatio="1:1" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
