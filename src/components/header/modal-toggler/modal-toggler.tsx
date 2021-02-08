import React, { useState, ReactElement, ReactNode } from 'react';
import './modal-toggler.styl';

import Button from '../../button/button';
import Icon, { IconId } from '../../icon/icon';
import HiddenText from '../../hidden-text/hidden-text';


type Props = {
  parentBlockName: string,
  childrenBlockName: string,
  render: (switchModalVisibility: () => void) => ReactNode,
  btnChildrenElement?: ReactElement,
  icon: IconId,
}

const ModalToggler = ({ parentBlockName, childrenBlockName, icon, render, btnChildrenElement }: Props) => {
  const [isModalVisible, setModalVisibility] = useState(false);

  const switchModalVisibility = () => {setModalVisibility(!isModalVisible)};

  return (
    <div className={`modal-toggler ${parentBlockName}__modal-toggler ${parentBlockName}__modal-toggler--${childrenBlockName} ${(isModalVisible) ? `${parentBlockName}__modal-toggler-toggled` : ''}`}>
      <Button className="modal-toggler__btn" onClick={switchModalVisibility}>
        <Icon iconId={icon} />
        <HiddenText>{childrenBlockName}</HiddenText>
        {btnChildrenElement !== undefined &&
          btnChildrenElement
        }
      </Button>
      {isModalVisible &&
        render(switchModalVisibility)
      }
    </div>
  );
};

export default ModalToggler;
