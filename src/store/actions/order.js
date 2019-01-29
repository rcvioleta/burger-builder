import * as action from './actionTypes';
import axios from '../../axios-orders';

const purchaseBurgerSuccess = (orderId, orderData) => {
    return {
        type: action.PURCHASE_BURGER_SUCCESS,
        orderId: orderId,
        orderData: orderData
    }
}

const purchaseBurgerStart = () => {
    return {
        type: action.PURCHASE_BURGER_START
    }
}

const purchaseBurgerFail = (error) => {
    return {
        type: action.PURCHASE_BURGER_FAIL,
        error: error
    }
}

export const purchaseBurger = (orderData) => {
    return dispatch => {
        dispatch(purchaseBurgerStart());
        axios.post('orders.json', orderData)
            .then(response => {
                dispatch(purchaseBurgerSuccess(response.data.name, orderData));
            })
            .catch(error => {
                dispatch(purchaseBurgerFail(error));
            });
    }
}

export const purchaseInit = () => {
    return {
        type: action.PURCHASE_INIT
    }
}

const fetchOrderStart = () => {
    return {
        type: action.FETCH_ORDER_START
    }
}

const fetchOrderSuccess = (orders) => {
    return {
        type: action.FETCH_ORDER_SUCCESS,
        orders: orders
    }
}

const fetchOrderFail = (error) => {
    return {
        type: action.FETCH_ORDER_FAIL,
        error: error
    }
}

export const fetchOrders = () => {
    return dispatch => {
        dispatch(fetchOrderStart());
        axios.get('orders.json')
        .then(resp => {
            let fetchedOrders = [];
            for (let key in resp.data) {
                fetchedOrders.push({
                    ...resp.data[key],
                    id: key
                })
            }
            dispatch(fetchOrderSuccess(fetchedOrders));
        })
        .catch(error => {
            dispatch(fetchOrderFail(error));
        })
    }
}