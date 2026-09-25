import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./Pages/Home";
import Guide from "./Pages/Guide";
import Reviews from "./Pages/Reviews";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/guide" element={<Guide />} />
        <Route path="/reviews" element={<Reviews />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
};

export default App;
