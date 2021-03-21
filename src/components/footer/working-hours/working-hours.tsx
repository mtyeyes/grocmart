import React from 'react';
import './working-hours.styl';

const WorkingHours = () => {
  return (
    <dl className="working-hours">
      <div className="working-hours__wrapper">
        <dt className="working-hours__title">Weekdays:</dt>
        <dd className="working-hours__time">08:00am - 08:00pm</dd>
      </div>
      <div className="working-hours__wrapper">
        <dt className="working-hours__title">Weekends:</dt>
        <dd className="working-hours__time">10:00am - 06:00pm</dd>
      </div>
    </dl>
  );
};

export default WorkingHours;
