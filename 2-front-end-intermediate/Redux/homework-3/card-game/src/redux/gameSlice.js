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

const initialState = {
  cards: shuffledCards
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
  }
},
});

export const { updateFlip, setDone, resetFlip} = gameSlice.actions;
export const gameReducer = gameSlice.reducer;