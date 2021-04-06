import React from 'react';
import './button.styl';

const Button: React.FC<React.ComponentProps<'button'>> = ({
  className,
  ...props
}) => {
  const classNames = className ? `btn ${className}` : 'btn';

  return <button className={classNames} type="button" {...props} />;
};

export default Button;
