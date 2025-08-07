import { useState, useEffect } from 'react';
import './App.css';
import handWithCoin from './assets/hand-with-coin.svg';
import flippingCoin from './assets/flipping-coin.svg';
import headsCoin from './assets/heads.svg';
import tailsCoin from './assets/tails.svg';

function App() {
  const [playerChoice, setPlayerChoice] = useState(null);
  const [result, setResult] = useState(null);
  const [gamePhase, setGamePhase] = useState('choice'); // 'choice', 'flipping', 'result'
  const [wins, setWins] = useState(0);
  const [losses, setLosses] = useState(0);

  const handleChoice = (choice) => {
    if (gamePhase === 'choice') {
      setPlayerChoice(choice);
      setGamePhase('flipping');
    }
  };

  const handlePlayAgain = () => {
    setPlayerChoice(null);
    setResult(null);
    setGamePhase('choice');
  };

  useEffect(() => {
    if (gamePhase === 'flipping') {
      const flipResult = Math.random() < 0.5 ? 'Heads' : 'Tails';

      setTimeout(() => {
        setResult(flipResult);
        if (playerChoice === flipResult) {
          setWins(wins + 1);
        } else {
          setLosses(losses + 1);
        }
        setGamePhase('result');
      }, 2000); // Simulate a 2-second flip animation
    }
  }, [gamePhase, playerChoice, wins, losses]);

  return (
    <div className="App">
      <h1 className="title">Coin Flip Challenge</h1>

      <div className="scoreboard">
        <div className="score">Wins: {wins}</div>
        <div className="score">Losses: {losses}</div>
      </div>

      <div className="game-area">
        {gamePhase === 'choice' && (
          <div className="choice-selection">
            <h2>Choose your side:</h2>
            <button className="choice-btn" onClick={() => handleChoice('Heads')}>Heads</button>
            <button className="choice-btn" onClick={() => handleChoice('Tails')}>Tails</button>
            <div className="coin-display">
              <img src={handWithCoin} alt="Hand with coin" style={{ width: '150px', marginTop: '20px' }} />
            </div>
          </div>
        )}

        {gamePhase === 'flipping' && (
          <div className="coin-display flipping">
            <h2>Flipping...</h2>
            <img src={flippingCoin} alt="Flipping coin" style={{ width: '150px' }} />
          </div>
        )}

        {gamePhase === 'result' && (
          <div className="result-display">
            <img src={result === 'Heads' ? headsCoin : tailsCoin} alt={result} style={{ width: '150px' }} />
            <h2>Result: {result}</h2>
            <p className={`result-message ${playerChoice === result ? 'win' : 'loss'}`}>
              You {playerChoice === result ? 'Won!' : 'Lost!'}
            </p>
            <button className="play-again-btn" onClick={handlePlayAgain}>Play Again</button>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
