import React, { useState, useEffect } from 'react';
import { shallowEqual, useSelector, useDispatch } from 'react-redux';
import FlipMove from 'react-flip-move';
import './masonry-gallery.styl';

import Loader from '../loader/loader';
import FilterWithUnderline, {FilterState} from '../filter-with-underline/filter-with-underline';
import GalleryItem from './gallery-item/gallery-item';
import usePriceAfterDiscounts from '../../hooks/use-price-after-discounts';

import { AppState, AppDispatch } from '../../store';
import { addToCart } from '../../store/cart/actions';
import { PATH } from '../../app';

type GalleryStateItem = {
  imageName: string,
  imageDescription: string,
  productId: string,
}

const MasonryGallery = () => {
  const dispatch = useDispatch<AppDispatch>();
  const addProductToCart = (productId: string) => dispatch(addToCart(productId));

  const productsState = useSelector(((state: AppState) => state.products), shallowEqual);
  const [galleryState, setGalleryState] = useState([] as GalleryStateItem[]);
  const [itemsToDisplay, setItemsToDisplay] = useState([] as GalleryStateItem[]);
  const [filterState, setFilterState] = useState({selectedFilter: 'all', availableFilters: ['all']} as FilterState);
  const countPriceAfterDiscounts = usePriceAfterDiscounts();

  const getLoadedData = (requestResults: { 'gallery-images': GalleryStateItem[] }) => { setGalleryState(requestResults['gallery-images']) };

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
          imgUrl={`${PATH}images/gallery-${imageName}.webp`}
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
      <Loader requests={ {resourceRequests: ['gallery-images'], stateRequests: ['products', 'discounts']} } transferRequestedResources={getLoadedData}>
        {filterState.availableFilters.length >= 2 &&
          <FilterWithUnderline selectedFilter={filterState.selectedFilter} setSelectedFilter={setFilterState} availableFilters={filterState.availableFilters} />
        }
        <FlipMove typeName="ul" className="gallery__list">
          {itemsToDisplay.map(galleryMapCallback)}
        </FlipMove>
      </Loader>
    </section>
  );
};

export default MasonryGallery;