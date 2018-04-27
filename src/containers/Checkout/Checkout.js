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

  render = () => (
    <Fragment>
      <CheckoutSummary ingredients={this.state.ingredients} />
    </Fragment>
  );
}

export default Checkout;
