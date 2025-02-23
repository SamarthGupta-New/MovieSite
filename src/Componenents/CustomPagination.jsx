import React from "react";
import Pagination from "@mui/material/Pagination";
import { ThemeProvider, createTheme } from "@mui/material/styles";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

const CustomPagination = ({ setpage, numOfPages = 10 }) => {
  const handlePageChange = (__, page) => {
    setpage(page);
    console.log(page);
    window.scroll(0, 0);
  };
  return (
    <ThemeProvider theme={darkTheme}>
      <div className="w-full">
        <Pagination
          className=" flex justify-center mt-15"
          count={numOfPages}
          onChange={handlePageChange}
          variant="outlined"
          color="primary"
          hideNextButton
          hidePrevButton
        />
      </div>
    </ThemeProvider>
  );
};

export default CustomPagination;
