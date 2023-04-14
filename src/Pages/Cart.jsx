import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Cart extends Component {
  state = {
    cartProducts: [],
  };

  componentDidMount() {
    this.recoverAddedProduct();
  }

  recoverAddedProduct = () => {
    const { addedProduct } = this.props;

    if (addedProduct.length === 0) {
      console.log('localStorage');
      const recoveredProducts = JSON.parse(localStorage.getItem('addedProduct'));
      this.setState({
        cartProducts: recoveredProducts,
      });
    } else {
      this.setState({
        cartProducts: addedProduct,
      });
    }
  };

  render() {
    const { cartProducts } = this.state;

    if (!cartProducts) {
      return (
        <h2 data-testid="shopping-cart-empty-message">
          Seu carrinho está vazio
        </h2>
      );
    }
    return (
      <div>

        {cartProducts.map((eachProduct) => (
          <div key={ eachProduct.id }>
            <img
              src={ eachProduct.thumbnail }
              alt={ eachProduct.title }
            />
            <h1 data-testid="shopping-cart-product-name">{eachProduct.title}</h1>
            <h3>{eachProduct.price}</h3>
            <h3 data-testid="shopping-cart-product-quantity">1</h3>
          </div>
        ))}

      </div>
    );
  }
}

export default Cart;

Cart.propTypes = {
  addedProduct: PropTypes.oneOfType([
    PropTypes.string,
  ]).isRequired,
};
