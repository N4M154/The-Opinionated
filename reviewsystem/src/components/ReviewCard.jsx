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
    return review.reactions?.filter(r => r.reactionType === type).length || 0;
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getCategoryColor = (category) => {
    const colors = {
      'anime': 'bg-pink-100 text-pink-800',
      'movie': 'bg-blue-100 text-blue-800',
      'tv show': 'bg-green-100 text-green-800',
      'music': 'bg-purple-100 text-purple-800',
      'book': 'bg-yellow-100 text-yellow-800'
    };
    return colors[category] || 'bg-gray-100 text-gray-800';
  };

  return (
    <>
      <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(review.category)}`}>
                {review.category}
              </span>
              <span className="text-sm text-gray-500">
                {formatDate(review.datePosted)}
              </span>
            </div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              {review.workName}
            </h3>
            <p className="text-gray-600 text-sm mb-3">
              by {review.author?.email || 'Unknown'}
            </p>
            <p className="text-gray-700 line-clamp-3">
              {review.review}
            </p>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex gap-2">
            <button
              onClick={() => handleReaction('funny')}
              disabled={isReacting}
              className="flex items-center gap-1 px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full text-sm hover:bg-yellow-200 transition-colors disabled:opacity-50"
            >
              😂 {getReactionCount('funny')}
            </button>
            <button
              onClick={() => handleReaction('creative')}
              disabled={isReacting}
              className="flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm hover:bg-blue-200 transition-colors disabled:opacity-50"
            >
              💡 {getReactionCount('creative')}
            </button>
            <button
              onClick={() => handleReaction('cringe')}
              disabled={isReacting}
              className="flex items-center gap-1 px-3 py-1 bg-red-100 text-red-700 rounded-full text-sm hover:bg-red-200 transition-colors disabled:opacity-50"
            >
              😬 {getReactionCount('cringe')}
            </button>
          </div>
          
          <button
            onClick={() => setShowModal(true)}
            className="text-violet-600 hover:text-violet-700 text-sm font-medium"
          >
            Read Full Review
          </button>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(review.category)}`}>
                    {review.category}
                  </span>
                  <span className="text-sm text-gray-500">
                    {formatDate(review.datePosted)}
                  </span>
                </div>
                <button
                  onClick={() => setShowModal(false)}
                  className="text-gray-400 hover:text-gray-600 text-xl"
                >
                  ×
                </button>
              </div>
              
              <h2 className="text-2xl font-bold text-gray-800 mb-2">
                {review.workName}
              </h2>
              <p className="text-gray-600 mb-4">
                by {review.author?.email || 'Unknown'}
              </p>
              
              <div className="prose max-w-none">
                <p className="text-gray-700 whitespace-pre-wrap">
                  {review.review}
                </p>
              </div>
              
              <div className="flex gap-2 mt-6 pt-4 border-t">
                <button
                  onClick={() => handleReaction('funny')}
                  disabled={isReacting}
                  className="flex items-center gap-1 px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full text-sm hover:bg-yellow-200 transition-colors disabled:opacity-50"
                >
                  😂 {getReactionCount('funny')}
                </button>
                <button
                  onClick={() => handleReaction('creative')}
                  disabled={isReacting}
                  className="flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm hover:bg-blue-200 transition-colors disabled:opacity-50"
                >
                  💡 {getReactionCount('creative')}
                </button>
                <button
                  onClick={() => handleReaction('cringe')}
                  disabled={isReacting}
                  className="flex items-center gap-1 px-3 py-1 bg-red-100 text-red-700 rounded-full text-sm hover:bg-red-200 transition-colors disabled:opacity-50"
                >
                  😬 {getReactionCount('cringe')}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
} 