/**
 * Combine all reducers in this file and export the combined reducers.
 */

import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';

import history from 'utils/history';
import languageProviderReducer from 'containers/LanguageProvider/reducer';
import AuthenticationReducer from './core/authentication/reducer';
import PostsReducer from './containers/App/PostsPage/reducer';

/**
 * Merges the main reducer with the router state and dynamically injected reducers
 */
export default function createReducer(injectedReducers = {}) {
  const rootReducer = combineReducers({
    language: languageProviderReducer,
    authentication: AuthenticationReducer,
    posts: PostsReducer,
    router: connectRouter(history),
    ...injectedReducers,
  });

  return rootReducer;
}
