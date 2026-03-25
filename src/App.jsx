import { useState, useEffect, useRef } from 'react';
import './App.css';
import Title from './components/Title';
import Rules from './pages/Rules';
import Game from './pages/Game';

import CloudBg from './components/CloudBg';
import route33 from './audio/route33.mp3';
import volumeOn from './assets/volume-on.png';
import volumeOff from './assets/volume-off.png';

function App() {
  const [pokemonCache, setPokemonCache] = useState([]);
  const [audioOn, setAudioOn] = useState(false);
  const music = useRef(new Audio(route33));

  const [gameState, setGameState] = useState('rules');

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

  useEffect(() => {
    const fetchAll = async () => {
      const ids = Array.from({ length: 151 }, (_, i) => i + 1);
      const fetchPromises = ids.map((id) =>
        fetch(`https://pokeapi.co/api/v2/pokemon/${id}`),
      );
      const responses = await Promise.all(fetchPromises);
      const pokemonData = await Promise.all(responses.map((res) => res.json()));

      const cache = {};
      pokemonData.forEach((p) => (cache[p.id] = p));
      setPokemonCache(cache);
    };
    fetchAll();
  }, []);

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
      <Title />
      {gameState === 'rules' && (
        <Rules setGameState={setGameState} setAudioOn={setAudioOn} />
      )}
      {gameState === 'play' && (
        <>
          <Game audioOn={audioOn} pokemonCache={pokemonCache} />
          <CloudBg />
        </>
      )}
    </div>
  );
}

export default App;
