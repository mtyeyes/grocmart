import React from 'react';
import './advantages.styl';

import Icon, { IconId } from '../icon/icon';
import ScrollAnimation from 'react-animate-on-scroll';

interface AdvantagesItem {
  icon: IconId;
  title: string;
  text: string;
}

const Advantages = () => {
  const advantagesItems: AdvantagesItem[] = [
    {
      icon: 'thumbs-up',
      title: 'Quality products',
      text: 'We work with the best suppliers to offer our customers the fresh grocery products of the highest quality.',
    },
    {
      icon: 'wallet',
      title: 'Affordable prices',
      text: 'Thanks to our affordable pricing policy, our customers don’t have to overpay for the products they need.',
    },
    {
      icon: 'truck',
      title: 'Fast shipping',
      text: 'Our store offers fast worldwide shipping to all customers regardless of what and how much you order.',
    },
    {
      icon: 'clock',
      title: 'Open 24/7',
      text: 'Unlike other grocery shops, we are ready to serve you 24/7 and offer the best selection of groceries.',
    },
  ];

  const advantagesMapCallback = ({ icon, title, text }: AdvantagesItem) => {
    return (
      <li key={icon} className={`advantages__item advantages__item--${icon} advantages-item`}>
        <ScrollAnimation animateIn="fade-in-from-left" animateOnce={true}>
          <Icon className="advantages-item__icon" iconId={icon} />
          <h4 className="advantages-item__title">{title}</h4>
          <p className="advantages-item__text">{text}</p>
        </ScrollAnimation>
      </li>
    );
  };

  return (
    <section className="advantages">
      <ul className="advantages__list">{advantagesItems.map(advantagesMapCallback)}</ul>
    </section>
  );
};

export default Advantages;
