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
import * as actionTypes from '../../store/actions';

class BurgerBuilder extends Component {
    state = {
        ingredients: null,
        totalPrice: 3,
        purchasable: false,
        purchasing: false,
        loading: false,
        error: false
    }

    componentDidMount() {
        // axios.get('ingredients.json')
        //     .then(response => {
        //         this.setState({ ingredients: response.data });
        //     })
        //     .catch(error => {
        //         this.setState({ error: true });
        //     });
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

    addIngredientsHandler = (type) => {
        // const oldCount = this.props.ingredients[type];
        // const updatedCount = oldCount + 1;
        // const updatedIngredients = {
        //     ...this.props.ingredients
        // };
        // updatedIngredients[type] = updatedCount;
        // const oldPrice = this.state.totalPrice;
        // const updatedPrice = oldPrice + INGREDIENT_PRICES[type];
        // this.setState({ 
        //     totalPrice: updatedPrice, 
        //     ingredients: updatedIngredients 
        // });
        // this.updatePurchaseState(updatedIngredients);
    }

    removeIngredientHandler = (type) => {
        // const oldCount = this.props.ingredients[type];
        // if (oldCount <= 0) {
        //     return;
        // }
        // const updatedCount = oldCount - 1;
        // const updatedIngredients = {
        //     ...this.props.ingredients
        // }
        // updatedIngredients[type] = updatedCount;
        // const oldPrice = this.state.totalPrice;
        // const updatedPrice = oldPrice - INGREDIENT_PRICES[type];
        // this.setState({
        //     totalPrice: updatedPrice, 
        //     ingredients: updatedIngredients
        // });
        // this.updatePurchaseState(updatedIngredients);
    }

    purchaseHandler = () => {
        this.setState({ purchasing: true });
    }

    purchaseCancelHandler = () => {
        this.setState({ purchasing: false });
    }

    purchaseContinueHandler = () => {
        const queryParams = [];
        for (let i in this.props.ingredients) {
            queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.props.ingredients[i]));
        }
        queryParams.push('price=' + this.state.totalPrice);
        const queryString = queryParams.join('&');
        // console.log(queryString);
        this.props.history.push({
            pathname: '/checkout',
            search: '?' + queryString
        });
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
        let burger = this.state.error ?  <p>Ingredients can't be loaded.</p> : <Spinner /> ;
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
        ingredients: state.ingredients,
        totalPrice: state.totalPrice
    }
}

const mapDispatchToProps = dispatch => {
    return {
        addIngredients: (ingName) => dispatch({type: actionTypes.ADD_INGREDIENTS, ingredientName: ingName}),
        removeIngredients: (ingName) => dispatch({type: actionTypes.REMOVE_INGREDIENTS, ingredientName: ingName})
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));