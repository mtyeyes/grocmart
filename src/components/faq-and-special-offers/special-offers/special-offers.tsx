import React, { useState } from 'react';
import { shallowEqual, useSelector } from 'react-redux';
import './special-offers.styl';

import Loader from '../../loader/loader';
import EmblaCarousel from '../../embla-carousel/embla-carousel';
import SpecialOfferItem from './special-offer-item/special-offer-item';
import usePriceAfterDiscounts from '../../../hooks/use-price-after-discounts';

import { AppState } from '../../../store';
import { ProductId } from '../../../store/cart/types';

const SpecialOffers = () => {
  const [specialOffers, setSpecialOffers] = useState([] as string[]);
  const productsState = useSelector((state: AppState) => state.products, shallowEqual);
  const countPriceAfterDiscounts = usePriceAfterDiscounts();

  const getLoadedData = (requestResults: { 'products-of-the-day': string[] }) => {
    setSpecialOffers(requestResults['products-of-the-day']);
  };

  const specialOffersMapCallback = (productId: ProductId) => {
    const { name, price } = productsState[productId];
    const priceBeforeDiscounts = price.toLocaleString('en-US', {
      style: 'currency',
      currency: 'USD',
    });
    const priceAfterDiscounts = countPriceAfterDiscounts(productId, 'return stringAsCurrency');
    return (
      <SpecialOfferItem
        productName={name}
        productId={productId}
        priceBeforeDiscounts={priceBeforeDiscounts}
        priceAfterDiscounts={priceAfterDiscounts}
        key={productId}
      />
    );
  };

  return (
    <div className="specials-slider__wrapper">
      <Loader
        requests={{
          resourceRequests: ['products-of-the-day'],
          stateRequests: ['products', 'discounts'],
        }}
        transferRequestedResources={getLoadedData}
      >
        <EmblaCarousel
          uniqueClassName="specials-slider"
          dotsBtnEnabled={true}
          nextPrevBtnsEnabled={false}
          autoplaySpeed={3000}
          options={{ draggable: true, loop: true }}
        >
          {specialOffers.map(specialOffersMapCallback)}
        </EmblaCarousel>
      </Loader>
    </div>
  );
};

export default SpecialOffers;
