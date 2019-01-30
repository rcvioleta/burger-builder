import React, { Component } from 'react';
import { connect } from 'react-redux';

import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import classes from './Auth.css';
import * as actions from '../../store/actions/index';

class Auth extends Component {
    state = {
        controls: {
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'E-Mail Address'
                },
                value: '',
                validation: {
                    required: true,
                    isEmail: true
                },
                valid: false,
                touched: false
            },
            password: {
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    placeholder: 'Enter your Password'
                },
                value: '',
                validation: {
                    required: true,
                    maxLength: 6
                },
                valid: false,
                touched: false
            }
        }
    }

    checkValidity(value, rule) {
        let isValid = true;
        if (rule.required) {
            isValid = value.trim() !== '' && isValid;
        }
        if (rule.maxLength) {
            isValid = value.length <= rule.maxLength && isValid;
        }
        if (rule.minLength) {
            isValid = value.length >= rule.minLength && isValid;
        }

        if (rule.isEmail) {
            // eslint-disable-next-line
            const pattern = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
            isValid = pattern.test(value) && isValid;
        }

        return isValid;
    }

    validateLogin = (event) => {
        event.preventDefault();
        this.props.onAuth();
    }

    inputChangeHandler = (event, controlName) => {
        const updatedControls = {
            ...this.state.controls,
            [controlName]: {
                ...this.state.controls[controlName],
                value: event.target.value,
                valid: this.checkValidity(event.target.value, this.state.controls[controlName].validation),
                touched: true
            }
        }
        this.setState({ controls: updatedControls });
    }

    render() {
        const formElementsArr = [];
        for (let key in this.state.controls) {
            formElementsArr.push({
                id: key,
                config: this.state.controls[key]
            })
        }

        const form = formElementsArr.map(formElement => (
            <Input
                key={formElement.id}
                elementType={formElement.config.elementType}
                elementConfig={formElement.config.elementConfig}
                value={formElement.config.value}
                changed={(event) => this.inputChangeHandler(event, formElement.id)}
                invalid={!formElement.config.valid}
                shouldValidate={formElement.config.validation}
                touched={formElement.config.touched} />
        ));

        return (
            <div className={classes.Auth}>
                <form onSubmit={this.validateLogin}>
                    {form}
                    <Button btnType="Success">Submit</Button>
                </form>
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAuth: () => dispatch(actions.auth())
    }
}

export default connect(null, mapDispatchToProps)(Auth);