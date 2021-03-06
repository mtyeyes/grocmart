import React, { useEffect, useState } from 'react';
import { shallowEqual, useSelector, useDispatch } from 'react-redux';
import './user-cart.styl';

import Table, { TableData, TableCellData } from '../table/table';
import Loader from '../loader/loader';
import Counter from '../counter/counter';
import CartControls from './cart-controls/cart-controls';

import { addToCart, removeFromCart } from '../../store/cart/actions';
import { ProductId } from '../../store/cart/types';
import { AppState, AppDispatch } from '../../store/index';
import useWindowWidth from '../../hooks/use-window-width';
import usePriceAfterDiscounts from '../../hooks/use-price-after-discounts';
import { PATH } from '../../app';

const UserCart = () => {
  const dispatch = useDispatch<AppDispatch>();
  const addProductToCart = (productId: ProductId) => dispatch(addToCart(productId));
  const removeProductFromCart = (productId: ProductId) => dispatch(removeFromCart(productId, false));

  const selectProductsState = (state: AppState) => {
    return state.products;
  };
  const selectCartState = (state: AppState) => {
    return state.cart;
  };
  const productsState = useSelector(selectProductsState, shallowEqual);
  const cartState = useSelector(selectCartState, shallowEqual);
  const countPriceAfterDiscounts = usePriceAfterDiscounts();
  const windowWidth = useWindowWidth();

  const [tableData, setTableData] = useState([] as TableData);

  const countTotalPrice = () => {
    let totalPrice = 0;
    Object.entries(cartState).forEach(
      ([productId, quantity]) => (totalPrice += countPriceAfterDiscounts(productId, 'return number') * quantity),
    );
    return totalPrice.toLocaleString('en-US', {
      style: 'currency',
      currency: 'USD',
    });
  };

  useEffect(() => {
    const generateTableData = () => {
      const productsInCartPrices = Object.keys(cartState).reduce((acc, productId) => {
        acc[productId] = countPriceAfterDiscounts(productId, 'return number');
        return acc;
      }, {} as { [key: string]: number });

      const generateComponent = (
        productId: ProductId,
        type: 'title-and-thumbnail' | 'counter' | 'price-per-item' | 'price-total',
      ) => {
        switch (type) {
          case 'title-and-thumbnail': {
            return (
              <div className="cart-table-item__thumbnail-and-title-wrapper">
                <img
                  className="cart-table-item__thumbnail"
                  src={`${PATH}images/${productId}-small.png`}
                  alt={`${productsState[productId].name}`}
                  loading="lazy"
                />
                <div className="cart-table-item__title-wrapper">
                  <h6 className="cart-table-item__title">{productsState[productId].name}</h6>
                </div>
              </div>
            );
          }
          case 'counter': {
            return (
              <Counter
                classNamePrefix="cart-table-item"
                count={cartState[productId]}
                increment={() => {
                  addProductToCart(productId);
                }}
                decrement={() => {
                  removeProductFromCart(productId);
                }}
              />
            );
          }
          case 'price-per-item': {
            return (
              <p className="cart-table-item__price">
                {productsInCartPrices[productId].toLocaleString('en-US', {
                  style: 'currency',
                  currency: 'USD',
                })}
              </p>
            );
          }
          case 'price-total': {
            return (
              <p className="cart-table-item__price">
                {(productsInCartPrices[productId] * cartState[productId]).toLocaleString('en-US', {
                  style: 'currency',
                  currency: 'USD',
                })}
              </p>
            );
          }
        }
      };

      const tableHeadings = ['Product name', 'Price', 'Quantity', 'Total'];

      const newTableData: TableData = [];
      if (windowWidth >= 780) {
        newTableData[0] = tableHeadings.map((string) => {
          return { isHeading: true, data: string };
        });
        Object.keys(cartState).forEach((productId, i) => {
          const rowData = (newTableData[++i] = [] as TableCellData[]);
          rowData[0] = {
            isHeading: false,
            data: generateComponent(productId, 'title-and-thumbnail'),
            key: productId,
          };
          rowData[1] = {
            isHeading: false,
            data: generateComponent(productId, 'price-per-item'),
            key: productsInCartPrices[productId].toString(),
          };
          rowData[2] = {
            isHeading: false,
            data: generateComponent(productId, 'counter'),
            key: cartState[productId].toString() + productId,
          };
          rowData[3] = {
            isHeading: false,
            data: generateComponent(productId, 'price-total'),
            key: (productsInCartPrices[productId] + cartState[productId]).toString(),
          };
        });
      } else {
        tableHeadings.forEach((string, i) => {
          newTableData[i] = [] as TableCellData[];
          newTableData[i][0] = { isHeading: true, data: string };
        });
        Object.keys(cartState).forEach((productId, i) => {
          const targetCell = ++i;
          newTableData[0][targetCell] = {
            isHeading: false,
            data: generateComponent(productId, 'title-and-thumbnail'),
            key: productId,
          };
          newTableData[1][targetCell] = {
            isHeading: false,
            data: generateComponent(productId, 'price-per-item'),
            key: productsInCartPrices[productId].toString(),
          };
          newTableData[2][targetCell] = {
            isHeading: false,
            data: generateComponent(productId, 'counter'),
            key: cartState[productId].toString() + productId,
          };
          newTableData[3][targetCell] = {
            isHeading: false,
            data: generateComponent(productId, 'price-total'),
            key: (productsInCartPrices[productId] + cartState[productId]).toString(),
          };
        });
      }
      return newTableData;
    };

    setTableData(generateTableData());
  }, [cartState, productsState, windowWidth]);

  return (
    <section className="cart__container">
      <Loader requests={{ stateRequests: ['products', 'discounts'] }}>
        {Object.keys(cartState).length > 0 ? (
          <>
            <div className="cart-table__wrapper">
              <Table tableData={tableData} classNamePrefix="cart-table" />
            </div>
            <CartControls totalPrice={countTotalPrice()} />
          </>
        ) : (
          <p className="cart__empty-cart-disclaimer">Your cart is empty</p>
        )}
      </Loader>
    </section>
  );
};

export default UserCart;
