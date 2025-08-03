import React from "react";
import {
  Star,
  Trophy,
  Heart,
  Laugh,
  Frown,
  Lightbulb,
  Users,
  Zap,
  ArrowRight,
  Play,
  Book,
  Film,
  Music,
  Tv,
} from "lucide-react";
import ThemeToggle from "../components/ThemeToggle";

function Landing() {
  return (
    <div className="min-h-screen relative overflow-hidden">
      <header
        className="fixed w-full border-b-2 border-violet-200 dark:border-none bg-violet-100/40 dark:bg-black/40 backdrop-blur-sm py-4 z-50 transition-all duration-300 shadow-[0_1px_50px_rgb(124,58,237)] dark:shadow-[0_10px_50px_rgba(0,0,0,1)]"
        style={{
          borderBottomLeftRadius: "1.5rem",
          borderBottomRightRadius: "1.5rem",
        }}
      >
        <div className="container mx-auto px-4 flex justify-between items-center">
          <h1 className="text-xl font-light text-violet-500 ml-5">N4M154</h1>
          <nav className="hidden md:flex space-x-6"></nav>
          <div className="mr-5">
            <ThemeToggle />
          </div>
        </div>
      </header>
      {/* Animated background elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900"></div>

      {/* Enhanced floating elements */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full opacity-20 animate-float blur-sm"></div>
      <div
        className="absolute bottom-20 right-10 w-16 h-16 bg-gradient-to-r from-blue-500 to-teal-500 rounded-full opacity-20 animate-float blur-sm"
        style={{ animationDelay: "1s" }}
      ></div>
      <div
        className="absolute top-1/2 left-1/4 w-12 h-12 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full opacity-30 animate-float blur-sm"
        style={{ animationDelay: "2s" }}
      ></div>

      {/* Additional floating particles */}
      <div className="absolute top-1/3 right-1/4 w-8 h-8 bg-purple-300/30 rounded-full animate-float-particle"></div>
      <div
        className="absolute bottom-1/3 left-1/4 w-6 h-6 bg-pink-300/30 rounded-full animate-float-particle"
        style={{ animationDelay: "1.5s" }}
      ></div>
      <div
        className="absolute top-2/3 right-1/3 w-4 h-4 bg-white/20 rounded-full animate-float-particle"
        style={{ animationDelay: "3s" }}
      ></div>
      <div
        className="absolute top-1/4 left-1/3 w-10 h-10 bg-blue-300/20 rounded-full animate-float-particle"
        style={{ animationDelay: "0.5s" }}
      ></div>

      {/* Hero Section */}
      <section className="relative px-6 py-20 form-slide-in">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-pink-600/20 backdrop-blur-sm"></div>
        <div className="relative max-w-7xl mx-auto text-center">
          <div className="animate-float mb-8">
            <div className="inline-flex items-center space-x-4 glass px-6 py-3 rounded-full border border-white/20 hover-lift">
              <Trophy className="w-5 h-5 text-yellow-400 icon-glow" />
              <span className="text-white">
                Monthly Trophy Winners • React to Win
              </span>
            </div>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight form-fade-in">
            Review Everything,
            <span className="bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">
              {" "}
              React Freely
            </span>
          </h1>

          <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed form-fade-in">
            Share your thoughts on anime, movies, TV shows, books, and music.
            Get reactions from the community and compete for monthly trophies in
            funny, creative, and engaging categories.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12 form-fade-in">
            <button className="bg-gradient-to-r from-pink-500 to-purple-600 text-white px-8 py-4 rounded-full font-semibold hover:from-pink-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center space-x-2 hover-lift animate-pulse-glow">
              <span>Start Reviewing</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>

          {/* Category Icons */}
          <div className="flex justify-center items-center space-x-8 opacity-60 form-fade-in">
            <div className="text-center group cursor-pointer hover-lift">
              <Zap className="w-8 h-8 text-white mx-auto mb-2 group-hover:text-yellow-200 transition-colors icon-glow" />
              <span className="text-sm text-gray-400">Anime</span>
            </div>
            <div className="text-center group cursor-pointer hover-lift">
              <Film className="w-8 h-8 text-white mx-auto mb-2 group-hover:text-pink-400 transition-colors icon-glow" />
              <span className="text-sm text-gray-400">Movies</span>
            </div>
            <div className="text-center group cursor-pointer hover-lift">
              <Tv className="w-8 h-8 text-white mx-auto mb-2 group-hover:text-purple-400 transition-colors icon-glow" />
              <span className="text-sm text-gray-400">TV Shows</span>
            </div>
            <div className="text-center group cursor-pointer hover-lift">
              <Book className="w-8 h-8 text-white mx-auto mb-2 group-hover:text-blue-400 transition-colors icon-glow" />
              <span className="text-sm text-gray-400">Books</span>
            </div>
            <div className="text-center group cursor-pointer hover-lift">
              <Music className="w-8 h-8 text-white mx-auto mb-2 group-hover:text-teal-400 transition-colors icon-glow" />
              <span className="text-sm text-gray-400">Music</span>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-6 relative">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 form-fade-in">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Why ReviewVibe is
              <span className="bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">
                {" "}
                Different
              </span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              No toxic comments, just pure reactions. Express yourself and
              compete for monthly recognition.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="group form-slide-in">
              <div className="glass p-8 rounded-2xl border border-white/20 hover-lift">
                <div className="w-16 h-16 bg-gradient-to-r from-pink-500 to-purple-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform animate-pulse-glow icon-glow">
                  <Heart className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">
                  Express with Reactions
                </h3>
                <p className="text-gray-300 leading-relaxed">
                  No more toxic comments. React with funny, cringe, or creative
                  responses to show how reviews make you feel.
                </p>
              </div>
            </div>

            {/* Feature 2 */}
            <div
              className="group form-slide-in"
              style={{ animationDelay: "0.2s" }}
            >
              <div className="glass p-8 rounded-2xl border border-white/20 hover-lift">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-teal-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform animate-pulse-glow icon-glow">
                  <Trophy className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">
                  Monthly Trophies
                </h3>
                <p className="text-gray-300 leading-relaxed">
                  Compete for recognition! Users with the most reactions in each
                  category win exclusive monthly trophies.
                </p>
              </div>
            </div>

            {/* Feature 3 */}
            <div
              className="group form-slide-in"
              style={{ animationDelay: "0.4s" }}
            >
              <div className="glass p-8 rounded-2xl border border-white/20 hover-lift">
                <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-red-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform animate-pulse-glow icon-glow">
                  <Users className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">
                  Personal Profiles
                </h3>
                <p className="text-gray-300 leading-relaxed">
                  Build your reviewer reputation. All your reviews are showcased
                  on your personal profile for others to discover.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Showcase */}
      <section className="py-20 px-6 relative">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-6 form-fade-in">
            Review Everything You Love
          </h2>
          <p className="text-xl text-gray-300 mb-12 form-fade-in">
            From blockbusters to indie gems, share your passion across all media
          </p>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
            <div className="glass p-6 rounded-2xl border border-red-500/30 hover-lift cursor-pointer form-slide-in">
              <Film className="w-12 h-12 text-red-400 mx-auto mb-3 icon-glow" />
              <h3 className="text-white font-semibold">Movies</h3>
            </div>
            <div
              className="glass p-6 rounded-2xl border border-purple-500/30 hover-lift cursor-pointer form-slide-in"
              style={{ animationDelay: "0.1s" }}
            >
              <Tv className="w-12 h-12 text-purple-400 mx-auto mb-3 icon-glow" />
              <h3 className="text-white font-semibold">TV Shows</h3>
            </div>
            <div
              className="glass p-6 rounded-2xl border border-blue-500/30 hover-lift cursor-pointer form-slide-in"
              style={{ animationDelay: "0.2s" }}
            >
              <Book className="w-12 h-12 text-blue-400 mx-auto mb-3 icon-glow" />
              <h3 className="text-white font-semibold">Books</h3>
            </div>
            <div
              className="glass p-6 rounded-2xl border border-green-500/30 hover-lift cursor-pointer form-slide-in"
              style={{ animationDelay: "0.3s" }}
            >
              <Music className="w-12 h-12 text-green-400 mx-auto mb-3 icon-glow" />
              <h3 className="text-white font-semibold">Music</h3>
            </div>
            <div
              className="glass p-6 rounded-2xl border border-yellow-500/30 hover-lift cursor-pointer form-slide-in"
              style={{ animationDelay: "0.4s" }}
            >
              <Zap className="w-12 h-12 text-yellow-400 mx-auto mb-3 icon-glow" />
              <h3 className="text-white font-semibold">Anime</h3>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Landing;
