import { useState } from 'react';
import './App.css';
import Game from './pages/Game';
import CloudBg from './components/CloudBg';

function App() {
  const [audioOn, setAudioOn] = useState(true);

  const [gameState, setGameState] = useState('rules');

  return (
    <div>
      <button onClick={() => setAudioOn(!audioOn)}>
        {audioOn ? 'Music On' : 'Music Off'}
      </button>
      <Game audioOn={audioOn} />
      <CloudBg />
    </div>
  );
}

export default App;
