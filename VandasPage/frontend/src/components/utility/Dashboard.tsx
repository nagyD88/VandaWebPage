import React from 'react';
import { useState } from 'react';
import Modal from './Modal';

const Dashboard = ({ children }) => {
  const [show, setShow] = useState(false);

  const showModal = () => {
    setShow(true);
  };

  const hideModal = () => {
    setShow(false);
  };
  let updatedChildren = React.Children.map(children,
    (child) => {
        return React.cloneElement(child, { hideModal: hideModal });
    })
    return (
      <>
        <Modal show={show} handleClose={hideModal} >
          {updatedChildren}
        </Modal>
        <button className='float-left mt-0 p-[0.12rem]' type="button" onClick={showModal}>
          -
        </button>
      </>
    );
  }



export default Dashboard