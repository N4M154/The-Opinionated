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
          <div className="dark:border-b-2 dark:border-r-2 dark:border-pink-300/40 rounded-3xl p-8 shadow-2xl hover:scale-110 form-fade-in">
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
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
              </div>
              <h2 className="text-3xl font-thin text-black dark:text-white mb-2">
                Create Account
              </h2>
              <p className="text-yellow-500">Join our community today!</p>
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
                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500/20 to-cyan-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-200 -z-10"></div>
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
                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500/20 to-cyan-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-200 -z-10"></div>
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
                    Signing Up...
                  </div>
                ) : (
                  "Create Account"
                )}
              </button>
            </form>

            {/* Signup link */}
            <div className="text-center mt-6">
              <p className="text-black dark:text-white font-thin">
                Already have an account?{" "}
                <a
                  href="/signup"
                  className="font-bold dark:text-white text-black hover:text-yellow-500 transition-colors duration-200 underline decoration-pink-200 hover:decoration-white"
                >
                  Sign in here
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
