import React, { useState, cloneElement, ReactElement, MouseEvent, FormEvent, ChangeEvent, KeyboardEvent } from 'react';
import ModalAlert from '../modal-alert/modal-alert';

type Props = {
  component: ReactElement,
  eventType: 'onClick' | 'onSubmit' | 'onChange' | 'onKeyPress',
  alertMessage: string
}

const PreventDefaultAndShowAlert = ({component, eventType, alertMessage}: Props) => {
  const [modalAlertVisible, setModalAlertVisibility] = useState(false);

  const handleClickOnComponent = (e: MouseEvent<HTMLElement> | FormEvent<HTMLElement> | ChangeEvent<HTMLInputElement> | KeyboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    setModalAlertVisibility(true);
  };

  return (
    <>
      {cloneElement(component, { [eventType]: handleClickOnComponent })}
      {modalAlertVisible && <ModalAlert closeModal={() => {setModalAlertVisibility(false)}}>{alertMessage}</ModalAlert>}
    </>
  );
};

export default PreventDefaultAndShowAlert;