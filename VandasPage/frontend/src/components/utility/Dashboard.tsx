

import { type } from '@testing-library/user-event/dist/type';
import React from 'react';
import { useState } from 'react';
import Modal from './Modal';
type Props = {
  children: React.ReactElement;
  buttonContent: string;
}
const Dashboard = ({ children, buttonContent}:Props) => {
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
        {buttonContent}
        </button>
      </>
    );
  }



export default Dashboard


