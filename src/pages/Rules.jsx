import '../styles/rules.css';

export default function Rules({ setGameState, setAudioOn }) {
  const handlePlay = () => {
    setGameState('play');
    setAudioOn(true);
  };
  return (
    <div className='rules'>
      <h1>Rules</h1>
      <p>Test your memory and see how far you can get!</p>
      <p>
        Beat a level by clicking on pokemon you've yet to click on within the
        round.
      </p>
      <button onClick={handlePlay}>Play!</button>
    </div>
  );
}
