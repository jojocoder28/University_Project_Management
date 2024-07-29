import React, { useState } from 'react';

const SearchBar = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = () => {
    onSearch(searchTerm);
  };

  return (
    <div className="flex mb-4 p-4">
      <input 
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="input input-bordered w-full"
        placeholder="Search projects by name, description, or tags..."
      />
      <button onClick={handleSearch} className="btn btn-primary ml-4">Search</button>
    </div>
  );
};

export default SearchBar;
