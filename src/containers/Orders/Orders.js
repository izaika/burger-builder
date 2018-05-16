import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../store/actions';

import axios from '../../axios-orders';
import Order from '../../components/Order/Order';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

class Orders extends Component {
  componentDidMount() {
    this.props.onFetchOrders();
  }

  render = () =>
    this.props.loading ? (
      <Spinner />
    ) : (
      this.props.orders.map(order => <Order key={order.id} ingredients={order.ingredients} price={order.price} />)
    );
}

export default connect(state => ({ orders: state.order.orders, loading: state.order.loading }), {
  onFetchOrders: actions.fetchOrders
})(withErrorHandler(Orders, axios));
