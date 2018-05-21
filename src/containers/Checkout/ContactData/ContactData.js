import React, { Component } from 'react';
import { connect } from 'react-redux';

import axios from '../../../axios-orders';
import classes from './ContactData.css';

import * as actions from '../../../store/actions';
import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';

class ContactData extends Component {
  state = {
    orderForm: {
      name: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Your Name'
        },
        value: '',
        validation: {
          required: true
        },
        valid: false,
        touched: false
      },
      street: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Street'
        },
        value: '',
        validation: {
          required: true
        },
        valid: false,
        touched: false
      },
      zipCode: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'ZIP Code'
        },
        value: '',
        validation: {
          required: true,
          minLength: 5,
          maxLength: 5
        },
        valid: false,
        touched: false
      },
      country: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Your Country'
        },
        value: '',
        validation: {
          required: true
        },
        valid: false,
        touched: false
      },
      email: {
        elementType: 'input',
        elementConfig: {
          type: 'email',
          placeholder: 'Your E-Mail'
        },
        value: '',
        validation: {
          required: true
        },
        valid: false,
        touched: false
      },
      deliveryMethod: {
        elementType: 'select',
        elementConfig: {
          options: [{ value: 'fastest', displayValue: 'Fastest' }, { value: 'cheapest', displayValue: 'Cheapest' }]
        },
        value: 'fastest',
        touched: false,
        valid: true
      }
    },
    formIsValid: false
  };

  orderHandler = event => {
    event.preventDefault();

    const formData = {};
    const { orderForm } = this.state;
    for (const formElementId in orderForm) {
      formData[formElementId] = orderForm[formElementId].value;
    }
    this.props.onOrderBurger(
      {
        ingredients: this.props.ingredients,
        price: this.props.price,
        orderData: formData,
        userId: this.props.userId
      },
      this.props.token
    );
  };

  checkValidity = (value, rules) => {
    if (!rules) return true;
    let isValid = true;

    if (rules.required) isValid = !!value.trim().length && isValid;
    if (rules.minLength) isValid = value.length >= rules.minLength && isValid;
    if (rules.maxLength) isValid = value.length <= rules.minLength && isValid;

    return isValid;
  };

  inputChangedHandler = (event, inputId) => {
    const updatedOrderForm = {
      ...this.state.orderForm
    };

    const value = event.target.value;
    const updatedFormElement = { ...updatedOrderForm[inputId], value, touched: true };
    updatedFormElement.valid = this.checkValidity(value, updatedFormElement.validation);
    updatedOrderForm[inputId] = updatedFormElement;

    let formIsValid = true;
    for (const inputId in updatedOrderForm) {
      formIsValid = updatedOrderForm[inputId].valid && formIsValid;
    }
    this.setState({ orderForm: updatedOrderForm, formIsValid });
  };

  render = () => {
    const formElements = [];
    const { orderForm } = this.state;
    for (const key in orderForm) {
      formElements.push({
        id: key,
        config: orderForm[key]
      });
    }

    return (
      <div className={classes.ContactData}>
        <h4>Enter your contact data</h4>
        {this.props.loading ? (
          <Spinner />
        ) : (
          <form onSubmit={this.orderHandler}>
            {formElements.map(formElement => (
              <Input
                key={formElement.id}
                elementType={formElement.config.elementType}
                elementConfig={formElement.config.elementConfig}
                value={formElement.config.value}
                changed={event => this.inputChangedHandler(event, formElement.id)}
                invalid={formElement.config.touched && !formElement.config.valid}
                shouldValidate={formElement.config.validation}
              />
            ))}
            <Button btnType="Success" disabled={!this.state.formIsValid}>
              ORDER
            </Button>
          </form>
        )}
      </div>
    );
  };
}

export default connect(
  state => ({
    ingredients: state.burgerBuilder.ingredients,
    price: state.burgerBuilder.totalPrice,
    loading: state.order.loading,
    token: state.auth.token,
    userId: state.auth.userId
  }),
  {
    onOrderBurger: actions.purchaseBurger
  }
)(withErrorHandler(ContactData, axios));
