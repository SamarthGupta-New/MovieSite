import React, { useEffect, useState } from "react";
import Card from "./Card";
import CustomPagination from "./CustomPagination";
import axios from "axios";

const Home = () => {
  const [movies, setMovies] = useState([]);
  const [page, setpage] = useState(1);
  const Api_Key = "070ddf6f0ab61f11b00dc960ce90b129";
  const Url2 = `https://api.themoviedb.org/3/trending/movie/week?api_key=${Api_Key}&page=${page}`;
  const Url = `https://api.themoviedb.org/3/trending/all/week?api_key=${Api_Key}&page=${page}`;
  async function fetchData() {
    try {
      const { data } = await axios.get(Url);
      setMovies(data.results);
    } catch (error) {
      console.log("Error fetching data:", error);
    }
  }

  useEffect(() => {
    fetchData();
  }, [page]);

  return (
    <div className="flex pt-26 bg-black flex-col px-auto items-center">
      <h1 className=" font-semibold text-lg text-gray-100">Trending</h1>
      <div className=" text-gray-100 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
        {movies.map((c) => (
          <Card key={c.id} id={c.id} media_type={c.media_type} value={c} />
        ))}
      </div>
      <CustomPagination setpage={setpage} />
    </div>
  );
};

export default Home;
