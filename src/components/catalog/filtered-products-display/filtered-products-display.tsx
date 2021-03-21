import React, { ReactChild, useEffect, useState } from 'react';
import FlipMove from 'react-flip-move';
import './filtered-products-display.styl';

import ProductCard, {
  Props as ProductCardProps,
} from '../../product-card/product-card';
import Pagination from '../../pagination/pagination';

type Props = {
  filteredProductsData: ProductCardProps[];
  children: ReactChild;
};

type DisplayedRange = [Page, Page];

type Page = number;

const FilteredProductsDisplay = ({ filteredProductsData, children }: Props) => {
  const [selectedPage, setSelectedPage] = useState(1 as Page);
  const [itemsPerPage, setItemsPerPage] = useState(9 as number);
  const [displayedRange, setDisplayedRange] = useState([
    0,
    itemsPerPage,
  ] as DisplayedRange);
  const [displayedProducts, setDisplayedProducts] = useState(
    [] as ProductCardProps[],
  );

  useEffect(() => {
    setSelectedPage(1);
  }, [filteredProductsData, itemsPerPage]);

  useEffect(() => {
    const adjustItemsPerPage = () => {
      const windowWidth = window.innerWidth;
      switch (true) {
        case windowWidth >= 1200: {
          setItemsPerPage(9);
          break;
        }
        case windowWidth >= 590: {
          setItemsPerPage(6);
          break;
        }
        case windowWidth >= 300: {
          setItemsPerPage(4);
          break;
        }
        default: {
          setItemsPerPage(9);
          break;
        }
      }
    };

    adjustItemsPerPage();

    window.addEventListener('resize', adjustItemsPerPage);
    return () => {
      window.removeEventListener('resize', adjustItemsPerPage);
    };
  }, []);

  useEffect(() => {
    let fromIndex;
    let toIndex;
    if (filteredProductsData.length === 0) {
      fromIndex = toIndex = 0;
    } else if (filteredProductsData.length < itemsPerPage) {
      fromIndex = 0;
      toIndex = filteredProductsData.length;
    } else {
      fromIndex = itemsPerPage * (selectedPage - 1);
      toIndex =
        itemsPerPage * selectedPage > filteredProductsData.length - 1
          ? filteredProductsData.length - 1
          : itemsPerPage * selectedPage - 1;
    }
    setDisplayedRange([fromIndex, toIndex]);
  }, [filteredProductsData, itemsPerPage, selectedPage]);

  useEffect(() => {
    setDisplayedProducts(
      [...filteredProductsData].splice(
        displayedRange[0],
        displayedRange[1] - displayedRange[0] + 1,
      ),
    );
  }, [filteredProductsData, displayedRange]);

  const displayedProductsMapCallback = ({
    productId,
    priceBeforeDiscounts,
    priceAfterDiscounts,
    productName,
    productRating,
    addToCart,
  }: ProductCardProps) => {
    return (
      <ProductCard
        className="products-display__item"
        productId={productId}
        productName={productName}
        priceBeforeDiscounts={priceBeforeDiscounts}
        priceAfterDiscounts={priceAfterDiscounts}
        productRating={productRating}
        addToCart={addToCart}
        key={productId}
      />
    );
  };

  return (
    <div className="products-display">
      <div className="products-display__sorting-and-info-wrapper">
        {children}
        <p className="products-display__range-info">{`Showing ${
          displayedRange[0] === displayedRange[1]
            ? `${displayedRange[0] + 1}th`
            : `${displayedRange[0] + 1}th–${displayedRange[1] + 1}th`
        } of ${filteredProductsData.length} results`}</p>
      </div>
      <FlipMove
        typeName="ul"
        className="products-display__list"
        leaveAnimation="none"
      >
        {displayedProducts.map(displayedProductsMapCallback)}
      </FlipMove>
      <Pagination
        selectedPage={selectedPage}
        setSelectedPage={setSelectedPage}
        itemsPerPage={itemsPerPage}
        numberOfItems={filteredProductsData.length}
      />
    </div>
  );
};

export default FilteredProductsDisplay;
