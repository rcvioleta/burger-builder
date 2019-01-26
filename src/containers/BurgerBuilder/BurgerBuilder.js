import React, { Component } from 'react';
import { connect } from 'react-redux';

import Aux from '../../hoc/Ax';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as burgerBuilderActions from '../../store/actions/index';

class BurgerBuilder extends Component {
    state = {
        purchasing: false
    }

    componentDidMount() {
        this.props.initIngredients();
    }

    updatePurchaseState (ingredients) {
        const sum = Object.keys(ingredients)
            .map(igKey => {
                return ingredients[igKey];
            })
            .reduce( (sum, el) => {
                return sum + el;
            }, 0);
        return sum > 0;
    }

    purchaseHandler = () => {
        this.setState({ purchasing: true });
    }

    purchaseCancelHandler = () => {
        this.setState({ purchasing: false });
    }

    purchaseContinueHandler = () => {
        this.props.history.push('/checkout');
    }

    render() {
        const disabledInfo = {
            ...this.props.ingredients
        }
        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0;
        }
        let orderSummary = null;
        if (this.state.loading) {
            orderSummary = <Spinner />;
        }
        let burger = this.props.error ?  <p>Ingredients can't be loaded.</p> : <Spinner /> ;
        if (this.props.ingredients) {
            burger = (
                <Aux>
                    <Burger ingredients={this.props.ingredients} />
                    <BuildControls 
                        addIngredients={this.props.addIngredients}
                        removeIngredients={this.props.removeIngredients} 
                        disable={disabledInfo} 
                        price={this.props.totalPrice}
                        purchasable={this.updatePurchaseState(this.props.ingredients)} 
                        order={this.purchaseHandler} />
                </Aux>
            );

            orderSummary = <OrderSummary 
                ingredients={this.props.ingredients} 
                cancelPurchase={this.purchaseCancelHandler} 
                continuePurchase={this.purchaseContinueHandler}
                price={this.props.totalPrice} />;
        }

        return (
            <Aux>
                <Modal show={this.state.purchasing} cancel={this.purchaseCancelHandler}>
                    {orderSummary}
                </Modal>
                {burger}
            </Aux>
        ) 
    }
} 

const mapStateToProps = state => {
    return {
        ingredients: state.ings.ingredients,
        totalPrice: state.ings.totalPrice,
        error: state.ings.error
    }
}

const mapDispatchToProps = dispatch => {
    return {
        addIngredients: (ingName) => dispatch(burgerBuilderActions.addIngredients(ingName)),
        removeIngredients: (ingName) => dispatch(burgerBuilderActions.removeIngredients(ingName)),
        initIngredients: () => dispatch(burgerBuilderActions.initIngredients())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));