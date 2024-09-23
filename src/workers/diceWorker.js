self.onmessage = function(event) {
    const roll = Math.floor(Math.random() * 6) + 1;
    console.log('DiceWorker:', roll);
    postMessage(roll);
  };
  