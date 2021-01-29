import React, { useState, cloneElement, ReactElement } from 'react';
import ModalAlert from '../../modal-alert/modal-alert';

const BlockedLinkToCheckout = (component: ReactElement) => {
  const [modalAlertVisible, setModalAlertVisibility] = useState(false);

  const handleClickOnComponent = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    setModalAlertVisibility(true);
  };

  return (
    <>
      {cloneElement(component, { onClick: handleClickOnComponent })}
      {modalAlertVisible && <ModalAlert closeModal={() => {setModalAlertVisibility(false)}}>This is a static site and checkout link is inactive</ModalAlert>}
    </>
  );
};

export default BlockedLinkToCheckout;