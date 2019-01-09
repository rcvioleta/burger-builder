import React from 'react';

import classes from './Order.css';

const order = (props) => {
    const ingredients = [];
    for (let ingredientName in props.ingredients) {
        ingredients.push({
            name: ingredientName,
            amount: props.ingredients[ingredientName]
        })
    }

    const ingredientOutput = ingredients.map(ig => {
        return <span
                    style={{
                        textTransform: 'capitalize',
                        border: '1px solid #ccc',
                        margin: '0 5px',
                        padding: '5px',
                        display: 'inline-block'
                    }} 
                    key={ig.name}>{ig.name} ({ig.amount})</span>;
    });

    const customers = [];
    for (let customerProp in props.customers) {
        if (customerProp !== 'address') {
            customers.push({
                name: customerProp,
                value: props.customers[customerProp]
            })
        }
    }

    const customerOutput = customers.map(cs => {
        return <span key={cs.name}>{cs.name}: {cs.value}</span>
    });
    return (
        <div className={classes.Order}>
            <p>Customer: {customerOutput}</p>
            <p>Ingredients: {ingredientOutput}</p>
            <p>Price: <strong>USD {Number.parseFloat(props.price).toFixed(2)}</strong></p>
        </div>
    );
}

export default order;