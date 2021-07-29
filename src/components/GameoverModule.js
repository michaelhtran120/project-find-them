import React from "react";

const GameoverModule = ({ onRetryClick, score, timer }) => {
  return (
    <div className='gameover-module hidden'>
      <h3>Game Over</h3>
      <p>
        Your time: {timer} {timer === 1 ? "second" : "seconds"}
      </p>
      <button className='retry-btn' onClick={onRetryClick}>
        Retry?
      </button>
      <hr />
      <h3>Scores</h3>
      <div className='highscore'>
        <table>
          <tr>
            <th>Name</th>
            <th>Time</th>
          </tr>
          {score.map((score, i) => (
            <tr key={i}>
              <td>{score.name}</td>
              <td>{score.time} (sec)</td>
            </tr>
          ))}
        </table>
      </div>
    </div>
  );
};

export default GameoverModule;
