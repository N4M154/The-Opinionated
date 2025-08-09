import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Profile() {
  const [userEmail, setUserEmail] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/login");
        return;
      }

      try {
        const response = await fetch("http://localhost:5000/profile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setUserEmail(data.email);
        } else {
          // Token might be invalid
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
      <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
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
    <div className="min-h-screen relative overflow-hidden py-12 bg-gradient-to-b from-yellow-50 to-pink-50 dark:from-black dark:to-[#18181b]">
      <div className="relative z-10 max-w-md mx-auto px-6 form-slide-in">
        <div className="glass rounded-3xl shadow-2xl p-8 border border-white/20 form-fade-in">
          {/* Header with icon */}
          <div className="text-center mb-8">
            <div className="w-24 h-24 bg-pink-300 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse-glow icon-glow animate-bounce">
              <svg
                className="w-12 h-12 text-white"
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
            <h1 className="text-3xl font-thin text-black dark:text-yellow-200 mb-2">
              Profile
            </h1>
            <p className="font-thin text-black dark:text-yellow-200">
              Your account information
            </p>
          </div>

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
                <span className="text-yellow-400 font-medium">Active</span>
              </div>
            </div>

            <button
              onClick={handleLogout}
              className="w-full py-4 bg-yellow-300/50 dark:bg-yellow-200 text-black font-thin rounded-xl hover:from-red-600 hover:to-pink-700 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-110"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
