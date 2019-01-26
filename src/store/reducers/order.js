import * as actionType from '../actions/actionTypes';

const initialState = {
    orders: [],
    loading: false
}

const order = (state = initialState, action) => {
    switch (action.type) {
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
                orders: state.order.concat(newOrders)
            }
        case actionType.PURCHASE_BURGER_FAIL:
            return {
                ...state,
                loading: false
            }
        default:
            return state;
    };
};

export default order;