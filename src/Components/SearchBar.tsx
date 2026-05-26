import React from "react";
import { FaSearch } from "react-icons/fa";

const SearchBar = ({ city, setCity }) => {
  return (
    <>
      <div className="mb-3 search-container">
        <input
          type="text"
          className="form-control"
          placeholder=" Search for a Place..."
          value={city}
        onChange={(e) => setCity(e.target.value)}
        />
        <button className="btn search-btn btn-primary">Search</button>
      </div>
    </>
  );
};

export default SearchBar;
