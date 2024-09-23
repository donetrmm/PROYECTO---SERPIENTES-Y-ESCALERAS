self.onmessage = function(event) {
    const { position, playerIndex } = event.data;
    
    let newPosition = position;
    if (newPosition in snakes) {
      newPosition = snakes[newPosition];
    } else if (newPosition in ladders) {
      newPosition = ladders[newPosition];
    }
    console.log('Updated position:', newPosition);

    postMessage({ position: newPosition, playerIndex });
  };
  
  const snakes = {
    16: 6,
    47: 26,
    49: 11,
    56: 53,
    62: 19,
    87: 24,
    93: 73,
    95: 75,
  };
  
  const ladders = {
    1: 38,
    4: 14,
    9: 31,
    21: 42,
    28: 84,
    36: 44,
    51: 67,
    71: 91,
  };
  