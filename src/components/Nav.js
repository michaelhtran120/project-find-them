const Nav = ({ answer, timer }) => {
  return (
    <div className='navbar'>
      <h1>Find Them</h1>
      <div>
        <p>Find</p>
        <div className='nav-imgs'>
          {answer.map((ans, i) => (
            <img key={i} className='nav-img' src={ans.modPhoto} alt={ans.alt} />
          ))}
        </div>
      </div>
      <h2 className='nav-timer'>Timer: {timer}</h2>
    </div>
  );
};

export default Nav;
