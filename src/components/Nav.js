const Nav = () => {
  return (
    <div className='navbar'>
      <h1>Find Them</h1>
      <p>
        X:<span id='x'></span>
      </p>
      <p>
        Y:<span id='y'></span>
      </p>
      <h2 className='timer'>0:00</h2>
    </div>
  );
};

export default Nav;
