import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addNote } from '../redux/Notes.js/notes';

const COLORS = [
  { value: "#FFD6E0", name: "Pastel Pink" },
  { value: "#B5EAD7", name: "Pastel Mint" },
  { value: "#C7CEEA", name: "Pastel Purple" },
  { value: "#FFF1BA", name: "Pastel Yellow" },
  { value: "#FFDAC1", name: "Pastel Peach" },
  { value: "#E2F0CB", name: "Pastel Green" },
  { value: "#B5D8FA", name: "Pastel Blue" },
  { value: "#FFB7B2", name: "Pastel Coral" },
];

export const AddNote = () => {
  const dispatch = useDispatch();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [color, setColor] = useState(COLORS[0].value);

  const handleAdd = () => {
    if (title && content) {
      dispatch(addNote({ title, content, color }));
      setTitle('');
      setContent('');
      setColor(COLORS[0].value);
    } else {
      alert('Please fill in both title and content.');
    }
  };

  return (
    <div className="add-note">
      <h2>📝 Add Note</h2>
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={e => setTitle(e.target.value)}
        style={{ marginBottom: 8 }}
      />
      <textarea
        placeholder="Content"
        value={content}
        onChange={e => setContent(e.target.value)}
        style={{ marginBottom: 12, minHeight: 60, resize: 'vertical' }}
      />
      <div style={{ margin: '12px 0', display: 'flex', gap: 10, flexWrap: 'wrap' }}>
        {COLORS.map(c => (
          <button
            key={c.value}
            type="button"
            onClick={() => setColor(c.value)}
            title={c.name}
            style={{
              width: 28,
              height: 50,
              borderRadius: '50%',
              border: color === c.value ? '3px solid #a786df' : '2px solid #fff',
              background: c.value,
              cursor: 'pointer',
              boxShadow: color === c.value ? '0 0 0 2px #f9c6d3' : '0 1px 4px #eee',
              outline: 'none',
              transition: 'border 0.2s, box-shadow 0.2s',
            }}
          />
        ))}
      </div>
      <button onClick={handleAdd} style={{ marginTop: 8 }}>
        Add
      </button>
    </div>
  );
};