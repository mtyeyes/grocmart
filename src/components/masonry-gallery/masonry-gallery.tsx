import React, { useState, useEffect } from 'react';
import { shallowEqual, useSelector, useDispatch, useStore } from 'react-redux';
import FlipMove from 'react-flip-move';
import './masonry-gallery.styl';

import { AppState } from '../../store';
import { addToCart } from '../../store/cart/actions';
import { DispatchCartAction } from '../../store/cart/types';
import usePriceAfterDiscounts from '../../hooks/use-price-after-discounts';

import Loader from '../loader/loader';
import FilterWithUnderline, {FilterState} from '../filter-with-underline/filter-with-underline';
import GalleryItem from './gallery-item/gallery-item';

type GalleryStateItem = {
  imageName: string,
  imageDescription: string,
  productId: string,
}

const MasonryGallery: React.FC = () => {
  const dispatch: any = useDispatch();
  const addProductToCart: DispatchCartAction = productId => dispatch(addToCart(productId));

  const productsState = useSelector(((state: AppState) => state.products), shallowEqual);
  const [galleryState, setGalleryState] = useState([] as GalleryStateItem[]);
  const [itemsToDisplay, setItemsToDisplay] = useState([] as GalleryStateItem[]);
  const [filterState, setFilterState] = useState({selectedFilter: 'all', availableFilters: ['all']} as FilterState);
  const countPriceAfterDiscounts = usePriceAfterDiscounts();

  const request: { [key: string]: string } = {
    gallery: '/mocks/gallery-images.json',
    products: '/mocks/products.json',
    discounts: '/mocks/discounts.json'
  };

  const currentState = useStore().getState();
  const transferData = (requestResults: { [key: string]: any }) => {
    Object.entries(requestResults).forEach(([key, data]) => {
      if (key === 'gallery') {
        if (galleryState.length === 0) {setGalleryState(data)}
        return;
      }
      if ( Object.keys(currentState[key]).length !== 0 ) { return }
      dispatch({type: `LOAD_${key.toUpperCase()}_STATE`, payload: data});
    });
  };

  useEffect(()=>{
    const filterGroups: Set<string> = new Set();
    if(galleryState.length !== 0) {
      galleryState.forEach(item => filterGroups.add(productsState[item.productId].group));
      setFilterState(prevState => {return {...prevState, availableFilters: ['all', ...filterGroups]}});
    }
  }, [galleryState, productsState]);

  useEffect(() => {
    if (filterState.selectedFilter === 'all') {
      setItemsToDisplay(galleryState);
    } else {
      const filteredItems = galleryState.filter(item => productsState[item.productId].group === filterState.selectedFilter);
      setItemsToDisplay(filteredItems);
    }
  }, [filterState, galleryState, productsState]);

  const galleryMapCallback = ({ imageName, imageDescription, productId }: GalleryStateItem) => {
    const productFinalPrice = countPriceAfterDiscounts(productId, 'return stringAsCurrency');
    return(
      <li className="gallery-item__wrapper" key={imageName}>
        <GalleryItem
          imgUrl={`/images/gallery-${imageName}.webp`}
          imgDescription={imageDescription}
          productId={productId}
          productPrice={productFinalPrice}
          addToCart={addProductToCart}
        />
      </li>
    );
  };

  return (
    <section className="gallery">
      <Loader requests={request} transferData={transferData}>
        {filterState.availableFilters.length >= 2 &&
          <FilterWithUnderline selectedFilter={filterState.selectedFilter} setSelectedFilter={setFilterState} availableFilters={filterState.availableFilters} />
        }
        <FlipMove typeName="ul" className="gallery__list">
          {itemsToDisplay.map(galleryMapCallback as typeof galleryMapCallback)}
        </FlipMove>
      </Loader>
    </section>
  );
};

export default MasonryGallery;