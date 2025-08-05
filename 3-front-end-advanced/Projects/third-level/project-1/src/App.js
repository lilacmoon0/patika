import React, { useState, useEffect, useRef } from 'react';
import './App.css';

function App() {
  const [playerChoice, setPlayerChoice] = useState('');
  const [computerChoice, setComputerChoice] = useState('');
  const [playerScore, setPlayerScore] = useState(0);
  const [computerScore, setComputerScore] = useState(0);
  const [result, setResult] = useState('');
  const [isPlaying, setIsPlaying] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const [showChoices, setShowChoices] = useState(false);
  const gameProcessedRef = useRef(false);

  const choices = ['rock', 'paper', 'scissors'];
  const emojis = {
    rock: "./rock.png",
    paper: "./paper.png",
    scissors: "./scissors.png",
  };

  const getComputerChoice = () => {
    return choices[Math.floor(Math.random() * choices.length)];
  };

  const determineWinner = (player, computer) => {
    if (player === computer) return 'tie';
    if (
      (player === 'rock' && computer === 'scissors') ||
      (player === 'paper' && computer === 'rock') ||
      (player === 'scissors' && computer === 'paper')
    ) {
      return 'player';
    }
    return 'computer';
  };

  const playGame = (playerChoice) => {
    if (isPlaying) return; // Prevent multiple clicks during countdown
    
    const computerChoice = getComputerChoice();
    const winner = determineWinner(playerChoice, computerChoice);
    
    setPlayerChoice(playerChoice);
    setComputerChoice('');
    setResult('');
    setIsPlaying(true);
    setShowChoices(false);
    gameProcessedRef.current = false; // Reset the flag for new game
    
    // Start countdown from 3
    setCountdown(3);
    
    const countdownInterval = setInterval(() => {
      setCountdown(prev => {
        if (prev <= 1) {
          clearInterval(countdownInterval);
          // Show computer choice and result after countdown
          setTimeout(() => {
            setComputerChoice(computerChoice);
            setShowChoices(true);
            
            setTimeout(() => {
              // Prevent double execution
              if (gameProcessedRef.current) return;
              gameProcessedRef.current = true;
              
              let resultMessage = '';
              
              if (winner === 'tie') {
                resultMessage = "It's a tie! 🤝";
              } else if (winner === 'player') {
                resultMessage = 'You win! 🎉';
                // Update score after result is shown
                setPlayerScore(prev => prev + 1);
              } else {
                resultMessage = 'Computer wins! 🤖';
                // Update score after result is shown
                setComputerScore(prev => prev + 1);
              }
              
              setResult(resultMessage);
              setIsPlaying(false);
            }, 500);
          }, 300);
          
          return 0;
        }
        return prev - 1;
      });
    }, 800);
  };

  const resetGame = () => {
    setPlayerChoice('');
    setComputerChoice('');
    setPlayerScore(0);
    setComputerScore(0);
    setResult('');
    setIsPlaying(false);
    setCountdown(0);
    setShowChoices(false);
  };

  // Cleanup intervals on unmount
  useEffect(() => {
    return () => {
      // Cleanup any remaining intervals
    };
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Rock Paper Scissors</h1>
        <div className="game-container">
          
          
          <div className="scoreboard">
            <div className="score">
              <h3>You: {playerScore}</h3>
            </div>
            <div className="score">
              <h3>Computer: {computerScore}</h3>
            </div>
          </div>

          <div className="game-area">
            {/* Countdown Display */}
            {countdown > 0 && (
              <div className="countdown-overlay">
                <div className="countdown-number">{countdown}</div>
                <div className="countdown-text">Get Ready!</div>
              </div>
            )}

            {/* Result Modal */}
            {result && !countdown && (
              <div className="result-modal-overlay">
                <div className={`result-modal ${result.includes('You win') ? 'win' : result.includes('Computer wins') ? 'lose' : 'tie'}`}>
                  <h2>{result}</h2>
                  <button className="continue-button" onClick={() => setResult('')}>
                    Continue Playing
                  </button>
                </div>
              </div>
            )}

            <div className="choices-display">
              <div className="player-choice">
                <h4>Your Choice</h4>
                <div className="icon-container">
                  <div className={`choice-emoji ${playerChoice ? 'selected' : ''}`}>
                    {playerChoice ? (
                      <img src={emojis[playerChoice]} alt={playerChoice} className="choice-image" />
                    ) : (
                      '❓'
                    )}
                  </div>
                </div>
              </div>
              <div className="vs">
                {countdown > 0 ? '⚡' : 'VS'}
              </div>
              <div className="computer-choice">
                <h4>Computer's Choice</h4>
                <div className="icon-container">
                  <div className={`choice-emoji ${computerChoice && showChoices ? 'revealed' : isPlaying ? 'thinking' : ''}`}>
                    {computerChoice && showChoices ? (
                      <img src={emojis[computerChoice]} alt={computerChoice} className="choice-image" />
                    ) : isPlaying ? (
                      '🤔'
                    ) : (
                      '❓'
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="game-buttons">
              {choices.map(choice => (
                <button 
                  key={choice}
                  className={`choice-button ${isPlaying ? 'disabled' : ''} ${playerChoice === choice ? 'active' : ''}`}
                  onClick={() => playGame(choice)}
                  disabled={isPlaying}
                >
                  <img src={emojis[choice]} alt={choice} className="emoji" />
                  <span className="choice-name">{choice.charAt(0).toUpperCase() + choice.slice(1)}</span>
                </button>
              ))}
            </div>

            <button className="reset-button" onClick={resetGame} disabled={isPlaying}>
              Reset Game
            </button>
          </div>
        </div>
      </header>
    </div>
  );
}

export default App;
