import React from 'react';
import './App.css';
import {Switch, Route} from 'react-router-dom';
import {Admin} from './views';

const App = () => {
  return (
    <Switch>
      <Route path="/admin" component={Admin} />
    </Switch>
  );
};

export default App;
