import * as actionTypes from '../actions/actionTypes';
import { updateObjects } from '../utility';

const initialState = {
    ingredients: null,
    totalPrice: 4,
    error: false
}

const INGREDIENT_PRICES = {
    salad: 0.5,
    bacon: 0.7,
    meat: 2,
    cheese: 0.3
}

const addIngredients = (state, action) => {
    const updatedIngredient = { [action.ingredientName]: state.ingredients[action.ingredientName] + 1 }
    const updatedIngredients = updateObjects(state.ingredients, updatedIngredient);
    const updatedState = {
        ingredients: updatedIngredients,
        totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName]
    }
    return updateObjects(state, updatedState);
}

const removeIngredients = (state, action) => {
    const updatedIng = { [action.ingredientName]: state.ingredients[action.ingredientName] - 1 }
    const updatedIngs = updateObjects(state.ingredients, updatedIng);
    const updatedSt = {
        ingredients: updatedIngs,
        totalPrice: state.totalPrice - INGREDIENT_PRICES[action.ingredientName]
    }
    return updateObjects(state, updatedSt);
}

const setIngredients = (state, action) => {
    return updateObjects(state, { 
        ingredients: action.ingredients, 
        error: false, 
        totalPrice: 4 });
}

const fetchIngredientsFailed = (state, action) => {
    return updateObjects(state, { error: true });
}

const ingredients = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.ADD_INGREDIENTS: return addIngredients(state, action);
        case actionTypes.REMOVE_INGREDIENTS: return removeIngredients(state, action);
        case actionTypes.SET_INGREDIENTS: return setIngredients(state, action);
        case actionTypes.FETCH_INGREDIENTS_FAILED: return fetchIngredientsFailed(state, action);
        default: return state;
    }
};

export default ingredients;