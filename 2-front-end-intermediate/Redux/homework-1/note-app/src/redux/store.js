import { configureStore } from '@reduxjs/toolkit'
import  noteSliceReducer  from './Notes.js/notes.js'

export const store = configureStore({
  reducer: {
    notes: noteSliceReducer,
  },
})