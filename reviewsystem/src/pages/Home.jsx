import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import ReviewCard from "../components/ReviewCard.jsx";

export default function Home() {
  const [message, setMessage] = useState("");
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    category: "",
    reactionType: ""
  });
  const navigate = useNavigate();

  const categories = ["", "anime", "movie", "tv show", "music", "book"];
  const reactionTypes = ["", "funny", "creative", "cringe"];

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    // Fetch welcome message
    fetch("http://localhost:4000/home", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => setMessage(data.message))
      .catch(() => navigate("/login"));

    // Fetch reviews
    fetchReviews();
  }, [navigate]);

  const fetchReviews = async () => {
    const token = localStorage.getItem("token");
    try {
      const params = new URLSearchParams();
      if (filters.category) params.append('category', filters.category);
      if (filters.reactionType) params.append('reactionType', filters.reactionType);

      const response = await fetch(`http://localhost:4000/reviews?${params}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.ok) {
        const data = await response.json();
        setReviews(data.data);
      }
    } catch (error) {
      console.error('Error fetching reviews:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleReaction = async (reviewId, reactionType) => {
    const token = localStorage.getItem("token");
    try {
      const response = await fetch(`http://localhost:4000/reviews/${reviewId}/reactions`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ reactionType })
      });

      if (response.ok) {
        // Refresh reviews to get updated reaction counts
        fetchReviews();
      }
    } catch (error) {
      console.error('Error adding reaction:', error);
    }
  };

  const handleFilterChange = (filterType, value) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: value
    }));
  };

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-violet-300 to-violet-100">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Review Hub</h1>
            <p className="text-gray-600">{message}</p>
          </div>
          <div className="flex gap-4">
            <button
              onClick={() => navigate("/review-form")}
              className="bg-violet-600 text-white px-6 py-2 rounded-lg hover:bg-violet-700 transition-colors"
            >
              Write a Review
            </button>
            <button
              onClick={logout}
              className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors"
            >
              Logout
            </button>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-lg font-semibold mb-4">Filter Reviews</h2>
          <div className="flex gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Category
              </label>
              <select
                value={filters.category}
                onChange={(e) => handleFilterChange('category', e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-violet-500"
              >
                {categories.map(category => (
                  <option key={category} value={category}>
                    {category === "" ? "All Categories" : category.charAt(0).toUpperCase() + category.slice(1)}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Reaction
              </label>
              <select
                value={filters.reactionType}
                onChange={(e) => handleFilterChange('reactionType', e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-violet-500"
              >
                {reactionTypes.map(type => (
                  <option key={type} value={type}>
                    {type === "" ? "All Reactions" : type.charAt(0).toUpperCase() + type.slice(1)}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex items-end">
              <button
                onClick={fetchReviews}
                className="bg-violet-600 text-white px-4 py-2 rounded-md hover:bg-violet-700 transition-colors"
              >
                Apply Filters
              </button>
            </div>
          </div>
        </div>

        {/* Reviews Grid */}
        {loading ? (
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-violet-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading reviews...</p>
          </div>
        ) : reviews.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-600 text-lg">No reviews found. Be the first to write one!</p>
            <button
              onClick={() => navigate("/review-form")}
              className="mt-4 bg-violet-600 text-white px-6 py-2 rounded-lg hover:bg-violet-700 transition-colors"
            >
              Write a Review
            </button>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {reviews.map((review) => (
              <ReviewCard
                key={review._id}
                review={review}
                onReaction={handleReaction}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
