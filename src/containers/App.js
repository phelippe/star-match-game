import React, { useState } from 'react';
import './App.css';
import StarMatch from './StarMatch';

function App() {
  const [gameId, setGameId] = useState(1);

  return <StarMatch
    key={gameId}
    startNewGame={() => setGameId(gameId + 1)} //It will remount the component to start a new game
  />
}

export default App;
