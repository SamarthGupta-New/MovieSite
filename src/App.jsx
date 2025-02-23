import Home from "./Componenents/Home";
import Header from "./Componenents/Header";
import TvSeries from "./Componenents/TvSeries";
import { Routes, Route, useNavigate } from "react-router-dom";
import Search from "./Componenents/Search";
import Movies from "./Componenents/Movies";
import Footer from "./Componenents/Footer";

function App() {
  const navigate = useNavigate();
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/movies" element={<Movies />} />
        <Route path="/tvseries" element={<TvSeries />} />
        <Route path="/search" element={<Search />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
