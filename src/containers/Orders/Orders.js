import React, { Component, Fragment } from 'react';

import axios from '../../axios-orders';
import Order from '../../components/Order/Order';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

class Orders extends Component {
  state = {
    orders: [],
    loading: true
  };

  async componentDidMount() {
    try {
      const response = await axios.get('/orders.json');
      const responseData = response.data;
      const fetchedOrders = [];
      for (const key in responseData) {
        fetchedOrders.push({ ...responseData[key], id: key });
      }
      this.setState({ orders: fetchedOrders, loading: false });
    } catch (e) {
      this.setState({ loading: false });
    }
  }

  render = () => (
    <Fragment>
      {this.state.orders.map(order => <Order key={order.id} ingredients={order.ingredients} price={order.price} />)}
    </Fragment>
  );
}

export default withErrorHandler(Orders, axios);
