import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ThemeToggle from "../components/ThemeToggle";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const res = await fetch("http://localhost:5000/login", {
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
    <div>
      <header className="fixed w-full border-b-2 border-yellow-300/40 bg-yellow-100/60 dark:bg-black dark:border-gray-900 backdrop-blur-sm py-4 z-50 transition-all duration-200">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <h1 className="text-xl font-light text-black dark:text-yellow-200 ml-5">
            N4M154
          </h1>
          <nav className="hidden md:flex space-x-6"></nav>
          <div className="mr-5">
            <ThemeToggle />
          </div>
        </div>
      </header>
      <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-gradient-to-b from-yellow-50 to-yellow-100 dark:from-black dark:to-black">
        {/* Main form container */}
        <div className="relative z-10 w-full max-w-md px-6 form-slide-in">
          <div className="dark:border-b-2 dark:border-r-2 dark:border-pink-300/40 rounded-3xl p-8  shadow-xl hover:scale-110 form-fade-in">
            {/* Header with icon */}
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse-glow icon-glow animate-bounce">
                <svg
                  className="w-8 h-8 text-pink-500"
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
              <h2 className="text-3xl font-thin text-black dark:text-white mb-2">
                Welcome Back
              </h2>
              <p className="text-yellow-500">Sign in to your account</p>
            </div>

            <form onSubmit={handleLogin} className="space-y-6">
              {/* Email input */}
              <div className="relative group">
                <input
                  className="w-full px-4 py-4 bg-yellow-100 dark:bg-yellow-200/20 rounded-2xl text-black dark:text-white font-thin placeholder-yellow-400 focus:outline-none transition-all duration-200 backdrop-blur-sm input-focus"
                  placeholder="Email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              {/* Password input */}
              <div className="relative group">
                <input
                  className="w-full px-4 py-4 bg-yellow-100 dark:bg-yellow-200/20 rounded-2xl text-black dark:text-white font-thin placeholder-yellow-400 focus:outline-none transition-all duration-200 backdrop-blur-sm input-focus"
                  placeholder="Password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              {/* Submit button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-4 dark:bg-yellow-200 bg-black text-yellow-200 dark:text-black font-thin rounded-xl  transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden"
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
              <p className="text-black dark:text-white font-thin">
                Don't have an account?{" "}
                <a
                  href="/signup"
                  className="font-bold dark:text-white text-black hover:text-yellow-500 transition-colors duration-200 underline decoration-pink-200 hover:decoration-white"
                >
                  Sign up here
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
