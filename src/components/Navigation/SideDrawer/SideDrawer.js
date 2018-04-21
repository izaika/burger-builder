import React, { Fragment } from 'react';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import Backdrop from '../../UI/Backdrop/Backdrop';

import classes from './SideDrawer.css';

const sideDrawer = props => (
  <Fragment>
    <Backdrop show={props.open} clicked={props.closed} />
    <div className={`${classes.SideDrawer} ${props.open ? classes.Open : classes.Close}`}>
      <div className={classes.Logo}>
        <Logo />
      </div>
      <nav>
        <NavigationItems />
      </nav>
    </div>
  </Fragment>
);

export default sideDrawer;
