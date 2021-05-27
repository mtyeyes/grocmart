import React, { useState } from 'react';
import './faq.styl';

import FaqItem from './faq-item/faq-item';
import ScrollAnimation from 'react-animate-on-scroll';

type QuestionAnswerPair = {
  question: string;
  answer: string;
};

type ExpandedQuestion = null | string;

const Faq = () => {
  const questionAnswerPair = [
    {
      question: 'Why is it important to buy localy produced goods?',
      answer:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip',
    },
    {
      question: 'What are the delivery hours?',
      answer:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    },
    {
      question: 'What if my order has already been shipped and I need to cancel it?',
      answer:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit incididunt ut labore et dolore magna aliqua. Nostrud exercitation ullamco laboris nisi ut aliquip',
    },
  ];

  const [expandedQuestion, setExpandedQuestion] = useState(null as ExpandedQuestion);

  const toggleQuestion = (questionId: ExpandedQuestion) => {
    expandedQuestion === questionId ? setExpandedQuestion(null) : setExpandedQuestion(questionId);
  };

  const questionAnswerPairMapCallback = ({ question, answer }: QuestionAnswerPair) => {
    const questionId = question.replace(/\s|\?|,/g, '');
    const isExpanded = expandedQuestion === questionId;
    return (
      <FaqItem
        questionId={questionId}
        question={question}
        answer={answer}
        key={question}
        isExpanded={isExpanded}
        toggle={toggleQuestion}
      />
    );
  };

  return (
    <div className="faq__container">
      <ScrollAnimation animateIn="fade-in-from-top" animateOnce={true}>
        <p className="faq__paragraph">Common questions</p>
        <h2 className="faq__heading">FAQ</h2>
      </ScrollAnimation>
      <ScrollAnimation animateIn="fade-in-from-right" animateOnce={true}>
        <dl className="faq__list">{questionAnswerPair.map(questionAnswerPairMapCallback)}</dl>
      </ScrollAnimation>
    </div>
  );
};

export default Faq;
