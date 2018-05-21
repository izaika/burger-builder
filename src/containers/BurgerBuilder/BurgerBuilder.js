import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';

import axios from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import * as actions from '../../store/actions';

class BurgerBuilder extends Component {
  state = {
    purchasing: false
  };

  componentDidMount() {
    this.props.onInitIngredients();
  }

  purchaseHandler = () => {
    const { props } = this;
    if (props.isAuthenticated) {
      this.setState({ purchasing: true });
    } else {
      props.onSetAuthRedirectPath('/checkout');
      props.history.push('/auth');
    }
  };
  purchaseCancelHandler = () => this.setState({ purchasing: false });

  purchaseContinueHandler = () => {
    this.props.onInitPurchase();
    this.props.history.push('/checkout');
  };

  updatePurchaseState = ingredients =>
    Object.keys(ingredients)
      .map(igKey => ingredients[igKey])
      .reduce((sum, el) => sum + el, 0) > 0;

  render() {
    const { props } = this;
    if (props.error === true) return <p>Ingredients can't be loaded</p>;

    const { ingredients, totalPrice } = props;

    const disableInfo = { ...props.ingredients };

    for (let key in disableInfo) {
      disableInfo[key] = disableInfo[key] <= 0;
    }

    let burger = <Spinner />;
    let orderSummary = null;

    if (ingredients) {
      orderSummary = (
        <OrderSummary
          ingredients={ingredients}
          purchaseCanceled={this.purchaseCancelHandler}
          purchaseContinued={this.purchaseContinueHandler}
          price={totalPrice}
        />
      );

      burger = (
        <Fragment>
          <Burger ingredients={ingredients} />
          <BuildControls
            ingredientAdded={props.onIngredientAdded}
            ingredientRemoved={props.onIngredientRemoved}
            disabled={disableInfo}
            price={totalPrice}
            purchaseable={this.updatePurchaseState(ingredients)}
            ordered={this.purchaseHandler}
            isAuth={props.isAuthenticated}
          />
        </Fragment>
      );
    }

    return (
      <Fragment>
        <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
          {orderSummary}
        </Modal>
        {burger}
      </Fragment>
    );
  }
}

export default connect(
  state => ({
    ingredients: state.burgerBuilder.ingredients,
    totalPrice: state.burgerBuilder.totalPrice,
    error: state.burgerBuilder.error,
    isAuthenticated: !!state.auth.token
  }),
  {
    onIngredientAdded: actions.addIngredient,
    onIngredientRemoved: actions.removeIngredient,
    onInitIngredients: actions.initIngredients,
    onInitPurchase: actions.purchaseInit,
    onSetAuthRedirectPath: actions.setAuthRedirectPath
  }
)(withErrorHandler(BurgerBuilder, axios));
