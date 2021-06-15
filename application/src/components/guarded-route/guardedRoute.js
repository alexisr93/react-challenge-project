import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

const mapStateToProps = (state) => ({ auth: state.auth });

const GuardedRoute = ({ component: Component, auth, ...rest }) => (
  <Route {...rest} render={(props) => (
    auth.token ? <Component {...props} /> : <Redirect to='/login' />
  )} />
)

export default connect(mapStateToProps, null)(GuardedRoute);
