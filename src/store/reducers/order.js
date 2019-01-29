import * as actionType from '../actions/actionTypes';

const initialState = {
    orders: [],
    loading: false,
    purchased: false
}

const order = (state = initialState, action) => {
    switch (action.type) {
        case actionType.PURCHASE_INIT:
            return {
                ...state,
                purchased: false
            }
        case actionType.PURCHASE_BURGER_START:
            return {
                ...state,
                loading: true
            }
        case actionType.PURCHASE_BURGER_SUCCESS:
            const newOrders = {
                ...action.orderData,
                id: action.orderId
            }
            return {
                ...state,
                loading: false,
                purchased: true,
                orders: state.orders.concat(newOrders)
            }
        case actionType.PURCHASE_BURGER_FAIL:
            return {
                ...state,
                loading: false
            }
        case actionType.FETCH_ORDER_START:
            return {
                ...state,
                loading: true
            }
        case actionType.FETCH_ORDER_SUCCESS:
            return {
                ...state,
                orders: action.orders,
                loading: false
            }
        case actionType.FETCH_ORDER_FAIL:
            return {
                ...state,
                loading: false
            }
    };
    return state;
};

export default order;