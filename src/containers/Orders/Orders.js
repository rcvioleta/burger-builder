import React, { Component } from 'react';

import Order from '../../components/Order/Order';
import axios from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

class Orders extends Component {
    state = {
        orders: [],
        loading: true
    }

    componentDidMount() {
        axios.get('orders.json')
        .then(resp => {
            let fetchedOrders = [];
            for (let key in resp.data) {
                fetchedOrders.push({
                    ...resp.data[key],
                    id: key
                })
            }
            this.setState({ 
                orders: fetchedOrders, 
                loading: false 
            });
        })
        .catch(error => {
            this.setState({ loading: false });
        })
    }

    render () {
        if (this.state.orders) console.log(this.state.orders);
        return (
            <div>
                <Order />
                <Order />
            </div>
        );
    }
}

export default withErrorHandler(Orders, axios);