import React, { Component } from 'react';

import Aux from '../../hoc/Ax';
import classes from './Layout.css';
import Toolbar from '../UI/Navigation/Toolbar/Toolbar';
import SideDrawer from '../UI/Navigation/SideDrawer/SideDrawer';

class Layout extends Component {
    state = {
        showSideDrawer: false
    }

    sideDrawerCloseHandler = () => {
        this.setState({ showSideDrawer: false });
    }

    sideDrawerToggleHandler = () => {
        this.setState( (prevState) => {
            return { showSideDrawer: !prevState.showSideDrawer }
        });
    }

    render () {
        return (
            <Aux>
                <Toolbar open={this.sideDrawerToggleHandler} />
                <SideDrawer 
                    open={this.state.showSideDrawer} 
                    click={this.sideDrawerCloseHandler} />
                <main className={classes.Content}>{this.props.children}</main>
            </Aux>
        )
    }
}

export default Layout;