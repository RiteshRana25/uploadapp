import { Routes, Route} from "react-router-dom";
import Home from "./Pages/Home";
import Guide from "./Pages/Guide";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/guide" element={<Guide />} />
      </Routes>
    </>
  );
};

export default App;
