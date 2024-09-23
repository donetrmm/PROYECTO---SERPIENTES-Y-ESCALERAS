import React from "react";
import Board from "./components/Board";
import GameControls from "./components/GameControls";
import useGameLogic from "./hooks/useGameLogic";

const App = () => {
  const { playerPositions, rollDice, diceValue, winner, resetGame } =
    useGameLogic();

  return (
    <>
      <div className="app">
        <h1>Serpientes y Escaleras</h1>
        <Board playerPositions={playerPositions} />
        <GameControls rollDice={rollDice} />
        {winner !== null && (
          <div className="winner-message">
            <h2>¡Jugador {winner + 1} ha ganado!</h2>
            <button onClick={resetGame}>Reiniciar Juego</button>
          </div>
        )}
      </div>
      <div className="dice-value">
          <h4>Valor del Dado: {diceValue}</h4>
        </div>
    </>
  );
};

export default App;
