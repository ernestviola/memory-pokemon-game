import { useEffect, useState } from 'react';
import './App.css';
import Card from './components/Card';

function App() {
  const [currentScore, setCurrentScore] = useState(0);
  const [maxScore, setMaxScore] = useState(0);
  const [pokemon, setPokemon] = useState([]);
  const [pokemonCount, setPokemonCount] = useState(16);
  const viewPokemon = shuffle();
  const baseUrl = 'https://pokeapi.co/api/v2/pokemon/';

  function shuffle() {
    const pokemonCopy = [...pokemon];
    let currentIndex = pokemonCopy.length;
    while (currentIndex != 0) {
      let randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
      [pokemonCopy[currentIndex], pokemonCopy[randomIndex]] = [
        pokemonCopy[randomIndex],
        pokemonCopy[currentIndex],
      ];
    }
    return pokemonCopy;
  }

  const handleClick = (e) => {
    setCurrentScore(currentScore + 1);
    setMaxScore(currentScore);
    e.preventDefault();
  };

  const fetchRandomPokemon = async () => {
    setPokemon([]);
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

  const playCry = (cryUrl) => {
    const audio = new Audio(cryUrl);
    audio.play();
  };

  useEffect(() => {
    fetchRandomPokemon();
  }, []);

  return (
    <div>
      <main>
        Current Score: {currentScore}
        Max Score: {maxScore}
        <button onClick={fetchRandomPokemon}>Start Game</button>
        {viewPokemon.map((data) => {
          return (
            <Card
              handleClick={(e) => {
                playCry(data.cries.latest);
                handleClick(e);
              }}
              key={data.name}
            >
              <span>{data.name}</span>
              <img src={data.sprites.front_default} alt={data.name} />
            </Card>
          );
        })}
      </main>
      <footer>
        <h2>Rules</h2>
        <p>
          Test your memory and click on a pokemon you haven't clicked before!
        </p>
      </footer>
    </div>
  );
}

export default App;
