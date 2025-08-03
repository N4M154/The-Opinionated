import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export default function Home() {
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    fetch("http://localhost:4000/home", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => setMessage(data.message))
      .catch(() => navigate("/login"));
  }, [navigate]);

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div className="h-screen relative bg-gradient-to-b from-violet-300 to-violet-100 ">
      <h1 className="text-2xl font-bold mb-2">Welcome Home</h1>
      <p>{message}</p>
      <button
        onClick={logout}
        className="mt-4 bg-red-500 text-white px-4 py-2 rounded"
      >
        Logout
      </button>
    </div>
  );
}
