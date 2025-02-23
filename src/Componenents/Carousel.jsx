import React, { useEffect, useState } from "react";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import { img_300, noPicture } from "./Config";
import axios from "axios";

const handleDragStart = (e) => e.preventDefault();

const Carousel = ({ media_type, id }) => {
  const [credits, setCredits] = useState([]);

  useEffect(() => {
    const fetchCredits = async () => {
      const Api_Key = "070ddf6f0ab61f11b00dc960ce90b129";
      try {
        const { data } = await axios.get(
          `https://api.themoviedb.org/3/${media_type}/${id}/credits?api_key=${Api_Key}&language=en-US`
        );
        setCredits(data.cast || []);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchCredits();
  }, [media_type, id]);

  const items = credits.map((c) => (
    <div className="flex flex-col md:my-8  m-1 rounded-2xl items-center p-2">
      <img
        src={c.profile_path ? `${img_300}/${c.profile_path}` : noPicture}
        alt={c?.name}
        onDragStart={handleDragStart}
        className="rounded-xl mb-1  sm:w-[120px] sm:h-[140px] lg:w-[270px] lg:h-[200px] w-[130px] h-[200px] object-contain"
      />
      <b className="text-sm lg:mb-5 mb-2 font-medium text-center w-full truncate">
        {c?.name}
      </b>
    </div>
  ));

  const responsive = {
    0: { items: 3 },
    1024: { items: 3 },
    1280: { items: 4 },
  };

  return (
    <div className="overflow-hidden w-full">
      <AliceCarousel
        responsive={responsive}
        mouseTracking
        items={
          items.length
            ? items
            : [<div className="text-center">No credits available</div>]
        }
        disableDotsControls
        disableButtonsControls
        autoPlay
        autoPlayInterval={1500}
        infinite
        paddingLeft={10}
        paddingRight={10}
      />
    </div>
  );
};

export default Carousel;
