import React, { useState, useEffect} from "react";
import { useSelector } from "react-redux";
import { AddNote } from "./AddNote";
export const NotesList = () => {
  const notes = useSelector((state) => state.notes.notes);
  const [selectedNoteId, setSelectedNoteId] = useState(null);
  const [filteredNotes, setFilteredNotes] = useState(notes);

  useEffect(() => {
    setFilteredNotes(notes);
  }, [notes]);  

  const handleSearch = (event) => {
    const searchTerm = event.target.value.toLowerCase();
    const filtered = notes.filter(
      (note) =>
        note.title.toLowerCase().includes(searchTerm) ||
        note.content.toLowerCase().includes(searchTerm)
    );
    setFilteredNotes(filtered);
  };

  const handleClick = (noteId) => {
    setSelectedNoteId(selectedNoteId === noteId ? null : noteId);
    console.log("Note clicked");
  };

  return (
    <div className="notes-list-container">
      <span className="notes-list-search">
        <input
          type="text"
          placeholder="Search notes..."
          onChange={handleSearch}
        />
      </span>
    <span>
      <AddNote></AddNote>
    </span>

      <div className="notes-list">
        <h2>Notes List</h2>
        <ul>
          {filteredNotes.map((note) => (
            <li
              key={note.id}
              onClick={() => handleClick(note.id)}
              style={{ backgroundColor: note.color }}
            >
              <h3>{note.title}</h3>
              {selectedNoteId === note.id && <p>{note.content}</p>}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
