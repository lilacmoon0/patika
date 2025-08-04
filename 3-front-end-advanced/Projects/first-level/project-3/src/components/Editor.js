import React, { useState, useEffect, useRef, memo } from 'react';
import styled from 'styled-components';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { useNotes } from '../context/NotesContext';

const EditorContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  height: 100vh;
`;

const EditorHeader = styled.div`
  padding: 20px;
  background-color: #fff;
  border-bottom: 1px solid #e9ecef;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const TitleInput = styled.input`
  font-size: 18px;
  font-weight: 600;
  border: none;
  outline: none;
  color: #333;
  background-color: transparent;
  flex: 1;
  margin-right: 20px;

  &::placeholder {
    color: #999;
  }
`;

const ViewToggle = styled.div`
  display: flex;
  background-color: #f8f9fa;
  border-radius: 5px;
  overflow: hidden;
`;

const ToggleButton = styled.button`
  padding: 8px 16px;
  border: none;
  background-color: ${props => props.active ? '#007bff' : 'transparent'};
  color: ${props => props.active ? '#fff' : '#333'};
  cursor: pointer;
  font-size: 12px;
  transition: all 0.2s;

  &:hover {
    background-color: ${props => props.active ? '#007bff' : '#e9ecef'};
  }
`;

const EditorContent = styled.div`
  flex: 1;
  display: flex;
  overflow: hidden;
`;

const EditorPane = styled.div`
  flex: ${props => props.viewMode === 'split' ? '1' : props.viewMode === 'edit' ? '1' : '0'};
  display: ${props => props.viewMode === 'preview' ? 'none' : 'flex'};
  flex-direction: column;
  border-right: ${props => props.viewMode === 'split' ? '1px solid #e9ecef' : 'none'};
`;

const PreviewPane = styled.div`
  flex: ${props => props.viewMode === 'split' ? '1' : props.viewMode === 'preview' ? '1' : '0'};
  display: ${props => props.viewMode === 'edit' ? 'none' : 'block'};
  overflow-y: auto;
  padding: 20px;
  background-color: #fff;
`;

const TextArea = styled.textarea`
  flex: 1;
  border: none;
  outline: none;
  padding: 20px;
  font-family: 'Consolas', 'Monaco', 'Courier New', monospace;
  font-size: 14px;
  line-height: 1.6;
  resize: none;
  background-color: #fafafa;

  &::placeholder {
    color: #999;
  }
`;

const EmptyState = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  color: #666;
  text-align: center;
`;

const EmptyTitle = styled.h2`
  margin: 0 0 10px 0;
  font-size: 24px;
  color: #333;
`;

const EmptyDescription = styled.p`
  margin: 0;
  font-size: 16px;
`;

const MarkdownContent = styled.div`
  h1, h2, h3, h4, h5, h6 {
    color: #333;
    margin-top: 24px;
    margin-bottom: 16px;
    font-weight: 600;
    line-height: 1.25;
  }

  h1 {
    font-size: 2em;
    border-bottom: 1px solid #eaecef;
    padding-bottom: 10px;
  }

  h2 {
    font-size: 1.5em;
    border-bottom: 1px solid #eaecef;
    padding-bottom: 8px;
  }

  p {
    margin-bottom: 16px;
    line-height: 1.6;
  }

  code {
    background-color: #f6f8fa;
    border-radius: 3px;
    font-size: 85%;
    margin: 0;
    padding: 0.2em 0.4em;
    font-family: 'Consolas', 'Monaco', 'Courier New', monospace;
  }

  pre {
    background-color: #f6f8fa;
    border-radius: 6px;
    font-size: 85%;
    line-height: 1.45;
    overflow: auto;
    padding: 16px;
    margin-bottom: 16px;
  }

  pre code {
    background-color: transparent;
    border: 0;
    display: inline;
    line-height: inherit;
    margin: 0;
    overflow: visible;
    padding: 0;
    word-wrap: normal;
  }

  blockquote {
    border-left: 4px solid #dfe2e5;
    color: #6a737d;
    margin: 0 0 16px 0;
    padding: 0 16px;
  }

  ul, ol {
    margin-bottom: 16px;
    padding-left: 2em;
  }

  li {
    margin-bottom: 4px;
  }

  table {
    border-collapse: collapse;
    margin-bottom: 16px;
    width: 100%;
  }

  table th,
  table td {
    border: 1px solid #dfe2e5;
    padding: 6px 13px;
  }

  table th {
    background-color: #f6f8fa;
    font-weight: 600;
  }

  a {
    color: #0366d6;
    text-decoration: none;
  }

  a:hover {
    text-decoration: underline;
  }
`;

export const Editor = memo(() => {
  const { getActiveNote, updateNote } = useNotes();
  const [viewMode, setViewMode] = useState('split');
  const [localTitle, setLocalTitle] = useState('');
  const [localContent, setLocalContent] = useState('');
  const titleTimeoutRef = useRef(null);
  const contentTimeoutRef = useRef(null);
  
  const activeNote = getActiveNote();

  // Update local state when active note changes
  useEffect(() => {
    if (activeNote) {
      setLocalTitle(activeNote.title);
      setLocalContent(activeNote.content);
    } else {
      setLocalTitle('');
      setLocalContent('');
    }
  }, [activeNote]);

  // Debounced title update
  const handleTitleChange = (e) => {
    const newTitle = e.target.value;
    setLocalTitle(newTitle);
    
    if (titleTimeoutRef.current) {
      clearTimeout(titleTimeoutRef.current);
    }
    
    titleTimeoutRef.current = setTimeout(() => {
      if (activeNote) {
        updateNote(activeNote.id, { title: newTitle });
      }
    }, 300);
  };

  // Debounced content update
  const handleContentChange = (e) => {
    const newContent = e.target.value;
    setLocalContent(newContent);
    
    if (contentTimeoutRef.current) {
      clearTimeout(contentTimeoutRef.current);
    }
    
    contentTimeoutRef.current = setTimeout(() => {
      if (activeNote) {
        updateNote(activeNote.id, { content: newContent });
      }
    }, 500);
  };

  // Cleanup timeouts on unmount
  useEffect(() => {
    return () => {
      if (titleTimeoutRef.current) {
        clearTimeout(titleTimeoutRef.current);
      }
      if (contentTimeoutRef.current) {
        clearTimeout(contentTimeoutRef.current);
      }
    };
  }, []);

  if (!activeNote) {
    return (
      <EditorContainer>
        <EmptyState>
          <EmptyTitle>No Note Selected</EmptyTitle>
          <EmptyDescription>
            Select a note from the sidebar or create a new one to start editing.
          </EmptyDescription>
        </EmptyState>
      </EditorContainer>
    );
  }

  return (
    <EditorContainer>
      <EditorHeader>
        <TitleInput
          type="text"
          value={localTitle}
          onChange={handleTitleChange}
          placeholder="Note title..."
        />
        <ViewToggle>
          <ToggleButton
            active={viewMode === 'edit'}
            onClick={() => setViewMode('edit')}
          >
            Edit
          </ToggleButton>
          <ToggleButton
            active={viewMode === 'split'}
            onClick={() => setViewMode('split')}
          >
            Split
          </ToggleButton>
          <ToggleButton
            active={viewMode === 'preview'}
            onClick={() => setViewMode('preview')}
          >
            Preview
          </ToggleButton>
        </ViewToggle>
      </EditorHeader>

      <EditorContent>
        <EditorPane viewMode={viewMode}>
          <TextArea
            value={localContent}
            onChange={handleContentChange}
            placeholder="Start writing your markdown content here..."
          />
        </EditorPane>

        <PreviewPane viewMode={viewMode}>
          <MarkdownContent>
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {localContent}
            </ReactMarkdown>
          </MarkdownContent>
        </PreviewPane>
      </EditorContent>
    </EditorContainer>
  );
});
