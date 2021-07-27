import firebase from "./firebase";
import React, { useState, useEffect } from "react";
import "./App.css";
import findWaldoPhoto from "./images/waldo.jpg";
import waldo from "./svg/waldo.svg";
import waldox from "./svg/waldox.svg";

import Nav from "./components/Nav.js";

const imagesDatabase = [
  {
    name: "Waldo",
    src: findWaldoPhoto,
    answer: [
      {
        modPhoto: waldo,
        foundPhoto: waldox,
        alt: "waldo",
        isCorrect: false,
      },
    ],
  },
];

function useDatabase() {
  const [database, setDatabase] = useState([]);

  useEffect(() => {
    firebase
      .firestore()
      .collection("database")
      .get()
      .then((snapshot) => {
        const newDatabase = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setDatabase(newDatabase);
      });
  }, []);
  return database;
}

function App() {
  const database = useDatabase();
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const [showChoice, setShowChoice] = useState(false);
  const [image, setImage] = useState(imagesDatabase[0]);
  const [timer, setTimer] = useState(0);
  const [gameStatus, setGameStatus] = useState(false);
  const [name, setName] = useState("");
  const [disabledState, setDisabledState] = useState(true);

  // Get players name
  const handleChange = (e) => {
    setName(e.currentTarget.value);
  };
  // Enable diff btn if name entered or disabled when blank.
  useEffect(() => {
    if (name === "") {
      setDisabledState(true);
    } else {
      setDisabledState(false);
    }
  }, [name]);

  const onClick = (e) => {
    const clickCoords = {
      x: e.nativeEvent.offsetX,
      y: e.nativeEvent.offsetY,
    };
    setCoords(clickCoords);
    setShowChoice(!showChoice);
  };

  const onEasyClick = () => {
    setImage(database[1]);
    document.querySelector(".module-window").classList.add("hidden");
    document.querySelector(".main").style.opacity = "100%";
    setGameStatus(true);
  };

  const onHardClick = () => {
    setImage(database[0]);
    document.querySelector(".module-window").classList.add("hidden");
    document.querySelector(".main").style.opacity = "100%";
    setGameStatus(true);
  };
  // Start timer once difficulty is chosen
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

  const checkAnswer = (e) => {
    const character = image.answer.find(
      (ans) => ans.alt === e.currentTarget.alt
    );
    if (
      coords.x > character.xmin &&
      coords.x < character.xmax &&
      coords.y > character.ymin &&
      coords.y < character.ymax
    ) {
      const newAnswer = image.answer.map((ans) => {
        if (ans.alt === character.alt) {
          alert("correct");
          setShowChoice(false);
          return { ...ans, isCorrect: true, modPhoto: ans.foundPhoto };
        } else {
          return ans;
        }
      });
      setImage({ ...image, answer: newAnswer });
    } else {
      alert("wrong");
      setShowChoice(false);
    }
  };

  useEffect(() => {
    const answers = image.answer.map((ans) => ans.isCorrect);
    if (!answers.includes(false)) {
      setGameStatus(false);
      document.querySelector(".main").style.opacity = "50%";
      document.querySelector(".gameover-module").classList.remove("hidden");
      setShowChoice(false);
    }
  }, [image]);

  const onRetryClick = () => {
    document.querySelector(".module-window").classList.remove("hidden");
    document.querySelector(".gameover-module").classList.add("hidden");
    setTimer(0);
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
      <div className='module-window'>
        <p>Enter Name then choose a difficulty</p>
        <form></form>
        <input
          type='text'
          placeholder='enter name'
          onChange={handleChange}
          required
        />
        <div className='difficulty-btns'>
          <button
            className='easy-btn'
            onClick={onEasyClick}
            disabled={disabledState}
          >
            Easy
          </button>
          <button
            className='hard-btn'
            onClick={onHardClick}
            disabled={disabledState}
          >
            Hard
          </button>
        </div>
      </div>
      <div className='main'>
        <Nav answer={image.answer} timer={timer} />
        <img id='myImg' src={image.src} alt='collage' onClick={onClick} />
        {showChoice ? (
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
                />
              ))}
            </div>
          </>
        ) : null}
      </div>
      <div className='gameover-module hidden'>
        <h3>Game Over</h3>
        <button className='retry-btn' onClick={onRetryClick}>
          Retry?
        </button>
      </div>
    </div>
  );
}

export default App;

// {
//   name: "EgorK",
//   src: ek,
//   score: [],
//   answer: [
//     {
//       modPhoto: brian,
//       foundPhoto: brianx,
//       alt: "brian",
//       xmin: 187,
//       xmax: 226,
//       ymin: 2991,
//       ymax: 3023,
//       isCorrect: false,
//     },
//     {
//       modPhoto: kumamon,
//       foundPhoto: kumamonx,
//       alt: "kumamon",
//       xmin: 870,
//       xmax: 935,
//       ymin: 4140,
//       ymax: 4210,
//       isCorrect: false,
//     },
//     {
//       modPhoto: waldo,
//       foundPhoto: waldox,
//       alt: "waldo",
//       xmin: 1150,
//       xmax: 1200,
//       ymin: 3690,
//       ymax: 3750,
//       isCorrect: false,
//     },
//   ],
// },
