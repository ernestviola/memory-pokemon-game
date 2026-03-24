import '../styles/card.css';
export default function Card({ handleClick, className, children }) {
  return (
    <div className={`card ${className}`} onClick={handleClick}>
      {children}
    </div>
  );
}
