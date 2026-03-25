import '../styles/gameOverDialog.css';

export default function GameOverDialog({
  pokemonCount,
  level,
  setLevel,
  currentScore,
  newGame,
}) {
  const harderGame = () => {
    const nextLevel = level + 1;
    setLevel(nextLevel);
    newGame(nextLevel * nextLevel);
  };
  if (pokemonCount == currentScore) {
    return (
      <div className='dialog'>
        <div className='dialog-content'>
          <h3>You Win!</h3>
          <div className='dialog-buttons'>
            <button onClick={harderGame}>Continue?</button>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className='dialog'>
      <div className='dialog-content'>
        <h3>Game Over</h3>
        <div className='dialog-buttons'>
          <button onClick={() => newGame()}>Retry Level?</button>
        </div>
      </div>
    </div>
  );
}
