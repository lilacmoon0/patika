import React, { useState } from 'react';
import { useQuery } from '@apollo/client';
import { GET_LOCATIONS } from '../graphql/queries';

const LocationList = () => {
  const [page, setPage] = useState(1);
  const [nameFilter, setNameFilter] = useState('');
  const [typeFilter, setTypeFilter] = useState('');

  const { loading, error, data } = useQuery(GET_LOCATIONS, {
    variables: {
      page,
      filter: {
        name: nameFilter || undefined,
        type: typeFilter || undefined,
      },
    },
  });

  const handleSearch = (e) => {
    setNameFilter(e.target.value);
    setPage(1);
  };

  const handleTypeFilter = (e) => {
    setTypeFilter(e.target.value);
    setPage(1);
  };

  if (loading) return <div className="loading">Loading locations...</div>;
  if (error) return <div className="error">Error: {error.message}</div>;

  const { locations } = data;

  return (
    <div className="container">
      <div className="search-container">
        <input
          type="text"
          placeholder="Search locations..."
          value={nameFilter}
          onChange={handleSearch}
          className="search-input"
        />
        <select
          value={typeFilter}
          onChange={handleTypeFilter}
          className="filter-select"
        >
          <option value="">All Types</option>
          <option value="Planet">Planet</option>
          <option value="Space station">Space station</option>
          <option value="Microverse">Microverse</option>
          <option value="TV">TV</option>
          <option value="Resort">Resort</option>
          <option value="Fantasy town">Fantasy town</option>
          <option value="Dream">Dream</option>
          <option value="Dimension">Dimension</option>
          <option value="unknown">Unknown</option>
        </select>
      </div>

      {locations?.results?.length === 0 ? (
        <div className="no-results">No locations found</div>
      ) : (
        <div className="grid">
          {locations?.results?.map((location) => (
            <div key={location.id} className="card">
              <div className="card-content">
                <h3 className="card-title">{location.name}</h3>
                <div className="card-detail">
                  <strong>Type:</strong> {location.type}
                </div>
                <div className="card-detail">
                  <strong>Dimension:</strong> {location.dimension}
                </div>
                <div className="card-detail">
                  <strong>Residents:</strong> {location.residents.length}
                </div>
                <div className="card-detail">
                  <strong>Created:</strong> {new Date(location.created).toLocaleDateString()}
                </div>
                
                {location.residents.length > 0 && (
                  <div style={{ marginTop: '15px' }}>
                    <strong>Some Residents:</strong>
                    <div style={{ 
                      display: 'flex', 
                      flexWrap: 'wrap', 
                      gap: '10px', 
                      marginTop: '10px' 
                    }}>
                      {location.residents.slice(0, 6).map((resident) => (
                        <div key={resident.id} style={{
                          display: 'flex',
                          alignItems: 'center',
                          background: '#f8f9fa',
                          padding: '5px 10px',
                          borderRadius: '15px',
                          fontSize: '0.9rem'
                        }}>
                          <img
                            src={resident.image}
                            alt={resident.name}
                            style={{
                              width: '30px',
                              height: '30px',
                              borderRadius: '50%',
                              marginRight: '8px'
                            }}
                          />
                          {resident.name}
                        </div>
                      ))}
                      {location.residents.length > 6 && (
                        <div style={{
                          display: 'flex',
                          alignItems: 'center',
                          padding: '5px 10px',
                          fontSize: '0.9rem',
                          color: '#666'
                        }}>
                          +{location.residents.length - 6} more
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {locations?.info && (
        <div className="pagination">
          <button
            onClick={() => setPage(page - 1)}
            disabled={!locations.info.prev}
          >
            Previous
          </button>
          <span className="page-info">
            Page {page} of {locations.info.pages}
          </span>
          <button
            onClick={() => setPage(page + 1)}
            disabled={!locations.info.next}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default LocationList;
