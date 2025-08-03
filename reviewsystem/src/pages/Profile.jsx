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
        const response = await fetch("http://localhost:4000/profile", {
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
    navigate("/login");
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 bg-gradient-to-br from-orange-400 via-red-500 to-pink-600"></div>
        
        {/* Floating orbs */}
        <div className="absolute top-20 left-20 w-32 h-32 bg-white/10 rounded-full animate-float blur-xl"></div>
        <div className="absolute bottom-20 right-20 w-24 h-24 bg-white/10 rounded-full animate-float blur-xl" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-white/10 rounded-full animate-float blur-xl" style={{ animationDelay: '2s' }}></div>
        
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
    <div className="min-h-screen relative overflow-hidden py-12">
      {/* Animated background elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-orange-400 via-red-500 to-pink-600"></div>
      
      {/* Floating orbs */}
      <div className="absolute top-20 left-20 w-32 h-32 bg-white/10 rounded-full animate-float blur-xl"></div>
      <div className="absolute bottom-20 right-20 w-24 h-24 bg-white/10 rounded-full animate-float blur-xl" style={{ animationDelay: '1s' }}></div>
      <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-white/10 rounded-full animate-float blur-xl" style={{ animationDelay: '2s' }}></div>
      
      {/* Additional floating particles */}
      <div className="absolute top-1/3 right-1/3 w-8 h-8 bg-orange-300/30 rounded-full animate-float-particle"></div>
      <div className="absolute bottom-1/3 left-1/3 w-6 h-6 bg-red-300/30 rounded-full animate-float-particle" style={{ animationDelay: '1.5s' }}></div>
      <div className="absolute top-2/3 right-1/4 w-4 h-4 bg-white/20 rounded-full animate-float-particle" style={{ animationDelay: '3s' }}></div>

      <div className="relative z-10 max-w-md mx-auto px-6 form-slide-in">
        <div className="glass rounded-3xl shadow-2xl p-8 border border-white/20 hover-lift form-fade-in">
          {/* Header with icon */}
          <div className="text-center mb-8">
            <div className="w-24 h-24 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse-glow icon-glow animate-bounce">
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
            <h1 className="text-3xl font-bold text-white mb-2">Profile</h1>
            <p className="text-white/70">Your account information</p>
          </div>

          <div className="space-y-6">
            <div className="glass bg-white/10 rounded-xl p-4 border border-white/20 hover-lift">
              <label className="block text-sm font-medium text-white/80 mb-2">
                Email Address
              </label>
              <p className="text-lg text-white font-semibold">{userEmail}</p>
            </div>

            <div className="glass bg-white/10 rounded-xl p-4 border border-white/20 hover-lift">
              <label className="block text-sm font-medium text-white/80 mb-2">
                Account Status
              </label>
              <div className="flex items-center">
                <div className="w-3 h-3 bg-green-400 rounded-full mr-2 animate-pulse"></div>
                <span className="text-green-300 font-medium">Active</span>
              </div>
            </div>

            <button
              onClick={handleLogout}
              className="w-full py-4 bg-gradient-to-r from-red-500 to-pink-600 text-white font-semibold rounded-xl hover:from-red-600 hover:to-pink-700 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl hover-lift"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
} 