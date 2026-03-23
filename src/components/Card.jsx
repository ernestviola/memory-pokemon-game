import '../styles/card.css';
export default function Card({ handleClick, children }) {
  return <div onClick={handleClick}>{children}</div>;
}
