import React from 'react';
import './feedback-item.styl';

import { PATH } from '../../../app';

export type Props = {
  review: string,
  userName: string,
  userId: string,
}

const FeedbackItem = ({ review, userName, userId }: Props) => {
  return (
    <li className="feedback-item slider-item">
      <article className="feedback-item__wrapper">
        <p className="feedback-item__review">{review}</p>
        <div className="feedback-item__user-info-wrapper">
          <img src={`${PATH}images/user-avatar-${userId}.jpg`} alt={`${userName} avatar`} className="feedback-item__user-avatar" loading="lazy" />
          <p className="feedback-item__user-name">{userName}</p>
          <p className="feedback-item__user-badge">Client</p>
        </div>
      </article>
    </li>
  );
};

export default FeedbackItem;