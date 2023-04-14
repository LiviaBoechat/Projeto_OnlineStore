import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

class ProductCard extends Component {
  state = {
    isloading: true,
    list: [],
  };

  async componentDidMount() {
    this.getProductId();
  }

  // This code is used to fetch product information from the MercadoLibre API using the product ID passed in as a parameter. It then sets the state of the component with the product title, thumbnail, and price. Finally, it sets the isloading state to false.
  getProductId = async () => {
    const { match: { params: { id } } } = this.props;

    const getProductId = await fetch(` https://api.mercadolibre.com/items/${id}`);
    const list = await getProductId.json();

    this.setState({
      list: [list],
      isloading: false,
    });
  };

  render() {
    const { list, isloading } = this.state;
    const { match: { params: { id } }, addToCart } = this.props;

    if (isloading === true) { return <h1>Carregando...</h1>; }

    return (
      <div>
        {list.map((eachProduct) => (
          <div key={ id } data-testid="product">
            <img
              data-testid="product-detail-image"
              src={ eachProduct.thumbnail }
              alt={ eachProduct.title }
            />
            <h3 data-testid="product-detail-name">{ eachProduct.title }</h3>
            <h4 data-testid="product-detail-price">{ eachProduct.price }</h4>
            <label htmlFor="addCart">
              <button
                id="addCart"
                data-testid="product-detail-add-to-cart"
                onClick={ () => addToCart(eachProduct) }
              >
                Adicionar ao carrinho
              </button>
            </label>
          </div>
        ))}

        <Link to="/cart" data-testid="shopping-cart-button">
          Carrinho
        </Link>
      </div>
    );
  }
}

export default ProductCard;

ProductCard.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }),
}.isRequired;
