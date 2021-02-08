import React from 'react';
import './minor-detail.styl';

type Props = {
  name: string,
  data: string,
}

const MinorDetail = ({ name, data }: Props) => {
  const capitalizeFirstLetter = (string: string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  return (
    <tr className="minor-detail">
      <th className="minor-detail__heading">{`${name}:`}</th>
      <td className="minor-detail__data">{capitalizeFirstLetter(data)}</td>
    </tr>
  );
};

export default MinorDetail;