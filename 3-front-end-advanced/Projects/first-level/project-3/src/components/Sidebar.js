import React, { memo } from 'react';
import styled from 'styled-components';
import { useNotes } from '../context/NotesContext';

const SidebarContainer = styled.div`
  width: 300px;
  height: 100vh;
  background-color: #f8f9fa;
  border-right: 1px solid #e9ecef;
  display: flex;
  flex-direction: column;
`;

const Header = styled.div`
  padding: 20px;
  border-bottom: 1px solid #e9ecef;
  background-color: #fff;
`;

const Title = styled.h2`
  margin: 0 0 15px 0;
  color: #333;
  font-size: 18px;
  font-weight: 600;
`;

const AddButton = styled.button`
  width: 100%;
  padding: 10px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 14px;
  transition: background-color 0.2s;

  &:hover {
    background-color: #0056b3;
  }
`;

const NotesList = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 10px;
`;

const NoteItem = styled.div`
  padding: 15px;
  margin-bottom: 8px;
  background-color: ${props => props.isActive ? '#e3f2fd' : '#fff'};
  border: 1px solid ${props => props.isActive ? '#2196f3' : '#e9ecef'};
  border-radius: 5px;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background-color: ${props => props.isActive ? '#e3f2fd' : '#f8f9fa'};
    border-color: ${props => props.isActive ? '#2196f3' : '#dee2e6'};
  }
`;

const NoteTitle = styled.h3`
  margin: 0 0 5px 0;
  font-size: 14px;
  font-weight: 600;
  color: #333;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const NotePreview = styled.p`
  margin: 0 0 8px 0;
  font-size: 12px;
  color: #666;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const NoteMeta = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const NoteDate = styled.span`
  font-size: 11px;
  color: #999;
`;

const DeleteButton = styled.button`
  background-color: transparent;
  border: none;
  color: #dc3545;
  cursor: pointer;
  padding: 2px 5px;
  border-radius: 3px;
  font-size: 12px;
  transition: background-color 0.2s;

  &:hover {
    background-color: #f8d7da;
  }
`;

const EmptyState = styled.div`
  padding: 40px 20px;
  text-align: center;
  color: #666;
  font-size: 14px;
`;

export const Sidebar = memo(() => {
  const { notes, activeNoteId, addNote, setActiveNote, deleteNote, getNotesCount } = useNotes();

  const handleDeleteNote = (e, noteId) => {
    e.stopPropagation();
    if (window.confirm('Are you sure you want to delete this note?')) {
      deleteNote(noteId);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getPreviewText = (content) => {
    // Remove markdown syntax and get first line as preview
    return content.replace(/[#*`_~[\]]/g, '').split('\n')[0] || 'Empty note';
  };

  return (
    <SidebarContainer>
      <Header>
        <Title>Notes ({getNotesCount()})</Title>
        <AddButton onClick={() => addNote()}>
          + New Note
        </AddButton>
      </Header>
      
      <NotesList>
        {notes.length === 0 ? (
          <EmptyState>
            No notes yet. Create your first note!
          </EmptyState>
        ) : (
          notes.map(note => (
            <NoteItem
              key={note.id}
              isActive={note.id === activeNoteId}
              onClick={() => setActiveNote(note.id)}
            >
              <NoteTitle>{note.title}</NoteTitle>
              <NotePreview>{getPreviewText(note.content)}</NotePreview>
              <NoteMeta>
                <NoteDate>{formatDate(note.updatedAt)}</NoteDate>
                <DeleteButton
                  onClick={(e) => handleDeleteNote(e, note.id)}
                  title="Delete note"
                >
                  Delete
                </DeleteButton>
              </NoteMeta>
            </NoteItem>
          ))
        )}
      </NotesList>
    </SidebarContainer>
  );
});
