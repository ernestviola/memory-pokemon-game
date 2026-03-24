import { useState, useEffect, useRef } from 'react';
import './App.css';
import Game from './pages/Game';
import CloudBg from './components/CloudBg';
import route33 from './audio/route33.mp3';

function App() {
  const [audioOn, setAudioOn] = useState(false);
  const music = useRef(new Audio(route33));

  useEffect(() => {
    if (audioOn) {
      music.current.play();
      music.current.loop = true;
    } else {
      music.current.pause();
    }
    return () => {
      music.current.pause();
    };
  }, [audioOn]);

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
