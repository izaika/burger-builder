import React, { Component, Fragment } from 'react';
import { Route } from 'react-router-dom';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';

class Checkout extends Component {
  state = {
    ingredients: {
      salad: 1,
      meat: 1,
      cheese: 1,
      bacon: 1
    },
    totalPrice: 0
  };

  componentWillMount() {
    const query = new URLSearchParams(this.props.location.search);
    const ingredients = {};
    let totalPrice = 0;
    for (const param of query.entries()) {
      // ['salad', 1]
      if (param[0] === 'price') {
        totalPrice = param[1];
      } else {
        ingredients[param[0]] = parseInt(param[1], 10);
      }
    }
    this.setState({ ingredients, totalPrice });
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
      <Route
        path={`${this.props.match.path}/contact-data`}
        render={() => (
          <ContactData
            ingredients={this.state.ingredients}
            price={this.state.totalPrice}
            history={this.props.history}
          />
        )}
      />
    </Fragment>
  );
}

export default Checkout;
