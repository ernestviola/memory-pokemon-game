import { useState } from 'react';
import './App.css';
import Card from './components/Card';

function App() {
  const [currentScore, setCurrentScore] = useState(0);
  const [maxScore, setMaxScore] = useState(0);
  const handleClick = (e) => {
    setCurrentScore(currentScore + 1);
    setMaxScore(currentScore);
    e.preventDefault();
  };
  return (
    <div>
      <main>
        Current Score: {currentScore}
        Max Score: {maxScore}
        <Card handleClick={handleClick}></Card>
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
