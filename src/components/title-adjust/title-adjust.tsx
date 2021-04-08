import { useLocation } from 'react-router-dom';
import { ROUTES } from '../../constants';

const TitleAdjust = () => {
  const { pathname } = useLocation();
  const { shop, cart, gallery } = ROUTES;

  const defaultTitle = '🛒 Grocmart';

  switch (pathname) {
    case cart: {
      document.title = `Cart ${defaultTitle}`;
      break;
    }
    case shop: {
      document.title = `Shop ${defaultTitle}`;
      break;
    }
    case gallery: {
      document.title = `Gallery ${defaultTitle}`;
      break;
    }
    default:
      document.title = defaultTitle;
  }

  return null;
};

export default TitleAdjust;
