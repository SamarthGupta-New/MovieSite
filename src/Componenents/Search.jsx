import React, { useEffect } from "react";
import TextField from "@mui/material/TextField";
import { useState } from "react";
import { createTheme, Tab, Tabs, ThemeProvider } from "@mui/material";
import { IoIosSearch } from "react-icons/io";
import axios from "axios";
import Card from "./Card";
import CustomPagination from "./CustomPagination";

const Search = () => {
  const [type, settype] = useState(0);
  const [SearchText, setSearchText] = useState("");
  const [page, setpage] = useState(1);
  const [content, setcontent] = useState();
  const [numOfPages, setnumOfPages] = useState();

  const darkTheme = createTheme({
    palette: {
      mode: "dark", // Ensures dark theme settings
      primary: {
        main: "#FFFFFF", // White for primary elements
        contrastText: "#000000", // Black text for readability
      },
      secondary: {
        main: "#FFFFFF", // White for secondary elements
        contrastText: "#000000", // Black text for contrast
      },
      background: {
        default: "#000000", // Black background
        paper: "#000000", // Ensures consistency
      },
      text: {
        primary: "#FFFFFF", // White text globally
        secondary: "#BBBBBB", // Slightly gray for secondary text
      },
    },
  });

  const fetchSearch = async () => {
    const Api_Key = "070ddf6f0ab61f11b00dc960ce90b129";
    const { data } = await axios.get(`https://api.themoviedb.org/3/search/${
      type ? "tv" : "movie"
    }?api_key=${Api_Key}&language=en-US&query=${SearchText}&page=${page}&include_adult=false
`);
    setcontent(data.results);
    setnumOfPages(data.total_pages);
  };

  useEffect(() => {
    window.scroll(0, 0);
    fetchSearch();
  }, [type, page]);

  return (
    <div className="pt-26 min-h-screen bg-black">
      <ThemeProvider theme={darkTheme}>
        <div className="justify-center mx-20 items-center flex">
          <TextField
            style={{ flex: 1 }}
            className="rounded-l-2xl  bg-gray-300 shadow-2xl"
            label="Search Movies Or Tv Series"
            variant="filled"
            onChange={(e) => setSearchText(e.target.value)}
          />
          <button
            onClick={fetchSearch}
            className="w-14 h-14 rounded-r-2xl hover:bg-blue-700 bg-blue-500 flex justify-center items-center"
          >
            <IoIosSearch className=" m-1 cursor-pointer text-white mx-1 h-7 w-7" />
          </button>
        </div>
        <Tabs
          className="w-full m-2 p-2"
          value={type}
          indicatorColor="primary"
          onChange={(e, newValue) => {
            settype(newValue), setpage(1);
          }}
          textColor="primary"
        >
          <Tab style={{ width: "50%" }} label="Search Movies" />
          <Tab style={{ width: "50%" }} label="Search Tv Series" />
        </Tabs>
      </ThemeProvider>
      <div className=" text-gray-100 grid grid-cols-3 md:grid-cols-3 lg:grid-cols-4 gap-4 p-6">
        {content &&
          content.map((c) => (
            <Card
              key={c.id}
              id={c.id}
              media_type={type ? "tv" : "movie"}
              value={c}
            />
          ))}
        {SearchText &&
          !content &&
          (type ? <h2>No series Found</h2> : <h2>No Movies Found</h2>)}
      </div>
      {numOfPages > 1 ? (
        <CustomPagination setpage={setpage} numOfPages={numOfPages} />
      ) : (
        ""
      )}
    </div>
  );
};

export default Search;
