import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  resetTime,
  setCurrentWordIndex,
  setCurrentWord,
  setInputValue,
  startGame,
  endGame,
  decrementTimeLeft,
  incrementScore,
} from "../redux/wordsSlice";

import { fetchWords } from "../redux/wordsSlice";

export const InputArea = () => {
  const words = useSelector((state) => state.words.words);
  const currentWordIndex = useSelector((state) => state.words.currentWordIndex);
  const currentWord = useSelector((state) => state.words.currentWord);
  const inputValue = useSelector((state) => state.words.inputValue);
  const isGameStarted = useSelector((state) => state.words.isGameStarted);
  const isGameOver = useSelector((state) => state.words.isGameOver);
  const timeLeft = useSelector((state) => state.words.timeLeft);

  const score = useSelector((state) => state.words.score);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!isGameStarted || isGameOver) return;
    if (timeLeft <= 0) {
      dispatch(endGame());
      return;
    }
    const timer = setTimeout(() => {
      dispatch(decrementTimeLeft());
    }, 1000);
    return () => clearTimeout(timer);
  }, [isGameStarted, isGameOver, timeLeft, dispatch]);

  const handleInputChange = (e) => {
    const value = e.target.value;
    if (!isGameStarted) {
      dispatch(startGame());
      dispatch(setCurrentWordIndex(0));
      dispatch(setCurrentWord(words[0]));
    }
    dispatch(setInputValue(value));
  };

  const handleKeyDown = (e) => {
    if (e.code === "Space" || e.key === " ") {
      e.preventDefault();
      const isCorrect = inputValue.trim() === currentWord;
      dispatch(incrementScore({ isCorrect }));
      if (currentWordIndex < words.length - 1) {
        dispatch(setCurrentWordIndex(currentWordIndex + 1));
        dispatch(setCurrentWord(words[currentWordIndex + 1]));
        dispatch(setInputValue(""));
      } else {
        dispatch(endGame());
      }
    }
  };

  const handleReset = () => {
    dispatch(fetchWords());
    dispatch(setCurrentWordIndex(0));
    dispatch(setCurrentWord(words[0]));
    dispatch(setInputValue(""));
    dispatch(resetTime());
  };

  return (
    <div className="input-area">
      <input
        type="text"
        className="input-field"
        placeholder="Start typing..."
        autoFocus
        value={inputValue || ""}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        disabled={isGameOver}
      />
      <div className="timer">Time Left: {timeLeft}s</div>
      <button onClick={handleReset} className="reset-button">
        Reset
      </button>
    </div>
  );
};