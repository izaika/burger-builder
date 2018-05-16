import React, { Component, Fragment } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';

class Checkout extends Component {
  checkoutCancelled = () => this.props.history.goBack();
  checkoutContinued = () => this.props.history.replace('/checkout/contact-data');

  render = () => {
    const redirect = <Redirect to="/" />;
    return this.props.ingredients ? (
      <Fragment>
        {this.props.purchased ? redirect : null}
        <CheckoutSummary
          ingredients={this.props.ingredients}
          onCheckoutCancelled={this.checkoutCancelled}
          onCheckoutContinued={this.checkoutContinued}
        />
        <Route path={`${this.props.match.path}/contact-data`} component={ContactData} />
      </Fragment>
    ) : (
      redirect
    );
  };
}

export default connect(state => ({ ingredients: state.burgerBuilder.ingredients, purchased: state.order.purchased }))(
  Checkout
);
