import React from 'react';

import classes from './Toolbar.css';
import Logo from '../../Logo/Logo';
import Navigations from '../NavigationItems/NavigationItems';

const toolbar = () => (
    <header className={classes.Toolbar}>
        <div>MENU</div>
        <Logo />
        <nav>
            <Navigations />
        </nav>
    </header>
);

export default toolbar;
