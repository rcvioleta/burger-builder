import React from 'react';

import classes from './BuildControls.css';
import BuildControl from './BuildControl/BuildControl';

const controls = [
    { label: 'Salad', type: 'salad' },
    { label: 'Bacon', type: 'bacon' },
    { label: 'Cheese', type: 'cheese' },
    { label: 'Meat', type: 'meat' }
];

const buildControls = (props) => (
    <div className={classes.BuildControls}>
        <p>Current Price: <strong>{props.price.toFixed(2)}</strong></p>
        { controls.map(control => (
            <BuildControl 
                key={control.label} 
                label={control.label}
                added={() => props.addIngredients(control.type)}
                removed={() => props.removeIngredients(control.type)}
                disabled={props.disable[control.type]} /> 
        )) }
        <button 
            className={classes.OrderButton}
            disabled={!props.purchasable}
            onClick={props.order}>ORDER NOW</button>
    </div>
);

export default buildControls;