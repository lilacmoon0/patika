import { createSlice } from '@reduxjs/toolkit';
import cards from './Cards.json';

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}


const allCards = [
  ...cards.map(card => ({ ...card, instanceId: `${card.id}-a` })),
  ...cards.map(card => ({ ...card, instanceId: `${card.id}-b` }))
];

const shuffledCards = shuffleArray([...allCards]);

// Get highest score from localStorage
const getHighestScore = () => {
  const saved = localStorage.getItem('cardGameHighestScore');
  return saved ? parseInt(saved, 10) : 0;
};

// Save highest score to localStorage
const saveHighestScore = (score) => {
  localStorage.setItem('cardGameHighestScore', score.toString());
};

const initialState = {
  cards: shuffledCards,
  moves: 0,
  highestScore: getHighestScore()
};

export const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
  updateFlip: (state, action) => {
    const { instanceId } = action.payload;
    const card = state.cards.find((c) => c.instanceId === instanceId);
    if (card) {
      card.flip = true;
      state.moves += 0.5;
    }
  },
  setDone: (state, action) => {
    const { instanceIds } = action.payload;
    state.cards.forEach(card => {
      if (instanceIds.includes(card.instanceId)) {
        card.done = true;
        card.flip = false;
      }
    });
  },
  resetFlip: (state, action) => {
    const { instanceIds } = action.payload;
    state.cards.forEach(card => {
      if (instanceIds.includes(card.instanceId)) {
        card.flip = false;
      }
    });
  },
  resetGame: (state) => {
    const newShuffledCards = shuffleArray([...allCards]);
    state.cards = newShuffledCards;
    state.moves = 0;
  },
  updateHighestScore: (state, action) => {
    const newScore = action.payload;
    if (newScore > state.highestScore) {
      state.highestScore = newScore;
      saveHighestScore(newScore);
    }
  }
},
});

export const { updateFlip, setDone, resetFlip, resetGame, updateHighestScore} = gameSlice.actions;
export const gameReducer = gameSlice.reducer;