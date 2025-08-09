import { useState } from "react";

export default function ReviewCard({ review, onReaction }) {
  const [showModal, setShowModal] = useState(false);
  const [isReacting, setIsReacting] = useState(false);

  const handleReaction = async (reactionType) => {
    setIsReacting(true);
    try {
      await onReaction(review._id, reactionType);
    } finally {
      setIsReacting(false);
    }
  };

  const getReactionCount = (type) => {
    return review.reactions?.filter((r) => r.reactionType === type).length || 0;
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const getCategoryColor = (category) => {
    const colors = {
      anime: "bg-pink-500/20 text-pink-300 border-pink-500/30",
      movie: "bg-blue-500/20 text-blue-300 border-blue-500/30",
      "tv show": "bg-green-500/20 text-green-300 border-green-500/30",
      music: "bg-purple-500/20 text-purple-300 border-purple-500/30",
      book: "bg-yellow-500/20 text-yellow-300 border-yellow-500/30",
    };
    return (
      colors[category] || "bg-gray-500/20 text-gray-300 border-gray-500/30"
    );
  };

  return (
    <>
      <div className="glass rounded-2xl shadow-2xl p-6 border border-white/20 hover-lift transition-all duration-200">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <span
                className={`px-3 py-1 rounded-full text-xs font-medium border ${getCategoryColor(
                  review.category
                )}`}
              >
                {review.category}
              </span>
              <span className="text-sm text-black/60 dark:text-white/50">
                {formatDate(review.datePosted)}
              </span>
            </div>
            <h3
              className={`text-lg font-medium text-${getCategoryColor(review.category)} mb-2`}
            >
              {review.workName}
            </h3>
            <p className="text-black/60 dark:text-white/50 text-sm mb-3">
              by {review.author?.email || "Unknown"}
            </p>
            <p className="text-black/60 dark:text-white font-thin line-clamp-3">
              {review.review}
            </p>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex gap-2">
            <button
              onClick={() => handleReaction("funny")}
              disabled={isReacting}
              className="flex items-center gap-1 px-3 py-2 bg-yellow-500/20 text-yellow-300 rounded-xl text-sm hover:bg-yellow-500/30 transition-all duration-200 disabled:opacity-50 hover-lift border border-yellow-500/30"
            >
              😂 {getReactionCount("funny")}
            </button>
            <button
              onClick={() => handleReaction("creative")}
              disabled={isReacting}
              className="flex items-center gap-1 px-3 py-2 bg-blue-500/20 text-blue-300 rounded-xl text-sm hover:bg-blue-500/30 transition-all duration-200 disabled:opacity-50 hover-lift border border-blue-500/30"
            >
              💡 {getReactionCount("creative")}
            </button>
            <button
              onClick={() => handleReaction("cringe")}
              disabled={isReacting}
              className="flex items-center gap-1 px-3 py-2 bg-red-500/20 text-red-300 rounded-xl text-sm hover:bg-red-500/30 transition-all duration-200 disabled:opacity-50 hover-lift border border-red-500/30"
            >
              😬 {getReactionCount("cringe")}
            </button>
          </div>

          <button
            onClick={() => setShowModal(true)}
            className="text-pink-400 font-thin hover:scale-110 hover:underline text-sm transition-all duration-200"
          >
            Read Full Review
          </button>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-pink-50/50 dark:bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 z-50 form-fade-in">
          <div className="glass rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-white/20 shadow-2xl">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium border ${getCategoryColor(
                      review.category
                    )}`}
                  >
                    {review.category}
                  </span>
                  <span className="text-sm text-black/60 dark:text-white/50">
                    {formatDate(review.datePosted)}
                  </span>
                </div>
                <button
                  onClick={() => setShowModal(false)}
                  className="text-black hover:scale-120 text-2xl transition-all duration-200"
                >
                  ×
                </button>
              </div>

              <h2
                className={`text-2xl font-thin text-${getCategoryColor(review.category)} mb-2`}
              >
                {review.workName}
              </h2>
              <p className="text-black/60 dark:text-white/50 mb-4">
                by {review.author?.email || "Unknown"}
              </p>

              <div className="prose max-w-none">
                <p className="text-black/60 dark:text-white whitespace-pre-wrap leading-relaxed">
                  {review.review}
                </p>
              </div>

              <div className="flex gap-2 mt-6 pt-4 border-t border-white/20">
                <button
                  onClick={() => handleReaction("funny")}
                  disabled={isReacting}
                  className="flex items-center gap-1 px-3 py-2 bg-yellow-500/20 text-yellow-300 rounded-xl text-sm hover:bg-yellow-500/30 transition-all duration-200 disabled:opacity-50 hover-lift border border-yellow-500/30"
                >
                  😂 {getReactionCount("funny")}
                </button>
                <button
                  onClick={() => handleReaction("creative")}
                  disabled={isReacting}
                  className="flex items-center gap-1 px-3 py-2 bg-blue-500/20 text-blue-300 rounded-xl text-sm hover:bg-blue-500/30 transition-all duration-200 disabled:opacity-50 hover-lift border border-blue-500/30"
                >
                  💡 {getReactionCount("creative")}
                </button>
                <button
                  onClick={() => handleReaction("cringe")}
                  disabled={isReacting}
                  className="flex items-center gap-1 px-3 py-2 bg-red-500/20 text-red-300 rounded-xl text-sm hover:bg-red-500/30 transition-all duration-200 disabled:opacity-50 hover-lift border border-red-500/30"
                >
                  😬 {getReactionCount("cringe")}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
