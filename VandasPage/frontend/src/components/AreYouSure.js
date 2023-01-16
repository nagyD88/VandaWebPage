import React from 'react';

const AreYouSure = ({ handleOnClick, messege, hideModal}) => {

  return (
    <>
      <div id='sure'>{messege} </div>
      <button className='Yes' onClick={()=>{
        handleOnClick();
        hideModal();
        
    }} >Igen</button>
    </>
  );
};

export default AreYouSure;