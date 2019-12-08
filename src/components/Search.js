import React, { useState } from "react";

const Search = props => {
  const [searchValue, setSearchValue] = useState({
    term: "",
    year: "",
    plot: "short"
  });

  const handleSearchInputChanges = e => {
    setSearchValue({ ...searchValue, [e.target.name]: e.target.value });
  };

  const resetInputField = () => {
    console.log("resetting...");
    setSearchValue({ term: "", year: "", plot: "short" });
  };

  const callSearchFunction = e => {
    e.preventDefault();
    props.search(searchValue);
    resetInputField();
  };

  return (
    <form className="search">
      <label>Title</label>
      <input
        name="term"
        value={searchValue.term}
        onChange={handleSearchInputChanges}
        type="text"
      />
      <label>Year</label>
      <input
        id="year"
        name="year"
        value={searchValue.year}
        onChange={handleSearchInputChanges}
        type="text"
      ></input>
      <label>Plot Summary</label>
      <select onChange={handleSearchInputChanges} name="plot">
        <option value="short">Short</option>
        <option value="full">Full</option>
      </select>
      <input onClick={callSearchFunction} type="submit" value="SEARCH" />
    </form>
  );
};

export default Search;
