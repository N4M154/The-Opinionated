import { useNavigate } from "react-router-dom";
import { useEffect, useRef } from "react";
import { ArrowBigDownDash } from "lucide-react";
import Carousel from "../components/Carousel.jsx";

export default function Home() {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }
  }, [navigate]);

  const mainRef = useRef(null);
  const RollDown = () => {
    if (mainRef.current) {
      mainRef.current.scrollIntoView({ behavior: "smooth" });
    }
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
        <div className="absolute inset-0 bg-gradient-to-b from-yellow-100/10 to-pink-100/20 dark:from-black/10 dark:to-black/10"></div>

        <div className="relative z-10 px-6">
          <p className="italic text-black text-xl dark:text-white">
            Welcome to
          </p>
          <h1 className="text-5xl font-extrabold tracking-widest text-yellow-400 dark:text-yellow-200">
            The <span className="text-black dark:text-white">Opinionated</span>
          </h1>
          <p className="mt-6 max-w-xl mx-auto text-black dark:text-pink-100">
            Got a hot take? Good. Got the guts to unleash it without wearing
            flame-retardant pants? Even better.
          </p>
          <p className="mt-4 max-w-xl mx-auto text-black dark:text-pink-100">
            This is your arena — toss in your thoughts on anime, movies, TV
            shows, music, and books, and watch the chaos unfold. Welcome to the
            glorious dumpster fire of opinions.
          </p>
        </div>

        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-10">
          <ArrowBigDownDash
            className="w-15 h-15 text-black dark:text-white animate-bounce icon-glow cursor-pointer"
            onClick={RollDown}
          />
        </div>
      </section>

      {/* Main section */}
      <section
        ref={mainRef}
        className="w-full min-h-screen flex flex-col justify-center items-center bg-gradient-to-b from-yellow-50 to-pink-50 dark:from-black dark:to-[#18181b]"
      >
        <div className="container mx-auto px-4 py-8 flex flex-col h-[80vh]">
          <Carousel />
        </div>
      </section>
    </div>
  );
}
