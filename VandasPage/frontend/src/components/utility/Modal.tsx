import React from 'react';

const Modal = ({ handleClose, show, children }) => {
  
  const showHideClassName = show ? "modal display-block" : "modal display-none";

  return (
    <div className={showHideClassName}>
      <section className="modal-main flex flex-col justify-start items-center">
        {children}
        <button className='regbutton' type="button" onClick={handleClose}>
          mégse
        </button>
      </section>
    </div>
  );
};

export default Modal;