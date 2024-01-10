import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Outlet,
} from "react-router-dom";

import "./App.css";
import MovieList from "./MovieList";
import Favorites from "./Favorites";
import MovieListHeading from "./components/MovieListHeading";
import SearchBox from "./components/SearchBox";
import AddFavourites from "./components/AddFavourites";

const App = () => {
  const [movies, setMovies] = useState([]);
  const [favourites, setFavourites] = useState([]);
  const [searchValue, setSearchValue] = useState("son");

  const getMoviesRequest = async (searchValue) => {
    const url = `http://www.omdbapi.com/?s=${searchValue}&apikey=376f35a4`; // Corrected the API query
    const response = await fetch(url);
    const responseJson = await response.json();

    if (responseJson.Search) {
      setMovies(responseJson.Search);
    }
  };

  useEffect(() => {
    getMoviesRequest(searchValue);
  }, [searchValue]);

  useEffect(() => {
    const movieFavourites =
      JSON.parse(localStorage.getItem("react-movie-app-favourites")) || [];
    setFavourites(movieFavourites);
  }, []);

  const saveToLocalStorage = (items) => {
    localStorage.setItem("react-movie-app-favourites", JSON.stringify(items));
  };

  const addFavouriteMovie = (movie) => {
    const newFavouriteList = [...favourites, movie];
    setFavourites(newFavouriteList);
    saveToLocalStorage(newFavouriteList);
  };

  const removeFavouritesMovie = (movie) => {
    const newFavouriteList = favourites.filter(
      (favourite) => favourite.imdbID !== movie.imdbID
    );
    setFavourites(newFavouriteList);
    saveToLocalStorage(newFavouriteList);
  };

  return (
    <Router>
      <div className="app">
        <Routes>
          <Route
            path="/"
            element={
              <>
                <MovieListHeading heading="MovieLand" />
                <Link to="/favorites">
                  <button className="Liked">Go to favourites</button>
                </Link>
                <SearchBox
                  searchValue={searchValue}
                  setSearchValue={setSearchValue}
                />
                <Outlet />
              </>
            }
          >
            <Route
              path="/"
              element={
                <MovieList
                  movies={movies}
                  handleFavoritesClick={addFavouriteMovie}
                  favComponent={AddFavourites}
                />
              }
            />
          </Route>
          <Route
            path="/favorites"
            element={
              <Favorites
                favorites={favourites}
                removeFavouritesMovie={removeFavouritesMovie}
              />
            }
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
