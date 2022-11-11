import React, { Component } from 'react';
import PropTypes from 'prop-types';

class ShoppingCart extends Component {
  state = {
    shoppingCart: [],
  };

  componentDidMount() {
    this.getCartItems();
  }

  getCartItems = () => {
    const cartItems = JSON.parse(localStorage.getItem('Cart-Item'));
    const isEmpty = cartItems?.length === 0 || cartItems === null;
    if (!isEmpty) {
      this.setState((previousState) => ({
        shoppingCart: [...previousState.shoppingCart, ...cartItems] }));
    }
  };

  render() {
    const { history } = this.props;
    const { shoppingCart } = this.state;
    const number = 1;
    return (
      <div>
        { shoppingCart.length === 0
          ? (
            <p
              data-testid="shopping-cart-empty-message"
            >
              Seu carrinho está vazio
            </p>)
          : shoppingCart.map((cartItem) => (
            <div
              key={ cartItem.id }
            >
              <p data-testid="shopping-cart-product-name">{ cartItem.title }</p>
              <img src={ cartItem.thumbnail } alt={ cartItem.title } />
              <p>{`R$ ${cartItem.price}` }</p>
              <p
                data-testid="shopping-cart-product-quantity"
              >
                { `Quantidade ${number}` }
              </p>
            </div>
          )) }
        <button
          type="button"
          onClick={ () => history.push('/checkout') }
          data-testid="checkout-products"
        >
          Finalizar Compra
        </button>
      </div>
    );
  }
}

ShoppingCart.propTypes = {
  history: PropTypes.shape({}),
}.isRequired;

export default ShoppingCart;
