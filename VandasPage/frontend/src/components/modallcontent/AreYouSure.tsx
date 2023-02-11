import React from 'react';

const AreYouSure = ({ handleOnClick, message, hideModal, levelID}) => {

  return (
    <>
      <div id='sure'>{message} </div>
      <button className='Yes' onClick={()=>{
        handleOnClick(levelID);
        hideModal();
        
    }} >Igen</button>
    </>
  );
};

export default AreYouSure;