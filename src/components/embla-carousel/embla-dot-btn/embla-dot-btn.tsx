import React from 'react';
import './embla-dot-btn.styl';

import Button from '../../button/button';

interface Props {
  uniqueClassName: string;
  selected: boolean;
  onClick: () => void;
}

const EmblaDotButton = ({ uniqueClassName, selected, onClick, ...props }: Props) => {
  const classNames = selected
    ? `embla__dot-btn embla__dot-btn--selected ${uniqueClassName}__dot-btn ${uniqueClassName}__dot-btn--selected`
    : `embla__dot-btn ${uniqueClassName}__dot-btn`;
  return <Button className={classNames} onClick={onClick} {...props} />;
};

export default EmblaDotButton;
