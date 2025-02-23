import React, { useState } from "react";
import { FaStar } from "react-icons/fa";
import { img_300, unavailable } from "./Config";
import ContentModal from "../ContenModel/ContentModel";
import { Link } from "react-router-dom";

const Card = ({ value, media_type, id }) => {
  return (
    <ContentModal media_type={media_type} id={value.id}>
      <div className="p-3">
        <div className="relative w-[200px] h-[300px] transition-transform duration-300 ease-in-out transform hover:scale-120 hover:z-20">
          {/* Movie Poster */}
          <img
            className="h-[270px] w-[190px] m-1 rounded-xl object-cover"
            src={
              value.poster_path ? `${img_300}${value.poster_path}` : unavailable
            }
            alt={value.title || value.name}
          />
          <div className="" />
          <div className="absolute w-full text-gray-300 rounded-xl p-1 flex flex-col items-center">
            <div className="flex font-semibold justify-between w-full px-2 text-sm">
              <p>{media_type === "movie" ? "Movie" : "TV Series"}</p>
              <p className="flex items-center gap-1">
                <FaStar className="w-4 h-4 text-yellow-500" />
                {Math.round(value.vote_average * 10) / 10}
              </p>
            </div>
          </div>
        </div>
      </div>
    </ContentModal>
  );
};

export default Card;
