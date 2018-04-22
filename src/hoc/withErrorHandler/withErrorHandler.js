import React, { Fragment, Component } from 'react';
import Modal from '../../components/UI/Modal/Modal';

const withErrorHandler = (WrappedComponent, axios) =>
  class extends Component {
    state = { error: null };
    requestInterceptor;
    responseInterceptor;

    componentWillMount = () => {
      this.requestInterceptor = axios.interceptors.request.use(request => {
        this.setState({ error: null });
        return request;
      });
      this.responseInterceptor = axios.interceptors.response.use(
        response => response,
        error => this.setState({ error })
      );
    };

    componentWillUnmount = () => {
      axios.interceptors.request.eject(this.requestInterceptor);
      axios.interceptors.response.eject(this.responseInterceptor);
    };

    errorConfirmedHandler = () => this.setState({ error: null });

    render = () => (
      <Fragment>
        <Modal show={!!this.state.error} modalClosed={this.errorConfirmedHandler}>
          {this.state.error ? this.state.error.message : null}
        </Modal>
        <WrappedComponent {...this.props} />
      </Fragment>
    );
  };

export default withErrorHandler;
