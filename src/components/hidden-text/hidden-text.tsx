import React from 'react';
import '../../index.styl';

type Props = {
  children: string,
}

const HiddenText: React.FC<Props> = ({ children }) => {
  return <span className="visually-hidden">{children}</span>;
};

export default HiddenText;