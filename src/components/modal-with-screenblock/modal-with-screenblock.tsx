import React, { useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import './modal-with-screenblock.styl';

type Props = {
  closeModal?: () => void
  renderInside: 'component' | 'root',
}

type EventKeyup = {
  key: string,
}

const ModalWithScreenblock: React.FC<Props> = ({ closeModal, renderInside, children }) => {
  const screenblock = useRef<HTMLDivElement>(null);
  const root = document.getElementById('root')!;

  const closeModalByClick = (e: React.MouseEvent<HTMLDivElement>) => { if (e.target === screenblock.current && closeModal) { closeModal() } };
  const closeModalByEsc = (e: EventKeyup) => { if (e.key === 'Escape' && closeModal) { closeModal() } };

  useEffect(()=>{
    document.addEventListener('keyup', closeModalByEsc);
    return () => {
      document.removeEventListener('keyup', closeModalByEsc);
    };
  }, [closeModal]);

  const childrenWrappedInScreenblocker = () => {
    return(
      <div className="modal-screenblock" ref={screenblock} role="button" onClick={closeModalByClick}>
        {children}
      </div>
    );
  };

  if (renderInside === 'root') {
    return createPortal(childrenWrappedInScreenblocker(), root);
  } else {
    return childrenWrappedInScreenblocker();
  }
};

export default ModalWithScreenblock;