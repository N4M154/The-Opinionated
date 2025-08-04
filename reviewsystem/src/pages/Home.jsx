import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import ReviewCard from "../components/ReviewCard.jsx";

export default function Home() {
  const [message, setMessage] = useState("");
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    category: "",
    reactionType: "",
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
      if (filters.category) params.append("category", filters.category);
      if (filters.reactionType)
        params.append("reactionType", filters.reactionType);

      const response = await fetch(`http://localhost:4000/reviews?${params}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.ok) {
        const data = await response.json();
        setReviews(data.data);
      }
    } catch (error) {
      console.error("Error fetching reviews:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleReaction = async (reviewId, reactionType) => {
    const token = localStorage.getItem("token");
    try {
      const response = await fetch(
        `http://localhost:4000/reviews/${reviewId}/reactions`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ reactionType }),
        }
      );

      if (response.ok) {
        // Refresh reviews to get updated reaction counts
        fetchReviews();
      }
    } catch (error) {
      console.error("Error adding reaction:", error);
    }
  };

  const handleFilterChange = (filterType, value) => {
    setFilters((prev) => ({
      ...prev,
      [filterType]: value,
    }));
  };

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-violet-400 via-purple-500 to-indigo-600"></div>

      {/* Floating orbs */}
      <div className="absolute top-20 left-20 w-32 h-32 bg-white/10 rounded-full animate-float blur-xl"></div>
      <div
        className="absolute bottom-20 right-20 w-24 h-24 bg-white/10 rounded-full animate-float blur-xl"
        style={{ animationDelay: "1s" }}
      ></div>
      <div
        className="absolute top-1/2 left-1/4 w-16 h-16 bg-white/10 rounded-full animate-float blur-xl"
        style={{ animationDelay: "2s" }}
      ></div>

      {/* Additional floating particles */}
      <div className="absolute top-1/3 right-1/3 w-8 h-8 bg-violet-300/30 rounded-full animate-float-particle"></div>
      <div
        className="absolute bottom-1/3 left-1/3 w-6 h-6 bg-purple-300/30 rounded-full animate-float-particle"
        style={{ animationDelay: "1.5s" }}
      ></div>
      <div
        className="absolute top-2/3 right-1/4 w-4 h-4 bg-white/20 rounded-full animate-float-particle"
        style={{ animationDelay: "3s" }}
      ></div>

      <div className="relative z-10 container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8 form-slide-in">
          <div className="glass rounded-2xl p-6 border border-white/20">
            <h1 className="text-3xl font-thin text-white mb-2">Review Hub</h1>
            <p className="text-white/80">{message}</p>
          </div>
          <div className="flex gap-4">
            <button
              onClick={() => navigate("/review-form")}
              className="bg-gradient-to-r from-violet-500 to-purple-600 text-white px-6 py-3 rounded-xl hover:from-violet-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl hover-lift"
            >
              Write a Review
            </button>
            <button
              onClick={logout}
              className="bg-gradient-to-r from-red-500 to-pink-600 text-white px-4 py-3 rounded-xl hover:from-red-600 hover:to-pink-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl hover-lift"
            >
              Logout
            </button>
          </div>
        </div>

        {/* Filters */}
        <div className="glass rounded-2xl shadow-2xl p-6 mb-8 border border-white/20 hover-lift form-fade-in">
          <h2 className="text-lg font-thin mb-4 text-white">Filter Reviews</h2>
          <div className="flex gap-4">
            <div>
              <label className="block text-sm font-medium text-white/80 mb-2">
                Category
              </label>
              <select
                value={filters.category}
                onChange={(e) => handleFilterChange("category", e.target.value)}
                className="px-3 py-2 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-violet-400 focus:border-transparent transition-all duration-300 backdrop-blur-sm input-focus"
              >
                {categories.map((category) => (
                  <option
                    key={category}
                    value={category}
                    className="bg-gray-800"
                  >
                    {category === ""
                      ? "All Categories"
                      : category.charAt(0).toUpperCase() + category.slice(1)}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-white/80 mb-2">
                Reaction
              </label>
              <select
                value={filters.reactionType}
                onChange={(e) =>
                  handleFilterChange("reactionType", e.target.value)
                }
                className="px-3 py-2 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-violet-400 focus:border-transparent transition-all duration-300 backdrop-blur-sm input-focus"
              >
                {reactionTypes.map((type) => (
                  <option key={type} value={type} className="bg-gray-800">
                    {type === ""
                      ? "All Reactions"
                      : type.charAt(0).toUpperCase() + type.slice(1)}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex items-end">
              <button
                onClick={fetchReviews}
                className="bg-gradient-to-r from-violet-500 to-purple-600 text-white px-4 py-2 rounded-xl hover:from-violet-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl hover-lift"
              >
                Apply Filters
              </button>
            </div>
          </div>
        </div>

        {/* Reviews Grid */}
        {loading ? (
          <div className="text-center py-8 form-fade-in">
            <div className="glass rounded-2xl p-8 border border-white/20 inline-block">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-violet-400 mx-auto mb-4"></div>
              <p className="text-white/80">Loading reviews...</p>
            </div>
          </div>
        ) : reviews.length === 0 ? (
          <div className="text-center py-8 form-fade-in">
            <div className="glass rounded-2xl p-8 border border-white/20 inline-block">
              <p className="text-white/80 text-lg mb-4">
                No reviews found. Be the first to write one!
              </p>
              <button
                onClick={() => navigate("/review-form")}
                className="bg-gradient-to-r from-violet-500 to-purple-600 text-white px-6 py-3 rounded-xl hover:from-violet-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl hover-lift"
              >
                Write a Review
              </button>
            </div>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 form-fade-in">
            {reviews.map((review, index) => (
              <div
                key={review._id}
                style={{ animationDelay: `${index * 0.1}s` }}
                className="form-slide-in"
              >
                <ReviewCard review={review} onReaction={handleReaction} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
