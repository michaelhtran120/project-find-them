import firebase from "./firebase";
import React, { useState, useEffect } from "react";
import "./App.css";
import findWaldoPhoto from "./images/waldo.jpg";
import waldo from "./svg/waldo.svg";
import waldox from "./svg/waldox.svg";

import Main from "./components/Main.js";
import DifficultyModule from "./components/DifficultyModule";
import Credit from "./components/Credit.js";
import GameoverModule from "./components/GameoverModule.js";

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
    score: [],
  },
];
function useDatabase() {
  const [database, setDatabase] = useState([]);

  useEffect(() => {
    const unsubscribe = firebase
      .firestore()
      .collection("database")
      .onSnapshot((snapshot) => {
        const newDatabase = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setDatabase(newDatabase);
      });
    return () => unsubscribe();
  }, []);
  return database;
}

function App() {
  const database = useDatabase();
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const [showChoice, setShowChoice] = useState(false);
  const [image, setImage] = useState(imagesDatabase[0]);
  const [score, setScore] = useState([]);
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
    document.querySelector(".difficulty-module-window").classList.add("hidden");
    document.querySelector(".main").style.opacity = "100%";
    setGameStatus(true);
  };

  const onHardClick = () => {
    setImage(database[0]);
    document.querySelector(".difficulty-module-window").classList.add("hidden");
    document.querySelector(".main").style.opacity = "100%";
    setGameStatus(true);
  };

  // Sorting score function from fastest to slowest
  function compare(a, b) {
    const timeA = a.time;
    const timeB = b.time;

    let comparison = 0;
    if (timeA > timeB) {
      comparison = 1;
    } else if (timeA < timeB) {
      comparison = -1;
    }
    return comparison;
  }
  useEffect(() => {
    image.score.sort(compare);
    setScore(image.score);
  }, [image]);

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

  // Check answer function
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

  //Game over check and adding player score to database.
  useEffect(() => {
    const answers = image.answer.map((ans) => ans.isCorrect);
    if (!answers.includes(false)) {
      setGameStatus(false);
      document.querySelector(".main").style.opacity = "50%";
      document.querySelector(".gameover-module").classList.remove("hidden");
      setShowChoice(false);
      firebase
        .firestore()
        .collection("database")
        .doc(image.id)
        .update({ score: [...image.score, { name: name, time: timer }] });
    }
  }, [image, name, timer]);

  const onRetryClick = () => {
    document
      .querySelector(".difficulty-module-window")
      .classList.remove("hidden");
    document.querySelector(".gameover-module").classList.add("hidden");
    setTimer(0);
  };

  return (
    <div className='App'>
      <DifficultyModule
        onhandleChange={handleChange}
        onEasyClick={onEasyClick}
        onHardClick={onHardClick}
        disabledState={disabledState}
      />
      <Main
        timer={timer}
        image={image}
        onClick={onClick}
        showChoice={showChoice}
        coords={coords}
        checkAnswer={checkAnswer}
      />
      <GameoverModule timer={timer} onRetryClick={onRetryClick} score={score} />
      {image.id === "616N6MdDqwwPtO3o16HD" ? <Credit /> : null}
    </div>
  );
}

export default App;
