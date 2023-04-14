import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { getCategories, getProductsFromCategoryAndQuery } from '../services/api';

export class ProductList extends Component {
  state = {
    list: [],
    categories: [],
    searchText: '',
    isLoading: false,
  };

  async componentDidMount() {
    const keepCategories = await getCategories();
    // const getProducts = await fetch('https://api.mercadolibre.com/sites/MLB/search?q=celular');
    // const response = await getProducts.json();
    // const data = response.results;

    this.setState({ categories: keepCategories });
  }

  handleChange = ({ target }) => {
    const { name } = target;
    const value = target.type === 'checkbox' ? target.checked : target.value;

    this.setState({
      [name]: value,
    });
  };

  onClickHandle = async () => {
    console.log('texto');
    const { searchText } = this.state;
    const response = await getProductsFromCategoryAndQuery(null, searchText);
    const data = response.results;

    this.setState({ list: data });
  };

  categoryHandle = async ({ target }) => {
    console.log('botao');
    this.setState({
      isLoading: true,
    });
    const response = await getProductsFromCategoryAndQuery(target.value);
    const list = response.results;

    this.setState({
      list,
      isLoading: false,
    });
  };

  render() {
    const { list, categories, searchText, isLoading } = this.state;
    const { addToCart } = this.props;

    return (
      <div>
        {
          searchText.length === 0
        && (
          <h2 data-testid="home-initial-message">
            Digite algum termo de pesquisa ou escolha uma categoria.
          </h2>
        )
        }
        <input
          name="searchText"
          value={ searchText }
          data-testid="query-input"
          type="text"
          onChange={ this.handleChange }
        />
        <button
          name="searchButton"
          data-testid="query-button"
          type="button"
          onClick={ this.onClickHandle }
        >
          Pesquisar
        </button>
        <Link
          data-testid="shopping-cart-button"
          to="/cart"
        >
          Carrinho de compras
        </Link>
        <ul>
          { categories.map((eachCategory) => (
            <li type="none" key={ eachCategory.id }>
              <label htmlFor={ eachCategory.id }>
                {eachCategory.name}
                <input
                  data-testid="category"
                  name="categoryId"
                  value={ eachCategory.id }
                  id={ eachCategory.id }
                  type="radio"
                  onClick={ this.categoryHandle }
                />
              </label>
            </li>
          ))}
        </ul>
        {isLoading && <h1>Carregando...</h1>}
        {!isLoading && (
          <div>
            { list.length === 0 ? <h2>Nenhum produto foi encontrado</h2>
              : list.map((eachProduct) => (
                <div
                  data-testid="product"
                  key={ eachProduct.id }
                >
                  <Link
                    to={ `/productcard/${eachProduct.id}` }
                    data-testid="product-detail-link"
                  >
                    <img
                      src={ eachProduct.thumbnail }
                      alt={ eachProduct.title }
                    />
                    <h3>{ eachProduct.title }</h3>
                    <h4>{ eachProduct.price }</h4>
                  </Link>
                  <label htmlFor="addCart">
                    <button
                      id="addCart"
                      data-testid="product-add-to-cart"
                      onClick={ () => addToCart(eachProduct) }
                    >
                      Adicionar ao carrinho
                    </button>
                  </label>
                </div>
              ))}
          </div>)}
      </div>
    );
  }
}

export default ProductList;

ProductList.propTypes = {
  addToCart: PropTypes.func.isRequired,
};
