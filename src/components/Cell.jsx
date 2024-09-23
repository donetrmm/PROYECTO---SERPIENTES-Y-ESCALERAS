import React from 'react';

const Cell = ({ index, playerPositions }) => {
  const isPlayerOne = playerPositions[0] === index;
  const isPlayerTwo = playerPositions[1] === index;

  const snakes = {
    16: "🐍",
    47: "🐍",
    49: "🐍",
    56: "🐍",
    62: "🐍",
    87: "🐍",
    93: "🐍",
    95: "🐍",
  };

  const ladders = {
    1: "🪜",
    4: "🪜",
    9: "🪜",
    21: "🪜",
    28: "🪜",
    36: "🪜",
    51: "🪜",
    71: "🪜",
  };

  return (
    <div className="cell">
      {isPlayerOne && <span className="player1">P1</span>}
      {isPlayerTwo && <span className="player2">P2</span>}
      {snakes[index] && <span className="snake">{snakes[index]}</span>}
      {ladders[index] && <span className="ladder">{ladders[index]}</span>}
      {index}
    </div>
  );
};

export default Cell;
