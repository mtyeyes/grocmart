import * as React from 'react';
import { shallow } from 'enzyme';
import ProductCard from './product-card';

const setUp = (props) => shallow(<ProductCard {...props} />);

describe('ProductCard component', () => {
  const chilliPropsMock = {
    productId: 'chilli',
    productName: 'chilli peppers',
    priceBeforeDiscounts: '15',
    priceAfterDiscounts: '15',
    productRating: 3,
    addToCart: () => {},
  };

  it('should render product card', () => {
    const component = setUp(chilliPropsMock);

    expect(component).toMatchSnapshot();
  });

  it('should render product card with "popular" flag', () => {
    const popularChilliProps = {
      ...chilliPropsMock,
      productRating: 5,
    };
    const component = setUp(popularChilliProps);

    const flag = component.find('.product-card__flag');
    const flagText = flag.text();

    expect(flagText).toMatch('popular');
  });

  it('should render product card with "on sale" flag', () => {
    const onSaleChillyProps = {
      ...chilliPropsMock,
      priceBeforeDiscounts: '15',
      priceAfterDiscounts: '12',
    };
    const component = setUp(onSaleChillyProps);

    const flag = component.find('.product-card__flag');
    const flagText = flag.text();

    expect(flagText).toMatch('sale');
  });
});
