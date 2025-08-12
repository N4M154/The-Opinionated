import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ReviewCard from "../components/ReviewCard";
import { NotebookPen } from "lucide-react";

export default function Profile() {
  const [userEmail, setUserEmail] = useState("");
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState(
    localStorage.getItem("activeTab") || "profile"
  );
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.setItem("activeTab", activeTab);
  }, [activeTab]);

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/login");
        return;
      }

      try {
        // Fetch profile info
        const response = await fetch("http://localhost:5000/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (response.ok) {
          const data = await response.json();
          setUserEmail(data.email);

          // Fetch user's reviews
          const reviewsRes = await fetch("http://localhost:5000/user/reviews", {
            headers: { Authorization: `Bearer ${token}` },
          });
          if (reviewsRes.ok) {
            const reviewsData = await reviewsRes.json();
            setReviews(reviewsData.data);
          }
        } else {
          localStorage.removeItem("token");
          navigate("/login");
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
        navigate("/login");
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("activeTab");
    navigate("/");
  };

  const handleDeleteReview = async (reviewId) => {
    const token = localStorage.getItem("token");
    try {
      const response = await fetch(
        `http://localhost:5000/reviews/${reviewId}`,
        {
          method: "DELETE",
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (response.ok) {
        // Remove the deleted review from state
        setReviews(reviews.filter((review) => review._id !== reviewId));
      } else {
        console.error("Failed to delete review");
      }
    } catch (error) {
      console.error("Error deleting review:", error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-gradient-to-b from-yellow-50 to-pink-50 dark:from-black dark:to-[#18181b]">
        <div className="relative z-10 text-center form-fade-in">
          <div className="  rounded-2xl p-8 border border-white/20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-400 mx-auto mb-4"></div>
            <p className="text-white/80">Loading profile...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex bg-gradient-to-b from-yellow-50 to-pink-50 dark:from-black dark:to-[#18181b]">
      {/* Sidebar */}
      <aside className="w-60 bg-white/20 dark:bg-black/40 p-8 flex flex-col items-center border-r border-white/20">
        {/* Profile icon */}
        <div className="mb-8">
          <div className="w-20 h-20 bg-pink-300/70 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse-glow icon-glow">
            <svg
              className="w-10 h-10 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              />
            </svg>
          </div>
        </div>

        {/* Navigation buttons */}
        <button
          className={`w-full py-3 mb-2 rounded-lg font-thin  ${
            activeTab === "profile"
              ? "bg-yellow-200 text-black"
              : "bg-white dark:bg-white/10 text-black/60 dark:text-yellow-200 cursor-pointer"
          }`}
          onClick={() => setActiveTab("profile")}
        >
          Profile Info
        </button>
        <button
          className={`w-full py-3 rounded-lg font-thin  ${
            activeTab === "reviews"
              ? "bg-yellow-200 text-black"
              : "bg-white dark:bg-white/10 text-black/60 dark:text-yellow-200 cursor-pointer"
          }`}
          onClick={() => setActiveTab("reviews")}
        >
          Posted Reviews
        </button>
        <button
          onClick={handleLogout}
          className="w-full mt-auto py-3 bg-yellow-300/50 dark:bg-yellow-200 text-black font-thin rounded-xl hover:from-red-600 hover:to-pink-700 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl"
        >
          Logout
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center p-6">
        <div className="max-w-6xl w-full px-6">
          {activeTab === "profile" ? (
            <div className="rounded-3xl  shadow-xl p-8 border border-white/20 form-fade-in bg-white/30 dark:bg-black/30">
              {/* PROFILE container with unique padding, bg, etc */}
              <h1 className="text-3xl font-thin text-black dark:text-yellow-100 mb-6 tracking-wide">
                Profile
              </h1>
              <p className="font-thin text-black dark:text-pink-50 mb-8 max-w-md leading-relaxed">
                Your account information
              </p>
              <div className="space-y-8">
                <div>
                  <label className="block text-sm font-thin text-black mb-2 dark:text-yellow-200">
                    Email Address
                  </label>
                  <p className="text-lg text-black font-light dark:text-yellow-100">
                    {userEmail}
                  </p>
                </div>
                <div className="  bg-white/10 rounded-2xl p-6 border border-white/30 shadow-md flex items-center gap-3">
                  <div className="w-4 h-4 bg-pink-400 rounded-full animate-pulse"></div>
                  <span className="text-pink-300 font-semibold">Active</span>
                </div>
              </div>
            </div>
          ) : (
            <div>
              {/* REVIEWS container with its own padding, bg, etc */}
              <h1 className="text-3xl font-thin text-black dark:text-white mb-8 tracking-tight flex justify-center">
                Your Hot Takes
              </h1>

              {reviews.length === 0 ? (
                <div>
                  <p className="text-black dark:text-pink-200 font-thin flex justify-center items-center gap-4">
                    You haven't posted anything yet! Leave your first review
                  </p>
                  <div className="flex justify-center mt-4">
                    <button
                      onClick={() => navigate("/review-form")}
                      className=" dark:text-yellow-200 text-pink-500 rounded-xl transition-all duration-200 transform hover:scale-105  whitespace-nowrap h-[44px]"
                    >
                      <NotebookPen className="w-10 h-10 inline-block mr-2" />
                    </button>
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-8">
                  {reviews.map((review) => (
                    <ReviewCard
                      key={review._id}
                      review={review}
                      showDelete={true}
                      onDelete={handleDeleteReview}
                      // onReaction={handleReaction}
                    />
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
