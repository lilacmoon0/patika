import React from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import CharacterList from './components/CharacterList';
import CharacterDetail from './components/CharacterDetail';
import EpisodeList from './components/EpisodeList';
import LocationList from './components/LocationList';

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<CharacterList />} />
        <Route path="/characters" element={<CharacterList />} />
        <Route path="/character/:id" element={<CharacterDetail />} />
        <Route path="/episodes" element={<EpisodeList />} />
        <Route path="/locations" element={<LocationList />} />
      </Routes>
    </div>
  );
}

export default App;
