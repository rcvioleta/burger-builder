import React from 'react';

import classes from './Toolbar.css';
import Logo from '../../Logo/Logo';
import Navigations from '../NavigationItems/NavigationItems';
import DrawerToggle from '../SideDrawer/DrawerToggle/DrawerToggle';

const toolbar = (props) => (
    <header className={classes.Toolbar}>
        <DrawerToggle clicked={props.open} />
        <Logo />
        <nav className={classes.DesktopOnly}>
            <Navigations />
        </nav>
    </header>
);

export default toolbar;
