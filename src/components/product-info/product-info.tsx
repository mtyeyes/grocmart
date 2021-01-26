import React from 'react';
import './product-info.styl';

import usePriceAfterDiscounts from '../../hooks/use-price-after-discounts';
import useFindAverage from '../../hooks/use-find-average';
import { shallowEqual, useSelector, useDispatch, useStore } from 'react-redux';
import { AppState, AppDispatch } from '../../store/index';
import { ProductInfo } from '../../store/products/types';
import { addToCart, removeFromCart } from '../../store/cart/actions';
import { setCurrentUserScoreAction, removeCurrentUserScoreAction } from '../../store/products/actions';

import Loader from '../loader/loader';
import RatingSelect from '../rating-select/rating-select';
import MinorDetail from './minor-detail/minor-detail';
import Button from '../button/button';
import SocialLinks from '../social-links/social-links';

type Props = {
  productId: string,
}

const ProductInfo: React.FC<Props> = ({ productId }) => {
  const dispatch = useDispatch<AppDispatch>();
  const findAverage = useFindAverage();
  const currentState = useStore().getState();
  const countPriceAfterDiscounts = usePriceAfterDiscounts();
  const selectProductsState = (state: AppState) => {return state.products};
  const selectCartState = (state: AppState) => {return state.cart};
  const productsState = useSelector(selectProductsState);
  const cartState = useSelector(selectCartState, shallowEqual);


  const request: { [key: string]: string } = {
    products: '/mocks/products.json',
    discounts: '/mocks/discounts.json'
  };

  const transferData = (requestResults: { [key: string]: any }) => {
    Object.entries(requestResults).forEach(([key, data]) => {
      if ( Object.keys(currentState[key]).length !== 0 ) { return }
      switch(key) {
      case('products'):
        dispatch({type: 'LOAD_PRODUCTS_STATE', payload: data});
        break;
      case('discounts'):
        dispatch({type: 'LOAD_DISCOUNTS_STATE', payload: data});
        break;
      }
    });
  };

  const selectRating = ((rating: null | number) => {
    if(rating) {
      dispatch(setCurrentUserScoreAction({productId, rating}));
    } else {
      const currentUserScore = productsState[productId].currentUserScore;
      if (typeof currentUserScore === 'number') {
        dispatch(removeCurrentUserScoreAction({productId, rating: currentUserScore}));
      }
    }
  });

  const handleBtnClick = () => {
    if(cartState[productId]) {
      dispatch(removeFromCart(productId, true));
    } else {
      dispatch(addToCart(productId));
    }
  };

  const productInfoRender = () => {
    if(productsState[productId]) {
      return (
        <>
          <img src={`/images/${productId}.png`} className="product-info__image" alt={productsState[productId].name}></img>
          <div className="product-info__details">
            <h1 className="product-info__name">{productsState[productId].name}</h1>
            <div className="product-info__price-and-rating-wrapper">
              <p className="product-info__price">{countPriceAfterDiscounts(productId, 'return stringAsCurrency')}</p>
              <RatingSelect
                selectedRating={(productsState[productId].currentUserScore) ? productsState[productId].currentUserScore : null}
                setSelectedRating={selectRating}
                defaultRating={findAverage(productsState[productId].userScore)}
              />
            </div>
            <p className="product-info__description">{productsState[productId].description}</p>
            <table className="product-info__minor-details">
              <tbody>
                <MinorDetail name={'Category'} data={productsState[productId].group} />
                <MinorDetail name={'Weight'} data={(productsState[productId].weight < 1) ? `${productsState[productId].weight * 1000} g` : `${productsState[productId].weight} kg`} />
              </tbody>
            </table>
            <div className="product-info__buy-and-social">
              <Button className='product-info__trade-btn' onClick={handleBtnClick}>
                {(cartState[productId]) ? 'Remove item' : 'Add to cart'}
              </Button>
              <SocialLinks>Share</SocialLinks>
            </div>
          </div>
        </>
      );
    } else {
      return(
        <p className="product-info__wrong-product-disclaimer">There is no such product in our catalog</p>
      );
    }
  };

  return (
    <section className="product-info">
      <Loader requests={request} transferData={transferData}>
        {productInfoRender()}
      </Loader>
    </section>
  );
};

export default ProductInfo;