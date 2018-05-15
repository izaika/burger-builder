import React, { Component, Fragment } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';

class Checkout extends Component {
  checkoutCancelled = () => this.props.history.goBack();
  checkoutContinued = () => this.props.history.replace('/checkout/contact-data');

  render = () => {
    console.log(this.props.ingredients);
    return this.props.ingredients ? (
      <Fragment>
        <CheckoutSummary
          ingredients={this.props.ingredients}
          onCheckoutCancelled={this.checkoutCancelled}
          onCheckoutContinued={this.checkoutContinued}
        />
        <Route path={`${this.props.match.path}/contact-data`} component={ContactData} />
      </Fragment>
    ) : (
      <Redirect to="/" />
    );
  };
}

export default connect(state => ({ ingredients: state.ingredients }))(Checkout);
