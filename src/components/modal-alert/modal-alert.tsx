import React from 'react';
import './modal-alert.styl';

import Button from '../button/button';
import ModalWithScreenblock from '../modal-with-screenblock/modal-with-screenblock';

type Props = {
  children: string,
  closeModal: () => void,
}

const ModalAlert = ({ closeModal, children }: Props) => {
  return (
    <ModalWithScreenblock renderInside="root" closeModal={closeModal}>
      <div className="modal-alert__wrapper">
        <p className="modal-alert__text">{children}</p>
        <Button className="modal-alert__close-btn" onClick={closeModal}>ok</Button>
      </div>
    </ModalWithScreenblock>
  );
};

export default ModalAlert;