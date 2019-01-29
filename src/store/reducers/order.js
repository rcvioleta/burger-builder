import * as actionType from '../actions/actionTypes';
import { updateObjects } from '../utility';

const initialState = {
    orders: [],
    loading: false,
    purchased: false
}

const purchaseInit = (state, action) => {
    return updateObjects(state, { purchased: false });
}

const purchaseBurgerStart = (state, action) => {
    return updateObjects(state, { loading: true });
}

const purchaseBurgerSuccess = (state, action) => {
    const newOrders = { ...action.orderData, id: action.orderId }
    return updateObjects(state, {
        loading: false,
        purchased: true,
        orders: state.orders.concat(newOrders)
    });
}

const purchaseBurgerFailed = (state, action) => {
    return updateObjects(state, { loading: false });
}

const fetchOrderStart = (state, action) => {
    return updateObjects(state, { loading: true });
}

const fetchOrderSuccess = (state, action) => {
    return updateObjects(state, { orders: action.orders, loading: false });
}

const fetchOrderFailed = (state, action) => {
    return updateObjects(state, { loading: false });
}

const order = (state = initialState, action) => {
    switch (action.type) {
        case actionType.PURCHASE_INIT: return purchaseInit(state, action);
        case actionType.PURCHASE_BURGER_START: return purchaseBurgerStart(state, action);
        case actionType.PURCHASE_BURGER_SUCCESS: return purchaseBurgerSuccess(state, action);
        case actionType.PURCHASE_BURGER_FAIL: return purchaseBurgerFailed(state, action);
        case actionType.FETCH_ORDER_START: return fetchOrderStart(state, action);
        case actionType.FETCH_ORDER_SUCCESS: return fetchOrderSuccess(state, action);
        case actionType.FETCH_ORDER_FAIL: return fetchOrderFailed(state, action);
    };
    return state;
};

export default order;