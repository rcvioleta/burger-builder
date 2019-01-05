import React from 'react';

import classes from './CheckoutSummary.css';
import Burger from '../Burger/Burger';
import Button from '../UI/Button/Button';

const checkoutSummary = ( props ) => (
    <div className={classes.CheckoutSummary}>
        <div style={{width: '100%', margin: 'auto'}}>
            <h1>We hope it tastes well!</h1>
            <Burger ingredients={props.ingredients} />
            <Button btnType='Danger' clicked={props.cancel}>CANCEL</Button>
            <Button btnType='Success' clicked={props.continue}>CONTINUE</Button>
        </div>
    </div>
);

export default checkoutSummary;