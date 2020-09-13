import React from 'react';
import './embla-dot-btn.styl';

import Button from '../../button/button';

type Props = {
  className: string,
  selected: boolean,
  onClick: (index: number) => void,
  [key: string]: any,
}

const EmblaDotButton: React.FC<Props> = ({ className, selected, onClick, ...props }) => {
  const classNames = (selected) ? `embla__dot-btn embla__dot-btn--selected ${className}__dot-btn ${className}__dot-btn--selected` : `embla__dot-btn ${className}__dot-btn`;
  return <Button className={classNames} onClick={onClick} {...props} />;
};

export default EmblaDotButton;