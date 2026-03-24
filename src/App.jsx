import { useState, useEffect, useRef } from 'react';
import './App.css';
import Game from './pages/Game';
import CloudBg from './components/CloudBg';
import route33 from './audio/route33.mp3';
import volumeOn from './assets/volume-on.png';
import volumeOff from './assets/volume-off.png';

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
      <button
        onClick={() => setAudioOn(!audioOn)}
        className='volume-controller'
      >
        {audioOn ? (
          <img src={volumeOn} alt='Volume On' />
        ) : (
          <img src={volumeOff} alt='Volume Off' />
        )}
      </button>
      <Game audioOn={audioOn} />
      <CloudBg />
    </div>
  );
}

export default App;
