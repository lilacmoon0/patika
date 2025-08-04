import React from 'react';
import styled from 'styled-components';
import { NotesProvider } from './context/NotesContext';
import { Sidebar } from './components/Sidebar';
import { Editor } from './components/Editor';
import './App.css';

const AppContainer = styled.div`
  display: flex;
  height: 100vh;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
    sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
`;

function App() {
  return (
    <NotesProvider>
      <AppContainer>
        <Sidebar />
        <Editor />
      </AppContainer>
    </NotesProvider>
  );
}

export default App;
