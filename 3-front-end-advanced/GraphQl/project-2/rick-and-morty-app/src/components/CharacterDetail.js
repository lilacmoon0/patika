import React from 'react';
import { useQuery } from '@apollo/client';
import { useParams, useNavigate } from 'react-router-dom';
import { GET_CHARACTER_BY_ID } from '../graphql/queries';

const CharacterDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { loading, error, data } = useQuery(GET_CHARACTER_BY_ID, {
    variables: { id },
  });

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

  if (loading) return <div className="loading">Loading character...</div>;
  if (error) return <div className="error">Error: {error.message}</div>;

  const { character } = data;

  return (
    <div className="container">
      <button 
        onClick={() => navigate('/characters')}
        style={{
          padding: '10px 20px',
          marginBottom: '20px',
          backgroundColor: '#667eea',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer'
        }}
      >
        ← Back to Characters
      </button>
      
      <div className="character-detail">
        <div className="character-detail-header">
          <img
            src={character.image}
            alt={character.name}
            className="character-detail-image"
          />
          <div className="character-detail-info">
            <h1 className="character-detail-title">{character.name}</h1>
            
            <div className="character-detail-item">
              <span className={`status-indicator ${getStatusClass(character.status)}`}></span>
              <strong>Status:</strong> {character.status}
            </div>
            
            <div className="character-detail-item">
              <strong>Species:</strong> {character.species}
            </div>
            
            {character.type && (
              <div className="character-detail-item">
                <strong>Type:</strong> {character.type}
              </div>
            )}
            
            <div className="character-detail-item">
              <strong>Gender:</strong> {character.gender}
            </div>
            
            <div className="character-detail-item">
              <strong>Origin:</strong> {character.origin.name}
              {character.origin.dimension && (
                <span> ({character.origin.dimension})</span>
              )}
            </div>
            
            <div className="character-detail-item">
              <strong>Last known location:</strong> {character.location.name}
              {character.location.dimension && (
                <span> ({character.location.dimension})</span>
              )}
            </div>
            
            <div className="character-detail-item">
              <strong>Created:</strong> {new Date(character.created).toLocaleDateString()}
            </div>
          </div>
        </div>
        
        <div className="episodes-section">
          <h3>Episodes ({character.episode.length})</h3>
          <div className="episodes-grid">
            {character.episode.map((episode) => (
              <div key={episode.id} className="episode-card">
                <div className="episode-name">{episode.name}</div>
                <div className="episode-code">{episode.episode}</div>
                {episode.air_date && (
                  <div className="episode-code">Aired: {episode.air_date}</div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CharacterDetail;
