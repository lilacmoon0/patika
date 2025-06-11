import { createSlice } from "@reduxjs/toolkit";
import { nanoid } from "nanoid";

const color = [
  "#FFD6E0", // pastel pink
  "#B5EAD7", // pastel mint
  "#C7CEEA", // pastel purple
  "#FFF1BA", // pastel yellow
  "#FFDAC1", // pastel peach
  "#E2F0CB", // pastel green
  "#B5D8FA", // pastel blue
  "#FFB7B2", // pastel coral
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

// Action creators are generated for each case reducer function
export const { addNote} = noteSlice.actions;

export default noteSlice.reducer;
