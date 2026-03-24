import { useEffect, useState } from 'react';
import Card from '../components/Card';

export default function Game({ audioOn }) {
  const [currentScore, setCurrentScore] = useState(0);
  const [maxScore, setMaxScore] = useState(0);
  const [pokemon, setPokemon] = useState([]);
  const [clickedPokemon, setClickedPokemon] = useState([]);
  const [gameOver, setGameOver] = useState(false);
  const pokemonCount = 16;
  const baseUrl = 'https://pokeapi.co/api/v2/pokemon/';

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
    if (gameOver) {
      return;
    }
    if (clickedPokemon.includes(pokemonName)) {
      setGameOver(true);
      return;
    }
    setCurrentScore(currentScore + 1);
    setMaxScore(Math.max(maxScore, currentScore + 1));
    setPokemon(shuffle(pokemon));
    const newClickedPokemon = [...clickedPokemon];
    newClickedPokemon.push(pokemonName);
    setClickedPokemon(newClickedPokemon);
    e.preventDefault();
  };

  const fetchRandomPokemon = async () => {
    const randomIds = [];
    while (randomIds.length !== pokemonCount) {
      //add a random id from 151
      const randomId = Math.floor(Math.random() * 151) + 1;
      if (!randomIds.includes(randomId)) {
        randomIds.push(randomId);
      }
    }

    try {
      const fetchPromises = randomIds.map((id) => fetch(baseUrl + id));
      const responses = await Promise.all(fetchPromises);
      const pokemonData = await Promise.all(responses.map((res) => res.json()));

      setPokemon(pokemonData);
    } catch (error) {
      console.error('Failed to get pokemon' + error);
    }
  };

  const newGame = () => {
    setGameOver(false);
    setCurrentScore(0);
    fetchRandomPokemon();
  };

  const playCry = (cryUrl) => {
    if (audioOn) {
      const audio = new Audio(cryUrl);
      audio.play();
    }
  };

  useEffect(() => {
    fetchRandomPokemon();
  }, []);

  return (
    <div>
      <main>
        Current Score: {currentScore}
        Max Score: {maxScore}
        <button onClick={newGame}>Start Game</button>
        <div className='cards'>
          {pokemon.map((data) => {
            return (
              <Card
                handleClick={(e) => {
                  playCry(data.cries.latest);

                  handleClick(e, data.name);
                }}
                key={data.name}
              >
                <span>{data.name.toUpperCase()}</span>
                <img src={data.sprites.front_default} alt={data.name} />
              </Card>
            );
          })}
        </div>
      </main>
    </div>
  );
}
