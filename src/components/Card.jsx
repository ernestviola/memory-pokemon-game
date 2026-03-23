export default function Card({ handleClick, children }) {
  return <div onClick={(e) => handleClick(e)}>{children}</div>;
}
