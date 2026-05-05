import Carousel from "@/components/ui/carousel/Carousel";

export default function CarouselPage() {
  const carouselItems = [
    {
      id: "1",
      title: "Slide 1",
      content: (
        <div className="bg-gradient-to-r from-blue-500 to-purple-600 h-64 flex items-center justify-center text-white text-2xl font-bold rounded-lg">
          Slide 1 - Beautiful Gradient
        </div>
      )
    },
    {
      id: "2", 
      title: "Slide 2",
      content: (
        <div className="bg-gradient-to-r from-green-500 to-teal-600 h-64 flex items-center justify-center text-white text-2xl font-bold rounded-lg">
          Slide 2 - Fresh Colors
        </div>
      )
    },
    {
      id: "3",
      title: "Slide 3", 
      content: (
        <div className="bg-gradient-to-r from-orange-500 to-red-600 h-64 flex items-center justify-center text-white text-2xl font-bold rounded-lg">
          Slide 3 - Warm Vibes
        </div>
      )
    }
  ];

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
        Carousel
      </h1>
      
      <div className="space-y-8">
        <div className="rounded-xl border border-gray-200 dark:border-gray-800 p-6">
          <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-4">
            Basic Carousel
          </h2>
          <Carousel
            items={carouselItems}
            showDots={true}
            showArrows={true}
            className="max-w-2xl mx-auto"
          />
        </div>
        
        <div className="rounded-xl border border-gray-200 dark:border-gray-800 p-6">
          <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-4">
            Auto-play Carousel
          </h2>
          <Carousel
            items={carouselItems}
            autoPlay={true}
            interval={2000}
            showDots={true}
            showArrows={false}
            className="max-w-2xl mx-auto"
          />
        </div>
      </div>
    </div>
  );
}
