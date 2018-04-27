import React, { Component } from 'react';

import classes from './ContactData.css';
import Button from '../../../components/UI/Button/Button';

class ContactData extends Component {
  state = {
    name: null,
    email: null,
    address: {
      street: null,
      postalCode: null
    }
  };

  render = () => (
    <div className={classes.ContactData}>
      <h4>Enter your contact data</h4>
      <form>
        <input className={classes.Input} type="text" name="name" placeholder="Your Name" />
        <input className={classes.Input} type="email" name="email" placeholder="Your E-mail" />
        <input className={classes.Input} type="text" name="street" placeholder="Street" />
        <input className={classes.Input} type="text" name="postal" placeholder="Postal Code" />
        <Button btnType="Success">ORDER</Button>
      </form>
    </div>
  );
}

export default ContactData;
