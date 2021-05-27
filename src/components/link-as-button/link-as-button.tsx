import React, { ReactNode, MouseEvent } from 'react';
import { Link } from 'react-router-dom';
import './link-as-button.styl';

type Props = {
  to: string;
  className?: string;
  onClick?: (e?: MouseEvent<HTMLElement>) => void;
  subtype: 'rectangular-green' | 'rectangular-red' | 'round-red' | 'round-green' | 'round-grey';
  children: ReactNode;
};

const LinkAsButton = ({ to, className, subtype, ...props }: Props) => {
  const classNames = className ? `link-as-btn ${className} link-as-btn--${subtype}` : `link-as-btn link-as-btn--${subtype}`;

  return <Link className={classNames} to={to} {...props} />;
};

export default LinkAsButton;
