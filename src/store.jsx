import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
// import { createLogger as logger } from 'redux-logger';

import reducer from 'state';

// Add Middlewares
const middleware = applyMiddleware();

export default createStore(reducer, composeWithDevTools(middleware));
