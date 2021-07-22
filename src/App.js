// import firebase from "./firebase";
import React, { useState, useEffect } from "react";
import "./App.css";
import findWaldoPhoto from "./images/waldo.jpg";

import Nav from "./components/Nav.js";

function App() {
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const onClick = (e) => {
    const clickCoords = { x: e.nativeEvent.offsetX, y: e.nativeEvent.offsetY };
    setCoords(clickCoords);
  };
  useEffect(() => {
    console.log(coords);
    if (
      coords.x < 1310 &&
      coords.x > 1250 &&
      coords.y > 660 &&
      coords.y < 730
    ) {
      console.log("correct");
    } else {
      console.log("wrong");
    }
  }, [coords]);
  return (
    <div className='App'>
      <Nav />
      <img id='myImgId' src={findWaldoPhoto} onClick={onClick} />
    </div>
  );
}

export default App;
