import React from "react";

const DifficultyModule = ({onhandleChange, onEasyClick, onHardClick, disabledState}) => {
  return (
    <div className='difficulty-module-window'>
      <p>Enter Name then choose a difficulty</p>
      <form></form>
      <input
        type='text'
        placeholder='enter name'
        onChange={onhandleChange}
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
  );
};

export default DifficultyModule;
