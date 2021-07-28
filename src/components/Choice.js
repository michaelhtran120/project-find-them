import React from "react";

const Choice = ({ image, onClick, coords }) => {
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
    <>
      <div className='square' style={squareStyle} />
      <div className='char-module' style={moduleStyle}>
        {image.answer.map((ans, i) => (
          <img
            key={i}
            src={ans.modPhoto}
            alt={ans.alt}
            className='char'
            onClick={onClick}
          />
        ))}
      </div>
    </>
  );
};

export default Choice;
