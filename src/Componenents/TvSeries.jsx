import React from "react";
import { useState, useEffect } from "react";
import Card from "./Card";
import CustomPagination from "./CustomPagination";
import Genres from "./Genres";
import useGenres from "./Hooks/useGenre";

const TvSeries = () => {
  const [movies, setMovies] = useState([]);
  const [page, setpage] = useState(1);
  const [numOfPages, setnumOfPages] = useState();
  const [selectedGenres, setselectedGenres] = useState([]);
  const [genres, setgenres] = useState([]);
  const genreforURL = useGenres(selectedGenres);

  const Api_Key = "070ddf6f0ab61f11b00dc960ce90b129";
  const Url = `https://api.themoviedb.org/3/discover/tv?api_key=${Api_Key}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}&with_genres=${genreforURL}`;

  async function fetchData() {
    const resp = await fetch(Url);
    const data = await resp.json();
    setMovies(data.results);
    setnumOfPages(data.total_pages > 500 ? 500 : data.total_pages);
  }

  useEffect(() => {
    fetchData();
  }, [page, genreforURL]);

  return (
    <div className="flex pt-26 w-full bg-black flex-col items-center">
      <h1 className=" font-semibold text-xl text-gray-100">Tv Series</h1>
      <Genres
        type="tv"
        selectedGenres={selectedGenres}
        setselectedGenres={setselectedGenres}
        genres={genres}
        setgenres={setgenres}
        setpage={setpage}
      />
      <div className=" text-gray-100 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-1 p-1">
        {movies.map((c) => (
          <Card key={c.id} id={c.id} value={c} media_type={"tv"} />
        ))}
      </div>
      {numOfPages > 1 ? (
        <CustomPagination setpage={setpage} numOfPages={numOfPages} />
      ) : (
        ""
      )}
    </div>
  );
};

export default TvSeries;
