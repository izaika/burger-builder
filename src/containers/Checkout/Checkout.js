import React, { Component, Fragment } from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';

class Checkout extends Component {
  checkoutCancelled = () => this.props.history.goBack();
  checkoutContinued = () => this.props.history.replace('/checkout/contact-data');

  render = () => (
    <Fragment>
      <CheckoutSummary
        ingredients={this.props.ingredients}
        onCheckoutCancelled={this.checkoutCancelled}
        onCheckoutContinued={this.checkoutContinued}
      />
      <Route path={`${this.props.match.path}/contact-data`} component={ContactData} />
    </Fragment>
  );
}

export default connect(state => ({ ingredients: state.ingredients }))(Checkout);
