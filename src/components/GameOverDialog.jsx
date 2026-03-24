import '../styles/gameOverDialog.css';

export default function GameOverDialog({
  pokemonCount,
  setPokemonCount,
  level,
  setLevel,
  currentScore,
  newGame,
}) {
  const harderGame = () => {
    const nextLevel = level + 1;
    setPokemonCount(nextLevel * nextLevel);
    setLevel(nextLevel);
    newGame();
  };
  if (pokemonCount == currentScore) {
    return (
      <div className='dialog'>
        <div className='dialog-content'>
          <h3>You Win!</h3>
          <button onClick={harderGame}>Continue?</button>
        </div>
      </div>
    );
  }
  return (
    <div className='dialog'>
      <div className='dialog-content'>
        <h3>Game Over</h3>
        <button onClick={newGame}>Retry Level?</button>
      </div>
    </div>
  );
}
