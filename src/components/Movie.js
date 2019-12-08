import React from "react";

const default_img =
  "https://images-na.ssl-images-amazon.com/images/I/51gD%2BEFFDoL.jpg";

const Movie = ({ movie }) => {
  const poster = movie.Poster === "N/A" ? default_img : movie.Poster;
  return (
    <div className="movie">
      <h2>{movie.Title}</h2>
      <div>
        <img
          width="200"
          alt={`The movie titled: ${movie.Title}`}
          src={poster}
        />
      </div>
      <p>({movie.Year})</p>
    </div>
  );
};

export default Movie;
