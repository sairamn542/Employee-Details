import React, { useState, useEffect } from 'react';

const CafeSearch = () => {
  const [cafes, setCafes] = useState([]);
  const [filteredCafes, setFilteredCafes] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const mockCafes = [
      { id: 1, name: "Cafe A", location: "City A", rating: 4.5 },
      { id: 2, name: "Cafe B", location: "City B", rating: 4.0 },
      { id: 3, name: "Cafe C", location: "City C", rating: 4.2 },
    ];
    setCafes(mockCafes);
    setFilteredCafes(mockCafes);
  }, []);

  const handleSearch = (e) => {
    const searchTerm = e.target.value.toLowerCase();
    setSearchTerm(searchTerm);
    const filteredCafes = cafes.filter(cafe =>
      cafe.name.toLowerCase().includes(searchTerm)
    );
    setFilteredCafes(filteredCafes);
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Search cafes by name"
        value={searchTerm}
        onChange={handleSearch}
      />
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Location</th>
            <th>Rating</th>
          </tr>
        </thead>
        <tbody>
          {filteredCafes.map(cafe => (
            <tr key={cafe.id}>
              <td>{cafe.name}</td>
              <td>{cafe.location}</td>
              <td>{cafe.rating}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CafeSearch;
