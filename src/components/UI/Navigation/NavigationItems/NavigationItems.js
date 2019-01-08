import React from 'react';

import classes from './NavigationItems.css';
import Navigation from './NavigationItem/NavigationItem';

const navigationItems = () => (
    <ul className={classes.NavigationItems}>
        <Navigation link='/' exact>Burger Builder</Navigation>
        <Navigation link='/orders' >Orders</Navigation>
    </ul>
);

export default navigationItems;