import React, { useState } from 'react';
import './burger-btn.styl';

import Button from '../../../button/button';

type Props = {
  onClick?: () => void,
  btnTitle: string,
  className?: string,
}

const BurgerBtn = ({ btnTitle, onClick, className, ...props }: Props) => {
  const [isToggled, setToggle] = useState(false);

  const toggleBurger = () => {
    setToggle(!isToggled);
  };

  const combineEventListeners = () => {
    if (onClick) { onClick() }
    toggleBurger();
  };

  return (
    <Button onClick={combineEventListeners} className={`${className} ${(isToggled) ? 'burger-btn burger-btn--toggled' : 'burger-btn'}`} {...props}>
      <span className="visually-hidden">{btnTitle}</span>
      <span className="burger-btn__shape"/>
      <span className="burger-btn__shape"/>
      <span className="burger-btn__shape"/>
    </Button>
  );
};

export default BurgerBtn;