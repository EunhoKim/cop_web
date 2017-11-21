import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, browserHistory, IndexRoute } from 'react-router';
import { App, Home, Login, Register, Wall } from 'containers';

import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import injectTapEventPlugin from 'react-tap-event-plugin';
import { syncHistoryWithStore } from 'react-router-redux';


import configureStore from './store/configureStore';

import reducers from 'reducers';
import thunk from 'redux-thunk';

//require('expose?$!expose?jQuery!jquery');
//require('bootstrap-webpack');

injectTapEventPlugin();
const store = configureStore();
const history = syncHistoryWithStore(browserHistory, store);

//const store = createStore(reducers, applyMiddleware(thunk));

const rootElement = document.getElementById('root');
ReactDOM.render(
    <Provider store={store}>
        <Router history={history}>
            <Route path="/" component={App}>
                <IndexRoute component={Home}/>
                <Route path="home" component={Home}/>
                <Route path="login" component={Login}/>
                <Route path="register" component={Register}/>
                <Route path="wall/:username" component={Wall}/>
            </Route>
        </Router>
    </Provider>, rootElement
);
