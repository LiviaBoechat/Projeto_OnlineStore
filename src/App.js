import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { ProductList } from './Pages/ProductList';
import ProductCard from './Pages/ProductCard';
import Cart from './Pages/Cart';
import './App.css';

class App extends React.Component {
  state = {
    addedProduct: [],
  };

  addToCart = async (eachProduct) => {
    const { addedProduct } = this.state;
    this.setState((prevState) => ({
      addedProduct: [...prevState.addedProduct, eachProduct],
    }), () => localStorage
      .setItem('addedProduct', JSON.stringify(addedProduct)));
  };

  render() {
    const { addedProduct } = this.state;
    return (
      <div>
        <Switch>
          <Route
            path="/cart"
            render={ (props) => <Cart { ...props } addedProduct={ addedProduct } /> }
          />
          <Route
            path="/productcard/:id"
            render={ (props) => (<ProductCard
              { ...props }
              addedProduct={ addedProduct }
              addToCart={ this.addToCart }
            />) }
          />
          <Route
            exact
            path="/"
            render={ (props) => (<ProductList
              { ...props }
              addedProduct={ addedProduct }
              addToCart={ this.addToCart }
            />) }
          />
        </Switch>
      </div>
    );
  }
}

export default App;
