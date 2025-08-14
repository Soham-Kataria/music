// import React, { useState } from "react";
// import apiClient from "../../api/apiClient";
// import SearchBar from "./SearchBar.jsx";
// import SearchResults from "./SearchResults.jsx";
// import Loader from "../Common/Loader.jsx";

// const Search = ({ onTrackSelect }) => {
//   const [results, setResults] = useState([]);
//   const [error, setError] = useState("");
//   const [loading, setLoading] = useState(false);

//   const handleSearch = async (query) => {
//     setLoading(true);
//     setError("");
//     try {
//       const res = await apiClient.get(`/search?q=${encodeURIComponent(query)}`);
//       setResults(res.data.data);
//     } catch (err) {
//       setError(err.response?.data?.message || "Search failed");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div>
//       <SearchBar onSearch={handleSearch} />
//       {loading && <Loader />}
//       {error && <p className="search-error">{error}</p>}
//       <SearchResults results={results} onPlaySong={onTrackSelect} />

//     </div>
//   );
// };

// export default Search;


import React, { useState } from "react";
import apiClient from "../../api/apiClient";
import SearchBar from "./SearchBar.jsx";
import SearchResults from "./SearchResults.jsx";
import Loader from "../Common/Loader.jsx";

const Search = ({ onTrackSelect }) => {
  const [results, setResults] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSearch = async (query) => {
    setLoading(true);
    setError("");
    try {
      const res = await apiClient.get(`/search?q=${encodeURIComponent(query)}`);
      setResults(res.data.data);
    } catch (err) {
      setError(err.response?.data?.message || "Search failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <SearchBar onSearch={handleSearch} />
      {loading && <Loader />}
      {error && <p className="search-error">{error}</p>}
      {/* Fix here: use onTrackSelect prop */}
      <SearchResults results={results} onTrackSelect={onTrackSelect} />
    </div>
  );
};

export default Search;
