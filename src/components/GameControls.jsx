import React from 'react';

const GameControls = ({ rollDice }) => {
  return (
    <div className="controls">
      <button onClick={rollDice}>Lanzar Dado</button>
    </div>
  );
};

export default GameControls;
