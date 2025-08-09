// import { useNavigate } from "react-router-dom";
// import { useEffect, useState } from "react";
// import ReviewCard from "../components/ReviewCard.jsx";
// import { NotebookPen,LogOut } from 'lucide-react';

// export default function Home() {
//   const [message, setMessage] = useState("");
//   const [reviews, setReviews] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [filters, setFilters] = useState({
//     category: "",
//     reactionType: "",
//   });
//   const navigate = useNavigate();

//   const categories = ["", "anime", "movie", "tv show", "music", "book"];
//   const reactionTypes = ["", "funny", "creative", "cringe"];

//   useEffect(() => {
//     const token = localStorage.getItem("token");
//     if (!token) {
//       navigate("/login");
//       return;
//     }

//     // Fetch welcome message
//     fetch("http://localhost:5000/home", {
//       headers: { Authorization: `Bearer ${token}` },
//     })
//       .then((res) => res.json())
//       .then((data) => setMessage(data.message))
//       .catch(() => navigate("/login"));

//     // Fetch reviews
//     fetchReviews();
//   }, [navigate]);

//   const fetchReviews = async () => {
//     const token = localStorage.getItem("token");
//     try {
//       const params = new URLSearchParams();
//       if (filters.category) params.append("category", filters.category);
//       if (filters.reactionType)
//         params.append("reactionType", filters.reactionType);

//       const response = await fetch(`http://localhost:5000/reviews?${params}`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });

//       if (response.ok) {
//         const data = await response.json();
//         setReviews(data.data);
//       }
//     } catch (error) {
//       console.error("Error fetching reviews:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleReaction = async (reviewId, reactionType) => {
//     const token = localStorage.getItem("token");
//     try {
//       const response = await fetch(
//         `http://localhost:5000/reviews/${reviewId}/reactions`,
//         {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${token}`,
//           },
//           body: JSON.stringify({ reactionType }),
//         }
//       );

//       if (response.ok) {
//         // Refresh reviews to get updated reaction counts
//         fetchReviews();
//       }
//     } catch (error) {
//       console.error("Error adding reaction:", error);
//     }
//   };

//   const handleFilterChange = (filterType, value) => {
//     setFilters((prev) => ({
//       ...prev,
//       [filterType]: value,
//     }));
//   };

//   const logout = () => {
//     localStorage.removeItem("token");
//     navigate("/");
//   };

//   return (
//     <div className="min-h-screen relative overflow-hidden bg-gradient-to-b from-yellow-50 to-pink-50 dark:from-black dark:to-[#18181b]">
      

//       <div className="relative z-10 container mx-auto px-4 py-8">
//         {/* Header */}
//         <div className="flex items-center justify-between mb-8 form-slide-in">
//           <div className="rounded-2xl p-6 border border-white/20 bg-pink-50">
//             <h1 className="text-3xl font-thin text-black mb-2">What's your hot take today?</h1>
//           </div>
//           <div className="flex gap-4">
//             <button
//               onClick={() => navigate("/review-form")}
//               className="bg-yellow-200 text-black px-6 py-3 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
//             >
//               <NotebookPen className="w-6 h-6" />
//             </button>
//             <button
//               onClick={logout}
//               className="bg-black dark:bg-pink-50 dark:text-black text-white px-4 py-3 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
//             >
//               <LogOut className="w-6 h-6" />
//             </button>
//           </div>
//         </div>

//         {/* Filters */}
//         <div className="glass rounded-2xl shadow-2xl p-6 mb-8 border border-white/20 transition-all duration-300 form-fade-in">
//           <h2 className="text-lg font-thin mb-4 text-black dark:text-white">Filter Reviews</h2>
//           <div className="flex gap-4">
//             <div>
//               <label className="block text-sm font-thin text-black dark:text-white mb-2">
//                 Category
//               </label>
//               <select
//                 value={filters.category}
//                 onChange={(e) => handleFilterChange("category", e.target.value)}
//                 className="px-3 py-2 bg-white/10 border border-white/20 rounded-xl text-black focus:outline-none focus:ring-2 focus:ring-violet-400 focus:border-transparent transition-all duration-300 backdrop-blur-sm input-focus"
//               >
//                 {categories.map((category) => (
//                   <option
//                     key={category}
//                     value={category}
//                     className="bg-yellow-50 dark:bg-black/50"
//                   >
//                     {category === ""
//                       ? "All Categories"
//                       : category.charAt(0).toUpperCase() + category.slice(1)}
//                   </option>
//                 ))}
//               </select>
//             </div>
//             <div>
//               <label className="block text-sm font-thin text-black dark:text-white mb-2">
//                 Reaction
//               </label>
//               <select
//                 value={filters.reactionType}
//                 onChange={(e) =>
//                   handleFilterChange("reactionType", e.target.value)
//                 }
//                 className="px-3 py-2 bg-white/10 border border-white/20 rounded-xl text-black focus:outline-none focus:ring-2 focus:ring-violet-400 focus:border-transparent transition-all duration-300 backdrop-blur-sm input-focus"
//               >
//                 {reactionTypes.map((type) => (
//                   <option key={type} value={type} className="bg-yellow-50 dark:bg-black/50">
//                     {type === ""
//                       ? "All Reactions"
//                       : type.charAt(0).toUpperCase() + type.slice(1)}
//                   </option>
//                 ))}
//               </select>
//             </div>
//             <div className="flex items-end">
//               <button
//                 onClick={fetchReviews}
//                 className="bg-yellow-200 text-black px-4 py-2 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
//               >
//                 Apply Filters
//               </button>
//             </div>
//           </div>
//         </div>

//         {/* Reviews Grid */}
//         {loading ? (
//           <div className="text-center py-8 form-fade-in">
//             <div className="glass rounded-2xl p-8 border border-white/20 inline-block">
//               <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-400 mx-auto mb-4"></div>
//               <p className="text-black dark:text-white">Loading reviews...</p>
//             </div>
//           </div>
//         ) : reviews.length === 0 ? (
//           <div className="text-center py-8 form-fade-in">
//             <div className="glass rounded-2xl p-8 border border-white/20 inline-block">
//               <p className="text-black dark:text-white text-lg mb-4">
//                 No reviews found. Be the first to write one!
//               </p>
//               <button
//                 onClick={() => navigate("/review-form")}
//               className="bg-yellow-200 text-black dark:text-white px-6 py-3 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
//                 >
//                 Write a Review
//               </button>
//             </div>
//           </div>
//         ) : (
//           <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 form-fade-in">
//             {reviews.map((review, index) => (
//               <div
//                 key={review._id}
//                 style={{ animationDelay: `${index * 0.1}s` }}
//                 className="form-slide-in"
//               >
//                 <ReviewCard review={review} onReaction={handleReaction} />
//               </div>
//             ))}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }


import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import ReviewCard from "../components/ReviewCard.jsx";
import { NotebookPen, LogOut } from 'lucide-react';

export default function Home() {
  const [message, setMessage] = useState("");
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    category: "",
    reactionType: "",
  });
  const navigate = useNavigate();

  const categories = ["", "anime", "movie", "tv show", "music", "book"];
  const reactionTypes = ["", "funny", "creative", "cringe"];

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    fetch("http://localhost:5000/home", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => setMessage(data.message))
      .catch(() => navigate("/login"));

    fetchReviews();
  }, [navigate]);

  const fetchReviews = async () => {
    const token = localStorage.getItem("token");
    try {
      const params = new URLSearchParams();
      if (filters.category) params.append("category", filters.category);
      if (filters.reactionType) params.append("reactionType", filters.reactionType);

      const response = await fetch(`http://localhost:5000/reviews?${params}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.ok) {
        const data = await response.json();
        setReviews(data.data);
      }
    } catch (error) {
      console.error("Error fetching reviews:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleReaction = async (reviewId, reactionType) => {
    const token = localStorage.getItem("token");
    try {
      const response = await fetch(
        `http://localhost:5000/reviews/${reviewId}/reactions`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ reactionType }),
        }
      );

      if (response.ok) {
        fetchReviews();
      }
    } catch (error) {
      console.error("Error adding reaction:", error);
    }
  };

  const handleFilterChange = (filterType, value) => {
    setFilters((prev) => ({
      ...prev,
      [filterType]: value,
    }));
  };

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-b from-yellow-50 to-pink-50 dark:from-black dark:to-[#18181b]">
      
      {/* HERO SECTION */}
  <section 
  className="
    relative flex flex-col items-center justify-center text-center 
    min-h-screen bg-cover bg-center mt-[-65px] 
    bg-[url('/4.png')] dark:bg-[url('/5.png')]
  "
>
  {/* Overlay */}
  <div className="absolute inset-0 bg-gradient-to-b from-yellow-100/10 to-pink-100/10 dark:from-black/10 dark:to-black/10"></div>

  {/* Content */}
  <div className="relative z-10 px-6">
    <p className="italic text-black text-xl dark:text-white">Welcome to</p>
    <h1 className="text-5xl font-extrabold tracking-widest text-yellow-400 dark:text-yellow-200">
      The <span className="text-black dark:text-white">Opinionated</span>
    </h1>
    <p className="mt-6 max-w-xl mx-auto text-black dark:text-pink-100">
      Got a hot take? Good. Got the guts to unleash it without wearing flame-retardant pants? Even better.
    </p>
    <p className="mt-4 max-w-xl mx-auto text-black dark:text-pink-100">
      This is your arena — toss in your thoughts on anime, movies, TV shows, music, and books, and watch the chaos unfold. Welcome to the glorious dumpster fire of opinions.
    </p>
  </div>
</section>





      {/* EXISTING CONTENT */}
      <div className="relative z-10 container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8 form-slide-in">
          <div className="rounded-2xl p-6 border border-white/20 bg-pink-50">
            <h1 className="text-3xl font-thin text-black mb-2">What's your hot take today?</h1>
          </div>
          <div className="flex gap-4">
            <button
              onClick={() => navigate("/review-form")}
              className="bg-yellow-200 text-black px-6 py-3 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
            >
              <NotebookPen className="w-6 h-6" />
            </button>
            <button
              onClick={logout}
              className="bg-black dark:bg-pink-50 dark:text-black text-white px-4 py-3 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
            >
              <LogOut className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Filters */}
        <div className="glass rounded-2xl shadow-2xl p-6 mb-8 border border-white/20 transition-all duration-300 form-fade-in">
          <h2 className="text-lg font-thin mb-4 text-black dark:text-white">Filter Reviews</h2>
           <div className="flex gap-4">
             <div>
               <label className="block text-sm font-thin text-black dark:text-white mb-2">
                Category
              </label>
               <select
                value={filters.category}
                onChange={(e) => handleFilterChange("category", e.target.value)}
                className="px-3 py-2 bg-white/10 border border-white/20 rounded-xl text-black focus:outline-none focus:ring-2 focus:ring-violet-400 focus:border-transparent transition-all duration-300 backdrop-blur-sm input-focus"
              >
                {categories.map((category) => (
                  <option
                    key={category}
                    value={category}
                    className="bg-yellow-50 dark:bg-black/50"
                  >
                    {category === ""
                      ? "All Categories"
                      : category.charAt(0).toUpperCase() + category.slice(1)}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-thin text-black dark:text-white mb-2">
                Reaction
              </label>
              <select
                value={filters.reactionType}
                onChange={(e) =>
                  handleFilterChange("reactionType", e.target.value)
                }
                className="px-3 py-2 bg-white/10 border border-white/20 rounded-xl text-black focus:outline-none focus:ring-2 focus:ring-violet-400 focus:border-transparent transition-all duration-300 backdrop-blur-sm input-focus"
              >
                {reactionTypes.map((type) => (
                  <option key={type} value={type} className="bg-yellow-50 dark:bg-black/50">
                    {type === ""
                      ? "All Reactions"
                      : type.charAt(0).toUpperCase() + type.slice(1)}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex items-end">
              <button
                onClick={fetchReviews}
                className="bg-yellow-200 text-black px-4 py-2 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
              >
                Apply Filters
              </button>
            </div>
          </div>
        </div>

        {/* Reviews Grid */}
        {loading ? (
          <div className="text-center py-8 form-fade-in">
            <div className="glass rounded-2xl p-8 border border-white/20 inline-block">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-400 mx-auto mb-4"></div>
              <p className="text-black dark:text-white">Loading reviews...</p>
            </div>
          </div>
        ) : reviews.length === 0 ? (
          <div className="text-center py-8 form-fade-in">
            <div className="glass rounded-2xl p-8 border border-white/20 inline-block">
              <p className="text-black dark:text-white text-lg mb-4">
                No reviews found. Be the first to write one!
              </p>
              <button
                onClick={() => navigate("/review-form")}
              className="bg-yellow-200 text-black dark:text-white px-6 py-3 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
                >
                Write a Review
              </button>
            </div>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 form-fade-in">
            {reviews.map((review, index) => (
              <div
                key={review._id}
                style={{ animationDelay: `${index * 0.1}s` }}
                className="form-slide-in"
              >
                <ReviewCard review={review} onReaction={handleReaction} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
