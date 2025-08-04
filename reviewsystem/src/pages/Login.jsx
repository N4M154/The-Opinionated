import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const res = await fetch("http://localhost:4000/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    const data = await res.json();
    if (res.ok) {
      localStorage.setItem("token", data.token);
      navigate("/home");
    } else {
      alert(data.message || "Login failed");
    }
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-400 via-cyan-500 to-teal-500"></div>

      {/* Floating orbs */}
      <div className="absolute top-20 right-20 w-32 h-32 bg-white/10 rounded-full animate-float blur-xl"></div>
      <div
        className="absolute bottom-20 left-20 w-24 h-24 bg-white/10 rounded-full animate-float blur-xl"
        style={{ animationDelay: "1s" }}
      ></div>
      <div
        className="absolute top-1/2 right-1/4 w-16 h-16 bg-white/10 rounded-full animate-float blur-xl"
        style={{ animationDelay: "2s" }}
      ></div>

      {/* Additional floating particles */}
      <div className="absolute top-1/3 left-1/3 w-8 h-8 bg-blue-300/30 rounded-full animate-float-particle"></div>
      <div
        className="absolute bottom-1/3 right-1/3 w-6 h-6 bg-cyan-300/30 rounded-full animate-float-particle"
        style={{ animationDelay: "1.5s" }}
      ></div>
      <div
        className="absolute top-2/3 left-1/4 w-4 h-4 bg-white/20 rounded-full animate-float-particle"
        style={{ animationDelay: "3s" }}
      ></div>

      {/* Main form container */}
      <div className="relative z-10 w-full max-w-md px-6 form-slide-in">
        <div className="glass rounded-3xl p-8 shadow-2xl hover-lift form-fade-in">
          {/* Header with icon */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse-glow icon-glow animate-bounce">
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
                  d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
                />
              </svg>
            </div>
            <h2 className="text-3xl font-thin text-white mb-2">Welcome Back</h2>
            <p className="text-white/70">Sign in to your account</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            {/* Email input */}
            <div className="relative group">
              <input
                className="w-full px-4 py-4 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-300 backdrop-blur-sm input-focus"
                placeholder="Email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500/20 to-cyan-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></div>
            </div>

            {/* Password input */}
            <div className="relative group">
              <input
                className="w-full px-4 py-4 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-300 backdrop-blur-sm input-focus"
                placeholder="Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500/20 to-cyan-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></div>
            </div>

            {/* Submit button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-4 bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-thin rounded-xl hover:from-blue-600 hover:to-cyan-600 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden"
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2"></div>
                  Signing In...
                </div>
              ) : (
                "Sign In"
              )}
            </button>
          </form>

          {/* Signup link */}
          <div className="text-center mt-6">
            <p className="text-white/70">
              Don't have an account?{" "}
              <a
                href="/signup"
                className="text-blue-300 hover:text-white font-thin transition-colors duration-300 underline decoration-blue-300/50 hover:decoration-white"
              >
                Sign up here
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
