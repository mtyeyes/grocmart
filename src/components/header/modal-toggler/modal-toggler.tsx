import React, { useState, cloneElement, ReactElement } from 'react';
import './modal-toggler.styl';

import Button from '../../button/button';
import Icon, { IconId } from '../../icon/icon';
import HiddenText from '../../hidden-text/hidden-text';


type Props = {
  parentBlockName: string,
  childrenBlockName: string,
  children: ReactElement,
  btnChildrenElement?: ReactElement,
  icon: IconId,
}

const ModalToggler = ({ parentBlockName, childrenBlockName, children, icon, btnChildrenElement }: Props) => {
  const [isModalVisible, setModalVisibility] = useState(false);

  const changeModalVisibility = () => {setModalVisibility(!isModalVisible)};

  return (
    <div className={`modal-toggler ${parentBlockName}__modal-toggler ${parentBlockName}__modal-toggler--${childrenBlockName} ${(isModalVisible) ? `${parentBlockName}__modal-toggler-toggled` : ''}`}>
      <Button className="modal-toggler__btn" onClick={changeModalVisibility}>
        <Icon iconId={icon} />
        <HiddenText>{childrenBlockName}</HiddenText>
        {btnChildrenElement !== undefined &&
          btnChildrenElement
        }
      </Button>
      {isModalVisible &&
        cloneElement(children, { switchModalVisibility: changeModalVisibility })
      }
    </div>
  );
};

export default ModalToggler;
