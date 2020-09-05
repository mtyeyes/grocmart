import React from 'react';
import './button.styl';

type Props = {
  onClick?: (...args: any) => void,
  [key: string]: any
}

const Button: React.FC<Props> = ({className, ...props}) => {
  const classNames = (className) ? `btn ${className}` : 'btn';

  return <button className={classNames} type="button" {...props} />;
};

export default Button;