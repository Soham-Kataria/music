import React, { useState } from "react";
import Button from "../Common/Button";
import Input from "../Common/Input";

interface SearchBarProps {
  onSearch: (query: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [query, setQuery] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query.trim());
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{ display: "flex", maxWidth: 600, margin: "20px auto" }}
    >
      <Input
        type="text"
        placeholder="Search songs, artists, playlists..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        style={{ flexGrow: 1 }}
      />
      <Button type="submit" style={{ marginLeft: 10 }}>
        Search
      </Button>
    </form>
  );
};

export default SearchBar;
