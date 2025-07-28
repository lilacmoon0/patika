import React, { useState } from 'react';
import { useQuery } from '@apollo/client';
import { GET_EPISODES } from '../graphql/queries';

const EpisodeList = () => {
  const [page, setPage] = useState(1);
  const [nameFilter, setNameFilter] = useState('');

  const { loading, error, data } = useQuery(GET_EPISODES, {
    variables: {
      page,
      filter: {
        name: nameFilter || undefined,
      },
    },
  });

  const handleSearch = (e) => {
    setNameFilter(e.target.value);
    setPage(1);
  };

  if (loading) return <div className="loading">Loading episodes...</div>;
  if (error) return <div className="error">Error: {error.message}</div>;

  const { episodes } = data;

  return (
    <div className="container">
      <div className="search-container">
        <input
          type="text"
          placeholder="Search episodes..."
          value={nameFilter}
          onChange={handleSearch}
          className="search-input"
        />
      </div>

      {episodes?.results?.length === 0 ? (
        <div className="no-results">No episodes found</div>
      ) : (
        <div className="grid">
          {episodes?.results?.map((episode) => (
            <div key={episode.id} className="card">
              <div className="card-content">
                <h3 className="card-title">{episode.name}</h3>
                <div className="card-detail">
                  <strong>Episode:</strong> {episode.episode}
                </div>
                <div className="card-detail">
                  <strong>Air Date:</strong> {episode.air_date}
                </div>
                <div className="card-detail">
                  <strong>Characters:</strong> {episode.characters.length}
                </div>
                <div className="card-detail">
                  <strong>Created:</strong> {new Date(episode.created).toLocaleDateString()}
                </div>
                
                {episode.characters.length > 0 && (
                  <div style={{ marginTop: '15px' }}>
                    <strong>Featured Characters:</strong>
                    <div style={{ 
                      display: 'flex', 
                      flexWrap: 'wrap', 
                      gap: '10px', 
                      marginTop: '10px' 
                    }}>
                      {episode.characters.slice(0, 6).map((character) => (
                        <div key={character.id} style={{
                          display: 'flex',
                          alignItems: 'center',
                          background: '#f8f9fa',
                          padding: '5px 10px',
                          borderRadius: '15px',
                          fontSize: '0.9rem'
                        }}>
                          <img
                            src={character.image}
                            alt={character.name}
                            style={{
                              width: '30px',
                              height: '30px',
                              borderRadius: '50%',
                              marginRight: '8px'
                            }}
                          />
                          {character.name}
                        </div>
                      ))}
                      {episode.characters.length > 6 && (
                        <div style={{
                          display: 'flex',
                          alignItems: 'center',
                          padding: '5px 10px',
                          fontSize: '0.9rem',
                          color: '#666'
                        }}>
                          +{episode.characters.length - 6} more
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

      {episodes?.info && (
        <div className="pagination">
          <button
            onClick={() => setPage(page - 1)}
            disabled={!episodes.info.prev}
          >
            Previous
          </button>
          <span className="page-info">
            Page {page} of {episodes.info.pages}
          </span>
          <button
            onClick={() => setPage(page + 1)}
            disabled={!episodes.info.next}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default EpisodeList;
