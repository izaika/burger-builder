import React, { Component, Fragment } from 'react';
import classes from './Layout.css';

import Toolbar from '../Navigation/Toolbar/Toolbar';
import SideDrawer from '../Navigation/SideDrawer/SideDrawer';

class Layout extends Component {
  state = { showSideDrawer: false };

  sideDrawerClosedHandler = () => this.setState({ showSideDrawer: false });
  sideDrawerToggleHandler = () => this.setState(prevState => ({ showSideDrawer: !prevState.showSideDrawer }));

  render = () => (
    <Fragment>
      <Toolbar drawerToggleClicked={this.sideDrawerToggleHandler} />
      <SideDrawer closed={this.sideDrawerClosedHandler} open={this.state.showSideDrawer} />
      <main className={classes.Content}>{this.props.children}</main>
    </Fragment>
  );
}

export default Layout;
