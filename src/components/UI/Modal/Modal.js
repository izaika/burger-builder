import React, { Component, Fragment } from 'react';
import classes from './Modal.css';

import Backdrop from '../Backdrop/Backdrop';

class Modal extends Component {
  shouldComponentUpdate = (nextProps, nextState, nextContext) =>
    nextProps.show !== this.props.show || nextProps.children !== this.props.children;

  render = () => {
    const { props } = this;
    return (
      <Fragment>
        <Backdrop show={props.show} clicked={props.modalClosed} />
        <div
          className={classes.Modal}
          style={{
            transform: props.show ? 'translateY(0)' : 'translateY(-100vh)',
            opacity: props.show ? 1 : 0
          }}
        >
          {props.children}
        </div>
      </Fragment>
    );
  };
}

export default Modal;
