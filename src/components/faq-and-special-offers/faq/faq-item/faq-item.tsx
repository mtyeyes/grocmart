import React from 'react';
import './faq-item.styl';

import Button from '../../../button/button';
import Icon from '../../../icon/icon';

type Props = {
  questionId: string,
  question: string,
  answer: string,
  isExpanded: boolean,
  toggle: (questionId: string) => void,
}

const FaqItem = ({ questionId, question, answer, isExpanded, toggle }: Props) => {
  return (
    <div className="faq-item__container">
      <dt className="faq-item__question">
        <Button className={(isExpanded) ? 'faq-item__expand-btn faq-item__expand-btn--expanded' : 'faq-item__expand-btn'} onClick={()=>{toggle(questionId)}} aria-controls={questionId} aria-expanded={isExpanded}>
          <Icon className="faq-item__icon" iconId="right-open" />
          {question}
        </Button>
      </dt>
      <dd className={(isExpanded) ? 'faq-item__answer faq-item__answer--expanded' : 'faq-item__answer'} id={questionId}>{answer}</dd>
    </div>
  );
};

export default FaqItem;