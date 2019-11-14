import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router} from 'react-router-dom';
import {preloadReady} from 'react-loadable';
import AuthProvider from 'components/providers/withAuth/provider';
import App from './App';
import * as serviceWorker from './serviceWorker';

import {ApolloProvider} from 'react-apollo';
import ApolloClient from 'apollo-boost';
import {InMemoryCache} from 'apollo-cache-inmemory';
import {LOCAL_SERVER_URI, SERVER_URI} from 'config/index';

const client = new ApolloClient({
  uri: SERVER_URI,
  cache: new InMemoryCache()
});

window.onload = async () => {
  await preloadReady();

  ReactDOM.render(
    <ApolloProvider client={client}>
      <Router basename="/">
        <AuthProvider>
          <App />
        </AuthProvider>
      </Router>
    </ApolloProvider>,
    document.getElementById('root')
  );
};

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
