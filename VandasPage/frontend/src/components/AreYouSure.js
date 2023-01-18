import React from 'react';

const AreYouSure = ({ handleOnClick, messege, hideModal, levelID}) => {

  return (
    <>
      <div id='sure'>{messege} </div>
      <button className='Yes' onClick={()=>{
        handleOnClick(levelID);
        hideModal();
        
    }} >Igen</button>
    </>
  );
};

export default AreYouSure;