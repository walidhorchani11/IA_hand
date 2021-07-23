const fingerJoints = {
  thumb: [0, 1, 2, 3, 4],
  indexFinger: [0, 5, 6, 7, 8],
  middleFinger: [0, 9, 10, 11, 12],
  ringFinger: [0, 13, 14, 15, 16],
  pinky: [0, 17, 18, 19, 20],
};

export const drawHand = (predictions = [], ctx = null) => {
  if (predictions.length > 0) {
    const [predictionVal] = predictions;
    const { landmarks } = predictionVal;
    landmarks.forEach((elem, index, tab) => {
      const [x, y, z] = elem;

      ctx.beginPath();
      ctx.arc(x, y, 5, 0, 3 * Math.PI);
      ctx.fillStyle = 'aqua';
      ctx.fill();
    });
  }
  console.log('nothings');
};
