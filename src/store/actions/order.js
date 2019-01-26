import * as action from '../actions/actionTypes';
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
                dispatch(purchaseBurgerSuccess(response.data, orderData));
            })
            .catch(error => {
                dispatch(purchaseBurgerFail(error));
            });
    }    
}