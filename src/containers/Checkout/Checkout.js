import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import CheckoutSummary from '../../components/CheckoutSummary/CheckoutSummary';
import ContactData from '../../components/ContactData/ContactData';

class Checkout extends Component {
    state = {
        ingredients: null,
        totalPrice: 0
    }

    componentWillMount () {
        const query = new URLSearchParams(this.props.location.search);
        const ingredients = {};
        let price = 0;
        for (let param of query.entries()) {
            if (param[0] === 'price') {
                price = param[1];
            } 
            else {
                ingredients[param[0]] = +param[1];
            }
        }
        this.setState({ 
            ingredients: ingredients,
            totalPrice: price
        });
    }
    
    continueCheckoutHandler = () => {
        this.props.history.replace('/checkout/contact-data');
    }

    cancelCheckoutHandler = () => {
        this.props.history.goBack();
    }

    render () {
        return (
            <div>
                <CheckoutSummary 
                    ingredients={this.state.ingredients} 
                    continue={this.continueCheckoutHandler}
                    cancel={this.cancelCheckoutHandler} /> 
                <Route 
                    path={this.props.match.url + '/contact-data'} 
                    render={(props) => (<ContactData 
                                            ingredients={this.state.ingredients} 
                                            totalPrice={this.state.totalPrice} 
                                            {...props} />)} />
            </div>
        );
    }
}

export default Checkout;