/* global module */
import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { AppContainer } from 'react-hot-loader';

import store from './store';

import App from './components/App';
import './base.scss';

const render = (Component) => {
  ReactDOM.render(
    <Provider store={store}>
      <Router>
        <AppContainer>
          <Component />
        </AppContainer>
      </Router>
    </Provider>,
    document.getElementById('content')
  );
};

render(App);


if (module.hot) {
  module.hot.accept('./components/App', () => { render(App); });
}
