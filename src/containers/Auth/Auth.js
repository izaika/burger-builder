import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import classes from './Auth.css';

import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import Spinner from '../../components/UI/Spinner/Spinner';

import * as actions from '../../store/actions';

class Auth extends Component {
  state = {
    controls: {
      email: {
        elementType: 'input',
        elementConfig: {
          type: 'email',
          placeholder: 'Your E-mail'
        },
        value: '',
        validation: {
          required: true,
          isEmail: true
        },
        valid: false,
        touched: false
      },
      password: {
        elementType: 'input',
        elementConfig: {
          type: 'password',
          placeholder: 'Password'
        },
        value: '',
        validation: {
          required: true,
          minLength: 6
        },
        valid: false,
        touched: false
      }
    },
    isSignup: true
  };

  switchAuthModeHandler = () =>
    this.setState(prevState => ({
      isSignup: !prevState.isSignup
    }));

  componentDidMount() {
    if (!this.props.buildingBurger && this.props.authRedirectPath !== '/') this.onSetAuthRedirectPath();
  }

  checkValidity = (value, rules) => {
    if (!rules) return true;
    let isValid = true;

    if (rules.required) isValid = !!value.trim().length && isValid;
    if (rules.minLength) isValid = value.length >= rules.minLength && isValid;
    if (rules.maxLength) isValid = value.length <= rules.minLength && isValid;

    return isValid;
  };

  inputChangedHandler = (event, controlName) => {
    const { value } = event.target;
    const currentControl = this.state.controls[controlName];

    const updatedControls = {
      ...this.state.controls,
      [controlName]: {
        ...currentControl,
        value,
        valid: this.checkValidity(value, currentControl.validation),
        touched: true
      }
    };

    this.setState({ controls: updatedControls });
  };

  submitHandler = event => {
    event.preventDefault();
    const { email, password } = this.state.controls;
    this.props.onAuth(email.value, password.value, this.state.isSignup);
  };

  render() {
    const { props } = this;
    const formElements = [];
    const { controls } = this.state;
    for (const key in controls) {
      formElements.push({ id: key, config: controls[key] });
    }

    let form = formElements.map(formElement => (
      <Input
        key={formElement.id}
        elementType={formElement.config.elementType}
        elementConfig={formElement.config.elementConfig}
        value={formElement.config.value}
        changed={event => this.inputChangedHandler(event, formElement.id)}
        invalid={formElement.config.touched && !formElement.config.valid}
        shouldValidate={formElement.config.validation}
      />
    ));

    if (props.loading) form = <Spinner />;

    return (
      <div className={classes.Auth}>
        {props.isAuthenticated && <Redirect to={props.authRedirectPath} />}
        {props.error && <p>{props.error.message}</p>}
        <form onSubmit={this.submitHandler}>
          {form}
          <Button btnType="Success">SUBMIT</Button>
        </form>
        <Button btnType="Danger" clicked={this.switchAuthModeHandler}>
          SWITCH TO {this.state.isSignup ? 'SIGNIN' : 'SIGNUP'}
        </Button>
      </div>
    );
  }
}

export default connect(
  state => ({
    loading: state.auth.loading,
    error: state.auth.error,
    isAuthenticated: !!state.auth.token,
    buildingBurger: state.burgerBuilder.building,
    authRedirectPath: state.auth.authRedirectPath
  }),
  dispatch => ({
    onAuth: (email, password, isSignup) => dispatch(actions.auth(email, password, isSignup)),
    onSetAuthRedirectPath: () => dispatch(actions.auth.setAuthRedirectPath('/'))
  })
)(Auth);
