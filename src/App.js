import React, {Component} from 'react';
import {Switch, Route, Redirect} from 'react-router-dom';
import {withApollo} from 'react-apollo';
import cookie from 'react-cookies';
import './App.css';
import {Admin, Auth} from 'views';

class App extends Component {
  render() {
    const token = cookie.load('token');

    return (
      <Switch>
        {token && <Route path="/admin" render={() => <Admin />} />}
        {token && <Redirect from="/auth" to="/admin" />}
        <Route path="/auth" render={() => <Auth />} />
        <Redirect from="/" to="/auth" />
      </Switch>
    );
  }
}

export default withApollo(App);
