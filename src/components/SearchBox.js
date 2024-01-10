import React from "react";

const SearchBox = (props) => {
  return (
    <div className="search">
      <input
        className=""
        value={props.SearchValue}
        onChange={(e) => props.setSearchValue(e.target.value)}
        placeholder="Search Movies Here ..."
      />
    </div>
  );
};

export default SearchBox;
