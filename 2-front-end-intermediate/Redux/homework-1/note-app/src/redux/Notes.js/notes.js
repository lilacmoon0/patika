import { createSlice } from "@reduxjs/toolkit";
import { nanoid } from "nanoid";

const color = [
  "#FFD6E0",
  "#B5EAD7",
  "#C7CEEA",
  "#FFF1BA",
  "#FFDAC1",
  "#E2F0CB",
  "#B5D8FA",
  "#FFB7B2",
];


const initialState = {
  notes: [
    {
      id: 1,
      title: "First Note",
      content: "This is the content of the first note.",
      color: color[0],
    },
    {
      id: 2,
      title: "Second Note",
      content: "This is the content of the second note.",
      color: color[1],
    },
  ],
};

export const noteSlice = createSlice({
  name: "notes",
  initialState,
  reducers: {
    addNote: (state, action) => {
      const newNote = {
        id: nanoid(),
        title: action.payload.title,
        content: action.payload.content,
        color: action.payload.color
          ? action.payload.color
          : color[Math.floor(Math.random() * color.length)],
      };
      state.notes.push(newNote);
    },
  },
});


export const { addNote} = noteSlice.actions;

export default noteSlice.reducer;
