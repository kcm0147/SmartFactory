import React from "react";
import ReactDOM from "react-dom";
import { createBrowserHistory } from "history";
import { Router, Route, Switch, Redirect } from "react-router-dom";
import { ApolloProvider } from "react-apollo";
import { ApolloProvider as ApolloHooksProvider } from "react-apollo-hooks";
import client from "./apollo";

import AdminLayout from "layouts/Admin/Admin.js";

import "assets/scss/black-dashboard-react.scss";
import "assets/demo/demo.css";
import "assets/css/nucleo-icons.css";

import { Provider } from 'react-redux';
import { applyMiddleware, createStore } from 'redux';
import promiseMiddleware from 'redux-promise';
import ReduxThunk from 'redux-thunk';
import Reducer from './_reducers';
import * as serviceWorker from './serviceWorker';
import LandingPage from './components/views/LandingPage/LandingPage'
import LoginPage from './components/views/LoginPage/Loginform';
import RegisterPage from './components/views/RegisterPage/RegisterPage';
import Auth from './hoc/auth'

const hist = createBrowserHistory();
const createStoreWithMiddleware = applyMiddleware(promiseMiddleware, ReduxThunk)(createStore)

ReactDOM.render(
  <Provider store={createStoreWithMiddleware(Reducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ &&
    window.__REDUX_DEVTOOLS_EXTENSION__()
  )}>
    <ApolloProvider client={client}>
      <ApolloHooksProvider client={client}>
        <Router history={hist}>
          <Switch>
            <Route path="/admin" render={props => <AdminLayout {...props} />} />
            <Route exact path="/login" component={Auth(LoginPage, false) } />
            <Route exact path="/register" component={Auth(RegisterPage, false)} />
            <Redirect from="/" to="/admin/dashboard" /> {/*/admin/dashboard */}
          </Switch>
        </Router>
      </ApolloHooksProvider>
    </ApolloProvider>
  </Provider>,
  document.getElementById("root")
);
