import React from 'react';

const AreYouSure = ({ handleOnClick, messege }) => {
  return (
    <>
      <div id='sure'>{messege} </div>
      <button className='Yes' onClick={handleOnClick} >Igen</button>
    </>
  );
};

export default AreYouSure;