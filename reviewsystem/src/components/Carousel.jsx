import { useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Heart,
  Lightbulb,
  Laugh,
  BookOpen,
  Film,
  Music,
  Tv,
  Star,
} from "lucide-react";

const dummyReviews = [
  {
    id: 1,
    workName: "Attack on Titan",
    category: "anime",
    authorName: "Eren Jaeger",
    review:
      "This anime completely changed my perspective on freedom and the cost of war. The character development is phenomenal, especially watching Eren's transformation throughout the series. The animation quality in the final seasons is absolutely breathtaking.",
    datePosted: "2024-01-15",
    reactions: { funny: 12, creative: 45, cringe: 3 },
  },
  {
    id: 2,
    workName: "Interstellar",
    category: "movie",
    authorName: "Cooper",
    review:
      "Nolan's masterpiece that beautifully blends science fiction with human emotion. The visual effects are stunning, and the soundtrack by Hans Zimmer gives me chills every time. The love transcends dimensions theme hit me right in the feels.",
    datePosted: "2024-01-10",
    reactions: { funny: 8, creative: 67, cringe: 1 },
  },
  {
    id: 3,
    workName: "The Last of Us",
    category: "tv show",
    authorName: "Joel Miller",
    review:
      "HBO's adaptation exceeded all expectations. Pedro Pascal and Bella Ramsey's chemistry is perfect. The show captures the essence of survival in a post-apocalyptic world while maintaining the emotional core of the original game.",
    datePosted: "2024-01-08",
    reactions: { funny: 5, creative: 52, cringe: 2 },
  },
  {
    id: 4,
    workName: "Bohemian Rhapsody",
    category: "music",
    authorName: "Freddie Mercury",
    review:
      "Queen's music is timeless. This soundtrack takes you on an emotional journey through rock history. Every track is a masterpiece that showcases Freddie's incredible vocal range and the band's musical genius.",
    datePosted: "2024-01-05",
    reactions: { funny: 15, creative: 89, cringe: 4 },
  },
  {
    id: 5,
    workName: "Dune",
    category: "book",
    authorName: "Paul Atreides",
    review:
      "Frank Herbert's epic world-building is unmatched. The political intrigue, ecological themes, and spiritual elements create a rich tapestry that rewards multiple readings. A true science fiction masterpiece that influenced countless works.",
    datePosted: "2024-01-03",
    reactions: { funny: 7, creative: 73, cringe: 1 },
  },
];

export default function Carousel3D() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % dummyReviews.length);
  };

  const prevSlide = () => {
    setCurrentIndex(
      (prev) => (prev - 1 + dummyReviews.length) % dummyReviews.length
    );
  };

  const getCategoryColor = (category) => {
    const colors = {
      anime:
        "bg-pink-500/20 text-pink-600 dark:text-pink-400 border-pink-500/30",
      movie:
        "bg-blue-500/20 text-blue-600 dark:text-blue-400 border-blue-500/30",
      "tv show":
        "bg-green-500/20 text-green-600 dark:text-green-400 border-green-500/30",
      music:
        "bg-purple-500/20 text-purple-600 dark:text-purple-400 border-purple-500/30",
      book: "bg-yellow-500/20 text-yellow-600 dark:text-yellow-400 border-yellow-500/30",
    };
    return (
      colors[category] ||
      "bg-gray-500/20 text-gray-600 dark:text-gray-300 border-gray-500/30"
    );
  };

  const getCategoryShadow = (category) => {
    const shadows = {
      anime: "shadow-pink-500/20",
      movie: "shadow-blue-500/20",
      "tv show": "shadow-green-500/20",
      music: "shadow-purple-500/20",
      book: "shadow-yellow-500/20",
    };
    return shadows[category] || "shadow-gray-500/20";
  };

  const getCategoryIcon = (category) => {
    const icons = {
      anime: Star,
      movie: Film,
      "tv show": Tv,
      music: Music,
      book: BookOpen,
    };
    const Icon = icons[category] || BookOpen;
    return <Icon className="w-4 h-4" />;
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div className="relative w-full h-[600px] flex items-center justify-center overflow-hidden">
      {/* Carousel Container */}
      <div className="relative w-full h-full perspective-1000">
        <div
          className="relative w-full h-full preserve-3d transition-transform duration-700 ease-in-out"
          style={{
            transformStyle: "preserve-3d",
            transform: `rotateY(${-currentIndex * 72}deg)`,
          }}
        >
          {dummyReviews.map((review, index) => {
            const angle = index * 72; // 360 / 5 = 72 degrees
            const isActive = index === currentIndex;

            return (
              <div
                key={review.id}
                className={`absolute top-1/2 left-1/2 w-80 h-96 -translate-x-1/2 -translate-y-1/2 transition-all duration-700 preserve-3d ${
                  isActive ? "z-20" : "z-10"
                }`}
                style={{
                  transform: `rotateY(${angle}deg) translateZ(300px) ${isActive ? "scale(1.1)" : "scale(0.9)"}`,
                  transformStyle: "preserve-3d",
                }}
              >
                {/* Card */}
                <div
                  className={`w-full h-full bg-gradient-to-br from-white/90 to-white/70 dark:from-white/10 dark:to-white/5 backdrop-blur-md rounded-3xl border border-gray-200/50 dark:border-white/20 shadow-2xl p-6 overflow-hidden transition-all duration-500 ${
                    isActive
                      ? `${getCategoryShadow(review.category)} border-opacity-50`
                      : ""
                  }`}
                >
                  {/* Card Header */}
                  <div className="flex items-center gap-3 mb-4">
                    <div
                      className={`p-2 rounded-xl ${getCategoryColor(review.category)}`}
                    >
                      {getCategoryIcon(review.category)}
                    </div>
                    <div>
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium border ${getCategoryColor(review.category)}`}
                      >
                        {review.category}
                      </span>
                    </div>
                  </div>

                  {/* Title and Author */}
                  <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2 line-clamp-1">
                    {review.workName}
                  </h3>
                  <p className="text-gray-600 dark:text-white/70 text-sm mb-3">
                    by {review.authorName}
                  </p>

                  {/* Review Text */}
                  <p className="text-gray-700 dark:text-white/80 text-sm leading-relaxed line-clamp-6 mb-4">
                    {review.review}
                  </p>

                  {/* Reactions */}
                  <div className="flex items-center gap-2 mb-3">
                    <button className="flex items-center gap-1 px-3 py-1 bg-yellow-500/20 text-yellow-600 dark:text-yellow-300 rounded-lg text-xs hover:bg-yellow-500/30 transition-all duration-200 border border-yellow-500/30">
                      <Laugh className="w-3 h-3" />
                      {review.reactions.funny}
                    </button>
                    <button className="flex items-center gap-1 px-3 py-1 bg-blue-500/20 text-blue-600 dark:text-blue-300 rounded-lg text-xs hover:bg-blue-500/30 transition-all duration-200 border border-blue-500/30">
                      <Lightbulb className="w-3 h-3" />
                      {review.reactions.creative}
                    </button>
                    <button className="flex items-center gap-1 px-3 py-1 bg-red-500/20 text-red-600 dark:text-red-300 rounded-lg text-xs hover:bg-red-500/30 transition-all duration-200 border border-red-500/30">
                      <Heart className="w-3 h-3" />
                      {review.reactions.cringe}
                    </button>
                  </div>

                  {/* Date */}
                  <div className="flex items-center justify-between">
                    <span className="text-gray-500 dark:text-white/50 text-xs">
                      {formatDate(review.datePosted)}
                    </span>
                    <button className="text-pink-600 dark:text-pink-400 hover:text-pink-500 dark:hover:text-pink-300 text-sm hover:underline transition-all duration-200">
                      Read More
                    </button>
                  </div>

                  {/* Decorative Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-gray-100/20 dark:to-white/5 rounded-3xl pointer-events-none" />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Navigation Buttons */}
      <button
        onClick={prevSlide}
        className="absolute left-8 top-1/2 -translate-y-1/2 z-30 p-3 bg-white/80 dark:bg-white/10 hover:bg-white/90 dark:hover:bg-white/20 backdrop-blur-sm rounded-full border border-gray-200 dark:border-white/20 text-gray-700 dark:text-white hover:text-pink-600 dark:hover:text-pink-300 transition-all duration-200 hover:scale-110 shadow-lg"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-8 top-1/2 -translate-y-1/2 z-30 p-3 bg-white/80 dark:bg-white/10 hover:bg-white/90 dark:hover:bg-white/20 backdrop-blur-sm rounded-full border border-gray-200 dark:border-white/20 text-gray-700 dark:text-white hover:text-pink-600 dark:hover:text-pink-300 transition-all duration-200 hover:scale-110 shadow-lg"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Indicators */}
      <div className="absolute bottom-1 left-1/2 -translate-x-1/2 z-30 flex gap-2">
        {dummyReviews.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-3 h-3 rounded-full transition-all duration-200 -mt-12 ${
              index === currentIndex
                ? "bg-pink-400 scale-125"
                : "bg-white dark:bg-white/10 hover:bg-white/50"
            }`}
          />
        ))}
      </div>

      {/* Ambient Light Effect */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-radial from-pink-500/20 dark:from-pink-500/10 via-yellow-500/10 dark:via-purple-500/5 to-transparent rounded-full blur-3xl" />
      </div>
    </div>
  );
}
