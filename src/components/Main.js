import React from "react";
import Nav from "./Nav.js";
import Choice from "./Choice.js";

const Main = ({ image, timer, onClick, showChoice, coords, checkAnswer }) => {
  return (
    <div className='main'>
      <Nav answer={image.answer} timer={timer} />
      <img id='myImg' src={image.src} alt='collage' onClick={onClick} />
      {showChoice ? (
        <Choice coords={coords} onClick={checkAnswer} image={image} />
      ) : null}
    </div>
  );
};

export default Main;
