import React from 'react';
import './counter.styl';

import Button from '../button/button';
import HiddenText from '../hidden-text/hidden-text';
import Icon from '../icon/icon';

type Props = {
  classNamePrefix?: string,
  count: number,
  increment: () => void,
  decrement: () => void,
}

const Counter = ({classNamePrefix, count, increment, decrement}: Props) => {

  return (
    <div className={(classNamePrefix) ? `${classNamePrefix}__counter counter` : 'counter'}>
      <p className="counter__count">{count}</p>
      <Button className="counter__btn counter__btn--decrement" onClick={decrement}>
        <Icon className="counter__btn-icon" iconId="minus"/>
        <HiddenText>Remove</HiddenText>
      </Button>
      <Button className="counter__btn counter__btn--increment" onClick={increment}>
        <Icon className="counter__btn-icon" iconId="plus"/>
        <HiddenText>Add</HiddenText>
      </Button>
    </div>
  );
};

export default Counter;