import React, { useRef, useEffect, ReactNode } from 'react';
import { createPortal } from 'react-dom';
import './modal-with-screenblock.styl';

type Props = {
  closeModal: () => void;
  renderInside: 'component' | 'root';
  children: ReactNode;
};

type EventKeyup = {
  key: string;
};

const ModalWithScreenblock = ({ closeModal, renderInside, children }: Props) => {
  const screenblock = useRef<HTMLDivElement>(null);
  const root = document.getElementById('root')!;

  const closeModalByClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === screenblock.current) {
      closeModal();
    }
  };
  const closeModalByEsc = (e: EventKeyup) => {
    if (e.key === 'Escape') {
      closeModal();
    }
  };

  useEffect(() => {
    document.addEventListener('keyup', closeModalByEsc);
    return () => {
      document.removeEventListener('keyup', closeModalByEsc);
    };
  }, []);

  const childrenWrappedInScreenblocker = () => {
    return (
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
