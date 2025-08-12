import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import ReviewCard from "../components/ReviewCard.jsx";
import { NotebookPen } from "lucide-react";
import Typewrite from "../components/TypeWrite.jsx";
import CatAnimations from "../components/Cat.jsx";

export default function Home() {
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
    fetchReviews();
  }, [navigate]);

  const fetchReviews = async () => {
    const token = localStorage.getItem("token");
    try {
      const params = new URLSearchParams();
      if (filters.category) params.append("category", filters.category);
      if (filters.reactionType)
        params.append("reactionType", filters.reactionType);

      const response = await fetch(`http://localhost:5000/reviews?${params}`, {
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
        `http://localhost:5000/reviews/${reviewId}/reactions`,
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

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-b from-yellow-50 to-pink-50 dark:from-black dark:to-[#18181b]">
      {/* Main section */}
      <section className="w-full min-h-screen flex flex-col justify-center items-center bg-gradient-to-b from-yellow-50 to-pink-50 dark:from-black dark:to-[#18181b]">
        <CatAnimations />
        <div className="container mx-auto px-4 py-8 flex flex-col h-[80vh]">
          {/* Header: typewriter + buttons + filter all inline */}
          <div className="flex items-center justify-between mb-8 form-slide-in gap-4 flex-nowrap">
            <Typewrite />

            {/* New wrapper for filter + buttons */}
            {/* Wrapper for filter + buttons */}
            <div className="flex items-center gap-4">
              {/* Filter - smaller width, same height as buttons */}
              <div
                className="  rounded-2xl  shadow-xl p-2 border border-white/20 transition-all duration-200 form-fade-in flex items-center gap-3"
                style={{ height: "60px", minWidth: "280px" }} // height matches typical button height, width smaller
              >
                {/* Category select */}
                <select
                  value={filters.category}
                  onChange={(e) =>
                    handleFilterChange("category", e.target.value)
                  }
                  className="px-2 py-1 bg-white/10 border text-sm dark:text-white/70 border-white/20 rounded-xl text-black focus:outline-none focus:ring-2 focus:border-transparent transition-all duration-200 backdrop-blur-sm input-focus h-full"
                  style={{ minWidth: "100px" }}
                >
                  {categories.map((category) => (
                    <option
                      key={category}
                      value={category}
                      className="bg-yellow-50 dark:bg-black/50 font-thin"
                    >
                      {category === ""
                        ? "All Categories"
                        : category.charAt(0).toUpperCase() + category.slice(1)}
                    </option>
                  ))}
                </select>

                {/* Reaction select */}
                <select
                  value={filters.reactionType}
                  onChange={(e) =>
                    handleFilterChange("reactionType", e.target.value)
                  }
                  className="px-2 py-1 bg-white/10 border text-sm dark:text-white/70 border-white/20 rounded-xl text-black focus:outline-none focus:ring-2  focus:border-transparent transition-all duration-200 backdrop-blur-sm input-focus h-full"
                  style={{ minWidth: "100px" }}
                >
                  {reactionTypes.map((type) => (
                    <option
                      key={type}
                      value={type}
                      className="bg-yellow-50 dark:bg-black/50"
                    >
                      {type === ""
                        ? "All Reactions"
                        : type.charAt(0).toUpperCase() + type.slice(1)}
                    </option>
                  ))}
                </select>

                {/* Apply Filters Button inside filter container */}
                <button
                  onClick={fetchReviews}
                  className="bg-yellow-200 text-black text-sm px-4 py-2 rounded-xl transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl whitespace-nowrap h-full"
                  style={{ minWidth: "100px" }}
                >
                  Apply
                </button>
              </div>

              {/* Buttons */}
              <div className="flex items-center gap-4">
                <button
                  onClick={() => navigate("/review-form")}
                  className=" dark:text-yellow-200 text-pink-500 rounded-xl transition-all duration-200 transform hover:scale-105  whitespace-nowrap h-[44px]"
                >
                  <NotebookPen className="w-10 h-10 inline-block mr-2 cursor-pointer" />
                </button>
              </div>
            </div>
          </div>

          {/* Reviews Grid - scrollable container */}
          <div className="flex-1 overflow-y-auto hide-scrollbar">
            {loading ? (
              <div className="text-center py-8 form-fade-in">
                <div className="  rounded-2xl p-8 border border-white/20 inline-block">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-400 mx-auto mb-4"></div>
                  <p className="text-black dark:text-white">
                    Loading reviews...
                  </p>
                </div>
              </div>
            ) : reviews.length === 0 ? (
              <div className="text-center py-8 form-fade-in">
                <div className="  rounded-2xl p-8 border border-white/20 inline-block">
                  <p className="text-black dark:text-white text-lg mb-4">
                    No reviews found. Be the first to write one!
                  </p>
                  <button
                    onClick={() => navigate("/review-form")}
                    className="bg-yellow-200 text-black dark:text-white px-6 py-3 rounded-xl transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl"
                  >
                    Write a Review
                  </button>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 form-fade-in p-6">
                <div className="lg:col-span-3 grid gap-6 md:grid-cols-2">
                  {reviews.map((review, index) => (
                    <div
                      key={review._id}
                      style={{ animationDelay: `${index * 0.1}s` }}
                      className="form-slide-in"
                    >
                      <ReviewCard
                        review={review}
                        showDelete={false}
                        onReaction={handleReaction}
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
