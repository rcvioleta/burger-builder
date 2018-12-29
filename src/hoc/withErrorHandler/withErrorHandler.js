import React, { Component } from 'react';

import Modal from '../../components/UI/Modal/Modal';
import Aux from '../Ax';

const withErrorHandler = (WrapperContent, axios) => {
    return class extends Component {
        state = {
            error: null
        }

        componentWillMount() {
            this.reqInterceptor = axios.interceptors.request.use(req => {
                this.setState({ error: null });
                return req;
            });

            this.resInterceptor = axios.interceptors.response.use(res => res, error => {
                this.setState({ error: error });
            });
        }

        componentWillUnmount() {
            console.log('Component will unmount')
            axios.interceptors.request.eject(this.reqInterceptor);
            axios.interceptors.response.eject(this.resInterceptor);
        }

        errorConfirmedHandler = () => {
            this.setState({ error: null });
        }

        render () {
            return (
                <Aux>
                    <Modal 
                        show={this.state.error} 
                        cancel={this.errorConfirmedHandler}>
                        {this.state.error ? this.state.error.message : null}
                    </Modal>
                    <WrapperContent {...this.props} />
                </Aux>
            )
        }
    } 
}

export default withErrorHandler;