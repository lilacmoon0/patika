import React, { createContext, useContext, useReducer, useEffect, useMemo, useCallback } from 'react';
import { v4 as uuidv4 } from 'uuid';

// Action types
const NOTES_ACTIONS = {
  ADD_NOTE: 'ADD_NOTE',
  UPDATE_NOTE: 'UPDATE_NOTE',
  DELETE_NOTE: 'DELETE_NOTE',
  LOAD_NOTES: 'LOAD_NOTES',
  SET_ACTIVE_NOTE: 'SET_ACTIVE_NOTE'
};

// Initial state
const initialState = {
  notes: [],
  activeNoteId: null
};

// Create a default note
const createDefaultNote = () => ({
  id: uuidv4(),
  title: 'New Note',
  content: '# Welcome to your new note!\n\nStart writing your markdown content here...',
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString()
});

// Reducer function
const notesReducer = (state, action) => {
  switch (action.type) {
    case NOTES_ACTIONS.ADD_NOTE: {
      const newNote = action.payload || createDefaultNote();
      return {
        ...state,
        notes: [newNote, ...state.notes],
        activeNoteId: newNote.id
      };
    }

    case NOTES_ACTIONS.UPDATE_NOTE: {
      const { id, updates } = action.payload;
      return {
        ...state,
        notes: state.notes.map(note =>
          note.id === id
            ? { 
                ...note, 
                ...updates, 
                updatedAt: new Date().toISOString() 
              }
            : note
        )
      };
    }

    case NOTES_ACTIONS.DELETE_NOTE: {
      const noteId = action.payload;
      const filteredNotes = state.notes.filter(note => note.id !== noteId);
      
      // If we're deleting the active note, set active to the first remaining note
      let newActiveNoteId = state.activeNoteId;
      if (state.activeNoteId === noteId) {
        newActiveNoteId = filteredNotes.length > 0 ? filteredNotes[0].id : null;
      }

      return {
        ...state,
        notes: filteredNotes,
        activeNoteId: newActiveNoteId
      };
    }

    case NOTES_ACTIONS.LOAD_NOTES: {
      const notes = action.payload || [];
      return {
        ...state,
        notes,
        activeNoteId: notes.length > 0 ? notes[0].id : null
      };
    }

    case NOTES_ACTIONS.SET_ACTIVE_NOTE: {
      return {
        ...state,
        activeNoteId: action.payload
      };
    }

    default:
      return state;
  }
};

// Create context
const NotesContext = createContext();

// Context provider component
export const NotesProvider = ({ children }) => {
  const [state, dispatch] = useReducer(notesReducer, initialState);

  // Load notes from localStorage on mount
  useEffect(() => {
    const savedNotes = localStorage.getItem('markdown_notes');
    if (savedNotes) {
      try {
        const parsedNotes = JSON.parse(savedNotes);
        dispatch({ type: NOTES_ACTIONS.LOAD_NOTES, payload: parsedNotes });
      } catch (error) {
        console.error('Error loading notes from localStorage:', error);
        // If there's an error, create a default note
        dispatch({ type: NOTES_ACTIONS.ADD_NOTE });
      }
    } else {
      // If no saved notes, create a default note
      dispatch({ type: NOTES_ACTIONS.ADD_NOTE });
    }
  }, []);

  // Save notes to localStorage whenever notes change
  useEffect(() => {
    if (state.notes.length > 0) {
      localStorage.setItem('markdown_notes', JSON.stringify(state.notes));
    }
  }, [state.notes]);

  // Action creators
  const addNote = useCallback((noteData) => {
    const newNote = noteData || createDefaultNote();
    dispatch({
      type: NOTES_ACTIONS.ADD_NOTE,
      payload: newNote
    });
  }, []);

  const updateNote = useCallback((id, updates) => {
    dispatch({
      type: NOTES_ACTIONS.UPDATE_NOTE,
      payload: { id, updates }
    });
  }, []);

  const deleteNote = useCallback((id) => {
    dispatch({
      type: NOTES_ACTIONS.DELETE_NOTE,
      payload: id
    });
  }, []);

  const setActiveNote = useCallback((id) => {
    dispatch({
      type: NOTES_ACTIONS.SET_ACTIVE_NOTE,
      payload: id
    });
  }, []);

  // Helper functions
  const getActiveNote = useCallback(() => {
    return state.notes.find(note => note.id === state.activeNoteId) || null;
  }, [state.notes, state.activeNoteId]);

  const getNotesCount = useCallback(() => {
    return state.notes.length;
  }, [state.notes.length]);

  const value = useMemo(() => ({
    // State
    notes: state.notes,
    activeNoteId: state.activeNoteId,
    
    // Actions
    addNote,
    updateNote,
    deleteNote,
    setActiveNote,
    
    // Helper functions
    getActiveNote,
    getNotesCount
  }), [state.notes, state.activeNoteId, addNote, updateNote, deleteNote, setActiveNote, getActiveNote, getNotesCount]);

  return (
    <NotesContext.Provider value={value}>
      {children}
    </NotesContext.Provider>
  );
};

// Custom hook to use the context
export const useNotes = () => {
  const context = useContext(NotesContext);
  if (!context) {
    throw new Error('useNotes must be used within a NotesProvider');
  }
  return context;
};

export default NotesContext;
