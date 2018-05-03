import React, { Component } from 'react';
import axios from '../../../axios-orders';

import classes from './ContactData.css';

import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';

class ContactData extends Component {
  state = {
    name: null,
    email: null,
    address: {
      street: null,
      postalCode: null
    },
    loading: false
  };

  orderHandler = async event => {
    event.preventDefault();

    this.setState({ loading: true });
    const order = {
      ingredients: this.props.ingredients,
      price: this.props.price,
      customer: {
        name: 'Igor Zaika',
        address: {
          street: 'Teststreet 1',
          zipCode: '34456',
          country: 'Ukraine'
        },
        email: 'test@example.com'
      },
      deliveryMethod: 'fastest'
    };
    try {
      const response = await axios.post('orders.json', order);
      console.log(response);
      this.setState({ loading: false }, () => {
        this.props.history.push('/');
      });
    } catch (e) {
      this.setState({ loading: false });
      console.error(e);
    }
  };

  render = () => (
    <div className={classes.ContactData}>
      <h4>Enter your contact data</h4>
      {this.state.loading ? (
        <Spinner />
      ) : (
        <form>
          <Input inputtype="input" type="text" name="name" placeholder="Your Name" />
          <Input inputtype="input" type="email" name="email" placeholder="Your E-mail" />
          <Input inputtype="input" type="text" name="street" placeholder="Street" />
          <Input inputtype="input" type="text" name="postal" placeholder="Postal Code" />
          <Button btnType="Success" clicked={this.orderHandler}>
            ORDER
          </Button>
        </form>
      )}
    </div>
  );
}

export default ContactData;
