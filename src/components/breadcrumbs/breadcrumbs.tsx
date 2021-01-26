import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import './breadcrumbs.styl';
import Icon from '../icon/icon';

const Breadcrumbs: React.FC = () => {
  const path = useLocation();
  const breadcrumbsItems = path.pathname.split('/');
  if (breadcrumbsItems[1] === '') {breadcrumbsItems.splice(1,1)}

  const capitalizeAndRemoveDash = (string: string) => {
    return (string.charAt(0).toUpperCase() + string.slice(1)).replace('-', ' ');
  };

  const breadcrumbsMapCallback = (pathName: string, index: number, arrayWithPaths: string[]) => {
    const isLastItem = index + 1 === arrayWithPaths.length;
    const generateLink = (i: typeof index, array: typeof arrayWithPaths) => {
      if (i === 0) {return '/'}
      let totalPath = '';
      for (let j = 1; j <= i; j++) { totalPath = `${totalPath}/${array[j]}` }
      return totalPath;
    };

    (pathName === '') ? pathName = 'Home' : pathName = capitalizeAndRemoveDash(pathName);

    return (
      <li className="breadcrumbs__item" key={pathName}>
        {(isLastItem) ? <>{pathName}</> : <Link className="breadcrumbs__link" to={generateLink(index, arrayWithPaths)}>{pathName}</Link>}
        {!isLastItem && <Icon className="breadcrumbs__icon" iconId="right" />}
      </li>
    );
  };

  return (
    <section className="breadcrumbs">
      <h1 className="breadcrumbs__page-title">{capitalizeAndRemoveDash(breadcrumbsItems[(breadcrumbsItems.length - 1)])}</h1>
      <nav>
        <ol className="breadcrumbs__list">
          {breadcrumbsItems.map(breadcrumbsMapCallback)}
        </ol>
      </nav>
    </section>
  );
};

export default Breadcrumbs;