import React from 'react';
import { withAuthContext } from './provider';

function withAuth(Component) {
  return function WrapperComponent(props) {
    return (
      <withAuthContext.Consumer>
        {state => <Component {...props} auth={state} />}
      </withAuthContext.Consumer>
    );
  };
}

export default withAuth;
