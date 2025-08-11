import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Profile() {
  const [userEmail, setUserEmail] = useState("");
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("profile"); // NEW
  const navigate = useNavigate();

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
    navigate("/");
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-gradient-to-b from-yellow-50 to-pink-50 dark:from-black dark:to-[#18181b]">
        <div className="relative z-10 text-center form-fade-in">
          <div className="glass rounded-2xl p-8 border border-white/20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-400 mx-auto mb-4"></div>
            <p className="text-white/80">Loading profile...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex bg-gradient-to-b from-yellow-50 to-pink-50 dark:from-black dark:to-[#18181b]">
      {/* Sidebar */}
      <aside className="w-64 bg-white/20 dark:bg-black/40 p-8 flex flex-col items-center border-r border-white/20">
        <div className="mb-8">
          <div className="w-20 h-20 bg-pink-300 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse-glow icon-glow animate-bounce">
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
        <button
          className={`w-full py-3 mb-2 rounded-lg font-medium ${
            activeTab === "profile"
              ? "bg-yellow-300 text-black"
              : "bg-white/10 text-black/60 dark:text-yellow-200"
          }`}
          onClick={() => setActiveTab("profile")}
        >
          Profile Info
        </button>
        <button
          className={`w-full py-3 rounded-lg font-medium ${
            activeTab === "reviews"
              ? "bg-yellow-300 text-black"
              : "bg-white/10 text-black/60 dark:text-yellow-200"
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
      <main className="flex-1 flex items-center justify-center">
        <div className="max-w-xl w-full px-6">
          <div className="glass rounded-3xl shadow-2xl p-8 border border-white/20 form-fade-in">
            {activeTab === "profile" ? (
              <>
                <h1 className="text-3xl font-thin text-black dark:text-yellow-200 mb-2">
                  Profile
                </h1>
                <p className="font-thin text-black dark:text-yellow-200 mb-8">
                  Your account information
                </p>
                <div className="space-y-6">
                  <div className="glass bg-white/10 rounded-xl p-4 border border-white/20">
                    <label className="block text-sm font-medium text-black mb-2">
                      Email Address
                    </label>
                    <p className="text-lg text-black font-thin">{userEmail}</p>
                  </div>
                  <div className="glass bg-white/10 rounded-xl p-4 border border-white/20">
                    <label className="block text-sm font-medium text-black mb-2">
                      Account Status
                    </label>
                    <div className="flex items-center">
                      <div className="w-3 h-3 bg-yellow-400 rounded-full mr-2 animate-pulse"></div>
                      <span className="text-yellow-400 font-medium">
                        Active
                      </span>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <>
                <h1 className="text-3xl font-thin text-black dark:text-yellow-200 mb-2">
                  Your Posted Reviews
                </h1>
                <div className="glass bg-white/10 rounded-xl p-4 border border-white/20">
                  {reviews.length === 0 ? (
                    <p className="text-black/60">
                      You haven't posted any reviews yet.
                    </p>
                  ) : (
                    <ul className="space-y-4">
                      {reviews.map((review) => (
                        <li
                          key={review._id}
                          className="bg-yellow-100/40 dark:bg-black/30 rounded-lg p-3"
                        >
                          <div className="font-semibold text-black dark:text-yellow-200">
                            {review.workName}
                          </div>
                          <div className="text-xs text-black/60 dark:text-yellow-400 mb-1">
                            {review.category} &middot;{" "}
                            {new Date(review.datePosted).toLocaleDateString()}
                          </div>
                          <div className="text-black dark:text-yellow-100">
                            {review.review}
                          </div>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
