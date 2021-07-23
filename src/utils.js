const fingerJoints = {
  thumb: [0, 1, 2, 3, 4],
  indexFinger: [0, 5, 6, 7, 8],
  middleFinger: [0, 9, 10, 11, 12],
  ringFinger: [0, 13, 14, 15, 16],
  pinky: [0, 17, 18, 19, 20],
};
// object keys = ["thumb", ""indexFinger", ....];
const keys = Object.keys(fingerJoints);

// specified style for first point of all fingers
const st = [1, 5, 9, 13, 17];
export const drawHand = (predictions = [], ctx = null) => {
  if (predictions.length > 0) {
    const [predictionVal] = predictions;
    const { landmarks } = predictionVal;
    landmarks.forEach((elem, index, tab) => {
      const [x, y, z] = elem;

      ctx.beginPath();
      ctx.arc(x, y, st.includes(index) ? 8 : 5, 0, 3 * Math.PI);
      ctx.fillStyle = index === 0 ? 'red' : 'aqua';
      ctx.fill();
    });

    // ********** liaison entre point
    //elem : [x, y, z]

    keys.forEach((key, index, tab) => {
      for (let i = 0; i < fingerJoints[key].length - 1; i++) {
        const [x, y] = landmarks[fingerJoints[key][i]];
        //  for end line
        const [a, b] = landmarks[fingerJoints[key][i + 1]];

        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.lineTo(a, b);
        ctx.stroke();
      }
    });
  }
  console.log('nothings');
};
