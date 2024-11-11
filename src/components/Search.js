import React, { useState } from "react";

function Search({onSearch}) {
  const [term, setTerm]=useState("")

  function handleSearch(e){
    const newTerm=e.target.value;
    setTerm(newTerm);
    onSearch(newTerm)
  }
  return (
    <div className="searchbar">
      <label htmlFor="search">Search Plants:</label>
      <input
        type="text"
        id="search"
        placeholder="Type a name to search..."
        value={term}
        onChange={handleSearch}
      />
    </div>
  );
}


export default Search;
