import React, { useEffect, useReducer } from "react";
import "./App.css";
import Header from "./components/Header";
import Movie from "./components/Movie";
import Search from "./components/Search";

const MOVIE_API_URL = "https://www.omdbapi.com/?s=love&apikey=5172077c";

const App = () => {
  const initialState = {
    loading: true,
    movies: [],
    errorMessage: null
  };

  const reducer = (state, action) => {
    switch (action.type) {
      case "SEARCH_MOVIES_REQUEST":
        return {
          ...state,
          loading: true,
          errorMessage: null
        };
      case "SEARCH_MOVIES_SUCCESS":
        console.log(action.payload);
        return {
          ...state,
          loading: false,
          movies: !action.payload.length ? [action.payload] : action.payload
        };
      case "SEARCH_MOVIES_FAILURE":
        return {
          ...state,
          loading: false,
          errorMessage: action.error
        };
      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    fetch(MOVIE_API_URL)
      .then(response => response.json())
      .then(jsonResponse => {
        dispatch({
          type: "SEARCH_MOVIES_SUCCESS",
          payload: jsonResponse.Search
        });
      });
  }, []);

  const search = searchValue => {
    dispatch({
      type: "SEARCH_MOVIES_REQUEST"
    });

    let url = `https://www.omdbapi.com/?s=${searchValue.term.trim()}&y=${
      Number.isInteger(parseInt(searchValue.year)) ? searchValue.year : ""
    }&plot=${searchValue.plot}&apikey=5172077c`;
    console.log(url);

    fetch(url)
      .then(response => response.json())
      .then(jsonResponse => {
        console.log(jsonResponse);
        if (jsonResponse.Response === "True") {
          dispatch({
            type: "SEARCH_MOVIES_SUCCESS",
            payload: jsonResponse.Search || jsonResponse
          });
        } else {
          dispatch({
            type: "SEARCH_MOVIES_FAILURE",
            error: jsonResponse.Error
          });
        }
      });
  };

  const { movies, errorMessage, loading } = state;

  return (
    <div className="App">
      <Header text="React Movie Search App" />
      <Search search={search} />
      <p className="App-intro">Some of my favs to get you started</p>
      <div className="movies">
        {loading && !errorMessage ? (
          <span>loading... </span>
        ) : errorMessage ? (
          <div className="errorMessage">{errorMessage}</div>
        ) : (
          movies.map((movie, index) => (
            <Movie key={`${index}-${movie.Title}`} movie={movie} />
          ))
        )}
      </div>
    </div>
  );
};

export default App;
