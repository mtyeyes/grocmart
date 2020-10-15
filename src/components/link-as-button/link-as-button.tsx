import React from 'react';
import { Link } from 'react-router-dom';
import './link-as-button.styl';

type Props = {
  onClick?: (...args: any) => void,
  to: string,
  className?: string,
  subtype: 'rectangular-green' | 'rectangular-red' | 'round-red' | 'round-green' | 'round-grey',
  [key: string]: any,
}

const LinkAsButton: React.FC<Props> = ({ to, className, subtype, ...props }) => {
  const classNames = (className) ? `link-as-btn ${className} link-as-btn--${subtype}` : `link-as-btn link-as-btn--${subtype}`;

  return <Link className={classNames} to={to} {...props} />;
};

export default LinkAsButton;