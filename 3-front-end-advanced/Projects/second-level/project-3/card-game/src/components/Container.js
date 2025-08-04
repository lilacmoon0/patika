import { Game } from "./Game";
import { Score } from "./Score";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { resetGame } from "../redux/gameSlice";

export const Container = () => {
  const [gameScore, setGameScore] = useState(0);
  const moves = useSelector((state) => state.game.moves);
  const highestScore = useSelector((state) => state.game.highestScore);
  const dispatch = useDispatch();

  const handleRestart = () => {
    dispatch(resetGame());
    setGameScore(0);
  };

  return (
    <div className="container">
      <Score gameScore={gameScore} moves={moves} highestScore={highestScore} />
      <Game gameScore={gameScore} setScore={setGameScore} />
      <button
        onClick={handleRestart}
        style={{
          padding: '0.8rem 2rem',
          fontSize: '1.1rem',
          fontWeight: 'bold',
          borderRadius: '12px',
          background: '#ff4fa3',
          color: 'white',
          border: 'none',
          cursor: 'pointer',
          boxShadow: '0 4px 12px rgba(255, 79, 163, 0.3)',
          transition: 'all 0.2s ease',
          minWidth: '120px',
          marginTop: '2rem'
        }}
        onMouseOver={(e) => {
          e.target.style.transform = 'translateY(-2px)';
          e.target.style.boxShadow = '0 6px 16px rgba(255, 79, 163, 0.4)';
        }}
        onMouseOut={(e) => {
          e.target.style.transform = 'translateY(0px)';
          e.target.style.boxShadow = '0 4px 12px rgba(255, 79, 163, 0.3)';
        }}
      >
        🔄 Restart
      </button>
    </div>
  );
};
