// import firebase from "./firebase";
import React, { useState, useEffect } from "react";
import "./App.css";
import findWaldoPhoto from "./images/waldo.jpg";
import ek from "./images/ek-photo.jpeg";
import waldo from "./svg/waldo.svg";
import brian from "./svg/brian.svg";
import kumamon from "./svg/kumamon.svg";

import Nav from "./components/Nav.js";

const imagesDatabase = [
  {
    name: "Waldo",
    src: findWaldoPhoto,
    answer: [
      {
        modPhoto: waldo,
        alt: "waldo",
        // xmin: 1250,
        // xmax: 1310,
        // ymin: 660,
        // ymax: 730,
      },
    ],
  },
  {
    name: "EgorK",
    src: ek,
    answer: [
      {
        modPhoto: brian,
        alt: "brian",
        xmin: 187,
        xmax: 226,
        ymin: 2991,
        ymax: 3023,
      },
      {
        modPhoto: kumamon,
        alt: "kumamon",
        xmin: 870,
        xmax: 935,
        ymin: 4140,
        ymax: 4210,
      },
      {
        modPhoto: waldo,
        alt: "waldo",
        xmin: 1150,
        xmax: 1200,
        ymin: 3690,
        ymax: 3750,
      },
    ],
  },
];

function App() {
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const [showSquare, setShowSquare] = useState(false);
  const [image /*setImage*/] = useState(imagesDatabase[1]);
  const [timer, setTimer] = useState(0);
  const [gameStatus /*setGameStatus*/] = useState(true);

  useEffect(() => {
    console.log(coords);
  }, [coords]);

  useEffect(() => {
    let interval = null;

    if (gameStatus) {
      interval = setInterval(() => {
        setTimer((timer) => timer + 1);
      }, 1000);
    } else {
      clearInterval(interval);
    }
    return () => {
      clearInterval(interval);
    };
  }, [gameStatus]);

  const onClick = (e) => {
    const clickCoords = { x: e.nativeEvent.offsetX, y: e.nativeEvent.offsetY };
    setCoords(clickCoords);
    setShowSquare(!showSquare);
  };

  const checkAnswer = (e) => {
    console.log("check answer");
    console.log(e.currentTarget.alt);
    const character = image.answer.find(
      (ans) => ans.alt === e.currentTarget.alt
    );
    if (
      coords.x > character.xmin &&
      coords.x < character.xmax &&
      coords.y > character.ymin &&
      coords.y < character.ymax
    ) {
      console.log("correct");
    } else {
      console.log("wrong");
    }
  };

  const squareStyle = {
    position: "absolute",
    left: 0 + coords.x - 25,
    top: 0 + coords.y - 25,
    marginTop: "100px",
  };

  const moduleStyle = {
    position: "absolute",
    left: 0 + coords.x + 35,
    top: 0 + coords.y - 35,
    marginTop: "100px",
  };

  return (
    <div className='App'>
      <Nav answer={image.answer} timer={timer} />
      <img id='myImg' src={image.src} alt='collage' onClick={onClick} />
      {showSquare ? (
        <>
          <div className='square' style={squareStyle} />
          <div className='char-module' style={moduleStyle}>
            {image.answer.map((ans, i) => (
              <img
                key={i}
                src={ans.modPhoto}
                alt={ans.alt}
                className='char'
                onClick={checkAnswer}
                data-value={ans.name}
              />
            ))}
          </div>
        </>
      ) : null}
    </div>
  );
}

export default App;

// useEffect(() => {
//   console.log(coords);
//   if (
//     coords.x < 1310 &&
//     coords.x > 1250 &&
//     coords.y > 660 &&
//     coords.y < 730
//   ) {
//     console.log("correct");
//   } else {
//     console.log("wrong");
//   }
// }, [coords]);
