import '../styles/title.css';
import pokemonLogo from '../assets/pokemon-logo.png';

export default function Title() {
  return (
    <div className='title__container'>
      <img src={pokemonLogo} alt='' />
      <span>Memory Game</span>
    </div>
  );
}
