export const Score = ({ gameScore, moves, highestScore }) => {
  return (
    <div style={{ 
      display: 'flex', 
      flexDirection: 'column',
      alignItems: 'center',
      width: '100%', 
      maxWidth: '600px',
      margin: '1rem 0',
      gap: '1rem'
    }}>
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        width: '100%',
        padding: '1rem',
        backgroundColor: '#f8f9fa',
        borderRadius: '12px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
      }}>
        <span style={{ 
          fontSize: '1.2rem', 
          fontWeight: 'bold', 
          color: '#ff4fa3' 
        }}>
          Score: {gameScore}
        </span>
        <span style={{ 
          fontSize: '1.2rem', 
          fontWeight: 'bold', 
          color: '#ff4fa3' 
        }}>
          Moves: {Math.round(moves)}
        </span>
        <span style={{ 
          fontSize: '1.2rem', 
          fontWeight: 'bold', 
          color: '#28a745' 
        }}>
          Best: {highestScore}
        </span>
      </div>
    </div>
  );
};
