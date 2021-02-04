import React, { useEffect, useRef } from 'react';
import './floating-text.styl';

type Props = {
  children: string | number,
  positionStyle: PositionStyle,
  valueToTriggerAnimation?: string | number,
}

type PositionStyle = {
  width?: string | number,
  top?: number | string,
  bottom?: number | string,
  left?: number | string,
  right?: number | string,
}

const FloatingText: React.FC<Props> = ({ children, positionStyle, valueToTriggerAnimation }) => {
  const spanRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if(spanRef.current !== null) {spanRef.current.animate([{transform: 'scale(0.8)'}, {transform: 'scale(1.2)'}, {transform: 'scale(1)'}], {duration: 500})}
  }, [spanRef, valueToTriggerAnimation]);

  return (
    <span className="floating-text" ref={spanRef} style={positionStyle} >{children}</span>
  );
};

export default FloatingText;