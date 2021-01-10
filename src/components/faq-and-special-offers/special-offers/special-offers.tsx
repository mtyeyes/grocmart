import React, { useState } from 'react';
import { shallowEqual, useSelector, useDispatch, useStore } from 'react-redux';
import './special-offers.styl';

import Loader from '../../loader/loader';
import EmblaCarousel from '../../embla-carousel/embla-carousel';
import SpecialOfferItem from './special-offer-item/special-offer-item';
import { AppState } from '../../../store';
import usePriceAfterDiscounts from '../../../hooks/use-price-after-discounts';

const SpecialOffers: React.FC = () => {
  const [specialOffers, setSpecialOffers] = useState([] as string[]);
  const dispatch: any = useDispatch();
  const currentState = useStore().getState();
  const productsState = useSelector(((state: AppState) => state.products), shallowEqual);
  const countPriceAfterDiscounts = usePriceAfterDiscounts();

  const requests = {
    specialOffers: '/mocks/products-of-the-day.json',
    products: '/mocks/products.json',
    discounts: '/mocks/discounts.json'
  };

  const transferData = (requestResults: {[key in keyof typeof requests]: any}) => {
    Object.entries(requestResults).forEach(([key, data]) => {
      if (key === 'specialOffers') {
        setSpecialOffers(requestResults.specialOffers);
      } else {
        if ( Object.keys(currentState[key]).length !== 0 ) { return }
        dispatch({type: `LOAD_${key.toUpperCase()}_STATE`, payload: data});
      }
    });
  };

  const specialOffersMapCallback = (productId: string) => {
    const { name, price } = productsState[productId];
    const priceBeforeDiscounts = price.toLocaleString('en-US', {style:'currency', currency:'USD'});
    const priceAfterDiscounts = countPriceAfterDiscounts(productId, 'return stringAsCurrency');
    return <SpecialOfferItem productName={name} productId={productId} priceBeforeDiscounts={priceBeforeDiscounts} priceAfterDiscounts={priceAfterDiscounts} key={productId} />;
  };

  return (
    <div className="specials-slider__wrapper">
      <Loader requests={requests} transferData={transferData}>
        <EmblaCarousel uniqueClassName="specials-slider" dotsBtnEnabled={true} nextPrevBtnsEnabled={false} options={{draggable: true, loop: true}}>
          {specialOffers.map(specialOffersMapCallback as typeof specialOffersMapCallback)}
        </EmblaCarousel>
      </Loader>
    </div>
  );
};

export default SpecialOffers;