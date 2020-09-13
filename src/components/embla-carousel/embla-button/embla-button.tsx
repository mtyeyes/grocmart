import React from 'react';
import './embla-button.styl';

import Button from '../../button/button';

type Props = {
  className: string,
  nextOrPrevious: 'next' | 'previous',
  enabled: boolean,
  onClick: (this: Window, ev: MouseEvent) => any | null,
  [key: string]: any,
}

const EmblaButton: React.FC<Props> = ({ className, nextOrPrevious, enabled, onClick, ...props }) => {
  let classNames = (nextOrPrevious === 'next') ? `embla__btn embla__btn--next ${className}__btn ${className}__btn--next ` : `embla__btn embla__btn--previous ${className}__btn ${className}__btn--previous `;
  if (!enabled) {classNames = `${classNames} embla__btn--disabled`}
  return <Button className={classNames} disabled={!enabled} onClick={onClick} {...props} />;
};

export default EmblaButton;