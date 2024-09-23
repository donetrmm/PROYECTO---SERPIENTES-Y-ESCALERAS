import { useEffect, useState } from 'react';

const useGameLogic = () => {
  const [playerPositions, setPlayerPositions] = useState([0, 0]);
  const [currentPlayer, setCurrentPlayer] = useState(0);
  const [diceValue, setDiceValue] = useState(0);
  const [winner, setWinner] = useState(null); 
  const [gameWorker, setGameWorker] = useState(null);

  useEffect(() => {
    const worker = new Worker(new URL('../workers/gameLogicWorker.js', import.meta.url));
    setGameWorker(worker);

    worker.onmessage = (event) => {
      const { position, playerIndex } = event.data;
      setPlayerPositions((prevPositions) => {
        const newPositions = [...prevPositions];
        newPositions[playerIndex] = position;
        if (position >= 99) {
          setWinner(playerIndex);
        }
        return newPositions;
      });
      setCurrentPlayer((prevPlayer) => (prevPlayer === 0 ? 1 : 0)); 
    };

    return () => {
      worker.terminate();
    };
  }, []);

  const rollDice = () => {
    if (winner !== null) return; 

    const diceWorker = new Worker(new URL('../workers/diceWorker.js', import.meta.url));

    diceWorker.onmessage = (event) => {
      const roll = event.data;
      setDiceValue(roll);
      const nextPlayer = currentPlayer;

      const moveWorker = new Worker(new URL('../workers/moveWorker.js', import.meta.url));
      moveWorker.postMessage({ position: playerPositions[nextPlayer], roll });

      moveWorker.onmessage = (event) => {
        const newPosition = event.data;
        gameWorker.postMessage({ position: newPosition, playerIndex: nextPlayer });

        if (newPosition !== playerPositions[nextPlayer]) {
          const isSnake = [16, 47, 49, 56, 62, 87, 93, 95].includes(newPosition);
          const isLadder = [1, 4, 9, 21, 28, 36, 51, 71].includes(newPosition);
          if (isSnake) {
            alert(`¡Oh no! Caíste en una serpiente y bajaste por la casilla ${newPosition}.`);
          } else if (isLadder) {
            alert(`¡Bien hecho! Subiste por una escalera por la casilla casilla ${newPosition}.`);
          }
        }
      };
    };

    diceWorker.postMessage({});
  };

  const resetGame = () => {
    setPlayerPositions([0, 0]);
    setCurrentPlayer(0);
    setDiceValue(0);
    setWinner(null); 
  };

  return { playerPositions, rollDice, diceValue, winner, resetGame };
};

export default useGameLogic;
