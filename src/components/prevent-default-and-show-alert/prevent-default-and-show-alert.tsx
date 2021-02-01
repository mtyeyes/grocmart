import React, { useState, cloneElement, ReactElement } from 'react';
import ModalAlert from '../modal-alert/modal-alert';

const PreventDefaultAndShowAlert = (component: ReactElement, alertMessage: string) => {
  const [modalAlertVisible, setModalAlertVisibility] = useState(false);

  const handleClickOnComponent = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    setModalAlertVisibility(true);
  };

  return (
    <>
      {cloneElement(component, { onClick: handleClickOnComponent })}
      {modalAlertVisible && <ModalAlert closeModal={() => {setModalAlertVisibility(false)}}>{alertMessage}</ModalAlert>}
    </>
  );
};

export default PreventDefaultAndShowAlert;