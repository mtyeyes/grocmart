import React, { useState } from 'react';
import { shallowEqual, useSelector, useDispatch, useStore } from 'react-redux';
import './special-offers.styl';

import Loader from '../../loader/loader';
import EmblaCarousel from '../../embla-carousel/embla-carousel';
import SpecialOfferItem from './special-offer-item/special-offer-item';
import usePriceAfterDiscounts from '../../../hooks/use-price-after-discounts';

import { AppState, AppDispatch } from '../../../store';
import { PATH } from '../../../app';

const SpecialOffers: React.FC = () => {
  const [specialOffers, setSpecialOffers] = useState([] as string[]);
  const dispatch = useDispatch<AppDispatch>();
  const currentState = useStore().getState();
  const productsState = useSelector(((state: AppState) => state.products), shallowEqual);
  const countPriceAfterDiscounts = usePriceAfterDiscounts();

  const requests = {
    specialOffers: `${PATH}mocks/products-of-the-day.json`,
    products: `${PATH}mocks/products.json`,
    discounts: `${PATH}mocks/discounts.json`
  };

  const transferData = (requestResults: {[key in keyof typeof requests]: any}) => {
    Object.entries(requestResults).forEach(([key, data]) => {
      if (key === 'specialOffers') {
        setSpecialOffers(requestResults.specialOffers);
      } else {
        if ( Object.keys(currentState[key]).length !== 0 ) { return }
        switch(key) {
        case('products'):
          dispatch({type: 'LOAD_PRODUCTS_STATE', payload: data});
          break;
        case('discounts'):
          dispatch({type: 'LOAD_DISCOUNTS_STATE', payload: data});
          break;
        }
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
        <EmblaCarousel uniqueClassName="specials-slider" dotsBtnEnabled={true} nextPrevBtnsEnabled={false} autoplaySpeed={3000} options={{draggable: true, loop: true}}>
          {specialOffers.map(specialOffersMapCallback)}
        </EmblaCarousel>
      </Loader>
    </div>
  );
};

export default SpecialOffers;