import React from 'react';
import './embla-button.styl';

import Button from '../../button/button';

type Props = {
  uniqueClassName: string,
  nextOrPrevious: 'next' | 'previous',
  enabled: boolean,
  onClick: (e?: React.MouseEvent<HTMLElement>) => void,
}

const EmblaButton: React.FC<Props> = ({ uniqueClassName, nextOrPrevious, enabled, onClick, ...props }) => {
  let classNames = (nextOrPrevious === 'next') ? `embla__btn embla__btn--next ${uniqueClassName}__btn ${uniqueClassName}__btn--next ` : `embla__btn embla__btn--previous ${uniqueClassName}__btn ${uniqueClassName}__btn--previous `;
  if (!enabled) {classNames = `${classNames} embla__btn--disabled`}
  return <Button className={classNames} disabled={!enabled} onClick={onClick} {...props} />;
};

export default EmblaButton;