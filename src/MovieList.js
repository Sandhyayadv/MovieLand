import React from "react";

const MovieList = (props) => {
  const FavoriteComponent = props.favComponent;
  return (
    <>
      <div className="container">
        {props.movies.map((movie, index) => (
          <div className="movie" key={index}>
            <img src={movie.Poster} alt="movie"></img>

            <div
              onClick={() => props.handleFavoritesClick(movie)}
              className="overlay"
            >
              <FavoriteComponent />
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default MovieList;
