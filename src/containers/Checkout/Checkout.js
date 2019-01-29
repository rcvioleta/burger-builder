import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import CheckoutSummary from '../../components/CheckoutSummary/CheckoutSummary';
import ContactData from '../../components/ContactData/ContactData';

class Checkout extends Component {
    continueCheckoutHandler = () => {
        this.props.history.replace('/checkout/contact-data');
    }

    cancelCheckoutHandler = () => {
        this.props.history.goBack();
    }

    render() {
        let summary = <Redirect to="/" />;

        if (this.props.ingredients) {
            const purchaseRedirect = this.props.purchased ? <Redirect to="/" /> : null;
            summary = (
                <div>
                    {purchaseRedirect}
                    <CheckoutSummary
                        ingredients={this.props.ingredients}
                        continue={this.continueCheckoutHandler}
                        cancel={this.cancelCheckoutHandler} />
                    <Route
                        path={this.props.match.url + '/contact-data'}
                        component={ContactData} />
                </div>
            );
        }
        return summary;
    }
}

const mapStateToProps = state => {
    return {
        ingredients: state.ings.ingredients,
        totalPrice: state.ings.totalPrice,
        purchased: state.order.purchased
    }
};

export default connect(mapStateToProps)(Checkout);