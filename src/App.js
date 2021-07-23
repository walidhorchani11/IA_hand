import { useRef } from 'react';

import * as tf from '@tensorflow/tfjs';
import * as handpose from '@tensorflow-models/handpose';
import Webcam from 'react-webcam';

import { drawHand } from './utils';

import './App.css';

function App() {
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);

  const detect = async (net) => {
    try {
      // check data if available
      if (
        webcamRef.current !== undefined &&
        webcamRef.current !== null &&
        webcamRef.current.video.readyState === 4
      ) {
        // get video properties

        const video = webcamRef.current.video;
        const canvas = canvasRef.current;
        const videoWidth = video.videoWidth;
        console.log('detect -> videoWidth', videoWidth);
        const videoHeight = video.videoHeight;
        console.log('detect -> videoHeight', videoHeight);

        // set video height and width
        video.width = videoWidth;
        video.height = videoHeight;
        // set canvas heigt and width
        canvas.width = videoWidth;
        canvas.height = videoHeight;

        // make detection
        const hand = await net.estimateHands(video);

        const ctx = canvas.getContext('2d');
        drawHand(hand, ctx);
      }
      // draw mesh
    } catch (error) {
      console.log('detect -> error', error);
    }
  };

  const loadHandPose = async () => {
    try {
      const net = await handpose.load();

      // loop and detect hands
      setInterval(() => {
        detect(net);
      }, 100);
    } catch (error) {
      console.log('error :::', error);
    }
  };

  loadHandPose();

  return (
    <div className="App">
      <Webcam
        ref={webcamRef}
        style={{
          position: 'absolute',
          marginLeft: 'auto',
          marginRight: 'auto',
          left: 0,
          right: 0,
          textAlign: 'center',
          zIndex: 9,
          width: 640,
          height: 480,
        }}
      />
      <canvas
        ref={canvasRef}
        style={{
          position: 'absolute',
          marginLeft: 'auto',
          marginRight: 'auto',
          left: 0,
          right: 0,
          textAlign: 'center',
          zIndex: 9,
          width: 640,
          height: 480,
        }}
      />
    </div>
  );
}

export default App;
