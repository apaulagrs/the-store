import { Component } from 'react';
import PropTypes from 'prop-types';
import ProductCard from './ProductCard';

export default class Products extends Component {
  state = {
    itemCart: [],
  };

  addItemCartButton = ({ target }) => {
    const { id } = target;
    const { searchResult } = this.props;
    const { itemCart } = this.state;
    const item = searchResult.find((product) => product.id === id);
    itemCart.push(item);
    // localStorage.setItem('Cart-Item', JSON.stringify(itemCart));
    const local = JSON.parse(localStorage.getItem('Cart-Item'));
    if (!local) {
      localStorage.setItem('Cart-Item', JSON.stringify(itemCart));
    } else {
      local.push(item);
      localStorage.setItem('Cart-Item', JSON.stringify(local));
    }
  };

  render() {
    const { searchResult, search, onProductClick } = this.props;
    const controller = searchResult.length === 0;
    const searchController = searchResult.length === 0 && search;
    return (
      <div data-testid="home-initial-message">
        { controller && 'Digite algum termo de pesquisa ou escolha uma categoria.' }
        { (searchController)
          ? <p>Nenhum produto foi encontrado</p>
          : (
            <div className="products">
              {searchResult.map((element) => (
                <ProductCard
                  searchResult={ searchResult }
                  key={ element.id }
                  title={ element.title }
                  thumbnail={ element.thumbnail }
                  price={ element.price }
                  id={ element.id }
                  freeShipping={ element.shipping.free_shipping }
                  addItemCartButton={ this.addItemCartButton }
                  onProductClick={ () => onProductClick(element.id) }
                />
              ))}
            </div>
          )}
      </div>
    );
  }
}

Products.defaultProps = {
  searchResult: [],
  search: false,
  onProductClick: null,
};

Products.propTypes = {
  searchResult: PropTypes.arrayOf(
    PropTypes.shape({}),
  ),
  search: PropTypes.bool,
  onProductClick: PropTypes.func,
};
