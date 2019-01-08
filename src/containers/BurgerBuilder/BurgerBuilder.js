import React, { Component } from 'react';

import Aux from '../../hoc/Ax';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

const INGREDIENT_PRICES = {
    salad: 0.5,
    bacon: 0.7,
    meat: 2,
    cheese: 0.3
}

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
        axios.get('ingredients.json')
            .then(response =>{
                this.setState({ ingredients: response.data });
            })
            .catch(error => {
                this.setState({ error: true });
            });
    }

    updatePurchaseState(ingredients) {
        const sum = Object.keys(ingredients)
            .map(igKey => {
                return ingredients[igKey];
            })
            .reduce( (sum, el) => {
                return sum + el;
            }, 0);
        this.setState({ purchasable: sum > 0 });
    }

    addIngredientsHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        const updatedCount = oldCount + 1;
        const updatedIngredients = {
            ...this.state.ingredients
        };
        updatedIngredients[type] = updatedCount;
        const oldPrice = this.state.totalPrice;
        const updatedPrice = oldPrice + INGREDIENT_PRICES[type];
        this.setState({ 
            totalPrice: updatedPrice, 
            ingredients: updatedIngredients 
        });
        this.updatePurchaseState(updatedIngredients);
    }

    removeIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        if (oldCount <= 0) {
            return;
        }
        const updatedCount = oldCount - 1;
        const updatedIngredients = {
            ...this.state.ingredients
        }
        updatedIngredients[type] = updatedCount;
        const oldPrice = this.state.totalPrice;
        const updatedPrice = oldPrice - INGREDIENT_PRICES[type];
        this.setState({
            totalPrice: updatedPrice, 
            ingredients: updatedIngredients
        });
        this.updatePurchaseState(updatedIngredients);
    }

    purchaseHandler = () => {
        this.setState({ purchasing: true });
    }

    purchaseCancelHandler = () => {
        this.setState({ purchasing: false });
    }

    purchaseContinueHandler = () => {
        // this.setState({ loading: true });
        // const order = { 
        //     ingredients: this.state.ingredients,
        //     customer: {
        //         name: 'Rogene Cris Violeta',
        //         email: 'test@test.com',
        //         address: {
        //             street: '123 Test Street',
        //             city: 'Davao City',
        //             zipCode: 8000,
        //             country: 'Philippines'
        //         }
        //     },
        //     price: this.state.totalPrice
        // };
        // axios.post('/order.json', order)
        //     .then(response => {
        //         this.setState({ loading: false, purchasing: false });
        //     })
        //     .catch(error => {
        //         this.setState({ loading: false, purchasing: false });
        //     });
        const queryParams = [];
        for (let i in this.state.ingredients) {
            queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredients[i]));
        }
        queryParams.push('price=' + this.state.totalPrice);
        const queryString = queryParams.join('&');
        console.log(queryString);
        this.props.history.push({
            pathname: '/checkout',
            search: '?' + queryString
        });
    }

    render() {
        const disabledInfo = {
            ...this.state.ingredients
        }
        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0;
        }
        let orderSummary = null;
        if (this.state.loading) {
            orderSummary = <Spinner />;
        }
        let burger = this.state.error ?  <p>Ingredients can't be loaded.</p> : <Spinner /> ;
        if (this.state.ingredients) {
            burger = (
                <Aux>
                    <Burger ingredients={this.state.ingredients} />
                    <BuildControls 
                        addIngredients={this.addIngredientsHandler}
                        removeIngredients={this.removeIngredientHandler} 
                        disable={disabledInfo} 
                        price={this.state.totalPrice}
                        purchasable={this.state.purchasable} 
                        order={this.purchaseHandler} />
                </Aux>
            );

            orderSummary = <OrderSummary 
                ingredients={this.state.ingredients} 
                cancelPurchase={this.purchaseCancelHandler} 
                continuePurchase={this.purchaseContinueHandler}
                price={this.state.totalPrice} />;
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

export default withErrorHandler(BurgerBuilder, axios);