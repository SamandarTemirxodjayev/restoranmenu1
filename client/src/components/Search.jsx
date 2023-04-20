import axios from "axios";
import React, { useState, useEffect } from "react";
import { BsSearch } from "react-icons/bs";
import { Link } from "react-router-dom";

export default function Search() {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [originalResults, setOriginalResults] = useState([]);

  useEffect(() => {
    axios.get("https://restoran-server-project.vercel.app/menu").then((res) => {
      // setSearchResults(res.data.menus);
      setOriginalResults(res.data.menus);
    });
  }, []);

  const handleSearch = (event) => {
    const term = event.target.value.toLowerCase();
    const filteredResults = originalResults.filter((result) =>
      result.name.toLowerCase().includes(term)
    );
    setSearchTerm(term);
    if (term.trim() === "") {
      setSearchResults([]);
    } else {
      setSearchResults(filteredResults);
    }
  };


  return (
    <div>
      <div className="relative">
        <input
          type="text"
          className="w-full py-2 px-8 pl-16 border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-set text-4xl h-16"
          placeholder="Search for food..."
          value={searchTerm}
          onChange={handleSearch}
        />
        <BsSearch className="text-gray-600 w-11 h-11 absolute top-1/2 left-4 transform -translate-y-1/2 " />
      </div>
      {searchResults.length > 0 && (
        <div className=" bg-white p-4">
          {searchResults.map((result) => (
            <Link key={result._id} to={`/menu/${result._id}`}>
              <div className=" text-3xl font-bold my-5">{result.name}</div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
