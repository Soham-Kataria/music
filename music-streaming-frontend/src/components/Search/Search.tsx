import React, { useState } from "react";
import { searchService } from "../../api/searchService";
import SearchBar from "./SearchBar";
import SearchResults from "./SearchResults";
import Loader from "../Common/Loader";
import type { Track } from "../../types";

interface SearchProps {
  onTrackSelect: (track: Track, allTracks: Track[]) => void;
}

const Search: React.FC<SearchProps> = ({ onTrackSelect }) => {
  const [results, setResults] = useState<Track[]>([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSearch = async (query: string) => {
    setLoading(true);
    setError("");
    try {
      const data = await searchService.search(query);
      setResults(data);
    } catch (err) {
      const message = (err as { response?: { data?: { message?: string } } })
        .response?.data?.message || "Search failed";
      setError(message);
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
