import React from "react";
import MovieList from "./MovieList";
import MovieListHeading from "./components/MovieListHeading";
import RemoveFavourites from "./components/RemoveFavourites";

const Favorites = ({ favorites, removeFavouritesMovie }) => {
  return (
    <div>
      <div className="">
        <MovieListHeading heading="Favourites" />
      </div>
      <MovieList
        movies={favorites}
        handleFavoritesClick={removeFavouritesMovie}
        favComponent={RemoveFavourites}
      />
    </div>
  );
};

export default Favorites;
