import '../styles/card.css';
export default function Card({ handleClick, children }) {
  return (
    <div className='card' onClick={handleClick}>
      {children}
    </div>
  );
}
