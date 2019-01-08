import React, { Component } from 'react';
import axios from '../../axios-orders';

import Button from '../UI/Button/Button';
import classes from './ContactData.css';
import Spinner from '../../components/UI/Spinner/Spinner';

class ContactData extends Component {
    state = {
        name: '',
        email: '',
        address: {
            street: '',
            postalCode: ''
        },
        loading: false
    }

    orderHandler = (event) => {
        event.preventDefault();
        this.setState({ loading: true });
        const order = { 
            ingredients: this.props.ingredients,
            customer: {
                name: 'Rogene Cris Violeta',
                email: 'test@test.com',
                address: {
                    street: '123 Test Street',
                    city: 'Davao City',
                    zipCode: 8000,
                    country: 'Philippines'
                }
            },
            price: this.props.totalPrice
        };
        axios.post('/order.json', order)
            .then(response => {
                this.setState({ loading: false });
                this.props.history.push('/');
            })
            .catch(error => {
                this.setState({ loading: false });
            });
    }
    
    render () {
        let form = (
            <form>
                <input className={classes.Input} type="text" name="name" placeholder="Enter your name" />  
                <input className={classes.Input} type="email" name="email" placeholder="Enter your email address" />  
                <input className={classes.Input} type="text" name="street" placeholder="Enter your street name" />  
                <input className={classes.Input} type="text" name="postal" placeholder="Enter your postal code" />  
                <Button 
                    btnType="Success" 
                    clicked={this.orderHandler}>ORDER NOW</Button>
            </form> 
        );
        if (this.state.loading) {
            form = <Spinner />;
        }
        return (
            <div className={classes.ContactData}>
                <h3>Enter your contact data</h3> 
               {form}
            </div>
        )
    }
}

export default ContactData;