import React from 'react';
import { useState } from 'react';
import Modal from './Modal';
import './Dashboard.css';
import DataContext from '../../context/dataContext';
type Props = {
  children: React.ReactElement;
};

const Dashboard = ({ children }: Props) => {
  const [show, setShow] = useState(false);

  const showModal = () => {
    setShow(true);
  };

  const hideModal = () => {
    setShow(false);
  };

  let updatedChildren = React.Children.map(children, (child) => {
    return React.cloneElement(child, { hideModal: hideModal });
  });
  return (
    <>
      <Modal show={show} handleClose={hideModal}>
        {updatedChildren}
      </Modal>
      <button id="modalbutton" type="button" onClick={showModal}>
        +
      </button>
    </>
  );
};

export default Dashboard;
