import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { setCurrentWordIndex } from '../redux/wordsSlice';

export const TextArea = () => {
  const words = useSelector((state) => state.words.words);
  const currentWordIndex = useSelector((state) => state.words.currentWordIndex);
  const isGameStarted = useSelector((state) => state.words.isGameStarted);
  const isGameOver = useSelector((state) => state.words.isGameOver);
  const typedResults = useSelector((state) => state.words.typedResults);
  const dispatch = useDispatch();

  useEffect(() => {
    if (isGameStarted && !isGameOver) {
      if (currentWordIndex === -1) {
        dispatch(setCurrentWordIndex(0));
      }
    }
  }, []);

  return (
    <div className="words-container">
      {words.map((word, index) => {
        let className = "word";
        if (index === currentWordIndex) className += " current-word";
        if (typedResults && typedResults[index] === true) className += " correct-word";
        if (typedResults && typedResults[index] === false) className += " incorrect-word";
        return (
          <span key={index} className={className}>
            {word}{" "}
          </span>
        );
      })}
    </div>
  );
}