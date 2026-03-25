import { useEffect, useState } from 'react';
import Card from '../components/Card';
import GameOverDialog from '../components/GameOverDialog';

import '../styles/game.css';

export default function Game({ audioOn, pokemonCache }) {
  const [currentScore, setCurrentScore] = useState(0);
  const [maxScore, setMaxScore] = useState(0);
  const [pokemon, setPokemon] = useState([]);
  const [clickedPokemon, setClickedPokemon] = useState([]);
  const [showClicked, setShowClicked] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [level, setLevel] = useState(2);
  const [pokemonCount, setPokemonCount] = useState(level * level);
  const [round, setRound] = useState(0);

  const shuffle = (arr) => {
    const pokemonCopy = [...arr];
    let currentIndex = pokemonCopy.length;
    while (currentIndex != 0) {
      // eslint-disable-next-line react-hooks/purity
      let randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
      [pokemonCopy[currentIndex], pokemonCopy[randomIndex]] = [
        pokemonCopy[randomIndex],
        pokemonCopy[currentIndex],
      ];
    }
    return pokemonCopy;
  };

  const handleClick = (e, pokemonName) => {
    e.preventDefault();
    if (gameOver) return;

    if (clickedPokemon.includes(pokemonName)) {
      setGameOver(true);
      setShowClicked(true);
      return;
    }

    setCurrentScore(currentScore + 1);
    setMaxScore(Math.max(maxScore, currentScore + 1));
    setPokemon(shuffle(pokemon));
    setClickedPokemon([...clickedPokemon, pokemonName]);

    if (clickedPokemon.length === pokemonCount - 1) {
      setGameOver(true);
      setShowClicked(true);
    }
  };

  const fetchRandomPokemon = (count = pokemonCount) => {
    const randomIds = [];
    while (randomIds.length !== count) {
      const randomId = Math.floor(Math.random() * 151) + 1;
      if (!randomIds.includes(randomId)) {
        randomIds.push(randomId);
      }
    }

    setPokemon(randomIds.map((id) => pokemonCache[id]));
  };

  const newGame = (nextPokemonCount = pokemonCount) => {
    setGameOver(false);
    setShowClicked(false);
    setCurrentScore(0);
    setClickedPokemon([]);
    setRound((r) => r + 1);
    if (nextPokemonCount !== pokemonCount) setPokemonCount(nextPokemonCount);
  };

  const playCry = (cryUrl) => {
    if (audioOn) {
      const audio = new Audio(cryUrl);
      audio.play();
    }
  };

  useEffect(() => {
    if (Object.keys(pokemonCache).length === 0) return;
    fetchRandomPokemon(pokemonCount);
  }, [pokemonCount, round, pokemonCache]);

  return (
    <div>
      <main>
        <div className='game-stats'>
          <span className='game-stats-level'>Level : {level - 1}</span>
          <div className='game-stats-score'>
            <span>Current Score: {currentScore}</span>
            <span>Max Score: {maxScore}</span>
          </div>
          <button onClick={() => newGame()}>Restart Game</button>
        </div>
        <div
          className='cards'
          style={{ '--columns': `${Math.sqrt(pokemonCount)}` }}
        >
          {pokemon.map((data) => {
            return (
              <Card
                key={data.name}
                handleClick={(e) => {
                  playCry(data.cries.latest);

                  handleClick(e, data.name);
                }}
                className={
                  showClicked && clickedPokemon.includes(data.name)
                    ? 'clicked'
                    : ''
                }
              >
                <span>{data.name.toUpperCase()}</span>
                <img src={data.sprites.front_default} alt={data.name} />
              </Card>
            );
          })}
        </div>
      </main>
      {gameOver && (
        <GameOverDialog
          gameOver={gameOver}
          pokemonCount={pokemonCount}
          setPokemonCount={setPokemonCount}
          level={level}
          setLevel={setLevel}
          currentScore={currentScore}
          newGame={newGame}
        />
      )}
    </div>
  );
}
