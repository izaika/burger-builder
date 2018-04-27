import React, { Component, Fragment } from 'react';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';

class Checkout extends Component {
  state = {
    ingredients: {
      salad: 1,
      meat: 1,
      cheese: 1,
      bacon: 1
    }
  };

  componentDidMount() {
    const query = new URLSearchParams(this.props.location.search);
    const ingredients = {};
    for (const param of query.entries()) {
      // ['salad', 1]
      ingredients[param[0]] = parseInt(param[1], 10);
    }
    this.setState({ ingredients });
  }

  checkoutCancelled = () => this.props.history.goBack();
  checkoutContinued = () => this.props.history.replace('/checkout/contact-data');

  render = () => (
    <Fragment>
      <CheckoutSummary
        ingredients={this.state.ingredients}
        onCheckoutCancelled={this.checkoutCancelled}
        onCheckoutContinued={this.checkoutContinued}
      />
    </Fragment>
  );
}

export default Checkout;
