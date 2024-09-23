self.onmessage = function(event) {
    const { position, roll } = event.data;
    const newPosition = position + roll;
    console.log('MoveWorker:', event.data);

    if (newPosition > 99) {
      postMessage(position);
    } else {
      postMessage(newPosition);
    }
  };
  