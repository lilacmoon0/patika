import React, { useState } from 'react';
import { useQuery } from '@apollo/client';
import { useNavigate } from 'react-router-dom';
import { GET_CHARACTERS } from '../graphql/queries';

const CharacterList = () => {
  const [page, setPage] = useState(1);
  const [nameFilter, setNameFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [speciesFilter, setSpeciesFilter] = useState('');
  const [genderFilter, setGenderFilter] = useState('');
  
  const navigate = useNavigate();

  const { loading, error, data } = useQuery(GET_CHARACTERS, {
    variables: {
      page,
      filter: {
        name: nameFilter || undefined,
        status: statusFilter || undefined,
        species: speciesFilter || undefined,
        gender: genderFilter || undefined,
      },
    },
  });

  const handleCharacterClick = (id) => {
    navigate(`/character/${id}`);
  };

  const handleSearch = (e) => {
    setNameFilter(e.target.value);
    setPage(1); // Reset to first page when searching
  };

  const handleFilterChange = (filterType, value) => {
    setPage(1); // Reset to first page when filtering
    switch (filterType) {
      case 'status':
        setStatusFilter(value);
        break;
      case 'species':
        setSpeciesFilter(value);
        break;
      case 'gender':
        setGenderFilter(value);
        break;
      default:
        break;
    }
  };

  const getStatusClass = (status) => {
    switch (status.toLowerCase()) {
      case 'alive':
        return 'status-alive';
      case 'dead':
        return 'status-dead';
      default:
        return 'status-unknown';
    }
  };

  if (loading) return <div className="loading">Loading characters...</div>;
  if (error) return <div className="error">Error: {error.message}</div>;

  const { characters } = data;

  return (
    <div className="container">
      <div className="search-container">
        <input
          type="text"
          placeholder="Search characters..."
          value={nameFilter}
          onChange={handleSearch}
          className="search-input"
        />
        <select
          value={statusFilter}
          onChange={(e) => handleFilterChange('status', e.target.value)}
          className="filter-select"
        >
          <option value="">All Status</option>
          <option value="alive">Alive</option>
          <option value="dead">Dead</option>
          <option value="unknown">Unknown</option>
        </select>
        <select
          value={speciesFilter}
          onChange={(e) => handleFilterChange('species', e.target.value)}
          className="filter-select"
        >
          <option value="">All Species</option>
          <option value="Human">Human</option>
          <option value="Alien">Alien</option>
          <option value="Robot">Robot</option>
          <option value="Animal">Animal</option>
          <option value="Cronenberg">Cronenberg</option>
          <option value="Disease">Disease</option>
        </select>
        <select
          value={genderFilter}
          onChange={(e) => handleFilterChange('gender', e.target.value)}
          className="filter-select"
        >
          <option value="">All Genders</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Genderless">Genderless</option>
          <option value="unknown">Unknown</option>
        </select>
      </div>

      {characters?.results?.length === 0 ? (
        <div className="no-results">No characters found</div>
      ) : (
        <div className="grid">
          {characters?.results?.map((character) => (
            <div
              key={character.id}
              className="card"
              onClick={() => handleCharacterClick(character.id)}
            >
              <img
                src={character.image}
                alt={character.name}
                className="card-image"
              />
              <div className="card-content">
                <h3 className="card-title">{character.name}</h3>
                <div className="card-detail">
                  <span className={`status-indicator ${getStatusClass(character.status)}`}></span>
                  <strong>Status:</strong> {character.status} - {character.species}
                </div>
                <div className="card-detail">
                  <strong>Gender:</strong> {character.gender}
                </div>
                <div className="card-detail">
                  <strong>Origin:</strong> {character.origin.name}
                </div>
                <div className="card-detail">
                  <strong>Location:</strong> {character.location.name}
                </div>
                <div className="card-detail">
                  <strong>Episodes:</strong> {character.episode.length}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {characters?.info && (
        <div className="pagination">
          <button
            onClick={() => setPage(page - 1)}
            disabled={!characters.info.prev}
          >
            Previous
          </button>
          <span className="page-info">
            Page {page} of {characters.info.pages}
          </span>
          <button
            onClick={() => setPage(page + 1)}
            disabled={!characters.info.next}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default CharacterList;
