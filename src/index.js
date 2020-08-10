import React from 'react';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import { Router, Switch, Route, Redirect } from 'react-router-dom';
import { render } from 'react-dom';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import history from './history';
import Root from './components/Root';
import AccountDragons from './components/AccountDragons';
import PublicDragons from './components/PublicDragons';
import rootReducer from './reducers/index.js';
import { fetchAuthentiated } from './actions/account';
import './index.css';




const store = createStore(
  rootReducer,
  compose(
    applyMiddleware(thunk, logger),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);



const AuthRoute = (props) => {
  if (!store.getState().account.loggedIn) {
    return <Redirect to={{ pathname: '/' }} />
  } else {
    const { component, path } = props;
    return <Route path={path} component={component} />
  }
}


store.dispatch(fetchAuthentiated())
  .then(() => {
    render(
      <Provider store={store}>
        <Router history={history} >
          <Switch>
            <Route exact path='/' component={Root} />
            <AuthRoute path="/account-dragons" component={AccountDragons} />
            <AuthRoute path="/public-dragons" component={PublicDragons} />
          </Switch>
        </Router>
      </Provider>,
      document.getElementById('root')
    );
  });

