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

function Landing() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
      {/* Hero Section */}
      <section className="relative px-6 py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-pink-600/20 backdrop-blur-sm"></div>
        <div className="relative max-w-7xl mx-auto text-center">
          <div className="animate-float mb-8">
            <div className="inline-flex items-center space-x-4 bg-white/10 backdrop-blur-md px-6 py-3 rounded-full border border-white/20">
              <Trophy className="w-5 h-5 text-yellow-400" />
              <span className="text-white">
                Monthly Trophy Winners • React to Win
              </span>
            </div>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
            Review Everything,
            <span className="bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">
              {" "}
              React Freely
            </span>
          </h1>

          <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
            Share your thoughts on anime, movies, TV shows, books, and music.
            Get reactions from the community and compete for monthly trophies in
            funny, creative, and engaging categories.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
            <button className="bg-gradient-to-r from-pink-500 to-purple-600 text-white px-8 py-4 rounded-full font-semibold hover:from-pink-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center space-x-2">
              <span>Start Reviewing</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>

          {/* Category Icons */}
          <div className="flex justify-center items-center space-x-8 opacity-60">
            <div className="text-center group cursor-pointer">
              <Zap className="w-8 h-8 text-white mx-auto mb-2 group-hover:text-yellow-200 transition-colors" />
              <span className="text-sm text-gray-400">Anime</span>
            </div>
            <div className="text-center group cursor-pointer">
              <Film className="w-8 h-8 text-white mx-auto mb-2 group-hover:text-pink-400 transition-colors" />
              <span className="text-sm text-gray-400">Movies</span>
            </div>
            <div className="text-center group cursor-pointer">
              <Tv className="w-8 h-8 text-white mx-auto mb-2 group-hover:text-purple-400 transition-colors" />
              <span className="text-sm text-gray-400">TV Shows</span>
            </div>
            <div className="text-center group cursor-pointer">
              <Book className="w-8 h-8 text-white mx-auto mb-2 group-hover:text-blue-400 transition-colors" />
              <span className="text-sm text-gray-400">Books</span>
            </div>
            <div className="text-center group cursor-pointer">
              <Music className="w-8 h-8 text-white mx-auto mb-2 group-hover:text-teal-400 transition-colors" />
              <span className="text-sm text-gray-400">Music</span>
            </div>
          </div>
        </div>

        {/* Floating Elements */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full opacity-20 animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-16 h-16 bg-gradient-to-r from-blue-500 to-teal-500 rounded-full opacity-20 animate-bounce"></div>
        <div className="absolute top-1/2 left-1/4 w-12 h-12 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full opacity-30 animate-pulse delay-300"></div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
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
            <div className="group">
              <div className="bg-white/10 backdrop-blur-md p-8 rounded-2xl border border-white/20 hover:bg-white/20 transition-all duration-300 transform hover:scale-105 hover:-translate-y-2">
                <div className="w-16 h-16 bg-gradient-to-r from-pink-500 to-purple-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
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
            <div className="group">
              <div className="bg-white/10 backdrop-blur-md p-8 rounded-2xl border border-white/20 hover:bg-white/20 transition-all duration-300 transform hover:scale-105 hover:-translate-y-2">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-teal-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
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
            <div className="group">
              <div className="bg-white/10 backdrop-blur-md p-8 rounded-2xl border border-white/20 hover:bg-white/20 transition-all duration-300 transform hover:scale-105 hover:-translate-y-2">
                <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-red-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
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
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Review Everything You Love
          </h2>
          <p className="text-xl text-gray-300 mb-12">
            From blockbusters to indie gems, share your passion across all media
          </p>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
            <div className="bg-gradient-to-br from-red-500/20 to-pink-500/20 p-6 rounded-2xl border border-red-500/30 hover:scale-105 transition-transform cursor-pointer">
              <Film className="w-12 h-12 text-red-400 mx-auto mb-3" />
              <h3 className="text-white font-semibold">Movies</h3>
            </div>
            <div className="bg-gradient-to-br from-purple-500/20 to-indigo-500/20 p-6 rounded-2xl border border-purple-500/30 hover:scale-105 transition-transform cursor-pointer">
              <Tv className="w-12 h-12 text-purple-400 mx-auto mb-3" />
              <h3 className="text-white font-semibold">TV Shows</h3>
            </div>
            <div className="bg-gradient-to-br from-blue-500/20 to-teal-500/20 p-6 rounded-2xl border border-blue-500/30 hover:scale-105 transition-transform cursor-pointer">
              <Book className="w-12 h-12 text-blue-400 mx-auto mb-3" />
              <h3 className="text-white font-semibold">Books</h3>
            </div>
            <div className="bg-gradient-to-br from-green-500/20 to-teal-500/20 p-6 rounded-2xl border border-green-500/30 hover:scale-105 transition-transform cursor-pointer">
              <Music className="w-12 h-12 text-green-400 mx-auto mb-3" />
              <h3 className="text-white font-semibold">Music</h3>
            </div>
            <div className="bg-gradient-to-br from-yellow-500/20 to-orange-500/20 p-6 rounded-2xl border border-yellow-500/30 hover:scale-105 transition-transform cursor-pointer">
              <Zap className="w-12 h-12 text-yellow-400 mx-auto mb-3" />
              <h3 className="text-white font-semibold">Anime</h3>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Landing;
