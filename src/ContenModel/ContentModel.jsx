import * as React from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Typography from "@mui/material/Typography";
import YouTubeIcon from "@mui/icons-material/YouTube";
import Button from "@mui/material/Button";
import axios from "axios";
import { useState, useEffect } from "react";
import { IoIosClose } from "react-icons/io";
import {
  unavailable,
  img_500,
  unavailableLandscape,
} from "../Componenents/Config";
import Carousel from "../Componenents/Carousel";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "90%",
  maxWidth: "1100px",
  maxHeight: "90vh",
  overflowY: "auto",
  bgcolor: "#000000",
  border: "1px solid #282c34",
  boxShadow: 24,
  p: 4,
  borderRadius: 2,
};

export default function ContentModal({ children, media_type, id }) {
  const [video, setVideo] = useState(null);
  const [content, setContent] = useState(null);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const Api_Key = "070ddf6f0ab61f11b00dc960ce90b129";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(
          `https://api.themoviedb.org/3/${media_type}/${id}?api_key=${Api_Key}&language=en-US`
        );
        setContent(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    const fetchVideo = async () => {
      try {
        const { data } = await axios.get(
          `https://api.themoviedb.org/3/${media_type}/${id}/videos?api_key=${Api_Key}&language=en-US`
        );
        setVideo(data.results[0]?.key || null);
      } catch (error) {
        console.error("Error fetching video:", error);
      }
    };

    fetchData();
    fetchVideo();
  }, [media_type, id]);

  return (
    <div>
      <Button onClick={handleOpen}>{children}</Button>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            {content && (
              <div className="flex flex-col md:flex-row text-gray-300 justify-between">
                <div className="button flex  md:hidden justify-end mb-1">
                  <button
                    onClick={handleClose}
                    className="flex justify-center cursor-pointer items-center w-7 h-7"
                  >
                    <IoIosClose />
                  </button>
                </div>
                <img
                  className="hidden md:block object-contain  w-full md:w-1/3"
                  src={
                    content.poster_path
                      ? `${img_500}/${content.poster_path}`
                      : unavailable
                  }
                  alt={content.name || content.title}
                />
                <img
                  className="block md:hidden object-contian rounded-lg w-full"
                  src={
                    content.backdrop_path
                      ? `${img_500}/${content.backdrop_path}`
                      : unavailableLandscape
                  }
                  alt={content.name || content.title}
                />
                <div className="about md:mx-4 flex sm:text-sm flex-col w-full md:w-2/3">
                  <Typography
                    variant="h5"
                    component="h3"
                    className="text-center font-semibold"
                  >
                    {content.name || content.title} (
                    {(
                      content.first_air_date ||
                      content.release_date ||
                      "_"
                    ).substring(0, 4)}
                    )
                  </Typography>
                  {content.tagline && (
                    <Typography className="italic text-center my-2 text-gray-400">
                      {content.tagline}
                    </Typography>
                  )}
                  <Typography className="text-wrap border border-gray-400 rounded-xl p-3 my-2">
                    {content.overview}
                  </Typography>
                  <Carousel media_type={media_type} id={id} />
                  {video && (
                    <Button
                      variant="contained"
                      startIcon={<YouTubeIcon />}
                      color="primary"
                      target="_blank"
                      href={`https://www.youtube.com/watch?v=${video}`}
                      className="mt-4"
                    >
                      Watch Video
                    </Button>
                  )}
                </div>
              </div>
            )}
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}
