import React from 'react';
import { useState } from 'react';
import Modal from './Modal.js';
import "./Dashboard.css";

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
        <Modal show={show} handleClose={hideModal} children={updatedChildren}>
          
        </Modal>
        <button id="modalbutton" type="button" onClick={showModal}>
          +
        </button>
      </>
    );
  }



export default Dashboard