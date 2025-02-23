import React, { useEffect } from "react";
import axios from "axios";
import Chip from "@mui/material/Chip";

const Genres = ({
  type,
  selectedGenres,
  setselectedGenres,
  genres,
  setgenres,
  setpage,
}) => {
  function handleadd(genre) {
    setselectedGenres([...selectedGenres, genre]);
    setgenres(genres.filter((g) => g.id !== genre.id));
    setpage(1);
  }
  function handleremove(genre) {
    setselectedGenres(
      selectedGenres.filter((select) => select.id !== genre.id)
    );
    setgenres([...genres, genre]);
    setpage(1);
  }
  const fetchgenres = async () => {
    const Api_Key = "070ddf6f0ab61f11b00dc960ce90b129";
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/genre/${type}/list?api_key=${Api_Key}&language=en-US`
    );
    setgenres(data.genres);
  };

  useEffect(() => {
    fetchgenres();
    return () => {
      setgenres([]);
    };
  }, []);

  return (
    <div className="text-white">
      {selectedGenres &&
        selectedGenres.map((genre) => {
          return (
            <Chip
              style={{ margin: 2 }}
              color="secondary"
              clickable
              key={genre.id}
              label={genre.name}
              onDelete={() => handleremove(genre)}
            />
          );
        })}
      {genres &&
        genres.map((genre) => {
          return (
            <Chip
              style={{ margin: 2 }}
              color="primary"
              clickable
              key={genre.id}
              label={genre.name}
              onClick={() => handleadd(genre)}
            />
          );
        })}
    </div>
  );
};

export default Genres;
