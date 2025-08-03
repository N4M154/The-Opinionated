// import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
// import Login from "./pages/Login";
// import Signup from "./pages/Signup";
// import Home from "./pages/Home";
// import Next from "./pages/Second";
// import Landing from "./pages/Landing";

// function App() {
//   const isAuth = !!localStorage.getItem("token");

//   return (
//     <BrowserRouter>
//       {" "}
//       <Routes>
//         <Route path="/" element={<Landing />} />
//         <Route path="/login" element={<Login />} />
//         <Route path="/signup" element={<Signup />} />
//         <Route
//           path="/home"
//           element={isAuth ? <Home /> : <Navigate to="/login" />}
//         />
//         <Route
//           path="/next"
//           element={isAuth ? <Next /> : <Navigate to="/login" />}
//         />
//         <Route path="*" element={<Navigate to="/login" />} />
//       </Routes>
//     </BrowserRouter>
//   );
// }

// export default App;

import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import ReviewForm from "./pages/ReviewForm";
import Landing from "./pages/Landing";
import Layout from "./components/Layout";
import Footer from "./components/Footer";

function App() {
  const isAuth = !!localStorage.getItem("token");

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route element={<Layout />}>
          <Route
            path="/home"
            element={isAuth ? <Home /> : <Navigate to="/login" />}
          />
          <Route
            path="/review-form"
            element={isAuth ? <ReviewForm /> : <Navigate to="/login" />}
          />
          <Route
            path="/profile"
            element={isAuth ? <Profile /> : <Navigate to="/login" />}
          />

          <Route path="*" element={<Navigate to="/login" />} />
        </Route>
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
