import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function ReviewForm() {
  const [formData, setFormData] = useState({
    category: "",
    workName: "",
    review: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const categories = ["anime", "movie", "tv show", "music", "book"];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    const token = localStorage.getItem("token");
    if (!token) {
      setError("Please login first");
      setIsSubmitting(false);
      return;
    }

    try {
      const response = await fetch("http://localhost:4000/reviews", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        navigate("/home");
      } else {
        setError(data.message || "Failed to create review");
      }
    } catch (err) {
      setError("Network error. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden py-8 px-4">
      {/* Animated background elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-400 via-teal-500 to-cyan-600"></div>

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
      <div className="absolute top-1/3 right-1/3 w-8 h-8 bg-emerald-300/30 rounded-full animate-float-particle"></div>
      <div
        className="absolute bottom-1/3 left-1/3 w-6 h-6 bg-teal-300/30 rounded-full animate-float-particle"
        style={{ animationDelay: "1.5s" }}
      ></div>
      <div
        className="absolute top-2/3 right-1/4 w-4 h-4 bg-white/20 rounded-full animate-float-particle"
        style={{ animationDelay: "3s" }}
      ></div>

      <div className="relative z-10 max-w-2xl mx-auto form-slide-in">
        <div className="glass rounded-3xl shadow-2xl p-8 border border-white/20 hover-lift form-fade-in">
          {/* Header with icon */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse-glow icon-glow animate-bounce">
              <svg
                className="w-8 h-8 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                />
              </svg>
            </div>
            <h1 className="text-3xl font-thin text-white mb-2">
              Write a Review
            </h1>
            <p className="text-white/70">
              Share your thoughts with the community
            </p>
          </div>

          {error && (
            <div className="glass bg-red-500/20 border border-red-400/30 text-red-200 px-4 py-3 rounded-xl mb-6 animate-bounce">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="relative group">
              <label className="block text-sm font-medium text-white/80 mb-2">
                Category *
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                required
                className="w-full px-4 py-4 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-transparent transition-all duration-300 backdrop-blur-sm input-focus"
              >
                <option value="" className="bg-gray-800">
                  Select a category
                </option>
                {categories.map((category) => (
                  <option
                    key={category}
                    value={category}
                    className="bg-gray-800"
                  >
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                  </option>
                ))}
              </select>
              <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-emerald-500/20 to-teal-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></div>
            </div>

            <div className="relative group">
              <label className="block text-sm font-medium text-white/80 mb-2">
                Name of the Work *
              </label>
              <input
                type="text"
                name="workName"
                value={formData.workName}
                onChange={handleChange}
                required
                placeholder="e.g., Attack on Titan, The Matrix, Breaking Bad..."
                className="w-full px-4 py-4 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-transparent transition-all duration-300 backdrop-blur-sm input-focus"
              />
              <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-emerald-500/20 to-teal-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></div>
            </div>

            <div className="relative group">
              <label className="block text-sm font-medium text-white/80 mb-2">
                Your Review *
              </label>
              <textarea
                name="review"
                value={formData.review}
                onChange={handleChange}
                required
                rows="8"
                placeholder="Share your thoughts about this work..."
                className="w-full px-4 py-4 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-transparent transition-all duration-300 backdrop-blur-sm input-focus resize-none"
              />
              <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-emerald-500/20 to-teal-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></div>
            </div>

            <div className="flex gap-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex-1 py-4 bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-thin rounded-xl hover:from-emerald-600 hover:to-teal-600 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden"
              >
                {isSubmitting ? (
                  <div className="flex items-center justify-center">
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2"></div>
                    Posting...
                  </div>
                ) : (
                  "Post Review"
                )}
              </button>

              <button
                type="button"
                onClick={() => navigate("/home")}
                className="flex-1 py-4 bg-gradient-to-r from-gray-500 to-gray-600 text-white font-thin rounded-xl hover:from-gray-600 hover:to-gray-700 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
